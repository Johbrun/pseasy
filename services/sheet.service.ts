import axios from "axios";
import { SheetLight, Sheet } from "../lib/interfaces/sheet.interface";

let sheetsLight: SheetLight[] = []

const fetchSheetsLight = async (noCache: boolean = false) => {
    if (sheetsLight.length > 0 || noCache) return sheetsLight;
    console.log(`Fetch sheets light...`)

    sheetsLight = (await axios.request({
        url: `${process.env.API_URL}/api/sheets`
    })).data
    console.log("Fetch sheets light [OK]")

    return sheetsLight;
}

const fetchSheet = async (reference: string | string[]) => {
    if (!reference) {
        throw new Error('No reference passed in argument')
    }
    console.log(`Fetch sheet ${reference}...`)

    const sheet = (await axios.request({
        url: `${process.env.API_URL}/api/sheets/sheet?reference=${reference}`
    })).data[0] as Sheet;

    console.log(`Fetch sheet ${reference} [OK]`)
    return sheet;
}

export {
    fetchSheetsLight, fetchSheet
}