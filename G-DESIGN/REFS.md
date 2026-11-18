# REFS — Faucille

> Références ouvertes le 2026-11-18 (navigateur, page d'accueil + défilement). On prend des **principes**, jamais un layout, un texte, un asset ou une marque.

## Gapsy Studio — gapsystudio.com

Observé :
- Une scène en volume (une galerie blanche baignée de lumière zénithale, sol bois) que la caméra traverse latéralement quand on fait défiler la page.
- Par-dessus cette scène, **des annotations dessinées à main levée** en trait noir : une bulle, une flèche courbe qui invite à défiler, une couronne, une palette. Le dessin est plat, épais, un peu maladroit, et il contraste avec le volume photoréaliste.
- Grosse typo d'affiche en volume (rouge corail) ; le reste du texte est petit, sobre.
- L'invitation à défiler est un geste (flèche dessinée + deux mots), pas un bouton.

À retenir pour Faucille :
1. **Le geste dessiné par-dessus la scène** : le coup de faucille est un trait tracé au-dessus de l'étang, plat et vif, posé sur un décor plus calme. Le trait est le retour visuel principal.
2. **L'invitation est un geste** : l'état « prêt » montre une flèche/arc qui dit où toucher, pas un paragraphe.
3. **Deux régimes graphiques** : décor dense et calme, interaction en trait simple. On ne mélange pas.

## Raben Rifaie — rabenrifaie.com

Observé :
- Entrée en deux temps : écran noir, compteur de chargement en italique serif, une pilule « Welcome » à toucher pour entrer.
- Puis **une seule couleur domine tout l'écran** : un vert mousse, du presque noir aux verts herbe, dans une scène 3D de colline. Le texte est minuscule, blanc, en marge.
- **Mouvement narratif** : des sphères pâles (des lunes) roulent sur la pente au fil du défilement ; le défilement raconte quelque chose au lieu de faire glisser des blocs.
- Mot-symbole qui mélange italique fin et romain gras ; les libellés des boutons s'animent lettre par lettre.

À retenir pour Faucille :
1. **Une couleur unique** : une teinte tient l'écran, l'information passe par la valeur (clair/sombre), pas par des couleurs supplémentaires.
2. **Le temps raconté par un objet** : une lune pâle qui traverse la scène peut porter le chrono de la manche mieux qu'un nombre.
3. **Le contraste italique fin / chiffre gras** pour hiérarchiser nom du jeu et score.

## Ce qu'on n'emprunte pas

- Les scènes 3D, la galerie, la colline, les lunes en volume elles-mêmes ; les doodles précis de Gapsy (couronne, bulle, palette) ; les textes des deux sites.
- Leurs polices : on reste sur des familles système / libres embarquables.
- L'écran de chargement-portail de Raben : trop long pour un post dans un feed.

---

# V2 — références de la catégorie jeu (2026-11-18)

> La V1 a été refusée (« slop IA », matière non travaillée). Source : la catégorie « Jeux Vidéo » de webdesign-inspiration.com (22 sites), même source que `REFERENCES-DESIGN.md`. Parcourue en entier ; ouverts : Firewatch, Kippo, Den of Wolves, Kuuasema (Knucklebon.es inaccessible, certificat invalide).

## Firewatch — firewatchgame.com (retenue)

Observé :
- **Une seule teinte en rampe de valeurs** : du jaune pâle du ciel à l'orange, puis au brun-rouge et au presque noir du premier plan. Huit valeurs environ, aucune autre couleur.
- **La profondeur par couches** : chaque plan de montagnes ou d'arbres est une silhouette plate, plus sombre et plus saturée à mesure qu'elle se rapproche (perspective atmosphérique).
- **Matière peinte** : bords de silhouettes légèrement irréguliers, grain sur les aplats, coups de brosse dans le ciel. Rien n'est vectoriel propre.
- Un **soleil bas** en disque pâle, des oiseaux en deux traits, un personnage minuscule : l'échelle raconte le calme.
- L'interface se pose dans le décor (le titre est peint dans le ciel, les boutons dans la partie la plus sombre).

À retenir pour Faucille :
1. **Rampe de valeurs d'une teinte** (or pâle → vert d'étang presque noir) au lieu d'une palette de pastilles.
2. **Perspective atmosphérique comme règle de jeu** : une tige lointaine a la valeur de la brume ; une tige atteignable a la valeur du premier plan.
3. **Matière avant forme** : grain, bords irréguliers, brosse sèche. L'interface vit dans la scène, pas dans des colonnes.
4. **Un objet de lumière porte le temps** (le soleil bas).

## Écartées
- **Kippo** : isométrique arc-en-ciel, contraire à « une seule couleur d'accent ».
- **Den of Wolves** : thriller sombre photoréaliste, hors ton.
- **Kuuasema** : site corporate rouge, rien sur la matière.

## Ce qu'on n'emprunte pas
Ni les montagnes, ni le belvédère, ni le personnage, ni les rubans de boutons, ni la palette orange de Firewatch : on garde la méthode (rampe, couches, grain), appliquée à un étang de roseaux en vert et or.

---

# V3 — Bankkeeper (2026-11-18, demandée par Gaia)

> Le jeu de l'équipe pour NEAR (repo `Tradoooo/bankkeeper`, nom en jeu « Tidewater »). Direction verrouillée là-bas : **V9 réalisme** (voir `prompts/planches-5/bankkeeper.md` du pipeline). Ouvert le 2026-11-18 : https://tidewater-play.vercel.app (page de garde + écran de connexion ; je n'ai pas joué, la scène était visible derrière).

Observé :
- **Une vraie scène 3D three.js** derrière toute l'interface : caméra basse au ras de l'eau, ciel physique laiteux, mer qui reflète avec des vaguelettes en carte de normales, eaux profondes plus sombres au loin.
- **Relief en facettes** (montagnes enneigées en flat shading, conifères en cônes) noyé dans la brume : réaliste par la lumière, simple par la géométrie.
- Les zones de pêche sont **des anneaux de bouées blanches** posés sur l'eau, avec une petite carte blanche en dessous (nom, espèce, nombre de bateaux).
- **L'interface flotte sur des cartes blanches** à coins très arrondis, légèrement transparentes, avec une ombre douce ; un seul accent (bleu) ; typo Ubuntu.

Repris pour Faucille (principes, pas d'asset) :
1. Scène three.js en temps réel : ciel physique, eau qui reflète, brume, relief en facettes.
2. Les couloirs deviennent **des anneaux de flotteurs** sur l'eau (lisibles, et ils s'allument quand la tige est coupable).
3. Cartes blanches dépolies + Ubuntu + un seul accent (vert d'étang au lieu du bleu).

Pas repris : la ville, les bateaux, la mer, la neige, le bleu, les textes.
