/*Abilities, commands, and command_types created in seed-objects.js*/
/*************************************************
var abilities = [{"TYPE":"A",
                  "Shimmering":"Fire Boost",
                  "Fleeting":"Magic Haste",
                  "Pulsing":"Leaf Bracer",
                  "Wellspring":"Air Combo Plus",
                  "Soothing":"HP Boost",
                  "Hungry":"HP Prize Plus",
                  "Abounding":"Link Prize Plus"}]
var commands = [{"Command":"Blitz",
                 "First":"Quick Blitz",
                 "Second":"Slot Edge",
                 "Type":"O",
                 "CHANCE": 90}]
 var command_types = [{"Command":"Quick Blitz",
                       "Type":"Attack"}]
***************************************************/

/*SET UP THE "SOURCE COMMANDS" FOR THE MELDING MENU*/
var source_commands = [];
/* Grab unique command names */
commands.forEach(function(command){
    if (source_commands.indexOf(command.First) < 0){
        source_commands.push(command.First);
    }
    if (source_commands.indexOf(command.Second) < 0){
        source_commands.push(command.Second);
    }
});
/* Match the names to their types */
command_types.forEach(function(command){
    if (source_commands.indexOf(command.Command) >= 0){
        source_commands[source_commands.indexOf(command.Command)] = command;
     }
});

source_commands.sort(function(a,b){
    var caseA = a.Type.toUpperCase();
    var caseB = b.Type.toUpperCase();
    if (caseA < caseB)
        return -1;
    if (caseA > caseB)
        return 1;

    return 0;
})
console.log(source_commands);
var crystals = ["Shimmering",	"Fleeting",	"Pulsing",	"Wellspring",	"Soothing",	"Hungry",	"Abounding"];


/************************************************************/


/************************************************************/


/************************************************************/


/************************************************************/
