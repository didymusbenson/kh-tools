var abilities = [
 {
   "TYPE": "A",
   "Shimmering": "Fire Boost",
   "Fleeting": "Magic Haste",
   "Pulsing": "Leaf Bracer",
   "Wellspring": "Air Combo Plus",
   "Soothing": "HP Boost",
   "Hungry": "HP Prize Plus",
   "Abounding": "Link Prize Plus"
 },
 {
   "TYPE": "B",
   "Shimmering": "Fire Boost",
   "Fleeting": "Reload Boost",
   "Pulsing": "Finish Boost",
   "Wellspring": "Once More",
   "Soothing": "Damage Syphon",
   "Hungry": "HP Prize Plus",
   "Abounding": "EXP Chance"
 },
 {
   "TYPE": "C",
   "Shimmering": "Fire Screen",
   "Fleeting": "Attack Haste",
   "Pulsing": "Finish Boost",
   "Wellspring": "Combo Plus",
   "Soothing": "HP Boost",
   "Hungry": "HP Prize Plus",
   "Abounding": "Link Prize Plus"
 },
 {
   "TYPE": "D",
   "Shimmering": "Fire Screen",
   "Fleeting": "Attack Haste",
   "Pulsing": "Leaf Bracer",
   "Wellspring": "Combo Plus",
   "Soothing": "HP Boost",
   "Hungry": "HP Prize Plus",
   "Abounding": "Link Prize Plus"
 },
 {
   "TYPE": "E",
   "Shimmering": "Blizzard Boost",
   "Fleeting": "Magic Haste",
   "Pulsing": "Leaf Bracer",
   "Wellspring": "Combo Plus",
   "Soothing": "Item Boost",
   "Hungry": "HP Prize Plus",
   "Abounding": "Lucky Strike"
 },
 {
   "TYPE": "F",
   "Shimmering": "Blizzard Boost",
   "Fleeting": "Reload Boost",
   "Pulsing": "Second Chance",
   "Wellspring": "Air Combo Plus",
   "Soothing": "Damage Syphon",
   "Hungry": "HP Prize Plus",
   "Abounding": "Lucky Strike"
 },
 {
   "TYPE": "G",
   "Shimmering": "Blizzard Screen",
   "Fleeting": "Attack Haste",
   "Pulsing": "Leaf Bracer",
   "Wellspring": "Air Combo Plus",
   "Soothing": "Item Boost",
   "Hungry": "HP Prize Plus",
   "Abounding": "Luck Boost"
 },
 {
   "TYPE": "H",
   "Shimmering": "Blizzard Screen",
   "Fleeting": "Magic Haste",
   "Pulsing": "Combo F Boost",
   "Wellspring": "Air Combo Plus",
   "Soothing": "Item Boost",
   "Hungry": "HP Prize Plus",
   "Abounding": "EXP Walker"
 },
 {
   "TYPE": "I",
   "Shimmering": "Thunder Boost",
   "Fleeting": "Magic Haste",
   "Pulsing": "Combo F Boost",
   "Wellspring": "Air Combo Plus",
   "Soothing": "HP Boost",
   "Hungry": "Treasure Magnet",
   "Abounding": "Link Prize Plus"
 },
 {
   "TYPE": "J",
   "Shimmering": "Thunder Boost",
   "Fleeting": "Reload Boost",
   "Pulsing": "Combo F Boost",
   "Wellspring": "Once More",
   "Soothing": "Defender",
   "Hungry": "Treasure Magnet",
   "Abounding": "EXP Chance"
 },
 {
   "TYPE": "K",
   "Shimmering": "Thunder Screen",
   "Fleeting": "Attack Haste",
   "Pulsing": "Finish Boost",
   "Wellspring": "Combo Plus",
   "Soothing": "HP Boost",
   "Hungry": "Treasure Magnet",
   "Abounding": "Link Prize Plus"
 },
 {
   "TYPE": "L",
   "Shimmering": "Thunder Screen",
   "Fleeting": "Attack Haste",
   "Pulsing": "Finish Boost",
   "Wellspring": "Combo Plus",
   "Soothing": "HP Boost",
   "Hungry": "Treasure Magnet",
   "Abounding": "Lucky Strike"
 },
 {
   "TYPE": "M",
   "Shimmering": "Cure Boost",
   "Fleeting": "Magic Haste",
   "Pulsing": "Combo F Boost",
   "Wellspring": "Combo Plus",
   "Soothing": "Item Boost",
   "Hungry": "Treasure Magnet",
   "Abounding": "Lucky Strike"
 },
 {
   "TYPE": "N",
   "Shimmering": "Cure Boost",
   "Fleeting": "Reload Boost",
   "Pulsing": "Second Chance",
   "Wellspring": "Combo Plus",
   "Soothing": "Defender",
   "Hungry": "Treasure Magnet",
   "Abounding": "Lucky Strike"
 },
 {
   "TYPE": "O",
   "Shimmering": "Dark Screen",
   "Fleeting": "Attack Haste",
   "Pulsing": "Finish Boost",
   "Wellspring": "Air Combo Plus",
   "Soothing": "Item Boost",
   "Hungry": "Treasure Magnet",
   "Abounding": "Lucky Strike"
 },
 {
   "TYPE": "P",
   "Shimmering": "Dark Screen",
   "Fleeting": "Magic Haste",
   "Pulsing": "Combo F Boost",
   "Wellspring": "Air Combo Plus",
   "Soothing": "Item Boost",
   "Hungry": "Treasure Magnet",
   "Abounding": "EXP Walker"
 }
];

var commands = [
 {
   "Command": "Blitz",
   "First": "Quick Blitz",
   "Second": "Slot Edge",
   "Type": "O",
   "CHANCE": 90
 },
 {
   "Command": "Blitz",
   "First": "Barrier Surge",
   "Second": "Wishing Edge",
   "Type": "P",
   "CHANCE": 90
 },
 {
   "Command": "Blitz",
   "First": "Stun Edge",
   "Second": "Slot Edge",
   "Type": "K",
   "CHANCE": 90
 },
 {
   "Command": "Meteor Crash",
   "First": "Blitz",
   "Second": "Quake",
   "Type": "N",
   "CHANCE": 100
 },
 {
   "Command": "Meteor Crash",
   "First": "Fire Strike",
   "Second": "Brutal Blast",
   "Type": "D",
   "CHANCE": 100
 },
 {
   "Command": "Magic Hour",
   "First": "Blitz",
   "Second": "Zero Graviga",
   "Type": "O",
   "CHANCE": 90
 },
 {
   "Command": "Magic Hour",
   "First": "Barrier Surge",
   "Second": "Aeroga",
   "Type": "N",
   "CHANCE": 90
 },
 {
   "Command": "Fire Dash",
   "First": "Sliding Dash",
   "Second": "Fire",
   "Type": "D",
   "CHANCE": 100
 },
 {
   "Command": "Fire Dash",
   "First": "Sliding Dash",
   "Second": "Fira",
   "Type": "C",
   "CHANCE": 100
 },
 {
   "Command": "Fire Dash",
   "First": "Confusion Strike",
   "Second": "Fire",
   "Type": "D",
   "CHANCE": 100
 },
 {
   "Command": "Dark Haze",
   "First": "Fire Dash",
   "Second": "Zero Gravira",
   "Type": "D",
   "CHANCE": 100
 },
 {
   "Command": "Dark Haze",
   "First": "Fire Dash",
   "Second": "Blackout",
   "Type": "A",
   "CHANCE": 100
 },
 {
   "Command": "Dark Haze",
   "First": "Fire Surge",
   "Second": "Zero Gravity",
   "Type": "C",
   "CHANCE": 100
 },
 {
   "Command": "Sonic Blade",
   "First": "Blitz",
   "Second": "Dark Haze",
   "Type": "D",
   "CHANCE": 90
 },
 {
   "Command": "Sonic Blade",
   "First": "Blitz",
   "Second": "Air Slide",
   "Type": "N",
   "CHANCE": 90
 },
 {
   "Command": "Sonic Blade",
   "First": "Fire Dash",
   "Second": "Thunder Surge",
   "Type": "K",
   "CHANCE": 90
 },
 {
   "Command": "Chaos Blade",
   "First": "Dark Haze",
   "Second": "Sonic Blade",
   "Type": "B",
   "CHANCE": 90
 },
 {
   "Command": "Zantetsuken",
   "First": "Dark Haze",
   "Second": "Stopga",
   "Type": "B",
   "CHANCE": 80
 },
 {
   "Command": "Zantetsuken",
   "First": "Sonic Blade",
   "Second": "Stopga",
   "Type": "F",
   "CHANCE": 80
 },
 {
   "Command": "Strike Raid",
   "First": "Quick Blitz",
   "Second": "Sliding Dash",
   "Type": "O",
   "CHANCE": 100
 },
 {
   "Command": "Freeze Raid",
   "First": "Strike Raid",
   "Second": "Blizzara",
   "Type": "I",
   "CHANCE": 100
 },
 {
   "Command": "Freeze Raid",
   "First": "Blizzard Edge",
   "Second": "Binding Strike",
   "Type": "K",
   "CHANCE": 100
 },
 {
   "Command": "Treasure Raid",
   "First": "Strike Raid",
   "Second": "Slot Edge",
   "Type": "O",
   "CHANCE": 100
 },
 {
   "Command": "Treasure Raid",
   "First": "Slot Edge",
   "Second": "Magnet",
   "Type": "D",
   "CHANCE": 100
 },
 {
   "Command": "Treasure Raid",
   "First": "Slot Edge",
   "Second": "Magnera",
   "Type": "K",
   "CHANCE": 100
 },
 {
   "Command": "Spark Raid",
   "First": "Freeze Raid",
   "Second": "Magnega",
   "Type": "J",
   "CHANCE": 100
 },
 {
   "Command": "Spark Raid",
   "First": "Treasure Raid",
   "Second": "Magnega",
   "Type": "N",
   "CHANCE": 100
 },
 {
   "Command": "Spark Raid",
   "First": "Thunder Surge",
   "Second": "Dodge Roll",
   "Type": "P",
   "CHANCE": 20
 },
 {
   "Command": "Spark Raid",
   "First": "Thundaga",
   "Second": "Dodge Roll",
   "Type": "L",
   "CHANCE": 20
 },
 {
   "Command": "Spark Raid",
   "First": "Dodge Roll",
   "Second": "Stun Block",
   "Type": "L",
   "CHANCE": 20
 },
 {
   "Command": "Wind Raid",
   "First": "Freeze Raid",
   "Second": "Aeroga",
   "Type": "B",
   "CHANCE": 100
 },
 {
   "Command": "Wind Raid",
   "First": "Treasure Raid",
   "Second": "Aeroga",
   "Type": "F",
   "CHANCE": 100
 },
 {
   "Command": "Fire Surge",
   "First": "Fire Dash",
   "Second": "Ignite",
   "Type": "D",
   "CHANCE": 100
 },
 {
   "Command": "Fire Surge",
   "First": "Fire Strike",
   "Second": "Fira",
   "Type": "A",
   "CHANCE": 100
 },
 {
   "Command": "Fire Surge",
   "First": "Confusion Strike",
   "Second": "Fira",
   "Type": "O",
   "CHANCE": 100
 },
 {
   "Command": "Fire Surge",
   "First": "Binding Strike",
   "Second": "Fira",
   "Type": "K",
   "CHANCE": 100
 },
 {
   "Command": "Barrier Surge",
   "First": "Fire Dash",
   "Second": "Barrier",
   "Type": "D",
   "CHANCE": 100
 },
 {
   "Command": "Barrier Surge",
   "First": "Stun Edge",
   "Second": "Barrier",
   "Type": "K",
   "CHANCE": 100
 },
 {
   "Command": "Thunder Surge",
   "First": "Fire Dash",
   "Second": "Thundara",
   "Type": "D",
   "CHANCE": 100
 },
 {
   "Command": "Thunder Surge",
   "First": "Freeze Raid",
   "Second": "Thundara",
   "Type": "G",
   "CHANCE": 100
 },
 {
   "Command": "Thunder Surge",
   "First": "Stun Edge",
   "Second": "Thundara",
   "Type": "I",
   "CHANCE": 100
 },
 {
   "Command": "Thunder Surge",
   "First": "Confusion Strike",
   "Second": "Thundara",
   "Type": "I",
   "CHANCE": 95
 },
 {
   "Command": "Aerial Slam",
   "First": "Fire Dash",
   "Second": "High Jump",
   "Type": "A",
   "CHANCE": 100
 },
 {
   "Command": "Aerial Slam",
   "First": "Fire Surge",
   "Second": "Aero",
   "Type": "D",
   "CHANCE": 100
 },
 {
   "Command": "Aerial Slam",
   "First": "Fire Strike",
   "Second": "Aerora",
   "Type": "C",
   "CHANCE": 90
 },
 {
   "Command": "Ars Solum",
   "First": "Dark Haze",
   "Second": "Sonic Blade",
   "Type": "B",
   "CHANCE": 20
 },
 {
   "Command": "Ars Solum",
   "First": "Dark Haze",
   "Second": "Stopga",
   "Type": "B",
   "CHANCE": 20
 },
 {
   "Command": "Ars Solum",
   "First": "Sonic Blade",
   "Second": "Stopga",
   "Type": "F",
   "CHANCE": 20
 },
 {
   "Command": "Ars Solum",
   "First": "Sliding Dash",
   "Second": "Thunder",
   "Type": "K",
   "CHANCE": 5
 },
 {
   "Command": "Ars Solum",
   "First": "Strike Raid",
   "Second": "Thunder",
   "Type": "L",
   "CHANCE": 5
 },
 {
   "Command": "Ars Solum",
   "First": "Strike Raid",
   "Second": "Thundara",
   "Type": "K",
   "CHANCE": 5
 },
 {
   "Command": "Ars Solum",
   "First": "Confusion Strike",
   "Second": "Thundara",
   "Type": "I",
   "CHANCE": 5
 },
 {
   "Command": "Ars Arcanum",
   "First": "Blitz",
   "Second": "Aerial Slam",
   "Type": "F",
   "CHANCE": 100
 },
 {
   "Command": "Ars Arcanum",
   "First": "Quick Blitz",
   "Second": "Slot Edge",
   "Type": "O",
   "CHANCE": 10
 },
 {
   "Command": "Ars Arcanum",
   "First": "Fire Strike",
   "Second": "Aerora",
   "Type": "C",
   "CHANCE": 10
 },
 {
   "Command": "Ars Arcanum",
   "First": "Quick Blitz",
   "Second": "Blizzard",
   "Type": "G",
   "CHANCE": 5
 },
 {
   "Command": "Ars Arcanum",
   "First": "Quick Blitz",
   "Second": "Blizzara",
   "Type": "H",
   "CHANCE": 5
 },
 {
   "Command": "Ars Arcanum",
   "First": "Sliding Dash",
   "Second": "Blizzard",
   "Type": "E",
   "CHANCE": 5
 },
 {
   "Command": "Ars Arcanum",
   "First": "Sliding Dash",
   "Second": "Blizzara",
   "Type": "G",
   "CHANCE": 5
 },
 {
   "Command": "Ars Arcanum",
   "First": "Poison Edge",
   "Second": "Cura",
   "Type": "P",
   "CHANCE": 5
 },
 {
   "Command": "Ars Arcanum",
   "First": "Blizzard Edge",
   "Second": "Cura",
   "Type": "G",
   "CHANCE": 5
 },
 {
   "Command": "Time Splicer",
   "First": "Aerial Slam",
   "Second": "Stopga",
   "Type": "F",
   "CHANCE": 100
 },
 {
   "Command": "Time Splicer",
   "First": "Stopga",
   "Second": "Barrier",
   "Type": "C",
   "CHANCE": 20
 },
 {
   "Command": "Time Splicer",
   "First": "Barrier Surge",
   "Second": "Wishing Edge",
   "Type": "P",
   "CHANCE": 10
 },
 {
   "Command": "Time Splicer",
   "First": "Stun Edge",
   "Second": "Slot Edge",
   "Type": "K",
   "CHANCE": 10
 },
 {
   "Command": "Poison Edge",
   "First": "Quick Blitz",
   "Second": "Poison",
   "Type": "O",
   "CHANCE": 95
 },
 {
   "Command": "Poison Edge",
   "First": "Sliding Dash",
   "Second": "Poison",
   "Type": "K",
   "CHANCE": 95
 },
 {
   "Command": "Poison Edge",
   "First": "Strike Raid",
   "Second": "Poison",
   "Type": "D",
   "CHANCE": 95
 },
 {
   "Command": "Wishing Edge",
   "First": "Strike Raid",
   "Second": "Barrier Surge",
   "Type": "O",
   "CHANCE": 100
 },
 {
   "Command": "Wishing Edge",
   "First": "Barrier Surge",
   "Second": "Stun Edge",
   "Type": "K",
   "CHANCE": 100
 },
 {
   "Command": "Wishing Edge",
   "First": "Stun Edge",
   "Second": "Binding Strike",
   "Type": "J",
   "CHANCE": 100
 },
 {
   "Command": "Blizzard Edge",
   "First": "Quick Blitz",
   "Second": "Blizzard",
   "Type": "G",
   "CHANCE": 95
 },
 {
   "Command": "Blizzard Edge",
   "First": "Quick Blitz",
   "Second": "Blizzara",
   "Type": "H",
   "CHANCE": 95
 },
 {
   "Command": "Blizzard Edge",
   "First": "Sliding Dash",
   "Second": "Blizzard",
   "Type": "E",
   "CHANCE": 95
 },
 {
   "Command": "Blizzard Edge",
   "First": "Sliding Dash",
   "Second": "Blizzara",
   "Type": "G",
   "CHANCE": 95
 },
 {
   "Command": "Stun Edge",
   "First": "Sliding Dash",
   "Second": "Thunder",
   "Type": "K",
   "CHANCE": 95
 },
 {
   "Command": "Stun Edge",
   "First": "Strike Raid",
   "Second": "Thunder",
   "Type": "L",
   "CHANCE": 95
 },
 {
   "Command": "Stun Edge",
   "First": "Strike Raid",
   "Second": "Thundara",
   "Type": "K",
   "CHANCE": 95
 },
 {
   "Command": "Slot Edge",
   "First": "Wishing Edge",
   "Second": "Cure",
   "Type": "O",
   "CHANCE": 100
 },
 {
   "Command": "Slot Edge",
   "First": "Poison Edge",
   "Second": "Cura",
   "Type": "P",
   "CHANCE": 95
 },
 {
   "Command": "Slot Edge",
   "First": "Blizzard Edge",
   "Second": "Cura",
   "Type": "G",
   "CHANCE": 95
 },
 {
   "Command": "Slot Edge",
   "First": "Curaga",
   "Second": "Renewal Block",
   "Type": "N",
   "CHANCE": 90
 },
 {
   "Command": "Slot Edge",
   "First": "Curaga",
   "Second": "Focus Block",
   "Type": "P",
   "CHANCE": 90
 },
 {
   "Command": "Slot Edge",
   "First": "Curaga",
   "Second": "Renewal Barrier",
   "Type": "N",
   "CHANCE": 90
 },
 {
   "Command": "Slot Edge",
   "First": "Curaga",
   "Second": "Focus Barrier",
   "Type": "P",
   "CHANCE": 90
 },
 {
   "Command": "Fire Strike",
   "First": "Poison Edge",
   "Second": "Fira",
   "Type": "D",
   "CHANCE": 100
 },
 {
   "Command": "Fire Strike",
   "First": "Wishing Edge",
   "Second": "Ignite",
   "Type": "A",
   "CHANCE": 100
 },
 {
   "Command": "Fire Strike",
   "First": "Stun Edge",
   "Second": "Fire",
   "Type": "K",
   "CHANCE": 100
 },
 {
   "Command": "Confusion Strike",
   "First": "Quick Blitz",
   "Second": "Confuse",
   "Type": "O",
   "CHANCE": 100
 },
 {
   "Command": "Confusion Strike",
   "First": "Sliding Dash",
   "Second": "Zero Gravity",
   "Type": "K",
   "CHANCE": 100
 },
 {
   "Command": "Confusion Strike",
   "First": "Strike Raid",
   "Second": "Confuse",
   "Type": "G",
   "CHANCE": 100
 },
 {
   "Command": "Binding Strike",
   "First": "Quick Blitz",
   "Second": "Bind",
   "Type": "K",
   "CHANCE": 100
 },
 {
   "Command": "Binding Strike",
   "First": "Strike Raid",
   "Second": "Bind",
   "Type": "O",
   "CHANCE": 100
 },
 {
   "Command": "Binding Strike",
   "First": "Stun Edge",
   "Second": "Zero Gravity",
   "Type": "I",
   "CHANCE": 100
 },
 {
   "Command": "Brutal Blast",
   "First": "Stun Edge",
   "Second": "Mine Shield",
   "Type": "O",
   "CHANCE": 70
 },
 {
   "Command": "Brutal Blast",
   "First": "Binding Strike",
   "Second": "Mine Square",
   "Type": "L",
   "CHANCE": 70
 },
 {
   "Command": "Tornado Strike",
   "First": "Confusion Strike",
   "Second": "Aeroga",
   "Type": "G",
   "CHANCE": 100
 },
 {
   "Command": "Tornado Strike",
   "First": "Binding Strike",
   "Second": "Aeroga",
   "Type": "F",
   "CHANCE": 100
 },
 {
   "Command": "Magnet Spiral",
   "First": "Binding Strike",
   "Second": "Collision Magnet",
   "Type": "K",
   "CHANCE": 100
 },
 {
   "Command": "Magnet Spiral",
   "First": "Binding Strike",
   "Second": "Magnega",
   "Type": "J",
   "CHANCE": 100
 },
 {
   "Command": "Magnet Spiral",
   "First": "Quick Blitz",
   "Second": "Magnera",
   "Type": "K",
   "CHANCE": 20
 },
 {
   "Command": "Magnet Spiral",
   "First": "Stun Edge",
   "Second": "Magnera",
   "Type": "L",
   "CHANCE": 20
 },
 {
   "Command": "Magnet Spiral",
   "First": "Zero Gravira",
   "Second": "Magnet",
   "Type": "I",
   "CHANCE": 20
 },
 {
   "Command": "Windcutter",
   "First": "Binding Strike",
   "Second": "Aeroga",
   "Type": "F",
   "CHANCE": 100
 },
 {
   "Command": "Windcutter",
   "First": "Confusion Strike",
   "Second": "Aeroga",
   "Type": "G",
   "CHANCE": 100
 },
 {
   "Command": "Limit Storm",
   "First": "Brutal Blast",
   "Second": "Confusion Strike",
   "Type": "G",
   "CHANCE": 100
 },
 {
   "Command": "Limit Storm",
   "First": "Brutal Blast",
   "Second": "Binding Strike",
   "Type": "D",
   "CHANCE": 100
 },
 {
   "Command": "Salvation",
   "First": "Wind Raid",
   "Second": "Curaga",
   "Type": "N",
   "CHANCE": 100
 },
 {
   "Command": "Collision Magnet",
   "First": "Quick Blitz",
   "Second": "Magnera",
   "Type": "K",
   "CHANCE": 80
 },
 {
   "Command": "Collision Magnet",
   "First": "Stun Edge",
   "Second": "Magnera",
   "Type": "L",
   "CHANCE": 80
 },
 {
   "Command": "Collision Magnet",
   "First": "Zero Gravira",
   "Second": "Magnet",
   "Type": "I",
   "CHANCE": 80
 },
 {
   "Command": "Geo Impact",
   "First": "Brutal Blast",
   "Second": "Brutal Blast",
   "Type": "N",
   "CHANCE": 70
 },
 {
   "Command": "Sacrifice",
   "First": "Dark Haze",
   "Second": "Warp",
   "Type": "B",
   "CHANCE": 100
 },
 {
   "Command": "Sacrifice",
   "First": "Poison Edge",
   "Second": "Warp",
   "Type": "D",
   "CHANCE": 100
 },
 {
   "Command": "Break Time",
   "First": "Curaga",
   "Second": "Renewal Block",
   "Type": "N",
   "CHANCE": 10
 },
 {
   "Command": "Break Time",
   "First": "Curaga",
   "Second": "Renewal Barrier",
   "Type": "N",
   "CHANCE": 10
 },
 {
   "Command": "Break Time",
   "First": "Curaga",
   "Second": "Focus Block",
   "Type": "P",
   "CHANCE": 10
 },
 {
   "Command": "Break Time",
   "First": "Curaga",
   "Second": "Focus Barrier",
   "Type": "P",
   "CHANCE": 10
 },
 {
   "Command": "Fira",
   "First": "Fire Dash",
   "Second": "Fire",
   "Type": "D",
   "CHANCE": 100
 },
 {
   "Command": "Fira",
   "First": "Fire Strike",
   "Second": "Fire",
   "Type": "D",
   "CHANCE": 100
 },
 {
   "Command": "Fira",
   "First": "Fire",
   "Second": "Fire",
   "Type": "A",
   "CHANCE": 100
 },
 {
   "Command": "Fira",
   "First": "Fire",
   "Second": "Ignite",
   "Type": "C",
   "CHANCE": 100
 },
 {
   "Command": "Firaga",
   "First": "Fire Dash",
   "Second": "Fira",
   "Type": "D",
   "CHANCE": 90
 },
 {
   "Command": "Firaga",
   "First": "Fire",
   "Second": "Fira",
   "Type": "A",
   "CHANCE": 90
 },
 {
   "Command": "Firaga",
   "First": "Fira",
   "Second": "Fira",
   "Type": "B",
   "CHANCE": 90
 },
 {
   "Command": "Dark Firaga",
   "First": "Dark Haze",
   "Second": "Firaga",
   "Type": "D",
   "CHANCE": 100
 },
 {
   "Command": "Dark Firaga",
   "First": "Firaga",
   "Second": "Blackout",
   "Type": "B",
   "CHANCE": 100
 },
 {
   "Command": "Fission Firaga",
   "First": "Fira",
   "Second": "Aeroga",
   "Type": "A",
   "CHANCE": 80
 },
 {
   "Command": "Fission Firaga",
   "First": "Firaga",
   "Second": "Aerora",
   "Type": "A",
   "CHANCE": 80
 },
 {
   "Command": "Fission Firaga",
   "First": "Firaga",
   "Second": "Aeroga",
   "Type": "B",
   "CHANCE": 80
 },
 {
   "Command": "Triple Firaga",
   "First": "Fira",
   "Second": "Firaga",
   "Type": "A",
   "CHANCE": 95
 },
 {
   "Command": "Triple Firaga",
   "First": "Blitz",
   "Second": "Firaga",
   "Type": "D",
   "CHANCE": 90
 },
 {
   "Command": "Triple Firaga",
   "First": "Firaga",
   "Second": "Firaga",
   "Type": "B",
   "CHANCE": 90
 },
 {
   "Command": "Crawling Fire",
   "First": "Firaga",
   "Second": "Slow",
   "Type": "A",
   "CHANCE": 80
 },
 {
   "Command": "Crawling Fire",
   "First": "Firaga",
   "Second": "Stopra",
   "Type": "D",
   "CHANCE": 80
 },
 {
   "Command": "Crawling Fire",
   "First": "Firaga",
   "Second": "Stopga",
   "Type": "B",
   "CHANCE": 80
 },
 {
   "Command": "Blizzara",
   "First": "Strike Raid",
   "Second": "Blizzard",
   "Type": "G",
   "CHANCE": 100
 },
 {
   "Command": "Blizzara",
   "First": "Blizzard Edge",
   "Second": "Blizzard",
   "Type": "G",
   "CHANCE": 100
 },
 {
   "Command": "Blizzara",
   "First": "Blizzard",
   "Second": "Blizzard",
   "Type": "E",
   "CHANCE": 100
 },
 {
   "Command": "Blizzara",
   "First": "Blizzard",
   "Second": "Aero",
   "Type": "H",
   "CHANCE": 100
 },
 {
   "Command": "Blizzaga",
   "First": "Blizzard Edge",
   "Second": "Blizzara",
   "Type": "G",
   "CHANCE": 100
 },
 {
   "Command": "Blizzaga",
   "First": "Blizzard",
   "Second": "Blizzara",
   "Type": "E",
   "CHANCE": 100
 },
 {
   "Command": "Blizzaga",
   "First": "Blizzara",
   "Second": "Blizzara",
   "Type": "F",
   "CHANCE": 100
 },
 {
   "Command": "Triple Blizzaga",
   "First": "Blitz",
   "Second": "Blizzaga",
   "Type": "G",
   "CHANCE": 100
 },
 {
   "Command": "Triple Blizzaga",
   "First": "Blizzara",
   "Second": "Blizzaga",
   "Type": "E",
   "CHANCE": 100
 },
 {
   "Command": "Triple Blizzaga",
   "First": "Blizzaga",
   "Second": "Blizzaga",
   "Type": "F",
   "CHANCE": 100
 },
 {
   "Command": "Thundara",
   "First": "Stun Edge",
   "Second": "Thunder",
   "Type": "K",
   "CHANCE": 100
 },
 {
   "Command": "Thundara",
   "First": "Thunder",
   "Second": "Thunder",
   "Type": "I",
   "CHANCE": 100
 },
 {
   "Command": "Thundara",
   "First": "Zero Gravity",
   "Second": "Magnet",
   "Type": "L",
   "CHANCE": 100
 },
 {
   "Command": "Thundaga",
   "First": "Binding Strike",
   "Second": "Thundara",
   "Type": "K",
   "CHANCE": 90
 },
 {
   "Command": "Thundaga",
   "First": "Thunder",
   "Second": "Thundara",
   "Type": "I",
   "CHANCE": 90
 },
 {
   "Command": "Thundaga",
   "First": "Thundara",
   "Second": "Thundara",
   "Type": "J",
   "CHANCE": 90
 },
 {
   "Command": "Thundaga Shot",
   "First": "Strike Raid",
   "Second": "Thundaga",
   "Type": "I",
   "CHANCE": 85
 },
 {
   "Command": "Thundaga Shot",
   "First": "Freeze Raid",
   "Second": "Thundaga",
   "Type": "E",
   "CHANCE": 85
 },
 {
   "Command": "Thundaga Shot",
   "First": "Firaga",
   "Second": "Thundaga",
   "Type": "A",
   "CHANCE": 85
 },
 {
   "Command": "Cura",
   "First": "Thunder",
   "Second": "Cure",
   "Type": "I",
   "CHANCE": 100
 },
 {
   "Command": "Cura",
   "First": "Cure",
   "Second": "Cure",
   "Type": "M",
   "CHANCE": 100
 },
 {
   "Command": "Cura",
   "First": "Cure",
   "Second": "Aero",
   "Type": "O",
   "CHANCE": 100
 },
 {
   "Command": "Curaga",
   "First": "Cure",
   "Second": "Cura",
   "Type": "M",
   "CHANCE": 100
 },
 {
   "Command": "Curaga",
   "First": "Cura",
   "Second": "Cura",
   "Type": "N",
   "CHANCE": 100
 },
 {
   "Command": "Mine Shield",
   "First": "Fira",
   "Second": "Zero Gravity",
   "Type": "A",
   "CHANCE": 100
 },
 {
   "Command": "Mine Shield",
   "First": "Fira",
   "Second": "Block",
   "Type": "C",
   "CHANCE": 100
 },
 {
   "Command": "Mine Shield",
   "First": "Ignite",
   "Second": "Stop",
   "Type": "D",
   "CHANCE": 100
 },
 {
   "Command": "Mine Shield",
   "First": "Stopra",
   "Second": "Block",
   "Type": "M",
   "CHANCE": 100
 },
 {
   "Command": "Mine Square",
   "First": "Fira",
   "Second": "Stop",
   "Type": "A",
   "CHANCE": 100
 },
 {
   "Command": "Mine Square",
   "First": "Fira",
   "Second": "Barrier",
   "Type": "C",
   "CHANCE": 100
 },
 {
   "Command": "Mine Square",
   "First": "Aerora",
   "Second": "Ignite",
   "Type": "D",
   "CHANCE": 100
 },
 {
   "Command": "Mine Square",
   "First": "Stopra",
   "Second": "Barrier",
   "Type": "M",
   "CHANCE": 100
 },
 {
   "Command": "Seeker Mine",
   "First": "Mine Shield",
   "Second": "Mine Square",
   "Type": "B",
   "CHANCE": 100
 },
 {
   "Command": "Seeker Mine",
   "First": "Mine Shield",
   "Second": "Magnega",
   "Type": "C",
   "CHANCE": 100
 },
 {
   "Command": "Seeker Mine",
   "First": "Mine Square",
   "Second": "Magnega",
   "Type": "D",
   "CHANCE": 100
 },
 {
   "Command": "Zero Gravira",
   "First": "Thunder",
   "Second": "Zero Gravity",
   "Type": "I",
   "CHANCE": 90
 },
 {
   "Command": "Zero Gravira",
   "First": "Zero Gravity",
   "Second": "Zero Gravity",
   "Type": "M",
   "CHANCE": 90
 },
 {
   "Command": "Zero Gravira",
   "First": "Magnet",
   "Second": "Aero",
   "Type": "P",
   "CHANCE": 90
 },
 {
   "Command": "Zero Graviga",
   "First": "Thundara",
   "Second": "Zero Gravira",
   "Type": "I",
   "CHANCE": 80
 },
 {
   "Command": "Zero Graviga",
   "First": "Zero Gravity",
   "Second": "Zero Gravira",
   "Type": "M",
   "CHANCE": 80
 },
 {
   "Command": "Zero Graviga",
   "First": "Zero Gravira",
   "Second": "Zero Gravira",
   "Type": "N",
   "CHANCE": 80
 },
 {
   "Command": "Magnera",
   "First": "Stun Edge",
   "Second": "Magnet",
   "Type": "K",
   "CHANCE": 100
 },
 {
   "Command": "Magnera",
   "First": "Thunder",
   "Second": "Magnet",
   "Type": "I",
   "CHANCE": 100
 },
 {
   "Command": "Magnera",
   "First": "Magnet",
   "Second": "Magnet",
   "Type": "M",
   "CHANCE": 100
 },
 {
   "Command": "Magnega",
   "First": "Magnet",
   "Second": "Magnera",
   "Type": "I",
   "CHANCE": 100
 },
 {
   "Command": "Magnega",
   "First": "Magnera",
   "Second": "Magnera",
   "Type": "J",
   "CHANCE": 100
 },
 {
   "Command": "Munny Magnet",
   "First": "Wishing Edge",
   "Second": "Magnera",
   "Type": "K",
   "CHANCE": 100
 },
 {
   "Command": "Munny Magnet",
   "First": "Thundara",
   "Second": "Magnera",
   "Type": "I",
   "CHANCE": 100
 },
 {
   "Command": "Energy Magnet",
   "First": "Cure",
   "Second": "Magnera",
   "Type": "M",
   "CHANCE": 100
 },
 {
   "Command": "Energy Magnet",
   "First": "Cura",
   "Second": "Magnera",
   "Type": "N",
   "CHANCE": 100
 },
 {
   "Command": "D-Link Magnet",
   "First": "Zero Gravira",
   "Second": "Magnera",
   "Type": "L",
   "CHANCE": 100
 },
 {
   "Command": "D-Link Magnet",
   "First": "Magnera",
   "Second": "Stopra",
   "Type": "I",
   "CHANCE": 100
 },
 {
   "Command": "Aerora",
   "First": "Quick Blitz",
   "Second": "Aero",
   "Type": "G",
   "CHANCE": 95
 },
 {
   "Command": "Aerora",
   "First": "Thunder",
   "Second": "Aero",
   "Type": "I",
   "CHANCE": 95
 },
 {
   "Command": "Aerora",
   "First": "Aero",
   "Second": "Aero",
   "Type": "E",
   "CHANCE": 95
 },
 {
   "Command": "Aeroga",
   "First": "Quick Blitz",
   "Second": "Aerora",
   "Type": "O",
   "CHANCE": 90
 },
 {
   "Command": "Aeroga",
   "First": "Aero",
   "Second": "Aerora",
   "Type": "M",
   "CHANCE": 90
 },
 {
   "Command": "Aeroga",
   "First": "Aerora",
   "Second": "Aerora",
   "Type": "N",
   "CHANCE": 90
 },
 {
   "Command": "Warp",
   "First": "Thundara",
   "Second": "Zero Gravira",
   "Type": "I",
   "CHANCE": 20
 },
 {
   "Command": "Warp",
   "First": "Zero Gravity",
   "Second": "Zero Gravira",
   "Type": "M",
   "CHANCE": 20
 },
 {
   "Command": "Warp",
   "First": "Zero Gravira",
   "Second": "Zero Gravira",
   "Type": "N",
   "CHANCE": 20
 },
 {
   "Command": "Warp",
   "First": "Thunder",
   "Second": "Zero Gravity",
   "Type": "I",
   "CHANCE": 10
 },
 {
   "Command": "Warp",
   "First": "Magnet",
   "Second": "Aero",
   "Type": "P",
   "CHANCE": 10
 },
 {
   "Command": "Warp",
   "First": "Zero Gravity",
   "Second": "Zero Gravity",
   "Type": "M",
   "CHANCE": 10
 },
 {
   "Command": "Faith",
   "First": "Wind Raid",
   "Second": "Break Time",
   "Type": "N",
   "CHANCE": 100
 },
 {
   "Command": "Deep Freeze",
   "First": "Freeze Raid",
   "Second": "Blizzaga",
   "Type": "G",
   "CHANCE": 100
 },
 {
   "Command": "Deep Freeze",
   "First": "Binding Strike",
   "Second": "Blizzaga",
   "Type": "H",
   "CHANCE": 100
 },
 {
   "Command": "Deep Freeze",
   "First": "Blizzaga",
   "Second": "Triple Blizzaga",
   "Type": "F",
   "CHANCE": 100
 },
 {
   "Command": "Glacier",
   "First": "Blizzaga",
   "Second": "Deep Freeze",
   "Type": "E",
   "CHANCE": 100
 },
 {
   "Command": "Glacier",
   "First": "Triple Blizzaga",
   "Second": "Deep Freeze",
   "Type": "F",
   "CHANCE": 100
 },
 {
   "Command": "Ice Barrage",
   "First": "Blizzaga",
   "Second": "Mine Shield",
   "Type": "F",
   "CHANCE": 100
 },
 {
   "Command": "Ice Barrage",
   "First": "Blizzaga",
   "Second": "Mine Square",
   "Type": "H",
   "CHANCE": 100
 },
 {
   "Command": "Firaga Burst",
   "First": "Fira",
   "Second": "Aeroga",
   "Type": "A",
   "CHANCE": 20
 },
 {
   "Command": "Firaga Burst",
   "First": "Firaga",
   "Second": "Aerora",
   "Type": "A",
   "CHANCE": 20
 },
 {
   "Command": "Firaga Burst",
   "First": "Firaga",
   "Second": "Aeroga",
   "Type": "B",
   "CHANCE": 20
 },
 {
   "Command": "Firaga Burst",
   "First": "Firaga",
   "Second": "Slow",
   "Type": "A",
   "CHANCE": 20
 },
 {
   "Command": "Firaga Burst",
   "First": "Firaga",
   "Second": "Stopra",
   "Type": "D",
   "CHANCE": 20
 },
 {
   "Command": "Firaga Burst",
   "First": "Firaga",
   "Second": "Stopga",
   "Type": "B",
   "CHANCE": 20
 },
 {
   "Command": "Raging Storm",
   "First": "Fission Firaga",
   "Second": "Firaga Burst",
   "Type": "B",
   "CHANCE": 100
 },
 {
   "Command": "Raging Storm",
   "First": "Blitz",
   "Second": "Firaga",
   "Type": "D",
   "CHANCE": 10
 },
 {
   "Command": "Raging Storm",
   "First": "Fire Dash",
   "Second": "Fira",
   "Type": "D",
   "CHANCE": 10
 },
 {
   "Command": "Raging Storm",
   "First": "Fire Surge",
   "Second": "Cartwheel",
   "Type": "C",
   "CHANCE": 10
 },
 {
   "Command": "Raging Storm",
   "First": "Fire",
   "Second": "Fira",
   "Type": "A",
   "CHANCE": 10
 },
 {
   "Command": "Raging Storm",
   "First": "Fira",
   "Second": "Fira",
   "Type": "B",
   "CHANCE": 10
 },
 {
   "Command": "Raging Storm",
   "First": "Fira",
   "Second": "Firaga",
   "Type": "A",
   "CHANCE": 10
 },
 {
   "Command": "Raging Storm",
   "First": "Firaga",
   "Second": "Firaga",
   "Type": "B",
   "CHANCE": 10
 },
 {
   "Command": "Mega Flare",
   "First": "Fission Firaga",
   "Second": "Crawling Fire",
   "Type": "B",
   "CHANCE": 100
 },
 {
   "Command": "Quake",
   "First": "Brutal Blast",
   "Second": "Zero Graviga",
   "Type": "B",
   "CHANCE": 90
 },
 {
   "Command": "Quake",
   "First": "Brutal Blast",
   "Second": "Magnega",
   "Type": "C",
   "CHANCE": 90
 },
 {
   "Command": "Quake",
   "First": "Stun Edge",
   "Second": "Mine Shield",
   "Type": "O",
   "CHANCE": 30
 },
 {
   "Command": "Quake",
   "First": "Binding Strike",
   "Second": "Mine Square",
   "Type": "L",
   "CHANCE": 30
 },
 {
   "Command": "Quake",
   "First": "Brutal Blast",
   "Second": "Brutal Blast",
   "Type": "N",
   "CHANCE": 30
 },
 {
   "Command": "Meteor",
   "First": "Geo Impact",
   "Second": "Quake",
   "Type": "B",
   "CHANCE": 100
 },
 {
   "Command": "Meteor",
   "First": "Brutal Blast",
   "Second": "Zero Graviga",
   "Type": "B",
   "CHANCE": 10
 },
 {
   "Command": "Meteor",
   "First": "Brutal Blast",
   "Second": "Magnega",
   "Type": "C",
   "CHANCE": 10
 },
 {
   "Command": "Tornado",
   "First": "Magnega",
   "Second": "Aeroga",
   "Type": "N",
   "CHANCE": 100
 },
 {
   "Command": "Tornado",
   "First": "Quick Blitz",
   "Second": "Aerora",
   "Type": "O",
   "CHANCE": 10
 },
 {
   "Command": "Tornado",
   "First": "Aero",
   "Second": "Aerora",
   "Type": "M",
   "CHANCE": 10
 },
 {
   "Command": "Tornado",
   "First": "Aerora",
   "Second": "Aerora",
   "Type": "N",
   "CHANCE": 10
 },
 {
   "Command": "Tornado",
   "First": "Quick Blitz",
   "Second": "Aero",
   "Type": "G",
   "CHANCE": 5
 },
 {
   "Command": "Tornado",
   "First": "Thunder",
   "Second": "Aero",
   "Type": "I",
   "CHANCE": 5
 },
 {
   "Command": "Tornado",
   "First": "Aero",
   "Second": "Aero",
   "Type": "E",
   "CHANCE": 5
 },
 {
   "Command": "Transcendence",
   "First": "Magnet Spiral",
   "Second": "Zero Graviga",
   "Type": "J",
   "CHANCE": 100
 },
 {
   "Command": "Mini",
   "First": "Magnera",
   "Second": "Warp",
   "Type": "N",
   "CHANCE": 100
 },
 {
   "Command": "Mini",
   "First": "Magnega",
   "Second": "Magnega",
   "Type": "J",
   "CHANCE": 100
 },
 {
   "Command": "Mini",
   "First": "Magnega",
   "Second": "Bind",
   "Type": "I",
   "CHANCE": 100
 },
 {
   "Command": "Blackout",
   "First": "Zero Gravity",
   "Second": "Confuse",
   "Type": "M",
   "CHANCE": 100
 },
 {
   "Command": "Blackout",
   "First": "Zero Gravira",
   "Second": "Confuse",
   "Type": "N",
   "CHANCE": 100
 },
 {
   "Command": "Blackout",
   "First": "Zero Gravira",
   "Second": "Poison",
   "Type": "P",
   "CHANCE": 100
 },
 {
   "Command": "Ignite",
   "First": "Fire",
   "Second": "Bind",
   "Type": "A",
   "CHANCE": 100
 },
 {
   "Command": "Ignite",
   "First": "Fira",
   "Second": "Bind",
   "Type": "C",
   "CHANCE": 100
 },
 {
   "Command": "Stopra",
   "First": "Slow",
   "Second": "Slow",
   "Type": "L",
   "CHANCE": 100
 },
 {
   "Command": "Stopra",
   "First": "Slow",
   "Second": "Stop",
   "Type": "K",
   "CHANCE": 100
 },
 {
   "Command": "Stopra",
   "First": "Stop",
   "Second": "Stop",
   "Type": "I",
   "CHANCE": 100
 },
 {
   "Command": "Stopga",
   "First": "Stop",
   "Second": "Stopra",
   "Type": "I",
   "CHANCE": 100
 },
 {
   "Command": "Stopga",
   "First": "Stopra",
   "Second": "Stopra",
   "Type": "J",
   "CHANCE": 100
 },
 {
   "Command": "Homing Slide",
   "First": "Sliding Dash",
   "Second": "Magnera",
   "Type": "P",
   "CHANCE": 100
 },
 {
   "Command": "Homing Slide",
   "First": "Sliding Dash",
   "Second": "Air Slide",
   "Type": "C",
   "CHANCE": 100
 },
 {
   "Command": "Homing Slide",
   "First": "Magnet",
   "Second": "Air Slide",
   "Type": "L",
   "CHANCE": 100
 },
 {
   "Command": "Thunder Roll",
   "First": "Thunder Surge",
   "Second": "Dodge Roll",
   "Type": "P",
   "CHANCE": 80
 },
 {
   "Command": "Thunder Roll",
   "First": "Thundaga",
   "Second": "Dodge Roll",
   "Type": "L",
   "CHANCE": 80
 },
 {
   "Command": "Thunder Roll",
   "First": "Stun Block",
   "Second": "Dodge Roll",
   "Type": "L",
   "CHANCE": 80
 },
 {
   "Command": "Firewheel",
   "First": "Firaga",
   "Second": "Cartwheel",
   "Type": "B",
   "CHANCE": 100
 },
 {
   "Command": "Firewheel",
   "First": "Fission Firaga",
   "Second": "Cartwheel",
   "Type": "B",
   "CHANCE": 100
 },
 {
   "Command": "Firewheel",
   "First": "Fire Surge",
   "Second": "Cartwheel",
   "Type": "C",
   "CHANCE": 90
 },
 {
   "Command": "Ice Slide",
   "First": "Blizzard Edge",
   "Second": "Air Slide",
   "Type": "F",
   "CHANCE": 100
 },
 {
   "Command": "Ice Slide",
   "First": "Blizzaga",
   "Second": "Air Slide",
   "Type": "H",
   "CHANCE": 100
 },
 {
   "Command": "Fire Glide",
   "First": "Fire Surge",
   "Second": "Glide",
   "Type": "C",
   "CHANCE": 100
 },
 {
   "Command": "Fire Glide",
   "First": "Firaga",
   "Second": "Glide",
   "Type": "B",
   "CHANCE": 100
 },
 {
   "Command": "Renewal Block",
   "First": "Curaga",
   "Second": "Block",
   "Type": "P",
   "CHANCE": 100
 },
 {
   "Command": "Renewal Block",
   "First": "Esuna",
   "Second": "Block",
   "Type": "C",
   "CHANCE": 100
 },
 {
   "Command": "Stun Block",
   "First": "Stun Edge",
   "Second": "Block",
   "Type": "L",
   "CHANCE": 100
 },
 {
   "Command": "Stun Block",
   "First": "Thundaga",
   "Second": "Block",
   "Type": "I",
   "CHANCE": 100
 },
 {
   "Command": "Poison Block",
   "First": "Poison Edge",
   "Second": "Block",
   "Type": "H",
   "CHANCE": 80
 },
 {
   "Command": "Poison Block",
   "First": "Poison",
   "Second": "Block",
   "Type": "P",
   "CHANCE": 80
 },
 {
   "Command": "Renewal Barrier",
   "First": "Curaga",
   "Second": "Barrier",
   "Type": "P",
   "CHANCE": 100
 },
 {
   "Command": "Renewal Barrier",
   "First": "Esuna",
   "Second": "Barrier",
   "Type": "N",
   "CHANCE": 100
 },
 {
   "Command": "Confuse Barrier",
   "First": "Confusion Strike",
   "Second": "Barrier",
   "Type": "C",
   "CHANCE": 100
 },
 {
   "Command": "Confuse Barrier",
   "First": "Confuse",
   "Second": "Barrier",
   "Type": "L",
   "CHANCE": 100
 },
 {
   "Command": "Stop Barrier",
   "First": "Stopga",
   "Second": "Barrier",
   "Type": "C",
   "CHANCE": 80
 },
 {
   "Command": "Payback Fang",
   "First": "Sliding Dash",
   "Second": "Counter Hammer",
   "Type": "P",
   "CHANCE": 100
 },
 {
   "Command": "Payback Raid",
   "First": "Sliding Dash",
   "Second": "Strike Raid",
   "Type": "P",
   "CHANCE": 100
 },
 {
   "Command": "Payback Surge",
   "First": "Sliding Dash",
   "Second": "Fire Surge",
   "Type": "C",
   "CHANCE": 100
 },
 {
   "Command": "Payback Surge",
   "First": "Sliding Dash",
   "Second": "Thunder Surge",
   "Type": "L",
   "CHANCE": 100
 },
 {
   "Command": "Lightning Ray",
   "First": "Blitz",
   "Second": "Dark Haze",
   "Type": "-",
   "CHANCE": 10
 },
 {
   "Command": "Lightning Ray",
   "First": "Blitz",
   "Second": "Air Slide",
   "Type": "-",
   "CHANCE": 10
 },
 {
   "Command": "Lightning Ray",
   "First": "Fire Dash",
   "Second": "Thunder Surge",
   "Type": "-",
   "CHANCE": 10
 },
 {
   "Command": "Lightning Ray",
   "First": "Binding Strike",
   "Second": "Thundara",
   "Type": "-",
   "CHANCE": 10
 },
 {
   "Command": "Lightning Ray",
   "First": "Thunder",
   "Second": "Thundara",
   "Type": "-",
   "CHANCE": 10
 },
 {
   "Command": "Lightning Ray",
   "First": "Thundara",
   "Second": "Thundara",
   "Type": "-",
   "CHANCE": 10
 },
 {
   "Command": "Lightning Ray",
   "First": "Aeroga",
   "Second": "Barrier Surge",
   "Type": "-",
   "CHANCE": 10
 },
 {
   "Command": "Meteor Shower",
   "First": "Strike Raid",
   "Second": "Thundaga",
   "Type": "-",
   "CHANCE": 15
 },
 {
   "Command": "Meteor Shower",
   "First": "Freeze Raid",
   "Second": "Thundaga",
   "Type": "-",
   "CHANCE": 15
 },
 {
   "Command": "Meteor Shower",
   "First": "Firaga",
   "Second": "Thundaga",
   "Type": "-",
   "CHANCE": 15
 },
 {
   "Command": "Meteor Shower",
   "First": "Blitz",
   "Second": "Zero Graviga",
   "Type": "-",
   "CHANCE": 10
 },
 {
   "Command": "Bio Barrage",
   "First": "Poison Edge",
   "Second": "Block",
   "Type": "-",
   "CHANCE": 20
 },
 {
   "Command": "Bio Barrage",
   "First": "Poison",
   "Second": "Block",
   "Type": "-",
   "CHANCE": 20
 },
 {
   "Command": "Bio Barrage",
   "First": "Quick Blitz",
   "Second": "Poison",
   "Type": "-",
   "CHANCE": 5
 },
 {
   "Command": "Bio Barrage",
   "First": "Sliding Dash",
   "Second": "Poison",
   "Type": "-",
   "CHANCE": 5
 },
 {
   "Command": "Bio Barrage",
   "First": "Strike Raid",
   "Second": "Poison",
   "Type": "-",
   "CHANCE": 5
 }
];
