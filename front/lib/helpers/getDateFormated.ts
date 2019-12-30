const months = [
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
]

export function getDateFormated(date: Date) {

  return `${months[date.getMonth()]} ${date.getUTCFullYear()}`
}
