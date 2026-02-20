# Configurable Next.js Site (CMS)

## Overview

This project is a lightweight, configurable CMS built with Next.js, enabling easy creation of dynamic showcase websites. Pages are fully driven by configuration stored in a database (Prisma + PostgreSQL). Each page consists of blocks, defined by a type (component family) and a bloc_name (variant).

Blocks are automatically sorted and rendered based on a `position` field updated during CRUD operations.  
Database queries retrieve blocks ordered by `bloc_page_position` ascending, enabling rendering **without complex business logic or scattered conditional statements**.

This CMS with live preview allows you to create showcase websites in real time. The code is designed to be extensible so it can be easily modified. It is thus possible to add a new block easily. You just need to add a block type in:


```
database/model/Page.tsx

export enum TypeBloc {
  CAROUSEL = "CAROUSEL",
  IMAGE_GROUPE = "IMAGE_GROUPE",
  TEXTE = "TEXTE",
  BUTTON = "BOUTON",
  SCREEN = "SCREEN",
  VIDEO = "VIDEO",
  HEADER = "HEADER",
  FOOTER = "FOOTER",
}

```

Then create its options in ```components\modals\PageChoiceModal.tsx``` and add its associated button based on the existing buttons in the file:

```
   <button
     aria-label="Créer un bloc Custom avec options ...."
     className="px-4 py-4 rounded bg-slate-600 text-white text-lg hover:bg-slate-700 transition"
     onClick={() => {
       addBlocToPage(options_custom_bloc);
     }}
   >
     Texte
   </button>
```

Next, create its editing and display files in components/contextView/edition and components/contextView/showcase, following the logic of the existing edition files for your newly created custom block edition file.

Finally, to make the block appear when clicking the button in the block choice modal, edit the file lib\config\componentsView.tsx:

blocksToRender: add your block here.

If it follows the usual display pattern, set is_custom: false.

If you create a complex editing block, like the text editor, set is_custom: true.
This allows you to add a custom edition template, which you can assign to the name of your custom block — this corresponds to the text_nom_bloc option chosen during step 2 in PageChoiceModal.tsx.

Finally add your showcase visualization file in blocksFrontToRender following the pattern.

## Business objective

The goal is to enable non-technical users to easily modify page content and structure via a modular interface without coding. The CMS automatically generates the UI and validates data, ensuring consistency between configuration and rendering.

# To view the project, you can use a **Docker** development environment

## Configure environment variables

Create a `.env` file at the root of the project and add the following variables to run the project in a development environment:

The environment variables are as follows:

```
NEXT_PUBLIC_APP_URL: URL of your app (local or production depending on the environment)
JWT_SECRET: a random string known only to you
```

The four Cloudinary variables can be obtained as follows:

- Create an account on Cloudinary: https://console.cloudinary.com

```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME:
CLOUDINARY_API_KEY:
CLOUDINARY_API_SECRET:
NEXT_PUBLIC_CLOUDINARY_UPLOAD_FOLDER:
```

To retrieve the four values for the variables above, follow these instructions:

![Cloudinary pres](./docs/cloudinary_api_key.png)

(gear icon, API Keys, then Generate New API Key)

You will then need to create an unsigned preset:

![Cloudinary explanation](./docs/unigned_preset.png)

These steps allow the Cloudinary picker used in the app to work for uploading images to your newly created Cloudinary cloud:

![Cloudinary pres](./docs/cloudinary_picker.png)

Once this step is completed, you can run the following commands:

`docker compose build`  
`docker compose up`

The creation of PostgreSQL database tables is automated, as well as the creation of a user using a seed script.

You can access the back office at http://localhost:3000/login using the following credentials:

- login: test@test.com
- password: test1234

Remember to check `Home page` on one of the pages in the edition section at http://localhost:3000/edition/pages so that the root of the site displays content.

### Development

`npm prisma studio`

## Architecture

The architecture is **data-driven, maintainable, and extensible**, and includes:

- **Enums** to secure block types
- A **robust validation system** based on `BaseValidator` and field prefixes, enabling modular and reusable validation
- **Typed prefixes** (`text_`, `number_`, `checkbox_`, `image_`, `color_`) used to:
  - automatically determine which validation rules to apply
  - generate the appropriate editing component (text input, number input, checkbox, color picker, image upload)
  - ensure consistency between validation logic and the user interface
- **Centralized error handling** for consistent user feedback
- Medias are managed via Cloudinary, enabling efficient handling of large files, automatic optimization, and on-the-fly transformations, while keeping the database lightweight and the CMS fast.

---

### Justification

- **Integrated frontend and backend**  
  Next.js handles both React rendering and database access via Prisma.

- **Monolithic yet modular**  
  Each block is isolated, testable, and extensible, while remaining within a single project.

- **No microservices**  
  Unnecessary here, as business logic is minimal and the rendering engine is self-sufficient.

- **Data-driven architecture**  
  Rendering is driven by database configuration, allowing layout and content changes without modifying code.

- **Modular validation**  
  A prefix-based validator system enables consistent validation of any data structure.

- **Maintainable and scalable**  
  Clear separation into components, hooks, libraries, utilities, and validators helps manage complexity.

---

## Critical analysis and challenges encountered

Code duplication in some similar blocks, due to the data-driven structure

Fine-grained validation management for different field types using BaseValidator and prefixes, requiring a flexible but complex system

Maintaining strong consistency between configuration, validation, and UI rendering

Solutions implemented

Central registry to map types → components

Typed prefixes to automate validation and generate the correct editing inputs

Strict TypeScript checks to ensure data robustness

Quality monitoring with Codacy and CodeScene, tracking complexity and duplication metrics

## Technical Stack

- **Main framework**: Next.js 15+ (App Router, React Server Components)
- **Database**: PostgreSQL (Neon)
- **ORM**: Prisma
- **Validation**: Custom validation system using `BaseValidator` and prefixes
- **Component architecture**:
  - Each block has a `type` and a `name`
  - Components are rendered automatically based on database-defined order
  - Mapping `model.type.bloc_name → component` via a **registry**
- **Enums**: Used to secure block types and improve autocompletion
- **TypeScript**: Strict typing for code safety

---

## General Principle

- **Data-driven project**: everything is controlled by configuration
- **No complex business logic**: blocks are rendered as-is
- **Declarative validation**: validation rules are defined modularly using prefixes
- Rendering decisions depend solely on data retrieved from the database
- The frontend acts as a **pure rendering engine**
- Validators ensure data integrity before persistence

---

## Site data UML Diagram

The database schema illustrates the relationships between the main system entities:

![UML Diagram](./docs/uml-diagram.png)

### Main Entities

#### **Page**

- Central entity representing a website page
- Contains metadata (title, slug, publication status, mode)
- Relationships: can have multiple `Header`, `Footer`, and `Bloc` entries

#### **Bloc**

- Represents a configurable content block
- Key properties:
  - `text_nom_bloc`: unique block type identifier (`TypeBloc` enum)
  - `text_titre`: block title
  - `text_type`: block variant
  - `number_bloc_position`: display order
  - `checkbox_is_full_width`: full-width display flag
  - `text_langue_bloc`: content language
- Relationships:
  - Belongs to a `Page`
  - Can contain multiple `Media` and `Article` entities

#### **Header and Footer**

- Reusable layout components
- Contain their own media (logos, images)
- Related to a `Page`

#### **Media**

- Media asset management (images, videos)
- Properties:
  - `text_titre`: media title
  - `text_image_lien`: URL or path
  - `number_position_image`: display order
- Relationships: can belong to a `Bloc`, `Header`, `Footer`, or `Article`

#### **Article**

- Structured textual content
- Properties:
  - `text_article`: article content
  - `number_width` and `number_height`: dimensions
  - `number_position_article`: display order
- Relationships:
  - Belongs to a `Bloc`
  - Can contain multiple `Media` entries

#### **TypeBloc (Enum)**

- Available block types:
  - `CAROUSEL`
  - `IMAGE_GROUPE`
  - `TEXTE`
  - `SCREEN`
  - `VIDEO`
  - `BOUTON`

#### **BaseValidator**

- Abstract class for data validation
- Main method: `validateAll()` with prefix support
- All entities are validated before database persistence

---

## Project Structure

![Project structure](./docs/project-structure.png)

## Data Flow

```
┌─────────────────┐
│   Database      │
│   (Prisma)      │
└────────┬────────┘
         │
         │ SELECT * FROM blocks ORDER BY bloc_page_position
         │
         ▼
┌─────────────────┐
│ Server Action   │
│ or API Route    │
└────────┬────────┘
         │
         │ Data retrieved via Prisma from Neon
         │
         ▼
┌─────────────────┐
│ Page Component  │
│   (SSR)         │
└────────┬────────┘
         │
         │ map(renderBlock)
         │
         ▼
┌─────────────────┐
│ Block Registry  │
│ type + name     │
└────────┬────────┘
         │
         │ Mapping to component
         │
         ▼
┌─────────────────┐
│ React Component │
│ (Hero, Gallery) │
└─────────────────┘
```

## Code Quality & Metrics

### Code quality metrics are monitored using Codacy and CodeScene, to evaluate maintainability, complexity, and overall code health.

- # Codacy Overview

![Codacy dashboard](./docs/codacy-dashboard.png)

Issues: 5.007 / kLoC

Complexity: 7% (low)

Duplication: 26%
Mainly due to repetitive data-driven component patterns and block variants

Coverage: not measured

- # CodeScene Health

![Codescene dashboard](./docs/codescene.png)

![Codescene code health](./docs/codescene-code-health.png)

Overall Code Health: 9.84 / 10 – Healthy

Majority of files classified as healthy

Very few risky or problematic areas

Overall Assessment

Readable and maintainable codebase

Low complexity

Cohesive and well-structured architecture

Duplication to monitor (acceptable for a configurable CMS)

Automated tests to be added to improve coverage

## Conclusion

The metrics confirm that the project is built on a solid and healthy foundation, with a robust and scalable data-driven architecture.

Future priorities mainly include:

reducing duplication across certain blocks

progressively introducing automated tests
