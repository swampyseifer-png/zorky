#Another update!
I realised that I had uploaded a broken starting button (not helpful!) so that was the first thing I fixed.  I have then mostly been putting together a bit of a silly, basic story.  There are two routes, one uses brawn and one uses brains - NOTE THAT THE STORY IS NOT COMPLETE.
I have enabled the player to search for items after the fight scene, it will use the player.class to work out which items to give (i.e dont give a broadsword to a mage!)

Future plans:\
Further work on the scenes.\
Add some random dice rolls to stats, attack, defence etc to make the combat less boring\
On the future scenes, add in attribute checks.


#UPDATE
I have updated this to conpletely rebuild how this CYOA works.  I've included lots of things such as player classes, multiple enemy classes, and I've added an inventory system.  Each player class has their own starting equipment that adds bonuses to their starting attributes.

Future plans:\
Flesh out scenes, I have moved them to their own js file and there isn't really a flow right now\
I would like to see items being picked up from scenes or fights, and these would modify the attributes further\
On the scenes, having attribute checks for certain paths


# zorky
A simple text adventure for practising javascript

I randomly decided it would be fun to learn javascript, so to help me understand it I decided to create a simply CYOA (create your own adventure) type game...it was going to be really simple, just choose a name and then two radio buttons to ask a question and, depending on the answer, you get taken to a different "scene".

I have then been working more and more on this...adding layers of complexity to the programming.  Reading forums, googling questions and generally bothering GeminiAI to explain bits and pieces to me.

As of 15th Jan 2026 we now have a persistant character, with randomly rolled stats which you can use to fight goblins (who also get randomly rolled stats).  One at a time but over and over, your attributes will persist across fights and you'll also get a kill streak counter.  Each time you defeat a goblin you have the option to: gain 25 health, increase your strength by 2, or increase your magic by 2.

Future plans:\
I would like to see about adding in enemy variations, not just a goblin ranger.\
I would like to play with character classes (e.g. warrior who has extra strength, mage who has extra magic etc).\
I would like to add a basic inventory so that some fights can reward you with items.\
I would like to expand the "game" to be more than just a goblin fighting simulator, to have several scenes to move through.
