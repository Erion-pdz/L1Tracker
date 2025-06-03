# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

📁 Arborescence complète du projet L1Tracker
L1Tracker/
├── app/                             # Toutes les pages de navigation via expo-router
│   ├── index.js                     # Accueil - liste des matchs en direct
│   ├── match/                       # Dossier des matchs
│   │   └── [id].js                  # Page de détail d’un match (stats, events, lineups)
│   ├── calendrier.js               # Affichage du calendrier des matchs
│   ├── classement.js               # Classement actuel de la Ligue 1
│   ├── favoris.js                  # Équipes/joueurs favoris
│   └── _layout.js                  # Layout principal (nav commune, header, etc.)
│
├── components/                     # Composants réutilisables
│   ├── MatchCard.js                # Carte affichant un match (score, équipes)
│   ├── FavoriteButton.js           # Bouton pour ajouter/supprimer des favoris
│   ├── TeamStats.js                # Statistiques d'une équipe
│   ├── MatchEvents.js              # Liste des événements du match
│   └── LineUps.js                  # Composition des équipes
│
├── services/                       # Appels API
│   └── api.js                      # Fichier avec les fonctions Axios (fixtures, stats, etc.)
│
├── constants/                      # Fichiers de config ou constantes globales
│   └── colors.js                   # Palette de couleurs
│
├── assets/                         # Images, logos, icônes
│   ├── logos/                      # Logos des clubs
│   └── icons/
│
├── app.config.js                   # Config Expo (title, splash, web, etc.)
├── babel.config.js                 # Config Babel avec plugin expo-router
├── package.json                    # Dépendances du projet
└── .env                            # Clé API (ne pas push sur GitHub)
