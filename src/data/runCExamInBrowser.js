const FIRST_LOAD_TIMEOUT_MS = 120_000
const PROGRAM_TIMEOUT_MS = 15_000

export function runCExamInBrowser(tasks, { onProgress = () => {}, onExerciseResult = () => {} } = {}) {
  return new Promise((resolve, reject) => {
    const worker = new Worker('/c-compiler-worker.js')
    let watchdog
    let settled = false

    const cleanup = () => {
      clearTimeout(watchdog)
      worker.terminate()
      settled = true
    }

    const armWatchdog = (duration, message) => {
      clearTimeout(watchdog)
      watchdog = setTimeout(() => {
        if (settled) return
        cleanup()
        reject(new Error(message))
      }, duration)
    }

    armWatchdog(FIRST_LOAD_TIMEOUT_MS, 'Le compilateur C ne répond pas. Vérifie ta connexion et réessaie.')

    worker.onerror = (event) => {
      if (settled) return
      cleanup()
      reject(new Error(event.message || 'Le compilateur C a rencontré une erreur.'))
    }

    worker.onmessage = ({ data }) => {
      if (settled) return
      if (data.type === 'status') {
        onProgress(data.message)
        return
      }
      if (data.type === 'ready') {
        onProgress('Compilateur prêt. Compilation et exécution des programmes…')
        armWatchdog(PROGRAM_TIMEOUT_MS, 'Le programme ne termine pas. Vérifie tes boucles et réessaie.')
        worker.postMessage({ type: 'run', tasks })
        return
      }
      if (data.type === 'progress') {
        onProgress(data.message)
        armWatchdog(PROGRAM_TIMEOUT_MS, 'Le programme ne termine pas. Vérifie tes boucles et réessaie.')
        return
      }
      if (data.type === 'exercise-result') {
        onExerciseResult(data.result)
        return
      }
      if (data.type === 'done') {
        cleanup()
        resolve(data.results)
        return
      }
      if (data.type === 'error') {
        cleanup()
        reject(new Error(data.message))
      }
    }

    worker.postMessage({ type: 'initialize' })
  })
}

export function checkExpectedOutput(expectedOutput, actualOutput) {
  const numberPattern = /-?\d+(?:[.,]\d+)?/g
  const expectedNumbers = [...expectedOutput.matchAll(numberPattern)].map((match) => Number(match[0].replace(',', '.')))
  const actualNumbers = [...actualOutput.matchAll(numberPattern)].map((match) => Number(match[0].replace(',', '.')))

  if (expectedNumbers.length) {
    return expectedNumbers.every((expected) => actualNumbers.some((actual) => Math.abs(actual - expected) < 0.005))
  }

  const normalize = (value) => value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()

  const normalizedExpected = normalize(expectedOutput)
  const normalizedActual = normalize(actualOutput)
  if (normalizedExpected === 'premier' && normalizedActual.includes('non premier')) return false
  return normalizedActual.includes(normalizedExpected)
}
