importScripts('/clang-wasm.global.js')

let compiler

self.onmessage = async ({ data }) => {
  if (data.type === 'initialize') {
    try {
      self.postMessage({ type: 'status', message: 'Chargement du compilateur C pour cette première utilisation…' })
      compiler = await self.clangWasm.createCompiler('c', {
        baseUrl: new URL('/clang/', self.location.href),
        std: 'gnu11',
        compileArgs: ['-Wall', '-Wextra'],
        maxAssetBytes: 128 * 1024 * 1024,
      })
      self.postMessage({ type: 'ready' })
    } catch (error) {
      self.postMessage({ type: 'error', message: `Impossible de charger le compilateur : ${error.message}` })
    }
    return
  }

  if (data.type !== 'run' || !compiler) return

  const results = []
  try {
    for (const task of data.tasks) {
      const result = {
        exerciseId: task.exerciseId,
        compileError: null,
        tests: [],
      }

      if (!task.code.trim()) {
        result.skipped = true
        result.compileError = 'Aucun code C n’a été saisi pour cet exercice.'
        results.push(result)
        self.postMessage({ type: 'exercise-result', result })
        continue
      }

      for (const [index, testCase] of task.testCases.entries()) {
        self.postMessage({ type: 'progress', message: `Compilation de l’exercice ${task.exerciseNumber}, cas ${index + 1}/${task.testCases.length}…` })
        const stdin = testCase.input ? `${testCase.input.replace(/\s+$/, '')}\n` : ''
        const execution = await compiler.run(task.code, stdin, { compileArgs: ['-Wall', '-Wextra'] })
        const output = String(execution.stdout || execution.output || '').slice(0, 12_000)
        const failedToCompile = execution.errors.length > 0 || execution.exitCode === null

        if (failedToCompile) {
          result.compileError = execution.errors.join('\n') || execution.stderr || 'Le programme n’a pas pu être compilé.'
          break
        }

        result.tests.push({
          input: testCase.input,
          expectedOutput: testCase.output,
          why: testCase.why,
          actualOutput: output,
          exitCode: execution.exitCode,
        })

        if (execution.exitCode !== 0) {
          result.runtimeError = `Le programme s’est terminé avec le code ${execution.exitCode}.`
          break
        }
      }

      results.push(result)
      self.postMessage({ type: 'exercise-result', result })
    }

    self.postMessage({ type: 'done', results })
  } catch (error) {
    self.postMessage({ type: 'error', message: `Erreur pendant l’exécution C : ${error.message}` })
  }
}
