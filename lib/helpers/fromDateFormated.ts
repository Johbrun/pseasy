const months = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
];

export function fromDateFormated(str: String) 
{
    const [m, y] = str.split(' ');
    const monthInt = months.indexOf(m);

    const date = new Date(Number(y), monthInt);
    return date;
}
