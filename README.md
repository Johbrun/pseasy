pandoc -s 2018.docx -t gfm -o 2018.md  --reference-links --no-highlight --wrap=none
A chaque nouveau md :
replace(/^> /g, '')

Attention, en plus pour 2014
* Format de date des fiches incorrect : <p>septembre-­‐14</p> => <p>Septembre 2014</p>
* Titres trop gros : ### => # ; #### => ##
* Problème de caractères : (.)7(.) => $1ti$2 ; (.)F(.) => $1tt$2
* Les > sur les listes à puce : - > => -
* Les mots coupés : -­‐  => 
* Header : comparer aux 2018,2019
 
SELECT reference, COUNT(reference)as nb FROM `sheet` WHERE 1 group by reference ORDER BY nb DESC