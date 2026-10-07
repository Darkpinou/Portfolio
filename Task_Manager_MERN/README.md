# Task Manager

> Application de gestion de tâches organisées en dossiers, avec authentification JWT et trois niveaux de droits.

**Stack** : React 18 · React Router · Node.js · Express · MongoDB (Mongoose) · JWT · bcrypt
**Contexte** : projet de groupe (4 personnes) — EFREI, B2
**Mon rôle** : **développement du frontend React** (pages, composants, routage protégé, contexte d'authentification, appels API).

## Fonctionnalités

- **Authentification** : inscription et connexion, token JWT, mots de passe hachés avec bcrypt.
- **Dossiers et tâches** : création, consultation, modification, suppression.
- **Trois rôles** :
  - `user` — gère ses propres dossiers et tâches ;
  - `admin` — consulte les utilisateurs et leurs tâches ;
  - `master` — crée et supprime des utilisateurs, modifie leurs rôles.
- **Routes protégées** côté client selon l'état de connexion et le rôle.

## Architecture

```
backend/
  routes/       auth, folders, tasks, admin
  middleware/   auth (vérification JWT), admin / master (contrôle du rôle)
  models/       User, Folder, Task
frontend/src/
  pages/        Login, Register, Dashboard, Admin, Master
  components/   tasks/, folders/, common/ (Navbar, ProtectedRoute)
  context/      AuthContext — état de session partagé
  services/     api.js — client HTTP centralisé
```

## Choix techniques

| Choix | Pourquoi |
|---|---|
| `AuthContext` + `ProtectedRoute` | Un seul endroit détient la session ; chaque page protégée la lit sans dupliquer la logique. |
| Client API centralisé | URL de base et en-tête `Authorization` définis une seule fois. |
| Contrôle des rôles côté serveur | Le frontend masque les écrans, mais c'est le middleware qui fait foi : un appel direct à l'API reste refusé. |
| Démarrage bloqué sans `JWT_SECRET` | Évite de signer des tokens avec une clé par défaut. |

## Lancer en local

```bash
# backend — créer backend/.env avec MONGODB_URI, JWT_SECRET et PORT
cd backend && npm install && node server.js

# frontend
cd frontend && npm install && npm start
```

## Limites et pistes d'amélioration

- Pas de tests automatisés : ajouter des tests d'API (Jest + Supertest) et de composants (React Testing Library).
- Conteneurisation (Docker Compose) et pipeline CI prévus par le sujet mais non réalisés.
