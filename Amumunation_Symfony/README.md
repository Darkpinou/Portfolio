# 🔫 Amumunation

Boutique d'armes en ligne inspirée d'Ammu-Nation (GTA), réalisée en **Symfony** pour le cours *Serveur Web 2026*.

## Fonctionnalités

- Accueil avec les derniers produits, pages À propos et Contact
- Catalogue et fiche produit (catégorie, rareté, vendeur, image)
- **Annonces** : les utilisateurs mettent leurs propres articles en vente
- **Panier** en session : ajouter, retirer, vider
- **Commande** : validation réservée aux utilisateurs connectés, enregistrée en base avec statut
- Inscription, connexion, déconnexion

## Stack

PHP 8.2 · Symfony · Doctrine ORM · Twig · PostgreSQL · Docker Compose

## Modèle de données

`Utilisateur` · `Produit` · `Categorie` · `Commande`

## Lancer en local

```bash
composer install
docker compose up -d                 # base PostgreSQL
php bin/console doctrine:migrations:migrate
symfony serve                        # ou : php -S localhost:8000 -t public
```

`.env.dist` contient les valeurs par défaut ; renseigner `APP_SECRET` et `DATABASE_URL` dans un fichier `.env.local`.
