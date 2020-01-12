export function refSheetToType(reference: string) 
{
    switch (reference.substring(0, 2)) 
    {
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
