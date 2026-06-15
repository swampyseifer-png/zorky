var player = {
    name: "",
    hp: 0,
    strength: 0,
    defense: 0,
    magic: 0,
    willpower: 0,
    hasRolled: false,
    streak: 0
};

var enemy = {
    name: "Goblin Raider",
    hp: 0,
    maxHp: 0,
    strength: 0,
    defense: 0
};

var story = {
    currentscene: "start",
    start: {
        title: "Character Creation",
        story: "Welcome adventurer! Enter your heroic name below and roll your attributes to begin your quest.",
        requiresNameAndRoll: true,
        defaultdestination: "attack"
    },
    attack:{
        title: "Chapter 1: The Crossroads",
        story: `With your attributes decided, you are faced with your first challenge, [HERO]. Here we have a quick fight or you can go home and leave the world's safety to someone else.`,
        buttontext: "Confirm Choice",
        choices: [
            {
                choice: "let's kick some ass!",
                destination: 'battle' 
            },
            {
                choice: "Umm, I think I left the stove on!",
                destination: 'home' 
            }
        ]
    },
    battle:{
        title: "Chapter 2: The Confrontation",
        story: "The creature snarls! You have chosen to fight. How will you attack?",
        buttontext: "Execute Move",
        showEnemyHealth: true,
        choices: [
            {
                choice: "Stab him with a sword",
                destination: 'sword' 
            },
            {
                choice: "Fart in his general direction",
                destination: 'fart' 
            }
        ]
    },
    sword:{
        title: "Chapter 2: Go for the throat!",
        story: "You stab out with your sword!",
        buttontext: "Next fight",
        image: "sword.gif",
        isCombatResolution: true,
        damageStat: "strength",
        defaultdestination: 'battle'
    },
    fart:{
        title: "Chapter 2: The Power of the Fart!",
        story: "You have tried to overcome the enemy by farting in his general direction",
        buttontext: "Next fight",
        image: "fart.gif",
        isCombatResolution: true,
        damageStat: "magic",
        defaultdestination: 'battle'
    },
    victory:{
        title: "Victory!",
        story: "With a final strike/bottomburp, the enemy collapses! You have won the day, [HERO]!",
        buttontext: "Confirm Action",
        choices: [
            {
                choice: "Drink a healing Potion (+25 HP)",
                destination: "heal_resolve"
            },
            {
                choice: "Sharpen Your Weapon (+2 STR)",
                destination: "train_resolve"
            },
            {
                choice: "Calm your mind (+2 MAG)",
                destination: "magtrain_resolve"
            }
        ]
    },
    heal_resolve: {
        title: "Feeling Refreshed!",
        story: "You neck a glowing red potion. You feel healthier!",
        buttontext: "Seek Next Fight",
        isRecoveryResolution: true,
        recoveryType: "heal",
        defaultdestination: "attack"
    },
    train_resolve: {
        title: "Powering Up!",
        story: "You take a moment to sharpen your blade. Your attacks feel more powerful!",
        buttontext: "Seek Next Fight",
        isRecoveryResolution: true,
        recoveryType: "train",
        defaultdestination: "attack"
    },
    magtrain_resolve: {
        title: "Powering Up!",
        story: "You take a moment to clear your throughts and focus your powers. Your attacks feel more powerful!",
        buttontext: "Seek Next Fight",
        isRecoveryResolution: true,
        recoveryType: "magtrain",
        defaultdestination: "attack"
    },

    defeat:{
        title: "Defeat!",
        story: "You fought bravely, [HERO], but the Goblin Raider was too strong. Your journey ends here.",
        buttontext: "Try Again",
        defaultdestination: "reload"
    },
    home:{
        title: "Chapter 3",
        story: "You returned home, I'm sure some other hero will sort this out instead",
        buttontext: "Maybe I should fight",
        image: "home.jpg",
        defaultdestination: "reload"
    }
}

document.addEventListener('DOMContentLoaded', function() {

    var content_setname = document.querySelector('#content')

    renderscene();

        function renderscene() {
        var text = 'Next'
        var image = ""
        
        if (story[story.currentscene].image) {
            image = `<img id="scene-img" src="" alt="scene image"/>`
        }

                var currentSceneData = story[story.currentscene];
        
        if (currentSceneData.requiresNameAndRoll && !player.hasRolled) {
            text = "Roll Stats & Start";
        } 
        else if (currentSceneData.isCombatResolution && enemy.hp <= 0) {
            text = "End Combat";
        } 
        else if ((story.currentscene === "battle" || currentSceneData.isCombatResolution) && enemy.hp < enemy.maxHp) {
            text = "Attack Again"; 
        } 
        else if (currentSceneData.buttontext) {
            text = currentSceneData.buttontext;
        }

        var enemyHtml = "";
        if ((currentSceneData.showEnemyHealth || currentSceneData.isCombatResolution) && enemy.hp >= 0) {
            enemyHtml = `
                <div id="enemy-sheet" style="background:#fee; padding:10px; border-radius:5px; margin-bottom:15px; border: 1px solid #dcc; color:#900;">
                    <strong>Enemy:</strong> ${enemy.name} | 
                    <strong>HP:</strong> ${enemy.hp} / ${enemy.maxHp} |
                    <strong>ATK:</strong> ${enemy.strength} |
                    <strong>DEF:</strong> ${enemy.defense}
                </div>
            `;
        }


        var rawStoryText = currentSceneData.story;
        var dynamicStoryText = rawStoryText.replace("[HERO]", `<strong>${player.name}</strong>`);

        var statsHtml = "";
        if (player.hasRolled) {
            statsHtml = `
                <div id="char-sheet" style="background:#eef; padding:10px; border-radius:5px; margin-bottom:15px; border: 1px solid #ccd;">
                    <strong>Character:</strong> ${player.name} | 
                    <strong>Kill Streak:</strong> ${player.streak} |
                    <strong>HP:</strong> ${player.hp} | 
                    <strong>STR:</strong> ${player.strength} | 
                    <strong>DEF:</strong> ${player.defense} |
                    <strong>MAG:</strong> ${player.magic} |
                    <strong>WILL:</strong> ${player.willpower}
                </div>
            `;
        }

        var enemyHtml = "";
        if ((currentSceneData.showEnemyHealth || currentSceneData.isCombatResolution) && enemy.hp >= 0) {
            enemyHtml = `
                <div id="enemy-sheet" style="background:#fee; padding:10px; border-radius:5px; margin-bottom:15px; border: 1px solid #dcc; color:#900;">
                    <strong>Enemy:</strong> ${enemy.name} | 
                    <strong>HP:</strong> ${enemy.hp} / ${enemy.maxHp}
                </div>
            `;
        }

        var nameInputHtml = "";
        if (currentSceneData.requiresNameAndRoll && !player.hasRolled) {
            nameInputHtml = `
                <div style="margin: 15px 0;">
                    <label for="hero-name" style="display:block; margin-bottom:5px; font-weight:bold;">Hero Name:</label>
                    <input id="hero-name" type="text" placeholder="Enter name..." style="padding:8px; width:200px;" />
                </div>
            `;
        }

        content_setname.innerHTML = `
            ${statsHtml}
            ${enemyHtml}
            <h1>${currentSceneData.title}</h1>
            ${image}
            <p>${dynamicStoryText}</p>
            ${nameInputHtml}
            ${(currentSceneData.requiresNameAndRoll && !player.hasRolled) ? "" : getinputs()}
            <button id="submit-button">${text}</button>
        `
        
        if (story[story.currentscene].image) {
            document.querySelector("#scene-img").src = `./img/${story[story.currentscene].image}`
        }
        
        var oldButton = document.querySelector('#submit-button');
        var newButton = oldButton.cloneNode(true);
        oldButton.parentNode.replaceChild(newButton, oldButton);
        
        newButton.addEventListener('click', function() {
            handleButtonClick();
        });
    }


    function handleButtonClick() {
        var currentSceneData = story[story.currentscene];

        if (currentSceneData.requiresNameAndRoll && !player.hasRolled) {
            var dynamicInput = document.querySelector('#hero-name');
            if (!dynamicInput.value.trim()) {
                alert("Please enter a name for your hero!");
                return;
            }

            player.name = dynamicInput.value;
            player.hp = rollDie(40) + 30;
            player.strength = rollDie(6) + rollDie(6);
            player.defense = rollDie(4) + 1;
            player.magic = rollDie(6) + rollDie(6);
            player.willpower = rollDie(6);
            player.hasRolled = true;
            player.streak = 0;

            spawnNewEnemy();

            var enemyBaseHp = rollDie(20) + 25;
            enemy.maxHp = enemyBaseHp;
            enemy.hp = enemyBaseHp;
            enemy.strength = rollDie(4) + 5;
            enemy.defense = rollDie(3);
            
            story.currentscene = currentSceneData.defaultdestination;
            renderscene(); 
            return;
        }

                var inputs = document.querySelectorAll('input[type="radio"]');
        if (currentSceneData.choices && inputs.length > 0) {
            var selected = false;
            for (var i = 0; i < inputs.length; i++) {
                if(inputs[i].checked) {
                    var nextScene = inputs[i].getAttribute('data-destination');
                    var targetSceneData = story[nextScene];
                    
                    if (targetSceneData && targetSceneData.isCombatResolution) {
                        if (nextScene === 'sword') {
                            targetSceneData.story = "You swing wildly! Your sword connects, dealing [DAMAGE] damage to the creature.";
                        } else if (nextScene === 'fart') {
                            targetSceneData.story = "You release a toxic cloud! The disgusting stench bypasses its armor, dealing [DAMAGE] damage.";
                        }

                        var playerStatValue = player[targetSceneData.damageStat];
                        var damageDealt = (playerStatValue + rollDie(4)) - enemy.defense;
                        if (damageDealt < 1) damageDealt = 1; 
                        
                        enemy.hp = enemy.hp - damageDealt;
                        if (enemy.hp < 0) enemy.hp = 0;

                        targetSceneData.story = targetSceneData.story.replace("[DAMAGE]", `<strong>${damageDealt}</strong> (Blocked ${enemy.defense} damage with armor)`);

                        if (enemy.hp > 0) {
                            var goblinRoll = enemy.strength + rollDie(4);
                            var damageTaken = goblinRoll - player.defense;
                            if (damageTaken < 1) damageTaken = 1; 

                            player.hp = player.hp - damageTaken;
                            if (player.hp < 0) player.hp = 0;

                            targetSceneData.story += `<br><br><span style="color:#c00;">The Goblin Raider survives and retaliates! It slashes you for <strong>${damageTaken}</strong> damage (blocked ${player.defense} with your defense).</span>`;
                        } else {
                            player.streak++;
                            targetSceneData.story += `<br><br><span style="color:#0a0;">The blow is lethal! The Goblin falls before it can strike back. (Win Streak: ${player.streak})</span>`;
                        }
                    }

                    if (targetSceneData && targetSceneData.isRecoveryResolution) {
                        if (targetSceneData.recoveryType === "heal") {
                            var healAmount = 25;
                            player.hp += healAmount;
                            targetSceneData.story = `You neck a glowing red potion. You recover <strong>${healAmount}</strong> HP!`;
                        } else if (targetSceneData.recoveryType === "train") {
                            var strAmount = 2;
                            player.strength += strAmount;
                            targetSceneData.story = `You take a moment to sharpen your blade. Your permanent Strength increases by <strong>${strAmount}</strong>!`;
                        } else if (targetSceneData.recoveryType === "magtrain") {
                            var magAmount = 2;
                            player.magic += magAmount;
                            targetSceneData.story = `You take a moment to clear your thoughts. Your permanent Magic increases by <strong>${magAmount}</strong>!`; 
                        }
                    }

                    story.currentscene = nextScene;
                    selected = true;
                    renderscene();
                    return;
                }
            }
            if (!selected) {
                alert("Please select an option before moving forward!");
                return; 
            }
        }

        
                if (currentSceneData.defaultdestination) {
            if (currentSceneData.defaultdestination === "reload") {
                location.reload(); 
                return;
            }

            if (currentSceneData.isRecoveryResolution && currentSceneData.defaultdestination === "attack") {
                spawnNewEnemy(); 
            }

            if (player.hp <= 0) {
                story.currentscene = "defeat";
                story.defeat.story = `You fought bravely, <strong>${player.name}</strong>, but the enemy was too strong. Your journey ends here. You managed a final win streak of <strong>${player.streak}</strong>!`;
            } else if (enemy.hp <= 0) {
                story.currentscene = "victory";
            } else {
                story.currentscene = currentSceneData.defaultdestination;
            }
            renderscene();
        }

}

    function getinputs() {
        var input = ""
        if (!story[story.currentscene].choices) {
            return ""
        }
        for(var i = 0; i < story[story.currentscene].choices.length; i++) {
            input += `
                <div>
                    <input data-destination="${story[story.currentscene].choices[i].destination}" id="radio${i}" type="radio" name="choice"/>
                    <label for="radio${i}">${story[story.currentscene].choices[i].choice}</label>
                </div>
            `
        }
        return input;
    }

    function rollDie(sides) {
        return Math.floor(Math.random() * sides) + 1;
    }

    function spawnNewEnemy() {
    var enemyBaseHp = rollDie(20) + 25;
    enemy.maxHp = enemyBaseHp;
    enemy.hp = enemyBaseHp;
    enemy.strength = rollDie(4) + 5;
    enemy.defense = rollDie(3);
}
});