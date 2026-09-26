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
    label: 'do...while',
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
      'Quelle caractéristique distingue principalement une boucle do...while ?',
    options: [
      {
        id: 'a',
        text: 'La condition est toujours testée avant la première exécution',
      },
      {
        id: 'b',
        text: 'Le bloc est exécuté au moins une fois',
      },
      {
        id: 'c',
        text: 'La boucle ne peut jamais contenir de calcul',
      },
      {
        id: 'd',
        text: 'Elle fonctionne uniquement avec des tableaux',
      },
    ],
    correct: 'b',
    explanation:
      'Dans une boucle do...while, le bloc est exécuté avant que la condition soit testée. Il est donc exécuté au moins une fois.',
  },
  {
    id: 'q2',
    question:
      'Quelle écriture correspond à la syntaxe générale d’une boucle do...while ?',
    options: [
      {
        id: 'a',
        text: 'do { instructions } while (condition);',
      },
      {
        id: 'b',
        text: 'while { instructions } do (condition);',
      },
      {
        id: 'c',
        text: 'do (condition) { instructions };',
      },
      {
        id: 'd',
        text: 'while (condition) do { instructions };',
      },
    ],
    correct: 'a',
    explanation:
      'La syntaxe générale est : do { instructions } while (condition);. Le point-virgule après la parenthèse finale fait partie de la syntaxe.',
  },
  {
    id: 'q3',
    question: 'Quelle est la valeur finale de x ?',
    code: `int x = 5;

do {
    x = x - 1;
} while (x > 10);`,
    options: [
      {
        id: 'a',
        text: '5',
      },
      {
        id: 'b',
        text: '4',
      },
      {
        id: 'c',
        text: '10',
      },
      {
        id: 'd',
        text: '9',
      },
    ],
    correct: 'b',
    explanation:
      'Même si x > 10 est faux dès le départ, le bloc est exécuté une fois. x passe donc de 5 à 4, puis la condition 4 > 10 est fausse.',
  },
  {
    id: 'q4',
    question:
      'Dans quel cas une boucle do...while est-elle particulièrement adaptée ?',
    options: [
      {
        id: 'a',
        text: 'Lorsqu’on veut garantir au moins une exécution',
      },
      {
        id: 'b',
        text: 'Lorsqu’on veut éviter toute condition',
      },
      {
        id: 'c',
        text: 'Lorsqu’on connaît obligatoirement le nombre exact d’itérations avant de commencer',
      },
      {
        id: 'd',
        text: 'Lorsqu’on ne veut jamais modifier une variable',
      },
    ],
    correct: 'a',
    explanation:
      'do...while est particulièrement utile lorsqu’une première exécution doit avoir lieu avant de vérifier la condition.',
  },
  {
    id: 'q5',
    question: 'Quelle est la valeur finale de i ?',
    code: `int i = 1;

do {
    i = i + 1;
} while (i < 4);`,
    options: [
      {
        id: 'a',
        text: '3',
      },
      {
        id: 'b',
        text: '4',
      },
      {
        id: 'c',
        text: '5',
      },
      {
        id: 'd',
        text: '1',
      },
    ],
    correct: 'b',
    explanation:
      'i vaut 1 au départ. Après les passages successifs, i vaut 2, puis 3, puis 4. À 4, la condition 4 < 4 est fausse.',
  },
  {
    id: 'q6',
    question: 'Quelle valeur finale de somme obtient-on ?',
    code: `int i = 1;

int somme = 0;

do {
    somme = somme + i * i;
    i = i + 1;
} while (somme <= 650);`,
    options: [
      {
        id: 'a',
        text: '506',
      },
      {
        id: 'b',
        text: '650',
      },
      {
        id: 'c',
        text: '819',
      },
      {
        id: 'd',
        text: '681',
      },
    ],
    correct: 'c',
    explanation:
      'La somme atteint 650 après le carré de 12. La condition reste vraie, donc la boucle continue avec 13 : 650 + 169 = 819. La boucle s’arrête alors.',
  },
  {
    id: 'q7',
    question: 'Quel résultat affiche ce programme ?',
    code: `int i = 1;

do {
    printf("%d ", i);
    i = i + 1;
} while (i <= 3);`,
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
      'Le programme affiche 1, puis 2, puis 3. Après avoir affiché 3, i devient 4 et la condition 4 <= 3 devient fausse.',
  },
  {
    id: 'q8',
    question:
      'Que faut-il retenir pour analyser une boucle do...while sur papier ?',
    options: [
      {
        id: 'a',
        text: 'Tester la condition avant de lire le bloc',
      },
      {
        id: 'b',
        text: 'Ignorer la première exécution',
      },
      {
        id: 'c',
        text: 'Exécuter mentalement le bloc, mettre les variables à jour, puis tester la condition',
      },
      {
        id: 'd',
        text: 'Compter uniquement les accolades',
      },
    ],
    correct: 'c',
    explanation:
      'Pour une analyse sur papier, on exécute d’abord le bloc, on met à jour les valeurs, puis on évalue la condition pour décider si une nouvelle itération doit avoir lieu.',
  },
]

function DoWhileLessonPage({
  onBack,
  onComplete,
  alreadyCompleted = false,
}) {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)
  const [assessmentQuestions, setAssessmentQuestions] = useState(() => shuffleQuestions(questions))

  const lessonData = findLessonById('do-while')

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
      if (answers[question.id] === question.correct) {
        calculatedScore += 1
      }
    })

    setScore(calculatedScore)
    setSubmitted(true)

    if (calculatedScore >= passingScore) {
      onComplete('do-while')
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
            MODULE {lessonData?.moduleNumber || '02'} • LEÇON{' '}
            {lessonData?.number || '01'}
          </p>

          <h2>
            {lessonData?.title || 'Boucle do...while'}
          </h2>

          <p>
            Comprendre le fonctionnement de la boucle do...while,
            savoir suivre ses itérations et déterminer son résultat
            sans compiler.
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
              🔄
            </div>

            <div>
              <p className="lesson-section-label">
                OBJECTIF
              </p>

              <h3>
                Comprendre une boucle qui s’exécute avant de tester
                sa condition.
              </h3>

              <p>
                La boucle <code>do...while</code> permet de répéter
                des instructions. Sa particularité fondamentale est
                que le bloc est exécuté au moins une fois avant que
                la condition soit vérifiée.
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
                  Reconnaître la structure
                </h4>

                <p>
                  Identifier immédiatement une boucle{' '}
                  <code>do...while</code> dans un programme.
                </p>
              </article>

              <article className="lesson-info-card">
                <div className="lesson-info-number">
                  02
                </div>

                <h4>
                  Suivre les itérations
                </h4>

                <p>
                  Actualiser les variables après chaque passage dans
                  la boucle.
                </p>
              </article>

              <article className="lesson-info-card">
                <div className="lesson-info-number">
                  03
                </div>

                <h4>
                  Tester la condition
                </h4>

                <p>
                  Déterminer si une nouvelle itération doit avoir
                  lieu après chaque exécution.
                </p>
              </article>

              <article className="lesson-info-card">
                <div className="lesson-info-number">
                  04
                </div>

                <h4>
                  Calculer sans compiler
                </h4>

                <p>
                  Déterminer la valeur finale des variables et la
                  sortie du programme sur papier.
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
                L’ordre est différent d’une boucle contrôlée en tête.
              </h3>
            </div>

            <div className="lesson-line-list">
              <article className="lesson-line-card">
                <div className="lesson-line-symbol">
                  01
                </div>

                <div>
                  <strong>
                    Exécuter le bloc
                  </strong>

                  <p>
                    Les instructions placées entre <code>do</code>
                    et <code>while</code> sont exécutées.
                  </p>
                </div>
              </article>

              <article className="lesson-line-card">
                <div className="lesson-line-symbol">
                  02
                </div>

                <div>
                  <strong>
                    Mettre à jour les valeurs
                  </strong>

                  <p>
                    Les variables modifiées dans le bloc prennent
                    leur nouvelle valeur.
                  </p>
                </div>
              </article>

              <article className="lesson-line-card">
                <div className="lesson-line-symbol">
                  03
                </div>

                <div>
                  <strong>
                    Tester la condition
                  </strong>

                  <p>
                    Si elle est vraie, une nouvelle itération commence.
                    Si elle est fausse, la boucle s’arrête.
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
                Avec <code>do...while</code>, pense toujours :
                « exécuter → mettre à jour → tester → recommencer
                ou arrêter ».
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
              STRUCTURE
            </p>

            <h3>
              La forme générale d’une boucle do...while
            </h3>

            <div className="lesson-code-block">
              <div className="lesson-code-header">
                <span>dowhile.c</span>
                <span>C</span>
              </div>

              <pre>
                <code>{`do {
    instructions;
} while (condition);`}</code>
              </pre>
            </div>
          </section>

          <section className="lesson-section">
            <div className="lesson-line-list">
              <article className="lesson-line-card">
                <div className="lesson-line-symbol">
                  do
                </div>

                <div>
                  <strong>
                    Début du bloc répété
                  </strong>

                  <p>
                    Le mot-clé <code>do</code> indique le début des
                    instructions à répéter.
                  </p>
                </div>
              </article>

              <article className="lesson-line-card">
                <div className="lesson-line-symbol">
                  {'{ }'}
                </div>

                <div>
                  <strong>
                    Instructions
                  </strong>

                  <p>
                    Les instructions entre les accolades constituent
                    le bloc exécuté à chaque itération.
                  </p>
                </div>
              </article>

              <article className="lesson-line-card">
                <div className="lesson-line-symbol">
                  while
                </div>

                <div>
                  <strong>
                    Condition
                  </strong>

                  <p>
                    La condition est testée après l’exécution du
                    bloc.
                  </p>
                </div>
              </article>

              <article className="lesson-line-card">
                <div className="lesson-line-symbol">
                  ;
                </div>

                <div>
                  <strong>
                    Point-virgule final
                  </strong>

                  <p>
                    Dans la syntaxe <code>do...while</code>, le
                    point-virgule après la condition est obligatoire.
                  </p>
                </div>
              </article>
            </div>
          </section>

          <section className="lesson-section">
            <p className="lesson-section-label">
              EXEMPLE SIMPLE
            </p>

            <h3>
              Compter de 1 à 3
            </h3>

            <div className="lesson-code-block">
              <div className="lesson-code-header">
                <span>compteur.c</span>
                <span>C</span>
              </div>

              <pre>
                <code>{`int i = 1;

do {
    printf("%d ", i);
    i = i + 1;
} while (i <= 3);`}</code>
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
                  Première exécution
                </strong>

                <p>
                  i vaut 1. Le programme affiche 1, puis i devient
                  2.
                </p>
              </div>
            </article>

            <article className="lesson-line-card">
              <div className="lesson-line-symbol">
                2
              </div>

              <div>
                <strong>
                  Deuxième exécution
                </strong>

                <p>
                  i vaut 2. Le programme affiche 2, puis i devient
                  3.
                </p>
              </div>
            </article>

            <article className="lesson-line-card">
              <div className="lesson-line-symbol">
                3
              </div>

              <div>
                <strong>
                  Troisième exécution
                </strong>

                <p>
                  i vaut 3. Le programme affiche 3, puis i devient
                  4.
                </p>
              </div>
            </article>

            <article className="lesson-line-card">
              <div className="lesson-line-symbol">
                4
              </div>

              <div>
                <strong>
                  Arrêt
                </strong>

                <p>
                  La condition 4 &lt;= 3 est fausse. La boucle
                  s’arrête.
                </p>
              </div>
            </article>
          </section>

          <section className="lesson-section">
            <p className="lesson-section-label">
              CAS IMPORTANT
            </p>

            <h3>
              Une condition fausse au départ n’empêche pas la
              première exécution.
            </h3>

            <div className="lesson-code-block">
              <div className="lesson-code-header">
                <span>attention.c</span>
                <span>PIÈGE</span>
              </div>

              <pre>
                <code>{`int x = 5;

do {
    x = x - 1;
} while (x > 10);`}</code>
              </pre>
            </div>

            <div className="lesson-question-card">
              <span className="lesson-question-number">
                PIÈGE
              </span>

              <h4>
                La condition x &gt; 10 est fausse avant la première
                itération.
              </h4>

              <p>
                Pourtant le bloc s’exécute quand même. x passe de
                5 à 4. Ensuite seulement, la condition 4 &gt; 10
                est testée et la boucle s’arrête.
              </p>

              <div className="lesson-answer-explanation">
                <strong>
                  Une boucle do...while exécute toujours son bloc au
                  moins une fois.
                </strong>

                <p>
                  C’est le piège fondamental à retenir.
                </p>
              </div>
            </div>
          </section>

          <section className="lesson-note">
            <div className="lesson-note-icon">
              ⚠️
            </div>

            <div>
              <strong>
                Attention au point-virgule
              </strong>

              <p>
                Ne termine pas la ligne <code>do</code> par un
                point-virgule. Le point-virgule se trouve après la
                condition de <code>while</code>.
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
                Une boucle se lit comme une succession d’états.
              </h3>

              <p>
                Pour un devoir, ne cherche pas à imaginer toute la
                boucle d’un seul coup. Suis chaque passage et note
                les valeurs importantes.
              </p>
            </div>
          </section>

          <section className="lesson-section">
            <div className="lesson-section-heading">
              <p className="lesson-section-label">
                EXEMPLE
              </p>

              <h3>
                Calculer une somme progressivement
              </h3>
            </div>

            <div className="lesson-code-block">
              <div className="lesson-code-header">
                <span>somme.c</span>
                <span>À ANALYSER</span>
              </div>

              <pre>
                <code>{`int i = 1;
int somme = 0;

do {
    somme = somme + i;
    i = i + 1;
} while (somme < 6);`}</code>
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
                  <code>i = 1</code> et <code>somme = 0</code>.
                </p>
              </div>
            </article>

            <article className="lesson-line-card">
              <div className="lesson-line-symbol">
                2
              </div>

              <div>
                <strong>
                  Première itération
                </strong>

                <p>
                  somme = 0 + 1 = <strong>1</strong>. Puis i devient
                  <strong> 2</strong>. La condition 1 &lt; 6 est vraie.
                </p>
              </div>
            </article>

            <article className="lesson-line-card">
              <div className="lesson-line-symbol">
                3
              </div>

              <div>
                <strong>
                  Deuxième itération
                </strong>

                <p>
                  somme = 1 + 2 = <strong>3</strong>. Puis i devient
                  <strong> 3</strong>. La condition 3 &lt; 6 est vraie.
                </p>
              </div>
            </article>

            <article className="lesson-line-card">
              <div className="lesson-line-symbol">
                4
              </div>

              <div>
                <strong>
                  Troisième itération
                </strong>

                <p>
                  somme = 3 + 3 = <strong>6</strong>. Puis i devient
                  <strong> 4</strong>. La condition 6 &lt; 6 est
                  fausse.
                </p>
              </div>
            </article>
          </section>

          <section className="lesson-section">
            <div className="lesson-section-heading">
              <p className="lesson-section-label">
                MÉTHODE
              </p>

              <h3>
                Construire une trace de boucle
              </h3>
            </div>

            <div className="lesson-card-grid">
              <article className="lesson-info-card">
                <div className="lesson-info-number">
                  01
                </div>

                <h4>
                  Valeur de départ
                </h4>

                <p>
                  Note les valeurs initiales avant d’entrer dans le
                  <code>do</code>.
                </p>
              </article>

              <article className="lesson-info-card">
                <div className="lesson-info-number">
                  02
                </div>

                <h4>
                  Calcul
                </h4>

                <p>
                  Exécute exactement les instructions du bloc.
                </p>
              </article>

              <article className="lesson-info-card">
                <div className="lesson-info-number">
                  03
                </div>

                <h4>
                  Mise à jour
                </h4>

                <p>
                  Remplace les anciennes valeurs par les nouvelles.
                </p>
              </article>

              <article className="lesson-info-card">
                <div className="lesson-info-number">
                  04
                </div>

                <h4>
                  Condition
                </h4>

                <p>
                  Seulement maintenant, décide si la boucle continue.
                </p>
              </article>
            </div>
          </section>

          <section className="lesson-section">
            <div className="lesson-question-card">
              <span className="lesson-question-number">
                FORMULE MENTALE
              </span>

              <h4>
                do...while = faire d’abord, vérifier ensuite.
              </h4>

              <p>
                À chaque tour, pense :
                <strong>
                  {' '}« J’exécute le bloc → je mets à jour → je
                  teste la condition ».
                </strong>
              </p>

              <div className="lesson-answer-explanation">
                <strong>
                  Ce réflexe devient essentiel avec les exercices
                  d’accumulation.
                </strong>

                <p>
                  Par exemple : sommes, carrés successifs,
                  compteurs et saisies répétées.
                </p>
              </div>
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
                Pour une boucle longue, fais une petite trace sous
                la forme : itération → valeur de i → valeur de somme
                → condition. Cela réduit les erreurs de calcul.
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
              {totalQuestions} questions — analyse sans compilateur.
            </h3>

            <p className="lesson-introduction">
              Ces questions reprennent les principes fondamentaux
              de la boucle <code>do...while</code>, notamment les
              itérations et les exercices d’accumulation étudiés
              dans le support.
            </p>

            <p className="lesson-introduction">
              Pour valider la leçon, il faut obtenir{' '}
              <strong>
                {passingScore}/{totalQuestions}
              </strong>
              .
            </p>
          </section>

          {assessmentQuestions.map((question, index) => {
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
                    <code>{question.code}</code>
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
                    ? 'Tu peux maintenant passer à la validation de la leçon.'
                    : 'Relis la structure de do...while, notamment le fait que le bloc est exécuté avant le test de la condition, puis recommence.'}
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
                ? 'Boucle do...while maîtrisée.'
                : 'Tu es arrivé à la fin de la leçon.'}
            </h3>

            <p>
              {alreadyCompleted ||
              score >= passingScore
                ? 'Tu sais maintenant reconnaître la structure d’une boucle do...while, suivre ses itérations, mettre à jour les variables et déterminer la condition d’arrêt sans compiler.'
                : `Pour valider cette leçon, obtiens au moins ${passingScore}/${totalQuestions}.`}
            </p>

            <div className="lesson-summary">
              <div>
                <span>
                  Notion
                </span>

                <strong>
                  Boucle do...while
                </strong>
              </div>

              <div>
                <span>
                  Compétence
                </span>

                <strong>
                  Suivre une boucle sur papier
                </strong>
              </div>

              <div>
                <span>
                  Objectif examen
                </span>

                <strong>
                  Calculer les valeurs successives et la condition d’arrêt
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

export default DoWhileLessonPage
