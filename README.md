<div align="center">

# Guillaume Alessandri — Portfolio

**Étudiant développeur · EFREI** — Web full-stack, back-end, sécurité applicative

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/guillaume-alessandri-43b896355/)
[![GitHub](https://img.shields.io/badge/GitHub-Darkpinou-181717?style=for-the-badge&logo=github)](https://github.com/Darkpinou)

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![Next.js](https://img.shields.io/badge/Next.js-000000?logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?logo=supabase&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)
![PHP](https://img.shields.io/badge/PHP-777BB4?logo=php&logoColor=white)
![Symfony](https://img.shields.io/badge/Symfony-000000?logo=symfony&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white)
![Java](https://img.shields.io/badge/Java-ED8B00?logo=openjdk&logoColor=white)
![C](https://img.shields.io/badge/C-A8B9CC?logo=c&logoColor=black)

</div>

---

## ⭐ Projet principal — Portail client B2B

> Projet réel réalisé pour une entreprise de distribution alimentaire à l'export.
> **Code privé** (confidentialité client) : cette section présente l'architecture et les choix techniques.

Portail sécurisé où les clients professionnels consultent leurs documents comptables, grilles tarifaires et offres ciblées, avec un back-office complet pour l'équipe interne.

**Stack** : Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS · Supabase (PostgreSQL, Auth, Storage, Vault) · Resend + React Email · Zod — monorepo npm workspaces, hébergement Supabase en région UE (RGPD).

<table>
<tr>
<td valign="top" width="50%">

### Fonctionnalités

**Espace client**
- Tableau de bord, documents (factures, certificats), grilles tarifaires
- Offres commerciales filtrées selon le profil du client (segments, exclusions alimentaires)
- Dépôt de documents vers l'entreprise (commandes, réclamations…)
- Gestion des appareils de confiance

**Back-office**
- Gestion des clients, avec aperçu « voir comme ce client »
- Publication de documents, tarifs, offres et annonces
- Composition et envoi d'emails métier, historique de la file d'envoi
- Gestion des employés et journal d'audit
- 3 rôles : `super_admin`, `employee`, `client`

**Emails transactionnels**
- 7 templates (React Email)
- File d'attente avec retry exponentiel (5 tentatives)

</td>
<td valign="top" width="50%">

### Sécurité

- **Authentification par invitation uniquement**, onboarding obligatoire au 1er login
- **Row Level Security** sur toutes les tables : chaque client ne voit que ses données
- **Chiffrement des colonnes sensibles** (pgcrypto), clé stockée dans Supabase Vault
- **Validation Zod** côté serveur sur toutes les entrées
- **Protection anti-IDOR** : vérification de propriété avant chaque accès
- **Stockage privé** : téléchargements via URLs signées à durée limitée, vérification du bucket au démarrage
- **Appareils de confiance** (max 2) : empreinte HMAC, limite atomique (`SELECT FOR UPDATE`) contre les race conditions
- **Comptes désactivés éjectés** immédiatement (contrôle à chaque requête)
- **Journal d'audit** des actions sensibles, IP chiffrée
- **En-têtes HTTP** : CSP, HSTS, X-Frame-Options
- **Durcissement RLS** : escalade de privilèges `employee` → `super_admin` bloquée

</td>
</tr>
</table>

---

## Projets

| Projet | Description | Stack |
|---|---|---|
| 🏋️ **[Suivi Muscu](Suivi_Muscu)** | Appli de suivi d'entraînement : planning, système de rang (Bronze → Grand Champion) calculé sur le 1RM, calcul nutritionnel, thèmes, sauvegarde locale avec migration des données. | HTML · CSS · JavaScript (sans framework) |
| 🔫 **[Amumunation](Amumunation_Symfony)** | Boutique en ligne façon GTA : catalogue, annonces publiées par les utilisateurs, panier en session, commandes, authentification. | PHP · Symfony · Doctrine · Twig · PostgreSQL |
| ✅ **[Task Manager](Task_Manager_MERN)** | Gestionnaire de tâches et de dossiers avec authentification JWT et trois niveaux de rôles. Projet de groupe : **frontend React**. | React · Node.js · Express · MongoDB |
| 💬 **[Chat WebSocket](Chat_WebSocket)** | Salon de discussion en temps réel avec indicateur de connexion et interface responsive. | React · WebSocket (`ws`) · Node.js |

## Autres projets

| Projet | Description | Stack |
|---|---|---|
| 🚲 **[Smartbike](Challenge_Web-2025)** | Site vitrine e-commerce de vélos (Challenge Web 2025). | HTML · CSS · JavaScript |
| 🧙 **[Infinity Mage](Infinity_Mage_2025)** | Jeu de combat au tour par tour en console. | C |
| ⚔️ **[Jeu de combat](Jeu_Combat_java)** | Jeu de combat en programmation orientée objet. | Java |
| 🌟 **[Cassiopeia](HTML_2024-2025)** | Page de présentation d'un champion League of Legends. | HTML · CSS |

---

<div align="center">

Chaque dossier contient le code source du projet, et un README pour les projets récents.

</div>
