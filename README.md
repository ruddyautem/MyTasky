# My Tasky

<div align="center">

**[Français](#français)** · **[English](#english)**

</div>

---

## Français

### Présentation

My Tasky est une petite application bilingue de gestion de tâches personnelles. Elle rassemble l'ajout, le suivi et l'organisation des tâches dans une seule interface, utilisable sur mobile comme sur ordinateur. Les tâches et le choix du thème restent enregistrés dans le navigateur, sans compte à créer.

L'interface est disponible en français (`/fr`) et en anglais (`/en`) sur [mytasky.autem.dev](https://mytasky.autem.dev).

### Fonctionnalités

- **Gérer les tâches** : ajouter, modifier directement dans la liste, marquer comme terminée ou supprimer une tâche.
- **Agir sur plusieurs tâches** : marquer toutes les tâches comme terminées ou non terminées, puis supprimer les tâches terminées en une fois.
- **Retrouver l'essentiel** : filtres *Toutes les tâches*, *Tâches à faire* et *Tâches terminées*, avec compteurs et barre de progression.
- **Changer de thème** : mode clair ou sombre, avec une transition circulaire qui part du bouton. Lors de la première visite, le thème suit la préférence du système.
- **Changer de langue** : boutons avec les drapeaux français et britannique de Portfolio ; tous les textes de l'interface, les dates et les métadonnées sont traduits avec `next-intl`.
- **Utiliser le clavier** : `Entrée` enregistre une modification et `Échap` l'annule. Les contrôles principaux disposent de libellés accessibles.

### Stockage des données

Les tâches sont enregistrées dans le `localStorage` du navigateur après le chargement de la page. Le thème y est enregistré séparément. Il n'y a ni compte, ni base de données, ni synchronisation entre appareils : effacer les données du site dans le navigateur efface aussi les tâches enregistrées.

### Stack technique

| Catégorie | Technologie |
| --- | --- |
| Framework | Next.js 16 (App Router) |
| Interface | React 19, Lucide React |
| Langage | TypeScript 6 |
| Styles | Tailwind CSS 4 |
| Traductions et routage | next-intl (FR/EN) |
| Gestionnaire de paquets | Bun (`bun.lock`) |
| Qualité du code | ESLint avec `eslint-config-next` |

### Structure du projet

```text
mytasky/
├── public/fr.svg, en.svg          # Icônes des langues issues de Portfolio
├── src/
│   ├── app/
│   │   ├── [locale]/             # Pages et métadonnées françaises/anglaises
│   │   ├── globals.css           # Tailwind et animation du thème
│   │   └── icon.svg              # Icône du site
│   ├── components/               # Tâches, filtres, progression, thème et langue
│   ├── hooks/useTasks.ts         # État, actions et persistance des tâches
│   ├── i18n/                     # Configuration des locales et du routage
│   ├── messages/fr.json, en.json # Traductions de l'interface
│   ├── proxy.ts                  # Détection des routes localisées
│   └── types/task.ts             # Types des tâches et des filtres
├── eslint.config.mjs             # Configuration ESLint
├── next.config.ts                # Configuration Next.js
├── package.json                  # Dépendances et scripts
└── bun.lock                      # Versions verrouillées par Bun
```

### Lancer le projet

Installez [Bun](https://bun.sh/), puis exécutez ces commandes à la racine du dépôt :

```bash
bun install
bun run dev
```

Ouvrez [http://localhost:3000/fr](http://localhost:3000/fr) ou [http://localhost:3000/en](http://localhost:3000/en). La racine `/` redirige vers `/fr`. Aucune variable d'environnement n'est nécessaire pour utiliser l'application localement.

Pour vérifier le code et lancer une version de production :

```bash
bun run lint
bun run build
bun run start
```

Le dépôt ne définit pas encore de script de tests automatisés ; `lint` et `build` sont les vérifications disponibles.

### À propos

Je suis Ruddy Autem, développeur Full Stack. Retrouvez mes autres projets sur [autem.dev](https://autem.dev) et [GitHub](https://github.com/ruddyautem).

---

## English

### Overview

My Tasky is a small bilingual personal task manager. It brings task creation, tracking, and organization into one responsive interface. Tasks and theme preferences are saved in the browser, with no account required.

The interface is available in French (`/fr`) and English (`/en`) at [mytasky.autem.dev](https://mytasky.autem.dev).

### Features

- **Manage tasks**: add, edit directly in the list, mark as complete, or delete individual tasks.
- **Take bulk actions**: mark all tasks as complete or incomplete, then remove completed tasks in one action.
- **Track progress**: switch between *All tasks*, *Tasks to do*, and *Completed tasks* filters, with live counts and a progress bar.
- **Switch themes**: choose light or dark mode with a circular reveal from the toggle button. On a first visit, the app follows the system preference.
- **Switch languages**: buttons use Portfolio's French and British flag icons; `next-intl` translates every interface label, date, and page description.
- **Use the keyboard**: `Enter` saves an edit and `Escape` cancels it. The main controls have accessible labels.

### Data storage

Tasks are saved to the browser's `localStorage` after the page loads. The theme preference is stored separately. There is no account, database, or cross-device sync: clearing this site's browser data also removes the saved tasks.

### Tech stack

| Category | Technology |
| --- | --- |
| Framework | Next.js 16 (App Router) |
| Interface | React 19, Lucide React |
| Language | TypeScript 6 |
| Styling | Tailwind CSS 4 |
| Translations and routing | next-intl (FR/EN) |
| Package manager | Bun (`bun.lock`) |
| Code quality | ESLint with `eslint-config-next` |

### Project structure

```text
mytasky/
├── public/fr.svg, en.svg          # Language icons from Portfolio
├── src/
│   ├── app/
│   │   ├── [locale]/             # Localized pages and metadata
│   │   ├── globals.css           # Tailwind and theme animation
│   │   └── icon.svg              # Site icon
│   ├── components/               # Tasks, filters, progress, theme, and language
│   ├── hooks/useTasks.ts         # Task state, actions, and persistence
│   ├── i18n/                     # Locale and routing configuration
│   ├── messages/fr.json, en.json # Interface translations
│   ├── proxy.ts                  # Localized route handling
│   └── types/task.ts             # Task and filter types
├── eslint.config.mjs             # ESLint configuration
├── next.config.ts                # Next.js configuration
├── package.json                  # Dependencies and scripts
└── bun.lock                      # Bun lockfile
```

### Run locally

Install [Bun](https://bun.sh/), then run these commands from the repository root:

```bash
bun install
bun run dev
```

Open [http://localhost:3000/fr](http://localhost:3000/fr) or [http://localhost:3000/en](http://localhost:3000/en). The root path `/` redirects to `/fr`. No environment variables are required to use the app locally.

To check the code and run a production build:

```bash
bun run lint
bun run build
bun run start
```

There is no automated test script yet; `lint` and `build` are the available checks.

### About me

I'm Ruddy Autem, a Full Stack developer. You can find my other projects at [autem.dev](https://autem.dev) and on [GitHub](https://github.com/ruddyautem).
