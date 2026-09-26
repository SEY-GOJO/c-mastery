const commonInput = { pattern: /\bscanf\s*\(/i, message: 'Entrée manquante : lis les valeurs au clavier avec scanf().' }
const commonOutput = { pattern: /\bprintf\s*\(/i, message: 'Sortie manquante : affiche le résultat avec printf().' }
const loop = { pattern: /\b(for|while|do)\b/i, message: 'Boucle C manquante : vérifie que ton programme parcourt les valeurs nécessaires.' }

const referenceTests = {
  factoriel: [{ input: '5', output: '120', why: 'Le calcul doit multiplier 1 × 2 × 3 × 4 × 5.' }],
  'somme-factoriels': [{ input: '4', output: '33', why: 'La somme attendue est 1! + 2! + 3! + 4! = 1 + 2 + 6 + 24.' }],
  'somme-impairs-3': [{ input: '1 10', output: '12', why: 'Dans cet intervalle, seuls 3 et 9 sont impairs et divisibles par 3.' }],
  'somme-diviseurs': [{ input: '6', output: '12', why: 'Les diviseurs de 6 sont 1, 2, 3 et 6.' }],
  premier: [{ input: '7', output: 'premier', why: '7 n’a aucun diviseur entre 2 et 6.' }, { input: '9', output: 'non premier', why: '9 est divisible par 3.' }],
  pgcd: [{ input: '48 18', output: 'PGCD = 6', why: '6 est le plus grand entier qui divise 48 et 18.' }],
  'min-max': [{ input: '4 -2 9 1 7 0 3 5', output: 'Min = -2 ; Max = 9', why: 'Le tableau contient des valeurs négatives et positives.' }],
  moyenne: [{ input: '10 12 14 16 8 20 10 15 13 12', output: '13', why: 'La somme des dix notes vaut 130, donc la moyenne vaut 13.' }],
  'compter-dessus': [{ input: '10 12 14 16 8 20 10 15 13 12', output: '4', why: 'Quatre notes sont strictement supérieures à la moyenne de 13.' }],
  puissance: [{ input: '2 5', output: '32', why: '2 multiplié par lui-même cinq fois vaut 32.' }, { input: '7 0', output: '1', why: 'Toute base non nulle élevée à la puissance 0 vaut 1.' }],
  'fonction-premier': [{ input: '1', output: 'non premier', why: 'Un nombre premier est supérieur ou égal à 2.' }, { input: '7', output: 'premier', why: '7 n’a pas de diviseur autre que 1 et lui-même.' }],
  permuter: [{ input: '4 9', output: 'x = 9, y = 4', why: 'Les deux valeurs doivent être échangées, pas seulement copiées.' }],
  'somme-quatre-entiers': [{ input: '2 3 4 5', output: '14', why: 'Le programme doit additionner les quatre valeurs saisies.' }],
  'saisie-age': [{ input: '18', output: 'Tu as 18 ans.', why: 'L’âge saisi doit être repris dans le message affiché.' }],
  bonjour: [{ input: '', output: 'Bonjour !', why: 'Ce programme affiche un message fixe.' }],
  'distance-deux-points': [{ input: '0 0 3 4', output: 'DIST = 5.00', why: 'La distance correspond à l’hypoténuse d’un triangle 3-4-5.' }],
  rectangle: [{ input: '5 3', output: 'Aire = 15 ; périmètre = 16', why: 'Aire = 5 × 3 ; périmètre = 2 × (5 + 3).' }],
  'conversion-temperature': [{ input: '25', output: '77.00 °F', why: '25 × 9 / 5 + 32 vaut 77.' }],
}

export function getExamReferenceTests(exerciseId) {
  return referenceTests[exerciseId] || []
}

const stripCommentsAndStrings = (source) => source
  .replace(/"(?:\\.|[^"\\])*"/gs, '""')
  .replace(/'(?:\\.|[^'\\])*'/gs, "''")
  .replace(/\/\*[\s\S]*?\*\//g, ' ')
  .replace(/\/\/[^\n]*/g, ' ')

const hasBalancedPairs = (source, opening, closing) => {
  let depth = 0
  for (const character of source) {
    if (character === opening) depth += 1
    if (character === closing) depth -= 1
    if (depth < 0) return false
  }
  return depth === 0
}

const getCodeWarnings = (exerciseId, answer) => {
  const code = stripCommentsAndStrings(answer)
  const warnings = []

  if (!/#\s*include\s*<stdio\.h>/i.test(code)) warnings.push('Ajoute #include <stdio.h> pour déclarer scanf() et printf().')
  if (!/\bint\s+main\s*\(/i.test(code)) warnings.push('Le programme doit avoir un point d’entrée int main(void) ou int main().')
  if (!hasBalancedPairs(code, '{', '}')) warnings.push('Les accolades { } ne sont pas équilibrées.')
  if (!hasBalancedPairs(code, '(', ')')) warnings.push('Les parenthèses ( ) ne sont pas équilibrées.')
  if (!code.includes(';')) warnings.push('Il manque des points-virgules à la fin des instructions C.')
  if (exerciseId === 'distance-deux-points' && /\bsqrt\s*\(/i.test(code) && !/#\s*include\s*<math\.h>/i.test(code)) {
    warnings.push('Ajoute #include <math.h> pour utiliser sqrt(). Avec GCC, ajoute aussi -lm à la compilation.')
  }

  return warnings
}

const checksByExercise = {
  factoriel: [commonInput, loop, { pattern: /factoriel|resultat|résultat/i, message: 'Initialise une variable de résultat à 1.' }, { pattern: /\*=|\*|multiplier/i, message: 'Multiplie le résultat courant par chaque entier de 1 à n.' }, commonOutput],
  'somme-factoriels': [commonInput, loop, { pattern: /factoriel|fact/i, message: 'Fais évoluer le factoriel à chaque tour.' }, { pattern: /somme|\+=|s\s*=.*\+/i, message: 'Ajoute chaque factoriel à la somme, initialisée à 0.' }, commonOutput],
  'somme-impairs-3': [commonInput, loop, { pattern: /%\s*2|mod\s+2|impair/i, message: 'Teste que le nombre est impair.' }, { pattern: /%\s*3|mod\s+3|multiple de 3/i, message: 'Teste que le nombre est divisible par 3.' }, { pattern: /&&|et\b/i, message: 'Les deux conditions doivent être vraies en même temps.' }, { pattern: /somme\s*\+=|somme\s*=.*\+|somme.*\+\s*i/i, message: 'Additionne les nombres qui satisfont les deux conditions.' }, commonOutput],
  'somme-diviseurs': [commonInput, loop, { pattern: /%\s*[a-z]|mod/i, message: 'Teste le reste de la division de n par le candidat diviseur.' }, { pattern: /somme\s*\+=|somme\s*=.*\+/i, message: 'Additionne chaque diviseur trouvé.' }, commonOutput],
  premier: [commonInput, loop, { pattern: /%|mod/i, message: 'Recherche un diviseur avec le reste de la division.' }, { pattern: /premier|estpremier|flag|faux|0/i, message: 'Gère le résultat « premier / non premier ».' }, commonOutput],
  pgcd: [commonInput, { pattern: /while|tant que/i, message: 'Répète l’algorithme d’Euclide tant que b est non nul.' }, { pattern: /%|mod/i, message: 'Calcule le reste a modulo b.' }, { pattern: /reste/i, message: 'Conserve le reste avant de remplacer a et b.' }, commonOutput],
  'min-max': [commonInput, { pattern: /\[\s*\d+\s*\]|tableau| t\s*\[/i, message: 'Stocke les valeurs dans un tableau.' }, loop, { pattern: /min/i, message: 'Initialise et met à jour le minimum.' }, { pattern: /max/i, message: 'Initialise et met à jour le maximum.' }, commonOutput],
  moyenne: [commonInput, loop, { pattern: /somme|\+=/i, message: 'Additionne les dix notes.' }, { pattern: /\/\s*10|moyenne/i, message: 'Divise la somme par 10 pour obtenir la moyenne.' }, commonOutput],
  'compter-dessus': [commonInput, { pattern: /moyenne/i, message: 'Calcule d’abord la moyenne des notes.' }, loop, { pattern: />\s*moyenne|sup.rieur.*moyenne/i, message: 'Teste les notes strictement supérieures à la moyenne.' }, { pattern: /compteur|count/i, message: 'Incrémente un compteur pour chaque note retenue.' }, commonOutput],
  puissance: [commonInput, /fonction|int\s+puissance/i, loop, { pattern: /return|retourner/i, message: 'Retourne le résultat calculé par la fonction.' }, commonOutput],
  'fonction-premier': [commonInput, /estpremier|fonction/i, { pattern: /%|mod/i, message: 'Teste les diviseurs possibles avec le modulo.' }, { pattern: /return|retourner/i, message: 'Retourne 1 si le nombre est premier et 0 sinon.' }, commonOutput],
  permuter: [commonInput, /\*\s*[ab]|pointeur|\*a|\*b/i, { pattern: /temp/i, message: 'Utilise une variable temporaire pour ne perdre aucune valeur.' }, { pattern: /permuter|\*a\s*=|\*b\s*=/i, message: 'Échange les deux valeurs via leurs adresses.' }, commonOutput],
  'somme-quatre-entiers': [commonInput, { pattern: /a\s*\+\s*b\s*\+\s*c\s*\+\s*d|somme/i, message: 'Additionne les quatre entiers saisis.' }, commonOutput],
  'saisie-age': [commonInput, { pattern: /age|âge/i, message: 'Stocke la saisie dans une variable age.' }, commonOutput],
  bonjour: [/int\s+main|main\s*\(|debut/i, /bonjour/i, commonOutput],
  'distance-deux-points': [commonInput, { pattern: /xa|x\s*a/i, message: 'Lis les coordonnées XA, YA, XB et YB.' }, { pattern: /ya|y\s*a/i, message: 'Lis les coordonnées XA, YA, XB et YB.' }, { pattern: /xb|x\s*b/i, message: 'Lis les coordonnées XA, YA, XB et YB.' }, { pattern: /yb|y\s*b/i, message: 'Lis les coordonnées XA, YA, XB et YB.' }, { pattern: /sqrt|racine/i, message: 'Applique la racine carrée à dx² + dy².' }, { pattern: /dx|xb\s*-\s*xa/i, message: 'Calcule dx = XB - XA.' }, { pattern: /dy|yb\s*-\s*ya/i, message: 'Calcule dy = YB - YA.' }, commonOutput],
  rectangle: [commonInput, { pattern: /longueur/i, message: 'Lis la longueur du rectangle.' }, { pattern: /largeur/i, message: 'Lis sa largeur.' }, { pattern: /aire|surface/i, message: 'Calcule l’aire : longueur × largeur.' }, { pattern: /perimetre|périmètre/i, message: 'Calcule le périmètre : 2 × (longueur + largeur).' }, commonOutput],
  'conversion-temperature': [commonInput, { pattern: /9\s*\.?(?:0)?\s*\/\s*5|9\.0\s*\/\s*5\.0/i, message: 'Utilise une division décimale dans la formule Fahrenheit.' }, { pattern: /32/i, message: 'Ajoute 32 à la conversion Celsius vers Fahrenheit.' }, commonOutput],
}

export function reviewExamAnswer(exerciseId, answer) {
  const checks = checksByExercise[exerciseId] || [commonInput, commonOutput]
  const warnings = getCodeWarnings(exerciseId, answer)
  if (!answer.trim()) {
    return {
      missing: ['Tu as laissé cet exercice sans réponse. Consulte le corrigé C, puis essaie de le refaire.'],
      warnings: [],
      matchedCount: 0,
      checkCount: checks.length,
      passed: false,
    }
  }

  const missing = checks
    .filter((check) => !(check instanceof RegExp ? check.test(answer) : check.pattern.test(answer)))
    .map((check) => check instanceof RegExp ? 'Vérifie la structure attendue pour cet exercice.' : check.message)

  return {
    missing,
    warnings,
    matchedCount: Math.max(0, checks.length - missing.length - warnings.length),
    checkCount: checks.length,
    passed: missing.length === 0,
  }
}
