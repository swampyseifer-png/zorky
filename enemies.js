//enemies.js file containing info on
//the foul beasts you will face!
//It shows their stating stats and
//initial inventory.

export const enemies = {
    goblinwarrior: {
        name:`Goblin Warrior`,
        class: `GoblinWarrior`,
        startinghealth: 50,
        physicalattack: 5,
        magicalattack: 0,
        rangedattack: 0,
        defense: 5,
        startingitems: {
            weapons: `rustysword`,
            armour: `woodenbuckler`,
            shield: null,
            magicstave: null,
            potions: {
            },
            bow: null,
            arrow: null
        }
    },
    goblinleader: {
        name:`Goblin Leader`,
        class: `GoblinLeader`,
        startinghealth: 100,
        physicalattack: 15,
        magicalattack: 3,
        rangedattack: 0,
        defense: 5,
        startingitems: {
            weapons: `broadsword`,
            armour: null,
            shield: null,
            magicstave: null,
            potions: {
            },
            bow: `huntingbow`,
            arrow: `broadhead`
        }
    },
    GoblinChief: {
        name:`Goblin Chief`,
        class: `GoblinChief`,
        startinghealth: 300,
        physicalattack: 15,
        magicalattack: 5,
        rangedattack: 0,
        defense: 5,
        startingitems: {
            weapons: `broadsword`,
            armour: `rivetedchainmail`,
            shield: null,
            magicstave: null,
            potions: {
                healthelixir: 1,
                fireflask: 1
            },
            bow: null,
            arrow: null
        },
    }
};