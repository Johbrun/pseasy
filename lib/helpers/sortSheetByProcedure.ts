import { SheetLight } from '../interfaces/sheet.interface';

export function sortSheetByProcedure(s1: SheetLight, s2: SheetLight) {
    const p1 = s1.reference;
    const p2 = s2.reference;

    if (p1.substring(2, 4) > p2.substring(2, 4)) {
        return 1;
    }
    if (p1.substring(2, 4) < p2.substring(2, 4)) {
        return -1;
    }
    if (p1.substring(2, 4) === p2.substring(2, 4)) {
        if (p1.substring(0, 2) > p2.substring(0, 2)) {
            return 1;
        }
        if (p1.substring(0, 2) < p2.substring(0, 2)) {
            return -1;
        }
        if (p1.substring(0, 2) === p2.substring(0, 2)) {
            return 0;
        }
    }
    return 0;
}
