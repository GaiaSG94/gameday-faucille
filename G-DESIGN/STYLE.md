# STYLE — Faucille (validé le 2026-11-18, V3 « Étang en volume »)

> Style validé par Gaia : réalisme 3D selon la méthode Bankkeeper V9, appliqué à l'étang de Faucille. Source de vérité pour toutes les planches et pour l'app. Référence vivante : `G-DESIGN/planches/v3/01-jeu.html`, code : `G-DESIGN/gen/v3/scene.js`.

## 1. Principe
Une seule scène 3D en temps réel (three.js) occupe tout le post. L'interface ne fait que flotter dessus, sur des cartes blanches dépolies. La lumière porte le jeu : les flotteurs s'allument quand il faut couper, et le soleil descend avec le temps qui reste.

## 2. La scène
| Élément | Règle |
|---|---|
| Ciel | Shader `Sky` : turbidité 14, rayleigh 3,8, mie 0,012 / 0,92. Soleil plein sud au-dessus de la rive du fond (azimut 178°). |
| Soleil = temps | Élévation `9° − 7,5° × t` (t = 0 au début de la manche, 1 à la fin). Accueil t ≈ 0,1 ; carte de fin t = 1 (le soleil touche la rive). |
| Brume | `Fog #c9a874`, de 50 à 240 m. Tout ce qui est loin se fond dans l'or. |
| Eau | Shader `Water` modifié : couleur `#07200f`, réflectance de base 0,1, ciel réfléchi × 0,55, terme solaire diffus × 0,04, vaguelettes fines (taille 18, distorsion 0,7). L'étang reflète collines et roseaux ; ce n'est jamais un miroir chromé. |
| Relief | Deux crêtes en facettes (flat shading) `#51603a` puis `#3c5530`, rive `#2b3f22`, ~260 arbres (cônes + feuillus icosaèdres). |
| Végétation | Roselières instanciées (lames coniques courbées, teinte HSL 0,17–0,24) avec massettes brunes ; touffes sombres au premier plan, sur les bords. Nénuphars à encoche, jamais dans la zone de jeu. |
| Ponton + panier | Ponton bas à gauche, panier tressé ; il contient autant de tiges que de coupes. |
| Lumières | Directionnelle chaude `#ffd7a0` qui suit le soleil, hémisphérique `#ffe2b4` / `#2a4128`. Tone mapping ACES, exposition 0,6. |

## 3. Objets de jeu
| Objet | Rendu | États |
|---|---|---|
| Couloir | Anneau de 12 flotteurs en liège `#efe6d2` sur une corde, rayon 0,95 (desktop) / 0,8 (mobile), espacement 3 / 2,15 | éteint · **allumé** (liège `#ffd27a`, émissif `#e3a23b`) quand la tige est coupable |
| Tige | Massette : tige `#6f8f45`, épi `#7a5232`, pointe, une feuille courbée ; tombe en tournant légèrement | trop haute (au-dessus de 75 % de la chute) · coupable · danger (≥ 88 %) |
| Danger | Disque lumineux additif `#ffc766` à 45 % sur l'eau, sous la tige | — |
| Coupe | Arc de lumière effilé `#ffeab8` (additif) + halo ; la tête part en vrille ; ~70 particules de duvet | 180 ms puis s'efface |
| Raté | 4 ronds concentriques `#fff3d6` + gouttes | −25 |

## 4. Interface
- **Typo** : Ubuntu (embarquée dans l'app, libre). Titres 700, chiffres tabulaires, libellés 10 px capitales espacées 0,16 em. Une seule famille.
- **Couleurs UI** : encre `#13261a`, texte secondaire `#5d6b60`, libellés `#7a857c`, **accent unique `#1f5a3a`** (vert d'étang). L'or n'existe que dans la lumière de la scène, jamais dans l'UI.
- **Cartes** : fond `rgba(255,255,255,.84)`, flou 10 px, rayon 14 px, ombre `0 10px 30px -14px rgba(19,38,26,.55)`. Pas de bordure.
- **Barre** : pilule pleine largeur, 38 px, nom du jeu en accent à gauche, date, série à droite.
- **Bouton principal** : pilule pleine accent `#1f5a3a`, texte blanc 700, une seule par écran. Bouton secondaire : pilule blanche, texte accent.
- **Pastilles** : 9 px ; pleines en accent, vides `#d7ddd6` (panier 12, semaine 7).
- **Grille** : marges de 12 px (desktop) / 10 px (mobile) entre les bords du post et les cartes ; cartes en haut, règle ou action en bas ; la zone des anneaux reste toujours libre.

## 5. Cadres
- Post déplié : desktop 736 × 680, mobile 390 × 710 (sous la barre de l'app).
- Post dans le feed (vue inline) : desktop 736 × 400, mobile 390 × 400. Plan large de l'étang, sans tige.
- Caméras : jeu desktop `(0, 5.4, 16) → (0, 3.5, 0)` fov 46 ; jeu mobile `(0, 5.6, 15.5) → (0, 4.1, 0)` fov 60 ; les autres pages sont décrites dans `scene.js` (`PRESETS`).

## 6. Mouvement
- L'eau bouge toujours (lentement). Les tiges tombent, tournent un peu, et rien ne tremble.
- Pas de flash plein écran, pas de secousse : la seule réponse forte est l'arc de lumière.
- `prefers-reduced-motion` : l'eau s'arrête, le reste est inchangé.

## 7. Interdits
Un second accent dans l'UI ; une carte qui couvre un anneau ; de l'eau qui redevient un miroir chromé ; un emoji ; un Snoo, du karma, ou une référence visuelle à Reddit dans la scène.
