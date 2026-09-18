#!/usr/bin/env python3
"""Deterministically build KH1FM collectibles from an audited factual source snapshot.
No network is needed. Update the snapshot/route overrides deliberately, retaining IDs.
"""
from pathlib import Path
import json,re,collections
ROOT=Path(__file__).resolve().parents[2]
SOURCE=json.loads((Path(__file__).with_suffix('.sources.json')).read_text())
WORLDS=['Destiny Islands','Traverse Town','Wonderland','Olympus Coliseum','Deep Jungle','Agrabah','Monstro','Atlantica','Halloween Town','Neverland','100 Acre Wood','Hollow Bastion','End of the World']
DATE=SOURCE['checkedAt']; RAW=SOURCE['worldTables']; E=[]; MAPPING={}; OMIT=[]
def slug(s):return re.sub('[^a-z0-9]+','-',s.lower().replace("'",'')).strip('-')
def url(w):return 'https://www.khwiki.com/Game:'+w.replace(' ','_')
def src(w):return {'label':'KHWiki: '+w+' — KH1 Final Mix tables','url':url(w),'checkedAt':DATE}
def link(label,u):return {'label':label,'url':u,'checkedAt':DATE}
def entry(id,category,name,world,area,summary,instructions,**kw):
 d=dict(id='kh1fm-'+id,game='kh1fm',category=category,name=name,world=world,area=area,summary=summary,instructions=instructions,prerequisites='Reach this area; clear nearby enemies before opening a container.',missability='Revisitable after the relevant access requirements are met.',reward=name,tags=['final-mix','modern-release'],relatedIds=[],sources=[src(world)],verification='source-backed',checkable=True,collectible=True,count=1,order=len(E),facts={'ruleset':'KH1 Final Mix / HD 1.5 + 2.5 ReMIX','evidenceKind':'community-source','countingUnit':'acquisition','sourceCheckedAt':DATE})
 d.update(kw);E.append(d);return d
# World access guidance supplies navigation context, never story-checklist progress.
WORLD_GUIDES={
'Destiny Islands':"The playable island visit ends when the storm begins. On day two, pass through the door beside Kairi to the Cove. Check the tower alcove before turning in the final supplies. Raft materials, provisions and the Empty Bottle are temporary story objects, so they are not world-collection checks. The two Kairi supply bonuses are distinct opportunities; their item varies with hints.",
'Traverse Town':"First District connects the shops and world exit; the door behind the Accessory Shop leads to Second District. Second District contains the hotel, Dalmatians' House and Gizmo Shop. The upper Gizmo route crosses the roofs to a Third District balcony. Cast Fire on the flame-marked Third District door, cross the moving stones and circle Merlin's house to its entrance. Red Trinity opens the Alleyway sewer route; Green Trinity in the Accessory Shop lowers the Item Workshop ladder. Geppetto's House opens after Monstro. Revisit Pongo and Perdita to claim rescued-puppy milestones.",
'Wonderland':"Use the Bizarre Room drink to change size. As a giant, push the bed aside; as small Sora, its opening leads to the Queen's Castle. Lotus Forest has elevated doors into different Bizarre Room orientations, and exits onto the castle hedges and Tea Party Garden. Light the two lamps beside the sideways room's painting to activate its route into the isolated Lotus Forest. Thunder on the hanging bell flowers there reveals puppies 58–60. Green/White Trinities and Glide rewards need a later return. Rabbit Hole battle rewards change at the trial and Kairi rescue; collect each phase before advancing.",
'Olympus Coliseum':"The Gates lead to the Lobby and tournament registration with Phil. Check behind the exterior columns, both statue feet, and the center of the plaza. The left torch reward requires Blizzara; return with Blizzaga for the right torch reward. Winning the Hercules Cup unlocks Yellow Trinity; use it on Phil's stone in the Lobby for the Keyhole. Cup victories and variants have their own challenge records.",
'Deep Jungle':"Camp connects to Hippos' Lagoon and Bamboo Thicket. Cross the hippos to reach the far bank, or climb the vines to the elevated Vines/Vines 2 route. Tree House and Climbing Trees are above the Tunnel/Treetop area. Beyond the Cliff after Clayton, climb the Waterfall Cavern ledges to the Cavern of Hearts. Final Mix puppies 31–33 are in Waterfall Cavern; the old Climbing Trees Blue Trinity now gives Thundara-G. Return with movement abilities for the highest tree chests.",
'Agrabah':"Climb crates and awnings to travel above the Plaza, Alley, Main Street, Bazaar and Palace Gates. Aladdin's House is reached by the pole from Main Street. In the Cave of Wonders, dropping from the upper halls enters the water chambers. Relic Chamber and Dark Chamber connect by the waterways; use the stairs to regain Cave: Hall. Yellow Trinity in Cave: Hall moves the pillar to expose the Hidden Room's other section. Move the stone block from Bottomless Hall to make the Relic Chamber crossing. Bring Aladdin for Abu statue interactions, then switch to Donald and Goofy for Trinities.",
'Monstro':"After the first Parasite Cage fight, open Geppetto's chest and equip High Jump; the lower water level exposes the Mouth platforms. A useful interior route is Mouth → Chamber 1 → Chamber 2 → Chamber 3; use the upper return doorway to Chamber 2 to reach Chamber 5, then Chamber 6. Door height matters: the same chamber has several disconnected entrances. Search both upper ledges and the floor before moving on. Chamber 5's low entrance from Chamber 6 is beside its Blue Trinity. Final Mix puppies 76–78 are in Chamber 6, while 55–57 are on Chamber 3's highest ledge.",
'Atlantica':"Attack white clams; cast Fire, Blizzard or Thunder on red, blue or yellow clams respectively. The trident signs point from Undersea Valley through Calm Depths and Undersea Cave to Undersea Gorge and Triton's Palace. Ariel's Grotto is the low entrance in the Gorge. Clear enemies before grabbing the dolphin; it carries you against the Calm Depths current to Sunken Ship. Later, Mermaid Kick lets you fight the current directly. Push the seabed geyser reached from Sunken Ship to dislodge the Gorge treasure. Swim upward as well as around walls when searching shelves.",
'Halloween Town':"Guillotine Square contains the lab and Jack's house. Graveyard leads toward Moonlight Hill, Bridge and the manor. After the manor falls, return to Manor Ruins for unopened manor chests; Final Mix preserves the red mark under the manor arch. The new Moonlight Hill doorway leads to Cemetery and its four chests. Use High Jump and Glide from high ground in Guillotine Square to reach the pumpkin-mouth tower and its opposite platform. Puppies 67–69 are the White Trinity reward on Moonlight Hill.",
'Neverland':"The Hold leads through the Galley/Cabin to Captain's Cabin; the Cabin Green Trinity opens the upper route. Flight becomes available during the ship events and reaches the Hold beams and the mast chest. After winning Hercules Cup, bring Donald and Goofy to the yellow mark on the Hold's upper locked door. The deck White Trinity gives puppies 43–45 in Final Mix. Clock Tower doors follow total playtime in repeating twelve-hour cycles; the tower is occupied by Phantom late in the game until you defeat it.",
'100 Acre Wood':"Take Cid's Old Book to Merlin and examine it in his study. Five Torn Pages unlock episodes in a fixed sequence, whichever source page you find first. Explore Meadow and Pooh's House, then the Hunny Tree, Rabbit's House, Hill, Bouncing Spot and Muddy Path. Bouncing Spot opens the chest, tree and Rare Nut activities; only carry one Rare Nut at a time and return it to Owl before taking another. Episode completion rewards and score targets are separate from merely finding a page.",
'Hollow Bastion':"Rising Falls leads by floating rocks to Castle Gates. The gate-side lifts descend to Base Level and Waterway; Beast breaks the barred walls there. Bubble and switch routes reach Dungeon and the castle door controls. Complete the Library's book placements to open hidden Lift Stop sections. Cast Gravity on the floating treasure platforms to lower them. Great Crest connects to the two sides of High Tower; its moving stairs conceal another Lift Stop door. Grand Hall chests are collectible on the return after Kairi's rescue. Revisit Belle, Aerith and the princesses for their separate rewards.",
'End of the World':"In Final Dimension, follow the connected invisible paths between ten treasure markers; several trigger battles before granting the item. Giant Crevasse has five chests at different heights; keep checking side platforms before entering the portal. World Terminus has one container in each replica listed here. The Hollow Bastion laboratory Elixir must be opened during that visit before continuing through the final portal. Save at Final Rest and open its chest before entering the last battle sequence; reload that save to finish other collections."
}
for w in WORLDS:
 entry('guide-'+slug(w)+'-collectibles','guide',w+' collection route',w,'World overview','Area connections, access requirements and return-trip reminders.',WORLD_GUIDES[w],checkable=False,collectible=False,count=0,reward='Navigation reference',prerequisites='Use the individual acquisition records for exact prerequisites.',facts={'ruleset':'KH1 Final Mix / HD 1.5 + 2.5 ReMIX','countingUnit':'reference'})
# Directions are authored from the inventory and map geometry, selecting FM contents.
ROUTES={}
def routes(w,rows):
 for n,t in rows.items():ROUTES[(w,'Treasures',n)]=t
routes('Agrabah',{
0:'From the Storage doorway, turn into the Plaza and open the chest immediately to the right.',1:'Cross to the left side of the Plaza and climb onto the raised ledge to the chest.',2:'Search the elevated Plaza awnings after climbing the crates; this is the Cottage chest.',3:'Enter Storage from the Plaza, break the obstructing barrel and open the chest.',5:'Leave the Alley through its upper doorway to Main Street; follow the awnings to the chest on the lower raised platform.',6:'Climb the Main Street awnings and inspect the high chest positions; this Final Mix chest contains Dark Matter.',7:'Use High Jump from the Main Street awnings to reach the upper chest platform.',8:'After the Alley fight, climb the stacked boxes to the chest beside the lock/upper exit.',9:"Climb the pole from Main Street into Aladdin's House and open the chest inside.",10:"Open the chest on the steps inside Aladdin's House. Final Mix changes its contents to Scissors-G ►.",11:'Reach Bazaar from the Main Street awnings. Search its upper platforms for the Gummi chest.',12:'Reach Bazaar from the upper Main Street exit and open the accessory chest on the raised area.',14:'At Palace Gates, drop from the elevated entrance and cross to the chest on the opposite side.',16:'Use High Jump and Glide to cross to the isolated high ledge at Palace Gates.',17:'Inside Cave: Entrance, check the raised ledges before descending to the water chambers.',20:'In Cave: Hall, climb onto the structure with three water-spouting heads; the chest is on top.',21:'In Cave: Hall, cross to the raised platform beside the Bottomless Hall doorway.',22:'In Bottomless Hall, search the lower side ledges before taking the high exit to Treasure Room.',23:'From a high Bottomless Hall ledge, glide across the gap to its isolated chest.',24:'Reach the upper Bottomless Hall platform on the route to Treasure Room and open its chest.',25:'Descend from Cave: Entrance into Relic Chamber; cross toward the accessory chest directly ahead.',26:'Push the block down from Bottomless Hall, return to Relic Chamber and use it to cross to the Mythril chest.',27:'From the Dark Chamber save platform, jump across to the separate Cottage platform; High Jump makes the crossing easier.',29:'Approach Dark Chamber from Relic Chamber and follow that side of the waterway to the accessory chest.',30:'Use the Relic Chamber approach to Dark Chamber and inspect the side platforms for the Gummi chest.',32:'Use Yellow Trinity on the Cave: Hall pillar, then descend into the newly accessible Hidden Room section and lower the wall to reach this chest.',34:'Climb the Treasure Room statue to the Defense Up chest, then jump onto the nearby gold mound for this Mythril Shard.',35:'With Aladdin present, use Abu at the Treasure Room statue to reach the elevated Gummi chest; High Jump can help on a return visit.',36:'Climb the Treasure Room statue with the fireplace, or have Abu operate the statue, and open the chest above.'})
routes('Hollow Bastion',{
0:'Open the chest resting at water level among the rocks near the start of Rising Falls. It contains Life-G in Final Mix.',2:'Freeze the bubble beyond the starting rocks with Blizzard and use it to reach the side platform with the accessory chest.',3:'From the arch platform where Beast and Riku met, glide back to the small platform behind it.',4:'Enter the bubble near the starting Rising Falls rocks to reach the underwater Gummi chest.',5:'Use the Rising Falls bubbles to search the underwater floor for the Defense Up chest.',8:'Activate the Castle Gates hanging lift and ride across; glide onto the far-side ledge for the Haste2-G chest.',9:'Ride the Castle Gates hanging platform, then glide onto the isolated pillar with this chest.',10:'At Base Level, take the left bubble to the other side, land on the platform and turn back toward the Mythril chest.',11:'At Base Level, release the first crystal switch to extend a ledge; turn around for the Gummi chest.',12:'After extending the Base Level platforms, cross toward the Waterway exit and inspect the platform on the right for Paper-G ◄.',13:'Reach the Waterway save area by the right-hand Base Level bubble; the Fira Ring chest is left of the save point.',14:'In the Waterway, cast Blizzard on the bubble and jump onto the frozen bubble to reach the high Dark Matter chest.',15:'Have Beast break the barred Waterway wall reached from Base Level and open the Gummi chest beyond.',16:'Enter Dungeon through the wall Beast can break from Waterway. Open one of the two Gummi chests inside; this contains Ultima-G.',17:'In the Dungeon room reached with Beast, open the second Gummi chest for Thundaga-G.',19:'Use High Jump to scale the small side ledges in Entrance Hall and open the chest high above the lower floor.',24:'Climb onto the Library bookcases and glide toward the chest near the exit.',25:'Rotate the ground-floor Library column until its chest faces you.',26:'Go upstairs in the Library and rotate the shelf column until its Mythril chest faces you.',27:'Rotate the other second-floor Library column to expose the Mega-Potion chest.',28:'Climb onto the Library bookcases, cross to the upper rotating column, and turn it to expose AP Up.',37:'Take the elevator from Waterway to its Lift Stop section and activate the switch for Mythril and MP prizes.',39:'Enter Lift Stop from Waterway, ride to the upper floor, and cast Gravity on the floating chest platform.',40:'Lower the High Tower stairs, drop to the doorway beneath them and enter Lift Stop. Cast Gravity to lower the Royal Crown platform.',41:'Complete the Library book puzzle, enter its hidden Lift Stop exit and take the lift. Lower the chest platform with Gravity.',42:'Activate the High Tower redirection switch, return to the Library-linked Lift Stop route and take its lift. Use Gravity on the Ramuh Belt chest platform.',43:'After crossing Great Crest on the large magic lift, open the nearby Gummi chest on the landing balcony.',44:'From Great Crest, enter Lift Stop and ride one level higher. Return to Great Crest and check the concealed chest to the left.',46:'Approach High Tower from Great Crest and cast Gravity on the suspended accessory chest platform.',47:'Enter the other side of High Tower from Lift Stop and lower the floating chest with Gravity. Final Mix puts Osmose-G ◄ here.',48:'Raise the High Tower stair platforms, climb to their highest point and inspect the right-hand chest platform.',49:'On the return visit, climb the Grand Hall steps and open the chest to the right of the Keyhole approach.',50:"On the return visit, climb to the high ledge behind the Grand Hall Keyhole, near Kairi's former chamber, and open Oblivion's chest."})
routes('Atlantica',{
0:'From the Undersea Valley red clam, swim upward toward the two shelf clams. Strike the higher white clam for the Elixir.',1:'Locate the two white clams on shelves above the Valley red clam; strike the lower one for Cottage.',2:'From the Valley red clam, swim right into the small recess and hit its white clam.',3:'Swim below the Valley red clam and strike the white clam on the lower platform.',4:'Search the lower Undersea Valley seabed and strike the remaining white clam for Mythril.',5:'After entering Undersea Valley from the starting area, swim right and cast Fire at the red clam.',6:'Travel through Calm Depths to Undersea Cave; strike the white clam in the small side alcove.',7:"After leaving Ariel's Grotto, swim ahead in Undersea Gorge to the white clam.",8:'Enter Undersea Gorge from Undersea Cave, turn left and descend to the blue clam; cast Blizzard.',9:'From Sunken Ship, take the lower passage to Undersea Gorge. Strike the inactive geyser and ride the current to dislodge the chest, then open it.',10:"Near the Gorge exit to Triton's Palace, turn left into Undersea Garden and strike its white clam.",11:"Search the side shelves of Triton's Palace for the Mega-Ether white clam; strike it to open.",12:"Swim around the lower side of Triton's Palace and strike the Cottage white clam.",13:"Search the upper shelves of Triton's Palace and strike the Elixir white clam.",14:"Enter Triton's Palace from the Gorge, stay along the right side and cast Thunder on the yellow clam.",16:"Inside Ariel's Grotto, open the low chest beside the clock.",17:"Swim to the fourth shelf above the bottom of Ariel's Grotto and open the Cottage chest.",19:'In Sunken Ship, descend from the entrance to the broken hull. Enter the hole and open the Elixir chest.',20:'Outside the Sunken Ship, look to the right of the lower passage back to Undersea Gorge for this chest.',21:'Inside Below Deck, swim to the back and open the chest on the left.',23:'Enter the hole beneath the Below Deck stairs and strike the white clam.',24:'In Cavern Nook, strike the white clam beside the save area.',25:"After defeating the first Ursula, leave and re-enter Ursula's Lair. Cast Fire at the sea urchin to break open the shell and collect Mythril."})
routes('Monstro',{
0:"After obtaining High Jump, climb the tall wooden debris stack beside Geppetto's ship; Final Mix puts Scan-G ◯ in its chest.",1:"After the first Parasite Cage battle, return to Geppetto's ship in the Mouth and open the chest beside him. Equip High Jump in Shared Abilities.",2:'After the water drops, jump from the Mouth center platforms toward the highest rock near the entrance and open the Watergleam chest.',4:'From the high wooden debris beside the ship, cross the central platform to the opposite side and climb the rocks to the Cottage chest.',7:'Enter Chamber 2 from Chamber 1, drop to the floor and follow the wall around to the Cottage chest.',8:'Use the upper Chamber 3 doorway back into Chamber 2; reach the high chest with High Jump.',9:'In Chamber 3, drop to the floor and move to the back of the room for the Mega-Ether chest.',11:'Enter Chamber 3 from the lower Chamber 6 exit and open the chest on the middle ledge for Osmose-G ◄.',12:'Use High Jump to reach the high side ledge in Chamber 3 opposite the puppy chest.',13:'Enter Chamber 5 from Chamber 6 and descend to its lower side. Open the chest near the Blue Trinity.',14:'At Chamber 5 floor level, open the Gummi chest beside the other low chest and Blue Trinity.',15:'Use High Jump to reach the high Chamber 5 ledge and open the Mythril chest.',20:'Climb to the upper platforms in Chamber 6; inspect the high ledges for the Megalixir chest opposite the Torn Page ledge.',21:'From the upper Chamber 6 platforms, continue left into the secluded recess for the Mythril chest.'})
routes('Traverse Town',{
4:'Cast Blizzard to extinguish every candle at the First District café, then open the unlocked chest.',6:'Jump onto the cabinet/shelf inside the Accessory Shop and open the chest above Cid.',7:'Climb onto the awning/ledge across the front of the Gizmo Shop in Second District.',9:'After Guard Armor, climb to the Gizmo Shop roof and cross the neighboring rooftops to this chest.',11:'While staying in the hotel Green Room before Guard Armor, ask Leon/Yuffie about the Keyblade and open the small chest on the table.',12:'In the Green Room, strike the clock repeatedly until its hands show 7:00; claim the Mythril reward.',13:'Enter the hotel Red Room from the Second District hallway and open its chest.',14:'In Alleyway behind the hotel, open the Potion chest at ground level.',15:'Jump onto the short awning near the Alleyway entrance and open the Pretty Stone chest.',16:'From the hotel/Alleyway ledges, reach the balcony of the room farthest from the entrance and open its Potion chest.',20:"Activate the Yellow Trinity on the crates behind Merlin's house to form a route to the AP Up chest.",24:'Use White Trinity at the junction of the short and main tunnels in Secret Waterway, then open the revealed chest.',27:'Climb the Green Trinity ladder from Accessory Shop into Item Workshop and open the small material chest.',29:"After completing Monstro, enter Geppetto's House in First District and open the Wishing Star chest."})
routes('Deep Jungle',{
0:'Drop below the Tree House floor and inspect its lower supports for the Mega-Potion chest.',1:'Climb through the Tree House roof opening, circle to the ladder platform and climb to the roof chest. Final Mix gives Protect Chain.',2:'From the Tree House balcony, glide to the suspended boat and open its chest.',4:'At Jungle: Tunnel, check beside the Climbing Trees exit before taking the slide.',8:'Climb from Hippos\' Lagoon into Vines and search the side platform for the Mythril chest.',9:'Use High Jump/Glide from the Lagoon platforms to land on the tree with the Mega-Potion chest.',11:'Glide to the tall tree in Hippos\' Lagoon and inspect its top for the Meteor-G chest.',20:'Enter the tent at Camp and open the material chest inside.',21:'From Bamboo Thicket, enter Cliff and climb the poles to the high ledge; open the Mega-Potion chest.',22:'Climb the poles at Cliff and open the other chest on the high ledge for Mythril Shard.',23:'After Clayton, enter Waterfall Cavern and check the first lower ledge for Mythril Shard.',25:'Climb the lower Waterfall Cavern ledges; the Mythril chest is beyond the Orichalcum chest near the vine.',26:'In Waterfall Cavern, search the lower ledge beside the climbing vine for the Orichalcum chest.'})
routes('100 Acre Wood',{
0:'In the Meadow, circle the hollow log near the red flowers and open the chest inside it.',1:"Enter Pooh's Room and examine the cupboard/cabinet for the Elixir.",2:"Go behind Pooh's House, strike the chimney outside, then collect the Mega-Ether inside.",4:'Use the seesaw at Bouncing Spot to reach the upper rock platform and open the chest.',5:'From the Bouncing Spot rock platforms, jump/glide across the leaf platforms. Reach the lower of the two stacked leaf levels for the Dark Matter chest.',6:'After breaking the giant honey pot, jump inside its hollow stump and open the AP Up chest.',7:'From the upper rock platform, jump to the nearby hollow tree and enter its opening for Shield2-G.',8:'At Bouncing Spot, strike the middle of the fallen hollow log to release Mythril.',9:'Choose Roo on the seesaw to launch Sora toward the upper branches and collect this Rare Nut. Return it to Owl before taking another.',10:'Choose Roo again on the seesaw and inspect the other reachable branch for the second Rare Nut. Take it to Owl.',11:'Use the seesaw with Tigger to reach the branch carrying this Rare Nut; then bring it to Owl.',12:'Activate the geyser beside Piglet and use its lift to reach the Rare Nut above. Give it to Owl.',13:'Activate the geyser in the far corner of Bouncing Spot, reach the Rare Nut above and return it to Owl.'})
routes('Halloween Town',{
0:"Go through the gate at Jack's house and look beneath its staircase for the Thundara-G chest.",1:"At Jack's house in Guillotine Square, pull the doorbell three times and collect the Elixir.",2:'In Guillotine Square, cross to the open elevated room opposite the house gate and climb its ledge with High Jump; the chest is inside to the right.',4:'From a high Guillotine Square ledge, use Glide to reach the isolated elevated Elixir chest.',8:'Drop beneath the Bridge and open the Flare-G chest at its lower level.',9:'From the Bridge, reach the ledge to its left for the Meteor-G chest.',10:'From the Bridge, reach the ledge on its right for the Defense Up chest.',11:"Before destruction, open the chest left of the manor's entrance doors. After destruction, collect the corresponding unopened Ether chest from Manor Ruins.",12:'Before destruction, enter the first manor room and open the Ether chest on the right. If missed, search Manor Ruins for the relocated chest.',15:'Search the upper manor platforms for the Orichalcum chest; any unopened chest relocates to Manor Ruins after the boss.',16:'Search the manor platforms for the Mega-Ether chest, or collect its relocated chest in Manor Ruins after the boss.',17:'After the manor is destroyed, search the ruins at ground level for the additional Mythril Shard chest.',18:'After destroying the manor, use the newly opened Moonlight Hill doorway to Cemetery and open its Gummi chest.',20:'Enter Cemetery through the post-manor Moonlight Hill doorway; open the Dark Matter chest among the four containers.',21:'Enter Cemetery from Moonlight Hill after the manor is destroyed; open the Holy-G chest among the four containers.'})
routes('Neverland',{
1:'Once flight is available, fly to the high beams in Ship: Hold and open the Paper-G ► chest.',2:'Use Yellow Trinity on the locked upper Hold door and open the Dark Matter chest in the room beyond.',3:'Use Yellow Trinity on the locked upper Hold door and open the Orichalcum chest in the room beyond.',6:'In Ship: Galley, inspect the chest to the left before jumping through the ceiling opening into the Cabin.',7:"After Anti-Sora, use the trapdoor in Captain's Cabin and open the Protera Chain chest to the right in Ship: Cabin.",9:'With Neverland flight available, fly to the front mast above the Pirate Ship deck and open the chest.',11:'On arriving at Clock Tower, turn left on the ledge and open the Flare-G chest. It is no longer a puppy chest in Final Mix.'})
routes('Wonderland',{
6:'Reach the upside-down Bizarre Room and light its lamp; return to the normal room and examine the newly active plant for the item bundle.',7:'Complete the Bizarre Room book-materialization interaction, then collect the Mythril Shard it reveals.',10:"Reach the Queen's Castle right-hand hedge using the upper Lotus Forest exit and open the Meteor-G chest.",11:"Use the upside-down Bizarre Room exit onto the left Queen's Castle hedge and open the Thundara-G chest.",16:'In Lotus Forest, climb the mushrooms and inspect the back corner behind the large central tree for Scan-G ◯.',18:'Reach the hidden Lotus Forest alcove and cast Thunder on the hanging bell flowers to reveal the Thundara-G chest.',21:'Use Glide from an elevated Lotus Forest platform to reach the mushroom over the pond, then open its chest.',22:'Enter the sideways Bizarre Room and examine its lamp to obtain Defense Up.',28:'From the upper Lotus Forest route, reach the Tea Party Garden balcony and open the Dark Matter chest; Glide helps on a revisit.',29:'Use High Jump/Glide to land on the Tea Party Garden entrance arch and open the Flare-G chest.',31:'Glide across Tea Party Garden to the ledge on the far side of its wall and open Mythril.'})
routes('End of the World',{
0:'At the start of Final Dimension, defeat the initial enemies and follow the right-hand path to the first chest.',1:'Continue straight from the first chest; open the next battle chest and defeat its Darkball/Invisible wave.',2:'From the first battle chest, follow the path left to the Mega-Potion chest.',3:'Continue toward the red chest, open it and defeat Arch Behemoth for Mythril.',4:'From the Arch Behemoth chest, take the right path to the green chest for Elixir.',5:'Continue straight along that path to the next Mythril Shard chest.',6:'Continue northeast to the next battle chest and defeat its Invisibles and Angel Stars.',7:'Follow the path north from that battle chest to the Cottage chest.',8:'From the far-west end of the Final Dimension paths, take the south branch to the AP Up battle chest.',9:'From the northern Cottage chest, follow the path far west to the Gale battle chest.',10:'In Giant Crevasse, glide toward the diamond-shaped Gummi debris and open the blue chest behind it.',11:'From above the white portal, glide into the enclosure open only from above. Defeat the Angel Stars and descend to the Full-Life-G chest.',12:'From the west-side Giant Crevasse platform, face the platform with steps; cross to it and turn left to the Ultima-G chest platform.',13:'From the eastern Giant Crevasse ledge, drop one level and glide back west to the blue Drill-G chest on the right-hand platform.',14:'Search the lower Giant Crevasse ledges for the Meteor Strike chest before entering the white portal.',15:'Enter the World Terminus Traverse Town replica, defeat the Heartless in Third District and open the chest near the arrival point.',16:'Enter the World Terminus Wonderland replica and open the Rabbit Hole chest after its enemy wave.',17:'In the World Terminus Olympus replica, check behind the left foot of the statue on the right for the Frost Gem chest.',18:'Enter the World Terminus Deep Jungle replica, defeat its Heartless and open the Bright Gem chest.',19:'Enter the World Terminus Agrabah replica, defeat its Heartless and open the Blaze Gem chest.',20:'Enter the World Terminus Atlantica replica and open its AP Up container.',21:'Enter the World Terminus Halloween Town replica, defeat its Heartless and open the Lucid Gem chest.',22:'Enter the World Terminus Neverland replica and open its Mighty Shield chest.',23:'Enter the green World Terminus portal to the Hundred Acre Wood meadow. Open Megalixir near the save point.',24:'During the World Terminus laboratory visit, enter the side room and open the red chest on the left before examining the machine and leaving.',25:'Open the blue chest beside the Final Rest save point before starting the final battle sequence.'})
# Audited puppy groups, each a single chest check worth three puppies.
PUPPY={
1:("Mystical House","Circle behind Merlin's house and glide to the isolated rock across the water, or use Mermaid Kick to reach it.",'Glide or Mermaid Kick'),
4:('Alleyway','Activate Red Trinity behind the First District Item Shop to smash the crate wall, then open the chest beyond. High Jump provides an alternate route.','Red Trinity or High Jump'),
7:('Item Workshop','Use Green Trinity in the Accessory Shop and climb the lowered ladder; open the puppy chest upstairs.','Green Trinity'),
10:('Secret Waterway',"Use Red Trinity on the hotel Alleyway sewer grate; enter the Secret Waterway and open the chest near the stairs leading to Merlin's house.",'Red Trinity'),
13:("Queen's Castle",'Climb Lotus Forest to the hidden exit onto the right-hand castle hedge. Open the puppy chest on that hedge; High Jump is an alternative.','Lotus Forest upper route or High Jump'),
16:('Lotus Forest','Climb the mushrooms to the raised leaf platforms around the central tree and open the puppy chest.','None beyond Lotus Forest access'),
19:('Tea Party Garden','Climb Lotus Forest above the pond and use its high doorway to Tea Party Garden. Use High Jump and Glide onto the entrance arch to reach the puppy chest.','High Jump and Glide'),
22:('Coliseum Gates','Face the Lobby and activate Blue Trinity beneath the statue on the right. Open the chest it reveals.','Blue Trinity'),
25:("Hippos' Lagoon",'Cross the hippos and small islands to the far bank beside the vine route. Open the chest; Glide is optional.','None; Glide makes the crossing easier'),
28:('Vines 2',"Climb the vine from Hippos' Lagoon into the elevated vine area, follow the vine route to Vines 2 and land on the chest platform.",'Vine route access'),
31:('Waterfall Cavern','After Clayton, enter Waterfall Cavern and climb its lower ledges. Open the puppy chest on the platform near the Mythril Shard chest.','Defeat Clayton; this is the Final Mix location'),
34:('Camp','Activate Blue Trinity beside the laboratory table at Camp and open the puppy chest.','Blue Trinity; Donald and Goofy reunited'),
37:('Treasure Room','Climb the Treasure Room statue to the Defense Up chest, jump to the Mythril Shard gold pile, then cross the intervening ledge to the puppy chest.','Treasure Room access; movement abilities help'),
40:('Oogie’s Manor / Manor Ruins','Before the manor collapses, strike the crank in Evil Playroom and return halfway down to the door along the bridge; open the chest inside. After destruction, the unopened chest moves to an alcove near the center of Manor Ruins.','Evil Playroom crank before destruction, or Manor Ruins afterward'),
43:('Pirate Ship','Activate White Trinity at the back of the Pirate Ship deck and open its puppy chest.','White Trinity; bring Donald and Goofy'),
46:('Hidden Room','Activate Yellow Trinity at the pillar in Cave: Hall, enter the opened lower passage and lower the wall in Hidden Room. Open the puppy chest in the previously sealed section.','Yellow Trinity; High Jump/Glide can provide alternate access'),
49:('Cave: Entrance','Reach the high pillar at the far end of Cave: Entrance. Use a barrel as a step with High Jump, or Glide from higher ground, then open the puppy chest.','High Jump plus barrel, or Glide'),
52:('Palace Gates','Use High Jump to reach the high chest ledge in Palace Gates and open the puppy chest.','High Jump'),
55:('Chamber 3','Reach Chamber 3’s highest ledge; position a barrel as a step or use High Jump to reach the puppy chest.','Barrel foothold or High Jump'),
58:('Lotus Forest','Enter the Bizarre Room from the high Lotus Forest doorway above Tea Party Garden. Light the lamps beside the painting and enter it. In the isolated forest area, stand beneath the hanging bell flowers and cast Thunder to reveal the puppy chest.','Thunder; activated Bizarre Room painting'),
61:('Grand Hall','On the return after rescuing Kairi, face the Grand Hall Keyhole and drop to the ledge on its left to open the puppy chest.','Second Hollow Bastion visit after rescuing Kairi'),
64:('Cemetery','After destroying Oogie’s Manor, take the newly opened door from Moonlight Hill into Cemetery and open the puppy chest among the four chests.','Defeat Oogie’s Manor'),
67:('Moonlight Hill','Activate White Trinity just left of the Moonlight Hill entrance beside the broken wall and open the puppy chest.','White Trinity'),
70:('Guillotine Square','Use the high ledges in Guillotine Square and glide into the mouth of the gray pumpkin-shaped tower; open the chest inside.','Glide'),
73:('Mouth','After the water falls, start at the Blue Trinity side of the Mouth and climb the rock platforms toward the high chest near the Throat side. Final Mix places puppies here, not in the Scan-G chest beside the ship.','High Jump from Geppetto’s chest'),
76:('Chamber 6','Enter Chamber 6 from Chamber 5’s upper route and inspect the chest immediately to the left on that ledge.','Access to Chamber 6; Final Mix location'),
79:('Chamber 5','Reach the high Chamber 5 platform by its upper entrances. Break the barrel supporting the chest and open the puppy chest.','High Jump or upper chamber route'),
82:('Ship: Hold','Once flight is available, fly to the overhead beam in the Hold and open its puppy chest.','Neverland flight'),
85:('Ship: Hold','Activate Yellow Trinity on the locked door on the Hold’s upper level and open the puppy chest inside.','Yellow Trinity'),
88:("Captain's Cabin",'After defeating Anti-Sora, open the puppy chest in Captain’s Cabin before taking the trapdoor.','Defeat Anti-Sora'),
91:('Rising Falls','At the start of Rising Falls, freeze the bubbles with Blizzard and climb to the floating platform carrying the puppy chest. Final Mix’s water-level chest contains Life-G instead.','Blizzard and platform access'),
94:('Castle Gates','Reach the Castle Gates side balcony by the moving lifts. Target the suspended chest platform with Gravity, then open the lowered chest.','Gravity'),
97:('Lift Stop','Solve the Library book puzzle: place Khama 8, move Mava 6, obtain Azal 3 using Green Trinity, place Azal/Salegg/Nahara, then Mava 3 and Hafet 4 to expose the hidden Lift Stop exit. Enter it and cast Gravity on the floating puppy chest platform.','Green Trinity; Library puzzle; Gravity')}
# Collection-type source rows become their canonical category, never a duplicate treasure.
PAGE_WORLDS={'Traverse Town','Agrabah','Monstro','Halloween Town','Atlantica'}
PAGE_DIRECTIONS={
'Traverse Town':("Dalmatians' Den",'Rescue at least 51 puppies (17 groups), return to the Dalmatians’ House in Second District and speak to Pongo and Perdita until the Torn Page and Mythril reward is received.','51 puppies rescued'),
'Agrabah':('Dark Chamber','In the Cave of Wonders, enter Dark Chamber from the Relic Chamber side. Climb the stairs and cross the platforms beside the save-point area to open the Torn Page chest.','Cave of Wonders waterways access'),
'Monstro':('Chamber 6','Reach Chamber 6 via Chamber 5, climb to the upper platforms with High Jump, and open the Torn Page chest on a high ledge.','High Jump or upper ledge access'),
'Halloween Town':('Research Lab','Enter the Research Lab from Guillotine Square and examine the bookcase on the left to take the Torn Page.','Research Lab access'),
'Atlantica':("Ariel's Grotto",'Enter Ariel’s Grotto from the low opening in Undersea Gorge. Swim to the second shelf from the top and open the Torn Page chest.','Access to Ariel’s Grotto')}
COLOR_UNLOCK={'Blue':'Defeat Guard Armor in Traverse Town.','Red':'Seal the Deep Jungle Keyhole.','Green':'Seal the Agrabah Keyhole.','Yellow':'Win the Hercules Cup.','White':'Defeat Riku in Hollow Bastion Entrance Hall (the first Riku fight).'}
TRINITIES=[];colors=collections.Counter()
for w in WORLDS:
 for n,row in enumerate(RAW[w].get('Trinities',[])):
  color=row[0].split()[0];colors[color]+=1;num=colors[color];area=row[1];note=row[2];reward=row[3]
  if w=='Halloween Town' and color=='Red':area='Manor Ruins';note='At the archway below Oogie’s Manor; the mark remains on this arch after the manor is destroyed.'
  if w=='Monstro' and color=='Blue' and 'Mouth' in area:note='On the platform at the foot of the debris pile near the teeth in the Mouth.'
  t=entry(f'trinity-{color.lower()}-{num:02}','trinity',f'{color} Trinity — {area}',w,area,f'{color} mark: {reward}',f'Find the {color.lower()} mark in {area}. {note} Put Sora, Donald and Goofy in the active party, clear nearby enemies, then use the Trinity command.',prerequisites=COLOR_UNLOCK[color]+' Sora, Donald and Goofy must all be active and able to use the mark.',reward=reward,tags=['final-mix','trinity',color.lower()],facts={'color':color,'countingUnit':'mark','sourceRow':f'{w}/Trinities/{n}','ruleset':'KH1 Final Mix / HD 1.5 + 2.5 ReMIX'},sources=[link('KHWiki: Trinity locations and unlocks','https://www.khwiki.com/Trinity'),src(w)])
  if w=='Halloween Town' and color=='Red':t['missability']='Not permanently missable in Final Mix: the mark stays at the arch below the manor after destruction.'
  TRINITIES.append(t);MAPPING[(w,'Trinities',n)]=t['id']
STORY_ITEMS={'Rope','Cloth','Log','Seagull Egg','Fish x3','Drinking Water','Mushroom','Coconut x2','Stench','Claw Marks','Footprints','Antenna','Crystal Trident','Jack-in-the-Box','Navi-Gummi','Emblem Piece','Khama vol. 8','Salegg vol. 6','Nahara vol. 5','Hafet vol. 4','Azal vol. 3','Theon vol. 6','Mava vol. 6','Mava vol. 3'}
UNCERTAIN={('Agrabah',i) for i in [2,6,11,12,17,22,23]} | {('Hollow Bastion',i) for i in [5,11,12,16,17]} | {('Atlantica',i) for i in [4,11,12,13]} | {('Halloween Town',i) for i in [4,15,16,17]} | {('100 Acre Wood',i) for i in [9,10]} | {('Wonderland',7),('End of the World',14)}
def special_treasure(w,n,item,area,notes):
 m=re.search(r'Puppy [Nn]o\.\s*(\d+)',item)
 if m:
  p=int(m[1]); a,d,pr=PUPPY[p]
  e=entry(f'dalmatian-{p:03}-{p+2:03}','dalmatian',f'Puppies {p}–{p+2}',w,a,f'One chest containing puppies {p}, {p+1} and {p+2}.',d,prerequisites=pr,reward=f'Puppies {p}, {p+1}, {p+2}',count=3,aliases=[f'Dalmatians {p}-{p+2}']+[f'puppy {x}' for x in range(p,p+3)],sources=[link('KHWiki: 99 Puppies — Final Mix locations','https://www.khwiki.com/99_Puppies'),src(w)],tags=['final-mix','puppies','dalmatian'],facts={'puppyStart':p,'puppyEnd':p+2,'countingUnit':'puppy-group','puppiesPerGroup':3,'sourceRow':f'{w}/Treasures/{n}'})
  if p==40:e['missability']='The same unopened chest relocates to Manor Ruins after the manor is destroyed; check it only once.'
  return e
 if 'Torn Page' in item:return 'page'
 if 'Postcard' in item:return 'postcard'
 if item=='Power of wind':return 'magic'
 return None
for w in WORLDS:
 for n,row in enumerate(RAW[w].get('Treasures',[])):
  item,area,notes=row;key=(w,'Treasures',n)
  if item in STORY_ITEMS or item.startswith('Slide ') or 'multiple times' in notes or 'vegetables will reappear' in notes:
   OMIT.append({'sourceRow':f'{w}/Treasures/{n}','reason':'Temporary story object or repeatable source; explained in world guidance/reference.'});continue
  e=special_treasure(w,n,item,area,notes)
  if isinstance(e,dict):MAPPING[key]=e['id'];continue
  if e:continue
  # Dropped Trinity bundles belong to the mark, not a second invented chest.
  if 'Trinity' in notes and any(s in item for s in ['Munny','Orb','prize']):
   candidates=[t for t in TRINITIES if t['world']==w and t['area']==area and t['facts']['color'] in notes]
   if candidates:MAPPING[key]=candidates[0]['id']
   OMIT.append({'sourceRow':f'{w}/Treasures/{n}','reason':'Immediate Trinity reward bundle; represented by its mark.'});continue
  ident=f'treasure-{slug(w)}-{slug(area)}-{slug(item.split(";")[0])}-{n+1:02}'
  direction=ROUTES.get(key)
  if not direction:
   direction=f'In {area}, '
   if notes:direction+=notes[0].lower()+notes[1:]
   else:direction+=f'open the container holding {item}.'
  e=entry(ident,'treasure',item.split(';')[0]+' — '+area,w,area,f'{item}. {notes}'.strip(),direction,reward=item,facts={'countingUnit':'container-or-once-only-reward','sourceRow':f'{w}/Treasures/{n}','ruleset':'KH1 Final Mix / HD 1.5 + 2.5 ReMIX'})
  e['relatedIds']=['kh1fm-guide-'+slug(w)+'-collectibles']
  if key in ROUTES and w not in ['Destiny Islands','Olympus Coliseum']:e['sources'].append(link('KHWiki: '+w+' map route (original-map geometry; Final Mix contents from inventory)','https://www.khwiki.com/Walkthrough:Kingdom_Hearts/'+w.replace(' ','_')))
  need=[]
  for ability in ['High Jump','Glide','Gravity','Fire','Blizzard','Thunder','Yellow Trinity','White Trinity','Green Trinity','Blue Trinity']:
   if ability.lower() in (notes+' '+direction).lower():need.append(ability)
  if need:e['prerequisites']='; '.join(need)+'.'
  if (w,n) in UNCERTAIN or (not notes and not key in ROUTES):
   e['verification']='unresolved';e['uncertainty']='Contents and area are source-backed. The exact container position within this area has not been independently reconciled; use the area inventory to identify the remaining chest.'
  if w=='Destiny Islands':e['missability']='Missable on this save after leaving Destiny Islands; obtain during the island prologue.'
  if w=='Wonderland' and n in [0,1]:e['missability']='Time-limited reward phase: '+notes;e['prerequisites']=notes
  if w=='Wonderland' and n in [23,24,25,26,27]:e['missability']='Chair interactions can summon enemies; resolve the tea-table interaction while exploring this area.'
  if w=='Traverse Town' and n==11:e['missability']='Collect during the initial Green Room stay before Guard Armor; later access does not establish this first-visit reward.'
  if w=='Halloween Town' and n in [11,12,14,15,16]:e['missability']='Unopened manor chests relocate to Manor Ruins after destruction; this is the same acquisition, not two chests.'
  if w=='Hollow Bastion' and area=='Grand Hall':e['prerequisites']='Return to Hollow Bastion after rescuing Kairi.'
  if w=='End of the World' and n==24:e['missability']='Permanently missable container: open before finishing the World Terminus laboratory event and leaving its portal.'
  if w=='Neverland' and n>=12:
   hour=n-11;e['name']=f'{hour}:00 Clock Tower door — {item}';e['instructions']=f'Visit Clock Tower when total playtime is in hour {hour} of the twelve-hour cycle (for example, {hour}:00–{hour}:59; later cycles also work). Fly around the tower to the glowing numbered door and examine it, then open the reward. Return in a different hour for the other doors.';e['prerequisites']='Seal Neverland; matching total-playtime hour; defeat Phantom if he is occupying the tower.';e['missability']='A missed hour returns every twelve playtime hours. Late-game Phantom temporarily blocks the tower until defeated.';e['facts']['clockHour']=hour
  MAPPING[key]=e['id']
# Pages: page source is independent of which episode it opens.
for w,(a,d,p) in PAGE_DIRECTIONS.items():
 e=entry('torn-page-'+slug(w),'torn-page','Torn Page — '+w,w,a,'One of five interchangeable pages for Merlin’s Old Book.',d+' Return to Merlin’s book to make the next episode available; pages always unlock episodes in the same sequence.',prerequisites=p,reward='Torn Page'+('; Mythril' if w=='Traverse Town' else ''),aliases=['Pooh page','Hundred Acre Wood page'],sources=[src(w),link('KHWiki: Old Book / Torn Pages','https://www.khwiki.com/Old_Book')],facts={'countingUnit':'page','unlockOrder':'Hunny Hunt → Block Tigger → Pooh’s Swing → Tigger’s Giant Pot → Pooh’s Muddy Path'})
# Ten postcard objects, nine source interactions. The clock produces two objects together.
POSTCARDS=[
('First District','Blue safe','After speaking to Leon/Yuffie in the Green Room, inspect the blue safe near the First District door to Second District.','Initial Green Room conversation'),
('First District','Accessory Shop roof','Climb onto the Accessory Shop roof using its side ledges and open the chest behind the chimney. High Jump is convenient but not required.','None; movement abilities optional'),
('Item Shop','Ceiling fan','Go upstairs inside Item Shop, lock onto the ceiling fan, jump and strike it with the Keyblade.','None'),
('First District','Café balcony','Use Blue Trinity in front of the café tables to reach the balcony, then open the chest.','Blue Trinity'),
('Second District','Boots & Shoes awning','From the First District entrance, jump onto the nearby lamp and then the Boots & Shoes shop awning; open the chest.','None'),
('Gizmo Shop','Clock — first card','Cast Thunder on the exposed electrical cable in Third District to power the Gizmo Shop. Inside the Gizmo Shop, ride the moving platforms to the upper level and step on all three raised switches. Examine the downstairs clock: it gives two postcards together.','Thunder'),
('Gizmo Shop','Clock — second card','This is the second card received from the same Gizmo clock interaction: power the shop with Thunder in Third District, press all three upper switches, then examine the clock downstairs.','Thunder'),
('Third District','Rooftop balcony','After Guard Armor, climb the ladder by Gizmo Shop, cross the Second District rooftops and take the upper passage into Third District. Examine the far corner of that balcony.','Defeat Guard Armor; rooftop access'),
('Item Workshop','Wall notice','Use Green Trinity in Accessory Shop, climb into Item Workshop and examine the paper notice on the wall near the fireplace.','Green Trinity'),
("Geppetto's House",'Pot',"After completing Monstro, enter Geppetto's House in First District and inspect the pot on the shelf.",'Complete Monstro')]
for i,(a,name,d,p) in enumerate(POSTCARDS,1):
 e=entry(f'postcard-{i:02}','postcard','Postcard — '+name,'Traverse Town',a,'Collect this card, then mail it in First District.',d,prerequisites=p,reward='Postcard',tags=['final-mix','postcard'],facts={'countingUnit':'card','acquisitionEvent':'gizmo-clock' if i in [6,7] else f'postcard-{i:02}','acquisitionBatchSize':2 if i in [6,7] else 1},sources=[link('KHWiki: Postcards','https://www.khwiki.com/Postcard'),src('Traverse Town')])
 if i in [6,7]:e['relatedIds']=[f'kh1fm-postcard-{13-i:02}'];e['summary']='The Gizmo clock gives cards 6 and 7 together; mark both acquisition slots.'
# Magic events can be acquired out of order; count powers, never assume source == tier.
MAGIC=[
('fire','guard-armor','Traverse Town','Third District','Defeat Guard Armor when Sora, Donald and Goofy meet.','First Traverse Town visit'),
('fire','genie-jafar','Agrabah','Cave: Core','Defeat Genie Jafar by attacking the lamp carried by Iago.','Reach the final Agrabah encounter'),
('fire','princesses','Hollow Bastion','Castle Chapel','After sealing the Final Keyhole, return to Castle Chapel and speak to the princesses to receive a fire power.','Seal Hollow Bastion’s Final Keyhole'),
('blizzard','wonderland','Wonderland','Bizarre Room','Before the trial, reach the Claw Marks evidence on the high Bizarre Room cabinet via Lotus Forest; Cheshire Cat grants the ice power. If you miss that route, defeating Trickmaster grants the same power instead. You receive this acquisition only once.','Claw Marks evidence or defeat Trickmaster'),
('blizzard','jafar','Agrabah','Lamp Chamber','Defeat Jafar in the Lamp Chamber before his Genie transformation.','Reach the Lamp Chamber'),
('blizzard','hades-behemoth','Olympus Coliseum','Hades Cup — seed 40','Defeat Destroyed Behemoth at seed 40 of the Hades Cup.','Unlock and enter Hades Cup'),
('thunder','phil-training','Olympus Coliseum','Coliseum: Lobby','Complete both of Phil’s timed barrel-breaking exercises in the Lobby. The reward is one thunder power.','First Olympus visit'),
('thunder','giant-ursula','Atlantica','Triton’s Throne','Defeat giant Ursula after obtaining Mermaid Kick; receive the thunder power in the following Triton scene.','Defeat first Ursula; Mermaid Kick'),
('thunder','hades-cerberus','Olympus Coliseum','Hades Cup — seed 30','Defeat Cerberus at seed 30 of the Hades Cup.','Unlock and enter Hades Cup'),
('cure','clayton','Deep Jungle','Cliff','Defeat Clayton and Stealth Sneak at the Cliff.','Finish Deep Jungle’s rescue sequence'),
('cure','peter-pan','Neverland','Pirate Ship','Continue after Anti-Sora, go through Captain’s Cabin to the deck and complete the plank/flight scene. Peter Pan’s return grants the healing power.','Reach the ship deck after Anti-Sora'),
('cure','aerith','Hollow Bastion','Library','After the return visit’s Behemoth and Final Keyhole, speak to Aerith repeatedly in the Library; the third conversation grants a healing power. Collecting her reports alone is not enough.','Seal the Final Keyhole; Aerith available in Library'),
('gravity','phil-cup','Olympus Coliseum','Phil Cup','Win the Phil Cup with the party.','Unlock Phil Cup after sealing Traverse Town'),
('gravity','oogie-manor','Halloween Town','Manor Ruins','Destroy all the dark orbs across Oogie’s Manor to defeat the manor boss and gain a gravity power.','Defeat Oogie Boogie in Torture Chamber'),
('gravity','hades','Olympus Coliseum','Hades Cup — seed 10','Defeat Hades at seed 10 of the Hades Cup.','Unlock and progress through Hades Cup'),
('stop','parasite-cage','Monstro','Stomach','Defeat Parasite Cage for the second time in Monstro’s Stomach.','First Parasite Cage defeated; High Jump route through Throat'),
('stop','pooh-swing','100 Acre Wood','Wood: Hill','Restore the third Torn Page episode and complete Pooh’s Swing to obtain the time power.','Three Torn Pages used and prior book episodes completed'),
('stop','phantom','Neverland','Clock Tower','After rescuing Kairi, put Peter Pan in the party and talk to Tinker Bell in Ship: Cabin to reach Clock Tower. Defeat Phantom for the time power.','Late-game Phantom unlocked; Peter Pan for transport'),
('aero','opposite-armor','Traverse Town','Second District','After using Red Trinity on the Gizmo Shop roof, ring the bell three times and defeat Opposite Armor at the revealed Keyhole.','Red Trinity after Deep Jungle'),
('aero','hold-chest','Neverland','Ship: Hold','Activate Yellow Trinity on the locked door on the Hold’s upper level, then open the magic chest in the room beyond.','Yellow Trinity from Hercules Cup; Donald and Goofy active'),
('aero','all-puppies','Traverse Town',"Dalmatians' Den",'Rescue all 99 puppies in 33 chests, then speak to Pongo and Perdita in the Dalmatians’ House to claim the wind power and Gummi reward. Final Mix’s Gummi reward does not include every mission-exclusive part.','All 33 puppy groups rescued')]
SPELL_TIERS={'fire':'Fire → Fira → Firaga','blizzard':'Blizzard → Blizzara → Blizzaga','thunder':'Thunder → Thundara → Thundaga','cure':'Cure → Cura → Curaga','gravity':'Gravity → Gravira → Graviga','stop':'Stop → Stopra → Stopga','aero':'Aero → Aerora → Aeroga'}
for family,event,w,a,d,p in MAGIC:
 e=entry(f'magic-{family}-{event}','magic',family.title()+' power — '+event.replace('-',' ').title(),w,a,'One '+family+' acquisition; tiers progress '+SPELL_TIERS[family]+'.',d+' Each collected power advances this spell by one tier; acquisition order may vary.',prerequisites=p,reward=family.title()+' power',aliases=SPELL_TIERS[family].split(' → '),tags=['final-mix','magic',family],sources=[link('KHWiki: '+family.title(),f'https://www.khwiki.com/{family.title()}'),src(w)],facts={'spellFamily':family,'countingUnit':'magic-acquisition','tiers':SPELL_TIERS[family],'acquisitionEvent':event})
 if family=='aero' and event=='all-puppies':e['relatedIds']=[x['id'] for x in E if x['category']=='dalmatian']
REPORTS={
1:('Agrabah','Cave: Core','Defeat Genie Jafar in Cave: Core by attacking Iago’s lamp.','Complete the Lamp Chamber Jafar fight first.'),
2:('Hollow Bastion','Library','After sealing the Final Keyhole, talk to Aerith in the Library to receive Reports 2, 4, 6 and 10.','Seal the Final Keyhole.'),
3:('Atlantica','Triton’s Throne','Defeat giant Ursula and receive the report during the following conversation with Triton.','First Ursula battle and Mermaid Kick.'),
4:('Hollow Bastion','Library','Talk to Aerith after the Final Keyhole is sealed; this is one of her four reports.','Seal the Final Keyhole.'),
5:('Hollow Bastion','Castle Chapel','Defeat Maleficent in Castle Chapel, before the Dragon Maleficent encounter.','Reach Castle Chapel.'),
6:('Hollow Bastion','Library','Talk to Aerith after the Final Keyhole is sealed; this is one of her four reports.','Seal the Final Keyhole.'),
7:('Halloween Town','Torture Chamber','Defeat Oogie Boogie in the Torture Chamber dice-arena battle.','Reach Torture Chamber from the manor.'),
8:('Olympus Coliseum','Hades Cup — seed 10','Defeat Hades at seed 10 in the Hades Cup.','Hades Cup unlocked.'),
9:('Neverland','Pirate Ship','Defeat Captain Hook on the Pirate Ship deck.','Complete the Anti-Sora encounter and flight sequence.'),
10:('Hollow Bastion','Library','Talk to Aerith after the Final Keyhole is sealed; this is one of her four reports.','Seal the Final Keyhole.'),
11:('Agrabah','Desert','After rescuing Kairi, speak to the flying Carpet in Aladdin’s House. Accept its ride into the desert and defeat Kurt Zisa.','Rescue Kairi; Kurt Zisa encounter available.'),
12:('Olympus Coliseum','Platinum Match','Talk to Phil, select the Platinum Match and defeat Sephiroth alone.','Seal the Hollow Bastion Keyhole to unlock the match.'),
13:('Hollow Bastion','Castle Chapel / Unknown arena','Return to Castle Chapel when the dark portal is present, examine it and defeat Unknown (Xemnas).','Late-game Unknown portal available; see the optional-boss entry for the unlock condition.')}
for no,(w,a,d,p) in REPORTS.items():
 e=entry(f'report-{no:02}','report',f'Ansem’s Report {no}',w,a,f'Collect Report {no}; report text is not required for this checklist.',d,prerequisites=p,reward=f'Ansem’s Report {no}',aliases=[f'Ansem Report {no}',f'Report {no}'],tags=['final-mix','ansem-report'],sources=[link('KHWiki: Ansem’s Report acquisition','https://www.khwiki.com/Ansem%27s_Report'),src(w)],facts={'reportNumber':no,'countingUnit':'report','acquisitionEvent':'aerith-four-reports' if no in [2,4,6,10] else f'report-{no:02}'})
 if no in [2,4,6,10]:e['relatedIds']=[f'kh1fm-report-{j:02}' for j in [2,4,6,10] if j!=no]
SUMMONS=[
('Simba','Traverse Town','Magician’s Study','After sealing Deep Jungle, speak to Leon in the Secret Waterway to get Earthshine. Bring it to the Fairy Godmother in Merlin’s house and ask her to restore it.','Earthshine; Fairy Godmother introduced','Earthshine'),
('Genie','Agrabah','Aladdin’s House','Defeat both Jafar forms and seal Agrabah’s Keyhole. The following Aladdin’s House scene grants Genie directly.','Seal Agrabah',''),
('Bambi','Traverse Town','Magician’s Study','Use the first Torn Page to restore Hunny Tree, complete Pooh’s Hunny Hunt and receive Naturespark. Bring Naturespark to Fairy Godmother in Merlin’s house for Bambi.','Naturespark from Pooh’s Hunny Hunt','Naturespark'),
('Dumbo','Traverse Town','Magician’s Study','After the first Parasite Cage battle, use High Jump to reach the Watergleam chest on the tallest rock near Monstro’s Mouth entrance. Take the gem to Fairy Godmother in Merlin’s house.','Watergleam from Monstro’s Mouth','Watergleam'),
('Tinker Bell','Neverland','Clock Tower','After defeating Captain Hook, adjust the Clock Tower’s incorrect minute hand until all faces read midnight. Sealing the Keyhole grants Tinker Bell directly.','Seal Neverland',''),
('Mushu','Traverse Town','Magician’s Study','Defeat Dragon Maleficent in Hollow Bastion to receive Fireglow. Return to Fairy Godmother in Merlin’s house and have her restore the gem.','Fireglow from Dragon Maleficent','Fireglow')]
for name,w,a,d,p,gem in SUMMONS:
 e=entry('summon-'+slug(name),'summon',name,w,a,'Acquire the '+name+' summon spell.',d+' A summon gem alone is not the restored summon.',prerequisites=p,reward=name+' summon',sources=[link('KHWiki: Summon acquisitions','https://www.khwiki.com/Summon'),src(w)],tags=['final-mix','summon'],facts={'countingUnit':'summon-spell','gem':gem or 'Not applicable — direct story reward'})
# One-time rewards in the same source tables. Plot objects, repeatable drops and
# already-modelled reports/magic/summons use their canonical record instead.
NONITEM={'Green Trinity','Red Trinity','Yellow Trinity','Blue Trinity','White Trinity','Dodge Roll','Old Book','Navi-G Piece','Entry Pass',"Hero's License",'Empty Bottle','Wooden Sword','Mermaid Kick','Superglide','Glide','Ragnarok','Ars Arcanum','Sonic Blade','Strike Raid','Combo Plus','Tech Boost','Critical Plus','Gravity Break','Trinity Limit','Goofy: Cheer','Donald: Cheer','Cheer','Forget-Me-Not'}
BLUEPRINTS={'Geppetto','Cid','Cactuar','Yuffie','Aerith','Leon','Chocobo','Hyperion'}
ALREADY_MAGIC={('Agrabah',2),('Agrabah',3),('Atlantica',1),('Wonderland',0),('Monstro',1),('100 Acre Wood',2),('Olympus Coliseum',2),('Olympus Coliseum',7),('Olympus Coliseum',18),('Olympus Coliseum',19),('Olympus Coliseum',21),('Traverse Town',1),('Traverse Town',16),('Traverse Town',26),('Hollow Bastion',4),('Hollow Bastion',6),('Deep Jungle',11),('Neverland',1),('Neverland',4),('Halloween Town',2)}
for w in WORLDS:
 for n,(items,area,note) in enumerate(RAW[w].get('Rewards',[])):
  key=(w,'Rewards',n)
  if (w,n) in ALREADY_MAGIC or 'Ansem' in items or 'multiple times' in note or (w=='Traverse Town' and n in range(5,15)) or 'Torn Page' in items or (w=='Destiny Islands' and n in [3,8]):
   OMIT.append({'sourceRow':f'{w}/Rewards/{n}','reason':'Canonical magic/report/page/mail record, alternate payout of same event, or repeatable reward.'});continue
  if w=='Deep Jungle' and n==2:
   OMIT.append({'sourceRow':f'{w}/Rewards/{n}','reason':'Alternative Ether payout of the same camp experiment; merged with complete-memo reward.'});continue
  parts=[x.strip() for x in items.split(';')]
  keep=[x for x in parts if x not in NONITEM|BLUEPRINTS|{x[0] for x in SUMMONS} and not x.startswith(('Power of','Munny'))]
  if not keep:
   OMIT.append({'sourceRow':f'{w}/Rewards/{n}','reason':'Ability/unlock, temporary story item, summon conversion or blueprint catalog; no extra treasure check.'});continue
  reward='; '.join(keep);name=keep[0]
  ident=f'treasure-{slug(w)}-reward-{n+1:02}-{slug(name)}'
  d=f'In {area}, '+note[0].lower()+note[1:] if note else f'Collect {reward} in {area}.'
  if w=='Deep Jungle' and n==3:d='At Camp, read all three experiment memos, then cast Blizzard on the laboratory equipment to receive two Ethers. Reading only memos 1 and 2 gives one Ether instead; these are alternative payouts for this interaction.';reward='Ether ×2 with all three memos; otherwise Ether ×1'
  if w=='Destiny Islands' and n in [2,7]:
   day='first-day raft materials' if n==2 else 'second-day provisions';d=f'Bring all {day} to Kairi before taking a hint. No hint gives Hi-Potion; requesting the vague hint gives Potion instead. Count the turn-in once.';reward='Hi-Potion without hints; Potion with a vague hint'
  if w=='100 Acre Wood' and n in [6,7,8,9,10]:d=f'At Bouncing Spot, collect a Rare Nut and give it to Owl. This is turn-in {n-5} of five and awards {reward}. You can carry only one nut, so return each before collecting another.'
  if w=='Olympus Coliseum':d=note+' Register with Phil in the Lobby; repeat-clearing an already claimed reward does not add a new acquisition.'
  if w=='Traverse Town' and n in [33,34,35,36]:d=note+' Enter Merlin’s house through the Fire-marked Third District door and speak to the specified character until the reward is received.'
  if w=='Traverse Town' and n==37:d='After sealing Deep Jungle, enter Secret Waterway through the Alleyway Red Trinity route and speak to Leon for Earthshine. Bring it to Fairy Godmother to obtain Simba.'
  if w=='Hollow Bastion' and n==7:area='Dark chamber beyond Castle Chapel';d='Defeat Dragon Maleficent through the Castle Chapel portal. The Fireglow gem is awarded after the fight; bring it to Fairy Godmother in Traverse Town to restore Mushu.'
  e=entry(ident,'treasure',name+' — '+area,w,area,'One-time reward: '+reward,d,reward=reward,facts={'countingUnit':'one-time-reward','sourceRow':f'{w}/Rewards/{n}','ruleset':'KH1 Final Mix / HD 1.5 + 2.5 ReMIX'})
  if w=='Destiny Islands':e['missability']='Missable after the island prologue ends. The reward is a replaceable consumable.'
  if w=='Traverse Town' and n==0:e['missability']='Only before Guard Armor, after leaving the initial Green Room scene.'
  if w=='Traverse Town' and n==2:e['missability']='Requires winning the early Leon fight; losing permanently forgoes this bonus on the save.'
  if w=='Traverse Town' and n in range(17,26):e['prerequisites']=note
  if w=='100 Acre Wood' and n>=6 and n<=10:e['prerequisites']=f'Bouncing Spot unlocked; Rare Nut turn-in {n-5}.'
  MAPPING[key]=e['id']
# Mailing is a separate action from collecting a postcard. These reward slots do
# not inflate world collectibles: one card is already counted when found.
MAIL_REWARDS=['Cottage','Mythril Shard','Mega-Potion','Mega-Ether','Mythril','Elixir','Megalixir','Orichalcum','AP Up','Defense Up']
for i,reward in enumerate(MAIL_REWARDS,1):
 entry(f'postcard-mail-{i:02}','guide',f'Mail postcard {i} — {reward}','Traverse Town','First District mailbox',f'The {i}th mailed postcard awards {reward}.',f'Examine the red mailbox beside the Accessory Shop and choose to mail a held postcard. On mailing number {i}, receive {reward}. Cards can be found in any order; this reward follows mailing order.',prerequisites=f'Hold an unmailed postcard; have mailed {i-1} cards previously.',reward=reward,checkable=True,collectible=False,count=0,tags=['final-mix','postcard-mailing'],sources=[link('KHWiki: Postcards and Final Mix mailing rewards','https://www.khwiki.com/Postcard')],facts={'countingUnit':'mailing','mailingNumber':i})
# Additional one-time world interaction not present in the world's treasure table.
entry('guide-trinity-unlocks','guide','Trinity unlocks and counting','Traverse Town','Shared abilities','46 marks: 17 blue, 6 red, 9 green, 4 yellow and 10 white.','Blue: defeat Guard Armor. Red: seal Deep Jungle. Green: seal Agrabah. Yellow: win Hercules Cup. White: defeat Riku in Hollow Bastion Entrance Hall. Activate marks with Sora, Donald and Goofy in the active party. Mark activation and opening a revealed chest are separate actions. In Final Mix, Halloween Town’s red mark remains available after the manor falls.',checkable=False,collectible=False,count=0,reward='Trinity reference',sources=[link('KHWiki: Trinity','https://www.khwiki.com/Trinity')])
entry('guide-library-books','guide','Library puzzle and Lift Stop chests','Hollow Bastion','Library','Book placements open the routes to puppies 97–99 and several Gravity chests.','Pick up Khama vol. 8 on the ground floor and fill the gap in its red shelf. Upstairs, take Mava vol. 6 and Theon vol. 6; use Green Trinity near the table for Azal vol. 3. Put Azal in its yellow shelf. Replace the misplaced Salegg book with Mava 6; put Salegg 6 in the blue shelf. Take Nahara 5 downstairs and place it in the upstairs N shelf to reveal Mava 3. Put Mava 3 in its green shelf, collect Hafet 4 from the revealed desk and place it in the purple H shelf. This exposes the hidden Lift Stop exit. Place Theon 6 upstairs to expose the red switch for the upper Entrance Hall door. Use Gravity on suspended chest platforms beyond the hidden exit.',prerequisites='Green Trinity; access to Library; Gravity for the floating chests.',checkable=False,collectible=False,count=0,reward='Library exits and access to Lift Stop treasures',sources=[src('Hollow Bastion'),link('KHWiki: Library route','https://www.khwiki.com/Walkthrough:Kingdom_Hearts/Hollow_Bastion')],relatedIds=['kh1fm-dalmatian-097-099'])
# Final Mix walkthrough refinements checked against the world inventories.
GG='https://www.gamerguides.com/kingdom-hearts-hd-15-remix/guide/kingdom-hearts-final-mix/'
BY_SOURCE={e['facts'].get('sourceRow'):e for e in E if e['facts'].get('sourceRow')}
def refine(w,n,d,page=None,section='Treasures',**kw):
 e=BY_SOURCE[f'{w}/{section}/{n}'];e['instructions']=d;e['verification']='source-backed';e.pop('uncertainty',None);e.update(kw)
 if page:e['sources'].append(link('Gamer Guides: Final Mix — '+page.split('/')[-1].replace('-',' ').title(),GG+page))
 return e
refine('Wonderland',7,'In the sideways Bizarre Room, strike the latch beside the teddy bear. Return through Queen’s Castle to the normal room, grow large and examine the book beside the bear.','walkthrough/wonderland',prerequisites='Reach the sideways Bizarre Room through Lotus Forest; move the teddy bear; grow large in the normal room.')
for n,d in {
2:'From Aladdin’s House, enter Plaza above ground level; cross the shutters and gap to the Cottage chest.',
6:'Climb Main Street’s awnings to their highest point, then jump to the isolated Dark Matter chest.',
11:'Enter Bazaar from upper Main Street, climb and cross its shutters to the Thundara-G chest.',
12:'From Bazaar’s Thundara-G chest, continue climbing the shutters to the higher Fire Ring chest.',
17:'Open the chest on the raised ledge in Cave: Entrance before descending to the lower chambers.',
22:'In Cave: Hall, use the water-spouting pillar to cross to the opposite stairs. That Bottomless Hall doorway leads to Mega-Potion.',
23:'Return to Cave: Hall and enter the other Bottomless Hall doorway. Jump or glide right to the Elixir chest.'
}.items():refine('Agrabah',n,d,'walkthrough/agrabah')
refine('Agrabah',7,'From upper Main Street, use High Jump onto the ledge beside the upper Palace Gates entrance and open the Mythril chest.','walkthrough/world-revisit-part-2',prerequisites='High Jump.')
refine('Agrabah',32,'From Dark Chamber’s save point, swim up to Silent Chamber. Take the stairs, High Jump onto the raised ledge and use the statue to lower the wall; enter the opened Hidden Room section for Haste2-G and puppies 46–48. Yellow Trinity in Cave: Hall also opens access.','walkthrough/world-revisit-part-2',prerequisites='High Jump and access to the Silent Chamber ledge, or Yellow Trinity route.')
for n,d in {
4:'Below the red clam in Undersea Valley, find the Mega-Potion clam; look up into the cliff underside and swim into its recess for the Mythril clam.',
11:'Enter Triton’s Palace from Undersea Gorge, descend to the seabed and turn right; strike the white clam for Mega-Ether.',
12:'From Undersea Gorge, enter Triton’s Palace and swim straight down near the entrance to the Cottage clam.',
13:'Cross the length of Triton’s Palace bridge and strike the white clam at its far end for Elixir.'
}.items():refine('Atlantica',n,d,'walkthrough/atlantica')
refine('Hollow Bastion',5,'On the return visit, enter the new bubble before Rising Falls’ largest arch platform. It carries you to the underwater Defense Up chest.','walkthrough/re-hollow-bastion',prerequisites='Return to Hollow Bastion after rescuing Kairi.')
for n,d in {
11:'At Base Level, take the left bubble to the Mythril platform. Jump across to the next chest beside the crystal for Thundara-G.',
12:'Activate Base Level’s crystal to extend the ledges. Jump or glide back toward the entrance and open Paper-G ◄ on the entry-side ledge.',
16:'Have Beast break the Waterway wall into Dungeon. Open both chests in that room: one contains Ultima-G, the other Thundaga-G.',
17:'Have Beast break the Waterway wall into Dungeon. Open both chests in that room: one contains Thundaga-G, the other Ultima-G.'
}.items():refine('Hollow Bastion',n,d,'walkthrough/hollow-bastion')
refine('Halloween Town',4,'Glide from Lab Entryway’s ledge to the opposite platforms. The giant pumpkin-mouth room to the right of the Power Up platform contains two chests: Elixir and puppies 70–72.','walkthrough/pre-hollow-bastion',prerequisites='Glide; use High Jump if needed.')
refine('Halloween Town',2,'Jump and glide from Lab Entryway’s ledge to the opposite platforms, then jump into the pumpkin opening for Power Up.','walkthrough/pre-hollow-bastion')
refine('Halloween Town',15,'Strike the Evil Playroom lever, leave and go to the bridge’s end. Drop onto the lowered cage and open Orichalcum. After the manor falls, the unopened chest moves to the ruins.','walkthrough/halloween-town')
refine('Halloween Town',16,'Above the manor’s Fire-powered lift, climb to the broken tower. Jump left onto the jagged wall’s roof, then onto the cage for Mega-Ether. After destruction, check the ruins instead.','walkthrough/halloween-town')
refine('100 Acre Wood',9,'At the Bouncing Spot seesaw, choose Roo to launch Sora onto the high branch. Collect its Rare Nut and bring it to Owl before returning for the next nut.','side-quests/hundred-acre-wood')
refine('100 Acre Wood',10,'After returning the first Roo-branch nut to Owl, use Roo at the seesaw again. A second nut appears on the same branch; collect it and return it to Owl.','side-quests/hundred-acre-wood')
refine('100 Acre Wood',11,'Choose Tigger at the seesaw. From the landing branch jump into the other tree and look down for this Rare Nut. Carry only one nut; return it to Owl.','side-quests/hundred-acre-wood')
refine('100 Acre Wood',12,'Step on the stump near Piglet to start the geyser. Climb the hill, jump to the wooden platform, then turn and jump onto the leafy canopy for the nut.','side-quests/hundred-acre-wood')
refine('100 Acre Wood',13,'Step on the small corner stump beyond Tigger and Roo. Turn back and use the raised geyser platform to reach the remaining nut.','side-quests/hundred-acre-wood')
refine('End of the World',14,'In Giant Crevasse, glide from the entrance toward the Dark Matter platform. Continue to the web-enclosed platform, defeat its Heartless, and drop through the hole for Meteor Strike.','walkthrough/end-of-the-world')
e=refine('Olympus Coliseum',7,'After winning Hades Cup with the party, return to Coliseum Gates and examine the pot immediately right of the Lobby entrance.',prerequisites='Win the Hades Cup with the party.')
e['sources'].append(link('KHWiki: Orichalcum — Final Mix treasure interaction','https://www.khwiki.com/Orichalcum'))
# Flower barters reset when leaving/re-entering; retain useful reference, not finite checks.
for n in range(2,8):
 e=BY_SOURCE[f'Wonderland/Rewards/{n}'];e.update(category='guide',checkable=False,collectible=False,count=0,summary='Repeatable flower exchange: '+e['reward'],missability='Repeatable after leaving and re-entering the area.',prerequisites='Carry the requested consumable; reach this Lotus Forest section.')
 e['instructions']+=' Leave and re-enter to repeat this trade. It is excluded from finite collection progress.'
 e['facts']['countingUnit']='repeatable-exchange-reference'
 e['sources'].append(link('Gamer Guides: Final Mix — repeatable Wonderland flowers',GG+'walkthrough/wonderland'))
# Include bundled rewards in their canonical event rather than dropping them with a report.
for no,extra in {5:'Donald: Cheer',7:'Holy Circlet',9:'Ars Arcanum',11:'Zantetsuken',12:'One-Winged Angel',13:'EXP Necklace'}.items():
 e=next(x for x in E if x['id']==f'kh1fm-report-{no:02}');e['reward']+='; '+extra;e['instructions']+=' This encounter also awards '+extra+'.'
# Group automatic rewards obtained by the same action across specialized categories.
def group(canonical,*other):
 ids=[canonical,*other]
 for identifier in ids:
  e=next(x for x in E if x['id']==identifier);e['facts']['acquisitionId']=canonical;e['facts'].pop('acquisitionEvent',None)
  e['relatedIds']+= [i for i in ids if i!=identifier]
group('kh1fm-magic-fire-genie-jafar','kh1fm-report-01')
group('kh1fm-magic-thunder-giant-ursula','kh1fm-report-03')
group('kh1fm-magic-gravity-hades','kh1fm-report-08')
group('kh1fm-summon-tinker-bell',BY_SOURCE['Neverland/Rewards/3']['id'])
# Guard Armor's item and fire-power rewards are automatic; the Leon-win bonus is conditional.
group('kh1fm-magic-fire-guard-armor',BY_SOURCE['Traverse Town/Rewards/27']['id'])

# Independent Final Mix memory-location manifest has six manor chests, not seven:
# two Ethers, two cage chests, puppies 40–42 and the Red Trinity chest. The extra
# standalone Manor Ruins shard in the wiki is not corroborated by either FM route.
AP_SOURCE=SOURCE['independentChestInventory']['source']
phantom=BY_SOURCE['Halloween Town/Treasures/17'];E.remove(phantom)
MAPPING[('Halloween Town','Treasures',17)]=BY_SOURCE['Halloween Town/Treasures/13']['id']
OMIT.append({'sourceRow':'Halloween Town/Treasures/17','reason':'Rejected duplicate: independent Final Mix location manifest and modern route account for all six manor chests; the shard is represented by the Red Trinity chest.', 'evidence':[AP_SOURCE,GG+'walkthrough/halloween-town','https://www.trueachievements.com/game/KINGDOM-HEARTS-HD-15-25-ReMIX/walkthrough/14']})
BY_SOURCE['Halloween Town/Treasures/13']['sources'].append(link('Archipelago: Final Mix physical chest locations',AP_SOURCE))
# This green mark hands over Mythril directly; its treasure view shares the mark action.
green=next(x for x in TRINITIES if x['world']=='Olympus Coliseum' and x['facts']['color']=='Green')
group(green['id'],BY_SOURCE['Olympus Coliseum/Treasures/3']['id'])
BY_SOURCE['Olympus Coliseum/Treasures/3']['instructions']='With Donald and Goofy active, use Green Trinity beside the Coliseum Gates tournament rankings to receive Mythril directly.'
BY_SOURCE['Olympus Coliseum/Treasures/3']['sources'].append(link('Archipelago: Final Mix static reward locations',AP_SOURCE))
refine('Olympus Coliseum',5,'Win the Phil, Pegasus and Hercules Cups with the party. Return to the Lobby and open its large chest for Olympia.',section='Rewards',prerequisites='Win all three preliminary cups; open the Lobby chest.')
refine('Deep Jungle',3,'At Camp, read research memos on the clothesline, globe and record player. Examine the laboratory flasks with a Potion in stock, then cast Blizzard. Reading all three memos gives two Ethers; memos 1 and 2 alone give one.',section='Rewards',page='walkthrough/deep-jungle',prerequisites='Potion; Blizzard; research memos. Read memo 3 before performing the experiment for the larger payout.')
refine('Deep Jungle',4,'At Camp, examine the grandfather clock and flagpole for both recipe cards. With a Potion in stock, examine the stove pot and then cast Fire to receive Hi-Potion.',section='Rewards',page='walkthrough/deep-jungle',prerequisites='Potion; Fire; both recipe cards.')

# Use the documented guaranteed access route, without inventing an earliest flag.
unknown=next(e for e in E if e['id']=='kh1fm-report-13')
unknown['instructions']='Reach Final Rest in End of the World, then return to Hollow Bastion’s Castle Chapel. Examine the dark portal and defeat Unknown (Xemnas) to obtain Report 13 and EXP Necklace.'
unknown['prerequisites']='Reach Final Rest in End of the World; return to Castle Chapel. This is a guaranteed access route, not a claim about the earliest possible portal appearance.'
unknown['uncertainty']='Sources disagree on the earliest portal flag. The Final Rest route is documented; an earlier unlock is not asserted.'
unknown['sources'].append(link('KHWiki: Final Mix battle additions and guaranteed Unknown access','https://www.khwiki.com/Kingdom_Hearts_Final_Mix#Battle'))

# Give a guaranteed practical route without claiming the disputed earliest portal flag.
e=next(x for x in E if x['id']=='kh1fm-report-13')
e['prerequisites']='Reach Final Rest in End of the World, then return to Hollow Bastion Castle Chapel.'
e['instructions']='After reaching Final Rest, return to Hollow Bastion’s Castle Chapel, examine the dark portal and defeat Unknown (Xemnas). The encounter awards Ansem’s Report 13 and EXP Necklace.'
e['uncertainty']='Sources disagree about the earliest portal appearance. Reaching Final Rest is the conservative source-backed access point used here; this is not a claim that an earlier visit cannot work.'
e['facts']['earliestUnlockStatus']='Unresolved; practical late-game route is source-backed.'
e['sources'].append(link('KHWiki: Final Mix changes — Unknown access','https://www.khwiki.com/Kingdom_Hearts_Final_Mix#Battle'))

# Every row links back to its world route; canonical related checks resolve locally.
IDS={e['id'] for e in E}
for e in E:
 if e['category']!='guide':
  e['relatedIds']=list(dict.fromkeys(e['relatedIds']+['kh1fm-guide-'+slug(e['world'])+'-collectibles']))
 if e['category']=='trinity':
  possible=[x for x in E if x['world']==e['world'] and x['area']==e['area'] and x['category'] in ['treasure','dalmatian','postcard','magic'] and e['facts']['color'].lower()+' trinity' in (x['instructions']+' '+x['prerequisites']).lower()]
  e['relatedIds']+= [x['id'] for x in possible]
  for x in possible:x['relatedIds']=list(dict.fromkeys(x['relatedIds']+[e['id']]))
 if e['category']=='summon' and e['facts']['gem'].startswith('Not applicable') is False:
  gem=e['facts']['gem'];e['relatedIds'] += [x['id'] for x in E if x['category']=='treasure' and x['reward']==gem]
# Canonical acquisition IDs are existing entry IDs; these simultaneous objects share state.
for e in E:
 ev=e.get('facts',{}).pop('acquisitionEvent',None)
 if ev:e['facts']['acquisitionId']={'gizmo-clock':'kh1fm-postcard-06','aerith-four-reports':'kh1fm-report-02'}.get(ev,e['id'])
# Preserve prose consistency for safer offline retrieval.
for e in E:
 e['relatedIds']=list(dict.fromkeys(e['relatedIds']))
 assert all(i in IDS for i in e['relatedIds']),e['id']
 assert e['sources'] and e['instructions'] and e['summary']
 assert '[' not in e['reward'] or e['verification']=='unresolved',e['reward']
assert len(IDS)==len(E),'duplicate IDs'
COUNTS=collections.Counter(e['category'] for e in E)
EXPECTED={'dalmatian':33,'trinity':46,'postcard':10,'torn-page':5,'report':13,'magic':21,'summon':6}
for c,n in EXPECTED.items():assert COUNTS[c]==n,(c,COUNTS[c],n)
assert sum(e['count'] for e in E if e['category']=='dalmatian')==99
assert dict(colors)=={'Blue':17,'Red':6,'Green':9,'Yellow':4,'White':10},colors
assert len({(e['facts']['puppyStart'],e['facts']['puppyEnd']) for e in E if e['category']=='dalmatian'})==33
C=[]
for c,n in EXPECTED.items():
 C.append({'category':c,'label':{'dalmatian':'Dalmatians (33 chests / 99 puppies)','trinity':'Trinity Marks','postcard':'Postcards','torn-page':'Torn Pages','report':'Ansem Reports','magic':'Magic acquisitions','summon':'Summons'}[c],'expected':n,'actual':COUNTS[c],'complete':True,'notes':'Source-backed Final Mix inventory; no hands-on claim. '+('One check per three-puppy chest.' if c=='dalmatian' else 'Acquisition records are distinct from reward turn-ins and references.')})
unresolved=[e for e in E if e['verification']=='unresolved']
manifest=SOURCE['auditedTreasureManifest']
actual_by_world=dict(collections.Counter(e['world'] for e in E if e['category']=='treasure'))
assert actual_by_world==manifest,(actual_by_world,manifest)
assert not unresolved,unresolved
C.append({'category':'treasure','label':'Treasures and one-time world rewards','expected':sum(manifest.values()),'actual':COUNTS['treasure'],'complete':True,'notes':'Complete declared inventory across 13 worlds, reconciled against all 535 source-table rows and independent Final Mix physical-location data. This 306-record compendium is not an official in-game treasure counter. Specialist collections, temporary story objects and repeatable sources are excluded; simultaneous automatic rewards share acquisition IDs.'})
C.append({'category':'guide','label':'World collection routes and turn-in guidance','expected':None,'actual':COUNTS['guide'],'complete':True,'notes':'13 world routes, Library puzzle, Trinity unlocks, six repeatable flower references and ten separately checkable postcard mailings. These do not contribute to world collectible counts.'})
# Audit every source row, including sources represented by specialized categories.
MAGIC_ROWS={('Agrabah',2):'blizzard-jafar',('Agrabah',3):'fire-genie-jafar',('Atlantica',1):'thunder-giant-ursula',('Wonderland',0):'blizzard-wonderland',('Monstro',1):'stop-parasite-cage',('100 Acre Wood',2):'stop-pooh-swing',('Olympus Coliseum',2):'thunder-phil-training',('Olympus Coliseum',7):'gravity-phil-cup',('Olympus Coliseum',18):'blizzard-hades-behemoth',('Olympus Coliseum',19):'thunder-hades-cerberus',('Olympus Coliseum',21):'gravity-hades',('Traverse Town',1):'fire-guard-armor',('Traverse Town',16):'aero-opposite-armor',('Traverse Town',26):'aero-all-puppies',('Hollow Bastion',4):'cure-aerith',('Hollow Bastion',6):'fire-princesses',('Deep Jungle',11):'cure-clayton',('Neverland',1):'cure-peter-pan',('Neverland',4):'stop-phantom',('Halloween Town',2):'gravity-oogie-manor'}
CARD_ROWS={0:2,1:1,2:4,5:3,8:5,10:6,18:8,28:9,30:10}
for w,sections in RAW.items():
 for sec,rows in sections.items():
  for n,row in enumerate(rows):
   key=(w,sec,n)
   if key in MAPPING:continue
   item=row[0]
   if sec=='Treasures' and 'Postcard' in item:MAPPING[key]=f'kh1fm-postcard-{CARD_ROWS[n]:02}'
   elif 'Torn Page' in item:MAPPING[key]='kh1fm-torn-page-'+slug(w)
   elif sec=='Treasures' and item=='Power of wind':MAPPING[key]='kh1fm-magic-aero-hold-chest'
   elif sec=='Rewards' and (w,n) in MAGIC_ROWS:MAPPING[key]='kh1fm-magic-'+MAGIC_ROWS[(w,n)]
   elif 'Ansem' in item:
    no=int(re.search(r"Report (\d+)",item)[1]);MAPPING[key]=f'kh1fm-report-{no:02}'
   elif sec=='Rewards' and w=='Traverse Town' and n in range(5,15):MAPPING[key]=f'kh1fm-postcard-mail-{n-4:02}'
   elif sec=='Rewards' and item in [x[0] for x in SUMMONS]:MAPPING[key]='kh1fm-summon-'+slug(item)
   elif w=='Destiny Islands' and sec=='Rewards' and n in [3,8]:MAPPING[key]=MAPPING[(w,sec,n-1)]
   elif w=='Deep Jungle' and sec=='Rewards' and n==2:MAPPING[key]=MAPPING[(w,sec,3)]
OMIT_BY_ROW={x['sourceRow']:x for x in OMIT}
LEDGER=[]
for w,sections in RAW.items():
 for sec,rows in sections.items():
  for n,row in enumerate(rows):
   key=(w,sec,n);label=f'{w}/{sec}/{n}';target=MAPPING.get(key)
   assert target or label in OMIT_BY_ROW,('unclassified source row',label,row)
   if target:assert target in IDS,(label,target)
   reason=OMIT_BY_ROW.get(label,{}).get('reason','Canonical acquisition or useful reference record.')
   LEDGER.append({'sourceRow':label,'item':row[0],'classification':'represented' if target else 'excluded','entryId':target,'reason':reason})
assert len(LEDGER)==535
# A second, independently maintained location manifest must agree world by world.
CHEST_RECONCILIATION=[]
for w in WORLDS:
 excluded=SOURCE['independentChestInventory']['wikiRowsOutsideChestType'][w]
 actual=len(RAW[w]['Treasures'])-len(excluded)
 expected=SOURCE['independentChestInventory']['countsByWorld'].get(w,0)
 assert actual==expected,(w,actual,expected)
 CHEST_RECONCILIATION.append({'world':w,'wikiComparableChestRows':actual,'independentChestLocations':expected,'wikiRowsOutsideComparison':excluded})

(ROOT/'data/kh1fm/collectibles.json').write_text(json.dumps(E,ensure_ascii=False,indent=2)+'\n')
(ROOT/'data/kh1fm/collectibles-coverage.json').write_text(json.dumps(C,ensure_ascii=False,indent=2)+'\n')
(ROOT/'tools/content/import-collectibles.audit.json').write_text(json.dumps({'checkedAt':DATE,'sourceRows':sum(len(rows) for sections in RAW.values() for rows in sections.values()),'counts':dict(COUNTS),'trinityColors':dict(colors),'unresolved':[{'id':x['id'],'issue':x['uncertainty']} for x in unresolved],'auditedTreasureManifest':manifest,'collectionActionsByWorld':{w:len({e['facts'].get('acquisitionId',e['id']) for e in E if e['world']==w and e['checkable'] and e['collectible']}) for w in WORLDS},'sourceLedger':LEDGER,'independentChestReconciliation':CHEST_RECONCILIATION,'excludedOrMerged':OMIT},ensure_ascii=False,indent=2)+'\n')
print(json.dumps({'entries':len(E),'counts':dict(COUNTS),'unresolved':len(unresolved),'trinityColors':dict(colors)},indent=2))
