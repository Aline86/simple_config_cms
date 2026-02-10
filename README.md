[<img src="https://flagcdn.com/w20/fr.png" alt="FR"> Français](README.md) | [<img src="https://flagcdn.com/w20/gb.png" alt="EN"> English](README.en.md)

# Site Configurable Next.js (CMS)

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/6bc70256343648c0bbf6b554008e3653)](https://app.codacy.com/gh/Aline86/simple_config_cms?utm_source=github.com&utm_medium=referral&utm_content=Aline86/simple_config_cms&utm_campaign=Badge_Grade)

## Résumé

Ce projet est un CMS léger et configurable, réalisé en Next.js, permettant de créer facilement des sites vitrines dynamiques. Toutes les pages sont entièrement pilotées par une configuration stockée en base de données (Prisma + PostgreSQL). Chaque bloc est défini par un `type` (famille de composants) et un `bloc_name` (variante). Les composants sont triés et affichés automatiquement selon le champ position mis à jour lors des opérations de CRUD, les requêtes en base récupèrent les blocs ordonnés selon ce critère 'bloc_page_position' asc, sans logique métier complexe.

## Objectif métier

L’objectif est de permettre à des utilisateurs non techniques de modifier facilement le contenu et la structure des pages via une interface modulaire, sans écrire de code. Le CMS génère automatiquement l’interface utilisateur et valide les données, garantissant la cohérence entre configuration et rendu.

## Architecture

L'architecture est **data-driven, maintenable et extensible**, avec :

- **Enums** pour sécuriser les types de blocs
- **Système de validation robuste** avec `BaseValidator` et préfixes pour une validation modulaire et réutilisable
- Préfixes typés (text\_, number\_, checkbox\_, image\_, color\_) qui servent à :
  **Déterminer automatiquement le type de validation à appliquer,
  Générer le bon composant d'édition (input text, number, checkbox, color picker, upload d'image),
  Assurer la cohérence entre validation et interface utilisateur**
- **Gestion des erreurs centralisée** pour un retour utilisateur cohérent
- Les médias sont gérés via Cloudinary, permettant la gestion efficace de fichiers volumineux, l’optimisation automatique et la transformation à la volée, tout en gardant la base de données légère et le CMS rapide.

---

## Type d'architecture

**Monolithique data-driven (frontend + backend dans le même projet)**

### Justification

- **Frontend et backend intégrés** : Next.js gère à la fois le rendu React et l'accès à la base via Prisma
- **Monolithique mais modulable** : chaque bloc est isolé, testable et extensible, mais tout est contenu dans un seul projet
- **Pas de microservices** : inutile ici, car la logique métier est quasi inexistante et le moteur de rendu est auto-suffisant
- **Data-driven** : l'architecture repose sur la configuration stockée en BDD, permettant de modifier le rendu sans toucher au code
- **Validation modulaire** : système de validateurs avec préfixes permettant de valider n'importe quelle structure de données de manière cohérente
- **Maintenable et évolutif** : découpage en composants, hooks, lib, utils et validateurs pour gérer la complexité

---

## Analyse critique et défis rencontrés

Duplication de code dans certains blocs similaires, due à la structure data-driven

Gestion des validations selon les types de champs avec BaseValidator et préfixes, nécessitant un système flexible mais complexe

Maintenir une cohérence forte entre configuration, validation et rendu UI

Solutions apportées

Utilisation d’un registry central pour mapper types → composants

Préfixes typés pour automatiser la validation et la génération des inputs d’édition

Contrôle strict avec TypeScript pour garantir la robustesse des données

Monitoring qualité avec Codacy et CodeScene, suivi de métriques de complexité et duplication

## Stack technique

- **Framework principal :** Next.js 15+ (App Router, React Server Components)
- **Base de données :** PostgreSQL (Neon)
- **ORM :** Prisma
- **Validation :** Système custom avec `BaseValidator` et préfixes
- **Architecture des composants :**
  - Chaque bloc a un `type` et un `name`
  - Les composants sont rendus automatiquement selon l'ordre défini en BDD
  - Mapping `model.type.bloc_name → composant` via un **registry**
- **Enums :** utilisés pour sécuriser les types de blocs et faciliter l'autocomplétion
- **TypeScript :** typage strict pour la sécurité du code

---

## Principe général

- Projet **data-driven** : tout est piloté par la configuration
- **Absence de logique métier complexe** : les blocs sont affichés tels quels
- **Validation déclarative** : les règles de validation sont définies de manière modulaire avec préfixes
- Les décisions de rendu dépendent uniquement des données provenant de la base
- Le frontend agit comme un **moteur de rendu pur**
- Les validateurs assurent l'intégrité des données avant persistance

---

## Diagramme UML de la base de données

Le schéma de base de données illustre les relations entre les différentes entités du système :

![Diagramme UML](./docs/uml-diagram.png)

### Entités principales

#### **Page**

- Entité centrale représentant une page du site
- Contient les métadonnées (titre, slug, publication, mode)
- Relations : peut avoir plusieurs `Header`, `Footer` et `Bloc`

#### **Bloc**

- Représente un bloc de contenu configurable
- Propriétés clés :
  - `text_nom_bloc` : identifiant unique du type de bloc (TypeBloc enum)
  - `text_titre` : titre du bloc
  - `text_type` : sous-type ou variante du bloc
  - `number_bloc_position` : ordre d'affichage
  - `checkbox_is_full_width` : affichage pleine largeur
  - `text_langue_bloc` : langue du contenu
- Relations :
  - Appartient à une `Page`
  - Peut contenir plusieurs `Media` et `Article`

#### **Header et Footer**

- Composants de layout réutilisables
- Contiennent leurs propres médias (logos, images)
- Relations : liés à une `Page`

#### **Media**

- Gestion des ressources média (images, vidéos)
- Propriétés :
  - `text_titre` : titre du média
  - `text_image_lien` : URL ou chemin
  - `number_position_image` : ordre d'affichage
- Relations : peut appartenir à un `Bloc`, `Header`, `Footer` ou `Article`

#### **Article**

- Contenu textuel structuré
- Propriétés :
  - `text_article` : contenu de l'article
  - `number_width` et `number_height` : dimensions
  - `number_position_article` : ordre d'affichage
- Relations :
  - Appartient à un `Bloc`
  - Peut contenir plusieurs `Media` (images intégrées)

#### **TypeBloc (Enum)**

- Énumération des types de blocs disponibles :
  - `CAROUSEL`
  - `IMAGE_GROUPE`
  - `TEXTE`
  - `SCREEN`
  - `VIDEO`
  - `BOUTON`

#### **BaseValidator**

- Classe abstraite pour la validation des données
- Méthode principale : `validateAll()` avec support des préfixes
- Toutes les entités passent par la validation avant persistance

## Structure des dossiers

![Structure du projet](./docs/project-structure.png)

## Système de validation avec BaseValidator

Le projet repose sur un système de validation modulaire et réutilisable, basé sur une classe BaseValidator dont héritent l’ensemble des modèles.
Cette classe permet de valider n’importe quelle structure de données, de manière centralisée et cohérente.

Chaque champ est automatiquement associé à un validateur dédié grâce à son préfixe ainsi qu’à une configuration spécifique grâce à son intitulé, permettant d’appliquer une validation Zod adaptée aux critères définis au moment de la validation.

### Avantages du système de validation

1. **Réutilisabilité** : `BaseValidator` peut être étendu pour valider n'importe quelle structure
2. **Préfixes** : validation de structures imbriquées avec identification précise des erreurs
3. **Typage fort** : TypeScript assure la cohérence des types validés
4. **Testabilité** : chaque validateur peut être testé indépendamment
5. **Maintenabilité** : les règles de validation sont centralisées et documentées
6. **Extensibilité** : ajouter de nouveaux validateurs est simple et suit le même pattern

---

## Flux de données

```
┌─────────────────┐
│  Base de données│
│    (Prisma)     │
└────────┬────────┘
         │
         │ SELECT * FROM blocks ORDER BY order
         │
         ▼
┌─────────────────┐
│  Server Action  │
│  ou API Route   │
│
└────────┬────────┘
         │
         │ Données récupérées via Prisma dans Néon
         │
         ▼
┌─────────────────┐
│  Page Component │
│   (SSR)  │
└────────┬────────┘
         │
         │ map(renderBlock)
         │
         ▼
┌─────────────────┐
│  Block Registry │
│  type + name    │
└────────┬────────┘
         │
         │ Mapping vers composant
         │
         ▼
┌─────────────────┐
│  React Component│
│  (Hero, Gallery)│
└─────────────────┘
```

## Qualité du code & métriques

Les métriques de qualité sont suivies via **Codacy** et **CodeScene**, afin d’évaluer la maintenabilité, la complexité et la santé globale du codebase.

---

### Vue d’ensemble (Codacy)

![Codacy dashboard](./docs/codacy-dashboard.png)

- **Issues** : **5.007 / kLoC**
  → Niveau faible et stable, indiquant peu de problèmes rapportés par millier de lignes de code.

- **Complexité** : **7 %**
  → Complexité maîtrisée, avec une structure globalement simple et lisible.

- **Duplication** : **26 %**
  → Duplication notable, principalement due :
  - aux patterns répétitifs des composants data-driven
  - aux variantes de blocs partageant une structure similaire
    Ce point est identifié comme axe d’amélioration potentiel (factorisation).

- **Coverage** : non mesurée
  → Pas encore de couverture de tests automatisés configurée.

---

### Santé du code (CodeScene)

![CodeScene dashboard](./docs/codescene.png)

![CodeScene code health](./docs/codescene-code-health.png)

- **Code Health global** : **9.84 / 10 – Healthy**
- La majorité des fichiers sont classés comme **Healthy**
- Très peu de zones considérées comme problématiques ou à risque

#### Observations principales

- Les dossiers **lib**, **hooks**, **database** et **app** présentent une excellente santé
- Les composants UI et blocs sont bien regroupés, avec un couplage limité
- L’architecture data-driven limite la dette technique malgré la taille croissante du projet

---

### Lecture globale

- Code **lisible et maintenable**
- Faible complexité
- Architecture cohérente et bien découpée
- Duplication à surveiller (acceptable dans un CMS configurable)
- Tests automatisés à ajouter pour améliorer la couverture

---

### Conclusion

Les métriques confirment que le projet repose sur une **base saine**, avec une architecture robuste et évolutive.
La priorité future concerne principalement :

- la réduction de la duplication sur certains blocs
- l’introduction progressive de tests automatisés

## Installation et démarrage

### Prérequis

- Node.js 18+
- PostgreSQL (ou compte Neon)
- npm, npm ou yarn

### Installation

```bash
# Cloner le projet
git clone https://github.com/Aline86/simple_config_cms.git
cd simple_config_cms
# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env
# Éditer .env avec votre DATABASE_URL

# Générer le client Prisma
npm prisma generate

# Exécuter les migrations
npm prisma migrate dev

# (Optionnel) Seed de données de démonstration
npm prisma db seed
```

### Développement

```bash
# Lancer le serveur de développement
npm dev

# Ouvrir Prisma Studio
npm prisma studio

# Lancer les tests
npm test

# Build de production
npm build
```

---

## Tests

---

## Support

Pour toute question ou problème :

- Ouvrir une issue sur GitHub
- Consulter la documentation dans `/docs`
- Me contacter

```


```
