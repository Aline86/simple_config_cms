# Simple Config CMS

[![Codacy Badge](https://app.codacy.com/project/badge/Grade/bbfd73c1bff54a40a323b074a284092f)](https://app.codacy.com/gh/Aline86/simple_config_cms/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)
![License](https://img.shields.io/badge/license-CC%20BY--NC%204.0-blue)
![Next.js](https://img.shields.io/badge/Next.js-15+-black)
![TypeScript](https://img.shields.io/badge/TypeScript-84.6%25-blue)

[<img src="https://flagcdn.com/w20/fr.png" alt="FR"> Français](README.md) | [<img src="https://flagcdn.com/w20/gb.png" alt="EN"> English](README.en.md)

CMS configurable avec prévisualisation en temps réel, conçu en Next.js. Utilisé en production par l'**association Welcome Poitiers** depuis janvier 2025.

---

## Table des matières

- [Présentation](#présentation)
- [Fonctionnalités](#fonctionnalités)
- [Stack technique](#stack-technique)
- [Architecture](#architecture)
- [Installation](#installation)
- [Ajouter un bloc](#ajouter-un-bloc)
- [Système de validation](#système-de-validation)
- [Qualité du code](#qualité-du-code)
- [Tests](#tests)
- [Support](#support)

---

## Présentation

Simple Config CMS est un moteur déclaratif configurable reposant sur un **système de résolution dynamique typé** (basé sur des préfixes sémantiques), intégrant un mécanisme de mise à jour immutable d'arbre par chemins et un système de validation modulaire générique.

Il permet à des utilisateurs non techniques de créer et modifier facilement des sites vitrines via une interface modulaire, sans écrire de code.

### Historique

| Période               | Événement                                        |
| --------------------- | ------------------------------------------------ |
| Janvier 2025          | Mise en production V1                            |
| Jan. 2025 – Fév. 2026 | Retours utilisateurs, corrections, optimisations |
| Février 2026          | Déploiement V2 — refonte complète, UX optimisée  |

---

## Fonctionnalités

- Prévisualisation synchronisée en temps réel (WYSIWYG sans latence réseau)
- Système de blocs modulaire et extensible
- Validation instantanée des données avant sauvegarde
- Drag & drop avec recalcul automatique des positions
- Gestion des médias via Cloudinary (optimisation auto, picker intégré)
- Architecture data-driven pilotée entièrement par la base de données

---

## Stack technique

| Couche          | Technologie                   |
| --------------- | ----------------------------- |
| Framework       | Next.js 15+ (App Router, RSC) |
| Langage         | TypeScript                    |
| Base de données | PostgreSQL (Neon)             |
| ORM             | Prisma                        |
| Médias          | Cloudinary                    |
| État            | Immer + Context API           |
| Tests           | Jest                          |
| Qualité         | Codacy, CodeScene             |

---

## Architecture

### Vue d'ensemble

```
┌─────────────────────────────────────────────────────────┐
│                  Interface d'édition                     │
│  ┌─────────────────┐         ┌──────────────────┐       │
│  │   Form Editor   │─onChange─│  Preview Panel   │       │
│  │  (inputs, drag) │         │  (render live)   │       │
│  └────────┬────────┘         └──────────────────┘       │
│           │ updateByPath(path, value)                    │
│           ▼                                              │
│  ┌──────────────────────────────────────────────────┐   │
│  │          État centralisé (Immer + Context)        │   │
│  │  - Page complète en mémoire                       │   │
│  │  - Mise à jour immutable par chemin               │   │
│  │  - Synchronisation bidirectionnelle               │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

### Flux de données

```
Base de données (Prisma)
        │ SELECT * FROM blocks ORDER BY position
        ▼
  Server Action / API Route
        │
        ▼
  Page Component (SSR)
        │ map(renderBlock)
        ▼
  Block Registry (type + name)
        │ Mapping vers composant
        ▼
  React Component (Hero, Gallery…)
```

### Mise à jour immutable par chemin

Chaque modification est définie par un **chemin textuel** (`blocs.0.text_titre`) et une valeur cible. Immer produit un nouvel état sans mutation directe, garantissant immutabilité et prévisibilité.

### Pattern Factory

La création des blocs repose sur un pattern Factory centralisé, ce qui rend la fonctionnalité testable et découple le moteur de rendu des implémentations concrètes.

### Préfixes typés

Les champs sont préfixés de manière sémantique : `text_`, `number_`, `checkbox_`, `image_`, `color_`. Ces préfixes permettent de :

- déterminer automatiquement le type de validation à appliquer
- générer le bon composant d'édition (input text, number, checkbox, color picker, upload d'image)
- assurer la cohérence entre validation et interface utilisateur

---

## Installation

### Prérequis

- Docker **ou** Node.js 20+ avec PostgreSQL / Neon (production)

### Étapes

**1. Cloner le projet**

```bash
git clone https://github.com/Aline86/simple_config_cms.git
cd simple_config_cms
```

**2. Configurer les variables d'environnement**

Créer un fichier `.env` à la racine du projet :

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000

JWT_SECRET=votre_chaine_aleatoire_secrete

# Récupérées depuis https://console.cloudinary.com
# (roue crantée → API Keys → Generate New Api Key)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
NEXT_PUBLIC_CLOUDINARY_UPLOAD_FOLDER=
```

> ⚠️ Pensez également à créer un **preset unsigned** sur Cloudinary pour que le picker d'images fonctionne.

**3. Lancer avec Docker**

```bash
docker compose build
docker compose up
```

La création des tables PostgreSQL et d'un utilisateur de test est automatisée via un script de seed.

**4. Se connecter**

Accédez au back-office sur [http://localhost:3000/login](http://localhost:3000/login) :

```
login    : test@test.com
password : test1234
```

> 💡 Pensez à cocher **Page d'accueil** sur l'une des pages dans l'édition (`/edition/pages`) pour que la racine du site affiche un contenu.

---

## Ajouter un bloc

L'ajout d'un nouveau type de bloc se fait en **4 étapes** :

**1. Déclarer le type dans l'enum**

```typescript
// database/model/Page.tsx
export enum TypeBloc {
  CAROUSEL = "CAROUSEL",
  // ... types existants
  MON_NOUVEAU_BLOC = "MON_NOUVEAU_BLOC",
}
```

**2. Créer ses options dans la modal de choix**

Dans `components/modals/PageChoiceModal.tsx`, définir les options du bloc et ajouter son bouton :

```tsx
<button
  aria-label="Créer un bloc Custom"
  className="px-4 py-4 rounded bg-slate-600 text-white text-lg hover:bg-slate-700 transition"
  onClick={() => addBlocToPage(options_mon_nouveau_bloc)}
>
  Mon nouveau bloc
</button>
```

**3. Créer les composants d'édition et de visualisation**

- Fichier d'édition : `components/contextView/edition/`
- Fichier de visualisation : `components/contextView/showcase/`

**4. Enregistrer le bloc dans le registry**

Dans `lib/config/componentsView.tsx` :

```typescript
blocksToRender: {
  // is_custom: false si le bloc suit le pattern d'affichage habituel
  // is_custom: true si le bloc possède un template d'édition spécifique
  MON_NOUVEAU_BLOC: {
    is_custom: false;
  }
}

blocksFrontToRender: {
  MON_NOUVEAU_BLOC: MonNouveauBlocShowcase;
}
```

---

## Système de validation

Le projet repose sur une classe abstraite `BaseValidator` dont héritent tous les modèles. Chaque champ est automatiquement associé à un validateur dédié grâce à son préfixe et à sa configuration, permettant d'appliquer une validation Zod adaptée.

Avantages : réutilisabilité, typage fort, testabilité indépendante, extensibilité simple.

---

## Qualité du code

Suivi via **Codacy** et **CodeScene** :

| Métrique           | Valeur        |
| ------------------ | ------------- |
| Code Health global | **9.84 / 10** |
| Statut             | ✅ Healthy    |
| Fichiers à risque  | Aucun         |

Axes d'amélioration identifiés :

- Réduction de la duplication sur certains blocs
- Introduction progressive de tests automatisés

---

## Tests

Des tests couvrent la création de blocs et la mise à jour par chemin dans la structure imbriquée.

```bash
# Lancer les tests
npm run test

# Vider le cache Jest avant de jouer les tests
npm test -- --clearCache
```

Les tests sont situés dans le dossier `__tests__/` et gérés avec **Jest**.

---

## Support

- Ouvrir une **[Issue sur GitHub](https://github.com/Aline86/simple_config_cms/issues)**
- Consulter la documentation dans `/docs`
- Consulter le guide de contribution dans [CONTRIBUTING.md](./Contributing.md)

---

## Licence

Ce projet est distribué sous licence **[Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)](./License.md)**.  
Usage commercial interdit sans autorisation explicite.
