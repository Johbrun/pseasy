const months = [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre',
];

export function toDateFormated(date: Date) {
    return `${months[date.getMonth()]} ${date.getUTCFullYear()}`;
}
