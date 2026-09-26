import { useState } from 'react'
import { drawFreshQuestions } from './data/questionSelection'
import { examSubjects } from './data/examSubjects'
import { getExamReferenceTests } from './data/examAnswerReview'
import { checkExpectedOutput, runCExamInBrowser } from './data/runCExamInBrowser'

import './WrittenExamPage.css'

const EXAM_HISTORY_KEY = 'c-mastery-seen-exam-subjects'
const EXAM_SCORES_KEY = 'c-mastery-exam-scores'

const readExamHistory = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(EXAM_HISTORY_KEY) || '[]')
    return Array.isArray(saved) ? saved.filter((id) => typeof id === 'string') : []
  } catch {
    return []
  }
}

const saveExamHistory = (history) => {
  try {
    localStorage.setItem(EXAM_HISTORY_KEY, JSON.stringify(history))
  } catch {
    // L’examen reste disponible si le navigateur bloque le stockage.
  }
}

const readExamScores = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(EXAM_SCORES_KEY) || '[]')
    return Array.isArray(saved) ? saved.filter((item) => Number.isFinite(item?.percentage)) : []
  } catch {
    return []
  }
}

const saveExamScores = (scores) => {
  try {
    localStorage.setItem(EXAM_SCORES_KEY, JSON.stringify(scores))
  } catch {
    // La note reste affichée pendant la session si le stockage est indisponible.
  }
}

const calculateScore = (exercises, results) => exercises.reduce((sum, exercise) => {
  const result = results[exercise.id]
  if (!result || result.compileError || result.runtimeError || result.skipped) return sum
  const points = exercise.criteria.reduce((total, item) => total + item.points, 0)
  const passed = result.tests.filter((test) => checkExpectedOutput(test.expectedOutput, test.actualOutput)).length
  return sum + (result.tests.length ? (points * passed) / result.tests.length : 0)
}, 0)

function ExecutionReview({ exercise, result }) {
  const maxPoints = exercise.criteria.reduce((total, item) => total + item.points, 0)
  if (!result) return <section className="written-exam-review has-errors"><h4>Résultat indisponible</h4><p>Relance la correction de cet exercice.</p></section>
  if (result.skipped) return <section className="written-exam-review has-errors"><h4>Exercice sans réponse</h4><strong className="written-exam-exercise-grade">Note : 0/{maxPoints}</strong><p>Écris un programme C puis soumets le sujet pour obtenir sa correction.</p></section>
  if (result.compileError) return <section className="written-exam-review has-errors"><h4>Le programme ne compile pas</h4><strong className="written-exam-exercise-grade">Note : 0/{maxPoints}</strong><pre className="written-exam-error"><code>{result.compileError}</code></pre></section>
  if (result.runtimeError) return <section className="written-exam-review has-errors"><h4>Erreur pendant l’exécution</h4><strong className="written-exam-exercise-grade">Note : 0/{maxPoints}</strong><p>{result.runtimeError}</p></section>
  const passed = result.tests.filter((test) => checkExpectedOutput(test.expectedOutput, test.actualOutput)).length
  const points = result.tests.length ? Math.round((maxPoints * passed) / result.tests.length) : 0
  return <section className={`written-exam-review ${passed === result.tests.length ? 'is-complete' : 'has-errors'}`} aria-live="polite">
    <h4>{passed === result.tests.length ? '✓ Tous les cas d’essai sont réussis' : 'Certains résultats sont à corriger'}</h4>
    <strong className="written-exam-exercise-grade">Note de l’exercice : {points}/{maxPoints} · {passed}/{result.tests.length} cas réussis</strong>
    <p>Le compilateur a exécuté le programme avec les entrées de test affichées ci-dessous.</p>
  </section>
}

export default function WrittenExamPage({ onBack, onPractice }) {
  const [subjectSelection, setSubjectSelection] = useState(() =>
    drawFreshQuestions(examSubjects, readExamHistory(), 1),
  )
  const [started, setStarted] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [answers, setAnswers] = useState({})
  const [attempts, setAttempts] = useState(readExamScores)
  const [executionResults, setExecutionResults] = useState({})
  const [isRunningExam, setIsRunningExam] = useState(false)
  const [executionStatus, setExecutionStatus] = useState('')
  const [executionError, setExecutionError] = useState('')

  const currentSubject = subjectSelection.questions[0] || examSubjects[0]
  const examExercises = currentSubject.exercises
  const totalPoints = examExercises.reduce(
    (sum, exercise) => sum + exercise.criteria.reduce((points, item) => points + item.points, 0),
    0,
  )
  const passingScore = Math.ceil(totalPoints * 0.75)
  const score = Math.round(calculateScore(examExercises, executionResults))
  const percentage = Math.round((score / totalPoints) * 100)
  const previousAttempt = attempts.length > 1 ? attempts[attempts.length - 2] : null
  const latestAttempt = attempts.length ? attempts[attempts.length - 1] : null
  const comparisonPercentage = submitted ? percentage : latestAttempt?.percentage
  const improvement = previousAttempt && comparisonPercentage !== undefined
    ? comparisonPercentage - previousAttempt.percentage
    : null

  const startExam = () => {
    saveExamHistory(subjectSelection.seenIds)
    setAnswers({})
    setExecutionResults({})
    setExecutionStatus('')
    setExecutionError('')
    setSubmitted(false)
    setStarted(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const startNextExam = () => {
    const nextSubject = drawFreshQuestions(examSubjects, subjectSelection.seenIds, 1)
    setSubjectSelection(nextSubject)
    saveExamHistory(nextSubject.seenIds)
    setAnswers({})
    setExecutionResults({})
    setExecutionStatus('')
    setExecutionError('')
    setSubmitted(false)
    setStarted(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const submitExam = async (event) => {
    event.preventDefault()
    if (isRunningExam) return
    setIsRunningExam(true)
    setExecutionError('')
    setExecutionResults({})
    try {
      const results = await runCExamInBrowser(
        examExercises.map((exercise, index) => ({
          exerciseId: exercise.id,
          exerciseNumber: index + 1,
          code: answers[exercise.id] || '',
          testCases: getExamReferenceTests(exercise.id),
        })),
        {
          onProgress: setExecutionStatus,
          onExerciseResult: (result) => setExecutionResults((current) => ({ ...current, [result.exerciseId]: result })),
        },
      )
      const resultsById = Object.fromEntries(results.map((result) => [result.exerciseId, result]))
      setExecutionResults(resultsById)
      const finalScore = Math.round(calculateScore(examExercises, resultsById))
      const finalPercentage = Math.round((finalScore / totalPoints) * 100)
      const attempt = {
        subjectId: currentSubject.id,
        subjectTitle: currentSubject.title,
        score: finalScore,
        totalPoints,
        percentage: finalPercentage,
        completedAt: new Date().toISOString(),
      }
      const updatedAttempts = [...attempts, attempt].slice(-50)
      setAttempts(updatedAttempts)
      saveExamScores(updatedAttempts)
      setSubmitted(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (error) {
      setExecutionError(error.message || 'Une erreur est survenue pendant la correction.')
    } finally {
      setIsRunningExam(false)
      setExecutionStatus('')
    }
  }

  return (
    <section className="written-exam">
      <header className="topbar">
        <div>
          <p className="section-label">MODE EXAMEN</p>
          <h2>{submitted ? `Correction · ${currentSubject.title}` : 'Sujet de programmation en C'}</h2>
        </div>
        <button type="button" className="lesson-secondary-button" onClick={onBack}>Retour à l’accueil</button>
      </header>

      {!started ? (
        <>
          <section className="hero written-exam-hero">
            <div className="hero-content">
              <p className="hero-label">SUJET BLANC · PROGRAMMATION EN LANGAGE C</p>
              <h3>{currentSubject.title}</h3>
              <p className="hero-text">Lis les consignes et rédige un programme en langage C pour chaque exercice. Après la remise, tes programmes sont compilés et exécutés dans le navigateur avec des entrées de test ; la note dépend des résultats obtenus.</p>
              <button type="button" className="primary-button" onClick={startExam}>Commencer le sujet <span>→</span></button>
            </div>
            <div className="progress-box"><div className="progress-circle"><span>{totalPoints}</span></div><p>Points · seuil {passingScore}/{totalPoints}</p></div>
          </section>
          {latestAttempt && (
            <section className="written-exam-score-trend" aria-live="polite">
              <div>
                <p className="section-label">SUIVI DE TES RÉSULTATS</p>
                <h3>Dernière note : {latestAttempt.score}/{latestAttempt.totalPoints} ({latestAttempt.percentage} %)</h3>
                <p>{attempts.length} examen(s) enregistré(s) sur cet appareil.</p>
              </div>
              {attempts.length > 1 && (
                <strong className={improvement >= 0 ? 'trend-up' : 'trend-down'}>
                  {improvement > 0 ? `+${improvement}` : improvement} % depuis le dernier examen
                </strong>
              )}
              <div className="written-exam-history-bars" aria-label="Évolution des notes récentes">
                {attempts.slice(-8).map((attempt, index) => (
                  <span key={`${attempt.completedAt}-${index}`} title={`${attempt.subjectTitle} : ${attempt.percentage} %`}>
                    <i style={{ height: `${Math.max(attempt.percentage, 5)}%` }} />
                    <small>{index + 1}</small>
                  </span>
                ))}
              </div>
            </section>
          )}
          <section className="written-exam-overview">
            <p className="section-label">AU PROGRAMME</p>
            <h3>Sujet tiré au sort · trois exercices à rédiger</h3>
            <ol>{examExercises.map((exercise) => <li key={exercise.id}>{exercise.title}</li>)}</ol>
            <p>La note est calculée selon les sorties obtenues à l’exécution des programmes. Tes résultats sont conservés dans ce navigateur pour suivre ton évolution.</p>
          </section>
        </>
      ) : (
        <form onSubmit={submitExam}>
          {submitted && (
            <section className="written-exam-score" aria-live="polite">
              <div><p className="section-label">NOTE DE L’EXAMEN</p><h3>{score >= passingScore ? 'Seuil atteint' : 'À retravailler'}</h3><p>Note calculée à partir de la compilation et de l’exécution de tes programmes C sur les cas d’essai.</p></div>
              <strong>{score}/{totalPoints}<span> · seuil {passingScore}/{totalPoints}</span></strong>
              {improvement !== null && <p className={`written-exam-improvement ${improvement >= 0 ? 'trend-up' : 'trend-down'}`}>{improvement > 0 ? `+${improvement}` : improvement} % par rapport à ton examen précédent</p>}
            </section>
          )}

          {examExercises.map((exercise, index) => (
            <article className="written-exam-exercise" key={exercise.id}>
              <div className="written-exam-exercise-heading">
                <span>EXERCICE N°{index + 1}</span>
                <h3>{exercise.title}</h3>
              </div>
              <p className="written-exam-statement">{exercise.statement}</p>
              <label className="written-exam-answer-label" htmlFor={`answer-${exercise.id}`}>
                Ton programme en langage C
              </label>
              <textarea
                id={`answer-${exercise.id}`}
                value={answers[exercise.id] || ''}
                onChange={(event) => setAnswers((current) => ({ ...current, [exercise.id]: event.target.value }))}
                placeholder={'Écris ton programme C ici…'}
                rows={9}
                spellCheck="false"
                disabled={submitted || isRunningExam}
              />
              {submitted && (
                <>
                  <ExecutionReview exercise={exercise} result={executionResults[exercise.id]} />
                  {getExamReferenceTests(exercise.id).length > 0 && (
                    <details className="written-exam-test-cases">
                      <summary>Résultats d’exécution des cas d’essai</summary>
                      <p>Le compilateur C a exécuté ton programme pour chaque entrée. Les valeurs obtenues sont comparées aux résultats attendus.</p>
                      <div className="written-exam-test-list">
                        {(executionResults[exercise.id]?.tests || []).map((testCase, testIndex) => {
                          const passed = checkExpectedOutput(testCase.expectedOutput, testCase.actualOutput)
                          return <article className={`written-exam-test-result ${passed ? 'is-pass' : 'is-fail'}`} key={`${exercise.id}-test-${testIndex}`}>
                            <span>CAS {testIndex + 1} · {passed ? 'RÉUSSI' : 'ÉCHEC'}</span>
                            <p>{testCase.why}</p>
                            <dl>
                              <div><dt>Entrée</dt><dd><code>{testCase.input}</code></dd></div>
                              <div><dt>Attendu</dt><dd><code>{testCase.expectedOutput}</code></dd></div>
                              <div><dt>Obtenu</dt><dd><code>{testCase.actualOutput || '(aucune sortie)'}</code></dd></div>
                            </dl>
                          </article>
                        })}
                      </div>
                    </details>
                  )}
                  <details className="written-exam-correction">
                    <summary>Afficher une solution possible en C</summary>
                    <pre><code>{exercise.code}</code></pre>
                    {exercise.compileNote && <p className="written-exam-compile-note">{exercise.compileNote}</p>}
                  </details>
                </>
              )}
            </article>
          ))}

          {!submitted ? (
            <div className="written-exam-actions">
              <p>La correction compile et exécute les programmes saisis. Les exercices laissés vides reçoivent zéro point.</p>
              {executionStatus && <p className="written-exam-status" role="status">{executionStatus}</p>}
              {executionError && <p className="written-exam-error-message" role="alert">{executionError}</p>}
              <button type="submit" className="lesson-primary-button" disabled={isRunningExam}>{isRunningExam ? 'Correction en cours…' : 'Corriger et remettre le sujet'} <span>→</span></button>
            </div>
          ) : (
            <div className="written-exam-actions">
              <p>{score >= passingScore ? 'Bravo, tu valides ce sujet.' : `Il te manque ${passingScore - score} point(s) pour atteindre le seuil.`}</p>
              <button type="button" className="lesson-primary-button" onClick={startNextExam}>Passer au sujet suivant <span>→</span></button>
              <button type="button" className="lesson-secondary-button" onClick={onPractice}>Travailler les exercices guidés</button>
            </div>
          )}
        </form>
      )}
    </section>
  )
}
