# Guide de Contribution

Merci de l'intérêt que vous portez à ce projet !  
Ce document explique comment contribuer de manière efficace et respectueuse.

---

## Table des matières

- [Code de conduite](#code-de-conduite)
- [Comment contribuer](#comment-contribuer)
- [Signaler un bug](#signaler-un-bug)
- [Proposer une fonctionnalité](#proposer-une-fonctionnalité)
- [Soumettre du code](#soumettre-du-code)
- [Convention de commits](#convention-de-commits)
- [Licence et droits](#licence-et-droits)

---

## Code de conduite

En participant à ce projet, vous vous engagez à maintenir un environnement respectueux et bienveillant pour tous. Toute forme de harcèlement, discrimination ou comportement irrespectueux est intolérable.

---

## Comment contribuer

Il existe plusieurs façons de contribuer au projet :

- Signaler un bug
- Proposer une nouvelle fonctionnalité
- Améliorer la documentation
- Soumettre une correction ou une amélioration du code

---

## Signaler un bug

Avant d'ouvrir une issue, vérifiez qu'elle n'a pas déjà été signalée.

Pour signaler un bug, ouvrez une **Issue** en précisant :

1. Une description claire et concise du problème
2. Les étapes pour reproduire le bug
3. Le comportement attendu vs le comportement observé
4. Votre environnement (OS, version, etc.)
5. Des captures d'écran si nécessaire

---

## Proposer une fonctionnalité

Pour soumettre une idée, ouvrez une **Issue** avec le label `enhancement` et décrivez :

- Le problème que cette fonctionnalité résoudrait
- La solution que vous envisagez
- Les alternatives éventuellement considérées

---

## Soumettre du code

### 1. Forker le dépôt

```bash
git clone https://github.com/TON_UTILISATEUR/TON_PROJET.git
cd TON_PROJET
```

### 2. Créer une branche

Utilisez un nom de branche descriptif :

```bash
git checkout -b fix/nom-du-bug
# ou
git checkout -b feat/nom-de-la-fonctionnalite
```

### 3. Effectuer vos modifications

- Respectez le style de code existant
- Ajoutez des commentaires si nécessaire
- Testez vos modifications avant de les soumettre

### 4. Committer vos changements

```bash
git add .
git commit -m "feat: ajout de la fonctionnalité X"
```

### 5. Pousser et ouvrir une Pull Request

```bash
git push origin feat/nom-de-la-fonctionnalite
```

Ouvrez ensuite une **Pull Request** vers la branche `main` en décrivant clairement vos changements.

---

## Convention de commits

Nous suivons la convention [Conventional Commits](https://www.conventionalcommits.org/) :

| Préfixe     | Usage                                           |
| ----------- | ----------------------------------------------- |
| `feat:`     | Nouvelle fonctionnalité                         |
| `fix:`      | Correction de bug                               |
| `docs:`     | Modification de la documentation                |
| `style:`    | Formatage, espaces (sans changement de logique) |
| `refactor:` | Refactorisation du code                         |
| `test:`     | Ajout ou modification de tests                  |

---

## Licence et droits

En soumettant une contribution, vous acceptez que votre code soit distribué sous la licence **Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)** utilisée par ce projet.

Cela signifie que vos contributions ne pourront pas être utilisées à des fins commerciales sans autorisation explicite.

---

Merci pour votre contribution !
