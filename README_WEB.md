# Initiative Panic - Version Web Statique

## 🎯 Version Simplifiée - Installation Zéro !

Parfait ! Vous avez choisi la version web statique qui fonctionne partout sans installation. C'est exactement les mêmes fonctionnalités que la version React, mais en HTML/CSS/JavaScript pur.

## 🚀 Utilisation Immédiate

### Étape 1 : Ouvrir la page web
1. Allez dans le dossier `web/` du projet
2. Double-cliquez sur `index.html`
3. Ou faites un clic droit → "Ouvrir avec" → votre navigateur web

**L'application démarre instantanément !** 🎉

### Étape 2 : Découvrir les fonctionnalités

#### 📋 Gestion des Personnages
- **2 personnages pré-configurés** : Aldric le Guerrier, Elara la Magicienne
- **Stats complètes** : PV, CA, initiative, caractéristiques
- **Modification** : Cliquez sur ✏️ pour éditer
- **Copie** : Cliquez sur 📋 pour dupliquer
- **Suppression** : Cliquez sur 🗑️ pour supprimer

#### 👹 Gestion des Monstres
- **15 catégories** : Humanoïdes, Morts-vivants, Dragons, etc.
- **Monstres pré-configurés** : Gobelin, Orc, Troll, Dragon, etc.
- **Fonction de copie** rapide pour créer des variantes

#### 📖 Grimoire de Sorts
- **5 sorts de base** : Éclair de Feu, Missile Magique, Bouclier, Soins, Boule de Feu
- **Filtres par niveau** : Cantrips → Niveau 9
- **Recherche** : Trouvez rapidement un sort
- **Détails complets** : Temps d'incantation, portée, durée, composantes

#### ⚡ Rencontres
- **Créez vos rencontres** : Combinaison de joueurs et monstres
- **Quantités multiples** : Ajoutez plusieurs monstres du même type
- **Marqueurs** : Distinguez les créatures (ex: "Gobelin A", "Gobelin B")
- **Démarrage rapide** : Lancement direct vers le combat

#### 🎯 Combat (Règles D&D 2024)
- **Initiative groupée** : Monstres de même type = même initiative
- **Ordre automatique** : Tri par initiative décroissante
- **Tour par tour** : Navigation fluide entre les créatures
- **Modification des PV** : ±PV en temps réel
- **Visualisation claire** : Tour actuel mis en évidence

#### 🔄 Synchronisation GitHub
- **Export/Import** : Sauvegardez sur GitHub
- **Multi-appareils** : Ordinateur ↔ Tablette
- **Configuration simple** : Token GitHub + repository
- **Sécurisé** : Token stocké localement

## 📱 Optimisation Tablette 11"

L'interface est **optimisée pour les tablettes 11" en mode horizontal** :

- **Grilles adaptatives** : 2 colonnes sur tablette
- **Boutons tactiles** : Taille optimisée pour le doigt
- **Interface compacte** : Maximum d'informations visibles
- **Combat side-by-side** : Tour actuel + Ordre d'initiative

## 🛠️ Fonctionnalités Techniques

### Stockage Local
- **LocalStorage** : Données sauvegardées dans le navigateur
- **Persistance** : Vos données restent après fermeture
- **Export possible** : Sauvegarde manuelle si nécessaire

### Règles D&D 2024
- **Calculs automatiques** : Modificateurs de caractéristiques
- **Initiative correcte** : DEX + bonus d'initiative
- **Groupes de monstres** : Même type = même initiative
- **Gestion des PV** : Suivi en temps réel

### Design Thématique
- **Couleurs D&D** : Rouge, or, noir, brun
- **Polices fantasy** : Cinzel (titres), Crimson Text (corps)
- **Animations** : Transitions fluides et effets hover
- **Responsive** : Mobile, tablette, desktop

## 🎯 Workflow Recommandé

### Sur Ordinateur (Préparation)
1. **Créez/modifiez** vos personnages et monstres
2. **Préparez vos rencontres** avec les bons participants
3. **Exportez vers GitHub** : Bouton 🔄 Sync → 📤 Exporter

### Sur Tablette (Pendant le jeu)
1. **Importez depuis GitHub** : 🔄 Sync → 📥 Importer
2. **Lancez le combat** : Rencontres → Sélectionner → ⚔️ Démarrer
3. **Gérez le combat** : Tours, PV, initiative
4. **Exportez si modifications** : 🔄 Sync → 📤 Exporter

## 📁 Structure des Fichiers

```
web/
├── index.html          # Page principale
├── styles.css          # Styles D&D thématiques  
├── app.js              # Logique JavaScript complète
└── README_WEB.md       # Ce guide
```

## 🔧 Personnalisation

### Ajouter des données initiales
Dans `app.js`, modifiez les fonctions :
- `getInitialCreatures()` : Personnages et monstres
- `getInitialSpells()` : Sorts disponibles
- `getInitialCategories()` : Catégories

### Modifier les couleurs
Dans `styles.css`, modifiez les variables CSS :
```css
:root {
    --dnd-red: #8B0000;      /* Rouge D&D */
    --dnd-gold: #FFD700;     /* Or D&D */
    --dnd-dark: #1a1a1a;    /* Fond sombre */
    /* ... */
}
```

## 🚨 Dépannage

### La page ne s'ouvre pas
- **Solution** : Clic droit → "Ouvrir avec" → Chrome/Firefox/Edge
- **Alternative** : Glissez `index.html` directement dans votre navigateur

### Les données ne se sauvegardent pas
- **Vérifiez** : Autorisez les cookies/localstorage dans votre navigateur
- **Solution** : Paramètres du navigateur → Confidentialité → Cookies

### Synchronisation GitHub ne fonctionne pas
- **Vérifiez** : Token GitHub valide et permissions
- **Solution** : Regénérez un nouveau token depuis GitHub

## 🎲 Avantages de la Version Web

✅ **Installation zéro** : Double-cliquez et ça marche  
✅ **Compatible partout** : Windows, Mac, Linux, tablette  
✅ **Hors ligne** : Fonctionne sans internet  
✅ **Léger** : Pas de dépendances lourdes  
✅ **Rapide** : Démarrage instantané  
✅ **Portable** : Copiez le dossier sur une clé USB  

## 🆚 Comparaison avec Version React

| Caractéristique | Version Web | Version React |
|---|---|---|
| Installation | ❌ Non requis | ⚠️ Node.js requis |
| Complexité | ✅ Simple | ⚠️ Complexe |
| Performance | ✅ Rapide | ⚠️ Plus lente |
| Maintenance | ✅ Facile | ⚠️ Technique |
| Fonctionnalités | ✅ Identiques | ✅ Identiques |

---

**Conclusion** : La version web statique offre **exactement les mêmes fonctionnalités** avec une simplicité bien meilleure pour votre usage. Idéal pour les maîtres du jeu qui veulent un outil efficace sans complications techniques !

**Bon jeu et que vos combats D&D 2024 soient épiques !** ⚔️🎲
