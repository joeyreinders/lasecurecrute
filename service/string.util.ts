/**
 * String utility class
 */
export class StringUtil {
    static normalizeName(name?: string) : string {
        if(name === undefined || name === null || name.length === 0) return ""
        return name!
            .toLowerCase()
            .normalize("NFD")                 // Decompose accented characters
            .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
            .replace(/['’]/g, "")            // Remove apostrophes
            .replace(/[^a-z0-9]/g, "")      // Remove non-alphanumeric characters
    }

    static bestGuessMatch(aLeft: string, aRight: string) : boolean {
        return StringUtil.normalizeName(aLeft) === StringUtil.normalizeName(aRight);
    }
}