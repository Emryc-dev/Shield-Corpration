# The Shield Corporation Store API

Backend Express et TypeScript du Store, connecté à Neon PostgreSQL avec Prisma. Il fournit JWT, catalogue, favoris, panier, commandes, NotchPay, Cloudinary et administration.

## Démarrage

1. Copier ".env.example" vers ".env" et renseigner les variables.
2. Installer avec "npm install".
3. Générer Prisma avec "npm run prisma:generate".
4. Créer la base avec "npm run prisma:migrate -- --name init".
5. Définir éventuellement ADMIN_EMAIL et ADMIN_PASSWORD, puis lancer "npm run seed".
6. Démarrer avec "npm run dev".

API: http://localhost:4001/api
Swagger: http://localhost:4001/api/docs
Santé: http://localhost:4001/api/health

## Railway

Configurer le dossier racine du service sur "/Backend", puis ajouter les variables de ".env.example". La commande de build, le démarrage et le healthcheck sont définis dans "railway.toml". Exécuter "npm run prisma:deploy" comme Pre-deploy Command avant le démarrage.

En production, renseigner uniquement la chaîne fournie par Neon dans DATABASE_URL. Les connexions poolées Neon actuelles prennent en charge Prisma Client et Prisma Migrate. Le serveur reste la seule source de vérité pour les prix, le stock et les totaux.
