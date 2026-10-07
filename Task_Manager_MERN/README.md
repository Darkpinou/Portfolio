# ✅ Task Manager (MERN)

Gestionnaire de tâches organisées en dossiers, avec authentification et gestion des rôles.
Projet de groupe (4 personnes) réalisé en B2 à l'EFREI — **ma partie : le frontend React**.

## Fonctionnalités

- Inscription et connexion avec **JWT**, mots de passe hachés avec **bcrypt**
- Dossiers et tâches : création, lecture, modification, suppression
- Routes protégées côté frontend (`ProtectedRoute`) et contexte d'authentification global
- **Trois rôles** :
  - *utilisateur* : gère ses dossiers et ses tâches
  - *admin* : consulte les utilisateurs et leurs tâches
  - *master* : crée, supprime des utilisateurs et modifie leurs rôles

## Stack

React · React Router · Node.js · Express · MongoDB (Mongoose) · JWT

## Structure

```
backend/   API Express : routes auth, folders, tasks, admin + middlewares auth/admin
frontend/  React : pages (Login, Register, Dashboard, Admin, Master), composants, services API
```

## Lancer en local

```bash
# backend — créer backend/.env avec MONGODB_URI, JWT_SECRET et PORT
cd backend && npm install && node server.js

# frontend
cd frontend && npm install && npm start
```
