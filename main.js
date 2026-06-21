//main.js
//main file that does all the legwork!

//import data from other files
import { playercharacters } from "./characters.js";
import { enemies } from "./enemies.js";
import { items } from "./items.js";
import { scenes } from "./scenes.js";

//initialise game variables
let player = {};
let enemy = {};
let currentscene = "";

document.addEventListener('DOMContentLoaded', function() {

    const content = document.querySelector('#content')

    content.innerHTML = `
    <h1>Welcome to the adventure, let's create your 
        character
    </h1>
    <label for = "playername">Enter Name:
    </label>
    <input type="text" id="playername" 
        placeholder="Hero Name...">
    <br><br>
    <label for = "playerclass">Choose Class:
    </label>
    <select id = "playerclass">
        <option value = "warrior">Warrior</option>
        <option value = "mage">Mage</option>
        <option value = "ranger">Ranger</option>
    </select>
    <br><br>
    <div id = "previewpanel"></div>
    <button id="btnstart">Begin Adventure</button>
    `;

    const classselect = document.getElementById("playerclass");
    classselect.addEventListener("change", updateclasspreview);
    updateclasspreview();

document.getElementById("btnstart").onclick = confirmcharacter;
});

// Updates the preview dynamically with class choices
function updateclasspreview() {
    const selectedclasskey = document.getElementById("playerclass").value;
    const chosenclass = playercharacters[selectedclasskey];
    const previewpanel = document.getElementById("previewpanel");

    // let weapon name show from items database
    let startingitemname = `Unarmed`;
    let physicalattackbonus = 0;
    let magicalattackbonus = 0;
    let rangedattackbonus = 0;
    let defencebonus = 0;
    const itemsdata = chosenclass.startingitems;

    // 1. Check if it's a Ranged class (has both a bow and an arrow)
    if (itemsdata.bow && itemsdata.arrow) {
        const bowname = items.bows[itemsdata.bow].name;
        const arrowname = items.arrows[itemsdata.arrow].name;
        startingitemname = `${bowname} + ${arrowname}`;
        rangedattackbonus += (items.bows[itemsdata.bow].bonus || 0) + (items.arrows[itemsdata.arrow].bonus || 0)
    }
    // 2. Check if it's a Mage class (uses 'magicstave' instead of 'staves')
    else if (itemsdata.magicstave) {
        const staveid = itemsdata.magicstave;
        startingitemname = items.magicstaves[staveid].name; // Looks inside your staves database
        magicalattackbonus += (items.magicstaves[staveid].bonus || 0);
    } 
    
    // 3. Fallback for standard classes (like Warrior using a singular weapon)
    else if (itemsdata.weapons) {
        const weaponid = itemsdata.weapons;
        startingitemname = items.weapons[weaponid].name;
        physicalattackbonus +=(items.weapons[weaponid].bonus || 0);
    }   
    
    //add shield bonus to defence rating
    if (itemsdata.shield && items.shields && 
        items.shields[itemsdata.shield]) {
            defencebonus += (items.shields[itemsdata.shield].bonus || 0);
    }

    //add armour bonus to defence rating
    if (itemsdata.armour && items.armour && 
        items.armour[itemsdata.armour]) {
            defencebonus += (items.armour[itemsdata.armour].bonus || 0);
    }

    //determine which attack type
    const ismage = !!itemsdata.magicstave;
    const isranger = !!(itemsdata.bow && itemsdata.arrow);

    let totalattackdisplay = "";
    if (ismage) {
        totalattackdisplay = `<p><strong>Magical Attack:</strong> ${chosenclass.magicalattack} <span style="color: #4caf50;">(+${magicalattackbonus} from magical stave)</span> = ${chosenclass.magicalattack + magicalattackbonus}</p>`;
    } else if (isranger) {
        totalattackdisplay = `<p><strong>Ranged Attack:</strong> ${chosenclass.rangedattack} <span style="color: #4caf50;">(+${rangedattackbonus} from bow and arrows)</span> = ${chosenclass.rangedattack + rangedattackbonus}</p>`;
    } else {
        totalattackdisplay = `<p><strong>Physical Attack:</strong> ${chosenclass.physicalattack} <span style="color: #4caf50;">(+${physicalattackbonus} from Weapon)</span> = ${chosenclass.physicalattack + physicalattackbonus}</p>`;
    }

    // Inject the updated text directly into the preview container
    previewpanel.innerHTML = `
        <h3>Class Profile: ${chosenclass.name}</h3>
        <p><strong>Starting Health:</strong> ${chosenclass.startinghealth}</p>
        <p><strong>Attack damage></strong> ${totalattackdisplay}
        <p><strong>Defence:</strong> ${chosenclass.defence} <span style="color: #4caf50;">(+${defencebonus} from Gear)</span> = ${chosenclass.defence + defencebonus}</p>
        <p><strong>Starting equipment:</strong> ${startingitemname}</p>
    `;
}

//validate player choices and save as global state
function confirmcharacter() {
    let nameinput = document.getElementById("playername").value.trim();
    let classselection = document.getElementById("playerclass").value;
    //alert if name missed
    if (nameinput ==="") {
        alert("Please enter a name before starting");
        window.event.preventDefault();
        return false ;
    }


//fetch player stats from characters.js file
let chosenclass = playercharacters[classselection]; 

//initialise player state
player = {
    name: nameinput,
    class: classselection,
    health: chosenclass.startinghealth,
    maxhealth: chosenclass.startinghealth,
    physicalattack: chosenclass.physicalattack,
    magicalattack: chosenclass.magicalattack,
    rangedattack: chosenclass.rangedattack,
    defence: chosenclass.defence,
    //start items
    equippedweapon: chosenclass.startingitems.weapons,
    equippedarmour: chosenclass.startingitems.armour,
    equippedsheild: chosenclass.startingitems.shield,
    equippedmagicstave: chosenclass.startingitems.magicstave,
    equippedbow: chosenclass.startingitems.bow,
    equippedarrow: chosenclass.startingitems.arrow,
    potions: chosenclass.startingitems.potions,
};

//lets start the story!
startstoryengine("initialscene");
}

//hand off to scenes.js file data
function renderStoryScene() {
    const content = document.querySelector('#content');
    let scene = scene[currentsceneid];

    //display current health with the story#
    content.innerHTML = `
        <div class="storycontainer">
            <div class="statusbar">Health: ${player.health} / ${player.maxhealth}</div>
            <p class="storytext">${scene.story}</p>
            <div id="choicescontainer" class="choicesbox"></div>
        </div>
    `;

    //clear screen and pass over narrative
    content.innerHTML = `
        <div class="storycontainer">
            <p class="storytext">${scene.story}</p>
            <div id="choicescontainer" class="choicesbox"></div>
        </div>
    `;

    //find empty choices container
    const choicescontainer = document.getElementById("choicescontainer");

    //loop through choices attacked to this scene
    scene.choices.forEach(choice => {
        let button = document.createElement("button");
        button.innerText = choices.text;
        button.className = "btnchoice";

        //when choice clicked, change the current id to the
        //next scene destination and rerender
        //also a check to see if the choice made does damage
        button.onclick = function() {
            if (choices.damage) {
                player.health -=choices.damage;
                alert(`Ouch! The choice cost you 
                    ${choice.damage} health!`)
            }
            if (player.health <= 0) {
                player.health = 0;
                triggergameover();
                return;
            }
            
            startStoryEngine(choices.nextscene);
        };

        //append the newly built button for the next scene
        choicesContainer.appendChild(button);
    });

    //simple gameover handler function
    function triggergameover() {
        const content = document.querySelector(`#content`);
        content.innerHTML = `
        <div class="game-over">
            <h1>YOU HAVE DIED</h1>
            <p>Your journey ends here. Better luck next time, 
                hero.</p>
            <button onclick="location.reload()">Try Again</button>
        </div>`
    }
}