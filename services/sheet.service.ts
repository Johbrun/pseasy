import { SheetLight, SheetExtended } from '../lib/interfaces/sheet.interface';
import firebaseWrapper from '../lib/firebase';

let sheetsLightCache: SheetLight[] = [];
let sheetsExtendedCache: Record<string,SheetExtended[]> = {};

const fetchSheetsLight = async (noCache: boolean = false) => {
    if (sheetsLightCache.length > 0 || noCache) {
        console.log('use cache for fetchSheetsLight');
        return sheetsLightCache;
    }
    console.log('Fetch sheets light...');

    const fetched = (await firebaseWrapper.firestore().collection('sheets').orderBy('updatedDate', 'desc').get()).docs.map(c =>(c.data())) as SheetLight[];
    
    // keep only newest sheets for each reference
    let uniques:SheetLight[] = [];
    
    fetched.forEach(s => {
        if (!uniques.find(u => u.reference === s.reference))
        {
            uniques.push(s);
        }
    });

    uniques = uniques.sort((a,b) => a.id > b.id ? 1 : -1).map(f => ({...f, content:'' }));
    

    sheetsLightCache = uniques;
    console.log('Fetch sheets light [OK]');

    return sheetsLightCache;
};

const fetchSheetByReference = async (
    reference: string ,
    version?: string,
) => {
    if (!reference) {
        throw new Error('No reference passed in argument');
    }
    console.log(`Fetch sheet ${reference} with version ${version}...`);

    if (sheetsExtendedCache[reference]) {
        console.log('use cache for fetchSheetsLight '+reference + ' ' + version);
    } else {
        console.log('NO cache for fetchSheetsLight '+reference + ' ' + version);
    }

    const sheetsExtended = sheetsExtendedCache[reference] ? sheetsExtendedCache[reference] : (await firebaseWrapper.firestore().collection('sheets').where('reference', '==', reference).orderBy('updatedDate', 'desc').get()).docs.map(c =>(c.data())) as SheetExtended[];
    sheetsExtendedCache[reference] = sheetsExtended;
    

    let currentSheet = version ? sheetsExtended.find(s => s.version === version) : sheetsExtended[0];
    currentSheet =  {...currentSheet!, history: sheetsExtended};

    console.log(`Fetch sheet ${reference} [OK]`);
    return currentSheet;
};

export { fetchSheetsLight, fetchSheetByReference };
