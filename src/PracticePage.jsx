import { useState } from 'react'

import './PracticePage.css'
import additionalExercises from './data/additionalExercises'
import { drawFreshQuestions } from './data/questionSelection'

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

  {
    id: 'function-01',
    type: 'Lire une fonction',
    category: 'Fonctions',
    title: 'Quelle valeur est renvoyée ?',
    code: `int doubleValeur(int n) {
    return n * 2;
}

printf("%d", doubleValeur(6));`,
    question: 'Que va afficher cet appel de fonction ?',
    options: [
      { id: 'a', text: '6' },
      { id: 'b', text: '8' },
      { id: 'c', text: '12' },
      { id: 'd', text: 'Une adresse mémoire' },
    ],
    correct: 'c',
    explanation: 'L’argument n reçoit 6, puis la fonction renvoie 6 × 2, soit 12.',
    skill: 'Paramètres et return',
  },

  {
    id: 'function-02',
    type: 'Choisir le prototype',
    category: 'Fonctions',
    title: 'Déclarer une fonction correctement',
    code: `/* La fonction calcule la somme de deux entiers. */`,
    question: 'Quel prototype correspond à une fonction somme qui reçoit deux int et renvoie un int ?',
    options: [
      { id: 'a', text: 'int somme(int a, int b);' },
      { id: 'b', text: 'somme(int, int) = int;' },
      { id: 'c', text: 'return somme(int a, int b);' },
      { id: 'd', text: 'int somme = (int a, int b);' },
    ],
    correct: 'a',
    explanation: 'Un prototype précise le type de retour, le nom de la fonction et les types de ses paramètres.',
    skill: 'Prototypes',
  },

  {
    id: 'pointer-01',
    type: 'Suivre un pointeur',
    category: 'Pointeurs',
    title: 'Quelle est la nouvelle valeur de x ?',
    code: `int x = 5;
int *p = &x;

*p = *p + 3;
printf("%d", x);`,
    question: 'Que va afficher le programme ?',
    options: [
      { id: 'a', text: '5' },
      { id: 'b', text: '8' },
      { id: 'c', text: '3' },
      { id: 'd', text: 'L’adresse de x' },
    ],
    correct: 'b',
    explanation: 'p contient l’adresse de x. Écrire dans *p modifie donc directement x : 5 + 3 = 8.',
    skill: 'Déréférencement',
  },

  {
    id: 'pointer-02',
    type: 'Identifier un opérateur',
    category: 'Pointeurs',
    title: 'Obtenir l’adresse d’une variable',
    code: `int age = 18;`,
    question: 'Quelle expression représente l’adresse de age ?',
    options: [
      { id: 'a', text: 'age' },
      { id: 'b', text: '*age' },
      { id: 'c', text: '&age' },
      { id: 'd', text: 'age&' },
    ],
    correct: 'c',
    explanation: 'L’opérateur unaire & permet d’obtenir l’adresse mémoire d’une variable.',
    skill: 'Adresses mémoire',
  },

  {
    id: 'storage-01',
    type: 'Portée des variables',
    category: 'Stockage',
    title: 'Où une variable locale est-elle visible ?',
    code: `void afficher(void) {
    int nombre = 4;
    printf("%d", nombre);
}`,
    question: 'Dans quel endroit nombre peut-elle être utilisée ?',
    options: [
      { id: 'a', text: 'Uniquement dans le bloc de afficher.' },
      { id: 'b', text: 'Dans toutes les fonctions du programme.' },
      { id: 'c', text: 'Uniquement après return 0.' },
      { id: 'd', text: 'Dans tous les fichiers C.' },
    ],
    correct: 'a',
    explanation: 'Une variable locale est visible uniquement à partir de sa déclaration, à l’intérieur de son bloc.',
    skill: 'Portée locale',
  },

  {
    id: 'file-01',
    type: 'Gérer un fichier',
    category: 'Fichiers',
    title: 'Fermer un fichier',
    code: `FILE *f = fopen("notes.txt", "w");

if (f != NULL) {
    fprintf(f, "20\\n");
    /* instruction manquante */
}`,
    question: 'Quelle instruction doit remplacer le commentaire ?',
    options: [
      { id: 'a', text: 'close(f);' },
      { id: 'b', text: 'fclose(f);' },
      { id: 'c', text: 'fopen(f);' },
      { id: 'd', text: 'return f;' },
    ],
    correct: 'b',
    explanation: 'Après une ouverture réussie, fclose(f) libère la ressource et termine correctement l’écriture.',
    skill: 'fopen et fclose',
  },
]

exercises.push(...additionalExercises)
const SESSION_SIZE = 8

function PracticePage({
  onExerciseComplete,
  solvedExercises = [],
}) {
  const [session, setSession] = useState(() =>
    drawFreshQuestions(exercises, [], SESSION_SIZE),
  )
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [showOnlyUnsolved, setShowOnlyUnsolved] = useState(false)

  const visibleExercises = showOnlyUnsolved
    ? session.questions.filter(
        (exercise) => !solvedExercises.includes(exercise.id),
      )
    : session.questions

  const currentExercise =
    visibleExercises[currentIndex] || null

  const solvedCount = solvedExercises.filter((id) =>
    exercises.some((exercise) => exercise.id === id),
  ).length

  const totalExercises = exercises.length

  const answer = currentExercise
    ? answers[currentExercise.id]
    : null

  const isCorrect =
    currentExercise && answer === currentExercise.correct

  const chooseAnswer = (answerId) => {
    if (submitted || !currentExercise) {
      return
    }

    setAnswers((currentAnswers) => ({
      ...currentAnswers,
      [currentExercise.id]: answerId,
    }))
  }

  const submitAnswer = () => {
    if (!currentExercise || !answer) {
      return
    }

    setSubmitted(true)

    if (answer === currentExercise.correct) {
      onExerciseComplete(currentExercise.id)

      /*
       * Dans le filtre "À renforcer", l'exercice réussi disparaît
       * immédiatement de visibleExercises après la mise à jour
       * de solvedExercises.
       *
       * On remet donc submitted à false afin que le prochain
       * exercice, qui prend la même position dans la liste,
       * apparaisse dans un état propre et réponde à nouveau.
       */
      if (showOnlyUnsolved) {
        setSubmitted(false)
      }
    }
  }

  const goToNext = () => {
    if (currentIndex < visibleExercises.length - 1) {
      setCurrentIndex((index) => index + 1)
      setSubmitted(false)

      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }
  }

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((index) => index - 1)
      setSubmitted(false)

      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }
  }

  const restartCurrent = () => {
    if (!currentExercise) {
      return
    }

    setAnswers((currentAnswers) => {
      const nextAnswers = {
        ...currentAnswers,
      }

      delete nextAnswers[currentExercise.id]

      return nextAnswers
    })

    setSubmitted(false)
  }

  const toggleUnsolved = () => {
    setShowOnlyUnsolved((current) => !current)
    setCurrentIndex(0)
    setSubmitted(false)
  }

  const startNewSession = () => {
    setSession((current) =>
      drawFreshQuestions(exercises, current.seenIds, SESSION_SIZE),
    )
    setCurrentIndex(0)
    setSubmitted(false)
    setAnswers({})
    setShowOnlyUnsolved(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (!currentExercise) {
    return (
      <section className="practice-shell">
        <header className="practice-header">
          <div>
            <p className="practice-label">S'ENTRAÎNER</p>

            <h2>
              Entraînement terminé 🎉
            </h2>

            <p>
              {showOnlyUnsolved
                ? 'Tous les exercices de cette série ont été réussis.'
                : 'Cette série est terminée. Une nouvelle série proposera d’autres questions.'}
            </p>
          </div>
        </header>

        <section className="practice-completion-card">
          <div className="practice-completion-icon">
            ✓
          </div>

          <p className="practice-label">
            MAÎTRISE ACTUELLE
          </p>

          <h3>
            {solvedCount}/{totalExercises} exercices réussis
          </h3>

          <p>
            De nouveaux exercices pourront ensuite être ajoutés
            pour augmenter progressivement la difficulté.
          </p>

          <button
            type="button"
            className="practice-primary-button"
            onClick={startNewSession}
          >
            Nouvelle série
            <span>→</span>
          </button>
        </section>
      </section>
    )
  }

  const progress =
    ((currentIndex + 1) / visibleExercises.length) * 100

  return (
    <section className="practice-shell">
      {/* =====================================================
          EN-TÊTE
          ===================================================== */}
      <header className="practice-header">
        <div>
          <p className="practice-label">
            S'ENTRAÎNER
          </p>

          <h2>
            Développer ton raisonnement
          </h2>

          <p>
            Résous chaque problème sans compiler. Lis, réfléchis,
            puis réponds.
          </p>
        </div>

        <div className="practice-score">
          <strong>
            {solvedCount}/{totalExercises}
          </strong>

          <span>
            réussis
          </span>
        </div>
      </header>

      {/* =====================================================
          BARRE DE PROGRESSION
          ===================================================== */}
      <section className="practice-progress-card">
        <div className="practice-progress-top">
          <span>
            Exercice {currentIndex + 1} sur{' '}
            {visibleExercises.length}
          </span>

          <strong>
            {Math.round(progress)}%
          </strong>
        </div>

        <div className="practice-progress-track">
          <div
            className="practice-progress-fill"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>
      </section>

      {/* =====================================================
          FILTRES
          ===================================================== */}
      <div className="practice-toolbar">
        <button
          type="button"
          className={`practice-filter-button ${
            !showOnlyUnsolved ? 'active' : ''
          }`}
          onClick={() => {
            setShowOnlyUnsolved(false)
            setCurrentIndex(0)
            setSubmitted(false)
          }}
        >
          Tous les exercices
        </button>

        <button
          type="button"
          className={`practice-filter-button ${
            showOnlyUnsolved ? 'active' : ''
          }`}
          onClick={toggleUnsolved}
        >
          À renforcer
        </button>
      </div>

      {/* =====================================================
          EXERCICE
          ===================================================== */}
      <section className="practice-exercise-card">
        <div className="practice-exercise-header">
          <div>
            <span className="practice-exercise-type">
              {currentExercise.type}
            </span>

            <h3>
              {currentExercise.title}
            </h3>
          </div>

          <span className="practice-category">
            {currentExercise.category}
          </span>
        </div>

        <div className="practice-instruction">
          <strong>
            Avant de répondre :
          </strong>

          <p>
            Essaie d'abord de résoudre l'exercice sur papier ou
            mentalement. Ne cherche pas à compiler le code.
          </p>
        </div>

        <div className="practice-code-block">
          <div className="practice-code-header">
            <span>
              programme.c
            </span>

            <span>
              C
            </span>
          </div>

          <pre>
            <code>
              {currentExercise.code}
            </code>
          </pre>
        </div>

        <div className="practice-question">
          <p>
            {currentExercise.question}
          </p>
        </div>

        <div className="practice-options">
          {currentExercise.options.map((option) => {
            const selected =
              answer === option.id

            const correct =
              submitted &&
              option.id === currentExercise.correct

            return (
              <button
                type="button"
                key={option.id}
                className={`practice-option ${
                  selected ? 'selected' : ''
                } ${
                  correct ? 'correct' : ''
                }`}
                onClick={() =>
                  chooseAnswer(option.id)
                }
                disabled={submitted}
              >
                <span className="practice-option-letter">
                  {option.id.toUpperCase()}
                </span>

                <span>
                  {option.text}
                </span>
              </button>
            )
          })}
        </div>

        {submitted && (
          <div
            className={
              isCorrect
                ? 'practice-feedback correct'
                : 'practice-feedback incorrect'
            }
          >
            <strong>
              {isCorrect
                ? '✓ Bonne réponse.'
                : '✕ Réponse incorrecte.'}
            </strong>

            <p>
              {currentExercise.explanation}
            </p>
          </div>
        )}

        {!submitted ? (
          <button
            type="button"
            className="practice-primary-button"
            disabled={!answer}
            onClick={submitAnswer}
          >
            Vérifier ma réponse
            <span>→</span>
          </button>
        ) : (
          <div className="practice-after-answer">
            <div>
              <span>
                Compétence travaillée
              </span>

              <strong>
                {currentExercise.skill}
              </strong>
            </div>

            {!isCorrect && (
              <button
                type="button"
                className="practice-secondary-button"
                onClick={restartCurrent}
              >
                Réessayer
              </button>
            )}
          </div>
        )}
      </section>

      {/* =====================================================
          NAVIGATION
          ===================================================== */}
      <footer className="practice-navigation">
        <button
          type="button"
          className="practice-secondary-button"
          onClick={goToPrevious}
          disabled={currentIndex === 0}
        >
          ← Précédent
        </button>

        <button
          type="button"
          className="practice-secondary-button"
          onClick={goToNext}
          disabled={
            !submitted ||
            currentIndex === visibleExercises.length - 1
          }
        >
          Exercice suivant →
        </button>
        {submitted && currentIndex === visibleExercises.length - 1 && (
          <button
            type="button"
            className="practice-primary-button"
            onClick={startNewSession}
          >
            Nouvelle série →
          </button>
        )}
      </footer>

      {/* =====================================================
          RAPPEL
          ===================================================== */}
      <section className="practice-note">
        <div className="practice-note-icon">
          🧠
        </div>

        <div>
          <strong>
            Réflexe d'examen
          </strong>

          <p>
            Avant de chercher une réponse, exécute mentalement
            les instructions une par une. Ce réflexe deviendra
            progressivement automatique.
          </p>
        </div>
      </section>
    </section>
  )
}

export default PracticePage
