//items.js file containing info on
//the various weapins, armors, etc
// that you will find on your
// adventure!

export const items = {
    weapons: {
        rustysword: {
            id: `rustysword`,
            name: `Rusty Sword`,
            description: `An old dull blade, pitted with rust.`,
            bonus: 2
        },
       Broadsword: {
            id: `broadsword`,
            name: `Broadsword`,
            description: `Well-balanced and built to last.`,
            bonus: 5
        }, 
        foldedsteelblade: {
            id: `foldedsteelblade`,
            name: `Folded Steel Blade`,
            description: `A master-crafted weapon. The edge
            is terrifyingly sharp.`,
            bonus: 10
        },
        runegreatsword: {
            id: `runegreatsword`,
            name: `Rune-etched Greatsword of the Dwarven Lords`,
            description: `Dwarven runes glow along the length 
            of the blade.  It feels as light as a feather but 
            strikes with tectonic forces.`,
            bonus: 25
        },
        simpleshiv: {
            id: `simpleshiv`,
            name: `Simple Shiv`,
            description: `Better at cutting rope than flesh.`,
            bonus: 2
        },
        irondirk: {
            id: `irondirk`,
            name: `Iron Dirk`,
            description: `A sharpened dagger, perfect to slide 
            inbetween armour.`,
            bonus: 5
        },
        snaketoothdagger: {
            id: `snaketoothdagger`,
            name: `Snake-tooth Dagger`,
            description: `A curved serrated blade that shimmers 
            with a toxic emerald sheen.`,
            bonus: 10
        },
        phantomblade: {
            id: `phantomblade`,
            name: `Phantom Blade of Shadows`,
            description: `A blade of literal darkness. It causes 
            no visible external wounds, cutting instead at the 
            target's lifeforce`,
            bonus: 25
        },
    },
    armour: {
        tatteredleathers: {
            id: `tatteredleathers`,
            name: `Tattered Leathers`,
            description: `Stiff patchwork leather.`,
            bonus: 2
        },
        rivetedchainmail: {
            id: `rivetedchainmail`,
            name: `Riveted Chainmail`,
            description: `Interlocking rings of iron that will 
            turn a blade.`,
            bonus: 5
        },
        steelplate: {
            id: `steelplate`,
            name: `Reinforced Steel Plate`,
            description: `Well crafted steel plates that 
            contour to you perfectly.`,
            bonus: 10
        },
        celestialmail: {
            id: `celestialmail`,
            name: `Celestial Mail of Sol`,
            description: `Forged from a fallen star. Light as 
            silk but stops all but the hardest attacks.`,
            bonus: 25
        }
    },
    shields: {
        woodenbuckler: {
            id: `woodenbuckler`,
            name: `Rotting Wooden Buckler`,
            description: `Rotting wood held together by rusted 
            iron wire.`,
            bonus: 2
        },
        roundshield: {
            id: `roundshield`,
            name: `Reinforced Roundshield`,
            description: `A rounded piece of oak, reinforced 
            with a sheet of iron`,
            bonus: 5
        },
        towershield: {
            id: `towershield`,
            name: `Steel Towershield`,
            description: `A massive bulwark of steel, it looks 
            well made and shiny.`,
            bonus: 10
        },
        dragonscaleshield: {
            id: `dragonscaleshield`,
            name: `Dragonscale Shield of Cygnax`,
            description: `Forged from the iridescent scales of 
            the mighty dragon Cygnax. This shield effortlessly 
            absorbs every assault.`,
            bonus: 25
        }
    },
    magicstaves: {
        gnarledstick: {
            id: `gnarledstick`,
            name: `Gnarled Stick`,
            description: `A simple stick twisted by magic.`,
            bonus: 2
        },
        focusstaff: {
            id: `focusstaff`,
            name: `Focus Staff`,
            description: `Polished ash staff topped with a 
            quartz crystal.`,
            bonus: 5
        },
        voidsceptre: {
            id: `voidsceptre`,
            name: `Void-infused Sceptre`,
            description: `Carved from stone found deep under
            ground. It thrums with dark energy.`,
            bonus: 10
        },
        blessedstave: {
            id: `blessedstave`,
            name: `Oracle-blessed Stave of Chronos`,
            description: `A stave made of a solid block of 
            ivory.  On the tip is an hourglass filled with 
            stardust.`,
            bonus: 25
        },

    },
    potions: {
        healthexlir: {
            id: `healthexlir`,
            name: `Cloudy Health Elixir`,
            description: `A murky swirling crimson liquid inside 
            a chipped class phial.`,
            bonus: 20
        },
        vermilionwater: {
            id: `vermilionwater`,
            name: `Vermilion Water`,
            description: `A think orange-red fluid that seems to 
            pulse within the heavy glass flask.`,
            bonus: 30
        },
        rejuvserum: {
            id: `rejuvserum`,
            name: `Distilled Rejuvenation Serum`,
            description: `A perfectly clear glowing amber liquid 
            that catches the light, like trapped sunshine.`,
            bonus: 50
        },
        scarlettonic: {
            id: `scarlettonic`,
            name: `Vibrant Scarlet Tonic`,
            description: `A blindingly bright red liquid, 
            seemingly defying gravity, as it floats and flows 
            around the bottle.`,
            bonus: 100
        },
        fireflask: {
            id: `fireflask`,
            name: `Fire Flask`,
            description: `A sealed glass container holding 
            the heat of a raging fire.`,
            bonus: 30
        },
        causticphial: {
            id: `causticphial`,
            name: `Caustic-core Phial`,
            description:`A phial with a stopper.  Inside swirls 
            a sickly green liquid`,
            bonus: 30
        }
    },
    bows: {
        shortbow: {
            id: `shortbow`,
            name: `Makeshift Shortbow`,
            description: `Little more than a branch with taut 
            hemp twine.`,
            bonus: 2
        },
        huntingbow: {
            id: `huntingbow`,
            name: `Yew Hunting Bow`,
            description: `A properly crafted bow. The seasoned 
            wood provides good tension and a smooth pull.`,
            bonus: 5
        },
        compositebow: {
            id: `compositebow`,
            name: `Composite Bow`,
            description: `A well-made bow consisting of horn, 
            wood, and sinew. It has a compact, curved shape.`,
            bonus: 10
        },
        longbow: {
            id: `longbow`,
            name: `Ironwood Longbow of Minue-Vesa`,
            description: `Carved from the ancient ironwood 
            tree, and blessed by the forest matriarch.`,
            bonus: 25
        }

    },
    arrows: {
        flinthead: {
            id: `flinthead`,
            name: `Flinthead Arrows`,
            description: `Plain wooden shaft, tipped with hand-
            chipped stone.`,
            bonus: 1
        },
        broadhead: {
            id: `broadhead`,
            name: `Broadhead Iron Arrows`,
            description: `Wide, triangular iron heads designed 
            to slice through basic armour.`,
            bonus: 2
        },
        barbedsteel: {
            id: `barbedsteel`,
            name: `Barbed Steel Arrows`,
            description: `With ultra sharp tips but backward-
            pointing projections.  These arrows will punch 
            through heavy armour but will not pull out easy.`,
            bonus: 5
        },
        firearrows: {
            id: `firearrows`,
            name: `Enchanted Fire Arrows of the Phoenix`,
            description: `Fletched with feathers of the famous 
            phoenix bird, these arrows ignite into hot-white
            magical flame the moment they leave the bowstring.`,
            bonus: 12
        }

    }

};