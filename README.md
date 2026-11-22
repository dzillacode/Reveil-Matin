# Réveil — iPad mini 2

Application web de réveil (rouge sur noir, météo, radios belges) pour iPad sous iOS 12.

Fichiers : `index.html` (l'application) et `sw.js` (cache hors ligne, actif en HTTPS uniquement).

## 1. Mettre l'application en ligne

### Option A : hébergement HTTPS gratuit (recommandé)
Avec GitHub Pages, Cloudflare Pages ou Netlify, déposez le dossier `reveil` et ouvrez l'adresse obtenue dans Safari sur l'iPad.
- Avantage : l'application se rouvre même si votre Mac est éteint, grâce au cache hors ligne.
- Limite : les radios diffusées uniquement en `http://` sont grisées, car Safari les bloque sur une page HTTPS. La plupart des radios RTBF, VRT et privées ont un flux HTTPS.

### Option B : depuis votre Mac, sur le Wi-Fi de la maison
```bash
cd chemin/vers/reveil
ruby -run -e httpd . -p 8000
```
(Ruby est déjà installé sur macOS. Si vous avez Python, `python3 -m http.server 8000` marche aussi.)
Sur l'iPad, ouvrez `http://<adresse-IP-du-Mac>:8000` (l'adresse IP se trouve dans Réglages Système › Wi-Fi › Détails).
- Avantage : toutes les radios fonctionnent, y compris celles en HTTP.
- Limite : si l'iPad recharge la page alors que le Mac est éteint, l'application ne s'ouvre plus.

## 2. Installer sur l'iPad
1. Dans Safari, appuyez sur Partager › **Sur l'écran d'accueil**.
2. Lancez l'application depuis l'icône « Réveil » : elle s'ouvre en plein écran.
3. Touchez **TOUCHER POUR ACTIVER**. Il faut le refaire à chaque ouverture, c'est une règle d'iOS pour le son.

## 3. Réglages de l'iPad (indispensables)
- **Réglages › Luminosité et affichage › Verrouillage automatique › Jamais.** Si l'écran se verrouille, le réveil ne sonnera pas.
- **Réglages › Accessibilité › Accès guidé › activé.** Triple-clic sur le bouton principal pour verrouiller l'iPad dans l'application.
- **Volume au maximum** (boutons latéraux), mode silencieux désactivé.
- **Luminosité automatique désactivée**, curseur de luminosité assez bas.
- **Toujours branché** au secteur.

## 4. Utilisation
- **Toucher l'écran** affiche les boutons Alarmes / Radio / Réglages pendant 10 secondes et rallume le mode nuit.
- **Alarmes :** réglez l'heure, les jours et la station de chaque alarme (bouton « Choisir »).
- **Radio :**
  - ▶ pour écouter une station ;
  - ★ pour en faire la station par défaut (alarmes sans station, test, endormissement) ;
  - 15/30/60 min pour s'endormir en musique.
- **Réglages :** ville de la météo, horaires du mode nuit, durée du snooze, montée progressive du volume, test de l'alarme.

## 5. Sécurités intégrées
- Si la radio ne démarre pas en 15 secondes (Wi-Fi coupé, flux en panne), un **bip de secours** sonne et la radio est retentée toutes les 90 secondes.
- La montée progressive passe par la Web Audio API. Si la station ne le permet pas, la radio joue directement à plein volume, l'appli bascule toute seule.
- Le bandeau rouge « Audio en pause » signifie qu'iOS a coupé le son. Touchez l'écran pour le réactiver.
- L'alarme s'arrête d'elle-même après 45 minutes.

## 6. Checklist de test
- [ ] Réglages › « Tester l'alarme dans 1 min », avec une station ★ choisie.
- [ ] Même test avec le Wi-Fi coupé : le bip de secours doit sonner.
- [ ] Une alarme réglée 3 minutes plus tard, en laissant l'écran tranquille.
- [ ] Une nuit complète, en gardant l'alarme de l'app Horloge d'iOS comme filet de sécurité les premiers jours.

## Limites connues
- L'application doit rester **au premier plan**. Si vous changez d'app ou si l'écran se verrouille, elle ne sonnera pas.
- Les adresses des radios viennent de l'annuaire libre radio-browser.info. Si une station ne marche plus, choisissez-en une autre de même nom, ou collez l'adresse du flux dans « Adresse de flux manuelle ».
