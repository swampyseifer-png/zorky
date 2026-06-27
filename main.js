// main.js - The game's engine core

// Import data from other files
import { playercharacters } from "./characters.js";
import { enemies } from "./enemies.js";
import { items } from "./items.js";
import { scenes } from "./scenes.js";

// Global Game State
let player = {};
let currentSceneId = ""; 

document.addEventListener('DOMContentLoaded', function() {
    const content = document.querySelector('#content');

    content.innerHTML = `
    <h1>Welcome to the adventure, let's create your character</h1>
    <label for="playername">Enter Name:</label>
    <input type="text" id="playername" placeholder="Hero Name...">
    <br><br>
    <label for="playerclass">Choose Class:</label>
    <select id="playerclass">
        <option value="warrior">Warrior</option>
        <option value="mage">Mage</option>
        <option value="ranger">Ranger</option>
    </select>
    <br><br>
    <div id="previewpanel"></div>
    <button id="btnstart">Begin Adventure</button>
    `;

    const classselect = document.getElementById("playerclass");
    classselect.addEventListener("change", updateclasspreview);
    updateclasspreview();

    document.getElementById("btnstart").onclick = confirmcharacter;
});

// Helper function to dynamically calculate total stats with gear bonuses
function getEffectiveStats() {
    let total = {
        physicalattack: player.basePhysicalAttack,
        magicalattack: player.baseMagicalAttack,
        rangedattack: player.baseRangedAttack,
        defence: player.baseDefence
    };

    // 1. Process standard weapons
    if (player.equippedweapon && items.weapons && items.weapons[player.equippedweapon]) {
        total.physicalattack += (items.weapons[player.equippedweapon].bonus || 0);
    }
    // 2. Process magic staves
    if (player.equippedmagicstave && items.magicstaves && items.magicstaves[player.equippedmagicstave]) {
        total.magicalattack += (items.magicstaves[player.equippedmagicstave].bonus || 0);
    }
    // 3. Process Bow & Arrows combination
    if (player.equippedbow && items.bows && items.bows[player.equippedbow]) {
        total.rangedattack += (items.bows[player.equippedbow].bonus || 0);
    }
    if (player.equippedarrow && items.arrows && items.arrows[player.equippedarrow]) {
        total.rangedattack += (items.arrows[player.equippedarrow].bonus || 0);
    }
    // 4. Process Defense gear (Shield & Armor)
    if (player.equippedshield && items.shields && items.shields[player.equippedshield]) {
        total.defence += (items.shields[player.equippedshield].bonus || 0);
    }
    if (player.equippedarmour && items.armour && items.armour[player.equippedarmour]) {
        total.defence += (items.armour[player.equippedarmour].bonus || 0);
    }

    return total;
}

// Dynamic Class Preview
function updateclasspreview() {
    const selectedclasskey = document.getElementById("playerclass").value;
    const chosenclass = playercharacters[selectedclasskey];
    const previewpanel = document.getElementById("previewpanel");

    let startingitemname = `Unarmed`;
    let physicalattackbonus = 0;
    let magicalattackbonus = 0;
    let rangedattackbonus = 0;
    let defencebonus = 0;
    const itemsdata = chosenclass.startingitems;

    if (itemsdata.bow && itemsdata.arrow) {
        const bowname = items.bows[itemsdata.bow].name;
        const arrowname = items.arrows[itemsdata.arrow].name;
        startingitemname = `${bowname} + ${arrowname}`;
        rangedattackbonus += (items.bows[itemsdata.bow].bonus || 0) + (items.arrows[itemsdata.arrow].bonus || 0);
    }
    else if (itemsdata.magicstave) {
        const staveid = itemsdata.magicstave;
        startingitemname = items.magicstaves[staveid].name;
        magicalattackbonus += (items.magicstaves[staveid].bonus || 0);
    } 
    else if (itemsdata.weapons) {
        const weaponid = itemsdata.weapons;
        startingitemname = items.weapons[weaponid].name;
        physicalattackbonus += (items.weapons[weaponid].bonus || 0);
    }   
    
    if (itemsdata.shield && items.shields && items.shields[itemsdata.shield]) {
        defencebonus += (items.shields[itemsdata.shield].bonus || 0);
    }
    if (itemsdata.armour && items.armour && items.armour[itemsdata.armour]) {
        defencebonus += (items.armour[itemsdata.armour].bonus || 0);
    }

    const ismage = !!itemsdata.magicstave;
    const isranger = !!(itemsdata.bow && itemsdata.arrow);

    let totalattackdisplay = "";
    if (ismage) {
        totalattackdisplay = `<p><strong>Magical Attack:</strong> ${chosenclass.magicalattack} <span style="color: #4caf50;">(+${magicalattackbonus} from staff)</span> = ${chosenclass.magicalattack + magicalattackbonus}</p>`;
    } else if (isranger) {
        totalattackdisplay = `<p><strong>Ranged Attack:</strong> ${chosenclass.rangedattack} <span style="color: #4caf50;">(+${rangedattackbonus} from bow/arrows)</span> = ${chosenclass.rangedattack + rangedattackbonus}</p>`;
    } else {
        totalattackdisplay = `<p><strong>Physical Attack:</strong> ${chosenclass.physicalattack} <span style="color: #4caf50;">(+${physicalattackbonus} from Weapon)</span> = ${chosenclass.physicalattack + physicalattackbonus}</p>`;
    }

    previewpanel.innerHTML = `
        <h3>Class Profile: ${chosenclass.name}</h3>
        <p><strong>Starting Health:</strong> ${chosenclass.startinghealth}</p>
        ${totalattackdisplay}
        <p><strong>Defence:</strong> ${chosenclass.defence} <span style="color: #4caf50;">(+${defencebonus} from Gear)</span> = ${chosenclass.defence + defencebonus}</p>
        <p><strong>Starting equipment:</strong> ${startingitemname}</p>
    `;
}

function updatePlayerHUD() {
    const hud = document.getElementById("player-hud");
    if (!hud) return; // Safety check if HUD isn't rendered yet

    // Grab dynamic current stats + gear modifiers
    let currentStats = getEffectiveStats();

    // Format your potion inventory cleanly
    const healthPots = (player.potions && player.potions.healthelixir) ? player.potions.healthelixir : 0;

    // Set up class-specific weapon display indicators
    let attackDisplay = `ATK: ${currentStats.physicalattack}`;
    if (player.class === "mage") attackDisplay = `MGK: ${currentStats.magicalattack}`;
    if (player.class === "ranger") attackDisplay = `RNG: ${currentStats.rangedattack}`;

    // Determine if the potion button should be usable
    const hasPotions = healthPots > 0;
    const isMaxHealth = player.health >= player.maxhealth;

    // Inject the clean, scannable dashboard row with a built-in potion trigger
    hud.innerHTML = `
        <div class="hud-stat-row" style="display: flex; align-items: center; justify-content: space-between; padding: 5px; background: #222; color: #fff;">
            <span class="hud-item user-class"><strong>[${player.class.toUpperCase()}] ${player.name}</strong></span>
            <span class="hud-item hp-bar">HP: ${player.health} / ${player.maxhealth}</span>
            <span class="hud-item atk-val">${attackDisplay}</span>
            <span class="hud-item def-val">DEF: ${currentStats.defence}</span>
            <span class="hud-item items-val">
                Potions: ${healthPots} 
                <button id="hud-drink-potion" 
                        ${!hasPotions || isMaxHealth ? 'disabled' : ''} 
                        style="margin-left: 8px; padding: 2px 6px; cursor: ${!hasPotions || isMaxHealth ? 'not-allowed' : 'pointer'}; opacity: ${!hasPotions || isMaxHealth ? '0.5' : '1'};">
                    Drink
                </button>
            </span>
        </div>
    `;

    // Bind the click event to our new potion logic
    const potBtn = document.getElementById("hud-drink-potion");
    if (potBtn) {
        potBtn.onclick = useHealingPotion;
    }
}

function recalculatePlayerStats() {
    // 1. Reset bonuses to 0 before calculating fresh totals
    let physicalattackbonus = 0;
    let magicalattackbonus = 0;
    let rangedattackbonus = 0;
    let defencebonus = 0;

    // 2. Read what the player is ACTUALLY wearing right now
    const currentBow = player.equippedbow;
    const currentArrow = player.equippedarrow;
    const currentStave = player.equippedmagicstave;
    const currentWeapon = player.equippedweapon;
    const currentShield = player.equippedshield;
    const currentArmour = player.equippedarmour;

    // 3. Process bonuses using your existing logic structure
    if (currentBow && currentArrow) {
        if (items.bows[currentBow] && items.arrows[currentArrow]) {
            rangedattackbonus += (items.bows[currentBow].bonus || 0) + (items.arrows[currentArrow].bonus || 0);
        }
    } else if (currentStave) {
        if (items.magicstaves[currentStave]) {
            magicalattackbonus += (items.magicstaves[currentStave].bonus || 0);
        }
    } else if (currentWeapon) {
        if (items.weapons[currentWeapon]) {
            physicalattackbonus += (items.weapons[currentWeapon].bonus || 0);
        }
    }   
    
    if (currentShield && items.shields && items.shields[currentShield]) {
        defencebonus += (items.shields[currentShield].bonus || 0);
    }
    if (currentArmour && items.armour && items.armour[currentArmour]) {
        defencebonus += (items.armour[currentArmour].bonus || 0);
    }

    // 4. Update the actual, active combat values on your player object
    player.totalPhysicalAttack = player.basePhysicalAttack + physicalattackbonus;
    player.totalMagicalAttack = player.baseMagicalAttack + magicalattackbonus;
    player.totalRangedAttack = player.baseRangedAttack + rangedattackbonus;
    player.totalDefence = player.baseDefence + defencebonus;
}

function confirmcharacter() {
    let nameinput = document.getElementById("playername").value.trim();
    let classselection = document.getElementById("playerclass").value;
    
    if (nameinput === "") {
        alert("Please enter a name before starting");
        return false;
    }

    let chosenclass = playercharacters[classselection]; 

    // Splitting base attributes away from dynamic equipment stats
    player = {
        name: nameinput,
        class: classselection,
        health: chosenclass.startinghealth,
        maxhealth: chosenclass.startinghealth,
        basePhysicalAttack: chosenclass.physicalattack,
        baseMagicalAttack: chosenclass.magicalattack,
        baseRangedAttack: chosenclass.rangedattack,
        baseDefence: chosenclass.defence,
        // Current inventory tracking
        equippedweapon: chosenclass.startingitems.weapons || null,
        equippedarmour: chosenclass.startingitems.armour || null,
        equippedshield: chosenclass.startingitems.shield || null,
        equippedmagicstave: chosenclass.startingitems.magicstave || null,
        equippedbow: chosenclass.startingitems.bow || null,
        equippedarrow: chosenclass.startingitems.arrow || null,
        potions: chosenclass.startingitems.potions ? { ...chosenclass.startingitems.potions } : {},
    };

    startStoryEngine("start");
}

export function startStoryEngine(sceneId) {
    currentSceneId = sceneId;
    let scene = scenes[currentSceneId];

    if (!scene) {
        console.error(`Scene not found: ${sceneId}`);
        return;
    }

    // 1. Instantly refresh the HUD display across the top
    updatePlayerHUD();

    // 2. CHECK AUTOMATED HOOKS
    if (scene.onenter) {
        const hook = scene.onenter;

        if (hook.awardtype === `potion`) {
            const ptype = hook.potiontype || `healthelixir`;
            const amt = hook.count || 1;

            if (!player.potions[ptype]) {
                player.potions[ptype] = 0;
            }

            player.potions[ptype] += amt;

            alert(`Event: You obtained ${amt}x ${ptype}! \n(Total carried: ${player.potions[ptype]})`);
            
            updatePlayerHUD(); 
        }
    }

    // 3. INTERCEPT COMBAT
    if (scene.type === "combat") {
        initiateCombatSystem(scene);
        return; 
    }

    // 4. CLEAN UP COMBAT RESIDUE
    const content = document.querySelector('#content');
    content.innerHTML = `
        <p id="storytext" class="storytext"></p>
        <div id="choicesbox" class="choicesbox"></div>
    `;

    // 5. Run the standard story printer
    renderStoryScene();
}

function useHealingPotion() {
    const potionType = 'healthelixir';
    
    // 1. Double check inventory stock
    if (!player.potions || !player.potions[potionType] || player.potions[potionType] <= 0) {
        alert("You don't have any healing potions left!");
        return;
    }

    // 2. Prevent using it if already healthy
    if (player.health >= player.maxhealth) {
        alert("Your health is already full!");
        return;
    }

    // 3. Apply healing calculations (e.g., heals for 20 HP, or adjust to your preference)
    const healAmount = 20; 
    player.health += healAmount;
    
    // Cap at maximum health capacity
    if (player.health > player.maxhealth) {
        player.health = player.maxhealth;
    }

    // 4. Deduct potion from inventory
    player.potions[potionType]--;

    alert(`You restored up to ${healAmount} HP.`);

    // 5. REFRESH THE SCREEN
    // First, update the top banner immediately
    updatePlayerHUD();

    // Second, check if we are in combat. If so, refresh the combat panel so the player's updated HP updates there too!
    const combatContainer = document.querySelector('.combat-container');
    if (combatContainer) {
        const playerHpDisplay = combatContainer.querySelector('.player-hp');
        if (playerHpDisplay) {
            playerHpDisplay.innerHTML = `Your HP: ${player.health} / ${player.maxhealth}`;
        }
    }
}

function renderStoryScene() {
    let scene = scenes[currentSceneId];

    const storyTextElement = document.getElementById("storytext");
    const choicescontainer = document.getElementById("choicesbox");

    if (storyTextElement) {
        storyTextElement.innerHTML = scene.story;
    }

    if (choicescontainer) {
        choicescontainer.innerHTML = "";
    } else {
        console.error("Critical Error: '#choicesbox' element missing from DOM.");
        return;
    }

    scene.choices.forEach(choice => {
        let button = document.createElement("button");
        button.innerText = choice.text; 
        button.className = "btnchoice";

        button.onclick = function() {
            // 1. Handle choice damage hazards
            if (choice.damage) {
                player.health -= choice.damage;
                if (player.health < 0) player.health = 0;
                updatePlayerHUD();
            }

            // 2. Handle loot rewards (Mutually Exclusive Room Setup)
            if (choice.lootType) {
                executeLootDrop(choice.lootType, choice.lootPool, choice);
                 
                let rewardMessage = "";
                const rawClass = (player.class || "").trim().toLowerCase(); 
                let matchedKey = null;

                if (choice.lootPool) {
                    matchedKey = Object.keys(choice.lootPool).find(
                        key => key.toLowerCase() === rawClass
                    );
                }

                if (choice.lootType === 'potion') {
                    rewardMessage = `You found ${choice.count || 1}x ${choice.potiontype || 'healthelixir'}!`;
                    
                    // Potion stacking logic
                    const pType = choice.potiontype || 'healthelixir';
                    player.potions[pType] = (player.potions[pType] || 0) + (choice.count || 1);

                } else if (matchedKey && choice.lootPool[matchedKey]) {
                    // Grab the item from your class array
                    const itemReceived = choice.lootPool[matchedKey][0]; 
                    
                    if (itemReceived) {
                        const slotMapping = {
                            'weapon': 'equippedweapon',
                            'armour': 'equippedarmour',
                            'shield': 'equippedshield',
                            'magicstave': 'equippedmagicstave',
                            'bow': 'equippedbow',
                            'arrow': 'equippedarrow'
                        };

                        const targetSlot = slotMapping[choice.lootType];

                        if (choice.lootType === 'bow' && typeof itemReceived === 'object') {
                            player.equippedbow = itemReceived.bow;
                            player.equippedarrow = itemReceived.arrows;
                            rewardMessage = `You found a ${itemReceived.bow} and some ${itemReceived.arrows} arrows!`;
                        } else {
                            if (targetSlot) {
                                player[targetSlot] = itemReceived;
                            }
                            rewardMessage = `You found a ${itemReceived}!`;
                            recalculatePlayerStats();
                        }
                    } else {
                        rewardMessage = `You searched but found nothing useful for your class.`;
                    }
                } else {
                    rewardMessage = `You searched and found some equipment!`;
                }

                alert(`Loot Secured!\n\n${rewardMessage}`);
                
                // Lock down all reward buttons across the screen
                const allButtons = choicescontainer.querySelectorAll('.btnchoice');
                allButtons.forEach(btn => {
                    btn.disabled = true;
                    btn.style.opacity = "0.5";
                });

                button.innerText = `${button.innerText} (Chosen)`;
                button.style.opacity = "1";
                
                // Re-enable ONLY the progression button
                scene.choices.forEach((c, idx) => {
                    if (c.nextscene) {
                        allButtons[idx].disabled = false;
                        allButtons[idx].style.opacity = "1";
                    }
                });

                // Stop execution here ONLY if they just picked up loot
                return; 
            }

            // 3. Handle standard scene progression (when it's not a loot button)
            if (choice.nextscene) {
                startStoryEngine(choice.nextscene);
            }
        }; 

        // CRITICAL FIX: This now safely executes outside the click function tracking!
        choicescontainer.appendChild(button);
    }); 
}

export function initiateCombatSystem(scene) {
    const content = document.querySelector('#content');

    let activeEnemies = scene.enemyIds.map((id, index) => {
        const profile = enemies[id];
        return {
            name: `${profile.name} ${index + 1}`,
            health: profile.startinghealth,
            maxHealth: profile.startinghealth,
            physicalAttack: profile.physicalattack || 0,
            magicalAttack: profile.magicalattack || 0,
            rangedattack: profile.rangedattack || 0,
            defence: profile.defence || profile.defense || 0 
        };
    });

    let selectedTargetIndex = null;
    renderBattleLayout();

    function renderBattleLayout() {
        let enemyStatusHTML = activeEnemies.map(enemy => {
            if (enemy.health <= 0) return `<div class="enemy-hp dead">💀 ${enemy.name}: DEFEATED</div>`;
            return `<div class="enemy-hp"> ${enemy.name} HP: ${enemy.health} / ${enemy.maxHealth}</div>`;
        }).join('');

        content.innerHTML = `
            <div class="combat-container">
                <h2>SQUAD BATTLE</h2>
                <div class="combat-status">
                    <div class="player-hp"> Your HP: ${player.health} / ${player.maxhealth}</div>
                    <div class="enemy-team-status">${enemyStatusHTML}</div>
                </div>
                <p id="combat-log" class="storytext">${scene.story}</p>
                <div id="combat-actions" class="choicesbox"></div>
            </div>
        `;
        generateTargetingMenu();
    }

    function generateTargetingMenu() {
        const combatActions = document.getElementById("combat-actions");
        combatActions.innerHTML = ""; 

        const allDead = activeEnemies.every(e => e.health <= 0);
        if (allDead) { return winBattle(); }

        activeEnemies.forEach((enemy, index) => {
            if (enemy.health > 0) {
                let btn = document.createElement("button");
                
                if (player.class === "warrior") btn.innerText = `⚔️ Strike: ${enemy.name}`;
                else if (player.class === "mage") btn.innerText = `🔮 Cast Spell: ${enemy.name}`;
                else if (player.class === "ranger") btn.innerText = `🏹 Shoot: ${enemy.name}`;
                else btn.innerText = `Attack: ${enemy.name}`;

                btn.className = "btnchoice";
                
                btn.onclick = () => {
                    selectedTargetIndex = index;
                    executePlayerAttack();
                };
                combatActions.appendChild(btn);
            }
        });
    }

    function executePlayerAttack() {
        const log = document.getElementById("combat-log");
        let target = activeEnemies[selectedTargetIndex];
        
        let currentStats = getEffectiveStats();
        let baseDamage = 0;
        let attackTypeLabel = "physical";

        if (player.class === "warrior") {
            baseDamage = currentStats.physicalattack;
            attackTypeLabel = "Physical Strike";
        } 
        else if (player.class === "mage") {
            baseDamage = currentStats.magicalattack;
            attackTypeLabel = "Magical Spell";
        } 
        else if (player.class === "ranger") {
            baseDamage = currentStats.rangedattack;
            attackTypeLabel = "Ranged Shot";
        } 
        else {
            baseDamage = currentStats.physicalattack;
        }

        let finalDamage = Math.max(1, baseDamage - target.defence);
        
        target.health -= finalDamage;
        if (target.health < 0) target.health = 0;
        
        updatePlayerHUD();

        log.innerHTML = `You unleashed a <strong>${attackTypeLabel}</strong> on <strong>${target.name}</strong>!<br>
                         Total Calculated Power: ${baseDamage} vs Enemy Defense: ${target.defence}.<br>
                         Dealt <strong>${finalDamage}</strong> damage!`;

        if (target.health <= 0) {
            log.innerHTML += `<br><br><strong>${target.name} falls!</strong>`;
        }

        document.getElementById("combat-actions").innerHTML = "<em>Enemies organizing counter-attack...</em>";
        setTimeout(enemiesTurn, 2000);
    }

    function enemiesTurn() {
        const log = document.getElementById("combat-log");
        let logLines = [];

        let currentStats = getEffectiveStats();
        let playerDefense = currentStats.defence || 0; 

        activeEnemies.forEach(enemy => {
            if (enemy.health > 0) {
                let pAtk = enemy.physicalAttack || enemy.physicalattack || 0;
                let mAtk = enemy.magicalAttack || enemy.magicalattack || 0;
                let rAtk = enemy.rangedAttack || enemy.rangedattack || 0;

                let enemyBaseDmg = Math.max(pAtk, mAtk, rAtk);
                
                let enemyFinalDmg = enemyBaseDmg - playerDefense;
                if (enemyFinalDmg < 1) {
                    enemyFinalDmg = 1;
                }
                
                let damageBlocked = Math.min(playerDefense, enemyBaseDmg);
                player.health -= enemyFinalDmg;
                
                logLines.push(`• <strong>${enemy.name}</strong> swings with ${enemyBaseDmg} power! Your armor blocks ${damageBlocked}. You take <strong>${enemyFinalDmg} HP</strong> damage.`);
            }
        });

        if (player.health < 0) player.health = 0;

        updatePlayerHUD();
        log.innerHTML = logLines.join("<br>");

        if (player.health <= 0) {
            triggergameover();
            return;
        }

        setTimeout(() => {
            renderBattleLayout();
        }, 2500);
    }

    function winBattle() {
        const combatActions = document.getElementById("combat-actions");
        combatActions.innerHTML = "";

        let continueBtn = document.createElement("button");
        continueBtn.innerText = "Claim Victory and Move On";
        continueBtn.className = "btnchoice";
        
        let winScene = null;
        
        if (scene.choices && scene.choices[0] && scene.choices[0].nextscene) {
            winScene = scene.choices[0].nextscene;
        } else {
            console.error(`Error: Combat scene '${scene.id}' is missing a choices[0].nextscene property!`);
            alert("Victory! But the path ahead is missing. Check your scenes.js data structure.");
            return; 
        }
        
        continueBtn.onclick = function() {
            startStoryEngine(winScene); 
        };
        
        combatActions.appendChild(continueBtn);
    }
}

function executeLootDrop(type, lootPool, choice) {
    // 1. Handle Potions (Universal across all classes)
    if (type === "potion") {
        const potionType = choice.potiontype || "healthelixir"; 
        const amountFound = choice.count || 1;

        if (!player.potions[potionType]) {
            player.potions[potionType] = 0;
        }

        player.potions[potionType] += amountFound;
        alert(`You found ${amountFound}x ${potionType}! Total carried: ${player.potions[potionType]}`);
        return;
    } // <-- Fixed missing closing brace

    // 2. Extract player class and pull the correct sub-pool
    const playerClass = player.class;

    if (!lootPool || !lootPool[playerClass]) {
        console.error(`No loot pool defined for class: ${playerClass}`);
        alert("You searched but found nothing useful.");
        return;
    }
    
    const classPool = lootPool[playerClass];

    // 3. Roll a random index out of that specific class pool
    const randomItemId = classPool[Math.floor(Math.random() * classPool.length)];
    let lootMessage = "";

    // 4. Handle WEAPONS
    if (type === "weapon") {
        if (playerClass === "mage") {
            const item = items.magicstaves[randomItemId];
            player.equippedmagicstave = randomItemId;
            lootMessage = `You found and equipped: ${item.name} (+${item.bonus} Magic Attack)!`;
        } 
        else if (playerClass === "ranger") {
            const bowId = randomItemId.bow;
            const arrowId = randomItemId.arrow;

            const bowItem = items.bows[bowId];
            const arrowItem = items.arrows[arrowId];

            player.equippedbow = bowId;
            player.equippedarrow = arrowId;

            const totalBonus = (bowItem.bonus || 0) + (arrowItem.bonus || 0);
            lootMessage = `You found and equipped: ${bowItem.name} & ${arrowItem.name} (+${totalBonus} Combined Ranged Attack)!`;
        } 
        else { 
            const item = items.weapons[randomItemId];
            player.equippedweapon = randomItemId;
            lootMessage = `You found and equipped: ${item.name} (+${item.bonus} Phys Attack)!`;
        }
    } 
    
    // 5. Handle ARMOR
    else if (type === "armour" || type === "armor") {
        const item = items.armour[randomItemId];
        player.equippedarmour = randomItemId;
        lootMessage = `You found and equipped: ${item.name} (+${item.bonus} Defence)!`;
    }

    // 6. Handle SHIELDS
    else if (type === "shield" || type === "sheild") {
        const item = items.shields[randomItemId];
        player.equippedshield = randomItemId; 
        lootMessage = `You found and equipped: ${item.name} (+${item.bonus} Defence Bonus)!`;
    }

    alert(lootMessage);
}