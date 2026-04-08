# Simple Config Showcase

[![Codacy Badge](https://app.codacy.com/project/badge/Grade/bbfd73c1bff54a40a323b074a284092f)](https://app.codacy.com/gh/Aline86/simple_config_cms/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)
![License](https://img.shields.io/badge/license-CC%20BY--NC%204.0-blue)
![Next.js](https://img.shields.io/badge/Next.js-15+-black)
![TypeScript](https://img.shields.io/badge/TypeScript-84.6%25-blue)

[<img src="https://flagcdn.com/w20/fr.png" alt="FR"> Français](README.md) | [<img src="https://flagcdn.com/w20/gb.png" alt="EN"> English](README.en.md)

Configurable CMS with real-time preview, built with Next.js. Used in production by **Welcome Poitiers association** since January 2025.

---

## Table of contents

- [Overview](#overview)
- [Features](#features)
- [Tech stack](#tech-stack)
- [Architecture](#architecture)
- [Installation](#installation)
- [Adding a block](#adding-a-block)
- [Validation system](#validation-system)
- [Code quality](#code-quality)
- [Tests](#tests)
- [Support](#support)

---

## Overview

Simple Config CMS is a configurable declarative engine based on a **typed dynamic resolution system** (using semantic prefixes), integrating an immutable tree update mechanism by path and a generic modular validation system.

It allows non-technical users to easily create and modify showcase websites through a modular interface, without writing any code.

## Website demo link

<a href="https://simple-config-cms.vercel.app" target="_blank">You can look at the demo website by clicking this link</a>

## Presentation of the FO / BO

[<img src="docs/edition_bloc.gif" >](Gif_presentation)

### History

| Period                | Event                                      |
| --------------------- | ------------------------------------------ |
| January 2025          | V1 launched in production                  |
| Jan. 2025 – Feb. 2026 | User feedback, bug fixes, optimizations    |
| February 2026         | V2 deployment — full rewrite, optimized UX |

### Measured impact (V1 → V2)

- **Page creation time**: -60% (30 min → 12 min)
- **Input errors**: -75% (instant validation)
- **Quality score**: 9.84/10 (CodeScene)

---

## Features

- Synchronized real-time preview (WYSIWYG with no network latency)
- Modular and extensible block system
- Instant data validation before saving
- Drag & drop with automatic position recalculation
- Media management via Cloudinary (auto-optimization, integrated picker)
- Data-driven architecture entirely driven by the database

---

## Tech stack

| Layer     | Technology                    |
| --------- | ----------------------------- |
| Framework | Next.js 15+ (App Router, RSC) |
| Language  | TypeScript                    |
| Database  | PostgreSQL (Neon)             |
| ORM       | Prisma                        |
| Media     | Cloudinary                    |
| State     | Immer + Context API           |
| Tests     | Jest                          |
| Quality   | Codacy, CodeScene             |

---

## Architecture

### Overview

```
┌─────────────────────────────────────────────────────────┐
│                    Editing interface                     │
│  ┌─────────────────┐         ┌──────────────────┐       │
│  │   Form Editor   │─onChange─│  Preview Panel   │       │
│  │  (inputs, drag) │         │  (render live)   │       │
│  └────────┬────────┘         └──────────────────┘       │
│           │ updateByPath(path, value)                    │
│           ▼                                              │
│  ┌──────────────────────────────────────────────────┐   │
│  │        Centralized state (Immer + Context)        │   │
│  │  - Full page in memory                            │   │
│  │  - Immutable update by path                       │   │
│  │  - Bidirectional synchronization                  │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

### Data flow

```
Database (Prisma)
        │ SELECT * FROM blocks ORDER BY position
        ▼
  Server Action / API Route
        │
        ▼
  Page Component (SSR)
        │ map(renderBlock)
        ▼
  Block Registry (type + name)
        │ Mapping to component
        ▼
  React Component (Hero, Gallery…)
```

### Immutable path-based updates

Each modification is defined by a **text path** (`blocs.0.text_titre`) and a target value. Immer produces a new state without direct mutation, guaranteeing immutability and predictability.

### Factory pattern

Block creation relies on a centralized Factory pattern, making the feature testable and decoupling the rendering engine from concrete implementations.

### Typed prefixes

Fields are semantically prefixed: `text_`, `number_`, `checkbox_`, `image_`, `color_`. These prefixes allow the system to:

- automatically determine the type of validation to apply
- generate the correct editing component (text input, number, checkbox, color picker, image upload)
- ensure consistency between validation and the user interface

---

## Installation

### Prerequisites

- Docker **or** Node.js 20+ with PostgreSQL / Neon (production)

### Steps

**1. Clone the project**

```bash
git clone https://github.com/Aline86/simple_config_cms.git
cd simple_config_cms
```

**2. Configure environment variables**

Create a `.env` file at the root of the project:

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000

JWT_SECRET=your_random_secret_string

# Retrieved from https://console.cloudinary.com
# (gear icon → API Keys → Generate New Api Key)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
NEXT_PUBLIC_CLOUDINARY_UPLOAD_FOLDER=
```

> ⚠️ Also create an **unsigned preset** on Cloudinary for the image picker to work properly.

**3. Run with Docker**

```bash
docker compose build
docker compose up
```

PostgreSQL table creation and a test user are automated via a seed script.

**4. Log in**

Access the back-office at [http://localhost:3000/login](http://localhost:3000/login):

```
login    : test@test.com
password : test1234
```

> 💡 Make sure to check **Home page** on one of the pages in the editor (`/edition/pages`) so that the site root displays content.

---

## Adding a block

Adding a new block type is done in **4 steps**:

**1. Declare the type in the enum**

```typescript
// database/model/Page.tsx
export enum TypeBloc {
  CAROUSEL = "CAROUSEL",
  // ... existing types
  MY_NEW_BLOCK = "MY_NEW_BLOCK",
}
```

**2. Create its options in the choice modal**

In `components/modals/PageChoiceModal.tsx`, define the block options and add its button:

```tsx
<button
  aria-label="Create a Custom block"
  className="px-4 py-4 rounded bg-slate-600 text-white text-lg hover:bg-slate-700 transition"
  onClick={() => addBlocToPage(options_my_new_block)}
>
  My new block
</button>
```

**3. Create the editing and showcase components**

- Editing file: `components/contextView/edition/`
- Showcase file: `components/contextView/showcase/`

**4. Register the block in the registry**

In `lib/config/componentsView.tsx`:

```typescript
blocksToRender: {
  // is_custom: false if the block follows the standard display pattern
  // is_custom: true if the block has a specific custom editing template
  MY_NEW_BLOCK: {
    is_custom: false;
  }
}

blocksFrontToRender: {
  MY_NEW_BLOCK: MyNewBlockShowcase;
}
```

---

## Validation system

The project relies on an abstract `BaseValidator` class from which all models inherit. Each field is automatically associated with a dedicated validator through its prefix and configuration, applying the appropriate Zod validation rules.

Key advantages: reusability, strong typing, independent testability, and simple extensibility.

---

## Code quality

Monitored via **Codacy** and **CodeScene**:

| Metric              | Value         |
| ------------------- | ------------- |
| Overall Code Health | **9.84 / 10** |
| Status              | ✅ Healthy    |
| Files at risk       | None          |

Identified areas for improvement:

- Reducing duplication on certain blocks
- Progressive introduction of automated tests

---

## Tests

Tests cover block creation and path-based updates within nested data structures.

```bash
# Run tests
npm run test

# Clear Jest cache before running tests
npm test -- --clearCache
```

Tests are located in the `__tests__/` folder and managed with **Jest**.

---

## Support

- Open an **[Issue on GitHub](https://github.com/Aline86/simple_config_cms/issues)**
- Check the documentation in `/docs`
- Read the contribution guide in [CONTRIBUTING.md](./Contributing.md)

---
