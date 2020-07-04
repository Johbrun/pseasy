export function refSheetToType(reference: string) {
    if (!reference) {
        throw new Error('No reference');
    }
    switch (reference.substring(0, 2)) {
        case 'AC':
            return 'Connaissances';
        case 'PR':
            return 'Procédures';
        case 'FT':
            return 'Techniques';
        default:
            return 'Non renseigné';
    }
}
