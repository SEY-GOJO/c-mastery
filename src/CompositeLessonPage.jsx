import { useState } from 'react'
import { findLessonById } from './data/course'
import './LessonPage.css'

const lessonDefinitions = {
  tableaux: {
    title: 'Les tableaux',
    subtitle: 'Stocker plusieurs valeurs du même type',
    icon: '📊',
    objective: [
      'Comprendre ce qu’est un tableau en C.',
      'Savoir déclarer et initialiser un tableau à une dimension.',
      'Savoir accéder à une case avec son indice.',
      'Savoir raisonner sur les indices sans compiler.'
    ],
    notion: {
      title: 'Tableaux à une dimension',
      sections: [
        {
          title: 'Définition',
          text:
            'Un tableau est une structure qui permet de stocker plusieurs valeurs de même type sous un même nom.'
        },
        {
          title: 'Déclaration',
          code: `int notes[5];`,
          text:
            'Ici, notes peut contenir 5 entiers. Les indices vont de 0 à 4.'
        },
        {
          title: 'Initialisation',
          code: `int notes[5] = {12, 15, 10, 14, 16};`,
          text:
            'Les cinq cases sont initialisées dès la déclaration.'
        },
        {
          title: 'Accès à une case',
          code: `printf("%d", notes[2]);`,
          text:
            'notes[2] correspond à la troisième case, car le premier indice est 0.'
        }
      ]
    },
    reasoning: {
      title: 'Raisonner sur un tableau',
      points: [
        {
          title: 'Étape 1 — Repérer les indices',
          text:
            'Pour un tableau de taille 5, les indices sont 0, 1, 2, 3 et 4.'
        },
        {
          title: 'Étape 2 — Lire les valeurs',
          text:
            'Chaque indice correspond à une case précise. Il faut toujours faire attention au décalage entre le numéro de la case et son indice.'
        },
        {
          title: 'Étape 3 — Suivre les modifications',
          text:
            'Si une instruction change notes[3], seule la quatrième case est modifiée.'
        }
      ],
      code: `int t[4] = {5, 8, 2, 9};

t[1] = 20;

printf("%d", t[1]);`,
      result: 'Résultat : 20'
    },
    questions: [
      {
        id: 'tab-1',
        question: 'Combien de cases contient int t[6] ?',
        options: ['5', '6', '7', 'Cela dépend des valeurs'],
        correct: 'b',
        explanation: 'La taille indiquée entre crochets est 6 : le tableau contient donc 6 cases.'
      },
      {
        id: 'tab-2',
        question: 'Quel est le premier indice d’un tableau en C ?',
        options: ['0', '1', '-1', 'Cela dépend du type'],
        correct: 'a',
        explanation: 'Les indices des tableaux en C commencent à 0.'
      },
      {
        id: 'tab-3',
        question: 'Dans int a[5], quel est le dernier indice valide ?',
        options: ['5', '4', '3', '6'],
        correct: 'b',
        explanation: 'Un tableau de 5 cases possède les indices 0 à 4.'
      },
      {
        id: 'tab-4',
        question: 'Que contient t[2] si int t[4] = {10, 20, 30, 40} ?',
        options: ['10', '20', '30', '40'],
        correct: 'c',
        explanation: 't[0]=10, t[1]=20, t[2]=30 et t[3]=40.'
      },
      {
        id: 'tab-5',
        question: 'Quelle déclaration crée un tableau de 10 nombres réels de type double ?',
        options: ['double t[10];', 'double t(10);', 'real t[10];', 'float[10] t;'],
        correct: 'a',
        explanation: 'La syntaxe correcte est type nom[taille];'
      },
      {
        id: 'tab-6',
        question: 'Que devient t[1] après int t[3] = {4, 7, 9}; puis t[1] = 15; ?',
        options: ['4', '7', '15', '9'],
        correct: 'c',
        explanation: 'La deuxième case correspond à l’indice 1 et sa valeur est remplacée par 15.'
      },
      {
        id: 'tab-7',
        question: 'Quelle instruction affiche la troisième valeur du tableau t ?',
        options: ['printf("%d", t[3]);', 'printf("%d", t[2]);', 'printf("%d", t[1]);', 'printf("%d", t[0]);'],
        correct: 'b',
        explanation: 'La troisième case possède l’indice 2.'
      },
      {
        id: 'tab-8',
        question: 'Pour parcourir les 5 cases de t, quelle boucle est adaptée ?',
        options: [
          'for (int i = 0; i < 5; i++)',
          'for (int i = 1; i <= 5; i++)',
          'for (int i = 0; i <= 5; i++)',
          'for (int i = 1; i < 5; i++)'
        ],
        correct: 'a',
        explanation: 'Les indices vont de 0 à 4, donc i doit commencer à 0 et rester strictement inférieur à 5.'
      }
    ]
  },

  'tableaux-2d': {
    title: 'Les tableaux à deux dimensions',
    subtitle: 'Manipuler des lignes et des colonnes',
    icon: '🧮',
    objective: [
      'Comprendre la notion de tableau à deux dimensions.',
      'Savoir déclarer une matrice en C.',
      'Comprendre les indices ligne/colonne.',
      'Savoir suivre les valeurs lors d’un parcours.'
    ],
    notion: {
      title: 'Tableaux à deux dimensions',
      sections: [
        {
          title: 'Définition',
          text:
            'Un tableau à deux dimensions permet d’organiser des valeurs sous forme de lignes et de colonnes.'
        },
        {
          title: 'Déclaration',
          code: `int mat[3][4];`,
          text:
            'Ce tableau possède 3 lignes et 4 colonnes, soit 12 cases.'
        },
        {
          title: 'Initialisation',
          code: `int mat[2][3] = {
    {1, 2, 3},
    {4, 5, 6}
};`,
          text:
            'On peut représenter les données ligne par ligne.'
        },
        {
          title: 'Accès',
          code: `printf("%d", mat[1][2]);`,
          text:
            'mat[1][2] correspond à la deuxième ligne et à la troisième colonne.'
        }
      ]
    },
    reasoning: {
      title: 'Raisonner avec lignes et colonnes',
      points: [
        {
          title: 'Étape 1 — Identifier la ligne',
          text:
            'Le premier indice représente la ligne et commence à 0.'
        },
        {
          title: 'Étape 2 — Identifier la colonne',
          text:
            'Le deuxième indice représente la colonne et commence également à 0.'
        },
        {
          title: 'Étape 3 — Parcourir le tableau',
          text:
            'On utilise généralement une boucle pour les lignes et une autre pour les colonnes.'
        }
      ],
      code: `int m[2][2] = {
    {1, 2},
    {3, 4}
};

printf("%d", m[1][0]);`,
      result: 'Résultat : 3'
    },
    questions: [
      {
        id: 'tab2-1',
        question: 'Combien de cases contient int m[3][4] ?',
        options: ['7', '10', '12', '16'],
        correct: 'c',
        explanation: '3 lignes × 4 colonnes = 12 cases.'
      },
      {
        id: 'tab2-2',
        question: 'Dans m[2][5], quel est le nombre de lignes ?',
        options: ['2', '5', '7', 'Cela dépend'],
        correct: 'a',
        explanation: 'Le premier nombre représente le nombre de lignes.'
      },
      {
        id: 'tab2-3',
        question: 'Dans m[2][5], quel est le dernier indice de ligne ?',
        options: ['2', '1', '5', '4'],
        correct: 'b',
        explanation: 'Avec 2 lignes, les indices de ligne sont 0 et 1.'
      },
      {
        id: 'tab2-4',
        question: 'Dans m[3][4], quel est le dernier indice de colonne ?',
        options: ['3', '4', '5', '2'],
        correct: 'a',
        explanation: 'Avec 4 colonnes, les indices de colonne vont de 0 à 3.'
      },
      {
        id: 'tab2-5',
        question: 'Si int m[2][2] = {{1,2},{3,4}}, que vaut m[0][1] ?',
        options: ['1', '2', '3', '4'],
        correct: 'b',
        explanation: 'La première ligne contient 1 puis 2.'
      },
      {
        id: 'tab2-6',
        question: 'Si int m[2][2] = {{1,2},{3,4}}, que vaut m[1][1] ?',
        options: ['1', '2', '3', '4'],
        correct: 'd',
        explanation: 'La deuxième ligne et la deuxième colonne correspondent à la valeur 4.'
      },
      {
        id: 'tab2-7',
        question: 'Quel est le nombre de boucles imbriquées généralement utilisé pour parcourir une matrice ?',
        options: ['0', '1', '2', '3 obligatoirement'],
        correct: 'c',
        explanation: 'On utilise généralement une boucle pour les lignes et une autre pour les colonnes.'
      },
      {
        id: 'tab2-8',
        question: 'Que représente m[i][j] ?',
        options: [
          'La taille de la matrice',
          'La case située à la ligne i et à la colonne j',
          'La colonne i et la ligne j',
          'La dernière case'
        ],
        correct: 'b',
        explanation: 'Le premier indice correspond à la ligne et le second à la colonne.'
      }
    ]
  },

  structures: {
    title: 'Les structures',
    subtitle: 'Regrouper plusieurs informations de types différents',
    icon: '🧱',
    objective: [
      'Comprendre le rôle d’une structure.',
      'Savoir déclarer un type structuré.',
      'Savoir créer une variable de type structure.',
      'Accéder aux différents champs d’une structure.'
    ],
    notion: {
      title: 'Les structures en C',
      sections: [
        {
          title: 'Définition',
          text:
            'Une structure permet de regrouper plusieurs données qui peuvent être de types différents sous un même ensemble.'
        },
        {
          title: 'Déclaration',
          code: `struct Etudiant {
    char nom[30];
    int age;
    double note;
};`,
          text:
            'La structure contient ici trois champs : nom, age et note.'
        },
        {
          title: 'Déclaration d’une variable',
          code: `struct Etudiant e1;`,
          text:
            'e1 est une variable de type struct Etudiant.'
        },
        {
          title: 'Accès aux champs',
          code: `e1.age = 20;
e1.note = 15.5;`,
          text:
            'L’opérateur . permet d’accéder à un champ d’une structure.'
        }
      ]
    },
    reasoning: {
      title: 'Raisonner sur une structure',
      points: [
        {
          title: 'Étape 1 — Identifier le type',
          text:
            'On repère la structure utilisée et les champs qu’elle contient.'
        },
        {
          title: 'Étape 2 — Repérer la variable',
          text:
            'On détermine quelle variable de structure est modifiée.'
        },
        {
          title: 'Étape 3 — Suivre le champ',
          text:
            'Une modification de e1.age ne change pas e1.note.'
        }
      ],
      code: `struct Etudiant {
    int age;
    double note;
};

struct Etudiant e;

e.age = 21;
e.note = 14.5;`,
      result: 'Après les instructions : e.age = 21 et e.note = 14.5'
    },
    questions: [
      {
        id: 'struct-1',
        question: 'À quoi sert principalement une structure ?',
        options: [
          'Répéter une instruction',
          'Regrouper plusieurs données',
          'Faire une condition',
          'Créer uniquement des tableaux'
        ],
        correct: 'b',
        explanation: 'Une structure regroupe plusieurs données sous une même entité.'
      },
      {
        id: 'struct-2',
        question: 'Une structure peut-elle contenir des champs de types différents ?',
        options: ['Oui', 'Non', 'Uniquement des int', 'Uniquement des double'],
        correct: 'a',
        explanation: 'C’est justement l’un des principaux intérêts des structures.'
      },
      {
        id: 'struct-3',
        question: 'Quel opérateur permet d’accéder à un champ d’une structure ?',
        options: ['->', '.', '&', '*'],
        correct: 'b',
        explanation: 'Pour une variable de structure classique, on utilise l’opérateur point .'
      },
      {
        id: 'struct-4',
        question: 'Que représente e.age ?',
        options: [
          'La structure entière',
          'Le champ age de la variable e',
          'Le nom du type',
          'La taille de e'
        ],
        correct: 'b',
        explanation: 'e.age désigne le champ age appartenant à la variable e.'
      },
      {
        id: 'struct-5',
        question: 'Quelle déclaration est correcte ?',
        options: [
          'struct Etudiant e1;',
          'structure Etudiant e1;',
          'Etudiant struct e1;',
          'struct = Etudiant e1;'
        ],
        correct: 'a',
        explanation: 'On déclare une variable avec struct suivi du nom de la structure.'
      },
      {
        id: 'struct-6',
        question: 'Si e.age = 20 puis e.age = 25, quelle est la valeur finale de e.age ?',
        options: ['20', '25', '45', '5'],
        correct: 'b',
        explanation: 'La deuxième affectation remplace la première.'
      },
      {
        id: 'struct-7',
        question: 'Modifier e.note modifie-t-il automatiquement e.age ?',
        options: ['Oui', 'Non', 'Seulement si age est un int', 'Toujours'],
        correct: 'b',
        explanation: 'Chaque champ est une donnée distincte.'
      },
      {
        id: 'struct-8',
        question: 'Quelle instruction affecte correctement 18 à age ?',
        options: [
          'age.e = 18;',
          'e.age = 18;',
          'e->age = 18; obligatoire',
          'struct.age = 18;'
        ],
        correct: 'b',
        explanation: 'Pour une variable e de type structure, l’accès au champ se fait avec e.age.'
      }
    ]
  },

  enum: {
    title: 'Les énumérations',
    subtitle: 'Donner des noms à un ensemble de valeurs',
    icon: '🔢',
    objective: [
      'Comprendre le rôle d’une énumération.',
      'Savoir déclarer un enum.',
      'Comprendre les valeurs associées aux constantes.',
      'Savoir utiliser une variable de type énuméré.'
    ],
    notion: {
      title: 'Les types énumérés',
      sections: [
        {
          title: 'Définition',
          text:
            'Une énumération permet de définir un ensemble de constantes nommées.'
        },
        {
          title: 'Déclaration',
          code: `enum Jour {
    LUNDI,
    MARDI,
    MERCREDI,
    JEUDI,
    VENDREDI
};`,
          text:
            'Les constantes sont listées dans un ordre précis.'
        },
        {
          title: 'Valeurs par défaut',
          code: `LUNDI = 0
MARDI = 1
MERCREDI = 2
JEUDI = 3
VENDREDI = 4`,
          text:
            'Par défaut, la première constante vaut 0 puis les suivantes augmentent de 1.'
        },
        {
          title: 'Utilisation',
          code: `enum Jour j;

j = MERCREDI;`,
          text:
            'j peut recevoir une des constantes définies dans l’énumération.'
        }
      ]
    },
    reasoning: {
      title: 'Raisonner sur un enum',
      points: [
        {
          title: 'Étape 1 — Lire l’ordre',
          text:
            'Repère la première constante puis suis leur ordre.'
        },
        {
          title: 'Étape 2 — Déterminer les valeurs',
          text:
            'Sans valeur imposée, la première constante vaut 0 et les suivantes augmentent de 1.'
        },
        {
          title: 'Étape 3 — Suivre l’affectation',
          text:
            'Quand une variable reçoit une constante, il faut distinguer le nom de la constante de sa valeur numérique.'
        }
      ],
      code: `enum Couleur {
    ROUGE,
    VERT,
    BLEU
};

enum Couleur c;
c = BLEU;`,
      result: 'BLEU correspond par défaut à la valeur 2.'
    },
    questions: [
      {
        id: 'enum-1',
        question: 'À quoi sert principalement enum ?',
        options: [
          'Créer une boucle',
          'Définir un ensemble de constantes nommées',
          'Créer un pointeur',
          'Créer un fichier'
        ],
        correct: 'b',
        explanation: 'enum permet de définir des constantes nommées appartenant à un ensemble.'
      },
      {
        id: 'enum-2',
        question: 'Quelle valeur reçoit la première constante par défaut ?',
        options: ['0', '1', '-1', '10'],
        correct: 'a',
        explanation: 'Sans valeur explicitement donnée, la première constante vaut 0.'
      },
      {
        id: 'enum-3',
        question: 'Dans enum X {A, B, C}, quelle est la valeur de B ?',
        options: ['0', '1', '2', '3'],
        correct: 'b',
        explanation: 'A vaut 0, B vaut 1 et C vaut 2.'
      },
      {
        id: 'enum-4',
        question: 'Dans enum X {A, B, C}, quelle est la valeur de C ?',
        options: ['0', '1', '2', '3'],
        correct: 'c',
        explanation: 'C est la troisième constante, donc elle vaut 2 par défaut.'
      },
      {
        id: 'enum-5',
        question: 'Quelle déclaration est correcte ?',
        options: [
          'enum Jour {LUNDI, MARDI};',
          'enum Jour = {LUNDI, MARDI};',
          'enumeration Jour {LUNDI, MARDI};',
          'Jour enum {LUNDI, MARDI};'
        ],
        correct: 'a',
        explanation: 'La syntaxe correcte commence par enum suivi du nom puis de la liste des constantes.'
      },
      {
        id: 'enum-6',
        question: 'Dans enum Etat {OFF = 2, ON}, quelle est la valeur de ON ?',
        options: ['0', '1', '2', '3'],
        correct: 'd',
        explanation: 'ON vient après OFF = 2, donc ON vaut 3.'
      },
      {
        id: 'enum-7',
        question: 'Une variable enum peut recevoir une constante définie dans cet enum.',
        options: ['Vrai', 'Faux', 'Uniquement avec printf', 'Uniquement avec scanf'],
        correct: 'a',
        explanation: 'Une variable de type enum peut recevoir les constantes prévues par cette énumération.'
      },
      {
        id: 'enum-8',
        question: 'Dans enum Couleur {ROUGE, VERT, BLEU}, que vaut BLEU ?',
        options: ['0', '1', '2', '3'],
        correct: 'c',
        explanation: 'ROUGE=0, VERT=1 et BLEU=2 par défaut.'
      }
    ]
  }
}

function getLetter(index) {
  return String.fromCharCode(97 + index)
}

export default function CompositeLessonPage({
  lessonId,
  onBack,
  onComplete,
  alreadyCompleted
}) {
  const definition = lessonDefinitions[lessonId]
  const courseLesson = findLessonById(lessonId)

  const [currentStep, setCurrentStep] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)

  if (!definition || !courseLesson) {
    return (
      <section className="lesson-page">
        <div className="lesson-header">
          <button className="secondary-button" onClick={onBack}>
            ← Retour
          </button>

          <div className="lesson-header-content">
            <span className="lesson-badge">Module 03</span>
            <h1>Leçon indisponible</h1>
            <p>Cette leçon n’est pas encore disponible dans C-Mastery.</p>
          </div>
        </div>
      </section>
    )
  }

  const questions = definition.questions
  const totalQuestions = questions.length
  const isPerfectScore = submitted && score === totalQuestions

  const steps = [
    { label: 'Objectif', icon: '🎯' },
    { label: 'Notion', icon: '📘' },
    { label: 'Raisonnement', icon: '🧠' },
    { label: 'Exercice', icon: '✍️' },
    { label: 'Validation', icon: '✅' }
  ]

  const chooseAnswer = (questionId, answer) => {
    if (submitted) return

    setSelectedAnswers((previous) => ({
      ...previous,
      [questionId]: answer
    }))
  }

  const submitExercise = () => {
    if (submitted) return

    let newScore = 0

    questions.forEach((question) => {
      if (selectedAnswers[question.id] === question.correct) {
        newScore += 1
      }
    })

    setScore(newScore)
    setSubmitted(true)

    if (newScore === totalQuestions) {
      onComplete(lessonId)
    }
  }

  const resetExercise = () => {
    setSelectedAnswers({})
    setSubmitted(false)
    setScore(0)
  }

  const goToPreviousStep = () => {
    setCurrentStep((step) => Math.max(0, step - 1))
  }

  const goToNextStep = () => {
    if (currentStep === 3 && score !== totalQuestions && !alreadyCompleted) {
      return
    }

    setCurrentStep((step) => Math.min(4, step + 1))
  }

  return (
    <section className="lesson-page">
      <header className="lesson-header">
        <button className="secondary-button" onClick={onBack}>
          ← Retour
        </button>

        <div className="lesson-header-content">
          <span className="lesson-badge">
            Module 03 · Types composés
          </span>

          <div className="lesson-title-row">
            <span className="lesson-icon">{definition.icon}</span>

            <div>
              <h1>{courseLesson.title || definition.title}</h1>
              <p>{definition.subtitle}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="lesson-stepper">
        {steps.map((step, index) => (
          <button
            key={step.label}
            className={`lesson-step ${
              currentStep === index ? 'active' : ''
            } ${currentStep > index ? 'completed' : ''}`}
            onClick={() => {
              if (
                index > currentStep &&
                currentStep === 3 &&
                score !== totalQuestions &&
                !alreadyCompleted
              ) {
                return
              }

              setCurrentStep(index)
            }}
          >
            <span className="lesson-step-icon">{step.icon}</span>
            <span>{step.label}</span>
          </button>
        ))}
      </div>

      <div className="lesson-content">
        {currentStep === 0 && (
          <article className="lesson-card">
            <div className="lesson-card-header">
              <span className="lesson-card-icon">🎯</span>

              <div>
                <span className="lesson-kicker">Étape 1</span>
                <h2>Objectifs de la leçon</h2>
              </div>
            </div>

            <p className="lesson-intro">
              À la fin de cette leçon, tu dois être capable de raisonner sur{' '}
              {definition.title.toLowerCase()} sans avoir besoin de compiler.
            </p>

            <div className="objective-list">
              {definition.objective.map((item) => (
                <div className="objective-item" key={item}>
                  <span className="objective-check">✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </article>
        )}

        {currentStep === 1 && (
          <article className="lesson-card">
            <div className="lesson-card-header">
              <span className="lesson-card-icon">📘</span>

              <div>
                <span className="lesson-kicker">Étape 2</span>
                <h2>{definition.notion.title}</h2>
              </div>
            </div>

            <div className="lesson-sections">
              {definition.notion.sections.map((section) => (
                <section className="lesson-section" key={section.title}>
                  <h3>{section.title}</h3>

                  <p>{section.text}</p>

                  {section.code && (
                    <pre className="code-block">
                      <code>{section.code}</code>
                    </pre>
                  )}
                </section>
              ))}
            </div>
          </article>
        )}

        {currentStep === 2 && (
          <article className="lesson-card">
            <div className="lesson-card-header">
              <span className="lesson-card-icon">🧠</span>

              <div>
                <span className="lesson-kicker">Étape 3</span>
                <h2>{definition.reasoning.title}</h2>
              </div>
            </div>

            <div className="reasoning-list">
              {definition.reasoning.points.map((point, index) => (
                <div className="reasoning-item" key={point.title}>
                  <div className="reasoning-number">{index + 1}</div>

                  <div>
                    <h3>{point.title}</h3>
                    <p>{point.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="lesson-example">
              <div className="lesson-example-header">
                <span>Exemple de raisonnement</span>
              </div>

              <pre className="code-block">
                <code>{definition.reasoning.code}</code>
              </pre>

              <p className="lesson-result">
                <strong>{definition.reasoning.result}</strong>
              </p>
            </div>
          </article>
        )}

        {currentStep === 3 && (
          <article className="lesson-card">
            <div className="lesson-card-header">
              <span className="lesson-card-icon">✍️</span>

              <div>
                <span className="lesson-kicker">Étape 4</span>
                <h2>Exercice de validation</h2>
              </div>
            </div>

            <p className="lesson-intro">
              Réponds aux {totalQuestions} questions. Pour valider la leçon,
              tu dois obtenir {totalQuestions}/{totalQuestions}.
            </p>

            <div className="quiz-list">
              {questions.map((question, questionIndex) => {
                const selected = selectedAnswers[question.id]
                const isCorrect = selected === question.correct
                return (
                  <div className="quiz-question" key={question.id}>
                    <div className="quiz-question-header">
                      <span className="quiz-number">
                        {questionIndex + 1}
                      </span>

                      <h3>{question.question}</h3>
                    </div>

                    <div className="quiz-options">
                      {question.options.map((option, optionIndex) => {
                        const letter = getLetter(optionIndex)
                        const isSelected = selected === letter
                        const showCorrect =
                          submitted && letter === question.correct
                        const showWrong =
                          submitted && isSelected && !isCorrect

                        return (
                          <button
                            key={`${question.id}-${letter}`}
                            className={`quiz-option ${
                              isSelected ? 'selected' : ''
                            } ${showCorrect ? 'correct' : ''} ${
                              showWrong ? 'incorrect' : ''
                            }`}
                            onClick={() =>
                              chooseAnswer(question.id, letter)
                            }
                            disabled={submitted}
                          >
                            <span className="quiz-option-letter">
                              {letter.toUpperCase()}
                            </span>

                            <span>{option}</span>
                          </button>
                        )
                      })}
                    </div>

                    {submitted && (
                      <div
                        className={`quiz-feedback ${
                          isCorrect ? 'correct' : 'incorrect'
                        }`}
                      >
                        <strong>
                          {isCorrect ? 'Bonne réponse' : 'Réponse incorrecte'}
                        </strong>

                        <p>{question.explanation}</p>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            <div className="quiz-actions">
              {!submitted ? (
                <button
                  className="primary-button"
                  onClick={submitExercise}
                  disabled={Object.keys(selectedAnswers).length !== totalQuestions}
                >
                  Corriger l’exercice
                </button>
              ) : (
                <div className="quiz-result-box">
                  <div>
                    <span className="result-label">Score</span>
                    <strong>
                      {score}/{totalQuestions}
                    </strong>
                  </div>

                  <p>
                    {isPerfectScore
                      ? 'Excellent. La leçon est validée.'
                      : `Tu dois obtenir ${totalQuestions}/${totalQuestions} pour valider cette leçon.`}
                  </p>

                  {!isPerfectScore && (
                    <button
                      className="secondary-button"
                      onClick={resetExercise}
                    >
                      Refaire l’exercice
                    </button>
                  )}
                </div>
              )}
            </div>
          </article>
        )}

        {currentStep === 4 && (
          <article className="lesson-card">
            <div className="lesson-validation">
              <div className="validation-icon">
                {alreadyCompleted || isPerfectScore ? '✅' : '🔒'}
              </div>

              <span className="lesson-kicker">Étape 5</span>

              <h2>
                {alreadyCompleted || isPerfectScore
                  ? 'Leçon validée'
                  : 'Leçon non validée'}
              </h2>

              <p>
                {alreadyCompleted || isPerfectScore
                  ? `Tu maîtrises maintenant les bases de ${definition.title.toLowerCase()}.`
                  : `Obtiens ${totalQuestions}/${totalQuestions} à l’exercice pour débloquer la validation.`}
              </p>

              <div className="validation-score">
                <span>Score obtenu</span>
                <strong>
                  {score}/{totalQuestions}
                </strong>
              </div>

              {(alreadyCompleted || isPerfectScore) && (
                <button className="primary-button" onClick={onBack}>
                  ← Retour au parcours
                </button>
              )}
            </div>
          </article>
        )}
      </div>

      <footer className="lesson-navigation">
        <button
          className="secondary-button"
          onClick={goToPreviousStep}
          disabled={currentStep === 0}
        >
          ← Précédent
        </button>

        <span className="lesson-navigation-progress">
          {currentStep + 1} / {steps.length}
        </span>

        <button
          className="primary-button"
          onClick={goToNextStep}
          disabled={
            currentStep === 4 ||
            (currentStep === 3 &&
              score !== totalQuestions &&
              !alreadyCompleted)
          }
        >
          {currentStep === 4 ? 'Terminé' : 'Suivant →'}
        </button>
      </footer>
    </section>
  )
}
