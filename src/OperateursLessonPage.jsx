import { useState } from 'react'
import { getPassingScore, shuffleQuestions } from './data/questionSelection'

import { findLessonById } from './data/course'

import './LessonPage.css'

const steps = [
  {
    id: 'objectif',
    label: 'Objectif',
  },
  {
    id: 'notion',
    label: 'Opérateurs',
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
]

const questions = [
  {
    id: 'q1',
    question:
      'Quel opérateur permet d’effectuer une addition en C ?',
    options: [
      {
        id: 'a',
        text: '+',
      },
      {
        id: 'b',
        text: '&',
      },
      {
        id: 'c',
        text: '=',
      },
      {
        id: 'd',
        text: '%',
      },
    ],
    correct: 'a',
    explanation:
      'L’opérateur + permet d’effectuer une addition.',
  },
  {
    id: 'q2',
    question:
      'Quel opérateur permet de tester si deux valeurs sont égales ?',
    options: [
      {
        id: 'a',
        text: '=',
      },
      {
        id: 'b',
        text: '==',
      },
      {
        id: 'c',
        text: '!=',
      },
      {
        id: 'd',
        text: '>=',
      },
    ],
    correct: 'b',
    explanation:
      'En C, == sert à comparer deux valeurs pour vérifier leur égalité. Un seul = correspond à une affectation.',
  },
  {
    id: 'q3',
    question:
      'Quelle est la valeur finale de x ?',
    code: `int x = 10;

x = x - 4;

x = x * 2;`,
    options: [
      {
        id: 'a',
        text: '6',
      },
      {
        id: 'b',
        text: '12',
      },
      {
        id: 'c',
        text: '16',
      },
      {
        id: 'd',
        text: '20',
      },
    ],
    correct: 'b',
    explanation:
      'x commence à 10. Après x = x - 4, x vaut 6. Ensuite 6 × 2 = 12. La bonne réponse est donc 12.',
  },
  {
    id: 'q4',
    question:
      'Quelle condition vérifie que age est supérieur ou égal à 18 ?',
    options: [
      {
        id: 'a',
        text: 'age > 18',
      },
      {
        id: 'b',
        text: 'age = 18',
      },
      {
        id: 'c',
        text: 'age >= 18',
      },
      {
        id: 'd',
        text: 'age <= 18',
      },
    ],
    correct: 'c',
    explanation:
      '>= signifie « supérieur ou égal à ». La condition correcte est donc age >= 18.',
  },
  {
    id: 'q5',
    question:
      'Quelle expression est vraie lorsque x vaut 5 ?',
    options: [
      {
        id: 'a',
        text: 'x < 3',
      },
      {
        id: 'b',
        text: 'x == 5',
      },
      {
        id: 'c',
        text: 'x > 8',
      },
      {
        id: 'd',
        text: 'x != 5',
      },
    ],
    correct: 'b',
    explanation:
      'Lorsque x vaut 5, la comparaison x == 5 est vraie.',
  },
  {
    id: 'q6',
    question:
      'Quel opérateur logique représente « ET » ?',
    options: [
      {
        id: 'a',
        text: '||',
      },
      {
        id: 'b',
        text: '&&',
      },
      {
        id: 'c',
        text: '!',
      },
      {
        id: 'd',
        text: '==',
      },
    ],
    correct: 'b',
    explanation:
      '&& représente l’opérateur logique ET. Les deux conditions doivent alors être vraies.',
  },
  {
    id: 'q7',
    question:
      'Quelle est la valeur finale de x ?',
    code: `int x = 2;

x = x + 3 * 4;`,
    options: [
      {
        id: 'a',
        text: '20',
      },
      {
        id: 'b',
        text: '14',
      },
      {
        id: 'c',
        text: '24',
      },
      {
        id: 'd',
        text: '11',
      },
    ],
    correct: 'b',
    explanation:
      'La multiplication est effectuée avant l’addition : 3 × 4 = 12, puis 2 + 12 = 14.',
  },
  {
    id: 'q8',
    question:
      'Quelle expression signifie « x est différent de 10 » ?',
    options: [
      {
        id: 'a',
        text: 'x = 10',
      },
      {
        id: 'b',
        text: 'x == 10',
      },
      {
        id: 'c',
        text: 'x != 10',
      },
      {
        id: 'd',
        text: 'x >= 10',
      },
    ],
    correct: 'c',
    explanation:
      '!= signifie « différent de ». L’expression x != 10 teste donc que x n’est pas égal à 10.',
  },
]

function OperateursLessonPage({
  onBack,
  onComplete,
  alreadyCompleted = false,
}) {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)
  const [assessmentQuestions, setAssessmentQuestions] = useState(() => shuffleQuestions(questions))

  const lessonData = findLessonById('operateurs')

  const totalQuestions = assessmentQuestions.length
  const passingScore = getPassingScore(totalQuestions)

  const progressPercentage =
    ((currentStep + 1) / steps.length) * 100

  const chooseAnswer = (questionId, answer) => {
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

    assessmentQuestions.forEach((question) => {
      if (
        answers[question.id] ===
        question.correct
      ) {
        calculatedScore += 1
      }
    })

    setScore(calculatedScore)
    setSubmitted(true)

    if (calculatedScore >= passingScore) {
      onComplete('operateurs')
    }
  }

  const resetExercise = () => {
    setAnswers({})
    setSubmitted(false)
    setScore(0)
    setAssessmentQuestions(shuffleQuestions(questions))
  }

  const goToNextStep = () => {
    if (currentStep < steps.length - 1) {
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
      {/* =====================================================
          EN-TÊTE
          ===================================================== */}

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
            {lessonData?.moduleNumber ||
              '01'}{' '}
            • LEÇON{' '}
            {lessonData?.number ||
              '03'}
          </p>

          <h2>
            {lessonData?.title ||
              'Les opérateurs'}
          </h2>

          <p>
            Comprendre les opérateurs
            arithmétiques, relationnels et
            logiques, puis savoir les utiliser
            et les analyser sur papier.
          </p>
        </div>

        {alreadyCompleted && (
          <div className="lesson-completed-badge">
            ✓ Leçon terminée
          </div>
        )}
      </header>

      {/* =====================================================
          PROGRESSION
          ===================================================== */}

      <div className="lesson-progress-wrapper">
        <div className="lesson-progress-top">
          <span>
            Étape {currentStep + 1} sur{' '}
            {steps.length}
          </span>

          <strong>
            {steps[currentStep].label}
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
          {steps.map((step, index) => (
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
              {index + 1}. {step.label}
            </span>
          ))}
        </div>
      </div>

      {/* =====================================================
          ÉTAPE 1 — OBJECTIF
          ===================================================== */}

      {currentStep === 0 && (
        <div className="lesson-content">
          <section className="lesson-hero-card">
            <div className="lesson-hero-icon">
              ⚙️
            </div>

            <div>
              <p className="lesson-section-label">
                OBJECTIF
              </p>

              <h3>
                Comprendre comment les
                opérateurs transforment les
                valeurs.
              </h3>

              <p>
                Les opérateurs permettent
                d'effectuer des calculs, de
                comparer des valeurs et de
                construire des conditions. Ils
                sont présents dans presque tous
                les programmes C.
              </p>
            </div>
          </section>

          <section className="lesson-section">
            <div className="lesson-section-heading">
              <p className="lesson-section-label">
                COMPÉTENCES
              </p>

              <h3>
                À la fin de cette leçon, tu
                dois savoir :
              </h3>
            </div>

            <div className="lesson-card-grid">
              <article className="lesson-info-card">
                <div className="lesson-info-number">
                  01
                </div>

                <h4>Calculer</h4>

                <p>
                  Utiliser les opérateurs
                  arithmétiques pour effectuer des
                  additions, soustractions,
                  multiplications et divisions.
                </p>
              </article>

              <article className="lesson-info-card">
                <div className="lesson-info-number">
                  02
                </div>

                <h4>Comparer</h4>

                <p>
                  Lire une comparaison et
                  déterminer si elle est vraie ou
                  fausse.
                </p>
              </article>

              <article className="lesson-info-card">
                <div className="lesson-info-number">
                  03
                </div>

                <h4>
                  Construire une condition
                </h4>

                <p>
                  Combiner plusieurs
                  comparaisons avec les
                  opérateurs logiques.
                </p>
              </article>

              <article className="lesson-info-card">
                <div className="lesson-info-number">
                  04
                </div>

                <h4>
                  Raisonner sur papier
                </h4>

                <p>
                  Respecter l'ordre des
                  opérations et déterminer la
                  valeur produite par une
                  expression.
                </p>
              </article>
            </div>
          </section>

          <section className="lesson-section">
            <div className="lesson-section-heading">
              <p className="lesson-section-label">
                LES TROIS FAMILLES
              </p>

              <h3>
                Trois catégories à reconnaître
                rapidement
              </h3>
            </div>

            <div className="lesson-line-list">
              <article className="lesson-line-card">
                <div className="lesson-line-symbol">
                  01
                </div>

                <div>
                  <strong>
                    Arithmétiques
                  </strong>

                  <p>
                    Elles servent à effectuer
                    des calculs :{' '}
                    <code>+</code>,{' '}
                    <code>-</code>,{' '}
                    <code>*</code>,{' '}
                    <code>/</code> et{' '}
                    <code>%</code>.
                  </p>
                </div>
              </article>

              <article className="lesson-line-card">
                <div className="lesson-line-symbol">
                  02
                </div>

                <div>
                  <strong>
                    Relationnels
                  </strong>

                  <p>
                    Ils permettent de comparer
                    des valeurs : <code>==</code>,{' '}
                    <code>!=</code>, <code>&gt;</code>,{' '}
                    <code>&lt;</code>,{' '}
                    <code>&gt;=</code> et{' '}
                    <code>&lt;=</code>.
                  </p>
                </div>
              </article>

              <article className="lesson-line-card">
                <div className="lesson-line-symbol">
                  03
                </div>

                <div>
                  <strong>Logiques</strong>

                  <p>
                    Ils permettent de combiner
                    ou de modifier des conditions :{' '}
                    <code>&amp;&amp;</code>,{' '}
                    <code>||</code> et{' '}
                    <code>!</code>.
                  </p>
                </div>
              </article>
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
                Avant de calculer, identifie
                toujours la famille de
                l'opérateur. Cela t'aide à savoir
                immédiatement si tu dois calculer
                une valeur ou évaluer une
                condition.
              </p>
            </div>
          </section>
        </div>
      )}

      {/* =====================================================
          ÉTAPE 2 — NOTION
          ===================================================== */}

      {currentStep === 1 && (
        <div className="lesson-content">
          <section className="lesson-section">
            <p className="lesson-section-label">
              OPÉRATEURS ARITHMÉTIQUES
            </p>

            <h3>
              Les opérateurs arithmétiques
              servent à effectuer des calculs.
            </h3>

            <div className="lesson-code-block">
              <div className="lesson-code-header">
                <span>
                  arithmetique.c
                </span>

                <span>C</span>
              </div>

              <pre>
                <code>{`int a = 10;
int b = 3;
a + b;
a - b;
a * b;
a / b;
a % b;`}</code>
              </pre>
            </div>
          </section>

          <section className="lesson-section">
            <div className="lesson-line-list">
              <article className="lesson-line-card">
                <div className="lesson-line-symbol">
                  +
                </div>

                <div>
                  <strong>Addition</strong>

                  <p>
                    <code>a + b</code>{' '}
                    additionne les deux valeurs.
                  </p>
                </div>
              </article>

              <article className="lesson-line-card">
                <div className="lesson-line-symbol">
                  -
                </div>

                <div>
                  <strong>
                    Soustraction
                  </strong>

                  <p>
                    <code>a - b</code>{' '}
                    calcule la différence.
                  </p>
                </div>
              </article>

              <article className="lesson-line-card">
                <div className="lesson-line-symbol">
                  *
                </div>

                <div>
                  <strong>
                    Multiplication
                  </strong>

                  <p>
                    <code>a * b</code>{' '}
                    multiplie les deux valeurs.
                  </p>
                </div>
              </article>

              <article className="lesson-line-card">
                <div className="lesson-line-symbol">
                  /
                </div>

                <div>
                  <strong>Division</strong>

                  <p>
                    <code>a / b</code>{' '}
                    effectue une division. Avec
                    des entiers, il faut
                    particulièrement faire
                    attention au type de résultat.
                  </p>
                </div>
              </article>

              <article className="lesson-line-card">
                <div className="lesson-line-symbol">
                  %
                </div>

                <div>
                  <strong>
                    Reste de division entière
                  </strong>

                  <p>
                    <code>a % b</code>{' '}
                    donne le reste de la division
                    entière lorsque les opérandes
                    sont des entiers.
                  </p>
                </div>
              </article>
            </div>
          </section>

          <section className="lesson-section">
            <p className="lesson-section-label">
              OPÉRATEURS RELATIONNELS
            </p>

            <h3>
              Une comparaison permet de
              déterminer si une relation est
              vraie ou fausse.
            </h3>

            <div className="lesson-code-block">
              <div className="lesson-code-header">
                <span>
                  comparaison.c
                </span>

                <span>C</span>
              </div>

              <pre>
                <code>{`int age = 20;
age == 20;
age != 15;
age > 18;
age < 30;
age >= 18;
age <= 20;`}</code>
              </pre>
            </div>
          </section>

          <section className="lesson-section">
            <div className="lesson-line-list">
              <article className="lesson-line-card">
                <div className="lesson-line-symbol">
                  ==
                </div>

                <div>
                  <code>a == b</code>

                  <p>
                    Teste si <code>a</code> et{' '}
                    <code>b</code> sont égaux.
                  </p>
                </div>
              </article>

              <article className="lesson-line-card">
                <div className="lesson-line-symbol">
                  !=
                </div>

                <div>
                  <code>a != b</code>

                  <p>
                    Teste si <code>a</code> et{' '}
                    <code>b</code> sont différents.
                  </p>
                </div>
              </article>

              <article className="lesson-line-card">
                <div className="lesson-line-symbol">
                  &gt; &lt;
                </div>

                <div>
                  <p>
                    <code>&gt;</code> signifie
                    « supérieur à » et{' '}
                    <code>&lt;</code> signifie
                    « inférieur à ».
                  </p>
                </div>
              </article>

              <article className="lesson-line-card">
                <div className="lesson-line-symbol">
                  &gt;= &lt;=
                </div>

                <div>
                  <p>
                    <code>&gt;=</code> signifie
                    « supérieur ou égal à » et{' '}
                    <code>&lt;=</code> signifie
                    « inférieur ou égal à ».
                  </p>
                </div>
              </article>
            </div>
          </section>

          <section className="lesson-section">
            <p className="lesson-section-label">
              OPÉRATEURS LOGIQUES
            </p>

            <h3>
              Plusieurs conditions peuvent être
              combinées.
            </h3>

            <div className="lesson-line-list">
              <article className="lesson-line-card">
                <div className="lesson-line-symbol">
                  &amp;&amp;
                </div>

                <div>
                  <strong>ET logique</strong>

                  <p>
                    <code>
                      condition1 &amp;&amp; condition2
                    </code>{' '}
                    est vraie lorsque les deux
                    conditions sont vraies.
                  </p>
                </div>
              </article>

              <article className="lesson-line-card">
                <div className="lesson-line-symbol">
                  ||
                </div>

                <div>
                  <strong>OU logique</strong>

                  <p>
                    <code>
                      condition1 || condition2
                    </code>{' '}
                    est vraie lorsqu'au moins une
                    des conditions est vraie.
                  </p>
                </div>
              </article>

              <article className="lesson-line-card">
                <div className="lesson-line-symbol">
                  !
                </div>

                <div>
                  <strong>NON logique</strong>

                  <p>
                    <code>
                      !condition
                    </code>{' '}
                    inverse la valeur logique
                    d'une condition.
                  </p>
                </div>
              </article>
            </div>
          </section>

          <section className="lesson-note">
            <div className="lesson-note-icon">
              ⚠️
            </div>

            <div>
              <strong>
                Piège classique : = et ==
              </strong>

              <p>
                <code>=</code> sert à affecter
                une valeur, tandis que{' '}
                <code>==</code> sert à comparer
                deux valeurs. Cette différence
                doit devenir automatique en examen.
              </p>
            </div>
          </section>
        </div>
      )}

      {/* =====================================================
          ÉTAPE 3 — RAISONNEMENT
          ===================================================== */}

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
                Ne lis jamais une expression
                complexe d'un seul coup.
              </h3>

              <p>
                Découpe-la. Commence par les
                opérations prioritaires, puis
                applique les opérations restantes
                dans le bon ordre.
              </p>
            </div>
          </section>

          <section className="lesson-section">
            <div className="lesson-section-heading">
              <p className="lesson-section-label">
                EXEMPLE 01
              </p>

              <h3>
                Suivre une expression étape par
                étape
              </h3>
            </div>

            <div className="lesson-code-block">
              <div className="lesson-code-header">
                <span>calcul.c</span>

                <span>À ANALYSER</span>
              </div>

              <pre>
                <code>{`int x = 2;
x = x + 3 * 4;`}</code>
              </pre>
            </div>
          </section>

          <section className="lesson-line-list">
            <article className="lesson-line-card">
              <div className="lesson-line-symbol">
                1
              </div>

              <div>
                <strong>
                  Repérer la multiplication
                </strong>

                <p>
                  Dans <code>3 * 4</code>, la
                  multiplication doit être calculée
                  avant l'addition.
                </p>
              </div>
            </article>

            <article className="lesson-line-card">
              <div className="lesson-line-symbol">
                2
              </div>

              <div>
                <strong>
                  Calculer 3 × 4
                </strong>

                <p>
                  On obtient{' '}
                  <strong>12</strong>.
                </p>
              </div>
            </article>

            <article className="lesson-line-card">
              <div className="lesson-line-symbol">
                3
              </div>

              <div>
                <strong>
                  Ajouter la valeur initiale
                </strong>

                <p>
                  <code>x = 2 + 12</code>, donc{' '}
                  <strong>x = 14</strong>.
                </p>
              </div>
            </article>
          </section>

          <section className="lesson-section">
            <div className="lesson-section-heading">
              <p className="lesson-section-label">
                EXEMPLE 02
              </p>

              <h3>
                Lire une condition comme un
                examinateur
              </h3>
            </div>

            <div className="lesson-code-block">
              <div className="lesson-code-header">
                <span>
                  condition.c
                </span>

                <span>À ANALYSER</span>
              </div>

              <pre>
                <code>{`int age = 20;
age >= 18 && age <= 25`}</code>
              </pre>
            </div>
          </section>

          <section className="lesson-line-list">
            <article className="lesson-line-card">
              <div className="lesson-line-symbol">
                1
              </div>

              <div>
                <code>age &gt;= 18</code>

                <p>
                  Comme age vaut 20, cette
                  condition est{' '}
                  <strong>vraie</strong>.
                </p>
              </div>
            </article>

            <article className="lesson-line-card">
              <div className="lesson-line-symbol">
                2
              </div>

              <div>
                <code>age &lt;= 25</code>

                <p>
                  Comme age vaut 20, cette
                  condition est également{' '}
                  <strong>vraie</strong>.
                </p>
              </div>
            </article>

            <article className="lesson-line-card">
              <div className="lesson-line-symbol">
                3
              </div>

              <div>
                <code>&amp;&amp;</code>

                <p>
                  Les deux conditions étant
                  vraies, l'expression complète est{' '}
                  <strong>vraie</strong>.
                </p>
              </div>
            </article>
          </section>

          <section className="lesson-question-card">
            <span className="lesson-question-number">
              RÉFLEXE
            </span>

            <h4>
              Avant de calculer, regarde la
              structure de l'expression.
            </h4>

            <p>
              Cherche d'abord les parenthèses,
              puis les opérations prioritaires
              comme les multiplications et
              divisions. Pour une condition
              complexe, évalue chaque comparaison
              séparément avant de les combiner.
            </p>

            <div className="lesson-answer-explanation">
              <strong>
                En examen, la méthode compte autant
                que le résultat.
              </strong>

              <p>
                Un raisonnement étape par étape
                réduit fortement les erreurs de
                lecture.
              </p>
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
                Pour une expression longue,
                entoure mentalement ou sur ton
                brouillon chaque sous-calcul
                important. Ne tente pas de tout
                résoudre en une seule étape.
              </p>
            </div>
          </section>
        </div>
      )}

      {/* =====================================================
          ÉTAPE 4 — EXERCICE
          ===================================================== */}

      {currentStep === 3 && (
        <div className="lesson-content">
          <section className="lesson-section">
            <p className="lesson-section-label">
              MINI-EXAMEN
            </p>

            <h3>
              {totalQuestions} questions —
              raisonnement sans compilateur.
            </h3>

            <p className="lesson-introduction">
              Chaque question porte sur les
              notions fondamentales des
              opérateurs. Pour valider la leçon,
              tu dois obtenir{' '}
              <strong>
                {passingScore}/
                {totalQuestions}
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
                            key={option.id}
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
              <span>→</span>
            </button>
          ) : (
            <div className="lesson-result-card">
              <div className="lesson-result-score">
                {score}/{totalQuestions}
              </div>

              <div>
                <strong>
                  {score >= passingScore
                    ? 'Maîtrise validée.'
                    : 'La maîtrise n’est pas encore validée.'}
                </strong>

                <p>
                  {score >= passingScore
                    ? 'Les opérateurs fondamentaux sont maintenant validés. Tu peux passer à la validation de la leçon.'
                    : `Relis les notions et vise au moins ${passingScore}/${totalQuestions}.`}
                </p>
              </div>

              {score < passingScore && (
                <button
                  type="button"
                  className="lesson-secondary-button"
                  onClick={resetExercise}
                >
                  Recommencer
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* =====================================================
          ÉTAPE 5 — VALIDATION
          ===================================================== */}

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
                ? 'Les opérateurs sont maîtrisés.'
                : 'Tu es arrivé à la fin de la leçon.'}
            </h3>

            <p>
              {alreadyCompleted ||
              score >= passingScore
                ? 'Tu sais maintenant utiliser les principaux opérateurs arithmétiques, relationnels et logiques et raisonner sur leurs expressions sans compiler.'
                : `Pour valider cette leçon, obtiens au moins ${passingScore}/${totalQuestions}.`}
            </p>

            <div className="lesson-summary">
              <div>
                <span>
                  Notion
                </span>

                <strong>
                  Opérateurs arithmétiques,
                  relationnels et logiques
                </strong>
              </div>

              <div>
                <span>
                  Compétence
                </span>

                <strong>
                  Évaluer une expression sur papier
                </strong>
              </div>

              <div>
                <span>
                  Objectif examen
                </span>

                <strong>
                  Éviter les erreurs de calcul et
                  de comparaison
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
                <span>→</span>
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

      {/* =====================================================
          NAVIGATION
          ===================================================== */}

      <footer className="lesson-navigation">
        <button
          type="button"
          className="lesson-secondary-button"
          onClick={goToPreviousStep}
          disabled={currentStep === 0}
        >
          ← Précédent
        </button>

        {currentStep <
        steps.length - 1 ? (
          <button
            type="button"
            className="lesson-primary-button"
            onClick={goToNextStep}
            disabled={
              currentStep === 3 &&
              score < passingScore &&
              !alreadyCompleted
            }
          >
            {currentStep === 3
              ? 'Voir la validation'
              : 'Continuer'}

            <span>→</span>
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

export default OperateursLessonPage
