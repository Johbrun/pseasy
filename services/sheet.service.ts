import axios from 'axios';
import { SheetLight, SheetExtended } from '../lib/interfaces/sheet.interface';

let sheetsLight: SheetLight[] = [];

const fetchSheetsLight = async (noCache: boolean = false) => 
{
    if (sheetsLight.length > 0 || noCache) return sheetsLight;
    console.log('Fetch sheets light...');

    sheetsLight = (await axios.request({
        url: `${process.env.API_URL}/api/sheets`
    })).data;
    console.log('Fetch sheets light [OK]');

    return sheetsLight;
};

const fetchSheetByReference = async (reference: string | string[], version?:string) => 
{
    if (!reference) 
    {
        throw new Error('No reference passed in argument');
    }
    console.log(`Fetch sheet ${reference} with version ${version}...`);

    const sheetExtended = (await axios.request({
        url: `${process.env.API_URL}/api/sheets/sheet?reference=${reference}&version=${version}`
    })).data as SheetExtended;

    console.log(`Fetch sheet ${reference} [OK]`);
    return sheetExtended;
};

export {
    fetchSheetsLight, fetchSheetByReference
};