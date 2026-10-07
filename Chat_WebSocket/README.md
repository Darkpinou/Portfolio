# Salon de Discussion - Chat en Temps Réel

Application frontend de chat en temps réel développée avec React et WebSocket.

## 🚀 Fonctionnalités

- **Interface utilisateur moderne** avec design responsive
- **Connexion WebSocket** pour communication en temps réel
- **Système d'utilisateurs** avec nom d'utilisateur obligatoire
- **Messages instantanés** avec affichage en temps réel
- **Support clavier** (touche Entrée pour envoyer)
- **Indicateur de connexion** en temps réel
- **Design responsive** pour mobile et desktop

## 📋 Prérequis

- Node.js (version 14 ou supérieure)
- npm ou yarn
- Accès au backend WebSocket (port 8080)

## 🛠️ Installation

1. Cloner le projet :
```bash
git clone <repository-url>
cd sample-websocket-code
```

2. Installer les dépendances :
```bash
npm install
```

## ⚙️ Configuration

Avant de lancer l'application, vous devez configurer l'adresse du serveur WebSocket :

1. Ouvrir le fichier `App.js`
2. Remplacer `<NGROK_PUBLIC_IP>` par votre adresse IP publique Ngrok :
```javascript
const socket = new WebSocket('ws://VOTRE_IP_NGROK:8080');
```

## 🚀 Lancement

Démarrer l'application de développement :
```bash
npm start
```

L'application sera accessible à l'adresse : `http://localhost:3000`

## 📱 Utilisation

1. **Entrer un nom d'utilisateur** sur la page d'accueil
2. **Cliquer sur "Rejoindre"** pour accéder au salon de discussion
3. **Taper un message** dans le champ de saisie
4. **Appuyer sur Entrée** ou cliquer sur "Envoyer" pour poster le message
5. **Les messages apparaissent** en temps réel pour tous les utilisateurs connectés

## 🔄 Format des Messages

### Envoi (Client → Serveur)
```json
{
  "username": "JohnDoe",
  "message": "Hello, everyone!"
}
```

### Réception (Serveur → Client)
```json
{
  "username": "JohnDoe", 
  "message": "Hello, everyone!"
}
```

## 🎨 Interface

- **Page d'accueil** : Saisie du nom d'utilisateur
- **Salon de discussion** : 
  - En-tête avec nom d'utilisateur et statut de connexion
  - Zone de messages avec défilement automatique
  - Zone de saisie avec bouton d'envoi
- **Design responsive** : Adaptation mobile/desktop

## 🔧 Dépannage

### Problèmes de connexion
- Vérifiez que l'adresse Ngrok est correctement configurée
- Assurez-vous que le backend est accessible sur le port 8080
- Vérifiez les paramètres CORS sur le backend

### Messages qui ne s'affichent pas
- Vérifiez la console du navigateur pour les erreurs WebSocket
- Confirmez que le format des messages correspond au format attendu

## 📝 Notes Techniques

- Utilisation de React Hooks (useState, useEffect, useRef)
- Gestion automatique de la connexion WebSocket
- Nettoyage des ressources lors de la déconnexion
- Support du responsive design avec CSS Grid et Flexbox
- Animations CSS pour une meilleure expérience utilisateur

## 🤝 Contribution

Ce projet est une démonstration des fonctionnalités de chat en temps réel avec React et WebSocket.
