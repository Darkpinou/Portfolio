# 🏋️ Suivi Muscu

Application de suivi de musculation tenant dans **un seul fichier HTML**, sans framework ni dépendance.

## Fonctionnalités

- **Planning** : 5 séances sur 7 jours, mode édition des jours et des exercices, circuit abdos.
- **Rang** : système façon jeu vidéo (Bronze, Argent, Or… jusqu'à Grand Champion) calculé à partir du 1RM estimé.
- **Nutrition** : calories calculées à partir de la dépense quotidienne estimée, ajustées selon l'objectif, avec un garde-fou contre un déficit trop fort.
- **Thèmes** de couleurs.
- **Sauvegarde automatique** dans le navigateur (`localStorage`), avec **migration** des anciennes sauvegardes quand la structure des données évolue.

## Lancer

Ouvrir `index.html` dans un navigateur. Aucune installation.

## Choix technique

Un seul fichier, zéro dépendance : l'appli s'ouvre partout, se met en ligne en un clic et ne casse jamais à cause d'une mise à jour de librairie.
