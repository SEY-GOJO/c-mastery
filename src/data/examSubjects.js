export const examSubjects = [
  {
    id: 'calculs-et-boucles',
    title: 'Calculs et boucles',
    exercises: [
      {
        id: 'factoriel', title: 'Calcul du factoriel',
        statement: 'Soit n un entier donné avec n > 0. Écrire un algorithme, puis un programme en langage C, qui calcule et affiche n! sachant que n! = 1 × 2 × 3 × … × n. On suppose que le résultat tient dans un long long.',
        algorithm: `Lire n\nfactoriel ← 1\nPour i allant de 1 à n\n    factoriel ← factoriel × i\nFinPour\nAfficher factoriel`,
        code: `#include <stdio.h>\n\nint main(void) {\n    int n;\n    long long factoriel = 1;\n    scanf("%d", &n);\n\n    for (int i = 1; i <= n; i++) {\n        factoriel *= i;\n    }\n\n    printf("%d! = %lld\\n", n, factoriel);\n    return 0;\n}`,
        criteria: [
          { id: 'init', label: 'Initialiser le résultat à 1.', points: 1 },
          { id: 'loop', label: 'Parcourir les entiers de 1 à n inclus.', points: 1 },
          { id: 'product', label: 'Multiplier à chaque tour et afficher le factoriel.', points: 1 },
        ],
      },
      {
        id: 'somme-factoriels', title: 'Somme des factoriels',
        statement: 'Soit n un entier donné avec n > 0. Écrire un algorithme, puis un programme en C, qui calcule et affiche S = 1! + 2! + 3! + … + n!. On suppose que le résultat tient dans un long long.',
        algorithm: `Lire n\nfactoriel ← 1\nsomme ← 0\nPour i allant de 1 à n\n    factoriel ← factoriel × i\n    somme ← somme + factoriel\nFinPour\nAfficher somme`,
        code: `#include <stdio.h>\n\nint main(void) {\n    int n;\n    long long factoriel = 1, somme = 0;\n    scanf("%d", &n);\n\n    for (int i = 1; i <= n; i++) {\n        factoriel *= i;\n        somme += factoriel;\n    }\n\n    printf("S = %lld\\n", somme);\n    return 0;\n}`,
        criteria: [
          { id: 'factorial-progress', label: 'Faire évoluer le factoriel à chaque itération.', points: 1 },
          { id: 'sum-progress', label: 'Ajouter chaque factoriel courant à la somme.', points: 1 },
          { id: 'sum-output', label: 'Initialiser la somme à 0 et afficher le résultat.', points: 1 },
        ],
      },
      {
        id: 'somme-impairs-3', title: 'Impairs multiples de 3',
        statement: 'Soient m et n deux entiers donnés tels que m < n. Écrire un algorithme, puis un programme en C, qui calcule et affiche la somme des nombres de [m, n] qui sont à la fois impairs et multiples de 3.',
        algorithm: `Lire m, n\nsomme ← 0\nPour i allant de m à n\n    Si i mod 2 ≠ 0 ET i mod 3 = 0 alors\n        somme ← somme + i\n    FinSi\nFinPour\nAfficher somme`,
        code: `#include <stdio.h>\n\nint main(void) {\n    int m, n, somme = 0;\n    scanf("%d %d", &m, &n);\n\n    for (int i = m; i <= n; i++) {\n        if (i % 2 != 0 && i % 3 == 0) {\n            somme += i;\n        }\n    }\n\n    printf("Somme = %d\\n", somme);\n    return 0;\n}`,
        criteria: [
          { id: 'interval', label: 'Parcourir tous les entiers de m à n inclus.', points: 1 },
          { id: 'filter-sum', label: 'Tester les deux conditions, additionner les bons nombres et afficher la somme.', points: 1 },
        ],
      },
    ],
  },
  {
    id: 'nombres-et-conditions',
    title: 'Nombres et conditions',
    exercises: [
      {
        id: 'somme-diviseurs', title: 'Somme des diviseurs',
        statement: 'Lire un entier positif n et calculer la somme de ses diviseurs positifs, n compris. Exemple : pour n = 6, la somme vaut 1 + 2 + 3 + 6 = 12.',
        algorithm: `Lire n\nsomme ← 0\nPour d allant de 1 à n\n    Si n mod d = 0 alors\n        somme ← somme + d\n    FinSi\nFinPour\nAfficher somme`,
        code: `#include <stdio.h>\n\nint main(void) {\n    int n, somme = 0;\n    scanf("%d", &n);\n\n    for (int d = 1; d <= n; d++) {\n        if (n % d == 0) somme += d;\n    }\n\n    printf("%d\\n", somme);\n    return 0;\n}`,
        criteria: [
          { id: 'div-loop', label: 'Tester les diviseurs de 1 à n.', points: 1 },
          { id: 'div-test', label: 'Reconnaître un diviseur avec le reste de la division.', points: 1 },
          { id: 'div-sum', label: 'Additionner les diviseurs et afficher la somme.', points: 1 },
        ],
      },
      {
        id: 'premier', title: 'Tester si un nombre est premier',
        statement: 'Lire n avec n > 1 et afficher s’il est premier. Un nombre premier possède exactement deux diviseurs positifs : 1 et lui-même.',
        algorithm: `Lire n\nestPremier ← vrai\nPour d allant de 2 à n - 1\n    Si n mod d = 0 alors\n        estPremier ← faux\n    FinSi\nFinPour\nSi estPremier alors afficher "premier"\nSinon afficher "non premier"`,
        code: `#include <stdio.h>\n\nint main(void) {\n    int n, estPremier = 1;\n    scanf("%d", &n);\n\n    for (int d = 2; d < n; d++) {\n        if (n % d == 0) estPremier = 0;\n    }\n\n    if (estPremier) printf("premier\\n");\n    else printf("non premier\\n");\n    return 0;\n}`,
        criteria: [
          { id: 'prime-flag', label: 'Partir de l’hypothèse que n est premier.', points: 1 },
          { id: 'prime-loop', label: 'Tester les diviseurs possibles entre 2 et n - 1.', points: 1 },
          { id: 'prime-result', label: 'Détecter un diviseur et afficher le bon résultat.', points: 1 },
        ],
      },
      {
        id: 'pgcd', title: 'Calculer le PGCD',
        statement: 'Lire deux entiers strictement positifs a et b, puis calculer leur plus grand commun diviseur en utilisant l’algorithme d’Euclide.',
        algorithm: `Lire a, b\nTant que b ≠ 0\n    reste ← a mod b\n    a ← b\n    b ← reste\nFinTantQue\nAfficher a`,
        code: `#include <stdio.h>\n\nint main(void) {\n    int a, b;\n    scanf("%d %d", &a, &b);\n\n    while (b != 0) {\n        int reste = a % b;\n        a = b;\n        b = reste;\n    }\n\n    printf("PGCD = %d\\n", a);\n    return 0;\n}`,
        criteria: [
          { id: 'gcd-loop', label: 'Répéter tant que b est non nul, calculer le reste et remplacer a et b dans le bon ordre.', points: 1 },
          { id: 'gcd-output', label: 'Afficher a à la fin de l’algorithme.', points: 1 },
        ],
      },
    ],
  },
  {
    id: 'tableaux',
    title: 'Parcours de tableaux',
    exercises: [
      {
        id: 'min-max', title: 'Minimum et maximum',
        statement: 'Lire 8 entiers dans un tableau, puis déterminer et afficher la plus petite et la plus grande valeur.',
        algorithm: `Lire les 8 valeurs dans T\nminimum ← T[0]\nmaximum ← T[0]\nPour i allant de 1 à 7\n    Si T[i] < minimum alors minimum ← T[i]\n    Si T[i] > maximum alors maximum ← T[i]\nFinPour\nAfficher minimum, maximum`,
        code: `#include <stdio.h>\n\nint main(void) {\n    int t[8];\n    for (int i = 0; i < 8; i++) scanf("%d", &t[i]);\n\n    int min = t[0], max = t[0];\n    for (int i = 1; i < 8; i++) {\n        if (t[i] < min) min = t[i];\n        if (t[i] > max) max = t[i];\n    }\n\n    printf("Min=%d Max=%d\\n", min, max);\n    return 0;\n}`,
        criteria: [
          { id: 'min-init', label: 'Initialiser min et max avec le premier élément.', points: 1 },
          { id: 'min-loop', label: 'Parcourir les autres cases du tableau.', points: 1 },
          { id: 'min-output', label: 'Mettre à jour les deux bornes et les afficher.', points: 1 },
        ],
      },
      {
        id: 'moyenne', title: 'Moyenne d’une classe',
        statement: 'Lire les notes de 10 élèves dans un tableau, calculer la moyenne et l’afficher. Les notes sont comprises entre 0 et 20.',
        algorithm: `somme ← 0\nPour i allant de 0 à 9\n    Lire note[i]\n    somme ← somme + note[i]\nFinPour\nmoyenne ← somme / 10\nAfficher moyenne`,
        code: `#include <stdio.h>\n\nint main(void) {\n    float notes[10], somme = 0;\n    for (int i = 0; i < 10; i++) {\n        scanf("%f", &notes[i]);\n        somme += notes[i];\n    }\n\n    printf("Moyenne = %.2f\\n", somme / 10);\n    return 0;\n}`,
        criteria: [
          { id: 'avg-array', label: 'Stocker ou traiter les 10 notes dans une boucle.', points: 1 },
          { id: 'avg-sum', label: 'Calculer la somme de toutes les notes.', points: 1 },
          { id: 'avg-divide', label: 'Diviser par 10 et afficher une valeur décimale.', points: 1 },
        ],
      },
      {
        id: 'compter-dessus', title: 'Notes au-dessus de la moyenne',
        statement: 'À partir des 10 notes de l’exercice précédent, calculer la moyenne puis compter combien de notes sont strictement supérieures à cette moyenne.',
        algorithm: `Calculer la moyenne des 10 notes\ncompteur ← 0\nPour i allant de 0 à 9\n    Si note[i] > moyenne alors compteur ← compteur + 1\nFinPour\nAfficher compteur`,
        code: `#include <stdio.h>\n\nint main(void) {\n    float notes[10], somme = 0;\n    for (int i = 0; i < 10; i++) {\n        scanf("%f", &notes[i]);\n        somme += notes[i];\n    }\n\n    float moyenne = somme / 10;\n    int compteur = 0;\n    for (int i = 0; i < 10; i++) {\n        if (notes[i] > moyenne) compteur++;\n    }\n    printf("Au-dessus : %d\\n", compteur);\n    return 0;\n}`,
        criteria: [
          { id: 'count-mean', label: 'Calculer correctement la moyenne des notes.', points: 1 },
          { id: 'count-filter', label: 'Compter les notes strictement supérieures et afficher le compteur.', points: 1 },
        ],
      },
    ],
  },
  {
    id: 'fonctions-et-pointeurs',
    title: 'Fonctions et pointeurs',
    exercises: [
      {
        id: 'puissance', title: 'Écrire une fonction puissance',
        statement: 'Écrire une fonction puissance(base, exposant) qui calcule base élevé à un exposant entier positif ou nul, puis l’utiliser dans main et afficher son résultat.',
        algorithm: `Fonction puissance(base, exposant)\n    résultat ← 1\n    Répéter exposant fois\n        résultat ← résultat × base\n    Retourner résultat\nDans main, lire base et exposant\nAfficher puissance(base, exposant)`,
        code: `#include <stdio.h>\n\nint puissance(int base, int exposant) {\n    int resultat = 1;\n    for (int i = 0; i < exposant; i++) {\n        resultat *= base;\n    }\n    return resultat;\n}\n\nint main(void) {\n    int base, exposant;\n    scanf("%d %d", &base, &exposant);\n    printf("%d\\n", puissance(base, exposant));\n    return 0;\n}`,
        criteria: [
          { id: 'pow-signature', label: 'Déclarer une fonction avec deux paramètres entiers.', points: 1 },
          { id: 'pow-loop', label: 'Multiplier la base le bon nombre de fois, avec un résultat initialisé à 1.', points: 1 },
          { id: 'pow-return', label: 'Retourner puis afficher le résultat de la fonction.', points: 1 },
        ],
      },
      {
        id: 'fonction-premier', title: 'Tester un nombre premier avec une fonction',
        statement: 'Écrire une fonction estPremier(n) qui renvoie 1 si n est premier et 0 sinon. L’appeler depuis main pour afficher le résultat.',
        algorithm: `Fonction estPremier(n)\n    Si n < 2 alors retourner faux\n    Pour d allant de 2 à n - 1\n        Si n mod d = 0 alors retourner faux\n    FinPour\n    retourner vrai`,
        code: `#include <stdio.h>\n\nint estPremier(int n) {\n    if (n < 2) return 0;\n    for (int d = 2; d < n; d++) {\n        if (n % d == 0) return 0;\n    }\n    return 1;\n}\n\nint main(void) {\n    int n;\n    scanf("%d", &n);\n    if (estPremier(n)) printf("premier\\n");\n    else printf("non premier\\n");\n    return 0;\n}`,
        criteria: [
          { id: 'isprime-domain', label: 'Traiter correctement le cas n < 2.', points: 1 },
          { id: 'isprime-loop', label: 'Chercher un diviseur avec le reste de la division.', points: 1 },
          { id: 'isprime-result', label: 'Renvoyer 0 ou 1 et exploiter la valeur retournée.', points: 1 },
        ],
      },
      {
        id: 'permuter', title: 'Permuter deux valeurs avec des pointeurs',
        statement: 'Écrire une fonction void permuter(int *a, int *b) qui échange les valeurs de deux entiers. Dans main, appeler cette fonction puis afficher les valeurs permutées.',
        algorithm: `Fonction permuter(a, b)\ntemporaire ← valeur pointée par a\nvaleur pointée par a ← valeur pointée par b\nvaleur pointée par b ← temporaire`,
        code: `#include <stdio.h>\n\nvoid permuter(int *a, int *b) {\n    int temporaire = *a;\n    *a = *b;\n    *b = temporaire;\n}\n\nint main(void) {\n    int x = 4, y = 9;\n    permuter(&x, &y);\n    printf("x=%d y=%d\\n", x, y);\n    return 0;\n}`,
        criteria: [
          { id: 'swap-pointers', label: 'Passer les adresses des deux variables à la fonction.', points: 1 },
          { id: 'swap-temp', label: 'Utiliser une variable temporaire pour échanger et afficher les valeurs.', points: 1 },
        ],
      },
    ],
  },
]
