# Contribuer à ce projet

Nous vous remercions de votre intérêt pour contribuer à notre projet ! Votre contribution est importante pour nous. Ce guide vous aidera à comprendre comment proposer des modifications et des améliorations dans le respect de la **licence GPL (General Public License)**.

## Règles générales

Ce projet est sous **GPL v3**, ce qui signifie que vous avez le droit de modifier et de redistribuer le code, mais vous devez respecter certaines conditions :

- Toute redistribution de code ou toute modification doit également être sous la **licence GPL v3**.
- Vous devez fournir le **code source** complet de toute version modifiée que vous distribuez.
- Si vous distribuez des versions modifiées de ce projet, vous devez inclure un fichier contenant un avis indiquant que vous avez effectué des modifications.
- Toute œuvre dérivée du projet doit respecter les mêmes termes et conditions de la licence GPL v3.

## Comment contribuer

### 1. Fork du dépôt
Commencez par forker ce dépôt en cliquant sur le bouton **Fork** en haut de la page. Cela vous permettra de créer une copie de notre projet dans votre propre compte GitHub, où vous pourrez y apporter des modifications.

### 2. Créez une branche
Créez une nouvelle branche pour chaque fonctionnalité ou correction de bug sur laquelle vous travaillez. Utilisez un nom descriptif pour la branche afin de faciliter la compréhension des modifications.

```git checkout -b nom-de-votre-branche```


### 3. Apportez vos modifications

Effectuez les changements nécessaires dans le code. Assurez-vous que :

    Vous respectez les conventions de codage du projet.

    Vous ajoutez des tests pour toute nouvelle fonctionnalité.

    Vous modifiez le fichier NOTICE si vous avez apporté des changements significatifs.

### 4. Committez vos modifications

Lorsque vos modifications sont terminées, effectuez un commit avec un message clair et descriptif.

```git commit -m "Description des changements apportés"```

### 5. Poussez vos changements

Poussez vos modifications sur votre fork :

```git push origin nom-de-votre-branche```

### 6. Ouvrir une Pull Request (PR)

Une fois que vous avez poussé vos changements, allez sur la page du dépôt original et ouvrez une Pull Request. Expliquez clairement ce que vous avez fait dans la description de la PR. Nous examinerons vos changements et les intégrerons si tout est en ordre.



##Code of Conduct
Pour garantir un environnement inclusif et respectueux, nous demandons à tous les contributeurs de respecter tous les contributeur et de faire preuve de pédagogie et de bienveillance.


##Lancer les test
```npm test```

## Issue Tracker

### Résumé des bonnes pratiques
- Soyez clair et précis lors de la création d'une issue.
- Utilisez des étiquettes pour classer les problèmes (bug, enhancement, etc.).
- Priorisez et attribuez les issues selon leur complexité et leur importance.
- Gardez une trace de la dette technique et UX, et créez des issues pour y remédier.

Merci de suivre ces lignes directrices pour aider à maintenir une gestion fluide des issues et assurer un développement efficace et collaboratif du projet.

### 1. **Issue Tracker Guidelines (Directives pour le suivi des problèmes)**
Pour une gestion efficace des problèmes, nous avons quelques lignes directrices à suivre :
- **Clarté** : Soyez précis et concis dans la description de l'issue.
- **Reproductibilité** : Si vous signalez un bug, fournissez des étapes reproductibles et des informations sur l'environnement dans lequel le problème se produit (version du logiciel, système d'exploitation, etc.).
- **Respect** : Soyez respectueux dans toutes les communications. Chaque problème doit être traité de manière professionnelle.
- **Liens croisés** : Si une issue est liée à une autre, assurez-vous de créer des liens entre elles dans la description (par exemple, `#123` pour faire référence à l'issue 123).

### 2. **Issue Triaging**
Le triage des problèmes est le processus d'évaluation, de classification et de priorisation des problèmes signalés (bugs, demandes de fonctionnalités, améliorations, etc.). Voici les étapes à suivre :
- **Priorisation** : Lorsqu'un problème est signalé, un responsable de triage (ou un contributeur expérimenté) évalue sa priorité (critique, élevé, moyen, faible).
- **Étiquetage** : Utilisez des étiquettes appropriées telles que `bug`, `enhancement`, `help wanted`, `question`, pour classer les problèmes.
- **Attribution** : Les problèmes peuvent être attribués aux contributeurs pour résolution, ou à un responsable spécifique si nécessaire.

### 3. **Feature Proposals (Propositions de fonctionnalités)**
Si vous avez une idée pour une nouvelle fonctionnalité, veuillez ouvrir une **issue** pour en discuter avant de commencer à coder. Cela nous permet de vérifier si la fonctionnalité est en ligne avec les objectifs du projet. Pour soumettre une proposition :
- Ouvrez une nouvelle issue et utilisez le modèle de "Feature Proposal".
- Décrivez clairement la fonctionnalité, son utilité, et pourquoi elle améliorerait le projet.
- Nous discuterons ensemble des avantages, des compromis et de la faisabilité.

### 4. **Issue Weight (Poids des problèmes)**
L'attribution d'un "poids" aux issues permet de prioriser les tâches en fonction de leur complexité ou de leur impact potentiel. Par exemple :
- **Légers** : Les problèmes simples qui nécessitent peu d'effort (par exemple, de petits ajustements, des corrections de coquilles).
- **Moyens** : Les problèmes plus complexes, comme l'ajout de nouvelles fonctionnalités ou l'amélioration de fonctionnalités existantes.
- **Lourds** : Les problèmes critiques qui nécessitent un effort de développement important, comme des régressions majeures ou des refactorisations complexes.

### 5. **Regression Issues (Problèmes de régression)**
Les régressions sont des problèmes où une fonctionnalité qui fonctionnait correctement dans une version précédente du projet cesse de fonctionner dans une version plus récente.
- **Rapport de régression** : Lors de la soumission d'un problème de régression, assurez-vous de fournir des détails sur la version qui a introduit la régression, ainsi que des étapes claires pour reproduire le problème.
- **Tests** : Nous encourageons l'ajout de tests pour les fonctionnalités critiques afin de détecter les régressions plus facilement lors des futures mises à jour.

### 7. **Stewardship (Gestion du projet)**
La gestion du projet est une responsabilité partagée. Pour maintenir la direction du projet et son organisation, nous avons des responsabilités clés :
- **Revue des PRs** : Le mainteneur du projet ou un membre senior effectuera la revue des pull requests (PR) pour s'assurer qu'elles respectent les normes du projet.
- **Équilibre** : Nous maintenons un équilibre entre les nouvelles fonctionnalités, la correction de bugs, la gestion de la dette technique et l'amélioration de l'UX.
- **Maintien de la documentation** : La documentation doit toujours être à jour avec les nouvelles fonctionnalités, les changements de code, et les processus du projet.