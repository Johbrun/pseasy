import { SheetLight } from '../interfaces/sheet.interface';

export function orderByReference(r1: SheetLight, r2: SheetLight) {
    console.log(
        r1.reference.substring(4, 5),
        r1.reference.substring(5, 7),
        r1.reference.substring(0, 2)
    );
    if (r1.reference.substring(4, 5) < r2.reference.substring(4, 5)) {
        return -1;
    } else if (r1.reference.substring(4, 5) > r2.reference.substring(4, 5)) {
        return 1;
    } else {
        if (r1.reference.substring(5, 7) < r2.reference.substring(5, 7)) {
            return -1;
        } else if (
            r1.reference.substring(5, 7) > r2.reference.substring(5, 7)
        ) {
            return 1;
        } else {
            if (r1.reference.substring(0, 2) < r2.reference.substring(0, 2)) {
                return -1;
            } else if (
                r1.reference.substring(0, 2) > r2.reference.substring(0, 2)
            ) {
                return 1;
            } else {
                return 0;
            }
        }
    }
}
