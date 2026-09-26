import { useEffect, useState } from 'react'

import LessonPage from './LessonPage'

import VariablesLessonPage from './VariablesLessonPage'

import OperateursLessonPage from './OperateursLessonPage'

import PrintfScanfLessonPage from './PrintfScanfLessonPage'

import DoWhileLessonPage from './DoWhileLessonPage'

import PracticePage from './PracticePage'

import { courseModules } from './data/course'
import ControlLessonPage from './ControlLessonPage'
import CompositeLessonPage from './CompositeLessonPage'
import GenericLessonPage from './GenericLessonPage'
import WrittenExamPage from './WrittenExamPage'

import './App.css'

const navigationItems = [
  {
    id: 'home',
    icon: '⌂',
    label: 'Accueil',
  },
  {
    id: 'learn',
    icon: '📚',
    label: 'Apprendre',
  },
  {
    id: 'practice',
    icon: '🧠',
    label: "S'entraîner",
  },
  {
    id: 'exam',
    icon: '📝',
    label: 'Mode devoir',
  },
  {
    id: 'progress',
    icon: '📊',
    label: 'Progression',
  },
]

/* =========================================================
   LEÇONS ACTUELLEMENT DÉVELOPPÉES
   ========================================================= */

const implementedLessonIds = courseModules.flatMap(
  (module) => module.lessons.map((lesson) => lesson.id),
)

const specialisedLessonIds = [
  'introduction-c',
  'variables-types',
  'operateurs',
  'printf-scanf',
  'do-while',
  'for',
  'if',
  'switch',
  'tableaux',
  'tableaux-2d',
  'structures',
  'enum',
]

/* =========================================================
   CLÉS LOCALSTORAGE
   ========================================================= */

const COMPLETED_LESSONS_KEY =
  'c-mastery-completed-lessons'

const SOLVED_EXERCISES_KEY =
  'c-mastery-solved-exercises'

const PREFERENCES_KEY =
  'c-mastery-preferences'

const saveToLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // L'application reste utilisable si le stockage est désactivé ou saturé.
  }
}

const removeFromLocalStorage = (...keys) => {
  try {
    keys.forEach((key) => localStorage.removeItem(key))
  } catch {
    // La progression reste réinitialisée en mémoire pour cette session.
  }
}

/* =========================================================
   APPLICATION
   ========================================================= */

function App() {
  const [activePage, setActivePage] = useState('home')

  const [activeLesson, setActiveLesson] = useState(null)

  /* =======================================================
     CHARGEMENT DES LEÇONS TERMINÉES
     ======================================================= */

  const [completedLessons, setCompletedLessons] =
    useState(() => {
      try {
        const savedProgress = localStorage.getItem(
          COMPLETED_LESSONS_KEY,
        )

        if (!savedProgress) {
          return []
        }

        const parsedProgress =
          JSON.parse(savedProgress)

        if (!Array.isArray(parsedProgress)) {
          return []
        }

        return parsedProgress.filter((lessonId) =>
          implementedLessonIds.includes(lessonId),
        )
      } catch {
        return []
      }
    })

  /* =======================================================
     CHARGEMENT DES EXERCICES TERMINÉS
     ======================================================= */

  const [solvedExercises, setSolvedExercises] =
    useState(() => {
      try {
        const savedExercises = localStorage.getItem(
          SOLVED_EXERCISES_KEY,
        )

        if (!savedExercises) {
          return []
        }

        const parsedExercises =
          JSON.parse(savedExercises)

        return Array.isArray(parsedExercises)
          ? parsedExercises
          : []
      } catch {
        return []
      }
    })

  const [preferences, setPreferences] =
    useState(() => {
      try {
        const savedPreferences = localStorage.getItem(PREFERENCES_KEY)
        const parsedPreferences = savedPreferences
          ? JSON.parse(savedPreferences)
          : null

        return {
          firstName: typeof parsedPreferences?.firstName === 'string'
            ? parsedPreferences.firstName
            : typeof parsedPreferences?.name === 'string'
              ? parsedPreferences.name
            : '',
          lastName: typeof parsedPreferences?.lastName === 'string'
            ? parsedPreferences.lastName
            : '',
          theme: parsedPreferences?.theme === 'dark'
            ? 'dark'
            : 'light',
          dailyGoal: [10, 20, 30, 45].includes(parsedPreferences?.dailyGoal)
            ? parsedPreferences.dailyGoal
            : 20,
        }
      } catch {
        return {
          firstName: '',
          lastName: '',
          theme: 'light',
          dailyGoal: 20,
        }
      }
    })

  const [profileDraft, setProfileDraft] =
    useState(() => ({
      firstName: '',
      lastName: '',
    }))

  const profileIsComplete =
    Boolean(preferences.firstName.trim()) &&
    Boolean(preferences.lastName.trim())

  const saveProfile = (event) => {
    event.preventDefault()

    const firstName = profileDraft.firstName.trim()
    const lastName = profileDraft.lastName.trim()

    if (!firstName || !lastName) {
      return
    }

    setPreferences((current) => ({
      ...current,
      firstName,
      lastName,
    }))
  }

  /* =======================================================
     SAUVEGARDE DES LEÇONS
     ======================================================= */

  useEffect(() => {
    saveToLocalStorage(COMPLETED_LESSONS_KEY, completedLessons)
  }, [completedLessons])

  /* =======================================================
     SAUVEGARDE DES EXERCICES
     ======================================================= */

  useEffect(() => {
    saveToLocalStorage(SOLVED_EXERCISES_KEY, solvedExercises)
  }, [solvedExercises])

  useEffect(() => {
    saveToLocalStorage(PREFERENCES_KEY, preferences)
  }, [preferences])

  /* =======================================================
     ÉTAT D'UNE LEÇON
     ======================================================= */

  const isLessonCompleted = (lessonId) => {
    return completedLessons.includes(lessonId)
  }

  const isLessonImplemented = (lessonId) => {
    return implementedLessonIds.includes(lessonId)
  }

  /* =======================================================
     RECHERCHE D'UN MODULE
     ======================================================= */

  const getModuleById = (moduleId) => {
    return courseModules.find(
      (module) => module.id === moduleId,
    )
  }

  /* =======================================================
     LEÇONS DÉVELOPPÉES D'UN MODULE
     ======================================================= */

  const getImplementedLessons = (module) => {
    if (!module || !Array.isArray(module.lessons)) {
      return []
    }

    return module.lessons.filter((lesson) =>
      isLessonImplemented(lesson.id),
    )
  }

  /* =======================================================
     DÉVERROUILLAGE D'UN MODULE
     Règle :

     - module sans prérequis → accessible ;
     - module avec prérequis → toutes les leçons
       développées du module prérequis doivent être
       terminées.
     ======================================================= */

  const isModuleUnlocked = (moduleId) => {
    const module = getModuleById(moduleId)

    if (!module) {
      return false
    }

    // Tous les cours sont publiés : les prérequis restent des
    // recommandations pédagogiques, sans empêcher la navigation.
    return true
  }

  /* =======================================================
     DÉVERROUILLAGE D'UNE LEÇON

     Toutes les leçons actuellement développées d'un
     module accessible sont accessibles directement.

     Le verrouillage entre les MODULES est conservé.
     ======================================================= */

  const isLessonUnlocked = (lessonId) => {
    for (const module of courseModules) {
      const lessonExists = module.lessons.some(
        (lesson) => lesson.id === lessonId,
      )

      if (!lessonExists) {
        continue
      }

      if (!isLessonImplemented(lessonId)) {
        return false
      }

      return isModuleUnlocked(module.id)
    }

    return false
  }

  /* =======================================================
     PROCHAINE LEÇON
     ======================================================= */

  const getNextLesson = () => {
    for (const module of courseModules) {
      const implementedLessons =
        getImplementedLessons(module)

      for (const lesson of implementedLessons) {
        if (
          isLessonUnlocked(lesson.id) &&
          !isLessonCompleted(lesson.id)
        ) {
          return lesson
        }
      }
    }

    return null
  }

  /* =======================================================
     NAVIGATION
     ======================================================= */

  const validPageIds = [
    ...navigationItems.map((item) => item.id),
    'settings',
  ]

  const navigateTo = (page) => {
    if (!validPageIds.includes(page)) {
      return
    }

    setActiveLesson(null)
    setActivePage(page)

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  /* =======================================================
     OUVERTURE D'UNE LEÇON
     ======================================================= */

  const openLesson = (lessonId) => {
    if (!isLessonImplemented(lessonId)) {
      return
    }

    if (!isLessonUnlocked(lessonId)) {
      return
    }

    setActiveLesson(lessonId)
    setActivePage('lesson')

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  /* =======================================================
     VALIDATION D'UNE LEÇON
     ======================================================= */

  const completeLesson = (lessonId) => {
    if (!isLessonImplemented(lessonId)) {
      return
    }

    setCompletedLessons((currentLessons) => {
      if (currentLessons.includes(lessonId)) {
        return currentLessons
      }

      return [...currentLessons, lessonId]
    })
  }

  /* =======================================================
     VALIDATION D'UN EXERCICE
     ======================================================= */

  const completeExercise = (exerciseId) => {
    if (!exerciseId) {
      return
    }

    setSolvedExercises((currentExercises) => {
      if (currentExercises.includes(exerciseId)) {
        return currentExercises
      }

      return [...currentExercises, exerciseId]
    })
  }

  /* =======================================================
     RÉINITIALISATION DE LA PROGRESSION
     ======================================================= */

  const resetProgress = () => {
    const confirmed = window.confirm(
      'Voulez-vous vraiment réinitialiser toute votre progression ? Les leçons terminées et les exercices réussis seront remis à zéro.',
    )

    if (!confirmed) {
      return
    }

    setCompletedLessons([])
    setSolvedExercises([])

    removeFromLocalStorage(
      COMPLETED_LESSONS_KEY,
      SOLVED_EXERCISES_KEY,
    )

    setActiveLesson(null)
    setActivePage('home')

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  /* =======================================================
     NAVIGATION ACTIVE
     ======================================================= */

  const activeNavigationPage =
    activePage === 'lesson'
      ? 'learn'
      : activePage

  /* =======================================================
     RENDU
     ======================================================= */

  return (
    <div className={`app theme-${preferences.theme}`}>
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">
            C
          </div>

          <div>
            <h1>
              C-Mastery
            </h1>

            <p>
              Maîtriser le langage C
            </p>
          </div>
        </div>

        <nav
          className="sidebar-nav"
          aria-label="Navigation principale"
        >
          {navigationItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`nav-item ${
                activeNavigationPage === item.id
                  ? 'active'
                  : ''
              }`}
              onClick={() =>
                navigateTo(item.id)
              }
              aria-current={
                activeNavigationPage === item.id
                  ? 'page'
                  : undefined
              }
            >
              <span className="nav-icon">
                {item.icon}
              </span>

              <span>
                {item.label}
              </span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button
            type="button"
            className={`nav-item ${
              activePage === 'settings'
                ? 'active'
                : ''
            }`}
            onClick={() =>
              navigateTo('settings')
            }
            aria-current={
              activePage === 'settings'
                ? 'page'
                : undefined
            }
          >
            <span className="nav-icon">
              ⚙
            </span>

            <span>
              Paramètres
            </span>
          </button>
        </div>
      </aside>

      <main className="main-content">
        {activePage === 'home' && (
          <HomePage
            navigateTo={navigateTo}
            openLesson={openLesson}
            getNextLesson={getNextLesson}
            isLessonUnlocked={
              isLessonUnlocked
            }
            isLessonImplemented={
              isLessonImplemented
            }
            isLessonCompleted={
              isLessonCompleted
            }
            completedLessons={
              completedLessons
            }
            solvedExercises={
              solvedExercises
            }
          />
        )}

        {activePage === 'learn' && (
          <LearnPage
            navigateTo={navigateTo}
            openLesson={openLesson}
            getNextLesson={getNextLesson}
            isModuleUnlocked={
              isModuleUnlocked
            }
            isLessonUnlocked={
              isLessonUnlocked
            }
            isLessonImplemented={
              isLessonImplemented
            }
            isLessonCompleted={
              isLessonCompleted
            }
          />
        )}

        {activePage === 'lesson' &&
          activeLesson === 'introduction-c' && (
            <LessonPage
              lessonId="introduction-c"
              onBack={() =>
                navigateTo('learn')
              }
              onComplete={
                completeLesson
              }
              alreadyCompleted={
                isLessonCompleted(
                  'introduction-c',
                )
              }
            />
          )}

        {activePage === 'lesson' &&
          activeLesson ===
            'variables-types' && (
            <VariablesLessonPage
              onBack={() =>
                navigateTo('learn')
              }
              onComplete={
                completeLesson
              }
              alreadyCompleted={
                isLessonCompleted(
                  'variables-types',
                )
              }
            />
          )}

        {activePage === 'lesson' &&
          activeLesson === 'operateurs' && (
            <OperateursLessonPage
              onBack={() =>
                navigateTo('learn')
              }
              onComplete={
                completeLesson
              }
              alreadyCompleted={
                isLessonCompleted(
                  'operateurs',
                )
              }
            />
          )}

        {activePage === 'lesson' &&
          activeLesson === 'printf-scanf' && (
            <PrintfScanfLessonPage
              onBack={() =>
                navigateTo('learn')
              }
              onComplete={
                completeLesson
              }
              alreadyCompleted={
                isLessonCompleted(
                  'printf-scanf',
                )
              }
            />
          )}

        {activePage === 'lesson' &&
          activeLesson === 'do-while' && (
            <DoWhileLessonPage
              onBack={() =>
                navigateTo('learn')
              }
              onComplete={
                completeLesson
              }
              alreadyCompleted={
                isLessonCompleted(
                  'do-while',
                )
              }
            />
          )}
          {activePage === 'lesson' &&
  ['for', 'if', 'switch'].includes(activeLesson) && (
    <ControlLessonPage
      key={activeLesson}
      lessonId={activeLesson}
      onBack={() =>
        navigateTo('learn')
      }
      onComplete={
        completeLesson
      }
      alreadyCompleted={
        isLessonCompleted(
          activeLesson,
        )
      }
    />
  )}
  {activePage === 'lesson' &&
  ['tableaux', 'tableaux-2d', 'structures', 'enum'].includes(activeLesson) && (
    <CompositeLessonPage
      key={activeLesson}
      lessonId={activeLesson}
      onBack={() => navigateTo('learn')}
      onComplete={completeLesson}
      alreadyCompleted={isLessonCompleted(activeLesson)}
    />
  )}

        {activePage === 'lesson' &&
          activeLesson &&
          !specialisedLessonIds.includes(activeLesson) && (
            <GenericLessonPage
              key={activeLesson}
              lessonId={activeLesson}
              onBack={() => navigateTo('learn')}
              onComplete={completeLesson}
              alreadyCompleted={isLessonCompleted(activeLesson)}
            />
          )}

        {activePage === 'practice' && (
          <PracticePage
            onExerciseComplete={
              completeExercise
            }
            solvedExercises={
              solvedExercises
            }
          />
        )}

        {activePage === 'exam' && (
          <WrittenExamPage
            onBack={() =>
              navigateTo('home')
            }
            onPractice={() =>
              navigateTo('practice')
            }
          />
        )}

        {activePage === 'progress' && (
          <ProgressPage
            completedLessons={
              completedLessons
            }
            solvedExercises={
              solvedExercises
            }
          />
        )}

        {activePage === 'settings' && (
          <SettingsPage
            onResetProgress={
              resetProgress
            }
            preferences={preferences}
            onPreferencesChange={setPreferences}
          />
        )}
      </main>

      {!profileIsComplete && (
        <div className="profile-onboarding" role="dialog" aria-modal="true" aria-labelledby="profile-onboarding-title">
          <form className="profile-onboarding-card" onSubmit={saveProfile}>
            <div className="profile-onboarding-icon">C</div>
            <p className="section-label">BIENVENUE DANS C-MASTERY</p>
            <h2 id="profile-onboarding-title">Créons ton profil apprenant</h2>
            <p>Indique ton prénom et ton nom pour personnaliser ton parcours. Ces données restent enregistrées uniquement sur cet appareil.</p>

            <label>
              <span>Prénom</span>
              <input
                type="text"
                autoFocus
                autoComplete="given-name"
                value={profileDraft.firstName}
                maxLength={32}
                placeholder="Ex. Amina"
                onChange={(event) => setProfileDraft((current) => ({ ...current, firstName: event.target.value }))}
              />
            </label>

            <label>
              <span>Nom</span>
              <input
                type="text"
                autoComplete="family-name"
                value={profileDraft.lastName}
                maxLength={32}
                placeholder="Ex. Diallo"
                onChange={(event) => setProfileDraft((current) => ({ ...current, lastName: event.target.value }))}
              />
            </label>

            <button type="submit" className="profile-onboarding-button" disabled={!profileDraft.firstName.trim() || !profileDraft.lastName.trim()}>
              Commencer mon parcours <span>→</span>
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

/* =========================================================
   PAGE ACCUEIL
   ========================================================= */

function HomePage({
  navigateTo,
  openLesson,
  getNextLesson,
  isLessonUnlocked,
  isLessonImplemented,
  isLessonCompleted,
  completedLessons,
  solvedExercises,
}) {
  const completedCount =
    completedLessons.length

  const solvedCount =
    solvedExercises.length

  const fundamentals =
    courseModules.find(
      (module) =>
        module.id === 'fondamentaux',
    )

  const displayedLessons =
    fundamentals?.lessons || []

  const nextLesson =
    getNextLesson()

  const nextLessonTitle = nextLesson
    ? nextLesson.title
    : 'Continuer ton entraînement'

  const nextLessonDescription =
    nextLesson
      ? `Poursuis ton parcours avec ${nextLesson.title.toLowerCase()}.`
      : "Tes leçons disponibles sont validées. Continue maintenant avec les exercices d'entraînement."

  return (
    <>
      <header className="topbar">
        <div>
          <p className="section-label">
            TON PARCOURS
          </p>

          <h2>
            Bienvenue dans C-Mastery 👋
          </h2>
        </div>

        <div className="profile">
          <div className="profile-avatar">
            C
          </div>
        </div>
      </header>

      <section className="hero">
        <div className="hero-content">
          <p className="hero-label">
            PROCHAINE ÉTAPE
          </p>

          <h3>
            {nextLessonTitle}
          </h3>

          <p className="hero-text">
            {nextLessonDescription}
          </p>

          <button
            className="primary-button"
            type="button"
            onClick={() =>
              nextLesson
                ? openLesson(
                    nextLesson.id,
                  )
                : navigateTo('practice')
            }
          >
            {nextLesson
              ? 'Continuer le cours'
              : "S'entraîner"}

            <span>
              →
            </span>
          </button>
        </div>

        <div className="progress-box">
          <div className="progress-circle">
            <span>
              {completedCount}
            </span>
          </div>

          <p>
            Leçons terminées
          </p>
        </div>
      </section>

      <section className="stats-grid">
        <article className="stat-card">
          <div className="stat-icon">
            📚
          </div>

          <div>
            <strong>
              {completedCount}
            </strong>

            <span>
              Leçons terminées
            </span>
          </div>
        </article>

        <article className="stat-card">
          <div className="stat-icon">
            ✅
          </div>

          <div>
            <strong>
              {solvedCount}
            </strong>

            <span>
              Exercices réussis
            </span>
          </div>
        </article>

        <article className="stat-card">
          <div className="stat-icon">
            🎯
          </div>

          <div>
            <strong>
              {courseModules.length}
            </strong>

            <span>
              Modules du parcours
            </span>
          </div>
        </article>
      </section>

      <section className="learning-section">
        <div className="section-heading">
          <div>
            <p className="section-label">
              PROGRAMME ENI
            </p>

            <h3>
              Fondamentaux du langage C
            </h3>
          </div>
        </div>

        <div className="module-grid">
          {displayedLessons.map(
            (lesson) => {
              const completed =
                isLessonCompleted(
                  lesson.id,
                )

              const unlocked =
                isLessonUnlocked(
                  lesson.id,
                )

              const implemented =
                isLessonImplemented(
                  lesson.id,
                )

              const disabled =
                !unlocked ||
                !implemented

              let statusText =
                'Commencer'

              if (completed) {
                statusText =
                  '✓ Terminée'
              } else if (!unlocked) {
                statusText =
                  '🔒 Verrouillée'
              } else if (!implemented) {
                statusText =
                  'Bientôt disponible'
              }

              return (
                <button
                  key={lesson.id}
                  type="button"
                  className={`module-card ${
                    disabled
                      ? 'module-card-disabled'
                      : ''
                  }`}
                  disabled={disabled}
                  onClick={() =>
                    openLesson(
                      lesson.id,
                    )
                  }
                >
                  <span className="module-number">
                    LEÇON{' '}
                    {lesson.number}
                  </span>

                  <h4>
                    {lesson.title}
                  </h4>

                  <p>
                    {lesson.topics
                      .slice(0, 2)
                      .join(' • ')}
                  </p>

                  <span
                    className={
                      completed ||
                      (unlocked &&
                        implemented)
                        ? 'module-status available'
                        : 'module-status locked'
                    }
                  >
                    {statusText}
                  </span>
                </button>
              )
            },
          )}
        </div>
      </section>

      <section className="exam-section">
        <div className="exam-card">
          <div>
            <p className="section-label">
              OBJECTIF EXAMEN
            </p>

            <h3>
              Être capable de programmer
              sans compiler.
            </h3>

            <p>
              Le programme ENI sera
              transformé en exercices de
              raisonnement, d’analyse et
              d’écriture sur feuille.
            </p>
          </div>

          <div className="exam-icon">
            📝
          </div>
        </div>
      </section>
    </>
  )
}

/* =========================================================
   PAGE APPRENDRE
   ========================================================= */

function LearnPage({
  navigateTo,
  openLesson,
  getNextLesson,
  isModuleUnlocked,
  isLessonUnlocked,
  isLessonImplemented,
  isLessonCompleted,
}) {
  const nextLesson =
    getNextLesson()

  const fundamentals =
    courseModules.find(
      (module) =>
        module.id === 'fondamentaux',
    )

  const implementedFundamentals =
    fundamentals
      ? fundamentals.lessons.filter(
          (lesson) =>
            isLessonImplemented(
              lesson.id,
            ),
        )
      : []

  const completedFundamentalsCount =
    implementedFundamentals.filter(
      (lesson) =>
        isLessonCompleted(
          lesson.id,
        ),
    ).length

  return (
    <>
      <header className="topbar">
        <div>
          <p className="section-label">
            APPRENDRE
          </p>

          <h2>
            Ton parcours en langage C
          </h2>
        </div>

        <div className="profile">
          <div className="profile-avatar">
            C
          </div>
        </div>
      </header>

      <section className="hero">
        <div className="hero-content">
          <p className="hero-label">
            PROGRAMME ENI
          </p>

          <h3>
            Un parcours construit à partir
            de ton support de cours.
          </h3>

          <p className="hero-text">
            Les notions sont organisées dans
            l'ordre du programme, puis
            transformées progressivement en
            exercices de raisonnement et de
            pratique.
          </p>

          <button
            className="primary-button"
            type="button"
            onClick={() =>
              nextLesson
                ? openLesson(
                    nextLesson.id,
                  )
                : navigateTo(
                    'practice',
                  )
            }
          >
            {nextLesson
              ? 'Continuer le cours'
              : "S'entraîner"}

            <span>
              →
            </span>
          </button>
        </div>

        <div className="progress-box">
          <div className="progress-circle">
            <span>
              {completedFundamentalsCount}
            </span>
          </div>

          <p>
            Fondamentaux terminés
          </p>
        </div>
      </section>

      <section className="learning-section">
        <div className="section-heading">
          <div>
            <p className="section-label">
              PARCOURS
            </p>

            <h3>
              Les modules du programme
            </h3>
          </div>
        </div>

        <div className="module-grid">
          {courseModules.map(
            (module) => {
              const unlocked =
                isModuleUnlocked(
                  module.id,
                )

              const implementedLessons =
                module.lessons.filter(
                  (lesson) =>
                    isLessonImplemented(
                      lesson.id,
                    ),
                )

              const completedModuleLessons =
                implementedLessons.filter(
                  (lesson) =>
                    isLessonCompleted(
                      lesson.id,
                    ),
                ).length

              let moduleStatus =
                '🔒 Verrouillé'

              if (unlocked) {
                if (
                  implementedLessons.length >
                  0
                ) {
                  moduleStatus =
                    'Disponible'
                } else {
                  moduleStatus =
                    'Bientôt disponible'
                }
              }

              return (
                <article
                  key={module.id}
                  className={`module-card ${
                    !unlocked
                      ? 'module-card-disabled'
                      : ''
                  }`}
                >
                  <span className="module-number">
                    MODULE{' '}
                    {module.number}
                  </span>

                  <h4>
                    {module.title}
                  </h4>

                  <p>
                    {module.description}
                  </p>

                  <span
                    className={
                      unlocked
                        ? 'module-status available'
                        : 'module-status locked'
                    }
                  >
                    {moduleStatus}
                  </span>

                  <p
                    style={{
                      marginTop:
                        '0.75rem',
                      fontSize:
                        '0.85rem',
                    }}
                  >
                    {implementedLessons.length >
                    0
                      ? `${completedModuleLessons}/${implementedLessons.length} leçons développées`
                      : 'Contenu en préparation'}
                  </p>

                  {module.lessons
                    .length > 0 && (
                    <div
                      className="module-grid"
                      style={{
                        marginTop:
                          '1rem',
                      }}
                    >
                      {module.lessons.map(
                        (lesson) => {
                          const unlockedLesson =
                            isLessonUnlocked(
                              lesson.id,
                            )

                          const implemented =
                            isLessonImplemented(
                              lesson.id,
                            )

                          const completed =
                            isLessonCompleted(
                              lesson.id,
                            )

                          const disabled =
                            !unlockedLesson ||
                            !implemented

                          let lessonStatus =
                            'Commencer'

                          if (
                            completed
                          ) {
                            lessonStatus =
                              '✓ Terminée'
                          } else if (
                            !unlockedLesson
                          ) {
                            lessonStatus =
                              '🔒 Verrouillée'
                          } else if (
                            !implemented
                          ) {
                            lessonStatus =
                              'Bientôt disponible'
                          }

                          return (
                            <button
                              key={
                                lesson.id
                              }
                              type="button"
                              className={`module-card ${
                                disabled
                                  ? 'module-card-disabled'
                                  : ''
                              }`}
                              disabled={
                                disabled
                              }
                              onClick={() =>
                                openLesson(
                                  lesson.id,
                                )
                              }
                            >
                              <span className="module-number">
                                LEÇON{' '}
                                {
                                  lesson.number
                                }
                              </span>

                              <h4>
                                {
                                  lesson.title
                                }
                              </h4>

                              <p>
                                {lesson.topics
                                  .slice(
                                    0,
                                    2,
                                  )
                                  .join(
                                    ' • ',
                                  )}
                              </p>

                              <span
                                className={
                                  completed ||
                                  (unlockedLesson &&
                                    implemented)
                                    ? 'module-status available'
                                    : 'module-status locked'
                                }
                              >
                                {
                                  lessonStatus
                                }
                              </span>
                            </button>
                          )
                        },
                      )}
                    </div>
                  )}
                </article>
              )
            },
          )}
        </div>
      </section>

      <section className="exam-section">
        <div className="exam-card">
          <div>
            <p className="section-label">
              MÉTHODE
            </p>

            <h3>
              Comprendre avant de mémoriser.
            </h3>

            <p>
              Chaque chapitre sera
              accompagné d'exercices, de
              prédictions de résultats et de
              situations proches d'un devoir
              sur feuille.
            </p>
          </div>

          <button
            className="primary-button"
            type="button"
            onClick={() =>
              navigateTo('practice')
            }
          >
            Aller aux exercices
            <span>
              →
            </span>
          </button>
        </div>
      </section>
    </>
  )
}

/* =========================================================
   PAGE MODE DEVOIR
   ========================================================= */

function ProgressPage({
  completedLessons,
  solvedExercises,
}) {
  const completedCount =
    completedLessons.length

  const solvedCount =
    solvedExercises.length

  return (
    <>
      <header className="topbar">
        <div>
          <p className="section-label">
            PROGRESSION
          </p>

          <h2>
            Suivre les compétences réellement
            acquises
          </h2>
        </div>

        <div className="profile">
          <div className="profile-avatar">
            C
          </div>
        </div>
      </header>

      <section className="hero">
        <div className="hero-content">
          <p className="hero-label">
            MAÎTRISE DU C
          </p>

          <h3>
            La progression repose sur les
            compétences, pas seulement sur
            les chapitres lus.
          </h3>

          <p className="hero-text">
            Une leçon est validée après son
            exercice. Les entraînements sont
            comptés séparément.
          </p>
        </div>

        <div className="progress-box">
          <div className="progress-circle">
            <span>
              {completedCount}
            </span>
          </div>

          <p>
            Leçons terminées
          </p>
        </div>
      </section>

      <section className="stats-grid">
        <article className="stat-card">
          <div className="stat-icon">
            🟢
          </div>

          <div>
            <strong>
              {completedCount}
            </strong>

            <span>
              Leçons maîtrisées
            </span>
          </div>
        </article>

        <article className="stat-card">
          <div className="stat-icon">
            ✅
          </div>

          <div>
            <strong>
              {solvedCount}
            </strong>

            <span>
              Exercices réussis
            </span>
          </div>
        </article>

        <article className="stat-card">
          <div className="stat-icon">
            📚
          </div>

          <div>
            <strong>
              {courseModules.length}
            </strong>

            <span>
              Modules du programme
            </span>
          </div>
        </article>
      </section>

      <section className="learning-section">
        <div className="section-heading">
          <div>
            <p className="section-label">
              PROGRAMME COMPLET
            </p>

            <h3>
              Les modules à maîtriser
            </h3>
          </div>
        </div>

        <div className="module-grid">
          {courseModules.map(
            (module) => {
              const implementedLessons =
                module.lessons.filter(
                  (lesson) =>
                    implementedLessonIds.includes(
                      lesson.id,
                    ),
                )

              const completedModuleLessons =
                implementedLessons.filter(
                  (lesson) =>
                    completedLessons.includes(
                      lesson.id,
                    ),
                ).length

              const hasImplementedLessons =
                implementedLessons.length >
                0

              const moduleCompleted =
                hasImplementedLessons &&
                completedModuleLessons ===
                  implementedLessons.length

              return (
                <article
                  className="module-card"
                  key={module.id}
                >
                  <span className="module-number">
                    MODULE{' '}
                    {module.number}
                  </span>

                  <h4>
                    {module.title}
                  </h4>

                  <p>
                    {module.description}
                  </p>

                  <span
                    className={
                      moduleCompleted
                        ? 'module-status available'
                        : 'module-status locked'
                    }
                  >
                    {hasImplementedLessons
                      ? `${completedModuleLessons}/${implementedLessons.length} leçons développées`
                      : 'Bientôt disponible'}
                  </span>
                </article>
              )
            },
          )}
        </div>
      </section>
    </>
  )
}

/* =========================================================
   PAGE PARAMÈTRES
   ========================================================= */

function SettingsPage({
  onResetProgress,
  preferences,
  onPreferencesChange,
}) {
  const updatePreference = (key, value) => {
    onPreferencesChange((current) => ({
      ...current,
      [key]: value,
    }))
  }

  return (
    <>
      <header className="topbar">
        <div>
          <p className="section-label">
            PARAMÈTRES
          </p>

          <h2>
            Configurer C-Mastery
          </h2>
        </div>

        <div className="profile">
          <div className="profile-avatar">
            C
          </div>
        </div>
      </header>

      <section className="learning-section">
        <div className="section-heading">
          <div>
            <p className="section-label">
              APPLICATION
            </p>

            <h3>
              Préférences
            </h3>
          </div>
        </div>

        <div className="settings-grid">
          <article className="settings-card">
            <span className="module-number">
              PROFIL
            </span>

            <h4>
              Profil apprenant
            </h4>

            <p>Personnalise l’accueil de ton espace d’apprentissage.</p>

            <label className="settings-field">
              <span>Prénom ou pseudo</span>
              <input
                type="text"
                value={preferences.firstName}
                maxLength={32}
                placeholder="Ex. Amina"
                onChange={(event) =>
                  updatePreference('firstName', event.target.value)
                }
              />
            </label>

            <label className="settings-field">
              <span>Nom</span>
              <input
                type="text"
                value={preferences.lastName}
                maxLength={32}
                placeholder="Ex. Diallo"
                onChange={(event) =>
                  updatePreference('lastName', event.target.value)
                }
              />
            </label>
          </article>

          <article className="settings-card">
            <span className="module-number">
              APPARENCE
            </span>

            <h4>
              Apparence
            </h4>

            <p>Choisis l’affichage le plus confortable pour tes révisions.</p>

            <div className="settings-choice-group" aria-label="Thème">
              {['light', 'dark'].map((theme) => (
                <button
                  key={theme}
                  type="button"
                  className={preferences.theme === theme ? 'settings-choice active' : 'settings-choice'}
                  onClick={() => updatePreference('theme', theme)}
                >
                  {theme === 'light' ? '☀ Clair' : '☾ Sombre'}
                </button>
              ))}
            </div>
          </article>

          <article className="settings-card">
            <span className="module-number">
              APPRENTISSAGE
            </span>

            <h4>
              Objectifs
            </h4>

            <p>Définis une durée réaliste pour garder un rythme régulier.</p>

            <div className="settings-choice-group" aria-label="Objectif quotidien">
              {[10, 20, 30, 45].map((minutes) => (
                <button
                  key={minutes}
                  type="button"
                  className={preferences.dailyGoal === minutes ? 'settings-choice active' : 'settings-choice'}
                  onClick={() => updatePreference('dailyGoal', minutes)}
                >
                  {minutes} min
                </button>
              ))}
            </div>
          </article>

          <article className="settings-card settings-card-danger">
            <span className="module-number">
              PROGRESSION
            </span>

            <h4>
              Réinitialiser la progression
            </h4>

            <p>
              Efface les leçons terminées et
              les exercices réussis enregistrés
              sur cet appareil.
            </p>

            <button
              type="button"
              className="primary-button"
              onClick={
                onResetProgress
              }
            >
              Réinitialiser
              <span>
                ↺
              </span>
            </button>
          </article>
        </div>
      </section>
    </>
  )
}

export default App
