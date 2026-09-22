import { useState } from 'react'

import { findLessonById } from './data/course'
import './LessonPage.css'

const lessonContent = {
  'notion-fonction': { code: 'int carre(int n) {\n    return n * n;\n}', rule: 'Une fonction possède un nom, des paramètres éventuels, un corps et parfois une valeur de retour.', question: 'Quel mot-clé renvoie le résultat d’une fonction ?', choices: ['return', 'printf', 'include'], correct: 0, explanation: 'return termine la fonction et transmet une valeur à son appelant.' },
  prototype: { code: 'int somme(int a, int b);\n\nint main(void) {\n    printf("%d", somme(2, 3));\n}', rule: 'Le prototype annonce la fonction avant son premier appel.', question: 'Pourquoi placer un prototype avant main ?', choices: ['Pour informer le compilateur de la fonction', 'Pour créer une variable', 'Pour ouvrir un fichier'], correct: 0, explanation: 'Le compilateur connaît ainsi le type de retour et les paramètres attendus.' },
  definition: { code: 'int somme(int a, int b) {\n    return a + b;\n}', rule: 'La définition contient le code exécuté lorsque la fonction est appelée.', question: 'Que vaut somme(4, 5) ?', choices: ['9', '45', '0'], correct: 0, explanation: 'Les arguments 4 et 5 sont additionnés puis la fonction renvoie 9.' },
  'fonctions-void': { code: 'void bonjour(void) {\n    printf("Bonjour");\n}', rule: 'Une fonction void ne renvoie aucune valeur ; elle peut néanmoins effectuer une action.', question: 'Quel type de retour convient à une fonction qui affiche seulement un message ?', choices: ['void', 'int', 'FILE'], correct: 0, explanation: 'void indique qu’aucune valeur n’est renvoyée.' },
  'pointeurs-bases': { code: 'int x = 10;\nint *p = &x;\nprintf("%d", *p);', rule: '& obtient une adresse et * permet d’accéder à la valeur stockée à cette adresse.', question: 'Que vaut *p dans cet exemple ?', choices: ['10', 'L’adresse de x', '0'], correct: 0, explanation: 'p pointe vers x ; *p désigne donc la valeur de x.' },
  'pointeurs-tableaux': { code: 'int notes[3] = {12, 15, 18};\nint *p = notes;\nprintf("%d", *(p + 1));', rule: 'Le nom d’un tableau se comporte souvent comme l’adresse de son premier élément.', question: 'Que va afficher ce programme ?', choices: ['15', '12', '18'], correct: 0, explanation: 'p + 1 pointe vers le deuxième élément, notes[1].' },
  'pointeurs-avances': { code: 'int x = 4;\nint *p = &x;\nint **pp = &p;\nprintf("%d", **pp);', rule: 'Un pointeur sur pointeur contient l’adresse d’un pointeur.', question: 'Que désigne **pp ?', choices: ['La valeur 4', 'L’adresse de p', 'Une erreur systématique'], correct: 0, explanation: 'Le premier * donne p, le second donne la valeur vers laquelle p pointe.' },
  'pointeur-null': { code: 'int *p = NULL;\n\nif (p != NULL) {\n    printf("%d", *p);\n}', rule: 'NULL représente l’absence d’adresse valide. Il faut le tester avant un déréférencement.', question: 'Pourquoi tester p != NULL ?', choices: ['Pour éviter de déréférencer une adresse invalide', 'Pour augmenter p', 'Pour convertir p en int'], correct: 0, explanation: 'Déréférencer NULL provoque un comportement indéfini.' },
  'variables-globales': { code: 'int compteur = 0;\n\nvoid ajouter(void) {\n    compteur++;\n}', rule: 'Une variable globale est déclarée hors des fonctions et peut être utilisée dans le fichier après sa déclaration.', question: 'Où est déclarée une variable globale ?', choices: ['Hors de toute fonction', 'Uniquement dans main', 'Dans une boucle for'], correct: 0, explanation: 'Sa déclaration se situe au niveau du fichier.' },
  'variables-locales': { code: 'void afficher(void) {\n    int n = 3;\n    printf("%d", n);\n}', rule: 'Une variable locale existe dans son bloc et disparaît à la sortie de la fonction.', question: 'Peut-on utiliser n directement dans main ?', choices: ['Non, n est locale à afficher', 'Oui, toujours', 'Oui, avec printf seulement'], correct: 0, explanation: 'La portée de n est limitée au bloc de afficher.' },
  'variables-extern': { code: '/* fichier_a.c */\nint total = 0;\n\n/* fichier_b.c */\nextern int total;', rule: 'extern déclare dans un fichier une variable définie dans un autre fichier.', question: 'Que fait extern int total; ?', choices: ['Annonce une variable définie ailleurs', 'Crée une nouvelle copie', 'Ferme un fichier'], correct: 0, explanation: 'extern ne définit pas une nouvelle variable : il référence une définition existante.' },
  'variables-static': { code: 'void compter(void) {\n    static int n = 0;\n    n++;\n    printf("%d", n);\n}', rule: 'Une variable locale static conserve sa valeur entre deux appels de fonction.', question: 'Après deux appels à compter, quelle valeur est affichée au second appel ?', choices: ['2', '1', '0'], correct: 0, explanation: 'n est initialisée une seule fois puis conserve sa valeur.' },
  'fichiers-introduction': { code: '/* Un fichier texte contient des caractères.\n   Un fichier binaire contient des octets bruts. */', rule: 'Le choix texte/binaire dépend de la façon dont les données seront lues et écrites.', question: 'Quel type de fichier est le plus lisible dans un éditeur de texte ?', choices: ['Un fichier texte', 'Un fichier binaire uniquement', 'Aucun fichier'], correct: 0, explanation: 'Un fichier texte stocke des caractères lisibles.' },
  'fopen-fclose': { code: 'FILE *f = fopen("notes.txt", "r");\nif (f != NULL) {\n    fclose(f);\n}', rule: 'fopen ouvre un flux et peut échouer ; fclose doit fermer un flux ouvert.', question: 'Que signifie le mode "r" de fopen ?', choices: ['Lecture', 'Écriture', 'Ajout binaire'], correct: 0, explanation: 'Le mode r ouvre un fichier existant en lecture.' },
  'lecture-ecriture': { code: 'fprintf(f, "%d\\n", note);\nfscanf(f, "%d", &note);', rule: 'fprintf écrit du texte formaté ; fscanf lit du texte formaté.', question: 'Quelle fonction écrit une ligne formatée dans un fichier ?', choices: ['fprintf', 'fscanf', 'fclose'], correct: 0, explanation: 'fprintf est la version fichier de printf.' },
  'fread-fwrite': { code: 'fwrite(&agent, sizeof agent, 1, f);\nfread(&agent, sizeof agent, 1, f);', rule: 'fwrite et fread transfèrent des blocs d’octets, utiles notamment avec les structures.', question: 'Quelle fonction lit un bloc depuis un fichier ?', choices: ['fread', 'fwrite', 'fopen'], correct: 0, explanation: 'fread copie des données du fichier vers la mémoire.' },
  'revision-generale': { code: 'int x = 2;\nx = x * 3;\nprintf("%d", x);', rule: 'La révision combine syntaxe, suivi des variables et lecture méthodique du code.', question: 'Que va afficher ce programme ?', choices: ['6', '5', '23'], correct: 0, explanation: 'x vaut 2 puis est multiplié par 3.' },
  'analyse-code': { code: 'int total = 0;\nfor (int i = 1; i <= 3; i++) {\n    total += i;\n}', rule: 'Pour analyser un programme, construis une table des valeurs successives.', question: 'Quelle est la valeur finale de total ?', choices: ['6', '3', '0'], correct: 0, explanation: 'total reçoit successivement 1, puis 3, puis 6.' },
  'examen-blanc': { code: 'int a = 7;\nif (a % 2 == 0)\n    printf("pair");\nelse\n    printf("impair");', rule: 'Un sujet blanc demande de mobiliser les notions sans correction immédiate.', question: 'Quel texte est affiché ?', choices: ['impair', 'pair', '7'], correct: 0, explanation: '7 modulo 2 vaut 1 : la condition est fausse et else est exécuté.' },
}

const moduleExamples = {
  fonctions: {
    code: `int maximum(int a, int b) {
    return a > b ? a : b;
}

int main(void) {
    printf("%d", maximum(4, 7));
    return 0;
}`,
    rule: 'Une fonction regroupe une tâche : ses paramètres sont des entrées et return fournit son résultat.',
  },
  pointeurs: {
    code: `int valeur = 12;
int *pointeur = &valeur;

*pointeur = 20;
printf("%d", valeur);`,
    rule: 'Un pointeur stocke une adresse. L’opérateur & obtient une adresse et * accède à la valeur pointée.',
  },
  stockage: {
    code: `int compteur = 0;       /* globale */

void ajouter(void) {
    static int appels = 0;
    appels++;
    compteur++;
}`,
    rule: 'La portée indique où une variable est visible ; sa durée de vie indique combien de temps elle existe.',
  },
  fichiers: {
    code: `FILE *fichier = fopen("notes.txt", "w");

if (fichier != NULL) {
    fprintf(fichier, "Bonjour\\n");
    fclose(fichier);
}`,
    rule: 'Toujours vérifier le résultat de fopen puis fermer un fichier ouvert avec fclose.',
  },
  maitrise: {
    code: `int total = 0;

for (int i = 1; i <= 3; i++) {
    total += i;
}

printf("%d", total);`,
    rule: 'En examen, note les valeurs successives et respecte rigoureusement l’ordre d’exécution.',
  },
}

export default function GenericLessonPage({ lessonId, onBack, onComplete, alreadyCompleted = false }) {
  const [step, setStep] = useState(0)
  const [answer, setAnswer] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const lesson = findLessonById(lessonId)
  const example = lesson && (lessonContent[lessonId] || moduleExamples[lesson.moduleId])

  if (!lesson || !example) return null

  const passed = submitted && answer === `option-${example.correct ?? 0}`
  const canContinue = step !== 2 || passed || alreadyCompleted
  const next = () => setStep((value) => Math.min(value + 1, 3))
  const previous = () => setStep((value) => Math.max(value - 1, 0))
  const validate = () => {
    setSubmitted(true)
    if (answer === `option-${example.correct ?? 0}`) onComplete(lessonId)
  }

  return (
    <section className="lesson-shell">
      <header className="lesson-header">
        <button type="button" className="lesson-back-button" onClick={onBack}>← <span>Retour à Apprendre</span></button>
        <div className="lesson-title-group">
          <p className="lesson-label">MODULE {lesson.moduleNumber} • LEÇON {lesson.number}</p>
          <h2>{lesson.title}</h2>
          <p>Une leçon guidée pour maîtriser les notions du chapitre et les appliquer dans un programme C.</p>
        </div>
        {alreadyCompleted && <div className="lesson-completed-badge">✓ Leçon terminée</div>}
      </header>

      <div className="lesson-progress-wrapper">
        <div className="lesson-progress-top"><span>Étape {step + 1} sur 4</span><strong>{['Objectif', 'Cours', 'Validation', 'Bilan'][step]}</strong></div>
        <div className="lesson-progress-track"><div className="lesson-progress-fill" style={{ width: `${(step + 1) * 25}%` }} /></div>
      </div>

      <div className="lesson-content">
        {step === 0 && <>
          <section className="lesson-hero-card"><div className="lesson-hero-icon">🎯</div><div><p className="lesson-section-label">OBJECTIF</p><h3>{lesson.title}</h3><p>À la fin de cette leçon, tu pourras expliquer et utiliser : {lesson.topics.join(', ')}.</p></div></section>
          <section className="lesson-section"><div className="lesson-section-heading"><p className="lesson-section-label">NOTIONS CLÉS</p><h3>Ce qu’il faut savoir reconnaître</h3></div><div className="lesson-card-grid">{lesson.topics.map((topic, index) => <article className="lesson-info-card" key={topic}><div className="lesson-info-number">{String(index + 1).padStart(2, '0')}</div><h4>{topic}</h4><p>Observe cette notion dans les exemples, puis entraîne-toi à l’employer avec une syntaxe correcte.</p></article>)}</div></section>
        </>}

        {step === 1 && <>
          <section className="lesson-section"><p className="lesson-section-label">EXEMPLE COMMENTÉ</p><h3>Lire le code avant de l’écrire</h3><p className="lesson-introduction">{example.rule}</p><div className="lesson-code-block"><div className="lesson-code-header"><span>exemple.c</span><span>C</span></div><pre><code>{example.code}</code></pre></div></section>
          <section className="lesson-note"><div className="lesson-note-icon">💡</div><div><strong>Méthode</strong><p>Repère d’abord les types, les valeurs et les appels. Ensuite, suis les instructions une par une sans deviner le résultat.</p></div></section>
        </>}

        {step === 2 && <section className="lesson-exam-card"><div className="lesson-exam-header"><span>QUESTION DE VALIDATION</span><strong>1 point</strong></div><p className="lesson-section-label">COMPRÉHENSION</p><h4>{example.question || 'Quel est le bon réflexe pour cette leçon ?'}</h4><div className="quiz-options">{(example.choices || ['Lire le code, identifier les notions et vérifier chaque étape.', 'Mémoriser le code sans chercher à comprendre son rôle.']).map((choice, index) => { const id = `option-${index}`; return <button type="button" key={id} className={`quiz-option ${answer === id ? 'selected' : ''} ${submitted && index === (example.correct ?? 0) ? 'correct' : ''}`} disabled={submitted} onClick={() => setAnswer(id)}><span className="quiz-letter">{String.fromCharCode(65 + index)}</span><span>{choice}</span></button> })}</div>{submitted && <div className={`quiz-feedback ${passed ? 'correct' : 'incorrect'}`}><strong>{passed ? '✓ Bonne réponse.' : '✕ Réponse incorrecte.'}</strong><p>{example.explanation || 'La compréhension du rôle de chaque instruction est indispensable pour progresser en C.'}</p></div>}{!submitted && <button type="button" className="lesson-primary-button" disabled={!answer} onClick={validate}>Valider ma réponse <span>→</span></button>}{submitted && !passed && <button type="button" className="lesson-secondary-button" onClick={() => { setAnswer(null); setSubmitted(false) }}>Réessayer</button>}</section>}

        {step === 3 && <section className="lesson-completion-card"><div className="lesson-completion-icon">{alreadyCompleted || passed ? '✓' : '🎯'}</div><p className="lesson-section-label">BILAN</p><h3>{alreadyCompleted || passed ? 'Leçon maîtrisée.' : 'Validation requise.'}</h3><p>{alreadyCompleted || passed ? `Tu peux maintenant utiliser les notions : ${lesson.topics.join(', ')}.` : 'Retourne à la validation et réponds correctement à la question.'}</p>{(alreadyCompleted || passed) && <button type="button" className="lesson-primary-button" onClick={onBack}>Retour au parcours <span>→</span></button>}</section>}
      </div>

      <footer className="lesson-navigation"><button type="button" className="lesson-secondary-button" onClick={previous} disabled={step === 0}>← Précédent</button>{step < 3 && <button type="button" className="lesson-primary-button" onClick={next} disabled={!canContinue}>Continuer <span>→</span></button>}</footer>
    </section>
  )
}
