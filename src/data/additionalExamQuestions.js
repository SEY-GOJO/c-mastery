const additionalExamQuestions = [
  {
    id: 'exam-q11', category: 'Conditions',
    question: 'Quelle valeur affiche ce programme ?',
    code: 'int x = 8;\nif (x % 2 == 0) printf("pair");\nelse printf("impair");',
    options: [{ id: 'a', text: 'pair' }, { id: 'b', text: 'impair' }, { id: 'c', text: '8' }, { id: 'd', text: 'Aucun texte' }],
    correct: 'a', explanation: '8 % 2 vaut 0 : la condition est vraie et le programme affiche « pair ».',
  },
  {
    id: 'exam-q12', category: 'Boucles',
    question: 'Quelle est la valeur finale de somme ?',
    code: 'int somme = 0;\nfor (int i = 1; i <= 3; i++) somme += i;',
    options: [{ id: 'a', text: '3' }, { id: 'b', text: '5' }, { id: 'c', text: '6' }, { id: 'd', text: '7' }],
    correct: 'c', explanation: 'La boucle additionne 1, puis 2, puis 3 : la somme finale vaut 6.',
  },
  {
    id: 'exam-q13', category: 'Tableaux',
    question: 'Quelle valeur est affichée ?',
    code: 'int t[] = {4, 9, 2};\nprintf("%d", t[2]);',
    options: [{ id: 'a', text: '4' }, { id: 'b', text: '9' }, { id: 'c', text: '2' }, { id: 'd', text: '3' }],
    correct: 'c', explanation: 'Le troisième élément est à l’indice 2, car les indices commencent à 0.',
  },
  {
    id: 'exam-q14', category: 'Fonctions',
    question: 'Quelle valeur est renvoyée par triple(4) ?',
    code: 'int triple(int n) {\n    return n * 3;\n}',
    options: [{ id: 'a', text: '7' }, { id: 'b', text: '12' }, { id: 'c', text: '16' }, { id: 'd', text: '3' }],
    correct: 'b', explanation: 'Le paramètre reçoit 4 et la fonction renvoie 4 × 3, soit 12.',
  },
  {
    id: 'exam-q15', category: 'Pointeurs',
    question: 'Quelle valeur affiche ce code ?',
    code: 'int n = 6;\nint *p = &n;\n*p = 10;\nprintf("%d", n);',
    options: [{ id: 'a', text: '6' }, { id: 'b', text: '10' }, { id: 'c', text: 'L’adresse de n' }, { id: 'd', text: '0' }],
    correct: 'b', explanation: '*p désigne n : affecter 10 à *p modifie donc directement n.',
  },
  {
    id: 'exam-q16', category: 'Opérateurs',
    question: 'Quelle valeur vaut resultat ?',
    code: 'int resultat = 18 / 4;',
    options: [{ id: 'a', text: '4' }, { id: 'b', text: '4.5' }, { id: 'c', text: '2' }, { id: 'd', text: '5' }],
    correct: 'a', explanation: 'La division entre deux int est une division entière : la partie décimale est supprimée.',
  },
  {
    id: 'exam-q17', category: 'Chaînes',
    question: 'Quel spécificateur printf affiche le caractère unique c ?',
    code: 'char c = \'Z\';\nprintf("...", c);',
    options: [{ id: 'a', text: '%s' }, { id: 'b', text: '%d' }, { id: 'c', text: '%c' }, { id: 'd', text: '%f' }],
    correct: 'c', explanation: '%c affiche un caractère ; %s est réservé aux chaînes.',
  },
  {
    id: 'exam-q18', category: 'Débogage',
    question: 'Quelle correction évite une erreur de compilation ?',
    code: 'int total = 5\nprintf("%d", total);',
    options: [{ id: 'a', text: 'Ajouter ; après 5' }, { id: 'b', text: 'Remplacer int par printf' }, { id: 'c', text: 'Ajouter & devant total' }, { id: 'd', text: 'Mettre 5 entre guillemets' }],
    correct: 'a', explanation: 'Une déclaration ou affectation en C se termine par un point-virgule.',
  },
  {
    id: 'exam-q19', category: 'Structures',
    question: 'Quelle valeur contient p.y après cette initialisation ?',
    code: 'struct Point { int x; int y; };\nstruct Point p = {2, 7};',
    options: [{ id: 'a', text: '2' }, { id: 'b', text: '7' }, { id: 'c', text: '9' }, { id: 'd', text: 'y' }],
    correct: 'b', explanation: 'Les valeurs initialisent les champs dans leur ordre de déclaration : x reçoit 2 et y reçoit 7.',
  },
  {
    id: 'exam-q20', category: 'Logique',
    question: 'La condition est-elle vraie ?',
    code: 'int age = 16;\nage >= 18 && age < 25',
    options: [{ id: 'a', text: 'Oui, les deux comparaisons sont vraies' }, { id: 'b', text: 'Non, age >= 18 est faux' }, { id: 'c', text: 'Oui, car && signifie ou' }, { id: 'd', text: 'Impossible à déterminer' }],
    correct: 'b', explanation: '16 n’est pas supérieur ou égal à 18 ; avec &&, les deux comparaisons doivent être vraies.',
  },
]

export default additionalExamQuestions
