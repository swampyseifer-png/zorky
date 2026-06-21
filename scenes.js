//scenes.js file containing info on
//the various situations you will face!

export const scenes = {
    start: {
        id: "start",
        title: `First steps...`,
        story: `You step out into the crisp morning air as a 
        fully-fledged adventurer. Ahead of you, the cobblestone 
        path splits into a dark forest trail and a bustling 
        mountain pass.`,
        choices: [
            {text: `Take the forest trail`, 
                nextscene: `foresttrail`},
            {text: `Head toward the mountain pass`, 
                nextscene: `mountainpath`}
        ]
    },
    foresttrail: {
        id: `foresttrail`,
        title: `Forest trail`,
        story: `The canopy above blocks out most of the sunlight. 
        Owls hoot in the distance, and you hear a rustling noise 
        in the nearby bushes.`,
        choices: [
            { text: "Investigate the bushes.", 
                nextscene: "bushrustle",
                damage: 10 },
            { text: "Ignore it and move on ahead.", 
                nextscene: "forestdeep" },
            { text: "Turn back immediately!", 
                nextscene: "homeissafe" }
        ]
    },
    mountainpath: {
        id: `mountainpath`,
        title: `Mountain path`,
        story: `The mountain wind cuts fiercely across your face. 
        Up ahead, an old wooden toll bridge blocks your path, 
        guarded by an armed sentry.`,
        choices: [
            { text: "Approach peaceafully", 
                nextScene: "guardtalk" },
            { text: "Ready your weapon and attack!", 
                nextScene: "combatguard" }
        ]
    },
    foresttrailbush: {
        id: `bushrustle`,
        title: `Investigate bush`,
        story: `Hearing a strange sound, and seeing the bush 
        rustle your adrenaline pumpin.  You quietly crouch down 
        next to the bush and then shove your hand in to grab 
        whatever it is hiding in there.  Oh no!  Its a very 
        angry weasel who was enjoying a rest, it lashes out a 
        clawed paw at your hand and catches you across the palm
        doing 10 points of damage!`,
        choices: [
            { text: "Feeling a bit stupid, you carry on walking.", 
                nextscene: "forest_deep" },
            { text: "Turn back immediately!", 
                nextscene: "homeissafe" }
        ]
    }
}