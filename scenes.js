//scenes.js file containing info on
//the various situations you will face!

export const scenes = {
    start: {
        id: "start",
        title: `First steps...`,
        story: `You step out into the crisp morning air as the 
        guild doors close solemnly behind you. It's hard to 
        believe that after so many years as a trainee adventurer, 
        you are now on your own.  You vow that you 
        will make a name for yourself, and bring glory to the 
        guild. 
        <br> <br>
        You tug your leather jerkin downwards, raise your chin 
        high and look out into the wide world!
        <br> <br>
        Ahead of you, the cobblestone path from the guild door 
        trails away for several hundred years before it splits 
        - to your left it heads into a forest trail, and to the 
        right a well-walked mountain pass.`,
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
        story: `The forest path is rough, but managable and you 
        enjoy walking in peace for several hours.  Slowly the 
        canopy above, gets thicker and thicker until eventually 
        it is blocking out most of the sunlight.   You assume 
        eventually that the day is turning to night as the forest 
        noises begin to change around you.  Somewhere an owl hoots 
        in the distance, it makes you stop and look up, its an 
        this point you hear a rustling noise in the nearby bushes.`,
        choices: [
            { text: `Investigate the bushes.`, 
                nextscene: `bushrustle`,
                damage: 3 },
            { text: `Ignore it and move on ahead.`, 
                nextscene: `forestdeep` },
            { text: `Turn back immediately!`, 
                nextscene: `homeissafe` }
        ]
    },
    
    bushrustle: {
        id: `bushrustle`,
        title: `Investigate bush`,
        story: `Hearing a strange sound, and seeing the bush 
        rustle your adrenaline pumpin.  You quietly crouch down 
        next to the bush and then shove your hand in to grab 
        whatever it is hiding in there.  
        <br> <br>
        Oh no!  Its a very angry weasel who was enjoying a 
        rest, it lashes out a clawed paw at your hand and 
        catches you across the palm doing <strong>3 points of 
        damage!</strong>`,
        choices: [
            { text: `Feeling a bit stupid, you carry on walking.`, 
                nextscene: `forestdeep` },
            { text: `Fame and fortune be damned, I'm not cut out 
                for this! Turn back immediately!`, 
                nextscene: "homeissafe" }
        ]
    },
    forestdeep: {
        id: `forestdeep`,
        title: `The hut`,
        story: `After some more time spent feeling one with Mother 
        Nature, you come across a hut in a clearing.  Its quiet 
        and eerily quiet now, all the animals are clearly staying 
        away.  Even as relatively untrained of an adventurer as you 
        are, its clear there is a <i>feeling</i> here...something 
        isn't right.  
        <br> <br>
        Just looking around you can see that this hut is surrounded 
        by no flowers or bushes, even the grass looks yellowed and 
        sickly. The chimney puffs out thick, black tar smoke.  
        You can make out sounds of movement from inside, the clattering 
        of metal and the shuffling of wood.  Every fibre of your being wants 
        to turn around and walk back.....`,
        choices: [
            { text: `This is why you became an adventurer! Onward!`,
                nextscene: `hutexterior`
            }

        ]
    },
    hutexterior: {
        id: `hutexterior`,
        title: `Hut exterior`,
        story: `Moving closer you crouch downby the dilapidated hut.  
        As you get close you can see that the crooked structure is 
        built from rotting log walls caked in dried mud and animal fat. 
        Also now closer, that oily smoke carrys a sickening stench of 
        charred, unidentifiable meat and sour filth. From within the 
        dark interior comes harsh bickering in a guttural tongue, and a 
        frantic, insect-like chittering that makes your skin crawl.
        <br> <br>
        Stepping closer, you try to peer through a small, grime-encrusted 
        window. The glass is heavily yellowed with layers of grease and smoke. 
        As your eyes strain to adjust to the dim, chaotic interior, 
        a pair of bloodshot, milky-yellow eyes suddenly snap directly 
        to yours through the filth.
        <br> <br>
        Before you can even draw a breath, the hut's warped wooden door 
        explodes outward. Two snarling goblins, brandishing jagged 
        rusted weapons rush out into the clearing straight for you.`,
        choices: [{text: `Let's do this!`,
            nextscene: `hutexterior_battle`
            }
        ]
    },
    hutexterior_battle: {
        id: `hutexterior_battle`,
        title: `The battle begins`,
        story: `The goblins hiss and screach, swinging their crude 
        weapons at you.`,
        type: `combat`,
        enemyIds: [`goblinwarrior`],//, `goblinwarrior`],
        choices: [
            {text: `Let's do this!`,
            nextscene: `hutinterior`
            }
        ]

    },
    hutinterior: {
        id: `hutinterior`,
        title: `Hut interior`,
        story: `As the final breath dies in the throat of the
        last gobbo and it collpases into the dirt, you can almost
        feel some foret life come back to this little clearing.  
        You kick open the door to the hut, eager to see what spoils
        may lie hidden within the squalid interior.`,
        choices: [
            {text: `Search the ground for a new weapon`,
                lootType: 'weapon',
                lootPool: {
                    Warrior: [`broadsword`],
                    Mage: [`focusstaff`],
                    Ranger: [{
                        bow: `huntingbow`,
                        arrows: `broadhead`
                        }
                    ]
                } 
            },
            {text: `Check some old chests for armour`,
                lootType: 'armour',
                lootPool: {
                    Warrior: [`rivetedchainmail`],
                    Mage: [`rivetedchainmail`],
                    Ranger: [`rivetedchainmail`]
                }
            },
            {text: `Look under the table for a new shield`,
                lootType: 'shields',
                lootPool: {
                    Warrior: [`roundshield`],
                    Mage: [`woodenbuckler`],
                    Ranger: [`woodenbuckler`]
                }
            },
            {text: `Check the kitchen for potions`,
                lootType: 'potion',
                potiontype: `healthelixir`,
                count: 1
            },
            {text: `Taking your well-earned reward, you leave
                this horrible place and return outside.`,
                nextscene: `exitforest`
            }
        ]
    },
    exitforest: {
        id: `exitforest`,
        title: `The forest's edge`,
        story: `The dense canopy breaks, suddenly exposing you 
        to the blinding glare of the afternoon sun. Before you, 
        the claustrophobic woods give way to vast, golden fields 
        that roll onward until they swallow the horizon.`,
        choices: [
            {text: ``,
                nextscene: `openfields`
            }
        ]
    },
    mountainpath: {
        id: `mountainpath`,
        title: `Mountain path`,
        story: `The mountain wind cuts fiercely across your face, 
        being funnelled directly at you by the looming shapes of 
        <strong>Mount Sharnrock</strong> to your left and <strong>
        Mount Gladurn</strong> to the right.  
        <br> <br>
        Up ahead, the ground has been rent asunder, aeons ago, most 
        likely by these two great mountains pushing their way up 
        from the ground.  The only way across is via an old wooden 
        toll bridge blocks your path, guarded by an armed sentry.  
        <br> <br>
        There is no way to cross this gorge without confronting them.`,
        choices: [
            { text: `Approach peaceafully`, 
                nextscene: `guardtalk` },
            { text: `Ready your weapon and attack!`, 
                nextscene: `combatguard` }
        ]
    },
    guardtalk: {
        id: `guardtalk`,
        title: `Peacefully approach the sentry`,
        story: `You remember your tutelage at the guild
        <br>
        <i>The better part of valor is discretion - sometimes 
        its wisest to avoid unneccessary danger"</i>.
        <br> <br>
        You approach the guard with your weapon stowed and your 
        demeanour being non-threatening.  The guard greets you.
        <br> <br>
        <strong>Hail whomsoeth approaches.  Thou must answer me 
        these questions three...'ere the other side he see
        !</strong>`,
        choices: [
            {text: `I will answer your questions friend!`,
                nextscene: `riddle1`}
        ]
    },
    riddle1: {
        id: `riddle1`,
        title: `The first riddle`,
        story: `<strong> "I have no weight, but you can see me. 
        Put me in a bucket, and I will make it lighter. 
        <br> <br>
        What am I?"</strong>`,
        choices: [
            {text: `A feather is light!`,
                nextscene: `restartriddles`,
                damage: 3},
            {text: `Umm, oh a ghost weighs nothing!`,
                nextscene: `restartriddles`,
                damage: 3},
            {text: `Quite clearly, my friend, you refer to a
                hole!`,
                nextscene: `riddle2`}
        ]
    },
    riddle2: {
        id: `riddle2`,
        title: `The second riddle`,
        story: `<strong>I run over hills, through valleys, 
        and under trees, but I never move an inch. 
        <br>
        What am I?</strong>`,
        choices: [
            {text: `The answer is most definitely...wind!`,
                nextscene: `restartriddles`,
                damage: 3},
            {text: `What runs thorugh hills and valleys...
                aha! Obviously you mean a dear!`,
                nextscene: `restartriddles`,
                damage: 3},
            {text: `Any fool could see that you are referring
                to a road.`,
                nextscene: `riddle3`}
        ]
    },
    riddle3: {
        id: `riddle3`,
        title: `The final riddle`,
        story: `I have a spine, but no bones. I have leaves, 
        but no branches. I speak to you, but have no voice. 
        <br>
        What am I?`,
        choices: [
            {text: `I speak but have no voice...do you mean
                an echo?`,
                nextscene: `restartriddles`,
                damage: 3},
            {text: `Oh wow, thats a toughie! Pure guess, poison
                ivy?!`,
                nextscene: `restartriddles`,
                damage: 3},
            {text: `A Book - it has a spine, it has leaves, and
                it speaks to you.`,
                nextscene: `riddlepass`}
        ]
    },
    restartriddles: {
        id: `restartriddles`,
        title: `Incorrect answer`,
        story: `The armoured sentry remains stock still and silent.
        He stares at you unwaveringly, his gaze peering right into
        your very stupid soul that gave such a stupid answer.
        <br> <br>
        Quick as lightning he strikes you across the face with a
        mailed glove.  The force knocks you from your feet and drops
        you in a pile on the floor and you take <strong>3 points 
        of damage</strong>!
        <br> <br>
        As you stand up, he says once again.
        <br> <br>
        <strong>Hail whomsoeth approaches.  Thou must answer me 
        these questions three...ere the other side he see
        !</strong>`,
        choices: [
            {text: `Try the riddles again.`,
                nextscene: `riddle1`
            },
            {text: `I really don't think I'm cut out for this!`,
                nextscene: `homeissafe`
            }
        ]
    },
    riddlepass: {
        id: `riddlepass`,
        title: `Correct answer`,
        story: `The armoured sentry remains stock still and 
        silent.  He stares at you unwaveringly, his gaze 
        peering right into your very soul.  After what seems 
        like an eternity, he steps backwards, and bids your to 
        pass with a sweep of his hand.
        <br> <br>
        <strong>Knowedgeable thouest are.  Rewarded thouest 
        should be</strong>`,
        choices: [
            {text: `The sentry steps back and waves you past, 
                rewarding you with 3 healing potions.`,
                nextscene: `openfields`
            },
        ],
        onenter: {
            awardtype: `potion`,
            potiontype: `healthelixir`,
            count: 3
        }
    }
    
}