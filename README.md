# Crawler pour le site LaSécuRecrute

## 🎯 Objectif

Ce projet propose un petit crawler destiné au site [lasecurecrute.fr](https://lasecurecrute.fr), afin d’améliorer l’expérience de recherche d’emploi.

Le site ne permet malheureusement pas de trier les offres par **département**, ce qui peut être particulièrement contraignant pour les personnes vivant **dans une commune limitrophe** de plusieurs départements ou régions.

Ce crawler a donc pour but de :
- Collecter les offres d’emploi publiées sur le site.
- Permettre un **filtrage plus précis par département ou région**, y compris pour les zones limitrophes.
- Faciliter la recherche pour les utilisateurs dans une démarche **non commerciale**.

## ⚠️ Avertissement

- Ce projet est un **outil personnel et open-source**, partagé dans un but d’utilité publique et sans intention commerciale.
- Il **ne respecte pas le fichier `robots.txt`** du site cible, mais il est conçu pour être **peu intrusif** :
  - Le script ne s'exécute **qu'une seule fois par jour**.
  - Aucune charge excessive n’est imposée au serveur cible.

## 🔄 Gestion des données

- Les données collectées sont **temporaires**.
- Chaque offre est automatiquement **supprimée à sa date de fin de publication**, afin de garantir que seules les annonces actives soient conservées.

## 🧾 Licence

Ce projet est distribué sous la licence MIT. Vous êtes libre de l’utiliser, le modifier ou le partager, à condition de citer l’auteur original.

## 🤝 Contribuer

Les contributions sont les bienvenues tant qu’elles respectent l’objectif initial : **aider à simplifier la recherche d’emploi sur LaSécuRecrute** sans en abuser.

## 📌 Remarques

Ce projet n’est **ni affilié ni approuvé** par La Sécurité Sociale ou le site lasecurecrute.fr. Il s’agit d’un projet indépendant, à visée pédagogique et pratique.
