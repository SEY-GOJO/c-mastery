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
    label: 'printf et scanf',
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
      'Quelle fonction permet d’afficher une information à l’écran en C ?',
    options: [
      {
        id: 'a',
        text: 'scanf',
      },
      {
        id: 'b',
        text: 'printf',
      },
      {
        id: 'c',
        text: 'main',
      },
      {
        id: 'd',
        text: 'return',
      },
    ],
    correct: 'b',
    explanation:
      'printf est utilisée pour effectuer un affichage formaté, notamment à l’écran.',
  },
  {
    id: 'q2',
    question:
      'Quel spécificateur correspond à une variable de type int avec printf ?',
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
        text: '%lf',
      },
      {
        id: 'd',
        text: '%p',
      },
    ],
    correct: 'a',
    explanation:
      '%d est utilisé ici pour afficher une valeur entière de type int.',
  },
  {
    id: 'q3',
    question:
      'Quelle instruction affiche correctement la valeur de age ?',
    options: [
      {
        id: 'a',
        text: 'printf("%d", &age);',
      },
      {
        id: 'b',
        text: 'printf("%d", age);',
      },
      {
        id: 'c',
        text: 'scanf("%d", age);',
      },
      {
        id: 'd',
        text: 'printf(age, "%d");',
      },
    ],
    correct: 'b',
    explanation:
      'Avec printf, on fournit ici la valeur de age. Le symbole & n’est pas nécessaire pour cet affichage.',
  },
  {
    id: 'q4',
    question:
      'Quelle instruction permet de lire un entier dans la variable age ?',
    options: [
      {
        id: 'a',
        text: 'scanf("%d", age);',
      },
      {
        id: 'b',
        text: 'scanf("%d", &age);',
      },
      {
        id: 'c',
        text: 'printf("%d", &age);',
      },
      {
        id: 'd',
        text: 'scanf("&d", age);',
      },
    ],
    correct: 'b',
    explanation:
      'scanf doit recevoir l’adresse de la variable entière : &age.',
  },
  {
    id: 'q5',
    question:
      'Quel format permet d’afficher un caractère avec printf ?',
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
        text: '%c',
      },
      {
        id: 'd',
        text: '%lf',
      },
    ],
    correct: 'c',
    explanation:
      '%c est utilisé pour afficher un caractère.',
  },
  {
    id: 'q6',
    question:
      'Quel format est utilisé avec scanf pour lire une variable de type double ?',
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
        text: '%f',
      },
      {
        id: 'd',
        text: '%lf',
      },
    ],
    correct: 'd',
    explanation:
      'Avec scanf, %lf correspond à la lecture d’une valeur destinée à une variable de type double.',
  },
  {
    id: 'q7',
    question:
      'Quelle sera la valeur finale de somme ?',
    code: `int a = 4;

int b = 6;

int somme;

somme = a + b;

printf("%d", somme);`,
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
        text: '46',
      },
    ],
    correct: 'c',
    explanation:
      'a vaut 4 et b vaut 6. L’affectation somme = a + b donne donc somme = 10, puis printf affiche 10.',
  },
  {
    id: 'q8',
    question:
      'Dans scanf("%d", &age), que représente &age ?',
    options: [
      {
        id: 'a',
        text: 'La valeur de age',
      },
      {
        id: 'b',
        text: 'L’adresse de age',
      },
      {
        id: 'c',
        text: 'Le type de age',
      },
      {
        id: 'd',
        text: 'Le résultat de age',
      },
    ],
    correct: 'b',
    explanation:
      '&age représente l’adresse de la variable age. C’est cette adresse qui permet à scanf d’écrire la valeur saisie dans la variable.',
  },
]

function PrintfScanfLessonPage({
  onBack,
  onComplete,
  alreadyCompleted = false,
}) {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)
  const [assessmentQuestions, setAssessmentQuestions] = useState(() => shuffleQuestions(questions))

  const lessonData =
    findLessonById('printf-scanf')

  const totalQuestions = assessmentQuestions.length
  const passingScore = getPassingScore(totalQuestions)

  const progressPercentage =
    ((currentStep + 1) / steps.length) * 100

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

    if (
      calculatedScore >= passingScore
    ) {
      onComplete('printf-scanf')
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
              '04'}
          </p>

          <h2>
            {lessonData?.title ||
              'printf et scanf'}
          </h2>

          <p>
            Maîtriser l’affichage, la saisie au
            clavier et les principaux formats
            utilisés avec les variables en C.
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
              ⌨️
            </div>

            <div>
              <p className="lesson-section-label">
                OBJECTIF
              </p>

              <h3>
                Savoir faire entrer et sortir
                les données d’un programme.
              </h3>

              <p>
                Une fois les variables et les
                opérateurs compris, il faut
                apprendre à afficher leurs valeurs
                et à recevoir des données saisies
                par l’utilisateur. C’est le rôle
                essentiel de <code>printf</code> et
                <code>scanf</code>.
              </p>
            </div>
          </section>

          <section className="lesson-section">
            <div className="lesson-section-heading">
              <p className="lesson-section-label">
                COMPÉTENCES
              </p>

              <h3>
                À la fin de cette leçon, tu dois
                savoir :
              </h3>
            </div>

            <div className="lesson-card-grid">
              <article className="lesson-info-card">
                <div className="lesson-info-number">
                  01
                </div>

                <h4>Afficher</h4>

                <p>
                  Utiliser <code>printf</code> pour
                  afficher du texte et les valeurs
                  contenues dans des variables.
                </p>
              </article>

              <article className="lesson-info-card">
                <div className="lesson-info-number">
                  02
                </div>

                <h4>Saisir</h4>

                <p>
                  Utiliser <code>scanf</code> pour
                  lire une donnée fournie au
                  clavier.
                </p>
              </article>

              <article className="lesson-info-card">
                <div className="lesson-info-number">
                  03
                </div>

                <h4>Choisir le format</h4>

                <p>
                  Associer le bon spécificateur au
                  type de donnée manipulé.
                </p>
              </article>

              <article className="lesson-info-card">
                <div className="lesson-info-number">
                  04
                </div>

                <h4>Lire sur papier</h4>

                <p>
                  Déterminer ce qui sera affiché et
                  suivre une variable après une
                  saisie utilisateur.
                </p>
              </article>
            </div>
          </section>

          <section className="lesson-section">
            <div className="lesson-section-heading">
              <p className="lesson-section-label">
                DEUX RÔLES
              </p>

              <h3>
                Une fonction affiche, l’autre lit.
              </h3>
            </div>

            <div className="lesson-line-list">
              <article className="lesson-line-card">
                <div className="lesson-line-symbol">
                  OUT
                </div>

                <div>
                  <code>printf(...);</code>

                  <p>
                    Sert notamment à envoyer une
                    information vers la sortie
                    standard, par exemple l’écran.
                  </p>
                </div>
              </article>

              <article className="lesson-line-card">
                <div className="lesson-line-symbol">
                  IN
                </div>

                <div>
                  <code>scanf(...);</code>

                  <p>
                    Sert à lire des données saisies
                    au clavier selon un format
                    indiqué.
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
                Quand tu vois <code>printf</code>,
                pense « affichage ». Quand tu vois
                <code>scanf</code>, pense « saisie ».
                Ensuite seulement, regarde le format
                et les variables concernées.
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
              printf
            </p>

            <h3>
              Afficher du texte et des valeurs
            </h3>

            <p className="lesson-introduction">
              Le texte placé directement entre
              guillemets est affiché tel quel. Pour
              afficher une variable, on utilise
              généralement un spécificateur de format
              adapté.
            </p>

            <div className="lesson-code-block">
              <div className="lesson-code-header">
                <span>printf.c</span>

                <span>C</span>
              </div>

              <pre>
                <code>{`int age = 20;
char initiale = 'S';
float moyenne = 14.5;
printf("Bonjour");
printf("%d", age);
printf("%c", initiale);
printf("%f", moyenne);`}</code>
              </pre>
            </div>
          </section>

          <section className="lesson-section">
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
                    Utilisé ici pour afficher une
                    valeur entière de type{' '}
                    <code>int</code>.
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
                    Utilisé pour afficher une valeur
                    réelle.
                  </p>
                </div>
              </article>

              <article className="lesson-line-card">
                <div className="lesson-line-symbol">
                  %c
                </div>

                <div>
                  <code>
                    {'printf("%c", initiale);'}
                  </code>

                  <p>
                    Utilisé pour afficher un
                    caractère.
                  </p>
                </div>
              </article>
            </div>
          </section>

          <section className="lesson-section">
            <p className="lesson-section-label">
              scanf
            </p>

            <h3>
              Lire une valeur saisie par
              l’utilisateur
            </h3>

            <div className="lesson-code-block">
              <div className="lesson-code-header">
                <span>scanf.c</span>

                <span>C</span>
              </div>

              <pre>
                <code>{`int age;
printf("Entrez votre âge : ");
scanf("%d", &age);`}</code>
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
                  La variable existe
                </strong>

                <p>
                  <code>int age;</code> réserve une
                  variable appelée <code>age</code>
                  destinée à recevoir un entier.
                </p>
              </div>
            </article>

            <article className="lesson-line-card">
              <div className="lesson-line-symbol">
                2
              </div>

              <div>
                <strong>
                  Le format indique le type attendu
                </strong>

                <p>
                  <code>%d</code> indique ici que
                  l’on attend un entier.
                </p>
              </div>
            </article>

            <article className="lesson-line-card">
              <div className="lesson-line-symbol">
                3
              </div>

              <div>
                <strong>
                  &amp;age fournit l’adresse
                </strong>

                <p>
                  Le symbole <code>&amp;</code> permet
                  d’obtenir l’adresse de la variable{' '}
                  <code>age</code>. <code>scanf</code>
                  peut ainsi y placer la donnée
                  saisie.
                </p>
              </div>
            </article>
          </section>

          <section className="lesson-section">
            <div className="lesson-section-heading">
              <p className="lesson-section-label">
                TABLEAU DE REPÈRES
              </p>

              <h3>
                Reconnaître rapidement les
                principaux formats
              </h3>
            </div>

            <div className="lesson-line-list">
              <article className="lesson-line-card">
                <div className="lesson-line-symbol">
                  int
                </div>

                <div>
                  <strong>
                    %d avec printf/scanf
                  </strong>

                  <p>
                    Pour les valeurs entières.
                  </p>
                </div>
              </article>

              <article className="lesson-line-card">
                <div className="lesson-line-symbol">
                  float
                </div>

                <div>
                  <strong>%f</strong>

                  <p>
                    Pour afficher ou lire une
                    valeur de type <code>float</code>
                    avec les usages standards
                    correspondants.
                  </p>
                </div>
              </article>

              <article className="lesson-line-card">
                <div className="lesson-line-symbol">
                  double
                </div>

                <div>
                  <strong>%f / %lf</strong>

                  <p>
                    Retenir surtout la différence
                    de contexte : <code>%f</code> pour
                    l’affichage avec{' '}
                    <code>printf</code>, et{' '}
                    <code>%lf</code> pour la lecture
                    d’un <code>double</code> avec{' '}
                    <code>scanf</code>.
                  </p>
                </div>
              </article>

              <article className="lesson-line-card">
                <div className="lesson-line-symbol">
                  char
                </div>

                <div>
                  <strong>%c</strong>

                  <p>
                    Pour les caractères.
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
                Piège classique avec scanf
              </strong>

              <p>
                Pour une variable simple comme{' '}
                <code>age</code>,{' '}
                <code>scanf("%d", &amp;age)</code>{' '}
                utilise son adresse. Oublier{' '}
                <code>&amp;</code> est une erreur très
                fréquente dans les exercices.
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
                Une saisie modifie la valeur de la
                variable.
              </h3>

              <p>
                Dans un exercice sur feuille, tu
                dois être capable de suivre
                mentalement la donnée saisie, puis
                de poursuivre l’exécution avec cette
                nouvelle valeur.
              </p>
            </div>
          </section>

          <section className="lesson-section">
            <div className="lesson-section-heading">
              <p className="lesson-section-label">
                EXEMPLE 01
              </p>

              <h3>
                Suivre une saisie entière
              </h3>
            </div>

            <div className="lesson-code-block">
              <div className="lesson-code-header">
                <span>lecture.c</span>

                <span>À ANALYSER</span>
              </div>

              <pre>
                <code>{`int age;
scanf("%d", &age);
age = age + 2;
printf("%d", age);`}</code>
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
                  Départ
                </strong>

                <p>
                  La variable <code>age</code> est
                  déclarée mais sa valeur n’est pas
                  encore déterminée dans le code.
                </p>
              </div>
            </article>

            <article className="lesson-line-card">
              <div className="lesson-line-symbol">
                2
              </div>

              <div>
                <strong>
                  Saisie
                </strong>

                <p>
                  Supposons que l’utilisateur saisisse{' '}
                  <strong>18</strong>. Après la
                  saisie, <code>age</code> vaut{' '}
                  <strong>18</strong>.
                </p>
              </div>
            </article>

            <article className="lesson-line-card">
              <div className="lesson-line-symbol">
                3
              </div>

              <div>
                <strong>
                  Calcul
                </strong>

                <p>
                  <code>age = age + 2;</code> donne
                  18 + 2 = <strong>20</strong>.
                </p>
              </div>
            </article>

            <article className="lesson-line-card">
              <div className="lesson-line-symbol">
                4
              </div>

              <div>
                <strong>
                  Affichage
                </strong>

                <p>
                  <code>printf("%d", age);</code>{' '}
                  affiche <strong>20</strong>.
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
                Lire exactement ce que printf va
                afficher
              </h3>
            </div>

            <div className="lesson-code-block">
              <div className="lesson-code-header">
                <span>affichage.c</span>

                <span>À ANALYSER</span>
              </div>

              <pre>
                <code>{`int x = 12;
int y = 5;
printf("%d", x - y);`}</code>
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
                  Identifier les valeurs
                </strong>

                <p>
                  <code>x = 12</code> et{' '}
                  <code>y = 5</code>.
                </p>
              </div>
            </article>

            <article className="lesson-line-card">
              <div className="lesson-line-symbol">
                2
              </div>

              <div>
                <strong>
                  Évaluer l’expression
                </strong>

                <p>
                  <code>x - y</code> donne 12 - 5 ={' '}
                  <strong>7</strong>.
                </p>
              </div>
            </article>

            <article className="lesson-line-card">
              <div className="lesson-line-symbol">
                3
              </div>

              <div>
                <strong>
                  Appliquer le format
                </strong>

                <p>
                  <code>%d</code> demande à{' '}
                  <code>printf</code> d’afficher cette
                  valeur entière.
                </p>
              </div>
            </article>

            <article className="lesson-line-card">
              <div className="lesson-line-symbol">
                4
              </div>

              <div>
                <strong>
                  Résultat
                </strong>

                <p>
                  Le programme affiche exactement{' '}
                  <strong>7</strong>.
                </p>
              </div>
            </article>
          </section>

          <section className="lesson-question-card">
            <span className="lesson-question-number">
              RÉFLEXE
            </span>

            <h4>
              Ne confonds jamais la valeur et son
              adresse.
            </h4>

            <p>
              <code>age</code> désigne la valeur
              contenue dans la variable.{' '}
              <code>&amp;age</code> désigne son adresse.
              Cette différence sera essentielle
              lorsque nous étudierons les pointeurs.
            </p>

            <div className="lesson-answer-explanation">
              <strong>
                Le lien avec les pointeurs commence
                ici.
              </strong>

              <p>
                Le symbole <code>&amp;</code> rencontré
                avec <code>scanf</code> prépare
                directement le terrain pour le
                chapitre consacré aux adresses et aux
                pointeurs.
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
                Lorsqu’une saisie intervient, écris
                la valeur reçue dans ta trace avant
                de continuer l’analyse du programme.
                Ne laisse jamais une variable « sans
                valeur » dans ton raisonnement après
                une saisie.
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
              maîtrise de printf, scanf et des
              formats.
            </h3>

            <p className="lesson-introduction">
              Pour valider cette leçon, tu dois
              obtenir{' '}
              <strong>
                {passingScore}/
                {totalQuestions}
              </strong>
              . Tu peux faire quelques erreurs et valider quand même.
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
              onClick={
                submitExercise
              }
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
                  {score ===
                  passingScore
                    ? 'Maîtrise validée.'
                    : 'La maîtrise n’est pas encore validée.'}
                </strong>

                <p>
                  {score ===
                  passingScore
                    ? 'Tu peux maintenant poursuivre vers les instructions de contrôle.'
                    : `Relis les notions, notamment les formats et l’adresse avec scanf, puis vise ${passingScore}/${totalQuestions}.`}
                </p>
              </div>

              {score <
                passingScore && (
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
                ? 'printf et scanf maîtrisés.'
                : 'Tu es arrivé à la fin de la leçon.'}
            </h3>

            <p>
              {alreadyCompleted ||
              score >= passingScore
                ? 'Tu sais maintenant afficher des informations, lire des données au clavier, reconnaître les principaux formats et distinguer une valeur d’une adresse.'
                : `Pour valider cette leçon, obtiens au moins ${passingScore}/${totalQuestions}.`}
            </p>

            <div className="lesson-summary">
              <div>
                <span>
                  Notion
                </span>

                <strong>
                  printf, scanf et formats
                </strong>
              </div>

              <div>
                <span>
                  Compétence
                </span>

                <strong>
                  Lire et analyser une
                  entrée/sortie
                </strong>
              </div>

              <div>
                <span>
                  Objectif examen
                </span>

                <strong>
                  Déterminer les valeurs et
                  affichages sans compiler
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

export default PrintfScanfLessonPage
