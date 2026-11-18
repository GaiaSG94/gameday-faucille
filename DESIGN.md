# DESIGN — Faucille (gameday-faucille)

> Journal de design. Versions datées, jamais écrasées. Tenu par Claude (directeur artistique), à partir de `PROMPT-DESIGN.md`.

## V1 — 2026-11-18 · Exploration de la page principale (« Jeu »)

**Statut : en attente de validation de Gaia (étape B du process, on s'arrête ici).**

### Fait
- `G-DESIGN/REFS.md` : Gapsy Studio et Raben Rifaie ouverts et décodés. Principes retenus : le geste dessiné par-dessus une scène calme, l'invitation par un geste plutôt qu'un bouton, une couleur unique tenue par la valeur, le temps raconté par un objet (la lune), contraste italique fin / chiffre gras.
- `G-DESIGN/PAGES.md` : 4 pages proposées (Post, Jeu, Carte de fin, Séries & classement), à valider. 4 questions produit ouvertes.
- 3 planches de la page **Jeu**. Chacune montre le cadre desktop 1440 × 900 (post déplié dans un feed neutre) et le cadre mobile 390 × 844, plus une bande de 7 états (prêt, trop tôt, coupable, coupe, danger, raté, chrono) :
  - `G-DESIGN/planches/v1/01-etang.html` : direction de départ poussée au bout. Étang vert profond, roseaux clairs, or du crépuscule réservé au geste, au score et au temps.
  - `G-DESIGN/planches/v1/02-herbier.html` : s'écarte du brief. Papier écru, roseaux à l'encre, eau gravée, coup de faucille en trait vermillon tracé à la main, panier en bâtons.
  - `G-DESIGN/planches/v1/03-lune-faucille.html` : une seule couleur. Fond roseau chartreuse, tout le reste en vert d'étang. Une lune en croissant traverse le ciel en 60 s (chrono) ; le coup de faucille a la même forme.

### Données de démo communes
Étang du mercredi 18 nov. Manche figée à 0:34 (0:26 restantes) : 9 coupes sur 12, 1 tige tombée dans l'eau, score 65 (règle actuelle du code : 10 par coupe, −25 par raté, +50 au quota), 3 coupes d'affilée, série de 6 jours. Les 4 couloirs montrent chacun un état : tige coupable, coupe en cours (+10), tige encore trop haute, tige à un souffle de l'eau.

### Décisions
- Les tiges **tombent** vers l'eau (pitch), alors que le rendu actuel les fait monter : voir question 1 de `PAGES.md`.
- La zone de coupe (25 % à 95 % de la chute, `stemCutWindow`) est rendue visible : ligne pointillée en haut, au-dessus de laquelle la tige est estompée et le toucher ne fait rien.
- Feed hôte dessiné en gris neutre, sans logo ni Snoo ni karma (critère Reddit-y « pas on the nose »).
- Zéro dépendance réseau : polices système en pile (serif / grotesque). Les polices définitives (libres, embarquées) seront choisies à l'étape C.
- UI en anglais ; planches annotées en français. Aucun emoji (la flamme 🔥 et l'épi 🌾 du code actuel disparaissent).

### Choix recommandé
**03 — Lune-faucille**, avec une réserve. C'est la seule direction où une idée porte tout l'écran : la lune qui traverse le ciel *est* le chrono, et le coup de faucille reprend sa forme. Avec deux valeurs seulement, c'est la plus lisible au pouce en plein jour, et elle ne ressemble à aucun autre jeu du jour.
Réserve : le chartreuse plein écran peut sembler fort après 60 s. À l'étape C, on testera un roseau un peu plus éteint.
01 est la plus apaisante et la plus fidèle au brief, mais vert sur vert, donc moins lisible sur mobile. 02 est la plus élégante, mais elle perd l'identité « eau verte » notée à l'idéation.

### Questions ouvertes (bloquantes pour l'étape C)
Voir `G-DESIGN/PAGES.md` §« Questions produit ouvertes » : chute ou montée des tiges ; combo affiché ou non ; quelles données de communauté stocker ; une ou plusieurs parties par jour.

### Retour de Gaia (2026-11-18) : V1 refusée
« Ça fait slop IA » : matière, couleurs et motifs pas travaillés, pas d'identité visuelle. Les 3 planches restent en archive, aucune n'est retenue.
Diagnostic : formes géométriques nues (tiges = rectangles arrondis, eau = pointillés), aplats sans grain, sans lumière ni profondeur, palette reprise telle quelle du brief, mise en page d'interface générique (colonnes de chiffres autour d'un terrain). Les trois directions changent de couleur, pas de matière.
Suite : Gaia rapporte de nouvelles références de la catégorie jeu. V2 repartira de ces références.

## V2 — 2026-11-18 · Page « Jeu », refaite à partir des références de jeu

**Statut : en attente de validation de Gaia (étape B).**

### Ce qui change par rapport à V1
- Références : la catégorie « Jeux Vidéo » de webdesign-inspiration.com ; **Firewatch** retenue (voir `G-DESIGN/REFS.md` § V2). Méthode reprise : rampe de valeurs d'une seule teinte, profondeur par couches, matière peinte, un objet de lumière qui porte le temps.
- Les trois directions diffèrent par la **matière**, pas par la couleur : peinture, linogravure, papier découpé.
- Plus de colonnes d'interface : l'étang occupe tout le post, les chiffres sont posés dans le ciel et sur la rive.
- Motifs dessinés et non plus géométriques : massettes (tige, épi, feuille), rives découpées, reflets du soleil, panier tressé qui se remplit des tiges coupées.
- Le chrono est le soleil, qui descend vers la rive en 60 s (le nombre reste, en petit).
- La zone de coupe devient une règle de lumière. Une tige lointaine a la valeur du décor ; une tige atteignable passe au premier plan, en contre-jour, encrée ou découpée selon la direction.
- La coupe a un retour propre à chaque matière : graines de massette qui s'envolent (peinture), copeaux de lino (gravure), chutes de papier (papier).
- Mot-symbole « Faucille » coupé en biais : la moitié haute glisse, comme une tige tranchée.

### Planches (`G-DESIGN/planches/v2/`)
- `01-contre-jour.html` : gouache numérique, rampe or pâle → vert presque noir, grain, brosse sèche, soleil-chrono, graines.
- `02-linogravure.html` : estampe à deux encres (vert d'étang, roseau) sur papier crème, décalage de repérage, manques d'encre, tout le clair est creusé. La coupe entaille l'image.
- `03-papier-decoupe.html` : diorama de feuilles découpées avec ombres portées réelles, eau en bandes vert d'eau, soleil de papier au bout d'un fil, coupe = lame de papier orange.
- Les planches V2 sont archivées telles quelles ; leur générateur n'est pas versionné (direction abandonnée).

### Choix recommandé
**01 — Contre-jour.** C'est la plus fidèle à la méthode retenue, et c'est celle où la lumière fait le travail du jeu : brume = trop tôt, contre-jour = maintenant, soleil = temps. Elle tient aussi en mobile.
02 est la plus singulière, mais la plus chargée : l'eau gravée fatigue l'œil sur 60 s. 03 est la plus chaleureuse et la plus lisible, mais elle tire vers l'illustration jeunesse.

### Limites connues
- Polices système en pile (URW Gothic, C059, P052). Les polices libres définitives seront embarquées à l'étape C.
- Dans 02, la touffe d'herbe du coin droit mord encore un peu sur « day streak » en desktop.

## V3 — 2026-11-18 · Page « Jeu » en 3D réaliste (méthode Bankkeeper)

**Statut : en attente de validation de Gaia.** Demande de Gaia : reprendre le design de Bankkeeper (V9 réalisme), appliqué non à la mer mais au paysage de Faucille, très réaliste et en 3D.

### Fait
- `G-DESIGN/planches/v3/01-etang-en-volume.html` : une seule planche, scène three.js **rendue en direct** dans les deux cadres (desktop 736 × 680 dans le post, mobile 390 × 710), plus 7 états rendus depuis la même scène.
- Scène : ciel physique au crépuscule (shader `Sky`), eau `Water` rendue moins miroir (réflectance de base 0,1, ciel réfléchi atténué, vaguelettes fines) pour lire « étang vert » et refléter collines et roseaux. Collines en facettes dans la brume, rive boisée (cônes + feuillus), environ 1 500 roseaux et massettes instanciés, nénuphars, ponton en bois avec un panier tressé qui contient les 9 tiges coupées.
- Jeu : 4 anneaux de flotteurs en liège = 4 couloirs. Les flotteurs s'allument (or) quand la tige est coupable ; l'eau s'éclaire sous une tige sur le point de tomber ; la coupe = un arc de lumière effilé, la tête qui part, le duvet en particules ; raté = ronds dans l'eau et gouttes.
- Le soleil descend vraiment pendant la manche (élévation 9° → 1,5°) : la lumière baisse avec le temps qui reste.
- UI à la Bankkeeper : barre en pilule + cartes blanches dépolies (score et temps, panier en 12 pastilles), règle en une ligne en bas, Ubuntu, accent vert d'étang `#1f5a3a`.
- Build : `G-DESIGN/gen/v3/` (`scene.js`, `template.html`, `build.mjs`, three 0.170.0 + esbuild 0.24.0 épinglés). `node build.mjs` produit un HTML unique de 541 Ko avec three.js embarqué : il s'ouvre en double-clic, sans requête réseau.

### Vérifié
Planche ouverte dans le navigateur : 0 erreur JS, scène rendue dans les deux cadres et les 7 états. Plusieurs passes de réglage relues en capture (eau trop « chrome », ciel trop gris, ponton hors champ, états trop serrés), toutes corrigées.

### Limites
- Seule l'eau est animée ; les tiges sont figées sur le moment 0:34 (c'est une planche).
- Une tige « trop tôt » est par nature en haut du cadre, donc en partie coupée.
- Dépendance three.js (comme Bankkeeper) : à confirmer pour l'app Devvit (poids du bundle dans un post, ≈ 500 Ko minifié).

## V3.1 — 2026-11-18 · Style V3 validé, déclinaison des pages (étape C)

**Statut : style validé par Gaia (« Yes, roll it out »). Les pages Post, Carte de fin, Séries & classement attendent sa revue.**

### Fait
- `G-DESIGN/STYLE.md` : le style V3 formalisé (scène, objets de jeu, UI, cadres, mouvement, interdits).
- `G-DESIGN/planches/v3/` : 4 planches, toutes construites sur la même scène 3D et le même kit de cartes.
  - `01-jeu.html` : la planche validée, régénérée par le nouveau build (remplace `01-etang-en-volume.html`).
  - `02-post.html` : le post dans le feed (vue inline 736 × 400 / 390 × 400), plan large de l'étang calme, carte « Wade in » + série. États : pas encore joué, déjà joué, chargement, erreur.
  - `03-carte-de-fin.html` : caméra sur le ponton au coucher, panier plein de 12 tiges ; carte résultat (Basket full, 145, 12 / 1 / 7), commentaire prêt à poster, compte à rebours. États : gagné, perdu (la série retombe), commentaire posté.
  - `04-series-classement.html` : vue calme sur l'étang ; série (7 jours, les 7 derniers jours en pastilles), communauté du jour (joueurs, % de paniers pleins, top 5 + ton rang, répartition des scores). États : première visite, série perdue, classement vide.
- Build : `G-DESIGN/gen/v3/` → `scene.js` (préréglages de caméra par page et par cadre), `ui.css`, `pages.mjs`, `build.mjs`. `node G-DESIGN/gen/v3/build.mjs` régénère les 4 planches (~545 Ko chacune, three.js embarqué, aucune requête réseau).

### Vérifié
Les 4 planches ouvertes dans le navigateur : 0 erreur JS, scène rendue dans chaque cadre et chaque état. Corrigé après relecture : la semaine de la série contredisait « 7 jours », la caméra de la page séries plongeait trop (pas d'horizon), deux libellés mobiles débordaient.

### À trancher
- **Données communauté** (PAGES.md, question 3) : la page 4 et le bouton « Today's scores » demandent de stocker par jour le nombre de joueurs, les paniers pleins, les scores (top + rang + répartition). Les valeurs affichées sont des données de démo.
- **Sens des tiges** (question 1) et **combo** (question 2) : toujours ouverts ; les planches suivent le pitch (chute) et n'affichent plus de combo.
- **Poids de three.js** dans un post Devvit (~500 Ko) : à mesurer avant l'intégration ; piste : n'initialiser la scène qu'au déploiement du post, la vue inline pouvant être une image.
