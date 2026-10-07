# Amumunation

> Marketplace inspirée d'Ammu-Nation (GTA) : les utilisateurs publient des annonces d'armes et d'objets de jeux vidéo, les achètent via un panier et passent commande.

**Stack** : PHP 8.2 · Symfony 7 · Doctrine ORM · Twig · PostgreSQL · Docker Compose<br>
**Contexte** : projet de cours *Serveur Web* — EFREI, 2026

![Page d'accueil](docs/accueil.png)

## Fonctionnalités

- **Catalogue** : liste des annonces et fiche produit (catégorie, rareté, vendeur, image).
- **Publication d'annonces** par les utilisateurs connectés, avec upload d'image.
- **Panier** stocké en session : ajout, retrait, vidage, calcul du total.
- **Commande** : validation réservée aux utilisateurs connectés, enregistrée en base avec statut et acheteur.
- **Comptes** : inscription, connexion, déconnexion ; mots de passe hachés (`password_hash`, bcrypt).

## Architecture

```
src/Controller/   Accueil, Annonces, Auth, Cart, CreerAnnonce, Product
src/Entity/       Utilisateur, Produit, Categorie, Commande
templates/        vues Twig par domaine + layout commun (base.html.twig)
```

## Choix techniques

| Choix | Pourquoi |
|---|---|
| Symfony + Doctrine | Routing par attributs, injection de dépendances et ORM : le code métier reste dans les contrôleurs et les entités, sans SQL écrit à la main. |
| Panier en session | Pas besoin de compte pour remplir son panier ; la base n'est sollicitée qu'à la validation de la commande. |
| PostgreSQL via Docker Compose | Base identique sur tous les postes, lancée en une commande. |

## Lancer en local

```bash
composer install
docker compose up -d       # base PostgreSQL
php bin/console doctrine:database:create && php bin/console doctrine:schema:create
symfony serve              # ou : php -S localhost:8000 -t public
```

`.env.dist` contient les valeurs par défaut ; renseigner `APP_SECRET` et `DATABASE_URL` dans un fichier `.env.local`.

## Limites et pistes d'amélioration

- Authentification gérée manuellement en session : la migrer vers le composant **Symfony Security** (firewall, voters, protection CSRF des formulaires).
- Pas de tests fonctionnels : ajouter des tests PHPUnit sur le parcours panier → commande.
- Pas de migrations Doctrine : le schéma est généré directement depuis les entités.
