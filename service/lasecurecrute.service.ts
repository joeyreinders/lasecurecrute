import * as https from "node:https";
import axios from "axios";
import {JSDOM} from "jsdom";
import {GeoService} from "~/service/geo.service";
import {StringUtil} from "~/service/string.util";

export class LaSecuRecruteService {
    private readonly laSecuRecruteRechercheUrl: string = useRuntimeConfig().laSecuRecruteRecherche

    private readonly agent = new https.Agent({
        rejectUnauthorized: false
    })

    private readonly geoService = new GeoService()

    private readonly requestConfig = {
        httpsAgent: this.agent,
        headers: {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            'Accept-Language': 'fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
            'Pragma': 'no-cache',
            'Sec-Fetch-Dest': 'document',
            'Sec-Fetch-Mode': 'navigate',
            'Sec-Fetch-Site': 'none',
            'Sec-Fetch-User': '?1',
        }
    }

    private document : Document | null = null;

    constructor() {
        console.warn('Are you sure you want to create a new instance of LaSecuRecruteService ? Please use the singleton')
    }

    async init() {
        console.log('LaSecuRecruteService initialized')

    }

    async init() {
        if(this.document === null) {
            this.document = await this.doRemoteCall()
        }
    }

    async getTypesContract() {
        await this.init()

        return this.extractTypeContrat(this.document!)
    }

    async getFamilleDeMetiers() {
        await this.init()

        return this.extractFamilleDeMetiers(this.document!)
    }

    async getOffres() {
        await this.init()

        return this.extractOffres(this.document!)
    }

    /**
     * Performs a remote HTTP GET request to fetch data from the specified URL and returns the parsed HTML document.
     *
     * @return {Promise<Document>} A promise that resolves to the HTML document parsed from the response.
     * @throws Will throw an error if the request fails.
     */
    async doRemoteCall(): Promise<Document> {
        try {
            const response = await axios.get(this.laSecuRecruteRechercheUrl, this.requestConfig)
            return new JSDOM(response.data).window.document
        } catch (error) {
            console.error('Erreur lors de la récupération des offres :', error)
            throw null
        }
    }

    /**
     * Extracts the values of the "Famille de métiers" dropdown from the given document.
     *
     * @param {Document} aDocument - The document from which the "Famille de métiers" dropdown values will be extracted.
     * @return {string[]} An array of strings representing the values of the "Famille de métiers" dropdown.
     */
    private extractFamilleDeMetiers(aDocument: Document): string[] {
        //Cherche un élément ul role group avec aria-label Famille de métiers
        return this.extractDropdownValues(aDocument, "Famille de métiers")
    }

    /**
     * Extracts localisation data from a given document by pulling values from a specific dropdown field.
     *
     * @param {Document} aDocument - The document from which to extract localisation values.
     * @return {string[]} An array of strings representing the extracted localisation values from the provided document.
     */
    private extractLocalisation(aDocument: Document): any[] {
        return this.extractDropdownValues(aDocument, "Localisation")
    }

    /**
     * Extracts the contract types from the given document.
     *
     * @param {Document} aDocument - The document from which contract types are to be extracted.
     * @return {string[]} An array of strings representing the contract types extracted from the document.
     */
    private extractTypeContrat(aDocument: Document): string[] {
        return this.extractDropdownValues(aDocument, "Contrat")
    }

    /**
     * Extracts dropdown values from a document based on the specified ARIA label.
     *
     * @param {Document} aDocument - The document to search within.
     * @param {string} anAriaLabel - The aria-label value used to identify the dropdown group.
     * @return {string[]} An array of extracted dropdown values as strings. Returns an empty array if no matching elements are found.
     */
    private extractDropdownValues(aDocument: Document, anAriaLabel: string): string[] {
        const result = aDocument.querySelector(`ul[role="group"][aria-label="${anAriaLabel}"]`);
        if (!result) {
            return [];
        }

        const liElements = result.querySelectorAll('li.form-check');
        const labels: string[] = [];

        liElements.forEach((li) => {
            const label = li.querySelector('label.form-check-label');
            if (label && label.textContent) {
                labels.push(label.textContent.trim());
            }
        });
        return labels;
    }

    private extractOffres(aDocument: Document): string[] {
        const section = aDocument.querySelector<HTMLElement>('section.liste-offres');
        
        if (!section) {
            return [];
        }
        
        return Array.from(section.querySelectorAll<HTMLElement>('article.carte-offre'))
            .map(this.extractJobOffer.bind(this));
    }

    private extractSpanValue(element: Element, anAttributeValue: string, aLabelToReplace: string): string {
        const spanElement = element.querySelector(`span[data-original-title="${anAttributeValue}"]`);
        return spanElement?.textContent?.replace(aLabelToReplace, '').trim() || '';
    }

    private extractJobOffer(anArticle: Element): any {
        const result = {
            url: '',
            title: '',
            organisation: '',
            shortOrganisation : '',
            contractType: '',
            localisation: '',
            niveau: '',
            reference: '',
            salary: '',
            deadline : '',
            publication : '',
            region: '',
            departement: {},
            normalizedLocalisation: ''
        };

        const header = anArticle.querySelector('header');
        result.url = header?.querySelector('a')?.getAttribute('href') || '';
        result.title = header?.querySelector('h3 span')?.textContent?.trim() || '';
        result.organisation = header?.querySelector('h4')?.textContent?.trim() || '';
        result.shortOrganisation = result.organisation.split(' ')[0];

        // Utilisation de la nouvelle fonction utilitaire
        result.contractType = this.extractSpanValue(anArticle, 'Type de contrat', 'Type de contrat');
        result.localisation = this.extractSpanValue(anArticle, 'Localisation', 'Localisation');
        result.niveau = this.extractSpanValue(anArticle, 'Niveau', 'Niveau');
        result.reference = this.extractSpanValue(anArticle, 'Référence', 'Référence');
        result.salary = this.extractSpanValue(anArticle, 'Rémunération', 'Rémunération');

        //Cas spéciale - deadline
        result.deadline = anArticle.querySelector('li.d-lg-inline-block span.ico-sablier')?.parentElement?.textContent?.trim() || '';
        result.deadline = result.deadline.replace('Limite de candidature le ', '');

        //Cas spécial - date publication
        result.publication = anArticle.querySelector('li.d-lg-inline-block span.ico-horloge')?.parentElement?.textContent?.trim() || '';
        result.publication = result.publication.replace('Publié depuis ', '').replace('Publié ', '');

        //Cas spécial - Extraction région
        const rawRegion = result.url.split('/').filter(segment => segment.length > 0).slice(-2, -1)[0] || '';
        result.region = this.geoService.getBestMatchingRegion(rawRegion) || ''

        //Essaye de trouver la ville
        if(result.region !== '') {
            const departements = this.geoService.getDepartementsByRegion(result.region)
            result.departement = departements.find((element) => {
                const normalizedLocalisation = StringUtil.normalizeName(result.localisation)
                if(normalizedLocalisation.includes(StringUtil.normalizeName(element.prefecture))
                    || normalizedLocalisation.includes(StringUtil.normalizeName(element.name))
                    || element.sousPrefecture.some(sousPref => normalizedLocalisation.includes(StringUtil.normalizeName(sousPref)))
                    || element.autreVille?.some(autreVille => normalizedLocalisation.includes(StringUtil.normalizeName(autreVille)))) {
                    return element
                }
            }) || {}
        }

        return result;
    }

    /**
     * Singleton
     */
    static getInstance() : LaSecuRecruteService {
        return global.lasecurecruteService
    }
}