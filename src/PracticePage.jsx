import { useState } from 'react'

import './PracticePage.css'

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

function PracticePage({
  onExerciseComplete,
  solvedExercises = [],
}) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [showOnlyUnsolved, setShowOnlyUnsolved] = useState(false)

  const visibleExercises = showOnlyUnsolved
    ? exercises.filter(
        (exercise) => !solvedExercises.includes(exercise.id),
      )
    : exercises

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
              Tu as répondu correctement à tous les exercices
              actuellement disponibles.
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
            onClick={() => {
              setShowOnlyUnsolved(false)
              setCurrentIndex(0)
              setSubmitted(false)
            }}
          >
            Refaire l'entraînement
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