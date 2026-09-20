const exercises = [
  {
    id: 'output-01',
    type: 'Prédire le résultat',
    category: 'Lecture de code',
    title: 'Que va afficher ce programme ?',
    code: `#include <stdio.h>

int main() {
    int x = 4;
    printf("%d", x + 3);

    return 0;
}`,
    question:
      "Sans compiler, détermine exactement ce qui sera affiché à l'écran.",
    options: [
      {
        id: 'a',
        text: '4',
      },
      {
        id: 'b',
        text: '7',
      },
      {
        id: 'c',
        text: '43',
      },
      {
        id: 'd',
        text: 'x + 3',
      },
    ],
    correct: 'b',
    explanation:
      'x vaut 4. L’expression x + 3 vaut donc 7. printf affiche ensuite cette valeur avec %d.',
    skill: 'Lecture et sortie',
  },

  {
    id: 'trace-01',
    type: 'Suivre une variable',
    category: 'Raisonnement',
    title: 'Quelle est la valeur finale de a ?',
    code: `int a = 2;

a = a * 3;
a = a - 1;
a = a + 4;`,
    question:
      'Suis la valeur de a instruction par instruction et donne sa valeur finale.',
    options: [
      {
        id: 'a',
        text: '5',
      },
      {
        id: 'b',
        text: '9',
      },
      {
        id: 'c',
        text: '10',
      },
      {
        id: 'd',
        text: '11',
      },
    ],
    correct: 'b',
    explanation:
      'a commence à 2. Puis 2 × 3 = 6, ensuite 6 - 1 = 5, puis 5 + 4 = 9. La bonne valeur finale est donc 9.',
    skill: 'Suivi des variables',
  },

  {
    id: 'debug-01',
    type: 'Trouver l’erreur',
    category: 'Débogage',
    title: 'Quelle correction faut-il faire ?',
    code: `#include <stdio.h>

int main() {
    int age;

    scanf("%d", age);

    return 0;
}`,
    question:
      'Quelle modification permet de transmettre correctement l’adresse de age à scanf ?',
    options: [
      {
        id: 'a',
        text: 'scanf("%d", &age);',
      },
      {
        id: 'b',
        text: 'scanf("%d", *age);',
      },
      {
        id: 'c',
        text: 'scanf("%d", age*);',
      },
      {
        id: 'd',
        text: 'scanf("%d", &age*);',
      },
    ],
    correct: 'a',
    explanation:
      'Pour une variable entière age, scanf reçoit ici son adresse : &age.',
    skill: 'Entrées et sorties',
  },

  {
    id: 'output-02',
    type: 'Prédire le résultat',
    category: 'Lecture de code',
    title: 'Attention à l’ordre des instructions',
    code: `int x = 10;

x = x - 3;
x = x * 2;

printf("%d", x);`,
    question: 'Quelle valeur sera affichée ?',
    options: [
      {
        id: 'a',
        text: '4',
      },
      {
        id: 'b',
        text: '7',
      },
      {
        id: 'c',
        text: '14',
      },
      {
        id: 'd',
        text: '20',
      },
    ],
    correct: 'c',
    explanation:
      'x vaut 10, puis 7 après x = x - 3, puis 14 après x = x * 2.',
    skill: 'Suivi des variables',
  },

  {
    id: 'debug-02',
    type: 'Trouver l’erreur',
    category: 'Syntaxe',
    title: 'Repérer le symbole manquant',
    code: `#include <stdio.h>

int main() {
    int age = 20
    printf("%d", age);

    return 0;
}`,
    question: 'Quelle correction est nécessaire ?',
    options: [
      {
        id: 'a',
        text: 'Ajouter ; après 20',
      },
      {
        id: 'b',
        text: 'Ajouter : après 20',
      },
      {
        id: 'c',
        text: 'Ajouter , après 20',
      },
      {
        id: 'd',
        text: 'Supprimer age',
      },
    ],
    correct: 'a',
    explanation:
      'En C, l’instruction int age = 20 doit se terminer par un point-virgule.',
    skill: 'Syntaxe',
  },
]

export default exercises