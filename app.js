// Initiative Panic Web Application
// D&D 2024 Combat Manager

// Data Management
class DataManager {
    constructor() {
        this.storageKey = 'initiative-panic-data';
        this.data = this.loadData();
    }

    loadData() {
        const stored = localStorage.getItem(this.storageKey);
        if (stored) {
            return JSON.parse(stored);
        }
        return this.getInitialData();
    }

    saveData() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.data));
    }

    getInitialData() {
        return {
            creatures: this.getInitialCreatures(),
            spells: this.getInitialSpells(),
            encounters: [],
            categories: this.getInitialCategories(),
            currentCombat: null
        };
    }

    getInitialCreatures() {
        return [
            {
                id: 'player-1',
                name: 'Aldric le Guerrier',
                type: 'player',
                category: 'players-heroes',
                stats: {
                    hp: 45,
                    maxHp: 45,
                    initiative: 3,
                    ac: 18,
                    speed: 9,
                    strength: 18,
                    dexterity: 14,
                    constitution: 16,
                    intelligence: 12,
                    wisdom: 14,
                    charisma: 10
                },
                spells: [],
                notes: 'Guerrier expérimenté avec un grand sens du devoir.'
            },
            {
                id: 'player-2',
                name: 'Elara la Magicienne',
                type: 'player',
                category: 'players-heroes',
                stats: {
                    hp: 22,
                    maxHp: 22,
                    initiative: 2,
                    ac: 14,
                    speed: 9,
                    strength: 8,
                    dexterity: 14,
                    constitution: 12,
                    intelligence: 18,
                    wisdom: 12,
                    charisma: 16
                },
                spells: ['spell-fire-bolt', 'spell-magic-missile', 'spell-shield'],
                notes: 'Magicienne puissante spécialisée en évocation.'
            }
        ];
    }

    getInitialSpells() {
        return [
            {
                id: 'spell-fire-bolt',
                name: 'Éclair de Feu',
                description: 'Vous lancez un éclair de feu sur une créature que vous pouvez voir. La cible doit réussir un jet de sauvegarde de Dextérité ou subit 1d10 dégâts de feu.',
                level: 0,
                school: 'Évocation',
                castingTime: '1 action',
                range: '36m',
                components: 'V, S',
                duration: 'Instantanée',
                concentration: false,
                ritual: false
            },
            {
                id: 'spell-magic-missile',
                name: 'Missile Magique',
                description: 'Vous créez trois missiles d\'énergie pure qui frappent des cibles que vous pouvez voir. Chaque missile inflige 1d4+1 dégâts de force.',
                level: 0,
                school: 'Évocation',
                castingTime: '1 action',
                range: '36m',
                components: 'V, S',
                duration: 'Instantanée',
                concentration: false,
                ritual: false
            },
            {
                id: 'spell-shield',
                name: 'Bouclier',
                description: 'Une barrière de force magique apparaît et vous protège. Jusqu\'à la fin de votre prochain tour, vous avez une protection contre les missiles magiques.',
                level: 1,
                school: 'Abjuration',
                castingTime: '1 réaction',
                range: 'Soi',
                components: 'V, S',
                duration: '1 round',
                concentration: false,
                ritual: false
            },
            {
                id: 'spell-cure-wounds',
                name: 'Soins Légers',
                description: 'Une créature que vous touche récupère 1d8 + votre modificateur de caractéristique d\'incantation points de vie.',
                level: 1,
                school: 'Conjuration',
                castingTime: '1 action',
                range: 'Toucher',
                components: 'V, S',
                duration: 'Instantanée',
                concentration: false,
                ritual: false
            },
            {
                id: 'spell-fireball',
                name: 'Boule de Feu',
                description: 'Une boule de feu explosante frappe un point que vous choisissez. Chaque créature dans un rayon de 6m doit réussir un jet de sauvegarde de Dextérité ou subit 8d6 dégâts de feu.',
                level: 3,
                school: 'Évocation',
                castingTime: '1 action',
                range: '45m',
                components: 'V, S, M',
                duration: 'Instantanée',
                concentration: false,
                ritual: false
            }
        ];
    }

    getInitialCategories() {
        return [
            // Player categories
            { id: 'players-heroes', name: 'Héros', type: 'players' },
            { id: 'players-npcs', name: 'PNJ Alliés', type: 'players' },
            { id: 'players-veterans', name: 'Vétérans', type: 'players' },
            
            // Monster categories
            { id: 'monsters-humanoids', name: 'Humanoïdes', type: 'monsters' },
            { id: 'monsters-undead', name: 'Morts-vivants', type: 'monsters' },
            { id: 'monsters-beasts', name: 'Bêtes', type: 'monsters' },
            { id: 'monsters-dragons', name: 'Dragons', type: 'monsters' },
            { id: 'monsters-aberrations', name: 'Aberrations', type: 'monsters' },
            { id: 'monsters-fiends', name: 'Diables et Démons', type: 'monsters' },
            
            // Spell categories
            { id: 'spells-basic', name: 'Sorts de Base', type: 'spells' },
            { id: 'spells-combat', name: 'Sorts de Combat', type: 'spells' },
            { id: 'spells-healing', name: 'Sorts de Soin', type: 'spells' },
            { id: 'spells-utility', name: 'Sorts Utilitaires', type: 'spells' },
            
            // Encounter categories
            { id: 'encounters-dungeons', name: 'Donjons', type: 'encounters' },
            { id: 'encounters-wilderness', name: 'Nature Sauvage', type: 'encounters' },
            { id: 'encounters-urban', name: 'Urbain', type: 'encounters' },
            { id: 'encounters-boss', name: 'Boss', type: 'encounters' }
        ];
    }
}

// GitHub Sync Service
class GitHubSyncService {
    constructor() {
        this.config = this.getGitHubConfig();
    }

    getGitHubConfig() {
        const token = localStorage.getItem('github-token');
        const owner = localStorage.getItem('github-owner');
        const repo = localStorage.getItem('github-repo');
        return { token, owner, repo };
    }

    saveGitHubConfig(token, owner, repo) {
        localStorage.setItem('github-token', token);
        localStorage.setItem('github-owner', owner);
        localStorage.setItem('github-repo', repo);
        this.config = { token, owner, repo };
    }

    clearGitHubConfig() {
        localStorage.removeItem('github-token');
        localStorage.removeItem('github-owner');
        localStorage.removeItem('github-repo');
        this.config = { token: null, owner: null, repo: null };
    }

    async testConnection() {
        if (!this.config.token || !this.config.owner || !this.config.repo) {
            return false;
        }

        try {
            const response = await fetch(
                `https://api.github.com/repos/${this.config.owner}/${this.config.repo}`,
                {
                    headers: {
                        'Authorization': `token ${this.config.token}`,
                        'Accept': 'application/vnd.github.v3+json'
                    }
                }
            );
            return response.ok;
        } catch {
            return false;
        }
    }

    async exportToGitHub(data) {
        if (!this.config.token || !this.config.owner || !this.config.repo) {
            throw new Error('Configuration GitHub manquante');
        }

        try {
            const content = JSON.stringify(data, null, 2);
            const contentBase64 = btoa(unescape(encodeURIComponent(content)));

            const response = await fetch(
                `https://api.github.com/repos/${this.config.owner}/${this.config.repo}/contents/data/initiative-panic-data.json`,
                {
                    method: 'PUT',
                    headers: {
                        'Authorization': `token ${this.config.token}`,
                        'Accept': 'application/vnd.github.v3+json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        message: `Mise à jour des données Initiative Panic - ${new Date().toLocaleString()}`,
                        content: contentBase64
                    })
                }
            );

            if (!response.ok) {
                const error = await response.json();
                throw new Error(`Erreur GitHub: ${error.message}`);
            }

            localStorage.setItem('last-sync', new Date().toISOString());
            return true;
        } catch (error) {
            console.error('Erreur lors de l\'export vers GitHub:', error);
            throw error;
        }
    }

    async importFromGitHub() {
        if (!this.config.token || !this.config.owner || !this.config.repo) {
            throw new Error('Configuration GitHub manquante');
        }

        try {
            const response = await fetch(
                `https://api.github.com/repos/${this.config.owner}/${this.config.repo}/contents/data/initiative-panic-data.json`,
                {
                    headers: {
                        'Authorization': `token ${this.config.token}`,
                        'Accept': 'application/vnd.github.v3+json'
                    }
                }
            );

            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('Aucune sauvegarde trouvée sur GitHub');
                }
                const error = await response.json();
                throw new Error(`Erreur GitHub: ${error.message}`);
            }

            const fileData = await response.json();
            const content = atob(fileData.content);
            const data = JSON.parse(content);
            
            localStorage.setItem('last-sync', new Date().toISOString());
            return data;
        } catch (error) {
            console.error('Erreur lors de l\'import depuis GitHub:', error);
            throw error;
        }
    }
}

// D&D Rules Service
class DnDRulesService {
    static getAbilityModifier(score) {
        return Math.floor((score - 10) / 2);
    }

    static calculateInitiative(creature) {
        const dexModifier = this.getAbilityModifier(creature.stats.dexterity);
        return dexModifier + creature.stats.initiative;
    }

    static rollMonsterInitiative(creature) {
        const initiative = this.calculateInitiative(creature);
        const d20Roll = Math.floor(Math.random() * 20) + 1;
        return d20Roll + initiative;
    }

    static rollWithAdvantage() {
        const roll1 = Math.floor(Math.random() * 20) + 1;
        const roll2 = Math.floor(Math.random() * 20) + 1;
        return Math.max(roll1, roll2);
    }

    static rollWithDisadvantage() {
        const roll1 = Math.floor(Math.random() * 20) + 1;
        const roll2 = Math.floor(Math.random() * 20) + 1;
        return Math.min(roll1, roll2);
    }
}

// UI Manager
class UIManager {
    constructor(dataManager, syncService) {
        this.dataManager = dataManager;
        this.syncService = syncService;
        this.currentView = 'players';
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.renderCurrentView();
        this.updateFilters();
    }

    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchView(e.target.dataset.view);
            });
        });

        // Sync button
        document.getElementById('syncBtn').addEventListener('click', () => {
            this.openSyncModal();
        });

        // Search inputs
        document.getElementById('playerSearch')?.addEventListener('input', () => this.filterCreatures('players'));
        document.getElementById('monsterSearch')?.addEventListener('input', () => this.filterCreatures('monsters'));
        document.getElementById('spellSearch')?.addEventListener('input', () => this.filterSpells());
        document.getElementById('encounterSearch')?.addEventListener('input', () => this.filterEncounters());

        // Filter selects
        document.getElementById('playerCategoryFilter')?.addEventListener('change', () => this.filterCreatures('players'));
        document.getElementById('monsterCategoryFilter')?.addEventListener('change', () => this.filterCreatures('monsters'));
        document.getElementById('spellLevelFilter')?.addEventListener('change', () => this.filterSpells());
        document.getElementById('encounterCategoryFilter')?.addEventListener('change', () => this.filterEncounters());
    }

    switchView(view) {
        document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
        document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
        
        document.getElementById(`${view}-view`).classList.add('active');
        document.querySelector(`[data-view="${view}"]`).classList.add('active');
        
        this.currentView = view;
        this.renderCurrentView();
    }

    renderCurrentView() {
        switch (this.currentView) {
            case 'players':
                this.renderPlayers();
                break;
            case 'monsters':
                this.renderMonsters();
                break;
            case 'spells':
                this.renderSpells();
                break;
            case 'encounters':
                this.renderEncounters();
                break;
            case 'combat':
                this.renderCombat();
                break;
        }
    }

    updateFilters() {
        // Update category filters
        const playerCategories = this.dataManager.data.categories.filter(c => c.type === 'players');
        const monsterCategories = this.dataManager.data.categories.filter(c => c.type === 'monsters');
        const encounterCategories = this.dataManager.data.categories.filter(c => c.type === 'encounters');

        this.updateSelectOptions('playerCategoryFilter', playerCategories);
        this.updateSelectOptions('monsterCategoryFilter', monsterCategories);
        this.updateSelectOptions('encounterCategoryFilter', encounterCategories);
    }

    updateSelectOptions(selectId, categories) {
        const select = document.getElementById(selectId);
        if (!select) return;

        const currentValue = select.value;
        select.innerHTML = '<option value="">Toutes les catégories</option>';
        
        categories.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat.id;
            option.textContent = cat.name;
            select.appendChild(option);
        });

        select.value = currentValue;
    }

    renderPlayers() {
        const players = this.dataManager.data.creatures.filter(c => c.type === 'player');
        this.renderCreatureList('playersList', players);
    }

    renderMonsters() {
        const monsters = this.dataManager.data.creatures.filter(c => c.type === 'monster');
        this.renderCreatureList('monstersList', monsters);
    }

    renderCreatureList(containerId, creatures) {
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = '';

        creatures.forEach(creature => {
            const card = this.createCreatureCard(creature);
            container.appendChild(card);
        });
    }

    createCreatureCard(creature) {
        const card = document.createElement('div');
        card.className = 'card';
        
        const stats = creature.stats;
        const hpPercentage = (stats.hp / stats.maxHp) * 100;
        const hpColor = hpPercentage > 50 ? 'green' : hpPercentage > 25 ? 'orange' : 'red';

        card.innerHTML = `
            <h3 class="card-title">${creature.name}</h3>
            <p class="card-subtitle">${this.getCategoryName(creature.category)}</p>
            
            <div class="card-stats">
                <div class="stat">
                    <div class="stat-label">PV</div>
                    <div class="stat-value" style="color: ${hpColor}">${stats.hp}/${stats.maxHp}</div>
                </div>
                <div class="stat">
                    <div class="stat-label">CA</div>
                    <div class="stat-value">${stats.ac}</div>
                </div>
                <div class="stat">
                    <div class="stat-label">Init</div>
                    <div class="stat-value">${stats.initiative > 0 ? '+' : ''}${stats.initiative}</div>
                </div>
                <div class="stat">
                    <div class="stat-label">FOR</div>
                    <div class="stat-value">${DnDRulesService.getAbilityModifier(stats.strength) > 0 ? '+' : ''}${DnDRulesService.getAbilityModifier(stats.strength)}</div>
                </div>
                <div class="stat">
                    <div class="stat-label">DEX</div>
                    <div class="stat-value">${DnDRulesService.getAbilityModifier(stats.dexterity) > 0 ? '+' : ''}${DnDRulesService.getAbilityModifier(stats.dexterity)}</div>
                </div>
                <div class="stat">
                    <div class="stat-label">CON</div>
                    <div class="stat-value">${DnDRulesService.getAbilityModifier(stats.constitution) > 0 ? '+' : ''}${DnDRulesService.getAbilityModifier(stats.constitution)}</div>
                </div>
            </div>
            
            ${creature.spells.length > 0 ? `
                <div style="margin: 1rem 0;">
                    <strong>Sorts:</strong> ${creature.spells.length} préparé(s)
                </div>
            ` : ''}
            
            ${creature.notes ? `<p style="font-style: italic; color: var(--dnd-light);">${creature.notes}</p>` : ''}
            
            <div class="card-actions">
                <button class="card-btn" onclick="app.editCreature('${creature.id}')">✏️</button>
                <button class="card-btn" onclick="app.duplicateCreature('${creature.id}')">📋</button>
                <button class="card-btn" onclick="app.deleteCreature('${creature.id}')">🗑️</button>
            </div>
        `;

        return card;
    }

    renderSpells() {
        const container = document.getElementById('spellsList');
        if (!container) return;

        container.innerHTML = '';

        this.dataManager.data.spells.forEach(spell => {
            const card = this.createSpellCard(spell);
            container.appendChild(card);
        });
    }

    createSpellCard(spell) {
        const card = document.createElement('div');
        card.className = `card spell-level-${spell.level}`;
        
        card.innerHTML = `
            <h3 class="card-title">${spell.name}</h3>
            <p class="card-subtitle">${spell.school} - Niveau ${spell.level}</p>
            
            <div class="card-stats">
                <div class="stat">
                    <div class="stat-label">Temps</div>
                    <div class="stat-value">${spell.castingTime}</div>
                </div>
                <div class="stat">
                    <div class="stat-label">Portée</div>
                    <div class="stat-value">${spell.range}</div>
                </div>
                <div class="stat">
                    <div class="stat-label">Durée</div>
                    <div class="stat-value">${spell.duration}</div>
                </div>
            </div>
            
            <p style="margin: 1rem 0;">${spell.description}</p>
            
            <div style="font-size: 0.9rem; color: var(--dnd-light);">
                <strong>Composantes:</strong> ${spell.components}
                ${spell.concentration ? '<br><strong>Concentration</strong> ✅' : ''}
                ${spell.ritual ? '<br><strong>Rituel</strong> ✅' : ''}
            </div>
            
            <div class="card-actions">
                <button class="card-btn" onclick="app.editSpell('${spell.id}')">✏️</button>
                <button class="card-btn" onclick="app.deleteSpell('${spell.id}')">🗑️</button>
            </div>
        `;

        return card;
    }

    renderEncounters() {
        const container = document.getElementById('encountersList');
        if (!container) return;

        container.innerHTML = '';

        this.dataManager.data.encounters.forEach(encounter => {
            const card = this.createEncounterCard(encounter);
            container.appendChild(card);
        });
    }

    createEncounterCard(encounter) {
        const card = document.createElement('div');
        card.className = 'card';
        
        const playerCount = encounter.players.length;
        const monsterCount = encounter.monsters.reduce((sum, m) => sum + m.quantity, 0);
        const category = this.getCategoryName(encounter.category);

        card.innerHTML = `
            <h3 class="card-title">${encounter.name}</h3>
            <p class="card-subtitle">${category}</p>
            
            <div class="card-stats">
                <div class="stat">
                    <div class="stat-label">Joueurs</div>
                    <div class="stat-value">${playerCount}</div>
                </div>
                <div class="stat">
                    <div class="stat-label">Monstres</div>
                    <div class="stat-value">${monsterCount}</div>
                </div>
                <div class="stat">
                    <div class="stat-label">Total</div>
                    <div class="stat-value">${playerCount + monsterCount}</div>
                </div>
            </div>
            
            <p style="margin: 1rem 0;">${encounter.description}</p>
            
            ${encounter.notes ? `<p style="font-style: italic; color: var(--dnd-light);">${encounter.notes}</p>` : ''}
            
            <div class="card-actions">
                <button class="card-btn" onclick="app.editEncounter('${encounter.id}')">✏️</button>
                <button class="card-btn" onclick="app.startCombatFromEncounter('${encounter.id}')">⚔️</button>
                <button class="card-btn" onclick="app.deleteEncounter('${encounter.id}')">🗑️</button>
            </div>
        `;

        return card;
    }

    renderCombat() {
        this.updateCombatEncounterSelect();
        document.getElementById('combatInterface').classList.add('hidden');
    }

    updateCombatEncounterSelect() {
        const select = document.getElementById('combatEncounterSelect');
        if (!select) return;

        select.innerHTML = '<option value="">Choisir une rencontre...</option>';
        
        this.dataManager.data.encounters.forEach(encounter => {
            const option = document.createElement('option');
            option.value = encounter.id;
            option.textContent = encounter.name;
            select.appendChild(option);
        });
    }

    getCategoryName(categoryId) {
        const category = this.dataManager.data.categories.find(c => c.id === categoryId);
        return category ? category.name : 'Non catégorisé';
    }

    filterCreatures(type) {
        const searchInput = document.getElementById(`${type}Search`);
        const categoryFilter = document.getElementById(`${type}CategoryFilter`);
        
        if (!searchInput || !categoryFilter) return;

        const searchTerm = searchInput.value.toLowerCase();
        const categoryId = categoryFilter.value;

        const creatures = this.dataManager.data.creatures.filter(c => c.type === type);
        const filtered = creatures.filter(creature => {
            const matchesSearch = creature.name.toLowerCase().includes(searchTerm);
            const matchesCategory = !categoryId || creature.category === categoryId;
            return matchesSearch && matchesCategory;
        });

        const containerId = type === 'players' ? 'playersList' : 'monstersList';
        this.renderCreatureList(containerId, filtered);
    }

    filterSpells() {
        const searchInput = document.getElementById('spellSearch');
        const levelFilter = document.getElementById('spellLevelFilter');
        
        if (!searchInput || !levelFilter) return;

        const searchTerm = searchInput.value.toLowerCase();
        const level = levelFilter.value;

        const filtered = this.dataManager.data.spells.filter(spell => {
            const matchesSearch = spell.name.toLowerCase().includes(searchTerm) || 
                                spell.description.toLowerCase().includes(searchTerm);
            const matchesLevel = !level || spell.level.toString() === level;
            return matchesSearch && matchesLevel;
        });

        this.renderSpellsList(filtered);
    }

    renderSpellsList(spells) {
        const container = document.getElementById('spellsList');
        if (!container) return;

        container.innerHTML = '';
        spells.forEach(spell => {
            const card = this.createSpellCard(spell);
            container.appendChild(card);
        });
    }

    filterEncounters() {
        const searchInput = document.getElementById('encounterSearch');
        const categoryFilter = document.getElementById('encounterCategoryFilter');
        
        if (!searchInput || !categoryFilter) return;

        const searchTerm = searchInput.value.toLowerCase();
        const categoryId = categoryFilter.value;

        const filtered = this.dataManager.data.encounters.filter(encounter => {
            const matchesSearch = encounter.name.toLowerCase().includes(searchTerm) || 
                                encounter.description.toLowerCase().includes(searchTerm);
            const matchesCategory = !categoryId || encounter.category === categoryId;
            return matchesSearch && matchesCategory;
        });

        this.renderEncountersList(filtered);
    }

    renderEncountersList(encounters) {
        const container = document.getElementById('encountersList');
        if (!container) return;

        container.innerHTML = '';
        encounters.forEach(encounter => {
            const card = this.createEncounterCard(encounter);
            container.appendChild(card);
        });
    }

    // Modal functions
    openModal(title, content) {
        document.getElementById('modalTitle').textContent = title;
        document.getElementById('modalBody').innerHTML = content;
        document.getElementById('modalOverlay').classList.remove('hidden');
    }

    closeModal() {
        document.getElementById('modalOverlay').classList.add('hidden');
    }

    openSyncModal() {
        const modal = document.getElementById('syncModal');
        const status = document.getElementById('syncStatus');
        const config = document.getElementById('syncConfig');
        const actions = document.getElementById('syncActions');

        modal.classList.remove('hidden');

        if (this.syncService.config.token && this.syncService.config.owner && this.syncService.config.repo) {
            // Connected state
            status.innerHTML = '<div class="sync-status-connected">✅ Connecté à GitHub</div>';
            config.classList.add('hidden');
            actions.classList.remove('hidden');
            
            document.getElementById('syncRepoInfo').textContent = `${this.syncService.config.owner}/${this.syncService.config.repo}`;
            const lastSync = localStorage.getItem('last-sync');
            document.getElementById('syncLastTime').textContent = lastSync ? new Date(lastSync).toLocaleString() : 'Jamais';
        } else {
            // Not connected
            status.innerHTML = '<div class="sync-status-disconnected">❌ Non connecté à GitHub</div>';
            config.classList.remove('hidden');
            actions.classList.add('hidden');
        }
    }

    closeSyncModal() {
        document.getElementById('syncModal').classList.add('hidden');
    }

    // CRUD operations (simplified for demo)
    editCreature(id) {
        const creature = this.dataManager.data.creatures.find(c => c.id === id);
        if (!creature) return;

        const content = `
            <div class="form-group">
                <label>Nom:</label>
                <input type="text" id="creatureName" class="input-field" value="${creature.name}">
            </div>
            <div class="form-group">
                <label>Catégorie:</label>
                <select id="creatureCategory" class="input-field">
                    ${this.dataManager.data.categories.filter(c => c.type === creature.type).map(cat => 
                        `<option value="${cat.id}" ${cat.id === creature.category ? 'selected' : ''}>${cat.name}</option>`
                    ).join('')}
                </select>
            </div>
            <div class="form-group">
                <label>Notes:</label>
                <textarea id="creatureNotes" class="input-field" rows="3">${creature.notes || ''}</textarea>
            </div>
            <div class="modal-actions">
                <button class="btn-primary" onclick="app.saveCreature('${creature.id}')">Sauvegarder</button>
                <button class="btn-secondary" onclick="app.closeModal()">Annuler</button>
            </div>
        `;

        this.openModal(`Modifier ${creature.name}`, content);
    }

    saveCreature(id) {
        const creature = this.dataManager.data.creatures.find(c => c.id === id);
        if (!creature) return;

        creature.name = document.getElementById('creatureName').value;
        creature.category = document.getElementById('creatureCategory').value;
        creature.notes = document.getElementById('creatureNotes').value;

        this.dataManager.saveData();
        this.renderCurrentView();
        this.closeModal();
    }

    deleteCreature(id) {
        if (!confirm('Êtes-vous sûr de vouloir supprimer cette créature ?')) return;

        const index = this.dataManager.data.creatures.findIndex(c => c.id === id);
        if (index > -1) {
            this.dataManager.data.creatures.splice(index, 1);
            this.dataManager.saveData();
            this.renderCurrentView();
        }
    }

    duplicateCreature(id) {
        const creature = this.dataManager.data.creatures.find(c => c.id === id);
        if (!creature) return;

        const duplicate = {
            ...creature,
            id: `creature-${Date.now()}`,
            name: `${creature.name} (copie)`
        };

        this.dataManager.data.creatures.push(duplicate);
        this.dataManager.saveData();
        this.renderCurrentView();
    }

    // Creation modals
    openPlayerModal() {
        const content = `
            <div class="form-group">
                <label>Nom:</label>
                <input type="text" id="newPlayerName" class="input-field" placeholder="Nom du personnage">
            </div>
            <div class="form-group">
                <label>Catégorie:</label>
                <select id="newPlayerCategory" class="input-field">
                    ${this.dataManager.data.categories.filter(c => c.type === 'players').map(cat => 
                        `<option value="${cat.id}">${cat.name}</option>`
                    ).join('')}
                </select>
            </div>
            <div class="form-group">
                <label>Points de Vie:</label>
                <input type="number" id="newPlayerHp" class="input-field" value="25" min="1">
            </div>
            <div class="form-group">
                <label>Classe d'Armure:</label>
                <input type="number" id="newPlayerAc" class="input-field" value="15" min="10">
            </div>
            <div class="form-group">
                <label>Vitesse:</label>
                <input type="number" id="newPlayerSpeed" class="input-field" value="9" min="1">
            </div>
            <div class="form-group">
                <label>Bonus d'Initiative:</label>
                <input type="number" id="newPlayerInitiative" class="input-field" value="0" min="-5" max="5">
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>FOR:</label>
                    <input type="number" id="newPlayerStr" class="input-field" value="10" min="1" max="20">
                </div>
                <div class="form-group">
                    <label>DEX:</label>
                    <input type="number" id="newPlayerDex" class="input-field" value="10" min="1" max="20">
                </div>
                <div class="form-group">
                    <label>CON:</label>
                    <input type="number" id="newPlayerCon" class="input-field" value="10" min="1" max="20">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>INT:</label>
                    <input type="number" id="newPlayerInt" class="input-field" value="10" min="1" max="20">
                </div>
                <div class="form-group">
                    <label>SAG:</label>
                    <input type="number" id="newPlayerWis" class="input-field" value="10" min="1" max="20">
                </div>
                <div class="form-group">
                    <label>CHA:</label>
                    <input type="number" id="newPlayerCha" class="input-field" value="10" min="1" max="20">
                </div>
            </div>
            <div class="form-group">
                <label>Notes:</label>
                <textarea id="newPlayerNotes" class="input-field" rows="3" placeholder="Description, traits, etc."></textarea>
            </div>
            <div class="modal-actions">
                <button class="btn-primary" onclick="app.saveNewPlayer()">Créer</button>
                <button class="btn-secondary" onclick="app.closeModal()">Annuler</button>
            </div>
        `;
        this.openModal('Nouveau Personnage', content);
    }

    openMonsterModal() {
        const content = `
            <div class="form-group">
                <label>Nom:</label>
                <input type="text" id="newMonsterName" class="input-field" placeholder="Nom du monstre">
            </div>
            <div class="form-group">
                <label>Catégorie:</label>
                <select id="newMonsterCategory" class="input-field">
                    ${this.dataManager.data.categories.filter(c => c.type === 'monsters').map(cat => 
                        `<option value="${cat.id}">${cat.name}</option>`
                    ).join('')}
                </select>
            </div>
            <div class="form-group">
                <label>Points de Vie:</label>
                <input type="number" id="newMonsterHp" class="input-field" value="30" min="1">
            </div>
            <div class="form-group">
                <label>Classe d'Armure:</label>
                <input type="number" id="newMonsterAc" class="input-field" value="12" min="10">
            </div>
            <div class="form-group">
                <label>Vitesse:</label>
                <input type="number" id="newMonsterSpeed" class="input-field" value="9" min="1">
            </div>
            <div class="form-group">
                <label>Bonus d'Initiative:</label>
                <input type="number" id="newMonsterInitiative" class="input-field" value="0" min="-5" max="5">
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>FOR:</label>
                    <input type="number" id="newMonsterStr" class="input-field" value="10" min="1" max="20">
                </div>
                <div class="form-group">
                    <label>DEX:</label>
                    <input type="number" id="newMonsterDex" class="input-field" value="10" min="1" max="20">
                </div>
                <div class="form-group">
                    <label>CON:</label>
                    <input type="number" id="newMonsterCon" class="input-field" value="10" min="1" max="20">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>INT:</label>
                    <input type="number" id="newMonsterInt" class="input-field" value="10" min="1" max="20">
                </div>
                <div class="form-group">
                    <label>SAG:</label>
                    <input type="number" id="newMonsterWis" class="input-field" value="10" min="1" max="20">
                </div>
                <div class="form-group">
                    <label>CHA:</label>
                    <input type="number" id="newMonsterCha" class="input-field" value="10" min="1" max="20">
                </div>
            </div>
            <div class="form-group">
                <label>Notes:</label>
                <textarea id="newMonsterNotes" class="input-field" rows="3" placeholder="Capacités spéciales, faiblesses, etc."></textarea>
            </div>
            <div class="modal-actions">
                <button class="btn-primary" onclick="app.saveNewMonster()">Créer</button>
                <button class="btn-secondary" onclick="app.closeModal()">Annuler</button>
            </div>
        `;
        this.openModal('Nouveau Monstre', content);
    }

    openSpellModal() {
        const content = `
            <div class="form-group">
                <label>Nom du sort:</label>
                <input type="text" id="newSpellName" class="input-field" placeholder="Nom du sort">
            </div>
            <div class="form-group">
                <label>Description:</label>
                <textarea id="newSpellDescription" class="input-field" rows="4" placeholder="Description détaillée du sort"></textarea>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Niveau:</label>
                    <select id="newSpellLevel" class="input-field">
                        <option value="0">Cantrip</option>
                        <option value="1">Niveau 1</option>
                        <option value="2">Niveau 2</option>
                        <option value="3">Niveau 3</option>
                        <option value="4">Niveau 4</option>
                        <option value="5">Niveau 5</option>
                        <option value="6">Niveau 6</option>
                        <option value="7">Niveau 7</option>
                        <option value="8">Niveau 8</option>
                        <option value="9">Niveau 9</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>École:</label>
                    <select id="newSpellSchool" class="input-field">
                        <option value="Abjuration">Abjuration</option>
                        <option value="Conjuration">Conjuration</option>
                        <option value="Divination">Divination</option>
                        <option value="Enchantment">Enchantment</option>
                        <option value="Évocation">Évocation</option>
                        <option value="Illusion">Illusion</option>
                        <option value="Nécromancie">Nécromancie</option>
                        <option value="Transmutation">Transmutation</option>
                    </select>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Temps d'incantation:</label>
                    <input type="text" id="newSpellCastingTime" class="input-field" placeholder="1 action" value="1 action">
                </div>
                <div class="form-group">
                    <label>Portée:</label>
                    <input type="text" id="newSpellRange" class="input-field" placeholder="36m" value="36m">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Durée:</label>
                    <input type="text" id="newSpellDuration" class="input-field" placeholder="Instantanée" value="Instantanée">
                </div>
                <div class="form-group">
                    <label>Composantes:</label>
                    <input type="text" id="newSpellComponents" class="input-field" placeholder="V, S" value="V, S">
                </div>
            </div>
            <div class="form-group">
                <label>
                    <input type="checkbox" id="newSpellConcentration"> 
                    Requiert la concentration
                </label>
            </div>
            <div class="form-group">
                <label>
                    <input type="checkbox" id="newSpellRitual"> 
                    Peut être lancé comme rituel
                </label>
            </div>
            <div class="modal-actions">
                <button class="btn-primary" onclick="app.saveNewSpell()">Créer</button>
                <button class="btn-secondary" onclick="app.closeModal()">Annuler</button>
            </div>
        `;
        this.openModal('Nouveau Sort', content);
    }

    openEncounterModal() {
        const content = `
            <div class="form-group">
                <label>Nom de la rencontre:</label>
                <input type="text" id="newEncounterName" class="input-field" placeholder="Nom de la rencontre">
            </div>
            <div class="form-group">
                <label>Catégorie:</label>
                <select id="newEncounterCategory" class="input-field">
                    ${this.dataManager.data.categories.filter(c => c.type === 'encounters').map(cat => 
                        `<option value="${cat.id}">${cat.name}</option>`
                    ).join('')}
                </select>
            </div>
            <div class="form-group">
                <label>Description:</label>
                <textarea id="newEncounterDescription" class="input-field" rows="3" placeholder="Description de la rencontre"></textarea>
            </div>
            <div class="form-group">
                <label>Notes:</label>
                <textarea id="newEncounterNotes" class="input-field" rows="2" placeholder="Stratégie, environnement, etc."></textarea>
            </div>
            <div class="form-group">
                <label>Joueurs participants:</label>
                <div id="encounterPlayers" class="checkbox-group">
                    ${this.dataManager.data.creatures.filter(c => c.type === 'player').map(creature => `
                        <label>
                            <input type="checkbox" name="encounterPlayers" value="${creature.id}">
                            ${creature.name}
                        </label>
                    `).join('')}
                </div>
            </div>
            <div class="form-group">
                <label>Monstres participants:</label>
                <div id="encounterMonsters" class="monster-selection">
                    ${this.dataManager.data.creatures.filter(c => c.type === 'monster').map(creature => `
                        <div class="monster-item">
                            <label>
                                <input type="checkbox" name="encounterMonsters" value="${creature.id}">
                                ${creature.name}
                            </label>
                            <input type="number" class="monster-quantity" placeholder="Qté" value="1" min="1" data-monster-id="${creature.id}">
                            <input type="text" class="monster-marker" placeholder="Marqueur (A, B, C...)" data-monster-id="${creature.id}">
                        </div>
                    `).join('')}
                </div>
            </div>
            <div class="modal-actions">
                <button class="btn-primary" onclick="app.saveNewEncounter()">Créer</button>
                <button class="btn-secondary" onclick="app.closeModal()">Annuler</button>
            </div>
        `;
        this.openModal('Nouvelle Rencontre', content);
    }

    // Save functions
    saveNewPlayer() {
        const name = document.getElementById('newPlayerName').value.trim();
        if (!name) {
            alert('Veuillez entrer un nom');
            return;
        }

        const player = {
            id: `player-${Date.now()}`,
            name: name,
            type: 'player',
            category: document.getElementById('newPlayerCategory').value,
            stats: {
                hp: parseInt(document.getElementById('newPlayerHp').value),
                maxHp: parseInt(document.getElementById('newPlayerHp').value),
                initiative: parseInt(document.getElementById('newPlayerInitiative').value),
                ac: parseInt(document.getElementById('newPlayerAc').value),
                speed: parseInt(document.getElementById('newPlayerSpeed').value),
                strength: parseInt(document.getElementById('newPlayerStr').value),
                dexterity: parseInt(document.getElementById('newPlayerDex').value),
                constitution: parseInt(document.getElementById('newPlayerCon').value),
                intelligence: parseInt(document.getElementById('newPlayerInt').value),
                wisdom: parseInt(document.getElementById('newPlayerWis').value),
                charisma: parseInt(document.getElementById('newPlayerCha').value)
            },
            spells: [],
            notes: document.getElementById('newPlayerNotes').value
        };

        this.dataManager.data.creatures.push(player);
        this.dataManager.saveData();
        this.renderCurrentView();
        this.closeModal();
    }

    saveNewMonster() {
        const name = document.getElementById('newMonsterName').value.trim();
        if (!name) {
            alert('Veuillez entrer un nom');
            return;
        }

        const monster = {
            id: `monster-${Date.now()}`,
            name: name,
            type: 'monster',
            category: document.getElementById('newMonsterCategory').value,
            stats: {
                hp: parseInt(document.getElementById('newMonsterHp').value),
                maxHp: parseInt(document.getElementById('newMonsterHp').value),
                initiative: parseInt(document.getElementById('newMonsterInitiative').value),
                ac: parseInt(document.getElementById('newMonsterAc').value),
                speed: parseInt(document.getElementById('newMonsterSpeed').value),
                strength: parseInt(document.getElementById('newMonsterStr').value),
                dexterity: parseInt(document.getElementById('newMonsterDex').value),
                constitution: parseInt(document.getElementById('newMonsterCon').value),
                intelligence: parseInt(document.getElementById('newMonsterInt').value),
                wisdom: parseInt(document.getElementById('newMonsterWis').value),
                charisma: parseInt(document.getElementById('newMonsterCha').value)
            },
            spells: [],
            notes: document.getElementById('newMonsterNotes').value
        };

        this.dataManager.data.creatures.push(monster);
        this.dataManager.saveData();
        this.renderCurrentView();
        this.closeModal();
    }

    saveNewSpell() {
        const name = document.getElementById('newSpellName').value.trim();
        const description = document.getElementById('newSpellDescription').value.trim();
        
        if (!name || !description) {
            alert('Veuillez remplir le nom et la description');
            return;
        }

        const spell = {
            id: `spell-${Date.now()}`,
            name: name,
            description: description,
            level: parseInt(document.getElementById('newSpellLevel').value),
            school: document.getElementById('newSpellSchool').value,
            castingTime: document.getElementById('newSpellCastingTime').value,
            range: document.getElementById('newSpellRange').value,
            components: document.getElementById('newSpellComponents').value,
            duration: document.getElementById('newSpellDuration').value,
            concentration: document.getElementById('newSpellConcentration').checked,
            ritual: document.getElementById('newSpellRitual').checked
        };

        this.dataManager.data.spells.push(spell);
        this.dataManager.saveData();
        this.renderCurrentView();
        this.closeModal();
    }

    saveNewEncounter() {
        const name = document.getElementById('newEncounterName').value.trim();
        const description = document.getElementById('newEncounterDescription').value.trim();
        
        if (!name || !description) {
            alert('Veuillez remplir le nom et la description');
            return;
        }

        // Get selected players
        const playerCheckboxes = document.querySelectorAll('input[name="encounterPlayers"]:checked');
        const players = Array.from(playerCheckboxes).map(cb => cb.value);

        // Get selected monsters
        const monsters = [];
        const monsterCheckboxes = document.querySelectorAll('input[name="encounterMonsters"]:checked');
        monsterCheckboxes.forEach(checkbox => {
            const monsterId = checkbox.value;
            const quantity = parseInt(document.querySelector(`.monster-quantity[data-monster-id="${monsterId}"]`).value) || 1;
            const marker = document.querySelector(`.monster-marker[data-monster-id="${monsterId}"]`).value || '';
            
            for (let i = 0; i < quantity; i++) {
                monsters.push({
                    creatureId: monsterId,
                    id: `monster-instance-${Date.now()}-${i}`,
                    marker: i === 0 ? marker : (marker ? `${marker}${i + 1}` : '')
                });
            }
        });

        if (players.length === 0 && monsters.length === 0) {
            alert('Veuillez sélectionner au moins un joueur ou un monstre');
            return;
        }

        const encounter = {
            id: `encounter-${Date.now()}`,
            name: name,
            category: document.getElementById('newEncounterCategory').value,
            description: description,
            notes: document.getElementById('newEncounterNotes').value,
            players: players,
            monsters: monsters
        };

        this.dataManager.data.encounters.push(encounter);
        this.dataManager.saveData();
        this.renderCurrentView();
        this.closeModal();
    }

    // Edit functions
    editSpell(id) {
        const spell = this.dataManager.data.spells.find(s => s.id === id);
        if (!spell) return;

        const content = `
            <div class="form-group">
                <label>Nom du sort:</label>
                <input type="text" id="editSpellName" class="input-field" value="${spell.name}">
            </div>
            <div class="form-group">
                <label>Description:</label>
                <textarea id="editSpellDescription" class="input-field" rows="4">${spell.description}</textarea>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Niveau:</label>
                    <select id="editSpellLevel" class="input-field">
                        <option value="0" ${spell.level === 0 ? 'selected' : ''}>Cantrip</option>
                        <option value="1" ${spell.level === 1 ? 'selected' : ''}>Niveau 1</option>
                        <option value="2" ${spell.level === 2 ? 'selected' : ''}>Niveau 2</option>
                        <option value="3" ${spell.level === 3 ? 'selected' : ''}>Niveau 3</option>
                        <option value="4" ${spell.level === 4 ? 'selected' : ''}>Niveau 4</option>
                        <option value="5" ${spell.level === 5 ? 'selected' : ''}>Niveau 5</option>
                        <option value="6" ${spell.level === 6 ? 'selected' : ''}>Niveau 6</option>
                        <option value="7" ${spell.level === 7 ? 'selected' : ''}>Niveau 7</option>
                        <option value="8" ${spell.level === 8 ? 'selected' : ''}>Niveau 8</option>
                        <option value="9" ${spell.level === 9 ? 'selected' : ''}>Niveau 9</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>École:</label>
                    <select id="editSpellSchool" class="input-field">
                        <option value="Abjuration" ${spell.school === 'Abjuration' ? 'selected' : ''}>Abjuration</option>
                        <option value="Conjuration" ${spell.school === 'Conjuration' ? 'selected' : ''}>Conjuration</option>
                        <option value="Divination" ${spell.school === 'Divination' ? 'selected' : ''}>Divination</option>
                        <option value="Enchantment" ${spell.school === 'Enchantment' ? 'selected' : ''}>Enchantment</option>
                        <option value="Évocation" ${spell.school === 'Évocation' ? 'selected' : ''}>Évocation</option>
                        <option value="Illusion" ${spell.school === 'Illusion' ? 'selected' : ''}>Illusion</option>
                        <option value="Nécromancie" ${spell.school === 'Nécromancie' ? 'selected' : ''}>Nécromancie</option>
                        <option value="Transmutation" ${spell.school === 'Transmutation' ? 'selected' : ''}>Transmutation</option>
                    </select>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Temps d'incantation:</label>
                    <input type="text" id="editSpellCastingTime" class="input-field" value="${spell.castingTime}">
                </div>
                <div class="form-group">
                    <label>Portée:</label>
                    <input type="text" id="editSpellRange" class="input-field" value="${spell.range}">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Durée:</label>
                    <input type="text" id="editSpellDuration" class="input-field" value="${spell.duration}">
                </div>
                <div class="form-group">
                    <label>Composantes:</label>
                    <input type="text" id="editSpellComponents" class="input-field" value="${spell.components}">
                </div>
            </div>
            <div class="form-group">
                <label>
                    <input type="checkbox" id="editSpellConcentration" ${spell.concentration ? 'checked' : ''}> 
                    Requiert la concentration
                </label>
            </div>
            <div class="form-group">
                <label>
                    <input type="checkbox" id="editSpellRitual" ${spell.ritual ? 'checked' : ''}> 
                    Peut être lancé comme rituel
                </label>
            </div>
            <div class="modal-actions">
                <button class="btn-primary" onclick="app.saveEditSpell('${spell.id}')">Sauvegarder</button>
                <button class="btn-secondary" onclick="app.closeModal()">Annuler</button>
            </div>
        `;

        this.openModal(`Modifier ${spell.name}`, content);
    }

    saveEditSpell(id) {
        const spell = this.dataManager.data.spells.find(s => s.id === id);
        if (!spell) return;

        spell.name = document.getElementById('editSpellName').value;
        spell.description = document.getElementById('editSpellDescription').value;
        spell.level = parseInt(document.getElementById('editSpellLevel').value);
        spell.school = document.getElementById('editSpellSchool').value;
        spell.castingTime = document.getElementById('editSpellCastingTime').value;
        spell.range = document.getElementById('editSpellRange').value;
        spell.components = document.getElementById('editSpellComponents').value;
        spell.duration = document.getElementById('editSpellDuration').value;
        spell.concentration = document.getElementById('editSpellConcentration').checked;
        spell.ritual = document.getElementById('editSpellRitual').checked;

        this.dataManager.saveData();
        this.renderCurrentView();
        this.closeModal();
    }

    deleteSpell(id) {
        if (!confirm('Êtes-vous sûr de vouloir supprimer ce sort ?')) return;

        const index = this.dataManager.data.spells.findIndex(s => s.id === id);
        if (index > -1) {
            this.dataManager.data.spells.splice(index, 1);
            this.dataManager.saveData();
            this.renderSpells();
        }
    }

    editEncounter(id) {
        alert('Édition de rencontres - À implémenter');
    }

    deleteEncounter(id) {
        if (!confirm('Êtes-vous sûr de vouloir supprimer cette rencontre ?')) return;

        const index = this.dataManager.data.encounters.findIndex(e => e.id === id);
        if (index > -1) {
            this.dataManager.data.encounters.splice(index, 1);
            this.dataManager.saveData();
            this.renderEncounters();
        }
    }

    startCombatFromEncounter(id) {
        this.switchView('combat');
        document.getElementById('combatEncounterSelect').value = id;
        this.startCombatSetup();
    }

    // Combat functions
    startCombatSetup() {
        const encounterId = document.getElementById('combatEncounterSelect').value;
        if (!encounterId) {
            alert('Veuillez sélectionner une rencontre');
            return;
        }

        const encounter = this.dataManager.data.encounters.find(e => e.id === encounterId);
        if (!encounter) return;

        // Initialize combat (simplified)
        this.dataManager.data.currentCombat = {
            encounterId,
            initiativeOrder: [],
            currentRound: 1,
            currentTurn: 0,
            isActive: false
        };

        document.getElementById('combatInterface').classList.remove('hidden');
        this.initializeCombat(encounter);
    }

    initializeCombat(encounter) {
        const initiativeOrder = [];

        // Add players
        encounter.players.forEach(playerId => {
            const creature = this.dataManager.data.creatures.find(c => c.id === playerId);
            if (creature) {
                const initiative = DnDRulesService.calculateInitiative(creature);
                initiativeOrder.push({
                    creatureId: creature.id,
                    name: creature.name,
                    initiative,
                    type: 'player',
                    currentHp: creature.stats.hp,
                    maxHp: creature.stats.maxHp
                });
            }
        });

        // Add monsters (grouped by type)
        const monsterGroups = {};
        encounter.monsters.forEach(monster => {
            if (!monsterGroups[monster.creatureId]) {
                monsterGroups[monster.creatureId] = [];
            }
            monsterGroups[monster.creatureId].push(monster);
        });

        Object.keys(monsterGroups).forEach(creatureId => {
            const creature = this.dataManager.data.creatures.find(c => c.id === creatureId);
            if (creature) {
                const initiative = DnDRulesService.rollMonsterInitiative(creature);
                monsterGroups[creatureId].forEach((monster, index) => {
                    const name = monster.marker || (index > 0 ? `${creature.name} ${index + 1}` : creature.name);
                    initiativeOrder.push({
                        creatureId: creature.id,
                        instanceId: monster.id,
                        name,
                        initiative,
                        type: 'monster',
                        currentHp: creature.stats.hp,
                        maxHp: creature.stats.maxHp
                    });
                });
            }
        });

        // Sort by initiative (descending)
        initiativeOrder.sort((a, b) => b.initiative - a.initiative);

        this.dataManager.data.currentCombat.initiativeOrder = initiativeOrder;
        this.dataManager.data.currentCombat.isActive = true;
        this.dataManager.saveData();

        this.renderCombatInterface();
    }

    renderCombatInterface() {
        const currentTurnInfo = document.getElementById('currentTurnInfo');
        const initiativeOrder = document.getElementById('initiativeOrder');

        if (!this.dataManager.data.currentCombat) return;

        const combat = this.dataManager.data.currentCombat;
        const currentEntry = combat.initiativeOrder[combat.currentTurn];

        // Current turn
        if (currentEntry) {
            currentTurnInfo.innerHTML = `
                <div style="font-size: 1.2rem; font-weight: bold; color: var(--dnd-gold);">
                    ${currentEntry.name}
                </div>
                <div style="margin: 0.5rem 0;">
                    Initiative: ${currentEntry.initiative} | 
                    PV: ${currentEntry.currentHp}/${currentEntry.maxHp} | 
                    Type: ${currentEntry.type === 'player' ? 'Joueur' : 'Monstre'}
                </div>
                <div>
                    <input type="number" id="hpModifier" placeholder="±PV" style="width: 80px; margin-right: 0.5rem;">
                    <button class="btn-secondary" onclick="app.modifyHp('${currentEntry.creatureId}', '${currentEntry.instanceId || ''}')">Appliquer</button>
                </div>
            `;
        }

        // Initiative order
        initiativeOrder.innerHTML = '';
        combat.initiativeOrder.forEach((entry, index) => {
            const div = document.createElement('div');
            div.className = `initiative-entry ${index === combat.currentTurn ? 'current' : ''}`;
            div.innerHTML = `
                <span class="initiative-name">${entry.name}</span>
                <span class="initiative-roll">${entry.initiative}</span>
            `;
            initiativeOrder.appendChild(div);
        });
    }

    modifyHp(creatureId, instanceId) {
        const modifier = parseInt(document.getElementById('hpModifier').value);
        if (isNaN(modifier)) return;

        const combat = this.dataManager.data.currentCombat;
        const entry = combat.initiativeOrder.find(e => 
            e.creatureId === creatureId && e.instanceId === instanceId
        );

        if (entry) {
            entry.currentHp = Math.max(0, Math.min(entry.maxHp, entry.currentHp + modifier));
            this.dataManager.saveData();
            this.renderCombatInterface();
            document.getElementById('hpModifier').value = '';
        }
    }

    nextTurn() {
        const combat = this.dataManager.data.currentCombat;
        if (!combat) return;

        combat.currentTurn = (combat.currentTurn + 1) % combat.initiativeOrder.length;
        
        if (combat.currentTurn === 0) {
            combat.currentRound++;
        }

        this.dataManager.saveData();
        this.renderCombatInterface();
    }

    endCombat() {
        if (!confirm('Êtes-vous sûr de vouloir terminer le combat ?')) return;

        this.dataManager.data.currentCombat = null;
        this.dataManager.saveData();
        document.getElementById('combatInterface').classList.add('hidden');
    }

    // GitHub sync functions
    async saveGitHubConfig() {
        const token = document.getElementById('githubToken').value;
        const owner = document.getElementById('githubOwner').value;
        const repo = document.getElementById('githubRepo').value;

        if (!token || !owner || !repo) {
            alert('Veuillez remplir tous les champs');
            return;
        }

        this.syncService.saveGitHubConfig(token, owner, repo);
        
        const connected = await this.syncService.testConnection();
        if (connected) {
            alert('Connexion GitHub établie avec succès !');
            this.openSyncModal();
        } else {
            alert('Erreur lors de la connexion GitHub');
        }
    }

    async exportToGitHub() {
        try {
            await this.syncService.exportToGitHub(this.dataManager.data);
            alert('Données exportées avec succès sur GitHub !');
            this.openSyncModal();
        } catch (error) {
            alert('Erreur lors de l\'export: ' + error.message);
        }
    }

    async importFromGitHub() {
        if (!confirm('Cela remplacera toutes vos données locales. Continuer ?')) return;

        try {
            const data = await this.syncService.importFromGitHub();
            this.dataManager.data = data;
            this.dataManager.saveData();
            this.renderCurrentView();
            this.updateFilters();
            alert('Données importées avec succès depuis GitHub !');
            this.openSyncModal();
        } catch (error) {
            alert('Erreur lors de l\'import: ' + error.message);
        }
    }

    disconnectGitHub() {
        if (!confirm('Êtes-vous sûr de vouloir déconnecter la synchronisation GitHub ?')) return;

        this.syncService.clearGitHubConfig();
        this.openSyncModal();
    }
}

// Global functions for onclick handlers
let app;

window.openPlayerModal = () => app.openPlayerModal();
window.openMonsterModal = () => app.openMonsterModal();
window.openSpellModal = () => app.openSpellModal();
window.openEncounterModal = () => app.openEncounterModal();
window.startCombatSetup = () => app.startCombatSetup();
window.nextTurn = () => app.nextTurn();
window.endCombat = () => app.endCombat();
window.closeModal = () => app.closeModal();
window.saveGitHubConfig = () => app.saveGitHubConfig();
window.exportToGitHub = () => app.exportToGitHub();
window.importFromGitHub = () => app.importFromGitHub();
window.disconnectGitHub = () => app.disconnectGitHub();
window.closeSyncModal = () => app.closeSyncModal();

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const dataManager = new DataManager();
    const syncService = new GitHubSyncService();
    app = new UIManager(dataManager, syncService);
});
