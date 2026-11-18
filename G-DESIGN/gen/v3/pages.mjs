// Page definitions for the V3 boards. Each page = header + desktop frame + mobile frame + state tiles.
// Scene canvases carry data-view (preset in scene.js) and data-frame (desk|mob).

const SWATCHES = [
  ['#f0d9a6', 'ciel bas', '#1c1d18'], ['#c9a874', 'brume', '#1c1d18'], ['#51603a', 'relief loin', '#efe5cb'], ['#2b3f22', 'rive', '#efe5cb'],
  ['#07200f', 'eau', '#efe5cb'], ['#efe6d2', 'liège', '#1c1d18'], ['#ffd27a', 'liège allumé', '#1c1d18'], ['#1f5a3a', 'accent UI', '#efe5cb'],
];
const sw = SWATCHES.map(([c, n, t]) => `<span style="background:${c};color:${t}">${c}<br>${n}</span>`).join('');
const pips = (n, on) => `<div class="pips">${Array.from({ length: n }, (_, i) => `<i class="${i < on ? 'on' : ''}"></i>`).join('')}</div>`;

const SIDE = `<div class="d-side">
  <div style="background:#fff;border:1px solid #e4e6e8;border-radius:12px;padding:16px;font-size:13px;color:#3b4146;line-height:1.5"><h4 style="font-size:14px;color:#1f2326;margin-bottom:6px">r/faucille_daily</h4>One pond a day. Same reeds for everyone.</div>
  <div style="margin-top:16px;background:#fff;border:1px solid #e4e6e8;border-radius:12px;padding:16px;font-size:13px;color:#3b4146;line-height:1.5"><h4 style="font-size:14px;color:#1f2326;margin-bottom:6px">Comments</h4>
    <div style="border-top:1px solid #eef0f2;padding:10px 0"><b style="font-size:12px;color:#6b7176;display:block">u/marsh_wren</b>Basket full on the last stem. Ring 3 is evil after 0:40.</div>
    <div style="border-top:1px solid #eef0f2;padding:10px 0"><b style="font-size:12px;color:#6b7176;display:block">u/low_tide</b>9 day streak and I still panic when two rings light up.</div>
  </div></div>`;
const NAV = `<div class="d-nav"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div>`;
const POSTH = `<div class="post-h"><span class="av">F</span><b>r/faucille_daily</b> · u/faucille-app · 2 h</div><div class="post-t">Faucille — today's pond, Nov 18</div>`;

const deskExpanded = (view, hud) => `<div class="desk">
  <div class="d-top"><div class="d-logo"></div><div class="d-search">Search</div><div class="d-user"></div></div>
  <div class="d-body">${NAV}
    <div class="post">${POSTH}
      <div class="post-body" style="width:736px;height:680px"><div class="sc" style="width:736px;height:680px"><canvas data-view="${view}" data-frame="desk"></canvas><div class="hud">${hud}</div></div></div>
      <div class="post-f"><span>214 comments</span><span>Share</span></div>
    </div>${SIDE}
  </div></div>`;
const mobExpanded = (view, hud) => `<div class="mob">
  <div class="m-status"><span>9:41</span><span>●●● ▮</span></div>
  <div class="m-bar"><span class="bk">‹</span>r/faucille_daily</div>
  <div class="m-game" style="flex:none;height:710px"><div class="sc m" style="width:390px;height:710px"><canvas data-view="${view}" data-frame="mob"></canvas><div class="hud">${hud}</div></div></div>
  <div class="m-foot"><span>214 comments</span><span>Share</span></div></div>`;
const deskFeed = (view, hud) => `<div class="desk">
  <div class="d-top"><div class="d-logo"></div><div class="d-search">Search</div><div class="d-user"></div></div>
  <div class="d-body feed">${NAV}
    <div><div class="post">${POSTH}
      <div class="post-body" style="width:736px;height:400px"><div class="sc" style="width:736px;height:400px"><canvas data-view="${view}" data-frame="desk"></canvas><div class="hud">${hud}</div></div></div>
      <div class="post-f"><span>214 comments</span><span>Share</span></div></div>
      <div class="post" style="margin-top:16px;padding-bottom:16px"><div class="post-h"><span class="av" style="background:#dfe2e5"></span><b>r/another_sub</b> · 5 h</div><div class="skel" style="width:60%;height:16px"></div><div class="skel"></div><div class="skel" style="width:85%"></div><div style="height:160px;border-radius:10px;background:#eef0f2;margin-top:12px"></div></div>
    </div>${SIDE}
  </div></div>`;
const mobFeed = (view, hud) => `<div class="mob">
  <div class="m-status"><span>9:41</span><span>●●● ▮</span></div>
  <div class="m-feedbar">Home <span>Popular</span><span>Latest</span></div>
  <div style="flex:1;overflow:hidden">
    <div class="m-postcard">${POSTH}
      <div class="sc m" style="width:390px;height:400px"><canvas data-view="${view}" data-frame="mob"></canvas><div class="hud">${hud}</div></div>
      <div class="post-f"><span>214 comments</span><span>Share</span></div></div>
    <div style="padding:12px 14px"><div class="post-h"><span class="av" style="background:#dfe2e5"></span><b>r/another_sub</b> · 5 h</div><div class="skel" style="width:70%;height:16px"></div><div class="skel"></div><div style="height:120px;border-radius:10px;background:#eef0f2;margin-top:10px"></div></div>
  </div></div>`;

const BAR = (streak, day = 'Pond · Wed Nov 18') => `<div class="card bar"><span class="nm">Faucille</span><span class="dy">${day}</span><span class="sk"><b>${streak}</b>day streak</span></div>`;
const tile = (state, inner = '') => `<div class="st-box" data-state="${state}">${inner}</div>`;
const st = (box, title, note) => `<div class="st">${box}<b>${title}</b><i>${note}</i></div>`;

// ------------------------------------------------------------------ 01 · Jeu
const gameHud = (m) => `${BAR(6, m ? 'Nov 18' : 'Pond · Wed Nov 18')}
  <div class="card score"><div class="k">Score</div><div class="v">65</div><div class="t">0:26 left</div></div>
  <div class="card basket" style="left:${m ? 10 : 12}px;top:${m ? 56 : 60}px"><div class="k">Basket</div><div class="v">9 <s>/ 12</s></div>${m ? '' : pips(12, 9)}<div class="ms" style="margin-top:${m ? 2 : 6}px">1 lost to the water</div></div>
  <div class="card rule" style="bottom:${m ? 10 : 12}px">Tap a ring to <b>cut the stem</b> before it hits the water</div>`;

// ------------------------------------------------------------------ 02 · Post
const postHud = (m) => `
  <div class="card hero" style="${m ? 'left:10px;right:10px;bottom:10px' : 'left:20px;bottom:20px;width:370px'}">
    <div class="k">Today's pond · Wed Nov 18</div>
    <h2>Faucille</h2>
    <p>Cut the falling stems before they hit the pond. One pond a day, the same for everyone.</p>
    <div class="row"><span class="btn">Wade in</span><span class="chip"><b>6</b>day streak</span></div>
  </div>
  ${m ? '' : `<div class="card facts" style="right:20px;top:20px"><div><div class="k">Round</div><div class="v">60 s</div></div><div><div class="k">Basket</div><div class="v">12 stems</div></div></div>`}`;

// ------------------------------------------------------------------ 03 · Carte de fin
const endHud = (m) => `${BAR(7, m ? 'Nov 18' : 'Pond · Wed Nov 18')}
  <div class="card result" style="${m ? 'left:10px;right:10px;bottom:10px' : 'right:12px;top:60px;width:340px'}">
    <div class="k">Pond of Nov 18 · done</div>
    <h2>Basket full</h2>
    <div class="big"><span class="v">145</span><span class="u">points</span></div>
    <div class="stats"><div><div class="k">Cut</div><div class="v">12</div></div><div><div class="k">Lost</div><div class="v">1</div></div><div><div class="k">Streak</div><div class="v">7</div></div></div>
    <div class="quote"><div class="who">Your comment, ready to post</div>Faucille · Nov 18 · basket full, 145 pts, streak 7<br><span class="dots">●●●●●●●●●●●● ○</span></div>
    <div class="actions"><span class="btn">Post to the thread</span><span class="btn2">Today's scores</span></div>
    <div class="next">New reeds in <b>07:12:40</b></div>
  </div>`;

// ------------------------------------------------------------------ 04 · Séries & classement
// last 7 days ending today (Wed): a 7-day streak fills all of them
const WEEK = ['T', 'F', 'S', 'S', 'M', 'T', 'W'];
const week = WEEK.map((d, i) => `<div><span>${d}</span><i class="${i === 6 ? 'on today' : 'on'}"></i></div>`).join('');
const LB = [[1, 'heron_at_dawn', 175], [2, 'marsh_wren', 170], [3, 'quietoar', 165], [4, 'low_tide', 160], [5, 'reedbed_rita', 160]];
const lb = LB.map(([r, n, s]) => `<div><span class="r">${r}</span><span class="n">u/${n}</span><span class="s">${s}</span></div>`).join('')
  + `<div class="me"><span class="r">23</span><span class="n">you</span><span class="s">145</span></div>`;
const HIST = [2, 3, 5, 8, 11, 15, 19, 22, 18, 13, 9, 6, 3];
const hist = HIST.map((h, i) => `<i class="${i === 10 ? 'me' : ''}" style="height:${h * 2.8}px"></i>`).join('');
const seriesHud = (m) => `${BAR(7, m ? 'Nov 18' : 'Pond · Wed Nov 18')}
  <div class="card panel" style="${m ? 'left:10px;right:10px;top:56px' : 'left:12px;top:60px;width:300px'}">
    <div class="k">Your streak</div>
    <div class="streakv">7<small>days in a row</small></div>
    <div class="week">${week}</div>
    <div class="sum">Fill tomorrow's basket to make it <b>8</b>.</div>
  </div>
  <div class="card panel" style="${m ? 'left:10px;right:10px;bottom:10px' : 'right:12px;top:60px;width:340px'}">
    <div class="k">Today's pond · community</div>
    <h3>1,284 players · 61% filled the basket</h3>
    <div class="lb">${lb}</div>
    ${m ? '' : `<div class="k" style="margin-top:14px">Scores today</div><div class="hist">${hist}</div><div class="hax"><span>0</span><span>you · 145</span><span>195</span></div>`}
  </div>`;

export const PAGES = [
  {
    file: '01-jeu.html', id: 'Jeu', title: 'Jeu', kicker: 'page principale · validée (V3)',
    why: "<b>La manche en cours.</b> Une scène 3D rendue en temps réel : ciel physique au crépuscule, eau qui reflète, collines en facettes, roselières. Les quatre couloirs sont <b>quatre anneaux de flotteurs</b> ; ceux de la tige coupable s'allument. Le soleil descend avec le temps qui reste. Cartes blanches dépolies, un seul accent vert d'étang.",
    desk: deskExpanded('game', gameHud(false)), mob: mobExpanded('game', gameHud(true)), deskLabel: 'Desktop · 1440 × 900 · post déplié dans le feed (scène 3D en direct)', mobLabel: 'Mobile · 390 × 844 · post déplié',
    states: [
      st(tile('ready', '<span class="cta">Enter the reeds</span>'), 'Prêt', 'soleil plus haut, anneaux éteints, un seul bouton'),
      st(tile('early'), 'Trop tôt', 'tige haute, anneau éteint : le toucher ne fait rien'),
      st(tile('live'), 'Coupable', "les flotteurs de l'anneau s'allument"),
      st(tile('cut'), 'Coupe', 'arc de lumière 180 ms, la tête part, le duvet s\'envole'),
      st(tile('danger'), 'Danger', "l'eau s'éclaire sous la tige qui arrive"),
      st(tile('miss'), 'Raté', "ronds dans l'eau + gouttes ; −25"),
      st(tile('end'), 'Fin de manche', 'le soleil touche la rive : manche finie'),
    ].join(''),
    foot: "Planche figée à 0:34 : 9 coupes sur 12, 1 raté, score 65 (10 par coupe, −25 par raté, +50 au quota), série de 6 jours. Anneau 1 : tige coupable · 2 : coupe · 3 : tige encore trop haute · 4 : tige sur le point de toucher l'eau.",
  },
  {
    file: '02-post.html', id: 'Post', title: 'Post', kicker: 'vue dans le feed (inline)',
    why: "<b>Donner envie d'entrer dans l'étang du jour.</b> Dans le feed, le post montre l'étang en plan large, encore calme : soleil plus haut, anneaux éteints, panier vide sur le ponton. Une seule carte : la date de l'étang, le nom, une phrase, le bouton <b>Wade in</b> et la série du joueur. Pas de tige qui tombe tant qu'on n'est pas entré : le feed reste paisible.",
    desk: deskFeed('post', postHud(false)), mob: mobFeed('post', postHud(true)), deskLabel: 'Desktop · 1440 × 900 · le post dans le feed (vue inline 736 × 400)', mobLabel: 'Mobile · 390 × 844 · post dans le feed',
    states: [
      st(tile('calm', `<div class="card mini"><div class="k">Nov 18</div><b class="h">Faucille</b>Cut the stems before they hit the pond.<br><span class="btn">Wade in</span></div>`), 'Pas encore joué', 'état par défaut : bouton plein'),
      st(tile('dusk', `<div class="card mini"><div class="k">Nov 18 · done</div><b class="h">Basket full</b>Streak 7. New reeds tomorrow.<br><span class="btn2">See the pond</span></div>`), 'Déjà joué (gagné)', '`solvedToday` : le soleil est couché, bouton secondaire'),
      st(tile('mid', `<div class="card mini"><div class="k">Nov 18</div><b class="h">Faucille</b>Wading to the reeds…</div>`), 'Chargement', 'texte du code actuel, sans spinner'),
      st(tile('calm', `<div class="card mini"><div class="k">Nov 18</div><b class="h">The pond is misty</b>We couldn't reach today's reeds.<br><span class="btn2">Try again</span></div>`), 'Erreur', "même carte, bouton pour recharger"),
    ].join(''),
    foot: "Les chiffres affichés (60 s, 12 tiges, série 6) viennent du code actuel (`ROUND_MS`, `quota`, Redis `streak:`). La vue inline n'anime que l'eau ; three.js n'est chargé qu'une fois le post ouvert si le poids pose problème (à vérifier, voir DESIGN.md).",
  },
  {
    file: '03-carte-de-fin.html', id: 'Carte de fin', title: 'Carte de fin', kicker: 'résultat · série · commentaire',
    why: "<b>La manche est finie, le soleil touche la rive.</b> La caméra descend sur le ponton : le panier est plein des 12 tiges coupées. Une carte donne le résultat (titre, score, coupes, ratés, série), puis <b>le commentaire tout prêt</b> à poster dans le fil en un geste, avec une rangée de 12 points + 1 rond pour le raté, lisible sans spoiler. Un compte à rebours annonce le prochain étang.",
    desk: deskExpanded('end', endHud(false)), mob: mobExpanded('end', endHud(true)), deskLabel: 'Desktop · 1440 × 900 · fin de manche, post déplié', mobLabel: 'Mobile · 390 × 844 · fin de manche',
    states: [
      st(tile('dusk', `<div class="card mini"><div class="k">Nov 18 · done</div><b class="h">Basket full</b>145 pts · 12 cut · 1 lost<br><span class="btn">Post to the thread</span></div>`), 'Gagné', 'état de la planche'),
      st(tile('dusk', `<div class="card mini"><div class="k">Nov 18 · done</div><b class="h">2 short of the basket</b>50 pts · 10 cut · 2 lost. Streak lost.<br><span class="btn">Post to the thread</span></div>`), 'Perdu', 'quota non atteint : la série retombe (règle Redis actuelle)'),
      st(tile('dusk', `<div class="card mini"><div class="k">Nov 18 · done</div><b class="h">Posted</b>Your result is in the thread.<br><span class="btn2">Today's scores</span></div>`), 'Commentaire posté', 'le bouton plein disparaît'),
    ].join(''),
    foot: "Score 145 = 12 × 10 − 1 × 25 + 50 (`scoreFor`). Série 7 = 6 + la victoire du jour. Le commentaire est posté au nom du joueur après son geste (pas d'envoi automatique).",
  },
  {
    file: '04-series-classement.html', id: 'Séries & classement', title: 'Séries & classement', kicker: 'série perso · communauté du jour',
    why: "<b>Ce qu'on revient voir.</b> Vue haute et calme sur l'étang au crépuscule, sans anneau. À gauche, <b>ta série</b> en grand et les 7 derniers jours en pastilles (aujourd'hui cerclé). À droite, <b>l'étang du jour pour la communauté</b> : nombre de joueurs, part qui a rempli le panier, les 5 meilleurs scores, ta ligne surlignée, et la répartition des scores avec ta position.",
    desk: deskExpanded('series', seriesHud(false)), mob: mobExpanded('series', seriesHud(true)), deskLabel: 'Desktop · 1440 × 900 · séries & classement, post déplié', mobLabel: 'Mobile · 390 × 844 · sans histogramme',
    states: [
      st(tile('mid', `<div class="card mini"><div class="k">Your streak</div><b class="h">No streak yet</b>Fill today's basket to start one.<br><span class="btn">Wade in</span></div>`), 'Première visite', 'série à 0 : on renvoie au jeu'),
      st(tile('mid', `<div class="card mini"><div class="k">Your streak</div><b class="h">Streak lost</b>Your 9 days ended yesterday.<br><span class="btn">Start again</span></div>`), 'Série perdue', 'ton neutre, pas de reproche'),
      st(tile('dusk', `<div class="card mini"><div class="k">Today's pond</div><b class="h">Be the first</b>No score yet today.</div>`), 'Classement vide', 'tôt le matin (UTC)'),
    ].join(''),
    foot: "<b>Données à créer côté serveur</b> (question 3 de PAGES.md) : nombre de joueurs du jour, part de paniers pleins, top 5 et rang, répartition des scores. Les valeurs affichées (1 284 joueurs, 61 %, rang 23) sont des données de démo pour la mise en page. Les 7 pastilles = les 7 derniers jours jusqu'à aujourd'hui (cerclé), déduits de la série actuelle.",
  },
];

export const page = (p, ui, chrome, js) => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Faucille · V3 · ${p.title}</title>
<style>
${chrome}
${ui}
</style>
</head>
<body>
<div class="sheet">
  <header class="sh-head">
    <div class="sh-id"><div class="k">Faucille · V3 · page « ${p.id} »</div><h1>${p.title}</h1><div class="k" style="margin-top:12px">${p.kicker}</div></div>
    <p class="sh-why">${p.why}</p>
    <div class="sh-spec"><div class="sw">${sw}</div><p class="ty">Style verrouillé : voir STYLE.md. Ubuntu, chiffres tabulaires, cartes blanches à 84 % floutées, accent unique #1f5a3a. Scène three.js 0.170.0 embarquée, aucune requête réseau.</p></div>
  </header>
  <div class="frames">
    <div><div class="fr-l">${p.deskLabel}</div>${p.desk}</div>
    <div><div class="fr-l">${p.mobLabel}</div>${p.mob}</div>
  </div>
  <section class="states">
    <div class="fr-l">États</div>
    <div class="st-row">${p.states}</div>
  </section>
  <p class="foot">${p.foot}</p>
</div>
<script>${js}</script>
</body>
</html>`;
