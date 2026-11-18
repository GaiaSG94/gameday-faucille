# PAGES — Faucille

> Statuts : à dessiner / en revue / validée. Liste de départ du brief, **à valider par Gaia**.
> Chaque planche montre le cadre desktop 1440 × 900 et le cadre mobile 390 × 844 côte à côte.

| # | Page | Rôle | Contenu clé | Statut |
|---|------|------|-------------|--------|
| 1 | **Post** | Vue dans le feed (splash inline) : donner envie d'entrer dans l'étang du jour | En-tête du post, nom du jeu, date de l'étang, série du joueur, bouton « Wade in » | **en revue** (`planches/v3/02-post.html`) |
| 2 | **Jeu** | Écran principal, une seule règle : « Tap a lane to cut the stem before it hits the water » | 4 couloirs, tiges qui tombent, zone de coupe, eau, geste de faucille au toucher, chrono 60 s, panier (quota 12), score, ratés, série | **validée** (style V3, `planches/v3/01-jeu.html`) |
| 3 | **Carte de fin** | Résultat + boucle quotidienne + accroche commentaire | « Basket full » ou score, coupes / ratés, série, invitation à commenter en un geste, nouvel étang demain | **en revue** (`planches/v3/03-carte-de-fin.html`) |
| 4 | **Séries & classement** | Montrer la série et la communauté | Série perso, scores de la communauté du jour | **en revue** (`planches/v3/04-series-classement.html`) |

États à couvrir dans la déclinaison (déjà présents dans le code) : chargement (« Wading to the reeds… »), erreur, prêt (« Enter the reeds »), déjà joué aujourd'hui (`solvedToday`).

## Questions produit ouvertes (non tranchées)

1. **Les tiges tombent ou montent ?** Le pitch dit « falling stems … before they hit the pond », mais le README et le rendu actuel font *monter* les tiges (« Reeds keep rising over the pond »). Les planches dessinent la chute vers l'eau (le pitch). À confirmer.
2. **Combo** : `IDEE.md` parle de « combo score », le calcul actuel (`scoreFor`) n'en a pas (10 par coupe, −25 par raté, +50 au quota). Les planches affichent un compteur de coupes d'affilée (×3) à titre indicatif. On le garde, ou on le retire ?
3. **Scores de la communauté** : rien n'est stocké aujourd'hui (Redis ne garde que série et « solved »). La page 4 et la carte de fin en ont besoin : quelles données (classement du jour par score ? répartition des scores ? nombre de joueurs ?).
4. **Une seule partie par jour ?** Le code laisse rejouer (« Back to the pond ») et ne compte que la première victoire pour la série. La carte de fin doit-elle afficher « rejouer » ou « à demain » ?
