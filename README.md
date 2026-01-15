# 📱 Job Dating IT

## 📋 Informations Générales

### Présentation du Projet

Job Dating IT est une application mobile innovante de recrutement dans le domaine des Technologies de l'Information (IT). Elle met en relation des candidats IT et des recruteurs via un système de matching inspiré de Tinder, basé sur les compétences, les technologies et les besoins professionnels.

### Contexte

Le recrutement IT est souvent long, complexe et peu efficace à travers les méthodes classiques. Les candidats ont des difficultés à trouver des opportunités adaptées à leurs compétences, tandis que les recruteurs perdent du temps à trier des profils non pertinents. Cette application vise à moderniser le processus de recrutement grâce à une expérience mobile rapide, intuitive et centrée sur le matching intelligent.

### Objectifs

- Simplifier et accélérer le recrutement IT
- Faciliter la rencontre entre candidats et recruteurs
- Réduire le temps de sélection des profils
- Proposer une expérience utilisateur moderne et mobile-first
- Mettre en pratique les compétences en développement mobile et backend

## 👥 Acteurs du Système

### Candidats IT

- Créer et gérer un profil professionnel
- Ajouter compétences et technologies
- Consulter et swiper les offres d'emploi
- Matcher avec des recruteurs
- Discuter après un match

### Recruteurs / Entreprises IT

- Créer un profil entreprise
- Publier et gérer des offres d'emploi
- Consulter et swiper les profils candidats
- Matcher avec des candidats
- Communiquer via messagerie

### Administrateur

- Gérer les utilisateurs
- Modérer les profils et offres
- Superviser le bon fonctionnement de l'application
- Analyser les statistiques globales

## 🎯 Fonctionnalités Principales

### Module Candidat

#### Gestion du Profil

- Création et modification du profil
- Ajout des compétences IT
- Ajout de l'expérience professionnelle
- Ajout du CV (optionnel)

#### Recherche & Matching

- Consultation des offres d'emploi
- Swipe (like / dislike)
- Réception des matchs
- Notifications de match

#### Communication

- Messagerie avec les recruteurs après match
- Historique des discussions

### Module Recruteur

#### Gestion des Offres

- Création d'offres d'emploi IT
- Modification et suppression des offres
- Gestion du statut des offres

#### Recherche & Matching

- Consultation des profils candidats
- Swipe sur les profils
- Réception des matchs

#### Communication

- Messagerie avec les candidats
- Suivi des discussions

### Module Administration

#### Gestion des Utilisateurs

- Validation et suspension des comptes
- Gestion des rôles

#### Modération

- Modération des profils et contenus
- Suppression des contenus inappropriés

#### Statistiques

- Nombre d'utilisateurs
- Nombre de matchs
- Activité globale de la plateforme

## 🏗️ Architecture Technique

### Structure du Projet

#### Backend (API REST)

**Technologies :**

- Node.js
- Express.js
- PostgreSQL
- Sequelize (ORM)
- Architecture MVC
- Authentification JWT

**Structure Backend :**

```
backend/
├── config/
├── controllers/
│   ├── authController.js
│   ├── userController.js
│   ├── jobController.js
│   ├── matchController.js
│   └── messageController.js
├── models/
│   ├── User.js
│   ├── Candidate.js
│   ├── Recruiter.js
│   ├── JobOffer.js
│   ├── Match.js
│   └── Message.js
├── routes/
├── middlewares/
└── server.js
```

#### Frontend (Application Mobile)

**Technologies :**

- React Native
- Expo
- TypeScript
- Zustand (state management)
- React Query
- Expo Router

**Structure Frontend :**

```
frontend/
├── app/
│   ├── (auth)/
│   ├── (tabs)/
│   ├── swipe/
│   ├── match/
│   └── chat/
├── components/
├── services/
├── store/
├── hooks/
└── utils/
```

## 💾 Modèle de Données

### Entités Principales

#### User

- id, email, password
- role (candidate / recruiter)
- createdAt

#### Candidate

- userId
- nom
- compétences
- expérience
- CV

#### Recruiter

- userId
- entreprise
- description

#### JobOffer

- id
- titre
- description
- compétences requises
- recruiterId

#### Match

- id
- candidateId
- jobOfferId
- dateMatch

#### Message

- id
- senderId
- receiverId
- contenu
- date

## ⭐ MVP – Minimum Viable Product

### Fonctionnalités MVP

- Inscription / Connexion
- Choix du rôle (candidat / recruteur)
- Création de profil
- Consultation des offres / profils
- Swipe (like / dislike)
- Système de matching
- Notification de match
- Messagerie basique

**🎯 Objectif du MVP :** valider le concept de matching Job Dating IT avant l'ajout de fonctionnalités avancées.

## 🚀 Phases de Développement

### Phase 1 – MVP

- Authentification
- Profils utilisateurs
- Swipe & matching
- Chat basique

### Phase 2 – Fonctionnalités Avancées

- Filtres avancés
- Notifications push
- Amélioration du matching
- Statistiques

### Phase 3 – Optimisation

- Sécurité renforcée
- Tests
- Optimisation performances
- Préparation soutenance

## 🛡️ Contraintes et Risques

### Contraintes

- Temps de développement limité
- Sécurité des données
- Simplicité et ergonomie

### Risques

- Faible adoption initiale
- Profils non pertinents
- Problèmes de performance mobile

## 👨‍💻 Équipe de Développement

**Développeuse :** Zakia Taoufik

**Projet :** Projet de Fin de Formation

**Domaine :** Développement Mobile / IT

## 📧 Contact

**Email :** zakiataou99@gmail.com

---

*Document créé le [16/12/2025]