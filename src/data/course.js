/* =========================================================
   C-MASTERY — PROGRAMME OFFICIEL DU COURS
   Source pédagogique principale :
   Support ENI — Programmation en langage C
   ========================================================= */

/*
 * RÈGLE D'ARCHITECTURE
 *
 * Ce fichier contient les données pédagogiques.
 * Les composants React s'occupent de l'affichage.
 *
 * Ainsi :
 *   cours = ici
 *   exercices = ici
 *   interface = composants React
 *
 * Cela évite de mélanger contenu pédagogique et logique
 * d'interface.
 */

export const courseModules = [
  {
    id: 'fondamentaux',
    number: '01',
    title: 'Fondamentaux du langage C',
    shortTitle: 'Fondamentaux',
    description:
      "Découvrir le langage C, comprendre sa structure et maîtriser les premières notions nécessaires pour écrire un programme.",
    prerequisite: null,
    status: 'available',

    lessons: [
      {
        id: 'introduction-c',
        number: '01',
        title: 'Historique et introduction au C',
        status: 'available',

        topics: [
          "Historique du langage C",
          'Programmation procédurale',
          'Structure générale d’un programme',
          'Fonction main()',
        ],
      },

      {
        id: 'variables-types',
        number: '02',
        title: 'Variables, types et formats',
        status: 'locked',

        topics: [
          'Les variables',
          'Types de données',
          'Formats',
          'Déclaration et initialisation',
        ],
      },

      {
        id: 'operateurs',
        number: '03',
        title: 'Les opérateurs',
        status: 'locked',

        topics: [
          'Opérateurs arithmétiques',
          'Opérateurs relationnels',
          'Opérateurs logiques',
        ],
      },

      {
        id: 'printf-scanf',
        number: '04',
        title: 'printf et scanf',
        status: 'locked',

        topics: [
          'Affichage avec printf',
          'Lecture au clavier avec scanf',
          'Spécificateurs de format',
          'Adresse d’une variable',
        ],
      },
    ],

    exercises: [
      {
        id: 'fondamentaux-ex-01',
        title: 'Bonjour la classe',
        type: 'écriture',
        difficulty: 'débutant',
        statement:
          'Écrire un programme en langage C qui affiche le message « Bonjour la classe ».',
        skills: [
          'structure d’un programme',
          'printf',
          'main',
        ],
      },

      {
        id: 'fondamentaux-ex-02',
        title: 'Somme de deux nombres',
        type: 'écriture',
        difficulty: 'débutant',
        statement:
          'Écrire un programme en C qui calcule la somme de deux entiers.',
        skills: [
          'variables',
          'types',
          'opérateurs arithmétiques',
          'printf',
        ],
      },

      {
        id: 'fondamentaux-ex-03',
        title: 'Somme de deux décimaux',
        type: 'écriture',
        difficulty: 'débutant',
        statement:
          'Écrire un programme en C qui calcule la somme de deux nombres décimaux en utilisant float et double.',
        skills: [
          'float',
          'double',
          'opérateurs arithmétiques',
        ],
      },

      {
        id: 'fondamentaux-ex-04',
        title: 'Somme avec saisie utilisateur',
        type: 'écriture',
        difficulty: 'débutant',
        statement:
          'Écrire un programme qui demande deux entiers à l’utilisateur et affiche leur somme.',
        skills: [
          'scanf',
          'printf',
          'variables',
          'opérateurs',
        ],
      },
    ],
  },

  {
    id: 'controles',
    number: '02',
    title: 'Instructions de contrôle',
    shortTitle: 'Contrôle',
    description:
      'Maîtriser les boucles, les conditions et la sélection multiple pour contrôler l’exécution d’un programme.',
    prerequisite: 'fondamentaux',
    status: 'locked',

    lessons: [
      {
        id: 'do-while',
        number: '01',
        title: 'Boucle do...while',
        status: 'locked',

        topics: [
          'Principe de la boucle',
          'Condition',
          'Au moins une itération',
          'Calculs répétitifs',
        ],
      },

      {
        id: 'for',
        number: '02',
        title: 'Boucle for',
        status: 'locked',

        topics: [
          'Valeur initiale',
          'Condition',
          'Incrémentation',
          'Nombre d’itérations',
        ],
      },

      {
        id: 'if',
        number: '03',
        title: 'Instruction if',
        status: 'locked',

        topics: [
          'if',
          'if...else',
          'else if',
          'Conditions imbriquées',
        ],
      },

      {
        id: 'switch',
        number: '04',
        title: 'Instruction switch',
        status: 'locked',

        topics: [
          'Expression',
          'case',
          'default',
          'Sélection multiple',
        ],
      },
    ],

    exercises: [
      {
        id: 'controle-ex-01',
        title: 'Somme des carrés jusqu’à 650',
        type: 'écriture',
        difficulty: 'intermédiaire',
        statement:
          'Calculer la somme des carrés des entiers tant que cette somme ne dépasse pas 650.',
        skills: [
          'do...while',
          'accumulation',
          'carré',
          'condition',
        ],
      },

      {
        id: 'controle-ex-02',
        title: 'Somme des carrés inférieurs à 100',
        type: 'écriture',
        difficulty: 'intermédiaire',
        statement:
          'Calculer la somme des carrés des entiers inférieurs à 100.',
        skills: [
          'boucle',
          'accumulation',
          'condition',
        ],
      },

      {
        id: 'controle-ex-03',
        title: 'Température',
        type: 'écriture',
        difficulty: 'intermédiaire',
        statement:
          'Afficher « je peux porter mon T-shirt » lorsque la température est supérieure ou égale à 25, sinon afficher qu’il faut porter un manteau.',
        skills: [
          'if',
          'else',
          'comparaison',
        ],
      },

      {
        id: 'controle-ex-04',
        title: 'Équation du second degré',
        type: 'problème',
        difficulty: 'avancé',
        statement:
          'Écrire un programme en C qui résout une équation du second degré ax² + bx + c = 0.',
        skills: [
          'if',
          'else if',
          'discriminant',
          'calcul',
        ],
      },

      {
        id: 'controle-ex-05',
        title: 'Système de deux équations',
        type: 'problème',
        difficulty: 'avancé',
        statement:
          'Écrire un programme en C qui résout un système de deux équations à deux inconnues.',
        skills: [
          'conditions',
          'calcul',
          'déterminant',
        ],
      },

      {
        id: 'controle-ex-06',
        title: 'Rabais du commerçant',
        type: 'problème',
        difficulty: 'avancé',
        statement:
          'Saisir le montant total des achats, puis calculer le montant payé et le montant remis selon le barème de réduction.',
        skills: [
          'if',
          'else if',
          'pourcentage',
          'calcul',
        ],
      },

      {
        id: 'controle-ex-07',
        title: 'Jours de la semaine',
        type: 'écriture',
        difficulty: 'intermédiaire',
        statement:
          'Saisir le rang du jour de la semaine et utiliser switch pour déterminer le message correspondant.',
        skills: [
          'switch',
          'case',
          'default',
        ],
      },

      {
        id: 'controle-ex-08',
        title: 'Année bissextile',
        type: 'problème',
        difficulty: 'intermédiaire',
        statement:
          'Écrire un programme qui détermine si une année est bissextile.',
        skills: [
          'if',
          'opérateurs logiques',
          'conditions',
        ],
      },
    ],
  },

  {
    id: 'types-composes',
    number: '03',
    title: 'Types composés',
    shortTitle: 'Types composés',
    description:
      'Manipuler les tableaux, tableaux à deux dimensions, structures et énumérations.',
    prerequisite: 'controles',
    status: 'locked',

    lessons: [
      {
        id: 'tableaux',
        number: '01',
        title: 'Tableaux à une dimension',
        status: 'locked',

        topics: [
          'Déclaration',
          'Indices',
          'Parcours',
          'Lecture et modification',
        ],
      },

      {
        id: 'tableaux-2d',
        number: '02',
        title: 'Tableaux à deux dimensions',
        status: 'locked',

        topics: [
          'Déclaration',
          'Lignes',
          'Colonnes',
          'Parcours',
        ],
      },

      {
        id: 'structures',
        number: '03',
        title: 'Structures',
        status: 'locked',

        topics: [
          'struct',
          'Champs',
          'Types différents',
          'Accès aux champs',
        ],
      },

      {
        id: 'enum',
        number: '04',
        title: 'Énumérations',
        status: 'locked',

        topics: [
          'enum',
          'Étiquettes',
          'Valeurs',
          'Utilisation dans les menus',
        ],
      },
    ],

    exercises: [
      {
        id: 'types-ex-01',
        title: 'Analyse complète d’un tableau',
        type: 'problème',
        difficulty: 'avancé',
        statement:
          'Saisir n entiers, remplir un tableau, afficher ses éléments, compter les positifs, négatifs et nuls, rechercher le premier élément pair, déterminer le minimum et le maximum, calculer la moyenne puis inverser le tableau sans utiliser de tableau auxiliaire.',
        skills: [
          'tableau',
          'boucles',
          'conditions',
          'indices',
          'moyenne',
          'minimum',
          'maximum',
          'inversion',
        ],
      },

      {
        id: 'types-ex-02',
        title: 'Notes des élèves',
        type: 'problème',
        difficulty: 'avancé',
        statement:
          'À partir de vingt notes d’élèves, calculer la moyenne puis déterminer combien de notes sont supérieures à cette moyenne.',
        skills: [
          'tableau',
          'parcours',
          'moyenne',
          'comparaison',
        ],
      },

      {
        id: 'types-ex-03',
        title: 'Gestion d’un salarié',
        type: 'problème',
        difficulty: 'avancé',
        statement:
          'Déclarer une structure Agent contenant nom, prénom, indice et salaire, puis saisir les informations et calculer le salaire brut avec une valeur indiciaire de 500 F.',
        skills: [
          'struct',
          'chaînes',
          'saisie',
          'calcul',
        ],
      },
    ],
  },

  {
    id: 'fonctions',
    number: '04',
    title: 'Fonctions',
    shortTitle: 'Fonctions',
    description:
      'Comprendre les fonctions C, leurs paramètres, leur valeur de retour, leur déclaration et leur définition.',
    prerequisite: 'types-composes',
    status: 'locked',

    lessons: [
      {
        id: 'notion-fonction',
        number: '01',
        title: 'Principe des fonctions',
        status: 'locked',

        topics: [
          'Identificateur',
          'Type de retour',
          'Paramètres',
          'Corps de fonction',
        ],
      },

      {
        id: 'prototype',
        number: '02',
        title: 'Déclaration et prototype',
        status: 'locked',

        topics: [
          'Prototype',
          'Déclaration',
          'Paramètres',
          'Type de retour',
        ],
      },

      {
        id: 'definition',
        number: '03',
        title: 'Définition et appel',
        status: 'locked',

        topics: [
          'Définition',
          'Appel',
          'Arguments',
          'return',
        ],
      },

      {
        id: 'fonctions-void',
        number: '04',
        title: 'Fonctions void',
        status: 'locked',

        topics: [
          'void',
          'Fonctions sans valeur de retour',
          'Fonctions sans paramètres',
        ],
      },
    ],

    exercises: [
      {
        id: 'fonctions-ex-01',
        title: 'Surface d’un carré',
        type: 'problème',
        difficulty: 'intermédiaire',
        statement:
          'Écrire une fonction qui calcule la surface d’un carré, puis utiliser cette fonction dans le programme principal.',
        skills: [
          'fonction',
          'paramètre',
          'return',
          'double',
        ],
      },

      {
        id: 'fonctions-ex-02',
        title: 'Fonction de traitement',
        type: 'écriture',
        difficulty: 'avancé',
        statement:
          'Écrire une fonction adaptée à un problème donné, puis définir son prototype, sa définition et son appel.',
        skills: [
          'prototype',
          'définition',
          'appel',
          'paramètres',
        ],
      },
    ],
  },

  {
    id: 'pointeurs',
    number: '05',
    title: 'Pointeurs',
    shortTitle: 'Pointeurs',
    description:
      'Comprendre les adresses mémoire, les pointeurs, la redirection, les pointeurs sur tableaux et les pointeurs sur pointeurs.',
    prerequisite: 'fonctions',
    status: 'locked',

    lessons: [
      {
        id: 'pointeurs-bases',
        number: '01',
        title: 'Les bases des pointeurs',
        status: 'locked',

        topics: [
          'Adresse mémoire',
          'Déclaration',
          '&',
          '*',
        ],
      },

      {
        id: 'pointeurs-tableaux',
        number: '02',
        title: 'Pointeurs et tableaux',
        status: 'locked',

        topics: [
          'Adresse du premier élément',
          'Pointeur sur tableau',
          'Indices',
          'Arithmétique des pointeurs',
        ],
      },

      {
        id: 'pointeurs-avances',
        number: '03',
        title: 'Pointeurs void et pointeurs sur pointeurs',
        status: 'locked',

        topics: [
          'void *',
          'char **',
          'Niveaux de référence',
        ],
      },

      {
        id: 'pointeur-null',
        number: '04',
        title: 'Pointeur NULL',
        status: 'locked',

        topics: [
          'Pointeur nul',
          'Valeur spéciale',
          'Sécurité des références',
        ],
      },
    ],

    exercises: [
      {
        id: 'pointeurs-ex-01',
        title: 'Lire une valeur avec un pointeur',
        type: 'raisonnement',
        difficulty: 'avancé',
        statement:
          'À partir d’une variable entière et d’un pointeur qui contient son adresse, déterminer les valeurs obtenues par la variable, le pointeur et *p.',
        skills: [
          'adresse',
          'référence',
          'redirection',
        ],
      },

      {
        id: 'pointeurs-ex-02',
        title: 'Pointeur et tableau',
        type: 'raisonnement',
        difficulty: 'avancé',
        statement:
          'Analyser la relation entre l’identificateur d’un tableau et un pointeur sur son premier élément.',
        skills: [
          'tableau',
          'pointeur',
          'adresse',
        ],
      },

      {
        id: 'pointeurs-ex-03',
        title: 'Pointeur sur pointeur',
        type: 'raisonnement',
        difficulty: 'expert',
        statement:
          'Suivre successivement les niveaux de référence d’un pointeur sur pointeur et déterminer les valeurs obtenues avec *, **.',
        skills: [
          'pointeurs',
          'pointeur sur pointeur',
          'redirection',
        ],
      },
    ],
  },

  {
    id: 'stockage',
    number: '06',
    title: 'Variables et stockage',
    shortTitle: 'Stockage',
    description:
      'Comprendre la portée et la durée de vie des variables globales, locales, externes et statiques.',
    prerequisite: 'pointeurs',
    status: 'locked',

    lessons: [
      {
        id: 'variables-globales',
        number: '01',
        title: 'Variables globales',
        status: 'locked',

        topics: [
          'Déclaration hors fonction',
          'Visibilité',
          'Durée de vie',
        ],
      },

      {
        id: 'variables-locales',
        number: '02',
        title: 'Variables locales',
        status: 'locked',

        topics: [
          'Portée',
          'Durée de vie',
          'Variables automatiques',
          'auto',
        ],
      },

      {
        id: 'variables-extern',
        number: '03',
        title: 'Variables externes',
        status: 'locked',

        topics: [
          'extern',
          'Visibilité',
          'Plusieurs fichiers',
        ],
      },

      {
        id: 'variables-static',
        number: '04',
        title: 'Variables statiques',
        status: 'locked',

        topics: [
          'static',
          'Conservation de la valeur',
          'Appels successifs',
        ],
      },
    ],

    exercises: [
      {
        id: 'stockage-ex-01',
        title: 'Portée et durée de vie',
        type: 'raisonnement',
        difficulty: 'avancé',
        statement:
          'Analyser un programme contenant des variables globales et locales et déterminer quelles variables sont accessibles à chaque endroit.',
        skills: [
          'portée',
          'visibilité',
          'durée de vie',
        ],
      },
    ],
  },

  {
    id: 'fichiers',
    number: '07',
    title: 'Fichiers',
    shortTitle: 'Fichiers',
    description:
      'Lire, écrire, créer et fermer des fichiers en C avec les principales fonctions de gestion des flux.',
    prerequisite: 'stockage',
    status: 'locked',

    lessons: [
      {
        id: 'fichiers-introduction',
        number: '01',
        title: 'Notion de fichier',
        status: 'locked',

        topics: [
          'Fichiers textes',
          'Fichiers binaires',
          'Accès séquentiel',
          'Accès direct',
        ],
      },

      {
        id: 'fopen-fclose',
        number: '02',
        title: 'Ouverture et fermeture',
        status: 'locked',

        topics: [
          'FILE *',
          'fopen',
          'fclose',
          'NULL',
        ],
      },

      {
        id: 'lecture-ecriture',
        number: '03',
        title: 'Lecture et écriture',
        status: 'locked',

        topics: [
          'fprintf',
          'fscanf',
          'fgetc',
          'fputc',
        ],
      },

      {
        id: 'fread-fwrite',
        number: '04',
        title: 'Lecture et écriture de blocs',
        status: 'locked',

        topics: [
          'fread',
          'fwrite',
          'Nombre de données transférées',
        ],
      },
    ],

    exercises: [
      {
        id: 'fichiers-ex-01',
        title: 'Créer un répertoire',
        type: 'projet',
        difficulty: 'expert',
        statement:
          'Créer séquentiellement un fichier répertoire contenant pour chaque personne le nom, le prénom, l’âge et le numéro de téléphone.',
        skills: [
          'fopen',
          'fwrite',
          'fclose',
          'struct',
          'saisie',
        ],
      },
    ],
  },

  {
    id: 'maitrise',
    number: '08',
    title: 'Maîtrise et examens',
    shortTitle: 'Examens',
    description:
      'Mettre toutes les compétences en pratique dans des sujets sur feuille, sans compilateur et avec temps limité.',
    prerequisite: 'fichiers',
    status: 'locked',

    lessons: [
      {
        id: 'revision-generale',
        number: '01',
        title: 'Révision générale',
        status: 'locked',

        topics: [
          'Cours',
          'Syntaxe',
          'Analyse',
          'Raisonnement',
        ],
      },

      {
        id: 'analyse-code',
        number: '02',
        title: 'Analyse de programmes',
        status: 'locked',

        topics: [
          'Valeurs successives',
          'Boucles',
          'Conditions',
          'Fonctions',
          'Pointeurs',
        ],
      },

      {
        id: 'examen-blanc',
        number: '03',
        title: 'Examen blanc complet',
        status: 'locked',

        topics: [
          'Question de cours',
          'Analyse',
          'Écriture',
          'Débogage',
          'Temps limité',
        ],
      },
    ],

    exercises: [],
  },
]

/* =========================================================
   OUTILS DE RECHERCHE
   ========================================================= */

export function findModuleById(moduleId) {
  return (
    courseModules.find((module) => module.id === moduleId) ||
    null
  )
}

export function findLessonById(lessonId) {
  for (const module of courseModules) {
    const lesson = module.lessons.find(
      (item) => item.id === lessonId,
    )

    if (lesson) {
      return {
        ...lesson,
        moduleId: module.id,
        moduleNumber: module.number,
        moduleTitle: module.title,
      }
    }
  }

  return null
}

export function findExerciseById(exerciseId) {
  for (const module of courseModules) {
    const exercise = module.exercises.find(
      (item) => item.id === exerciseId,
    )

    if (exercise) {
      return {
        ...exercise,
        moduleId: module.id,
        moduleNumber: module.number,
        moduleTitle: module.title,
      }
    }
  }

  return null
}