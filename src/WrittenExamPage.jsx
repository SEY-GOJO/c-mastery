import { useMemo, useState } from 'react'
import { drawFreshQuestions } from './data/questionSelection'
import { examSubjects } from './data/examSubjects'

import './WrittenExamPage.css'

const EXAM_HISTORY_KEY = 'c-mastery-seen-exam-subjects'

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

export default function WrittenExamPage({ onBack, onPractice }) {
  const [subjectSelection, setSubjectSelection] = useState(() =>
    drawFreshQuestions(examSubjects, readExamHistory(), 1),
  )
  const [started, setStarted] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [answers, setAnswers] = useState({})
  const [checkedCriteria, setCheckedCriteria] = useState({})

  const currentSubject = subjectSelection.questions[0] || examSubjects[0]
  const examExercises = currentSubject.exercises
  const totalPoints = examExercises.reduce(
    (sum, exercise) => sum + exercise.criteria.reduce((points, item) => points + item.points, 0),
    0,
  )
  const passingScore = Math.ceil(totalPoints * 0.75)
  const score = useMemo(
    () => examExercises.reduce(
      (sum, exercise) => sum + exercise.criteria.reduce(
        (points, item) => points + (checkedCriteria[`${exercise.id}:${item.id}`] ? item.points : 0),
        0,
      ),
      0,
    ),
    [checkedCriteria, examExercises],
  )
  const allAnswered = examExercises.every((exercise) => answers[exercise.id]?.trim())

  const startExam = () => {
    saveExamHistory(subjectSelection.seenIds)
    setAnswers({})
    setCheckedCriteria({})
    setSubmitted(false)
    setStarted(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const startNextExam = () => {
    const nextSubject = drawFreshQuestions(examSubjects, subjectSelection.seenIds, 1)
    setSubjectSelection(nextSubject)
    saveExamHistory(nextSubject.seenIds)
    setAnswers({})
    setCheckedCriteria({})
    setSubmitted(false)
    setStarted(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const submitExam = (event) => {
    event.preventDefault()
    if (!allAnswered) return
    setSubmitted(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const toggleCriterion = (exerciseId, criterionId) => {
    const key = `${exerciseId}:${criterionId}`
    setCheckedCriteria((current) => ({ ...current, [key]: !current[key] }))
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
              <p className="hero-label">SUJET BLANC · ALGORITHMIQUE ET C</p>
              <h3>{currentSubject.title}</h3>
              <p className="hero-text">Lis les consignes, rédige tes solutions, puis compare-les au corrigé. Ce sujet comporte trois exercices. Tu peux écrire un algorithme en français structuré ou directement un programme C.</p>
              <button type="button" className="primary-button" onClick={startExam}>Commencer le sujet <span>→</span></button>
            </div>
            <div className="progress-box"><div className="progress-circle"><span>{totalPoints}</span></div><p>Points · seuil {passingScore}/{totalPoints}</p></div>
          </section>
          <section className="written-exam-overview">
            <p className="section-label">AU PROGRAMME</p>
            <h3>Sujet tiré au sort · trois exercices à rédiger</h3>
            <ol>{examExercises.map((exercise) => <li key={exercise.id}>{exercise.title}</li>)}</ol>
            <p>La correction est révélée après la remise. Le barème permet ensuite de t’auto-évaluer sur 8 points.</p>
          </section>
        </>
      ) : (
        <form onSubmit={submitExam}>
          {submitted && (
            <section className="written-exam-score" aria-live="polite">
              <div><p className="section-label">AUTO-CORRECTION</p><h3>{score >= passingScore ? 'Seuil atteint' : 'À retravailler'}</h3><p>Compare chaque réponse au corrigé puis coche les critères réellement présents dans ta solution.</p></div>
              <strong>{score}/{totalPoints}<span> · seuil {passingScore}/{totalPoints}</span></strong>
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
                Ta réponse · algorithme ou programme C
              </label>
              <textarea
                id={`answer-${exercise.id}`}
                value={answers[exercise.id] || ''}
                onChange={(event) => setAnswers((current) => ({ ...current, [exercise.id]: event.target.value }))}
                placeholder={'Écris les étapes de ton algorithme ou ton code ici…'}
                rows={9}
                spellCheck="false"
                disabled={submitted}
                required
              />
              {submitted && (
                <>
                  <details className="written-exam-correction">
                    <summary>Afficher un algorithme possible</summary>
                    <pre><code>{exercise.algorithm}</code></pre>
                  </details>
                  <details className="written-exam-correction">
                    <summary>Afficher une solution possible en C</summary>
                    <pre><code>{exercise.code}</code></pre>
                  </details>
                  <fieldset className="written-exam-rubric">
                    <legend>Barème de l’exercice</legend>
                    {exercise.criteria.map((criterion) => {
                      const key = `${exercise.id}:${criterion.id}`
                      return (
                        <label key={key}>
                          <input type="checkbox" checked={Boolean(checkedCriteria[key])} onChange={() => toggleCriterion(exercise.id, criterion.id)} />
                          <span>{criterion.label}</span>
                          <strong>{criterion.points} pt</strong>
                        </label>
                      )
                    })}
                  </fieldset>
                </>
              )}
            </article>
          ))}

          {!submitted ? (
            <div className="written-exam-actions">
              <p>La correction ne s’affichera qu’après la remise de tes trois réponses.</p>
              <button type="submit" className="lesson-primary-button" disabled={!allAnswered}>Remettre le sujet <span>→</span></button>
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
