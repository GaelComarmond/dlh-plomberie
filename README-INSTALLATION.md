# Installation — DLH Plomberie

Ce dossier est un projet Next.js complet et autonome. Il contient le site, le formulaire de devis en plusieurs étapes, l’envoi d’e-mails, le téléchargement de photographies, le logo, les images optimisées et la configuration de déploiement.

## Méthode recommandée : utiliser directement ce projet

### 1. Extraire l’archive

Décompressez `dlh-plomberie-complete.zip`. Le dossier obtenu doit s’appeler :

```text
dlh-plomberie-demo
```

Vous pouvez le renommer, mais les commandes ci-dessous utilisent ce nom.

### 2. Ouvrir le projet dans le terminal

```bash
cd dlh-plomberie-demo
```

### 3. Installer les dépendances

Node.js 20 ou une version plus récente est recommandé.

```bash
npm install
```

### 4. Créer le fichier d’environnement local

Sur macOS ou Linux :

```bash
cp .env.local.example .env.local
```

Sous PowerShell :

```powershell
Copy-Item .env.local.example .env.local
```

### 5. Configurer les variables d’environnement

Ouvrez `.env.local` et remplacez les valeurs d’exemple :

```env
RESEND_API_KEY="re_your_real_resend_api_key"
QUOTE_FROM_EMAIL="DLH Plomberie <devis@your-verified-domain.fr>"
QUOTE_TO_EMAIL="contact@dlhplomberie.fr"
NEXT_PUBLIC_SITE_URL="https://your-final-domain.fr"
```

Explications :

- `RESEND_API_KEY` : clé API créée dans Resend.
- `QUOTE_FROM_EMAIL` : adresse d’expédition utilisant un domaine vérifié dans Resend.
- `QUOTE_TO_EMAIL` : boîte qui reçoit les demandes de devis. Confirmer que `contact@dlhplomberie.fr` est bien l’adresse définitive.
- `NEXT_PUBLIC_SITE_URL` : URL finale du site, sans `/` à la fin.

Ne placez jamais une vraie clé API dans GitHub.

### 6. Lancer le site localement

```bash
npm run dev
```

Ouvrez ensuite :

```text
http://localhost:3000
```

### 7. Tester le formulaire de devis

1. Ouvrez la section **Demande de devis**.
2. Sélectionnez au moins un service.
3. Choisissez l’urgence et le type de propriété.
4. Saisissez une adresse, un code postal, une date et un créneau.
5. Ajoutez les coordonnées du client.
6. Acceptez l’autorisation de traitement.
7. Envoyez la demande.

### 8. Tester le téléchargement de photographies

Le formulaire accepte :

- JPG, PNG et WebP ;
- cinq photographies maximum ;
- 4 Mo maximum par fichier ;
- 20 Mo maximum au total.

Testez un envoi avec une image, puis un second sans image.

### 9. Tester l’e-mail reçu par l’entreprise

Vérifiez que `QUOTE_TO_EMAIL` reçoit :

- les coordonnées du client ;
- les services sélectionnés ;
- l’adresse et la date souhaitée ;
- la description ;
- les photographies jointes.

### 10. Tester la confirmation client

Le client doit recevoir un e-mail confirmant uniquement la réception de sa demande. Cet e-mail ne confirme pas automatiquement la date d’intervention.

### 11. Exécuter les vérifications locales

```bash
npm run typecheck
npm run lint
npm run build
```

Corrigez toute erreur avant le déploiement.

## Créer un nouveau dépôt GitHub

### 12. Déconnecter un ancien dépôt, si nécessaire

```bash
rm -rf .git
```

Sous PowerShell :

```powershell
Remove-Item -Recurse -Force .git
```

### 13. Initialiser le nouveau dépôt

```bash
git init
git add .
git commit -m "Initial DLH Plomberie website"
```

### 14. Créer un dépôt vide sur GitHub

Créez un dépôt nommé, par exemple :

```text
dlh-plomberie-site
```

Ne demandez pas à GitHub d’ajouter un README si le dépôt local existe déjà.

### 15. Relier et pousser le projet

Remplacez l’URL par celle de votre dépôt :

```bash
git branch -M main
git remote add origin https://github.com/VOTRE-COMPTE/dlh-plomberie-site.git
git push -u origin main
```

## Déployer sur Vercel

### 16. Importer le dépôt

1. Ouvrez Vercel.
2. Choisissez **Add New Project**.
3. Importez `dlh-plomberie-site`.
4. Laissez Vercel détecter Next.js.

### 17. Ajouter les variables Vercel

Dans **Project Settings → Environment Variables**, ajoutez :

```text
RESEND_API_KEY
QUOTE_FROM_EMAIL
QUOTE_TO_EMAIL
NEXT_PUBLIC_SITE_URL
```

Ajoutez-les au minimum pour l’environnement **Production**. Les ajouter également à **Preview** facilite les tests.

### 18. Déployer

Lancez le déploiement, puis mettez à jour `NEXT_PUBLIC_SITE_URL` avec l’URL finale si nécessaire et redéployez.

### 19. Vérifier le site en ligne

Vérifiez :

- la navigation sur ordinateur et téléphone ;
- les boutons d’appel ;
- l’adresse e-mail ;
- les images et le logo ;
- les services proposés ;
- le formulaire complet ;
- l’ajout de photos ;
- l’e-mail destiné à l’entreprise ;
- la confirmation destinée au client.

## Méthode alternative : repartir manuellement du projet Eric

Cette méthode est moins simple, car le ZIP fourni contient déjà le projet terminé.

1. Dupliquez le dossier du projet Eric.
2. Supprimez `.git`, `.next` et `node_modules`.
3. Remplacez les dossiers `app` et `public` par ceux de ce projet.
4. Copiez les fichiers de configuration à la racine.
5. Copiez `.env.local.example` et `README-INSTALLATION.md`.
6. Exécutez `npm install`.
7. Configurez `.env.local`.
8. Exécutez les vérifications et déployez.

Utiliser directement le dossier `dlh-plomberie-demo` reste la méthode recommandée.

## Informations à confirmer avant publication officielle

- L’adresse `contact@dlhplomberie.fr` comme boîte définitive des devis.
- Le rayon exact d’intervention autour de Romainville.
- L’URL finale du site.
- Le domaine vérifié utilisé par Resend.
- Les liens directs vers Google et Infobel.
- Les chiffres `4,9/5 — 216 avis Google` et `4,9/5 — 207 avis Infobel` immédiatement avant publication.
