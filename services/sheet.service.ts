import axios from 'axios';
import { SheetLight, SheetExtended } from '../lib/interfaces/sheet.interface';
import firebaseWrapper from '../lib/firebase';

let sheetsLightCache: SheetLight[] = [];
let sheetsExtendedCache: SheetExtended[][] = [];

const fetchSheetsLight = async (noCache: boolean = false) => {
    if (sheetsLightCache.length > 0 || noCache) {
        console.log('use cache for fetchSheetsLight');
        return sheetsLightCache;
    }
    console.log('Fetch sheets light...');

    // withConverter
    const fetched = (await firebaseWrapper.firestore().collection('sheets').get()).docs.map(c =>(c.data())) as SheetExtended[];
    // console.log(fetched);
    sheetsLightCache = fetched;
    console.log('Fetch sheets light [OK]');

    return sheetsLightCache;
};

const fetchSheetByReference = async (
    reference: string | string[],
    version?: string | string[],
) => {
    if (!reference) {
        throw new Error('No reference passed in argument');
    }
    if (sheetsExtendedCache.length > 0) {
        console.log('use cache for fetchSheetsLight '+reference + ' ' + version);
        return sheetsLightCache;
    }
    console.log(`Fetch sheet ${reference} with version ${version}...`);

    let sheetsExtended;
    let currentSheet; 
    if (!version)
    {
        sheetsExtended = (await firebaseWrapper.firestore().collection('sheets').where('reference', '==', reference).orderBy('updatedDate', 'desc').limit(1).get()).docs.map(c =>(c.data())) as SheetExtended[];
        currentSheet = sheetsExtended[0];

    }else{
        sheetsExtended = (await firebaseWrapper.firestore().collection('sheets').where('reference', '==', reference).where('version', '==', version).get()).docs.map(c =>(c.data())) as SheetExtended[];
        currentSheet = sheetsExtended.find(s => s.version === version);
    }

    console.log(currentSheet)
    console.log(`Fetch sheet ${reference} [OK]`);
    return {...currentSheet, history: sheetsExtended};
};

export { fetchSheetsLight, fetchSheetByReference };
