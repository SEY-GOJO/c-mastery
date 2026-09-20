import { useState } from 'react'

import { findLessonById } from './data/course'

import './LessonPage.css'

const lessonSteps = [
  {
    id: 'objectif',
    label: 'Objectif',
  },
  {
    id: 'structure',
    label: 'Structure',
  },
  {
    id: 'lecture',
    label: 'Lecture',
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

function LessonPage({
  lessonId,
  onBack,
  onComplete,
  alreadyCompleted = false,
}) {
  const [currentStep, setCurrentStep] = useState(0)

  const [answers, setAnswers] = useState({
    output: null,
    main: null,
  })

  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)

  const lessonData = findLessonById(lessonId)

  const isFirstLesson = lessonId === 'introduction-c'

  if (!isFirstLesson || !lessonData) {
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

  const goToNextStep = () => {
    if (currentStep < lessonSteps.length - 1) {
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

  const chooseAnswer = (question, answer) => {
    if (submitted) {
      return
    }

    setAnswers((currentAnswers) => ({
      ...currentAnswers,
      [question]: answer,
    }))
  }

  const submitExercise = () => {
    const outputCorrect = answers.output === 'bonjour'
    const mainCorrect = answers.main === 'entree'

    const calculatedScore =
      Number(outputCorrect) + Number(mainCorrect)

    setScore(calculatedScore)
    setSubmitted(true)

    if (calculatedScore === 2) {
      onComplete(lessonId)
    }
  }

  const resetExercise = () => {
    setAnswers({
      output: null,
      main: null,
    })

    setSubmitted(false)
    setScore(0)
  }

  const currentStepLabel = lessonSteps[currentStep].label

  const progressPercentage =
    ((currentStep + 1) / lessonSteps.length) * 100

  return (
    <section className="lesson-shell">
      {/* =====================================================
          EN-TÊTE DE LA LEÇON
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
            MODULE {lessonData.moduleNumber} • LEÇON {lessonData.number}
          </p>

          <h2>
            {lessonData.title}
          </h2>

          <p>
            Comprendre les premières bases du langage C et apprendre
            à lire un programme correctement, notamment sans
            avoir besoin de le compiler.
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
            Étape {currentStep + 1} sur {lessonSteps.length}
          </span>

          <strong>
            {currentStepLabel}
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
          {lessonSteps.map((step, index) => (
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
              🎯
            </div>

            <div>
              <p className="lesson-section-label">
                OBJECTIF
              </p>

              <h3>
                Comprendre ce qu'est le langage C et reconnaître
                la structure d'un programme.
              </h3>

              <p>
                Cette première leçon pose les fondations de tout le
                parcours. L'objectif n'est pas de mémoriser du code
                au hasard, mais de comprendre ce que tu lis et ce
                que chaque élément signifie.
              </p>
            </div>
          </section>

          <section className="lesson-section">
            <div className="lesson-section-heading">
              <p className="lesson-section-label">
                CE QUE TU VAS APPRENDRE
              </p>

              <h3>
                Les premières notions indispensables
              </h3>
            </div>

            <div className="lesson-card-grid">
              <article className="lesson-info-card">
                <div className="lesson-info-number">
                  01
                </div>

                <h4>
                  Historique du langage C
                </h4>

                <p>
                  Comprendre dans quel contexte le langage C est
                  apparu et pourquoi il est devenu un langage
                  important en programmation.
                </p>
              </article>

              <article className="lesson-info-card">
                <div className="lesson-info-number">
                  02
                </div>

                <h4>
                  Programmation procédurale
                </h4>

                <p>
                  Comprendre que le C permet de décrire un programme
                  sous forme d'instructions exécutées suivant un
                  ordre précis.
                </p>
              </article>

              <article className="lesson-info-card">
                <div className="lesson-info-number">
                  03
                </div>

                <h4>
                  Structure d'un programme C
                </h4>

                <p>
                  Identifier les éléments essentiels d'un programme :
                  directives, fonction main, instructions et valeur
                  de retour.
                </p>
              </article>

              <article className="lesson-info-card">
                <div className="lesson-info-number">
                  04
                </div>

                <h4>
                  Lire sans compiler
                </h4>

                <p>
                  Commencer à déterminer le comportement d'un
                  programme uniquement en lisant les instructions
                  dans leur ordre d'exécution.
                </p>
              </article>
            </div>
          </section>

          <section className="lesson-section">
            <div className="lesson-section-heading">
              <p className="lesson-section-label">
                REPÈRE HISTORIQUE
              </p>

              <h3>
                Quelques dates à connaître
              </h3>
            </div>

            <div className="lesson-line-list">
              <article className="lesson-line-card">
                <div className="lesson-line-symbol">
                  01
                </div>

                <div>
                  <strong>
                    1972 — naissance du C
                  </strong>

                  <p>
                    Le langage C est développé aux Bell Labs,
                    notamment par Dennis Ritchie, dans le contexte
                    du développement du système UNIX.
                  </p>
                </div>
              </article>

              <article className="lesson-line-card">
                <div className="lesson-line-symbol">
                  02
                </div>

                <div>
                  <strong>
                    Développement autour d'UNIX
                  </strong>

                  <p>
                    Le langage est notamment utilisé pour écrire une
                    grande partie du système UNIX et pour faciliter
                    la programmation de logiciels système.
                  </p>
                </div>
              </article>

              <article className="lesson-line-card">
                <div className="lesson-line-symbol">
                  03
                </div>

                <div>
                  <strong>
                    1978 — K&amp;R
                  </strong>

                  <p>
                    La publication de l'ouvrage de Brian Kernighan
                    et Dennis Ritchie contribue largement à la
                    diffusion et à la compréhension du langage C.
                  </p>
                </div>
              </article>

              <article className="lesson-line-card">
                <div className="lesson-line-symbol">
                  04
                </div>

                <div>
                  <strong>
                    1989–1990 — standardisation
                  </strong>

                  <p>
                    Le langage fait ensuite l'objet d'un processus
                    de standardisation avec l'ANSI puis l'ISO.
                  </p>
                </div>
              </article>
            </div>
          </section>

          <section className="lesson-section">
            <div className="lesson-section-heading">
              <p className="lesson-section-label">
                NOTIONS DE LA LEÇON
              </p>

              <h3>
                Les quatre idées à retenir
              </h3>
            </div>

            <div className="lesson-card-grid">
              {lessonData.topics.map((topic, index) => (
                <article
                  className="lesson-info-card"
                  key={topic}
                >
                  <div className="lesson-info-number">
                    {String(index + 1).padStart(2, '0')}
                  </div>

                  <h4>
                    {topic}
                  </h4>

                  <p>
                    Cette notion sera reprise et approfondie
                    dans le parcours de formation.
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section className="lesson-note">
            <div className="lesson-note-icon">
              💡
            </div>

            <div>
              <strong>
                Règle C-Mastery
              </strong>

              <p>
                Comprendre d'abord. Mémoriser ensuite. Le but est
                de pouvoir reconnaître une construction C sur une
                feuille et d'expliquer son rôle sans dépendre d'un
                compilateur.
              </p>
            </div>
          </section>
        </div>
      )}

      {/* =====================================================
          ÉTAPE 2 — STRUCTURE
          ===================================================== */}
      {currentStep === 1 && (
        <div className="lesson-content">
          <section className="lesson-section">
            <p className="lesson-section-label">
              PREMIÈRE STRUCTURE
            </p>

            <h3>
              Un programme C possède une organisation précise.
            </h3>

            <p className="lesson-introduction">
              Voici un programme minimal. Lis-le de haut en bas
              avant de chercher à mémoriser chaque ligne.
            </p>

            <div className="lesson-code-block">
              <div className="lesson-code-header">
                <span>
                  programme.c
                </span>

                <span>
                  C
                </span>
              </div>

              <pre>
                <code>{`#include <stdio.h>

int main() {

    printf("Bonjour la classe");

    return 0;

}`}</code>
              </pre>
            </div>
          </section>

          <section className="lesson-section">
            <div className="lesson-section-heading">
              <p className="lesson-section-label">
                COMPRENDRE CHAQUE PARTIE
              </p>

              <h3>
                Une ligne = un rôle
              </h3>
            </div>

            <div className="lesson-line-list">
              <article className="lesson-line-card">
                <div className="lesson-line-symbol">
                  1
                </div>

                <div>
                  <code>
                    #include &lt;stdio.h&gt;
                  </code>

                  <p>
                    Cette directive permet d'utiliser les
                    fonctionnalités déclarées dans la bibliothèque
                    standard d'entrée-sortie, notamment
                    <code> printf</code>.
                  </p>
                </div>
              </article>

              <article className="lesson-line-card">
                <div className="lesson-line-symbol">
                  2
                </div>

                <div>
                  <code>
                    int main()
                  </code>

                  <p>
                    <code>main</code> correspond au point d'entrée
                    principal du programme. C'est à partir de cette
                    fonction que l'exécution principale du programme
                    commence.
                  </p>
                </div>
              </article>

              <article className="lesson-line-card">
                <div className="lesson-line-symbol">
                  3
                </div>

                <div>
                  <code>{`{ ... }`}</code>

                  <p>
                    Les accolades délimitent le bloc d'instructions
                    associé à la fonction <code>main</code>.
                  </p>
                </div>
              </article>

              <article className="lesson-line-card">
                <div className="lesson-line-symbol">
                  4
                </div>

                <div>
                  <code>
                    printf("Bonjour la classe");
                  </code>

                  <p>
                    Cette instruction demande d'afficher le texte
                    placé entre les guillemets.
                  </p>
                </div>
              </article>

              <article className="lesson-line-card">
                <div className="lesson-line-symbol">
                  5
                </div>

                <div>
                  <code>
                    return 0;
                  </code>

                  <p>
                    La fonction <code>main</code> se termine ici avec
                    une valeur de retour de <code>0</code>.
                  </p>
                </div>
              </article>
            </div>
          </section>

          <section className="lesson-section">
            <div className="lesson-section-heading">
              <p className="lesson-section-label">
                RÉFLEXE DE LECTURE
              </p>

              <h3>
                Reconnaître rapidement les éléments du programme
              </h3>
            </div>

            <div className="lesson-card-grid">
              <article className="lesson-info-card">
                <div className="lesson-info-number">
                  01
                </div>

                <h4>
                  Bibliothèque
                </h4>

                <p>
                  Cherche les directives <code>#include</code> au
                  début du programme.
                </p>
              </article>

              <article className="lesson-info-card">
                <div className="lesson-info-number">
                  02
                </div>

                <h4>
                  Point d'entrée
                </h4>

                <p>
                  Cherche la fonction <code>main()</code>.
                </p>
              </article>

              <article className="lesson-info-card">
                <div className="lesson-info-number">
                  03
                </div>

                <h4>
                  Instructions
                </h4>

                <p>
                  Observe les instructions placées à l'intérieur
                  des accolades.
                </p>
              </article>

              <article className="lesson-info-card">
                <div className="lesson-info-number">
                  04
                </div>

                <h4>
                  Fin de programme
                </h4>

                <p>
                  Repère <code>return 0;</code> dans ce type de
                  programme.
                </p>
              </article>
            </div>
          </section>

          <section className="lesson-note">
            <div className="lesson-note-icon">
              ⚠️
            </div>

            <div>
              <strong>
                Attention pour les devoirs
              </strong>

              <p>
                En C, les symboles comptent : parenthèses, accolades,
                guillemets et point-virgule doivent être écrits
                correctement. Une petite erreur de syntaxe peut
                empêcher le programme d'être correctement interprété.
              </p>
            </div>
          </section>
        </div>
      )}

      {/* =====================================================
          ÉTAPE 3 — LECTURE
          ===================================================== */}
      {currentStep === 2 && (
        <div className="lesson-content">
          <section className="lesson-hero-card compact">
            <div className="lesson-hero-icon">
              🧠
            </div>

            <div>
              <p className="lesson-section-label">
                RAISONNEMENT
              </p>

              <h3>
                En devoir, tu dois apprendre à exécuter le code
                dans ta tête.
              </h3>

              <p>
                Notre entraînement repose sur une compétence
                essentielle : lire les instructions dans l'ordre et
                prévoir ce qu'elles produisent avant toute
                compilation.
              </p>
            </div>
          </section>

          <section className="lesson-section">
            <div className="lesson-section-heading">
              <p className="lesson-section-label">
                EXEMPLE
              </p>

              <h3>
                Lis ce programme avant de penser à la réponse.
              </h3>
            </div>

            <div className="lesson-code-block">
              <div className="lesson-code-header">
                <span>
                  lecture.c
                </span>

                <span>
                  À LIRE
                </span>
              </div>

              <pre>
                <code>{`#include <stdio.h>

int main() {

    printf("Bonjour la classe");

    return 0;

}`}</code>
              </pre>
            </div>
          </section>

          <section className="lesson-section">
            <div className="lesson-question-card">
              <span className="lesson-question-number">
                01
              </span>

              <h4>
                Première question à se poser :
              </h4>

              <p>
                Quel élément de ce programme produit réellement
                un affichage à l'écran ?
              </p>

              <div className="lesson-answer-explanation">
                <strong>
                  Réponse :
                </strong>

                <p>
                  C'est l'instruction{' '}
                  <code>
                    printf("Bonjour la classe");
                  </code>
                  . Les autres lignes servent à construire ou à
                  terminer correctement le programme.
                </p>
              </div>
            </div>

            <div className="lesson-question-card">
              <span className="lesson-question-number">
                02
              </span>

              <h4>
                Deuxième question :
              </h4>

              <p>
                Quel est exactement le texte affiché ?
              </p>

              <div className="lesson-output">
                Bonjour la classe
              </div>
            </div>
          </section>

          <section className="lesson-section">
            <div className="lesson-section-heading">
              <p className="lesson-section-label">
                MÉTHODE SUR PAPIER
              </p>

              <h3>
                Une procédure simple pour analyser un programme
              </h3>
            </div>

            <div className="lesson-line-list">
              <article className="lesson-line-card">
                <div className="lesson-line-symbol">
                  1
                </div>

                <div>
                  <strong>
                    Commencer au début
                  </strong>

                  <p>
                    Parcours le programme de haut en bas.
                    Ne saute pas directement à la dernière ligne.
                  </p>
                </div>
              </article>

              <article className="lesson-line-card">
                <div className="lesson-line-symbol">
                  2
                </div>

                <div>
                  <strong>
                    Identifier les éléments importants
                  </strong>

                  <p>
                    Repère les variables, les conditions,
                    les boucles, les fonctions et les affichages
                    lorsqu'ils apparaîtront dans les prochaines
                    leçons.
                  </p>
                </div>
              </article>

              <article className="lesson-line-card">
                <div className="lesson-line-symbol">
                  3
                </div>

                <div>
                  <strong>
                    Respecter l'ordre d'exécution
                  </strong>

                  <p>
                    Une instruction doit être analysée avant de
                    passer à la suivante.
                  </p>
                </div>
              </article>

              <article className="lesson-line-card">
                <div className="lesson-line-symbol">
                  4
                </div>

                <div>
                  <strong>
                    Écrire le résultat attendu
                  </strong>

                  <p>
                    Lorsque le programme contient un affichage,
                    détermine précisément ce qui apparaît à l'écran.
                  </p>
                </div>
              </article>
            </div>
          </section>

          <section className="lesson-note">
            <div className="lesson-note-icon">
              ✍️
            </div>

            <div>
              <strong>
                Technique pour la feuille
              </strong>

              <p>
                Avant de répondre, demande-toi toujours :
                « Quelle est la prochaine instruction exécutée ? »
                Cette question devient particulièrement importante
                dès que nous commencerons les conditions et les
                boucles.
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
              À toi de raisonner sans compiler.
            </h3>

            <p className="lesson-introduction">
              Les deux questions ci-dessous reprennent directement
              les premières notions du support. Réponds d'abord
              par toi-même. La correction n'apparaît qu'après
              ta validation.
            </p>
          </section>

          <section className="lesson-exam-card">
            <div className="lesson-exam-header">
              <span>
                EXERCICE 1
              </span>

              <strong>
                1 point
              </strong>
            </div>

            <p className="lesson-section-label">
              QUESTION DE LECTURE
            </p>

            <pre className="lesson-small-code">
              <code>{`#include <stdio.h>

int main() {

    printf("Bonjour la classe");

    return 0;

}`}</code>
            </pre>

            <h4>
              Que va afficher ce programme ?
            </h4>

            <div className="quiz-options">
              <button
                type="button"
                className={`quiz-option ${
                  answers.output === 'bonjour'
                    ? 'selected'
                    : ''
                } ${
                  submitted &&
                  answers.output === 'bonjour'
                    ? 'correct'
                    : ''
                }`}
                onClick={() =>
                  chooseAnswer('output', 'bonjour')
                }
                disabled={submitted}
              >
                <span className="quiz-letter">
                  A
                </span>

                <span>
                  Bonjour la classe
                </span>
              </button>

              <button
                type="button"
                className={`quiz-option ${
                  answers.output === 'main'
                    ? 'selected'
                    : ''
                }`}
                onClick={() =>
                  chooseAnswer('output', 'main')
                }
                disabled={submitted}
              >
                <span className="quiz-letter">
                  B
                </span>

                <span>
                  main
                </span>
              </button>

              <button
                type="button"
                className={`quiz-option ${
                  answers.output === 'nothing'
                    ? 'selected'
                    : ''
                }`}
                onClick={() =>
                  chooseAnswer('output', 'nothing')
                }
                disabled={submitted}
              >
                <span className="quiz-letter">
                  C
                </span>

                <span>
                  Rien
                </span>
              </button>

              <button
                type="button"
                className={`quiz-option ${
                  answers.output === 'error'
                    ? 'selected'
                    : ''
                }`}
                onClick={() =>
                  chooseAnswer('output', 'error')
                }
                disabled={submitted}
              >
                <span className="quiz-letter">
                  D
                </span>

                <span>
                  Une erreur
                </span>
              </button>
            </div>

            {submitted && (
              <div
                className={
                  answers.output === 'bonjour'
                    ? 'quiz-feedback correct'
                    : 'quiz-feedback incorrect'
                }
              >
                {answers.output === 'bonjour'
                  ? '✓ Correct. printf affiche le texte placé entre les guillemets.'
                  : '✗ Incorrect. Relis la ligne printf et cherche l’instruction qui réalise l’affichage.'}
              </div>
            )}
          </section>

          <section className="lesson-exam-card">
            <div className="lesson-exam-header">
              <span>
                EXERCICE 2
              </span>

              <strong>
                1 point
              </strong>
            </div>

            <p className="lesson-section-label">
              QUESTION DE COURS
            </p>

            <h4>
              Quel est le rôle principal de main() ?
            </h4>

            <div className="quiz-options">
              <button
                type="button"
                className={`quiz-option ${
                  answers.main === 'variable'
                    ? 'selected'
                    : ''
                }`}
                onClick={() =>
                  chooseAnswer('main', 'variable')
                }
                disabled={submitted}
              >
                <span className="quiz-letter">
                  A
                </span>

                <span>
                  Déclarer automatiquement toutes les variables
                </span>
              </button>

              <button
                type="button"
                className={`quiz-option ${
                  answers.main === 'entree'
                    ? 'selected'
                    : ''
                } ${
                  submitted &&
                  answers.main === 'entree'
                    ? 'correct'
                    : ''
                }`}
                onClick={() =>
                  chooseAnswer('main', 'entree')
                }
                disabled={submitted}
              >
                <span className="quiz-letter">
                  B
                </span>

                <span>
                  Servir de point d'entrée principal du programme
                </span>
              </button>

              <button
                type="button"
                className={`quiz-option ${
                  answers.main === 'affichage'
                    ? 'selected'
                    : ''
                }`}
                onClick={() =>
                  chooseAnswer('main', 'affichage')
                }
                disabled={submitted}
              >
                <span className="quiz-letter">
                  C
                </span>

                <span>
                  Afficher automatiquement du texte
                </span>
              </button>

              <button
                type="button"
                className={`quiz-option ${
                  answers.main === 'compilation'
                    ? 'selected'
                    : ''
                }`}
                onClick={() =>
                  chooseAnswer('main', 'compilation')
                }
                disabled={submitted}
              >
                <span className="quiz-letter">
                  D
                </span>

                <span>
                  Remplacer le compilateur
                </span>
              </button>
            </div>

            {submitted && (
              <div
                className={
                  answers.main === 'entree'
                    ? 'quiz-feedback correct'
                    : 'quiz-feedback incorrect'
                }
              >
                {answers.main === 'entree'
                  ? '✓ Correct. main() correspond au point d’entrée principal du programme.'
                  : '✗ Incorrect. Retenons ici que main() correspond au point d’entrée principal du programme.'}
              </div>
            )}
          </section>

          {!submitted ? (
            <button
              type="button"
              className="lesson-primary-button"
              disabled={!answers.output || !answers.main}
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
                {score}/2
              </div>

              <div>
                <strong>
                  {score === 2
                    ? 'Excellent travail.'
                    : 'Presque. On peut encore renforcer cette notion.'}
                </strong>

                <p>
                  {score === 2
                    ? 'Tu peux maintenant passer à la validation de la leçon.'
                    : 'Relis les explications puis refais l’exercice avant de continuer.'}
                </p>
              </div>

              {score < 2 && (
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
              {alreadyCompleted || score === 2
                ? '✓'
                : '🎯'}
            </div>

            <p className="lesson-section-label">
              VALIDATION DE LA LEÇON
            </p>

            <h3>
              {alreadyCompleted || score === 2
                ? 'Leçon maîtrisée.'
                : 'Tu es arrivé à la fin de la leçon.'}
            </h3>

            <p>
              {alreadyCompleted || score === 2
                ? 'Tu as validé les premières notions du langage C. La suite pourra maintenant s’appuyer sur ces bases.'
                : 'Pour valider cette première leçon, reprends les exercices et obtiens 2/2.'}
            </p>

            <div className="lesson-summary">
              <div>
                <span>
                  Notion
                </span>

                <strong>
                  Historique et introduction au C
                </strong>
              </div>

              <div>
                <span>
                  Compétence
                </span>

                <strong>
                  Lire un programme C simple
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

            {alreadyCompleted || score === 2 ? (
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
          NAVIGATION DE LA LEÇON
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

        {currentStep < lessonSteps.length - 1 ? (
          <button
            type="button"
            className="lesson-primary-button"
            onClick={goToNextStep}
            disabled={
              currentStep === 3 &&
              score !== 2 &&
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

export default LessonPage