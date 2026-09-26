import { useState } from 'react'
import { getPassingScore, shuffleQuestions } from './data/questionSelection'

import { findLessonById } from './data/course'

import './LessonPage.css'

const lessonDefinitions = {
  for: {
    steps: [
      {
        id: 'objectif',
        label: 'Objectif',
      },
      {
        id: 'notion',
        label: 'Boucle for',
      },
      {
        id: 'raisonnement',
        label: 'Raisonnement',
      },
      {
        id: 'exercice',
        label: 'Exercice',
      },
      {
        id: 'validation',
        label: 'Validation',
      },
    ],

    icon: '🔁',

    objectiveTitle:
      'Maîtriser une boucle dont la structure regroupe départ, condition et progression.',

    objectiveText:
      'La boucle for est particulièrement adaptée lorsqu’on connaît ou qu’on peut contrôler le nombre d’itérations. Pour un devoir, tu dois savoir lire sa structure, suivre la variable de contrôle et déterminer exactement combien de fois le bloc est exécuté.',

    skills: [
      {
        title: 'Lire la structure',
        text: 'Identifier immédiatement l’initialisation, la condition et l’incrémentation.',
      },
      {
        title: 'Compter les passages',
        text: 'Déterminer le nombre d’itérations sans exécuter réellement le programme.',
      },
      {
        title: 'Suivre une variable',
        text: 'Actualiser la valeur de la variable de contrôle à chaque tour.',
      },
      {
        title: 'Calculer sans compiler',
        text: 'Déterminer la valeur finale et la sortie du programme sur papier.',
      },
    ],

    keyIdeaTitle:
      'Une boucle for rassemble les trois éléments qui contrôlent la répétition.',

    keyIdea: [
      {
        title: 'Initialisation',
        text: 'Elle fixe la valeur de départ de la variable de contrôle.',
      },
      {
        title: 'Condition',
        text: 'Elle détermine si une nouvelle itération peut être exécutée.',
      },
      {
        title: 'Progression',
        text: 'Elle modifie la variable de contrôle après chaque passage.',
      },
    ],

    syntaxCode: `for (initialisation; condition; progression) {
    instructions;
}`,

    breakdown: [
      {
        symbol: '1',
        title: 'Initialisation',
        text: 'Exécutée une seule fois au début de la boucle.',
      },
      {
        symbol: '2',
        title: 'Condition',
        text: 'Testée avant chaque exécution du bloc.',
      },
      {
        symbol: '3',
        title: 'Instructions',
        text: 'Le bloc est exécuté lorsque la condition est vraie.',
      },
      {
        symbol: '4',
        title: 'Progression',
        text: 'Exécutée après le bloc avant de retester la condition.',
      },
    ],

    exampleTitle: 'Compter de 1 à 3',

    exampleCode: `int i;

for (i = 1; i <= 3; i++) {
    printf("%d ", i);
}`,

    exampleTrace: [
      {
        symbol: '1',
        title: 'Départ',
        text: 'i = 1. La condition 1 <= 3 est vraie.',
      },
      {
        symbol: '2',
        title: 'Premier passage',
        text: 'Le programme affiche 1, puis i devient 2.',
      },
      {
        symbol: '3',
        title: 'Deuxième passage',
        text: 'Le programme affiche 2, puis i devient 3.',
      },
      {
        symbol: '4',
        title: 'Troisième passage',
        text: 'Le programme affiche 3, puis i devient 4.',
      },
      {
        symbol: '5',
        title: 'Arrêt',
        text: 'La condition 4 <= 3 est fausse. La boucle s’arrête.',
      },
    ],

    reasoningCode: `int somme = 0;

for (int i = 1; i <= 4; i++) {
    somme = somme + i;
}`,

    reasoningTrace: [
      {
        symbol: '1',
        title: 'Départ',
        text: 'somme = 0 et i = 1.',
      },
      {
        symbol: '2',
        title: 'Itération 1',
        text: 'somme = 0 + 1 = 1. Puis i devient 2.',
      },
      {
        symbol: '3',
        title: 'Itération 2',
        text: 'somme = 1 + 2 = 3. Puis i devient 3.',
      },
      {
        symbol: '4',
        title: 'Itération 3',
        text: 'somme = 3 + 3 = 6. Puis i devient 4.',
      },
      {
        symbol: '5',
        title: 'Itération 4',
        text: 'somme = 6 + 4 = 10. Puis i devient 5.',
      },
      {
        symbol: '6',
        title: 'Arrêt',
        text: 'La condition 5 <= 4 est fausse. La valeur finale de somme est 10.',
      },
    ],

    method: [
      {
        title: 'Lire le départ',
        text: 'Note la valeur initiale de la variable de contrôle.',
      },
      {
        title: 'Tester',
        text: 'Vérifie la condition avant d’exécuter le bloc.',
      },
      {
        title: 'Exécuter',
        text: 'Applique toutes les instructions du bloc.',
      },
      {
        title: 'Progresser',
        text: 'Applique l’incrémentation puis recommence.',
      },
    ],

    noteTitle: 'Piège à retenir',

    noteText:
      'Contrairement à do...while, la boucle for teste sa condition avant sa première exécution. Si la condition est fausse au départ, le bloc peut ne jamais être exécuté.',

    questions: [
      {
        id: 'q1',
        question:
          'Dans quel cas une boucle for est-elle particulièrement adaptée ?',
        options: [
          {
            id: 'a',
            text: 'Lorsqu’on connaît ou contrôle le nombre d’itérations',
          },
          {
            id: 'b',
            text: 'Lorsqu’on veut obligatoirement une première exécution',
          },
          {
            id: 'c',
            text: 'Lorsqu’on ne veut aucune condition',
          },
          {
            id: 'd',
            text: 'Uniquement lorsqu’on utilise des tableaux',
          },
        ],
        correct: 'a',
        explanation:
          'La boucle for est particulièrement pratique lorsque la répétition est contrôlée par une variable dont l’évolution est connue.',
      },
      {
        id: 'q2',
        question:
          'Quelle écriture correspond à la structure générale d’une boucle for ?',
        options: [
          {
            id: 'a',
            text: 'for condition { initialisation; progression; }',
          },
          {
            id: 'b',
            text: 'for { condition; initialisation; progression; }',
          },
          {
            id: 'c',
            text: 'for (initialisation; condition; progression) { instructions; }',
          },
          {
            id: 'd',
            text: 'for (condition) do { instructions; }',
          },
        ],
        correct: 'c',
        explanation:
          'La structure générale regroupe l’initialisation, la condition et la progression entre les parenthèses.',
      },
      {
        id: 'q3',
        question: 'Quelle est la valeur finale de i ?',
        code: `int i;

for (i = 0; i < 5; i++) {
}`,
        options: [
          {
            id: 'a',
            text: '4',
          },
          {
            id: 'b',
            text: '5',
          },
          {
            id: 'c',
            text: '6',
          },
          {
            id: 'd',
            text: '0',
          },
        ],
        correct: 'b',
        explanation:
          'Les valeurs exécutées sont 0, 1, 2, 3 et 4. Après la dernière progression, i devient 5 et la condition 5 < 5 est fausse.',
      },
      {
        id: 'q4',
        question:
          'Quel résultat affiche ce programme ?',
        code: `for (int i = 1; i <= 3; i++) {
    printf("%d ", i);
}`,
        options: [
          {
            id: 'a',
            text: '1 2',
          },
          {
            id: 'b',
            text: '1 2 3',
          },
          {
            id: 'c',
            text: '0 1 2 3',
          },
          {
            id: 'd',
            text: '1 2 3 4',
          },
        ],
        correct: 'b',
        explanation:
          'La boucle exécute le bloc pour i = 1, puis 2, puis 3.',
      },
      {
        id: 'q5',
        question:
          'Combien de fois le bloc est-il exécuté ?',
        code: `for (int i = 1; i <= 4; i++) {
    printf("%d ", i);
}`,
        options: [
          {
            id: 'a',
            text: '3 fois',
          },
          {
            id: 'b',
            text: '5 fois',
          },
          {
            id: 'c',
            text: '1 fois',
          },
          {
            id: 'd',
            text: '4 fois',
          },
        ],
        correct: 'd',
        explanation:
          'Les valeurs de i qui satisfont la condition sont 1, 2, 3 et 4 : quatre exécutions.',
      },
      {
        id: 'q6',
        question:
          'Quelle est la valeur finale de somme ?',
        code: `int somme = 0;

for (int i = 1; i <= 4; i++) {
    somme = somme + i;
}`,
        options: [
          {
            id: 'a',
            text: '4',
          },
          {
            id: 'b',
            text: '6',
          },
          {
            id: 'c',
            text: '10',
          },
          {
            id: 'd',
            text: '14',
          },
        ],
        correct: 'c',
        explanation:
          'Les additions successives donnent 0 + 1 + 2 + 3 + 4 = 10.',
      },
      {
        id: 'q7',
        question:
          'Que se passe-t-il si la condition est fausse dès le départ ?',
        code: `for (int i = 5; i < 3; i++) {
    printf("%d", i);
}`,
        options: [
          {
            id: 'a',
            text: 'Le bloc est exécuté une fois',
          },
          {
            id: 'b',
            text: 'Le programme recommence automatiquement',
          },
          {
            id: 'c',
            text: 'Le bloc n’est pas exécuté',
          },
          {
            id: 'd',
            text: 'i devient automatiquement 0',
          },
        ],
        correct: 'c',
        explanation:
          'La condition est testée avant l’entrée dans le bloc. Comme 5 < 3 est faux, aucune itération n’a lieu.',
      },
      {
        id: 'q8',
        question:
          'Quelle méthode est la plus efficace pour analyser une boucle for sur papier ?',
        options: [
          {
            id: 'a',
            text: 'Lire uniquement l’incrémentation',
          },
          {
            id: 'b',
            text: 'Ignorer la condition',
          },
          {
            id: 'c',
            text: 'Lire départ → condition → bloc → progression, puis recommencer',
          },
          {
            id: 'd',
            text: 'Compter uniquement les accolades',
          },
        ],
        correct: 'c',
        explanation:
          'Sur papier, il faut suivre l’ordre réel : initialisation, test, exécution du bloc, progression, puis nouveau test.',
      },
    ],

    summary: {
      notion: 'Boucle for',
      skill: 'Compter et suivre des itérations',
      examGoal:
        'Déterminer les valeurs successives et le nombre d’exécutions',
    },
  },

  if: {
    steps: [
      {
        id: 'objectif',
        label: 'Objectif',
      },
      {
        id: 'notion',
        label: 'if / else',
      },
      {
        id: 'raisonnement',
        label: 'Raisonnement',
      },
      {
        id: 'exercice',
        label: 'Exercice',
      },
      {
        id: 'validation',
        label: 'Validation',
      },
    ],

    icon: '🔀',

    objectiveTitle:
      'Apprendre à faire prendre une décision au programme.',

    objectiveText:
      'L’instruction if permet d’exécuter certaines instructions lorsqu’une condition est vraie. Avec else et else if, on peut gérer plusieurs situations. Pour un devoir, il faut savoir évaluer chaque condition avant de déterminer quelles instructions seront exécutées.',

    skills: [
      {
        title: 'Lire une condition',
        text: 'Déterminer rapidement si une expression est vraie ou fausse.',
      },
      {
        title: 'Choisir le bon bloc',
        text: 'Identifier les instructions réellement exécutées.',
      },
      {
        title: 'Suivre plusieurs cas',
        text: 'Analyser if, else et else if dans leur ordre.',
      },
      {
        title: 'Raisonner sur papier',
        text: 'Prévoir le résultat d’un programme sans compilation.',
      },
    ],

    keyIdeaTitle:
      'Une condition décide quel chemin le programme va suivre.',

    keyIdea: [
      {
        title: 'if',
        text: 'Le bloc est exécuté lorsque la condition est vraie.',
      },
      {
        title: 'else',
        text: 'Le bloc alternatif est exécuté lorsque la condition précédente est fausse.',
      },
      {
        title: 'else if',
        text: 'Permet de tester une nouvelle condition lorsque la précédente est fausse.',
      },
    ],

    syntaxCode: `if (condition) {
    instructions;
} else {
    autres_instructions;
}`,

    breakdown: [
      {
        symbol: '1',
        title: 'Évaluer',
        text: 'La condition est transformée mentalement en vraie ou fausse.',
      },
      {
        symbol: '2',
        title: 'if',
        text: 'Si la condition est vraie, le premier bloc est exécuté.',
      },
      {
        symbol: '3',
        title: 'else',
        text: 'Sinon, le bloc alternatif est exécuté lorsqu’il existe.',
      },
      {
        symbol: '4',
        title: 'Continuer',
        text: 'Après le choix, le programme poursuit son exécution.',
      },
    ],

    exampleTitle: 'Décider selon l’âge',

    exampleCode: `int age = 20;

if (age >= 18) {
    printf("Majeur");
} else {
    printf("Mineur");
}`,

    exampleTrace: [
      {
        symbol: '1',
        title: 'Valeur',
        text: 'age vaut 20.',
      },
      {
        symbol: '2',
        title: 'Condition',
        text: '20 >= 18 est vraie.',
      },
      {
        symbol: '3',
        title: 'Choix',
        text: 'Le bloc du if est exécuté.',
      },
      {
        symbol: '4',
        title: 'Affichage',
        text: 'Le programme affiche « Majeur ».',
      },
    ],

    reasoningCode: `int x = 7;

if (x > 10) {
    printf("A");
} else if (x > 5) {
    printf("B");
} else {
    printf("C");
}`,

    reasoningTrace: [
      {
        symbol: '1',
        title: 'Départ',
        text: 'x vaut 7.',
      },
      {
        symbol: '2',
        title: 'Premier test',
        text: '7 > 10 est faux. Le premier bloc n’est pas exécuté.',
      },
      {
        symbol: '3',
        title: 'Deuxième test',
        text: '7 > 5 est vrai.',
      },
      {
        symbol: '4',
        title: 'Choix final',
        text: 'Le programme affiche B. Les tests suivants ne sont pas nécessaires.',
      },
    ],

    method: [
      {
        title: 'Lire les valeurs',
        text: 'Note les valeurs actuelles des variables utilisées dans la condition.',
      },
      {
        title: 'Tester',
        text: 'Transforme chaque condition en vrai ou faux.',
      },
      {
        title: 'Choisir',
        text: 'Exécute uniquement le bloc correspondant au premier cas applicable.',
      },
      {
        title: 'Continuer',
        text: 'Après le choix, reprends la lecture normale du programme.',
      },
    ],

    noteTitle: 'Piège à retenir',

    noteText:
      'Avec else if, dès qu’une condition est vraie dans la chaîne, son bloc est exécuté et les conditions alternatives suivantes ne sont plus choisies.',

    questions: [
      {
        id: 'q1',
        question:
          'Quel est le rôle principal de l’instruction if ?',
        options: [
          {
            id: 'a',
            text: 'Exécuter un bloc lorsque une condition est vraie',
          },
          {
            id: 'b',
            text: 'Répéter automatiquement un bloc',
          },
          {
            id: 'c',
            text: 'Déclarer une variable',
          },
          {
            id: 'd',
            text: 'Afficher obligatoirement du texte',
          },
        ],
        correct: 'a',
        explanation:
          'if permet de choisir l’exécution d’un bloc en fonction d’une condition.',
      },
      {
        id: 'q2',
        question:
          'Quelle syntaxe est correcte ?',
        options: [
          {
            id: 'a',
            text: 'if condition { instructions }',
          },
          {
            id: 'b',
            text: 'if (condition) { instructions }',
          },
          {
            id: 'c',
            text: 'if { condition } (instructions)',
          },
          {
            id: 'd',
            text: 'condition if { instructions }',
          },
        ],
        correct: 'b',
        explanation:
          'La condition est placée entre parenthèses après le mot-clé if.',
      },
      {
        id: 'q3',
        question:
          'Que vaut le test age >= 18 lorsque age vaut 20 ?',
        options: [
          {
            id: 'a',
            text: 'Faux',
          },
          {
            id: 'b',
            text: 'Impossible à déterminer',
          },
          {
            id: 'c',
            text: 'Vrai',
          },
          {
            id: 'd',
            text: 'Erreur de syntaxe',
          },
        ],
        correct: 'c',
        explanation:
          '20 est supérieur ou égal à 18. La condition est donc vraie.',
      },
      {
        id: 'q4',
        question:
          'Quel est le rôle de else ?',
        options: [
          {
            id: 'a',
            text: 'Répéter le bloc du if',
          },
          {
            id: 'b',
            text: 'Exécuter un autre bloc lorsque la condition du if est fausse',
          },
          {
            id: 'c',
            text: 'Arrêter définitivement le programme',
          },
          {
            id: 'd',
            text: 'Déclarer une deuxième variable',
          },
        ],
        correct: 'b',
        explanation:
          'else fournit le chemin alternatif lorsque la condition précédente est fausse.',
      },
      {
        id: 'q5',
        question:
          'À quoi sert principalement else if ?',
        options: [
          {
            id: 'a',
            text: 'Créer une boucle',
          },
          {
            id: 'b',
            text: 'Supprimer la première condition',
          },
          {
            id: 'c',
            text: 'Remplacer toutes les variables',
          },
          {
            id: 'd',
            text: 'Tester une nouvelle condition lorsque la précédente est fausse',
          },
        ],
        correct: 'd',
        explanation:
          'else if permet d’enchaîner plusieurs conditions alternatives.',
      },
      {
        id: 'q6',
        question:
          'Quel caractère sera affiché ?',
        code: `int x = 7;

if (x > 5) {
    printf("A");
} else {
    printf("B");
}`,
        options: [
          {
            id: 'a',
            text: 'A',
          },
          {
            id: 'b',
            text: 'B',
          },
          {
            id: 'c',
            text: 'AB',
          },
          {
            id: 'd',
            text: 'Rien',
          },
        ],
        correct: 'a',
        explanation:
          '7 > 5 est vrai, donc le premier bloc est exécuté et A est affiché.',
      },
      {
        id: 'q7',
        question:
          'Quelle comparaison vérifie correctement que x est égal à 5 ?',
        options: [
          {
            id: 'a',
            text: 'x = 5',
          },
          {
            id: 'b',
            text: 'x == 5',
          },
          {
            id: 'c',
            text: 'x === 5',
          },
          {
            id: 'd',
            text: 'x := 5',
          },
        ],
        correct: 'b',
        explanation:
          'En C, == sert à comparer deux valeurs. = correspond à une affectation.',
      },
      {
        id: 'q8',
        question:
          'Quelle méthode faut-il appliquer pour analyser un if sur papier ?',
        options: [
          {
            id: 'a',
            text: 'Exécuter tous les blocs',
          },
          {
            id: 'b',
            text: 'Ignorer les conditions fausses',
          },
          {
            id: 'c',
            text: 'Évaluer la condition puis suivre uniquement le chemin correspondant',
          },
          {
            id: 'd',
            text: 'Lire uniquement le else',
          },
        ],
        correct: 'c',
        explanation:
          'Il faut déterminer si la condition est vraie ou fausse, puis exécuter mentalement le bon chemin.',
      },
    ],

    summary: {
      notion: 'if / else / else if',
      skill: 'Évaluer une condition et choisir un chemin',
      examGoal:
        'Déterminer quelles instructions sont réellement exécutées',
    },
  },

  switch: {
    steps: [
      {
        id: 'objectif',
        label: 'Objectif',
      },
      {
        id: 'notion',
        label: 'switch',
      },
      {
        id: 'raisonnement',
        label: 'Raisonnement',
      },
      {
        id: 'exercice',
        label: 'Exercice',
      },
      {
        id: 'validation',
        label: 'Validation',
      },
    ],

    icon: '🎛️',

    objectiveTitle:
      'Maîtriser la sélection entre plusieurs cas avec switch.',

    objectiveText:
      'L’instruction switch permet de comparer une expression à plusieurs valeurs possibles grâce aux étiquettes case. Elle est particulièrement utile lorsque plusieurs choix correspondent à une même expression. Pour un devoir, il faut savoir repérer le case choisi, comprendre break et identifier default.',

    skills: [
      {
        title: 'Identifier l’expression',
        text: 'Repérer la valeur utilisée pour sélectionner un case.',
      },
      {
        title: 'Trouver le bon case',
        text: 'Comparer l’expression aux différentes valeurs proposées.',
      },
      {
        title: 'Comprendre break',
        text: 'Savoir quand le programme quitte le switch.',
      },
      {
        title: 'Gérer default',
        text: 'Reconnaître le cas utilisé lorsqu’aucune valeur ne correspond.',
      },
    ],

    keyIdeaTitle:
      'switch permet de sélectionner un bloc parmi plusieurs cas possibles.',

    keyIdea: [
      {
        title: 'switch',
        text: 'Contient l’expression dont la valeur doit être examinée.',
      },
      {
        title: 'case',
        text: 'Associe une valeur précise au bloc correspondant.',
      },
      {
        title: 'break',
        text: 'Permet de sortir du switch après le traitement d’un cas.',
      },
    ],

    syntaxCode: `switch (expression) {
    case valeur1:
        instructions;
        break;

    case valeur2:
        instructions;
        break;

    default:
        instructions;
}`,

    breakdown: [
      {
        symbol: '1',
        title: 'Expression',
        text: 'Le programme évalue la valeur placée dans switch.',
      },
      {
        symbol: '2',
        title: 'case',
        text: 'Chaque case propose une valeur possible.',
      },
      {
        symbol: '3',
        title: 'break',
        text: 'Il permet généralement d’arrêter le traitement du switch.',
      },
      {
        symbol: '4',
        title: 'default',
        text: 'Ce bloc peut être utilisé lorsqu’aucun case ne correspond.',
      },
    ],

    exampleTitle: 'Choisir un jour',

    exampleCode: `int jour = 2;

switch (jour) {
    case 1:
        printf("Lundi");
        break;

    case 2:
        printf("Mardi");
        break;

    default:
        printf("Autre");
}`,

    exampleTrace: [
      {
        symbol: '1',
        title: 'Valeur',
        text: 'jour vaut 2.',
      },
      {
        symbol: '2',
        title: 'Premier case',
        text: '1 ne correspond pas à 2.',
      },
      {
        symbol: '3',
        title: 'Deuxième case',
        text: '2 correspond à jour. Le bloc est exécuté.',
      },
      {
        symbol: '4',
        title: 'break',
        text: 'break quitte le switch après l’affichage de Mardi.',
      },
    ],

    reasoningCode: `int choix = 3;

switch (choix) {
    case 1:
        printf("A");
        break;

    case 2:
        printf("B");
        break;

    case 3:
        printf("C");
        break;

    default:
        printf("D");
}`,

    reasoningTrace: [
      {
        symbol: '1',
        title: 'Départ',
        text: 'choix vaut 3.',
      },
      {
        symbol: '2',
        title: 'Recherche',
        text: 'Le programme examine les cases proposées.',
      },
      {
        symbol: '3',
        title: 'Correspondance',
        text: 'case 3 correspond exactement à la valeur 3.',
      },
      {
        symbol: '4',
        title: 'Résultat',
        text: 'Le programme affiche C puis break quitte le switch.',
      },
    ],

    method: [
      {
        title: 'Lire la valeur',
        text: 'Note l’expression ou la variable utilisée par switch.',
      },
      {
        title: 'Chercher',
        text: 'Compare cette valeur aux différents case.',
      },
      {
        title: 'Exécuter',
        text: 'Lis le bloc du case correspondant.',
      },
      {
        title: 'Arrêter',
        text: 'Repère break et vérifie si le programme sort du switch.',
      },
    ],

    noteTitle: 'Piège à retenir',

    noteText:
      'Sans break, l’exécution peut continuer vers les instructions du case suivant. Pour une analyse sur papier, vérifie toujours la présence de break.',

    questions: [
      {
        id: 'q1',
        question:
          'À quoi sert principalement switch ?',
        options: [
          {
            id: 'a',
            text: 'Choisir un bloc parmi plusieurs cas selon une expression',
          },
          {
            id: 'b',
            text: 'Répéter automatiquement un bloc',
          },
          {
            id: 'c',
            text: 'Déclarer une fonction',
          },
          {
            id: 'd',
            text: 'Lire une variable avec scanf',
          },
        ],
        correct: 'a',
        explanation:
          'switch permet de sélectionner un traitement correspondant à une valeur parmi plusieurs cases.',
      },
      {
        id: 'q2',
        question:
          'Quelle structure correspond correctement à switch ?',
        options: [
          {
            id: 'a',
            text: 'switch expression { case valeur: instructions; }',
          },
          {
            id: 'b',
            text: 'switch (expression) { case valeur: instructions; break; }',
          },
          {
            id: 'c',
            text: 'case (expression) { switch: instructions; }',
          },
          {
            id: 'd',
            text: 'switch { expression; case: valeur; }',
          },
        ],
        correct: 'b',
        explanation:
          'L’expression est placée entre parenthèses et les différents choix sont écrits avec case.',
      },
      {
        id: 'q3',
        question:
          'Quel texte est affiché ?',
        code: `int jour = 2;

switch (jour) {
    case 1:
        printf("Lundi");
        break;

    case 2:
        printf("Mardi");
        break;

    default:
        printf("Autre");
}`,
        options: [
          {
            id: 'a',
            text: 'Lundi',
          },
          {
            id: 'b',
            text: 'Autre',
          },
          {
            id: 'c',
            text: 'Mardi',
          },
          {
            id: 'd',
            text: 'Rien',
          },
        ],
        correct: 'c',
        explanation:
          'jour vaut 2. Le case 2 correspond donc et affiche Mardi.',
      },
      {
        id: 'q4',
        question:
          'Quel est le rôle principal de break dans un switch ?',
        options: [
          {
            id: 'a',
            text: 'Sortir du switch après l’exécution du case',
          },
          {
            id: 'b',
            text: 'Créer un autre case',
          },
          {
            id: 'c',
            text: 'Répéter le case',
          },
          {
            id: 'd',
            text: 'Modifier automatiquement l’expression',
          },
        ],
        correct: 'a',
        explanation:
          'break permet généralement d’arrêter l’exécution du switch après le traitement du case.',
      },
      {
        id: 'q5',
        question:
          'Quand le bloc default est-il utilisé ?',
        options: [
          {
            id: 'a',
            text: 'Toujours avant les cases',
          },
          {
            id: 'b',
            text: 'Uniquement lorsque case 1 est utilisé',
          },
          {
            id: 'c',
            text: 'Lorsqu’aucun case ne correspond',
          },
          {
            id: 'd',
            text: 'Seulement après une boucle',
          },
        ],
        correct: 'c',
        explanation:
          'default permet de traiter le cas où aucune des valeurs proposées par les case ne correspond.',
      },
      {
        id: 'q6',
        question:
          'Quel caractère sera affiché ?',
        code: `int choix = 3;

switch (choix) {
    case 1:
        printf("A");
        break;

    case 2:
        printf("B");
        break;

    case 3:
        printf("C");
        break;

    default:
        printf("D");
}`,
        options: [
          {
            id: 'a',
            text: 'A',
          },
          {
            id: 'b',
            text: 'B',
          },
          {
            id: 'c',
            text: 'D',
          },
          {
            id: 'd',
            text: 'C',
          },
        ],
        correct: 'd',
        explanation:
          'choix vaut 3. Le case 3 est donc sélectionné et affiche C.',
      },
      {
        id: 'q7',
        question:
          'Que peut-il se produire lorsqu’un case ne contient pas de break ?',
        options: [
          {
            id: 'a',
            text: 'Le programme s’arrête toujours immédiatement',
          },
          {
            id: 'b',
            text: 'L’exécution peut continuer dans le case suivant',
          },
          {
            id: 'c',
            text: 'Le switch devient automatiquement une boucle',
          },
          {
            id: 'd',
            text: 'La variable est supprimée',
          },
        ],
        correct: 'b',
        explanation:
          'Sans break, l’exécution peut continuer vers les instructions suivantes, phénomène souvent appelé fall-through.',
      },
      {
        id: 'q8',
        question:
          'Comment analyser un switch correctement sur papier ?',
        options: [
          {
            id: 'a',
            text: 'Lire seulement le default',
          },
          {
            id: 'b',
            text: 'Exécuter tous les cases',
          },
          {
            id: 'c',
            text: 'Lire la valeur, trouver le case correspondant puis suivre les break',
          },
          {
            id: 'd',
            text: 'Ignorer les break',
          },
        ],
        correct: 'c',
        explanation:
          'Il faut partir de la valeur de l’expression, trouver le case correspondant et suivre l’exécution jusqu’au break ou à la fin du switch.',
      },
    ],

    summary: {
      notion: 'switch / case / default',
      skill: 'Sélectionner un cas parmi plusieurs',
      examGoal:
        'Identifier le case exécuté et suivre correctement break',
    },
  },
}

function ControlLessonPage({
  lessonId,
  onBack,
  onComplete,
  alreadyCompleted = false,
}) {
  const definition = lessonDefinitions[lessonId]

  const lessonData = findLessonById(lessonId)

  const [currentStep, setCurrentStep] = useState(0)

  const [answers, setAnswers] = useState({})

  const [submitted, setSubmitted] = useState(false)

  const [score, setScore] = useState(0)
  const [assessmentQuestions, setAssessmentQuestions] = useState(() =>
    shuffleQuestions(definition?.questions || []),
  )

  if (!definition || !lessonData) {
    return (
      <section className="lesson-shell">
        <div className="lesson-empty">
          <button
            type="button"
            className="lesson-back-button"
            onClick={onBack}
          >
            ← Retour
          </button>

          <div className="lesson-empty-icon">
            📚
          </div>

          <h2>
            Leçon indisponible
          </h2>

          <p>
            Cette leçon n'est pas encore disponible dans la version
            actuelle de C-Mastery.
          </p>
        </div>
      </section>
    )
  }

  const totalQuestions =
    assessmentQuestions.length
  const passingScore = getPassingScore(totalQuestions)

  const progressPercentage =
    ((currentStep + 1) /
      definition.steps.length) *
    100

  const chooseAnswer = (
    questionId,
    answer,
  ) => {
    if (submitted) {
      return
    }

    setAnswers((currentAnswers) => ({
      ...currentAnswers,
      [questionId]: answer,
    }))
  }

  const submitExercise = () => {
    let calculatedScore = 0

    assessmentQuestions.forEach(
      (question) => {
        if (
          answers[question.id] ===
          question.correct
        ) {
          calculatedScore += 1
        }
      },
    )

    setScore(calculatedScore)
    setSubmitted(true)

    if (
      calculatedScore >= passingScore
    ) {
      onComplete(lessonId)
    }
  }

  const resetExercise = () => {
    setAnswers({})
    setSubmitted(false)
    setScore(0)
    setAssessmentQuestions(shuffleQuestions(definition.questions))
  }

  const goToNextStep = () => {
    if (
      currentStep <
      definition.steps.length - 1
    ) {
      setCurrentStep(
        (step) => step + 1,
      )

      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }
  }

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(
        (step) => step - 1,
      )

      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }
  }

  const allQuestionsAnswered =
    Object.keys(answers).length ===
    totalQuestions

  return (
    <section className="lesson-shell">
      <header className="lesson-header">
        <button
          type="button"
          className="lesson-back-button"
          onClick={onBack}
        >
          ← <span>Retour à Apprendre</span>
        </button>

        <div className="lesson-title-group">
          <p className="lesson-label">
            MODULE{' '}
            {lessonData.moduleNumber} • LEÇON{' '}
            {lessonData.number}
          </p>

          <h2>
            {lessonData.title}
          </h2>

          <p>
            {definition.objectiveText}
          </p>
        </div>

        {alreadyCompleted && (
          <div className="lesson-completed-badge">
            ✓ Leçon terminée
          </div>
        )}
      </header>

      <div className="lesson-progress-wrapper">
        <div className="lesson-progress-top">
          <span>
            Étape {currentStep + 1} sur{' '}
            {definition.steps.length}
          </span>

          <strong>
            {
              definition.steps[
                currentStep
              ].label
            }
          </strong>
        </div>

        <div className="lesson-progress-track">
          <div
            className="lesson-progress-fill"
            style={{
              width: `${progressPercentage}%`,
            }}
          />
        </div>

        <div className="lesson-step-labels">
          {definition.steps.map(
            (step, index) => (
              <span
                key={step.id}
                className={
                  index === currentStep
                    ? 'lesson-step-label active'
                    : index < currentStep
                      ? 'lesson-step-label done'
                      : 'lesson-step-label'
                }
              >
                {index + 1}.{' '}
                {step.label}
              </span>
            ),
          )}
        </div>
      </div>

      {currentStep === 0 && (
        <div className="lesson-content">
          <section className="lesson-hero-card">
            <div className="lesson-hero-icon">
              {definition.icon}
            </div>

            <div>
              <p className="lesson-section-label">
                OBJECTIF
              </p>

              <h3>
                {definition.objectiveTitle}
              </h3>

              <p>
                {definition.objectiveText}
              </p>
            </div>
          </section>

          <section className="lesson-section">
            <div className="lesson-section-heading">
              <p className="lesson-section-label">
                COMPÉTENCES
              </p>

              <h3>
                À la fin de cette leçon, tu dois savoir :
              </h3>
            </div>

            <div className="lesson-card-grid">
              {definition.skills.map(
                (skill, index) => (
                  <article
                    className="lesson-info-card"
                    key={skill.title}
                  >
                    <div className="lesson-info-number">
                      {String(
                        index + 1,
                      ).padStart(
                        2,
                        '0',
                      )}
                    </div>

                    <h4>
                      {skill.title}
                    </h4>

                    <p>
                      {skill.text}
                    </p>
                  </article>
                ),
              )}
            </div>
          </section>

          <section className="lesson-section">
            <div className="lesson-section-heading">
              <p className="lesson-section-label">
                IDÉE ESSENTIELLE
              </p>

              <h3>
                {definition.keyIdeaTitle}
              </h3>
            </div>

            <div className="lesson-line-list">
              {definition.keyIdea.map(
                (item, index) => (
                  <article
                    className="lesson-line-card"
                    key={item.title}
                  >
                    <div className="lesson-line-symbol">
                      {String(
                        index + 1,
                      ).padStart(
                        2,
                        '0',
                      )}
                    </div>

                    <div>
                      <strong>
                        {item.title}
                      </strong>

                      <p>
                        {item.text}
                      </p>
                    </div>
                  </article>
                ),
              )}
            </div>
          </section>

          <section className="lesson-note">
            <div className="lesson-note-icon">
              🧠
            </div>

            <div>
              <strong>
                Réflexe C-Mastery
              </strong>

              <p>
                Avant de répondre à un exercice, identifie toujours
                la structure de contrôle puis suis son ordre
                d’exécution.
              </p>
            </div>
          </section>
        </div>
      )}

      {currentStep === 1 && (
        <div className="lesson-content">
          <section className="lesson-section">
            <p className="lesson-section-label">
              STRUCTURE
            </p>

            <h3>
              Comprendre la syntaxe
            </h3>

            <div className="lesson-code-block">
              <div className="lesson-code-header">
                <span>
                  structure.c
                </span>

                <span>
                  C
                </span>
              </div>

              <pre>
                <code>
                  {definition.syntaxCode}
                </code>
              </pre>
            </div>
          </section>

          <section className="lesson-section">
            <div className="lesson-line-list">
              {definition.breakdown.map(
                (item) => (
                  <article
                    className="lesson-line-card"
                    key={item.symbol}
                  >
                    <div className="lesson-line-symbol">
                      {item.symbol}
                    </div>

                    <div>
                      <strong>
                        {item.title}
                      </strong>

                      <p>
                        {item.text}
                      </p>
                    </div>
                  </article>
                ),
              )}
            </div>
          </section>

          <section className="lesson-section">
            <p className="lesson-section-label">
              EXEMPLE SIMPLE
            </p>

            <h3>
              {definition.exampleTitle}
            </h3>

            <div className="lesson-code-block">
              <div className="lesson-code-header">
                <span>
                  exemple.c
                </span>

                <span>
                  C
                </span>
              </div>

              <pre>
                <code>
                  {definition.exampleCode}
                </code>
              </pre>
            </div>
          </section>

          <section className="lesson-line-list">
            {definition.exampleTrace.map(
              (item) => (
                <article
                  className="lesson-line-card"
                  key={item.symbol}
                >
                  <div className="lesson-line-symbol">
                    {item.symbol}
                  </div>

                  <div>
                    <strong>
                      {item.title}
                    </strong>

                    <p>
                      {item.text}
                    </p>
                  </div>
                </article>
              ),
            )}
          </section>

          <section className="lesson-note">
            <div className="lesson-note-icon">
              ⚠️
            </div>

            <div>
              <strong>
                {definition.noteTitle}
              </strong>

              <p>
                {definition.noteText}
              </p>
            </div>
          </section>
        </div>
      )}

      {currentStep === 2 && (
        <div className="lesson-content">
          <section className="lesson-hero-card compact">
            <div className="lesson-hero-icon">
              🧠
            </div>

            <div>
              <p className="lesson-section-label">
                RAISONNEMENT SUR PAPIER
              </p>

              <h3>
                Lis le programme dans son ordre réel d’exécution.
              </h3>

              <p>
                Le but n’est pas de mémoriser le résultat. Il faut
                suivre les valeurs et les décisions du programme
                une étape après l’autre.
              </p>
            </div>
          </section>

          <section className="lesson-section">
            <div className="lesson-section-heading">
              <p className="lesson-section-label">
                EXEMPLE
              </p>

              <h3>
                Suivre un calcul progressivement
              </h3>
            </div>

            <div className="lesson-code-block">
              <div className="lesson-code-header">
                <span>
                  raisonnement.c
                </span>

                <span>
                  À ANALYSER
                </span>
              </div>

              <pre>
                <code>
                  {definition.reasoningCode}
                </code>
              </pre>
            </div>
          </section>

          <section className="lesson-line-list">
            {definition.reasoningTrace.map(
              (item) => (
                <article
                  className="lesson-line-card"
                  key={item.symbol}
                >
                  <div className="lesson-line-symbol">
                    {item.symbol}
                  </div>

                  <div>
                    <strong>
                      {item.title}
                    </strong>

                    <p>
                      {item.text}
                    </p>
                  </div>
                </article>
              ),
            )}
          </section>

          <section className="lesson-section">
            <div className="lesson-section-heading">
              <p className="lesson-section-label">
                MÉTHODE
              </p>

              <h3>
                La trace mentale à appliquer en examen
              </h3>
            </div>

            <div className="lesson-card-grid">
              {definition.method.map(
                (item, index) => (
                  <article
                    className="lesson-info-card"
                    key={item.title}
                  >
                    <div className="lesson-info-number">
                      {String(
                        index + 1,
                      ).padStart(
                        2,
                        '0',
                      )}
                    </div>

                    <h4>
                      {item.title}
                    </h4>

                    <p>
                      {item.text}
                    </p>
                  </article>
                ),
              )}
            </div>
          </section>

          <section className="lesson-note">
            <div className="lesson-note-icon">
              ✍️
            </div>

            <div>
              <strong>
                Technique de brouillon
              </strong>

              <p>
                Note les valeurs importantes dans l’ordre au lieu
                d’essayer d’anticiper toute la réponse en une seule
                fois.
              </p>
            </div>
          </section>
        </div>
      )}

      {currentStep === 3 && (
        <div className="lesson-content">
          <section className="lesson-section">
            <p className="lesson-section-label">
              MINI-EXAMEN
            </p>

            <h3>
              {totalQuestions} questions — analyse sans compilateur.
            </h3>

            <p className="lesson-introduction">
              Pour valider cette leçon, il faut obtenir{' '}
              <strong>
                {passingScore}/{totalQuestions}
              </strong>
              .
            </p>
          </section>

          {assessmentQuestions.map(
            (question, index) => {
              const selectedAnswer =
                answers[question.id]

              const isCorrect =
                selectedAnswer ===
                question.correct

              return (
                <section
                  className="lesson-exam-card"
                  key={question.id}
                >
                  <div className="lesson-exam-header">
                    <span>
                      EXERCICE {index + 1}
                    </span>

                    <strong>
                      1 point
                    </strong>
                  </div>

                  {question.code && (
                    <pre className="lesson-small-code">
                      <code>
                        {question.code}
                      </code>
                    </pre>
                  )}

                  <h4>
                    {question.question}
                  </h4>

                  <div className="quiz-options">
                    {question.options.map(
                      (option) => {
                        const isSelected =
                          selectedAnswer ===
                          option.id

                        const optionIsCorrect =
                          submitted &&
                          option.id ===
                            question.correct

                        return (
                          <button
                            key={
                              option.id
                            }
                            type="button"
                            className={`quiz-option ${
                              isSelected
                                ? 'selected'
                                : ''
                            } ${
                              optionIsCorrect
                                ? 'correct'
                                : ''
                            }`}
                            onClick={() =>
                              chooseAnswer(
                                question.id,
                                option.id,
                              )
                            }
                            disabled={
                              submitted
                            }
                          >
                            <span className="quiz-letter">
                              {option.id.toUpperCase()}
                            </span>

                            <span>
                              {option.text}
                            </span>
                          </button>
                        )
                      },
                    )}
                  </div>

                  {submitted && (
                    <div
                      className={
                        isCorrect
                          ? 'quiz-feedback correct'
                          : 'quiz-feedback incorrect'
                      }
                    >
                      <strong>
                        {isCorrect
                          ? '✓ Correct.'
                          : '✗ Incorrect.'}
                      </strong>{' '}
                      {question.explanation}
                    </div>
                  )}
                </section>
              )
            },
          )}

          {!submitted ? (
            <button
              type="button"
              className="lesson-primary-button"
              disabled={!allQuestionsAnswered}
              onClick={submitExercise}
            >
              Valider mes réponses
              <span>
                →
              </span>
            </button>
          ) : (
            <div className="lesson-result-card">
              <div className="lesson-result-score">
                {score}/{totalQuestions}
              </div>

              <div>
                <strong>
                  {score ===
                  totalQuestions
                    ? 'Maîtrise validée.'
                    : 'La maîtrise n’est pas encore validée.'}
                </strong>

                <p>
                  {score ===
                  totalQuestions
                    ? 'Tu peux maintenant passer à la validation de la leçon.'
                    : `Relis les notions puis vise au moins ${passingScore}/${totalQuestions}.`}
                </p>
              </div>

              {score <
                totalQuestions && (
                <button
                  type="button"
                  className="lesson-secondary-button"
                  onClick={
                    resetExercise
                  }
                >
                  Recommencer
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {currentStep === 4 && (
        <div className="lesson-content">
          <section className="lesson-completion-card">
            <div className="lesson-completion-icon">
              {alreadyCompleted ||
              score >= passingScore
                ? '✓'
                : '🎯'}
            </div>

            <p className="lesson-section-label">
              VALIDATION
            </p>

            <h3>
              {alreadyCompleted ||
              score >= passingScore
                ? `${lessonData.title} maîtrisé.`
                : 'Tu es arrivé à la fin de la leçon.'}
            </h3>

            <p>
              {alreadyCompleted ||
              score >= passingScore
                ? 'Tu sais maintenant reconnaître cette structure de contrôle, suivre son fonctionnement et déterminer son résultat sans compiler.'
                : `Pour valider cette leçon, obtiens au moins ${passingScore}/${totalQuestions}.`}
            </p>

            <div className="lesson-summary">
              <div>
                <span>
                  Notion
                </span>

                <strong>
                  {definition.summary.notion}
                </strong>
              </div>

              <div>
                <span>
                  Compétence
                </span>

                <strong>
                  {definition.summary.skill}
                </strong>
              </div>

              <div>
                <span>
                  Objectif examen
                </span>

                <strong>
                  {definition.summary.examGoal}
                </strong>
              </div>
            </div>

            {alreadyCompleted ||
            score >= passingScore ? (
              <button
                type="button"
                className="lesson-primary-button"
                onClick={onBack}
              >
                Retour au parcours
                <span>
                  →
                </span>
              </button>
            ) : (
              <button
                type="button"
                className="lesson-secondary-button"
                onClick={() =>
                  setCurrentStep(3)
                }
              >
                Refaire l'exercice
              </button>
            )}
          </section>
        </div>
      )}

      <footer className="lesson-navigation">
        <button
          type="button"
          className="lesson-secondary-button"
          onClick={
            goToPreviousStep
          }
          disabled={
            currentStep === 0
          }
        >
          ← Précédent
        </button>

        {currentStep <
        definition.steps.length - 1 ? (
          <button
            type="button"
            className="lesson-primary-button"
            onClick={
              goToNextStep
            }
            disabled={
              currentStep === 3 &&
              score < passingScore &&
              !alreadyCompleted
            }
          >
            {currentStep === 3
              ? 'Voir la validation'
              : 'Continuer'}

            <span>
              →
            </span>
          </button>
        ) : (
          <button
            type="button"
            className="lesson-secondary-button"
            onClick={onBack}
          >
            Quitter la leçon
          </button>
        )}
      </footer>
    </section>
  )
}

export default ControlLessonPage
