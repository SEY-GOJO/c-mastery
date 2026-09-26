export function drawFreshQuestions(pool, seenIds = [], count = 10) {
  if (pool.length === 0) {
    return { questions: [], seenIds: [] }
  }

  const knownIds = new Set(pool.map((question) => question.id))
  let history = new Set(seenIds.filter((id) => knownIds.has(id)))

  // Start a new cycle only after every question has appeared once.
  if (history.size === pool.length) {
    history = new Set()
  }

  const shuffle = (items) => {
    const result = [...items]
    for (let index = result.length - 1; index > 0; index -= 1) {
      const otherIndex = Math.floor(Math.random() * (index + 1))
      ;[result[index], result[otherIndex]] = [result[otherIndex], result[index]]
    }
    return result
  }

  const fresh = shuffle(pool.filter((question) => !history.has(question.id)))
  const previouslySeen = shuffle(pool.filter((question) => history.has(question.id)))
  const questions = [...fresh, ...previouslySeen].slice(0, Math.min(count, pool.length))
  const nextSeenIds = new Set([...history, ...questions.map((question) => question.id)])

  return { questions, seenIds: [...nextSeenIds] }
}

export function shuffleQuestions(questions) {
  const result = [...questions]
  for (let index = result.length - 1; index > 0; index -= 1) {
    const otherIndex = Math.floor(Math.random() * (index + 1))
    ;[result[index], result[otherIndex]] = [result[otherIndex], result[index]]
  }
  return result
}

export function getPassingScore(totalQuestions) {
  return Math.ceil(totalQuestions * 0.75)
}
