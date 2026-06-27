//characters.js file containing info on
//pickable characters for the adventure!
//It shows their stating stats and
//initial inventory.

export const playercharacters = {
    warrior: {
        name:`Warrior`,
        class: `Warrior`,
        startinghealth: 100,
        physicalattack: 15,
        magicalattack: 0,
        rangedattack: 0,
        defence: 3,
        startingitems: {
            weapons: `rustysword`,
            armour: `tatteredleathers`,
            shield: `woodenbuckler`,
            magicstave: null,
            potions: {
            },
            bow: null,
            arrow: null
        }
    },
    mage: {
        name:`Mage`,
        class: `Mage`,
        startinghealth: 50,
        physicalattack: 2,
        magicalattack: 18,
        rangedattack: 1,
        defence: 1,
        startingitems: {
            weapons: null,
            armour: `tatteredleathers`,
            shield: null,
            magicstave: `gnarledstick`,
            potions: {
                healthelixir: 1
            },
            bow: null,
            arrow: null
        }
    },
    ranger: {
        name:`Ranger`,
        class: `Ranger`,
        startinghealth: 75,
        physicalattack: 5,
        magicalattack: 0,
        rangedattack: 17,
        defence: 2,
        startingitems: {
            weapons: `simpleshiv`,
            armour: `tatteredleathers`,
            shield: null,
            magicstave: null,
            potions: {
            },
            bow: `shortbow`,
            arrow: `flinthead`
        }
    }

};