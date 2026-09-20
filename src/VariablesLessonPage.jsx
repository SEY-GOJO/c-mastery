import { useState } from 'react'

import { findLessonById } from './data/course'

import './LessonPage.css'

const steps = [
  {
    id: 'objectif',
    label: 'Objectif',
  },
  {
    id: 'notion',
    label: 'Variables',
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
      'Quel type est adapté pour stocker le nombre entier 25 ?',
    options: [
      {
        id: 'a',
        text: 'int',
      },
      {
        id: 'b',
        text: 'char',
      },
      {
        id: 'c',
        text: 'float',
      },
      {
        id: 'd',
        text: 'void',
      },
    ],
    correct: 'a',
    explanation:
      'int est utilisé pour stocker une valeur entière comme 25.',
  },
  {
    id: 'q2',
    question:
      'Quelle déclaration crée correctement une variable entière initialisée à 10 ?',
    options: [
      {
        id: 'a',
        text: '10 int age;',
      },
      {
        id: 'b',
        text: 'int age = 10;',
      },
      {
        id: 'c',
        text: 'age int = 10;',
      },
      {
        id: 'd',
        text: 'int = age 10;',
      },
    ],
    correct: 'b',
    explanation:
      'La forme correcte est : int age = 10;. On indique d’abord le type, puis le nom de la variable et enfin sa valeur initiale.',
  },
  {
    id: 'q3',
    question: 'Quelle est la valeur finale de x ?',
    code: `int x = 4;

x = x + 3;

x = x * 2;`,
    options: [
      {
        id: 'a',
        text: '7',
      },
      {
        id: 'b',
        text: '8',
      },
      {
        id: 'c',
        text: '14',
      },
      {
        id: 'd',
        text: '11',
      },
    ],
    correct: 'c',
    explanation:
      'x vaut d’abord 4, puis 7 après x = x + 3, puis 14 après x = x * 2.',
  },
  {
    id: 'q4',
    question:
      "Quelle écriture permet de stocker le caractère A ?",
    options: [
      {
        id: 'a',
        text: 'char lettre = "A";',
      },
      {
        id: 'b',
        text: "char lettre = 'A';",
      },
      {
        id: 'c',
        text: 'char lettre = A;',
      },
      {
        id: 'd',
        text: 'character lettre = A;',
      },
    ],
    correct: 'b',
    explanation:
      "En C, un caractère simple s'écrit entre apostrophes : char lettre = 'A';",
  },
  {
    id: 'q5',
    question:
      "Que représente principalement '5' dans le langage C ?",
    options: [
      {
        id: 'a',
        text: 'Le nombre entier 5',
      },
      {
        id: 'b',
        text: 'Le caractère 5',
      },
      {
        id: 'c',
        text: 'Un nombre décimal',
      },
      {
        id: 'd',
        text: 'Une chaîne de caractères',
      },
    ],
    correct: 'b',
    explanation:
      "Entre apostrophes, '5' représente un caractère. Le nombre entier 5 s'écrit sans apostrophes.",
  },
  {
    id: 'q6',
    question:
      'Quel spécificateur est couramment utilisé avec printf pour afficher une variable de type int ?',
    options: [
      {
        id: 'a',
        text: '%d',
      },
      {
        id: 'b',
        text: '%c',
      },
      {
        id: 'c',
        text: '%s',
      },
      {
        id: 'd',
        text: '%p',
      },
    ],
    correct: 'a',
    explanation:
      '%d est utilisé ici pour afficher une valeur entière avec printf.',
  },
  {
    id: 'q7',
    question:
      'Quel spécificateur utiliser avec scanf pour lire une variable de type double ?',
    options: [
      {
        id: 'a',
        text: '%d',
      },
      {
        id: 'b',
        text: '%f',
      },
      {
        id: 'c',
        text: '%lf',
      },
      {
        id: 'd',
        text: '%c',
      },
    ],
    correct: 'c',
    explanation:
      'Avec scanf, %lf est utilisé pour lire une valeur destinée à une variable de type double.',
  },
]

function VariablesLessonPage({
  onBack,
  onComplete,
  alreadyCompleted = false,
}) {
  const [currentStep, setCurrentStep] = useState(0)

  const [answers, setAnswers] = useState({})

  const [submitted, setSubmitted] = useState(false)

  const [score, setScore] = useState(0)

  const lessonData = findLessonById('variables-types')

  const totalQuestions = questions.length

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

    questions.forEach((question) => {
      if (answers[question.id] === question.correct) {
        calculatedScore += 1
      }
    })

    setScore(calculatedScore)

    setSubmitted(true)

    if (calculatedScore === totalQuestions) {
      onComplete('variables-types')
    }
  }

  const resetExercise = () => {
    setAnswers({})
    setSubmitted(false)
    setScore(0)
  }

  const goToNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((step) => step + 1)

      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }
  }

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep((step) => step - 1)

      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }
  }

  const allQuestionsAnswered =
    Object.keys(answers).length === totalQuestions

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
            MODULE {lessonData?.moduleNumber || '01'} • LEÇON{' '}
            {lessonData?.number || '02'}
          </p>

          <h2>
            {lessonData?.title || 'Variables, types et formats'}
          </h2>

          <p>
            Apprendre à déclarer des variables, reconnaître les
            principaux types, utiliser les formats adaptés et suivre
            leurs valeurs sur papier.
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
            Étape {currentStep + 1} sur {steps.length}
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
              📦
            </div>

            <div>
              <p className="lesson-section-label">
                OBJECTIF
              </p>

              <h3>
                Comprendre ce qu'une variable représente réellement.
              </h3>

              <p>
                Une variable permet de stocker une valeur que le
                programme pourra utiliser ou modifier. Pour réussir
                un devoir sur papier, tu dois savoir identifier sa
                valeur, son type et la manière dont cette valeur est
                utilisée.
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
              <article className="lesson-info-card">
                <div className="lesson-info-number">
                  01
                </div>

                <h4>
                  Déclarer
                </h4>

                <p>
                  Écrire correctement une variable avec son type et
                  éventuellement sa valeur initiale.
                </p>
              </article>

              <article className="lesson-info-card">
                <div className="lesson-info-number">
                  02
                </div>

                <h4>
                  Identifier le type
                </h4>

                <p>
                  Choisir entre int, float, double et char selon la
                  donnée à stocker.
                </p>
              </article>

              <article className="lesson-info-card">
                <div className="lesson-info-number">
                  03
                </div>

                <h4>
                  Utiliser le bon format
                </h4>

                <p>
                  Reconnaître les principaux spécificateurs utilisés
                  avec printf et scanf.
                </p>
              </article>

              <article className="lesson-info-card">
                <div className="lesson-info-number">
                  04
                </div>

                <h4>
                  Suivre une valeur
                </h4>

                <p>
                  Déterminer la valeur finale d'une variable après
                  plusieurs instructions.
                </p>
              </article>
            </div>
          </section>

          <section className="lesson-section">
            <div className="lesson-section-heading">
              <p className="lesson-section-label">
                IDÉE ESSENTIELLE
              </p>

              <h3>
                Une variable peut être vue comme une case nommée.
              </h3>
            </div>

            <div className="lesson-card-grid">
              <article className="lesson-info-card">
                <div className="lesson-info-number">
                  01
                </div>

                <h4>
                  Le type
                </h4>

                <p>
                  Il indique la nature de la donnée que la variable
                  doit stocker.
                </p>
              </article>

              <article className="lesson-info-card">
                <div className="lesson-info-number">
                  02
                </div>

                <h4>
                  Le nom
                </h4>

                <p>
                  Il permet au programme de désigner cette variable
                  dans les instructions.
                </p>
              </article>

              <article className="lesson-info-card">
                <div className="lesson-info-number">
                  03
                </div>

                <h4>
                  La valeur
                </h4>

                <p>
                  C'est la donnée actuellement contenue dans la
                  variable.
                </p>
              </article>
            </div>
          </section>

          <section className="lesson-note">
            <div className="lesson-note-icon">
              🧠
            </div>

            <div>
              <strong>
                Réflexe pour les devoirs
              </strong>

              <p>
                Quand tu vois une variable, note mentalement ou sur
                ton brouillon sa valeur actuelle. À chaque
                modification, mets cette valeur à jour.
              </p>
            </div>
          </section>
        </div>
      )}

      {/* =====================================================
          ÉTAPE 2 — VARIABLES ET TYPES
          ===================================================== */}
      {currentStep === 1 && (
        <div className="lesson-content">
          <section className="lesson-section">
            <p className="lesson-section-label">
              DÉCLARATION ET INITIALISATION
            </p>

            <h3>
              Une variable possède un type, un nom et éventuellement
              une valeur initiale.
            </h3>

            <p className="lesson-introduction">
              Observe attentivement ces différentes déclarations.
              Le premier mot indique le type de la variable.
            </p>

            <div className="lesson-code-block">
              <div className="lesson-code-header">
                <span>
                  variables.c
                </span>

                <span>
                  C
                </span>
              </div>

              <pre>
                <code>{`int age = 20;

float moyenne = 14.5;

double distance = 128.75;

char initiale = 'S';`}</code>
              </pre>
            </div>
          </section>

          <section className="lesson-section">
            <div className="lesson-line-list">
              <article className="lesson-line-card">
                <div className="lesson-line-symbol">
                  int
                </div>

                <div>
                  <code>
                    int age = 20;
                  </code>

                  <p>
                    <code>int</code> sert ici à stocker une valeur
                    entière, par exemple 0, 10, 25 ou -7.
                  </p>
                </div>
              </article>

              <article className="lesson-line-card">
                <div className="lesson-line-symbol">
                  float
                </div>

                <div>
                  <code>
                    float moyenne = 14.5;
                  </code>

                  <p>
                    <code>float</code> permet de stocker un nombre
                    réel avec une partie décimale.
                  </p>
                </div>
              </article>

              <article className="lesson-line-card">
                <div className="lesson-line-symbol">
                  double
                </div>

                <div>
                  <code>
                    double distance = 128.75;
                  </code>

                  <p>
                    <code>double</code> permet également de stocker
                    des nombres réels et offre généralement une
                    précision supérieure à <code>float</code>.
                  </p>
                </div>
              </article>

              <article className="lesson-line-card">
                <div className="lesson-line-symbol">
                  char
                </div>

                <div>
                  <code>
                    {"char initiale = 'S';"}
                  </code>

                  <p>
                    <code>char</code> sert à représenter un
                    caractère simple, écrit entre apostrophes.
                  </p>
                </div>
              </article>
            </div>
          </section>

          <section className="lesson-section">
            <div className="lesson-section-heading">
              <p className="lesson-section-label">
                À NE PAS CONFONDRE
              </p>

              <h3>
                Les écritures changent selon la donnée.
              </h3>
            </div>

            <div className="lesson-line-list">
              <article className="lesson-line-card">
                <div className="lesson-line-symbol">
                  5
                </div>

                <div>
                  <code>
                    int nombre = 5;
                  </code>

                  <p>
                    Ici, <code>5</code> est une valeur entière.
                  </p>
                </div>
              </article>

              <article className="lesson-line-card">
                <div className="lesson-line-symbol">
                  '5'
                </div>

                <div>
                  <code>
                    {"char chiffre = '5';"}
                  </code>

                  <p>
                    Ici, <code>'5'</code> représente le caractère
                    « 5 ».
                  </p>
                </div>
              </article>

              <article className="lesson-line-card">
                <div className="lesson-line-symbol">
                  "5"
                </div>

                <div>
                  <code>
                    char texte[] = "5";
                  </code>

                  <p>
                    Ici, les guillemets doubles délimitent une
                    chaîne de caractères. Cette notion sera
                    approfondie avec les tableaux de caractères.
                  </p>
                </div>
              </article>
            </div>
          </section>

          <section className="lesson-section">
            <div className="lesson-section-heading">
              <p className="lesson-section-label">
                FORMATS
              </p>

              <h3>
                Le format dépend du type de donnée lu ou affiché.
              </h3>
            </div>

            <div className="lesson-line-list">
              <article className="lesson-line-card">
                <div className="lesson-line-symbol">
                  %d
                </div>

                <div>
                  <code>
                    printf("%d", age);
                  </code>

                  <p>
                    <code>%d</code> est utilisé ici pour afficher
                    une valeur entière de type <code>int</code>.
                  </p>
                </div>
              </article>

              <article className="lesson-line-card">
                <div className="lesson-line-symbol">
                  %f
                </div>

                <div>
                  <code>
                    printf("%f", moyenne);
                  </code>

                  <p>
                    <code>%f</code> permet notamment d'afficher une
                    valeur réelle avec <code>printf</code>.
                  </p>
                </div>
              </article>

              <article className="lesson-line-card">
                <div className="lesson-line-symbol">
                  %c
                </div>

                <div>
                  <code>
                    {"printf(\"%c\", initiale);"}
                  </code>

                  <p>
                    <code>%c</code> est utilisé pour afficher un
                    caractère.
                  </p>
                </div>
              </article>

              <article className="lesson-line-card">
                <div className="lesson-line-symbol">
                  scanf
                </div>

                <div>
                  <code>
                    scanf("%d", &amp;age);
                  </code>

                  <p>
                    Pour <code>scanf</code>, le format doit
                    correspondre au type de la variable et on
                    transmet ici son adresse.
                  </p>
                </div>
              </article>

              <article className="lesson-line-card">
                <div className="lesson-line-symbol">
                  %lf
                </div>

                <div>
                  <code>
                    scanf("%lf", &amp;distance);
                  </code>

                  <p>
                    Avec <code>scanf</code>, <code>%lf</code> est
                    utilisé pour lire une valeur destinée à une
                    variable de type <code>double</code>.
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
                Ne confonds pas le type et le format
              </strong>

              <p>
                <code>int</code>, <code>float</code>,{' '}
                <code>double</code> et <code>char</code> sont des
                types. Des éléments comme <code>%d</code>,{' '}
                <code>%f</code>, <code>%c</code> et{' '}
                <code>%lf</code> sont des spécificateurs de format
                utilisés notamment avec les fonctions d'entrée et
                de sortie.
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
                Une variable change seulement lorsqu'une instruction
                la modifie.
              </h3>

              <p>
                Pour analyser un programme, suis les instructions
                dans l'ordre et actualise mentalement la valeur de
                chaque variable.
              </p>
            </div>
          </section>

          <section className="lesson-section">
            <div className="lesson-section-heading">
              <p className="lesson-section-label">
                EXEMPLE
              </p>

              <h3>
                Suivons la variable x étape par étape.
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
                <code>{`int x = 4;

x = x + 3;

x = x * 2;`}</code>
              </pre>
            </div>
          </section>

          <section className="lesson-section">
            <div className="lesson-line-list">
              <article className="lesson-line-card">
                <div className="lesson-line-symbol">
                  1
                </div>

                <div>
                  <code>
                    int x = 4;
                  </code>

                  <p>
                    Valeur actuelle de <code>x</code> :{' '}
                    <strong>4</strong>.
                  </p>
                </div>
              </article>

              <article className="lesson-line-card">
                <div className="lesson-line-symbol">
                  2
                </div>

                <div>
                  <code>
                    x = x + 3;
                  </code>

                  <p>
                    On utilise la valeur actuelle de{' '}
                    <code>x</code>, donc 4. On calcule 4 + 3.
                    Nouvelle valeur de <code>x</code> :{' '}
                    <strong>7</strong>.
                  </p>
                </div>
              </article>

              <article className="lesson-line-card">
                <div className="lesson-line-symbol">
                  3
                </div>

                <div>
                  <code>
                    x = x * 2;
                  </code>

                  <p>
                    On utilise maintenant 7 : 7 × 2 ={' '}
                    <strong>14</strong>.
                  </p>
                </div>
              </article>
            </div>
          </section>

          <section className="lesson-section">
            <div className="lesson-section-heading">
              <p className="lesson-section-label">
                DEUXIÈME EXEMPLE
              </p>

              <h3>
                Même variable, plusieurs modifications.
              </h3>
            </div>

            <div className="lesson-code-block">
              <div className="lesson-code-header">
                <span>
                  trace.c
                </span>

                <span>
                  À ANALYSER
                </span>
              </div>

              <pre>
                <code>{`int a = 2;

a = a * 3;

a = a - 1;

a = a + 4;`}</code>
              </pre>
            </div>

            <div className="lesson-line-list">
              <article className="lesson-line-card">
                <div className="lesson-line-symbol">
                  1
                </div>

                <div>
                  <code>
                    int a = 2;
                  </code>

                  <p>
                    Départ : <strong>a = 2</strong>.
                  </p>
                </div>
              </article>

              <article className="lesson-line-card">
                <div className="lesson-line-symbol">
                  2
                </div>

                <div>
                  <code>
                    a = a * 3;
                  </code>

                  <p>
                    2 × 3 = <strong>6</strong>. Donc{' '}
                    <strong>a = 6</strong>.
                  </p>
                </div>
              </article>

              <article className="lesson-line-card">
                <div className="lesson-line-symbol">
                  3
                </div>

                <div>
                  <code>
                    a = a - 1;
                  </code>

                  <p>
                    6 - 1 = <strong>5</strong>. Donc{' '}
                    <strong>a = 5</strong>.
                  </p>
                </div>
              </article>

              <article className="lesson-line-card">
                <div className="lesson-line-symbol">
                  4
                </div>

                <div>
                  <code>
                    a = a + 4;
                  </code>

                  <p>
                    5 + 4 = <strong>9</strong>. Valeur finale :{' '}
                    <strong>a = 9</strong>.
                  </p>
                </div>
              </article>
            </div>
          </section>

          <section className="lesson-question-card">
            <span className="lesson-question-number">
              RÉFLEXE
            </span>

            <h4>
              Quand tu vois x = x + 3, ne lis pas « x devient
              x + 3 ».
            </h4>

            <p>
              Lis plutôt : « prends la valeur actuelle de x,
              ajoute 3, puis remplace l'ancienne valeur par le
              nouveau résultat ».
            </p>

            <div className="lesson-answer-explanation">
              <strong>
                C'est ce raisonnement qui sera attendu sur papier.
              </strong>

              <p>
                Il faut toujours partir de la valeur actuelle et
                suivre les modifications dans l'ordre.
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
                Pour un programme long, tu peux créer mentalement ou
                sur papier une petite trace : nom de la variable →
                valeur actuelle. À chaque affectation, remplace
                l'ancienne valeur par la nouvelle.
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
              {totalQuestions} questions — aucune vérification par
              compilation.
            </h3>

            <p className="lesson-introduction">
              Pour valider cette leçon, il faut obtenir{' '}
              <strong>
                {totalQuestions}/{totalQuestions}
              </strong>
              . Cela impose une maîtrise complète de ces bases.
            </p>
          </section>

          {questions.map((question, index) => {
            const selectedAnswer = answers[question.id]

            const isCorrect =
              selectedAnswer === question.correct

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
                  {question.options.map((option) => {
                    const isSelected =
                      selectedAnswer === option.id

                    const optionIsCorrect =
                      submitted &&
                      option.id === question.correct

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
                        disabled={submitted}
                      >
                        <span className="quiz-letter">
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
          })}

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
                  {score === totalQuestions
                    ? 'Maîtrise validée.'
                    : 'La maîtrise n’est pas encore validée.'}
                </strong>

                <p>
                  {score === totalQuestions
                    ? 'Tu peux passer à la validation de la leçon.'
                    : 'Relis les notions, puis recommence jusqu’à obtenir le score complet.'}
                </p>
              </div>

              {score < totalQuestions && (
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
              score === totalQuestions
                ? '✓'
                : '🎯'}
            </div>

            <p className="lesson-section-label">
              VALIDATION
            </p>

            <h3>
              {alreadyCompleted ||
              score === totalQuestions
                ? 'Variables, types et formats maîtrisés.'
                : 'Tu es arrivé à la fin de la leçon.'}
            </h3>

            <p>
              {alreadyCompleted ||
              score === totalQuestions
                ? 'Tu sais maintenant déclarer les principales variables, reconnaître leurs types, utiliser les principaux formats et suivre leur valeur lorsqu’un programme les modifie.'
                : `Pour valider cette leçon, reprends les exercices et obtiens ${totalQuestions}/${totalQuestions}.`}
            </p>

            <div className="lesson-summary">
              <div>
                <span>
                  Notion
                </span>

                <strong>
                  Variables, types et formats
                </strong>
              </div>

              <div>
                <span>
                  Compétence
                </span>

                <strong>
                  Suivre une variable sur papier
                </strong>
              </div>

              <div>
                <span>
                  Objectif examen
                </span>

                <strong>
                  Raisonner sans compiler
                </strong>
              </div>
            </div>

            {alreadyCompleted ||
            score === totalQuestions ? (
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
                onClick={() => setCurrentStep(3)}
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

        {currentStep < steps.length - 1 ? (
          <button
            type="button"
            className="lesson-primary-button"
            onClick={goToNextStep}
            disabled={
              currentStep === 3 &&
              score !== totalQuestions &&
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

export default VariablesLessonPage