import {StringUtil} from "~/service/string.util";

interface Departement {
    numDep: string;
    name: string;
    region: string;
    prefecture: string;
    sousPrefecture: string[];
    autreVille?: string[];
}

export class GeoService {
    // Source: https://www.data.gouv.fr/fr/datasets/departements-et-leurs-regions/
    private readonly departementsAndRegions: ReadonlyArray<Departement> = [
        {
            numDep: "01",
            name: "Ain",
            region: "Auvergne-Rhône-Alpes",
            prefecture: "Bourg-en-Bresse",
            sousPrefecture: ["Belley", "Gex", "Nantua"]
        },
        {
            numDep: "02",
            name: "Aisne",
            region: "Hauts-de-France",
            prefecture: "Laon",
            sousPrefecture: ["Château-Thierry", "Saint-Quentin", "Soissons", "Vervins"],
            autreVille: ["Mercin-et-Vaux", "Fère-en-Tardenois"]
        },
        {
            numDep: "03",
            name: "Allier",
            region: "Auvergne-Rhône-Alpes",
            prefecture: "Moulins",
            sousPrefecture: ["Montluçon", "Vichy"],
            autreVille: ["Yzeure"]
        },
        {
            numDep: "04",
            name: "Alpes-de-Haute-Provence",
            region: "Provence-Alpes-Côte d'Azur",
            prefecture: "Digne-les-Bains",
            sousPrefecture: ["Barcelonnette", "Castellane", "Forcalquier"]
        },
        {
            numDep: "05",
            name: "Hautes-Alpes",
            region: "Provence-Alpes-Côte d'Azur",
            prefecture: "Gap",
            sousPrefecture: ["Briançon"]
        },
        {
            numDep: "06",
            name: "Alpes-Maritimes",
            region: "Provence-Alpes-Côte d'Azur",
            prefecture: "Nice",
            sousPrefecture: ["Grasse"],
            autreVille: ["Valbonne", "Sophia Antipolis", "Biot", "Vallauris", "Antibes", "Vence", "Sophia", "Villeneuve-Loubet"]
        },
        {
            numDep: "07",
            name: "Ardèche",
            region: "Auvergne-Rhône-Alpes",
            prefecture: "Privas",
            sousPrefecture: ["Largentière", "Tournon-sur-Rhône"],
            autreVille: ["Annonay", "Aubenas", "Annonay"]
        },
        {
            numDep: "08",
            name: "Ardennes",
            region: "Grand Est",
            prefecture: "Charleville-Mézières",
            sousPrefecture: ["Rethel", "Sedan", "Vouziers"]
        },
        {
            numDep: "09",
            name: "Ariège",
            region: "Occitanie",
            prefecture: "Foix",
            sousPrefecture: ["Pamiers", "Saint-Girons"]
        },
        {
            numDep: "10",
            name: "Aube",
            region: "Grand Est",
            prefecture: "Troyes",
            sousPrefecture: ["Bar-sur-Aube", "Nogent-sur-Seine"]
        },
        {
            numDep: "11",
            name: "Aude",
            region: "Occitanie",
            prefecture: "Carcassonne",
            sousPrefecture: ["Narbonne", "Limoux"]
        },
        {
            numDep: "12",
            name: "Aveyron",
            region: "Occitanie",
            prefecture: "Rodez",
            sousPrefecture: ["Millau", "Villefranche‑de‑Rouergue"]
        },
        {
            numDep: "13",
            name: "Bouches-du-Rhône",
            region: "Provence-Alpes-Côte d'Azur",
            prefecture: "Marseille",
            sousPrefecture: ["Aix‑en‑Provence", "Arles", "Istres"]
        },
        {
            numDep: "14",
            name: "Calvados",
            region: "Normandie",
            prefecture: "Caen",
            sousPrefecture: ["Bayeux", "Lisieux", "Vire Normandie", "Grentheville"]
        },
        {
            numDep: "15",
            name: "Cantal",
            region: "Auvergne-Rhône-Alpes",
            prefecture: "Aurillac",
            sousPrefecture: ["Mauriac", "Saint‑Flour"]
        },
        {
            numDep: "16",
            name: "Charente",
            region: "Nouvelle-Aquitaine",
            prefecture: "Angoulême",
            sousPrefecture: ["Cognac", "Confolens"]
        },
        {
            numDep: "17",
            name: "Charente-Maritime",
            region: "Nouvelle-Aquitaine",
            prefecture: "La Rochelle",
            sousPrefecture: ["Jonzac", "Rochefort", "Saintes", "Saint‑Jean‑d’Angély"],
            autreVille: ["Perigny"]
        },
        {
            numDep: "18",
            name: "Cher",
            region: "Centre-Val de Loire",
            prefecture: "Bourges",
            sousPrefecture: ["Saint‑Amand‑Montrond", "Vierzon", "Saint-Doulchard"]
        },
        {
            numDep: "19",
            name: "Corrèze",
            region: "Nouvelle-Aquitaine",
            prefecture: "Tulle",
            sousPrefecture: ["Brive‑la‑Gaillarde", "Ussel"]
        },
        {
            numDep: "21",
            name: "Côte-d'Or",
            region: "Bourgogne-Franche-Comté",
            prefecture: "Dijon",
            sousPrefecture: ["Beaune", "Montbard"]
        },
        {
            numDep: "22",
            name: "Côtes-d'Armor",
            region: "Bretagne",
            prefecture: "Saint‑Brieuc",
            sousPrefecture: ["Dinan", "Guingamp", "Lannion", "Plérin"]
        },
        {
            numDep: "23",
            name: "Creuse",
            region: "Nouvelle-Aquitaine",
            prefecture: "Guéret",
            sousPrefecture: ["Aubusson"]
        },
        {
            numDep: "24",
            name: "Dordogne",
            region: "Nouvelle-Aquitaine",
            prefecture: "Périgueux",
            sousPrefecture: ["Bergerac", "Nontron", "Sarlat‑la‑Canéda"],
            autreVille :["Saint-Médard-de-Mussidan", "St-Médard-de-Mussidan", "Coulounieix-Chamiers"]
        },
        {
            numDep: "25",
            name: "Doubs",
            region: "Bourgogne-Franche-Comté",
            prefecture: "Besançon",
            sousPrefecture: ["Montbéliard", "Pontarlier"]
        },
        {
            numDep: "26",
            name: "Drôme",
            region: "Auvergne-Rhône-Alpes",
            prefecture: "Valence",
            sousPrefecture: ["Die", "Nyons"]
        },
        {
            numDep: "27",
            name: "Eure",
            region: "Normandie",
            prefecture: "Évreux", sousPrefecture: ["Les Andelys", "Bernay"],
            autreVille: ["Val-de-Reuil", "Noyers"]
        },
        {
            numDep: "28",
            name: "Eure-et-Loir",
            region: "Centre-Val de Loire",
            prefecture: "Chartres",
            sousPrefecture: ["Châteaudun", "Dreux", "Nogent‑le‑Rotrou"],
            autreVille: ["Blandainville", "Illiers-Combray"]
        },
        {
            numDep: "29",
            name: "Finistère",
            region: "Bretagne",
            prefecture: "Quimper", sousPrefecture: ["Brest", "Châteaulin", "Morlaix"],
            autreVille : ["Concarneau", "Bohars"]
        },
        /*        {
                    numDep: "2A",
                    name: "Corse-du-Sud",
                    region: "Corse"
                },
                {
                    numDep: "2B",
                    name: "Haute-Corse",
                    region: "Corse"
                },*/
        {
            numDep: "30",
            name: "Gard",
            region: "Occitanie",
            prefecture: "Nîmes",
            sousPrefecture: ["Alès", "Le Vigan"],
            autreVille: ["La Grand-Combe"]
        },
        {
            numDep: "31",
            name: "Haute-Garonne",
            region: "Occitanie",
            prefecture: "Toulouse",
            sousPrefecture: ["Muret", "Saint‑Gaudens"],
            autreVille: ["Labège"]
        },
        {
            numDep: "32",
            name: "Gers",
            region: "Occitanie",
            prefecture: "Auch", sousPrefecture: ["Condom", "Mirande"]
        },
        {
            numDep: "33",
            name: "Gironde",
            region: "Nouvelle-Aquitaine",
            prefecture: "Bordeaux",
            sousPrefecture: ["Arcachon", "Blaye", "Langon", "Lesparre‑Médoc", "Libourne"],
            autreVille: ["Bruges", "Lormont", "La Teste-de-Buch"]
        },
        {
            numDep: "34",
            name: "Hérault",
            region: "Occitanie",
            prefecture: "Montpellier",
            sousPrefecture: ["Béziers", "Lodève"],
            autreVille: ["Castelnau-le-Lez", "Sète"]
        },
        {
            numDep: "35",
            name: "Ille-et-Vilaine",
            region: "Bretagne",
            prefecture: "Rennes",
            sousPrefecture: ["Fougères", "Redon", "Saint‑Malo"],
            autreVille: ["Chantepie"]
        },
        {
            numDep: "36",
            name: "Indre",
            region: "Centre-Val de Loire",
            prefecture: "Châteauroux", sousPrefecture: ["Le Blanc", "La Châtre", "Issoudun"]
        },
        {
            numDep: "37",
            name: "Indre-et-Loire",
            region: "Centre-Val de Loire",
            prefecture: "Tours",
            sousPrefecture: ["Chinon", "Loches"],
            autreVille: ["La Riche"]
        },
        {
            numDep: "38",
            name: "Isère",
            region: "Auvergne-Rhône-Alpes",
            prefecture: "Grenoble",
            sousPrefecture: ["La Tour‑du‑Pin", "Vienne"],
            autreVille: ["La Terrasse", "Meylan"]
        },
        {
            numDep: "39",
            name: "Jura",
            region: "Bourgogne-Franche-Comté",
            prefecture: "Lons‑le‑Saunier",
            sousPrefecture: ["Dole", "Saint‑Claude"],
            autreVille: ["Champagnole"]
        },
        {
            numDep: "40",
            name: "Landes",
            region: "Nouvelle-Aquitaine",
            prefecture: "Mont‑de‑Marsan", sousPrefecture: ["Dax"],
            autreVille: ["Saint-Pierre-du-Mont"]
        },
        {
            numDep: "41",
            name: "Loir-et-Cher",
            region: "Centre-Val de Loire",
            prefecture: "Blois", sousPrefecture: ["Romorantin‑Lanthenay", "Vendôme"]
        },
        {
            numDep: "42",
            name: "Loire",
            region: "Auvergne-Rhône-Alpes",
            prefecture: "Saint‑Étienne",
            sousPrefecture: ["Montbrison", "Roanne"],
            autreVille: ["La Talaudière", "Feurs", "Le Chambon-Feugerolles"]
        },
        {
            numDep: "43",
            name: "Haute-Loire",
            region: "Auvergne-Rhône-Alpes",
            prefecture: "Le Puy‑en‑Velay",
            sousPrefecture: ["Brioude", "Yssingeaux"],
            autreVille: ["Puy-en-Velay"]
        },
        {
            numDep: "44",
            name: "Loire-Atlantique",
            region: "Pays de la Loire",
            prefecture: "Nantes",
            sousPrefecture: ["Châteaubriant", "Saint‑Nazaire"],
            autreVille: ["Saint-Herblain", "Vigneux-de-Bretagne"]
        },
        {
            numDep: "45",
            name: "Loiret",
            region: "Centre-Val de Loire",
            prefecture: "Orléans",
            sousPrefecture: ["Montargis", "Pithiviers"],
            autreVille: ["Olivet", "La Chapelle-Saint-Mesmin"]
        },
        {
            numDep: "46",
            name: "Lot",
            region: "Occitanie", prefecture: "Cahors", sousPrefecture: ["Figeac", "Gourdon"]
        },
        {
            numDep: "47",
            name: "Lot-et-Garonne",
            region: "Nouvelle-Aquitaine",
            prefecture: "Agen",
            sousPrefecture: ["Marmande", "Nérac", "Villeneuve‑sur‑Lot"],
            autreVille: ["Layrac"]
        },
        {
            numDep: "48",
            name: "Lozère",
            region: "Occitanie", prefecture: "Mende", sousPrefecture: ["Florac Trois Rivières"]
        },
        {
            numDep: "49",
            name: "Maine-et-Loire",
            region: "Pays de la Loire",
            prefecture: "Angers",
            sousPrefecture: ["Cholet", "Saumur", "Segré‑en‑Anjou Bleu"]
        },
        {
            numDep: "50",
            name: "Manche",
            region: "Normandie",
            prefecture: "Saint‑Lô",
            sousPrefecture: ["Avranches", "Cherbourg‑en‑Cotentin", "Coutances"],
            autreVille: ["Saint-Lô", "Cherbourg"]
        },
        {
            numDep: "51",
            name: "Marne",
            region: "Grand Est",
            prefecture: "Châlons‑en‑Champagne",
            sousPrefecture: ["Épernay", "Reims", "Vitry‑le‑François"],
            autreVille: ["Ville-en-Selve"]
        },
        {
            numDep: "52",
            name: "Haute-Marne",
            region: "Grand Est", prefecture: "Chaumont", sousPrefecture: ["Langres", "Saint‑Dizier"]
        },
        {
            numDep: "53",
            name: "Mayenne",
            region: "Pays de la Loire",
            prefecture: "Laval",
            sousPrefecture: ["Château‑Gontier‑sur‑Mayenne", "Mayenne"]
        },
        {
            numDep: "54",
            name: "Meurthe-et-Moselle",
            region: "Grand Est",
            prefecture: "Nancy",
            sousPrefecture: ["Lunéville", "Toul", "Val de Briey", "Vandoevre"],
            autreVille: ['Longwy', "Essey-lès-Nancy", "Essey"]
        },
        {
            numDep: "55",
            name: "Meuse",
            region: "Grand Est",
            refecture: "Bar‑le‑Duc",
            sousPrefecture: ["Commercy", "Verdun"]
        },
        {
            numDep: "56",
            name: "Morbihan",
            region: "Bretagne",
            prefecture: "Vannes",
            sousPrefecture: ["Lorient", "Pontivy"]
        },
        {
            numDep: "57",
            name: "Moselle",
            region: "Grand Est",
            prefecture: "Metz",
            sousPrefecture: ["Forbach", "Sarrebourg", "Sarreguemines", "Thionville"],
            autreVille: ["Scy-Chazelles"]
        },
        {
            numDep: "58",
            name: "Nièvre",
            region: "Bourgogne-Franche-Comté",
            prefecture: "Nevers",
            sousPrefecture: ["Château‑Chinon", "Clamecy", "Cosne‑Cours‑sur‑Loire"]
        },
        {
            numDep: "59",
            name: "Nord",
            region: "Hauts-de-France",
            prefecture: "Lille",
            sousPrefecture: ["Avesnes‑sur‑Helpe", "Cambrai", "Douai", "Dunkerque", "Valenciennes"],
            autreVille: ["Tourcoing", "Marcq-en-Baroeul", "Haubourdin", "Villeneuve d'Ascq", "Roubaix", "Armentières"]
        },
        {
            numDep: "60",
            name: "Oise",
            region: "Hauts-de-France",
            prefecture: "Beauvais",
            sousPrefecture: ["Clermont", "Compiègne", "Senlis"],
            autreVille: ["Creil", "Verneuil-en-Halatte"]
        },
        {
            numDep: "61",
            name: "Orne",
            region: "Normandie",
            prefecture: "Alençon",
            sousPrefecture: ["Argentan", "Mortagne‑au‑Perche"],
            autreVille: ["Saint-Germain-du-Corbéis", "Sées", "Flers"]
        },
        {
            numDep: "62",
            name: "Pas-de-Calais",
            region: "Hauts-de-France",
            prefecture: "Arras",
            sousPrefecture: ["Béthune", "Boulogne‑sur‑Mer", "Calais", "Lens", "Montreuil‑sur‑Mer", "Saint‑Omer"],
            autreVille: ["Vendin-le-Vieil", "Berck-sur-Mer", "Sainte-Catherine", "Berck"]
        },
        {
            numDep: "63",
            name: "Puy-de-Dôme",
            region: "Auvergne-Rhône-Alpes",
            prefecture: "Clermont‑Ferrand",
            sousPrefecture: ["Ambert", "Issoire", "Riom", "Thiers"]
        },
        {
            numDep: "64",
            name: "Pyrénées-Atlantiques",
            region: "Nouvelle-Aquitaine", prefecture: "Pau", sousPrefecture: ["Bayonne", "Oloron‑Sainte‑Marie"]
        },
        {
            numDep: "65",
            name: "Hautes-Pyrénées",
            region: "Occitanie", prefecture: "Tarbes", sousPrefecture: ["Argelès‑Gazost", "Bagnères‑de‑Bigorre"]
        },
        {
            numDep: "66",
            name: "Pyrénées-Orientales",
            region: "Occitanie", prefecture: "Perpignan", sousPrefecture: ["Céret", "Prades"]
        },
        {
            numDep: "67",
            name: "Bas-Rhin",
            region: "Grand Est",
            prefecture: "Strasbourg",
            sousPrefecture: ["Haguenau", "Molsheim", "Saverne", "Sélestat"],
            autreVille: ["Schiltigheim",
                "Goersdorf",
                "Niederbronn",
                "Illkirch-Graffenstaden", "Illkirch", "Graffenstaden", "Schirmeck", "Saales",
                "Morsbronn-les-Bains", "Morsbronn"]
        },
        {
            numDep: "68",
            name: "Haut-Rhin",
            region: "Grand Est",
            prefecture: "Colmar",
            sousPrefecture: ["Altkirch", "Mulhouse", "Thann"],
            autreVille: ["Lutterbach", "Jungholtz"]
        },
        {
            numDep: "69",
            name: "Rhône",
            region: "Auvergne-Rhône-Alpes",
            prefecture: "Lyon",
            sousPrefecture: ["Villefranche‑sur‑Saône"],
            autreVille: ["Saint-Didier-au-Mont-d'Or", "Villeurbanne", "Rillieux-la-Pape"]
        },
        {
            numDep: "70",
            name: "Haute-Saône",
            region: "Bourgogne-Franche-Comté", prefecture: "Vesoul", sousPrefecture: ["Lure"]
        },
        {
            numDep: "71",
            name: "Saône-et-Loire",
            region: "Bourgogne-Franche-Comté",
            prefecture: "Mâcon",
            sousPrefecture: ["Autun", "Chalon‑sur‑Saône", "Charolles", "Louhans"],
            autreVille: ["Boubon-Lancy"]
        },
        {
            numDep: "72",
            name: "Sarthe",
            region: "Pays de la Loire", prefecture: "Le Mans", sousPrefecture: ["La Flèche", "Mamers"]
        },
        {
            numDep: "73",
            name: "Savoie",
            region: "Auvergne-Rhône-Alpes",
            prefecture: "Chambéry",
            sousPrefecture: ["Albertville", "Saint‑Jean‑de‑Maurienne"]
        },
        {
            numDep: "74",
            name: "Haute-Savoie",
            region: "Auvergne-Rhône-Alpes",
            prefecture: "Annecy",
            sousPrefecture: ["Bonneville", "Saint‑Julien‑en‑Genevois", "Thonon‑les‑Bains", "Annemasse"]
        },
        {
            numDep: "75",
            name: "Paris",
            region: "Île-de-France",
            prefecture: "Paris",
            sousPrefecture: []
        },
        {
            numDep: "76",
            name: "Seine-Maritime",
            region: "Normandie",
            prefecture: "Rouen",
            sousPrefecture: ["Dieppe", "Le Havre"],
            autreVille: ["Bois-Guillaume", "Saint-Léonard", "Omonville", "Le Petit-Quevilly"]
        },
        {
            numDep: "77",
            name: "Seine-et-Marne",
            region: "Île-de-France",
            prefecture: "Melun",
            sousPrefecture: ["Fontainebleau", "Meaux", "Provins", "Torcy"],
            autreVille: ["Coulommiers", "Coubert", "Champs-sur-Marne", "Avon", "Rubelles", "Lognes"]
        },
        {
            numDep: "78",
            name: "Yvelines",
            region: "Île-de-France",
            prefecture: "Versailles",
            sousPrefecture: ["Mantes‑la‑Jolie", "Rambouillet", "Saint‑Germain‑en‑Laye"],
            autreVille: ["Montigny-le-Bretonneux", "Poissy", "Guyancourt"]
        },
        {
            numDep: "79",
            name: "Deux-Sèvres",
            region: "Nouvelle-Aquitaine", prefecture: "Niort", sousPrefecture: ["Bressuire", "Parthenay"]
        },
        {
            numDep: "80",
            name: "Somme",
            region: "Hauts-de-France", prefecture: "Amiens", sousPrefecture: ["Abbeville", "Montdidier", "Péronne"]
        },
        {
            numDep: "81",
            name: "Tarn",
            region: "Occitanie",
            prefecture: "Albi",
            sousPrefecture: ["Castres"],
            autreVille: ["Carmaux"]
        },
        {
            numDep: "82",
            name: "Tarn-et-Garonne",
            region: "Occitanie",
            prefecture: "Montauban",
            sousPrefecture: ["Castelsarrasin"]
        },
        {
            numDep: "83",
            name: "Var",
            region: "Provence-Alpes-Côte d'Azur",
            prefecture: "Toulon",
            sousPrefecture: ["Brignoles", "Draguignan"],
            autreVille: ["Collobrières", "Cogolin", "Saint-Raphaël", "Pignans"]
        },
        {
            numDep: "84",
            name: "Vaucluse",
            region: "Provence-Alpes-Côte d'Azur",
            prefecture: "Avignon",
            sousPrefecture: ["Apt", "Carpentras"]
        },
        {
            numDep: "85",
            name: "Vendée",
            region: "Pays de la Loire",
            prefecture: "La Roche-sur-Yon",
            sousPrefecture: ["Fontenay-le-Comte", "Les Sables-d'Olonne"],
            autreVille: ["Challans"]
        },
        {
            numDep: "86",
            name: "Vienne",
            region: "Nouvelle-Aquitaine",
            prefecture: "Poitiers",
            sousPrefecture: ["Châtellerault", "Montmorillon"],
            autreVille: ["La Roche-Posay"]
        },
        {
            numDep: "87",
            name: "Haute-Vienne",
            region: "Nouvelle-Aquitaine",
            prefecture: "Limoges",
            sousPrefecture: ["Bellac", "Rochechouart"]
        },
        {
            numDep: "88",
            name: "Vosges",
            region: "Grand Est",
            prefecture: "Épinal",
            sousPrefecture: ["Neufchâteau", "Saint‑Dié‑des‑Vosges"],
            autreVille: ["Darney", "Le Val-d'Ajol"]
        },
        {
            numDep: "89",
            name: "Yonne",
            region: "Bourgogne-Franche-Comté",
            prefecture: "Auxerre",
            sousPrefecture: ["Avallon", "Sens"]
        },
        {
            numDep: "90",
            name: "Territoire de Belfort",
            region: "Bourgogne-Franche-Comté",
            prefecture: "Belfort",
            sousPrefecture: []
        },
        {
            numDep: "91",
            name: "Essonne",
            region: "Île-de-France",
            prefecture: "Évry‑Courcouronnes",
            sousPrefecture: ["Étampes", "Palaiseau"],
            autreVille: ["Evry", "Courcouronnes"]
        },
        {
            numDep: "92",
            name: "Hauts-de-Seine",
            region: "Île-de-France",
            prefecture: "Nanterre",
            sousPrefecture: ["Antony", "Boulogne‑Billancourt"],
            autreVille : ["Garches", "Montrouge", "Puteaux", "Gennevilliers", "Clichy la Garenne", "Châtenay-Malabry"]
        },
        {
            numDep: "93",
            name: "Seine-Saint-Denis",
            region: "Île-de-France",
            prefecture: "Bobigny",
            sousPrefecture: ["Le Raincy", "Saint-Denis"],
            autreVille: ["Montreuil",
                "Noisy-le-Grand",
                "Rosny-sous-Bois",
                "Fontenay-sous-Bois",
                "Aulnay-sous-Bois",
                "Saint-Ouen"
            ]
        },
        {
            numDep: "94",
            name: "Val-de-Marne",
            region: "Île-de-France",
            prefecture: "Créteil",
            sousPrefecture: ["L'Haÿ-les-Roses", "Nogent-sur-Marne"],
            autreVille: ["Choisy-le-Roi"]
        },
        {
            numDep: "95",
            name: "Val-d'Oise",
            region: "Île-de-France",
            prefecture: "Cergy",
            sousPrefecture: ["Argenteuil", "Sarcelles"]
        }
    ] as const;

    /**
     * Récupère la liste de toutes les régions uniques
     * @returns Un tableau trié des noms de régions
     */
    public getRegions(): string[] {
        const array = [...new Set(this.departementsAndRegions.map(({region}) => region))]
        array.push('Corse')
        return array.sort()
    }

    /**
     * Récupère tous les départements
     * @returns Un tableau de tous les départements
     */
    public getDepartements(): Departement[] {
        return [...this.departementsAndRegions];
    }

    /**
     * Recherche les départements d'une région
     * @param regionName - Le nom de la région
     * @returns Un tableau des départements de la région spécifiée
     */
    public getDepartementsByRegion(regionName: string): Departement[] {
        return this.departementsAndRegions.filter(dep => dep.region === regionName);
    }

    /**
     * Recherche un département par son numéro
     * @param numDep - Le numéro du département
     * @returns Le département trouvé ou undefined
     */
    public getDepartementByNumber(numDep: string): Departement | undefined {
        return this.departementsAndRegions.find(dep => dep.numDep === numDep);
    }

    /**
     * Recherche un département par son nom
     * @param depName - Le nom du département
     * @returns Le département trouvé ou undefined
     */
    public getDepartementByName(depName: string): Departement | undefined {
        return this.departementsAndRegions.find(dep => dep.name === depName);
    }

    public getBestMatchingRegion(regionName: string) : string | undefined {
        return this.getRegions().find(region => StringUtil.bestGuessMatch(region, regionName))
    }
}