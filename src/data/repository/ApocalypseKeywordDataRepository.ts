import type { KeywordData } from "@/data/repository/KeywordData";
import * as _ from "lodash-es";
import type { DataRepository } from "./DataRepository";

export class KeywordDataRepository implements DataRepository {
  public find(id: string): KeywordData | undefined {
    return _.find(this.keywords, { id: id });
  }

  public findAll(): KeywordData[] {
    return this.keywords;
  }

  private keywords: KeywordData[] = [
    {
      id: "x-hp",
      keyword: "+X HP",
      description:
        "The Hero's Maximum Health increases by +X points. As explained on page 7 of the Age of Darkness Rulebook, a Hero's Maximum Health, however, can never exceed 16. If a Hero has two or more effects that increase their Health Points, you should always add them up, but never exceed the value of 16 shown on the Hero board. All Maximum Health that exceeds 16 is considered wasted.",
    },
    {
      id: "x-hp-simple",
      keyword: "+X HP (SIMPLE)",
      description:
        "If you prefer not to deal with the granularity of the +X HP rule, you can choose the simple version and disregard the second and third NOTEs. So, if you lose an effect that confers +X HP, you lose Health accordingly. However, if you regain these effects later, you won't recover any Health, even if the sum of the +X HP effects you have exceeds 16 Health.",
    },
    {
      id: "x-dmg",
      keyword: "+X or -X DMG",
      description:
        "X value is added to or subtracted from the Damage your Attack inflicts. Critical Hits and DOUBLE DMG also double this.",
    },
    {
      id: "x-hit",
      keyword: "+X or -X HIT",
      description:
        "Make a Weapon Attack adding (or subtracting) the X value to your die roll. Only affects Accuracy, not getting a Critical Hit.",
    },
    {
      id: "x-to-hit",
      keyword: "+X TO HIT",
      description:
        "Any Weapon Attacks you make gain a +X bonus on the Accuracy Check to hit your targets. Keep in mind that this bonus affects only the outcome of a Weapon's Accuracy, not whether you get a Critical Hit: If you have +6 TO HIT and roll a 14 on the D20, it doesn't mean that it is a “natural 20”—it is an Accuracy 20 and a natural 14.",
    },
    {
      id: "x-movement",
      keyword: "+X MOVEMENT",
      description: "You received X additional movement points for every Move effect gained.",
    },
    {
      id: "action-cube",
      keyword: "ACTION CUBES (AC)",
      description: "Colored cubes spend by Heroes to use their skills.",
    },
    {
      id: "activate",
      keyword: "ACTIVATE",
      description:
        "Activate is a complicated term that appears in many effects over the three generations of the AoD System. At its design root, Activate is the instruction to take a turn. So, when you Activate a Monster, for example, you take a turn with that Monster; Whenever a Monster takes a turn, we say it is being “activated.” When a Character is activated, it takes a turn as normal: its Conditions trigger at the beginning of the turn, then its Triggered Abilities fire, and finally it takes a Movement Action and/or an Attack Action. Pets, however, have an optional effect: when you Activate one of them, instead of making them take a turn, you can Summon them. It's worth remembering: a Summoned Pet appears in an adjacent unoccupied space next to its Master.",
    },
    {
      id: "adjacent",
      keyword: "ADJ OR ADJACENT",
      description:
        "This effect can only affect a Target in an adjacent square to the casting Character, regardless of the Skill's Range.",
    },
    {
      id: "area",
      keyword: "AREA",
      description: "Refers to a blue square on a map tile.",
    },
    {
      id: "all",
      keyword: "ALL",
      description:
        "An effect with this term means equivalent to the damage the Target is receiving. The effect still only applies to one Target of an attack, not both or more, during MULTISHOT, CLEAVE or STRIKE.",
    },
    {
      id: "ambush",
      keyword: "AMBUSH",
      description:
        "Monster teleports to any unoccupied space adjacent to its target of that target's choice. Suffers from terrain landed on.",
    },
    {
      id: "attack-twice",
      keyword: "ATTACK TWICE",
      description:
        "Monster moves once then attacks two times. Each attack is resolved separately (includes reactions). If character is out of range between attacks, the monster may choose another target for second attack as long it doesn't have to move.",
    },
    {
      id: "aura",
      keyword: "AURA",
      description:
        "A hero can only have one and is removed when the hero is KNOCKED OUT and receives a TRAUMA CUBE. (Not removed during Camp Phase)",
    },
    {
      id: "aura-token",
      keyword: "AURA (TOKEN)",
      description:
        "As a Resolution effect, a Hero is often instructed to write down an Aura on their Campaign Log or Companion App. You can keep this token on your board as a tactile and visual reminder that you have a special effect noted there. Aura tokens are Reminder tokens and were introduced in Apocalypse.",
    },
    {
      id: "available",
      keyword: "AVAILABLE",
      description:
        "Available refers more to a game term than necessarily a Keyword. An Available Skill, for example, is a Skill learned by a Hero that does not have its slot currently occupied (either by an Action Cube, Curse Cube, or Trauma Cube). An Available Resolution, in turn, is a Resolution that has not yet been chosen in a Charged Interaction or has not been declared “unavailable” by some effect.",
    },
    {
      id: "avoid",
      keyword: "AVOID",
      description:
        "Avoid is not properly a Keyword, however, it is a new term in relation to the Corebox, so it is worth clarifying. “Avoid” is used to indicate that you do not suffer some effect, much as PREVENT would, but since PREVENT is a Keyword, the adoption of a different term is necessary.",
    },
    {
      id: "bash",
      keyword: "BASH",
      description:
        "Bash is a trait characteristic of the Hero Andreas. Whenever a Skill has Bash, at the moment you are about to resolve the effect containing the Bash Keyword, you may discard 2 Shield tokens. If you do, add the effect described between the “[]” to your Skill resolution. Otherwise, you must resolve that Skill without considering it a part of the effect.",
    },
    {
      id: "bear-trap",
      keyword: "BEAR TRAP",
      description: "All enemies in AREA take 2 non-preventable Damage, BLEED 2, DISCARD.",
    },
    {
      id: "bot",
      keyword: "BEGINNING OF TURN (BOT)",
      description:
        "BOT is an abbreviation used to describe the “Beginning of Turn” moment of time, when some Characters’ special abilities are triggered, right after they suffer the effects of the Conditions they possess that also trigger at the beginning of their turn.",
    },
    {
      id: "bleed",
      keyword: "BLEED X",
      description:
        "The Target takes X BLEED tokens. At the beginning of that character's next turn, it takes 1 non-preventable damage for each BLEED token it has and then removes all of them from its board. BLEED is a stackable Condition.",
    },
    {
      id: "blindness",
      keyword: "BLINDNESS",
      description:
        "This is a special ability that a few Monsters possess and that turns them into very dangerous enemies. When a Character suffers BLINDNESS, they must take a BLIND token and keep it on their board. While holding a BLIND Token, the Character automatically misses any weapon attack if their natural d20 roll is 10 or lower, even if they have succeeded on their Weapon's Accuracy check. BLINDNESS is a Redundant Condition that lasts until the Character takes a Recall Action or it is removed by a CLEANSE effect.",
    },
    {
      id: "bloodseeker",
      keyword: "BLOODSEEKER",
      description:
        "A Monster with Bloodseeker Targets the Weakest Hero (The one with the lowest Health at the moment) as its Primary Target.",
    },
    {
      id: "bounty",
      keyword: "BOUNTY",
      description:
        "Bounty replaces and updates the “LOOT” Keyword that Companions had in Age of Darkness. Therefore, when a Monster is defeated by an attack that has BOUNTY, that Monster drops a LOOT token when removed from the board (LOOT tokens are Ground Movable Objects that can be collected with a Minor Action; when collecting Loot, a Hero draws a Chest card, but does not roll the Trap Die).",
    },
    {
      id: "brittle",
      keyword: "BRITTLE",
      description:
        "Some attacks are capable of leaving their opponents vulnerable. When a Character suffers Brittle, they must take a Brittle token and keep it on their board. If they are a Hero, Pet, or Companion of any sort, the next time they suffer damage from any source, they will suffer double that damage and remove their Brittle token (remember, suffered damage is the damage taken that was not prevented). If they are a Monster, the next weapon or magic attack that hits them turns into a Critical Hit and removes their Brittle token. Brittle lingers until it is removed or is triggered as described. It is a Redundant Condition.",
    },
    {
      id: "burn",
      keyword: "BURN X",
      description:
        "The Target takes X BURN tokens. At the beginning of that character's next turn, it takes 1 non-preventable damage for each BURN token it has and then removes one of those tokens from its board. BURN is a stackable Condition.",
    },
    {
      id: "cancel",
      keyword: "CANCEL",
      description:
        "Cancel is a term that has come to be associated with Interruptions due to their ability to respond to an attack while it is being delivered, rather than after it has already hit its target. When an attack is Canceled, this means that it no longer exists and doesn’t cause damage to any of its targets anymore. Characters who have already used Interrupts for a Canceled attack are still considered to have used those abilities, but after the attack is Canceled, no other Characters can use an Interrupt (and of course, no Reactions) against that attack.",
    },
    {
      id: "cast",
      keyword: "CAST",
      description:
        "This term is used to define the moment when an effect is applied in the game, often related to the Character responsible for causing it. So, when your Hero spends one of their Action Cubes to use a Battle Focus Skill, for example, that Hero is casting a FOCUS 1 AND CLEANSE 1 effect.",
    },
    {
      id: "catalyze",
      keyword: "CATALYZE",
      description:
        "This is a Keyword designed to condense an effect into a single word, saving text space. When a Hero Catalyzes, it means that the next Action Cube they use this turn (current turn only) is treated as a Wild Cube (if it is used to use a Hero Skill, treat all numbers written in their numerical form as if they were doubled). Wild Cubes can be used as if they were any color, but it is important to remember that the Range for the effects of a Skill activated using a Wild Cube is based on its Type (i.e., a Melee Skill activated through a Wild Cube still has Melee Range).",
    },
    {
      id: "chain-up",
      keyword: "CHAIN-UP",
      description:
        "Monsters with this skill specialize in capturing Heroes. At the beginning of their turn, immediately after suffering the effects of any Condition that might be affecting them, a Monster with Chain-Up targets the Strongest Hero who is not adjacent and within Range 1 (if there is such a Hero). That Hero suffers 2 non-preventable damage and is dragged to an empty square of their choice that is adjacent to the Monster with Chain-Up. If there is no space for them, the Hero suffers 4 non-preventable damage instead of 2, but they are not dragged.",
    },
    {
      id: "channel",
      keyword: "CHANNEL",
      description:
        "As long as a Skill with Channel has an Action Cube occupying its slot (not when it is blocked by a Curse Cube or Trauma Cube), the passive bonus described in “Channel - Effect” takes effect as if it were a Passive Skill. This benefit is also applied to the very Skill that generated it. It lasts until this Action Cube is recalled.",
    },
    {
      id: "character",
      keyword: "CHARACTER",
      description:
        "Heroes, Monsters, Pets, NPCs, Companions and so on. All can receive effects like PREVENT, but only characters with cards or boards can hold Conditions or Resources. Characters are Movable Solid Objects for rules purposes.",
    },
    {
      id: "charge",
      keyword: "CHARGE",
      description:
        "Some Monsters have the ability to charge their enemies to maximize their attacks. Whenever a Monster with this ability moves 3 or more squares in order to reach their target, consider the base damage value of this attack as if it were double. Remember: Monsters will always move the least amount of squares they can in order to reach their targets or seek a position on top of Darkness. Despite this ability, Monsters are not smart enough to take the longest way to reach their target and receive this bonus. Their behavior remains the same: they move as few squares as possible to the target unless they can finish the movement upon Darkness or can avoid harmful terrain while doing so. Darkness damage boost, as well as damage reducers like Intimidate, are counted after this base value has been determined.",
    },
    {
      id: "charm",
      keyword: "CHARM",
      description:
        "By enchanting the simple-mindedness of a Creature of Darkness, a Hero can force it to attack its own allies. When a Monster is Charmed, the player who bewitched it immediately activates that Monster and controls its turn. In this way, you can force it to attack its own allies, move through harmful terrain, or position them in a disadvantageous or inefficient way. However, while fighting to keep control of its own mind, a Monster is weaker: its attack deals only half (round up) of the damage it would normally (collateral damage is applied as normal). Darkness damage boost, as well as damage reducers like Intimidate, are counted after this base value has been determined.",
    },
    {
      id: "claim",
      keyword: "CLAIM",
      description:
        "Claim is a typical Warlord effect, representing their ability to coordinate the assaults of their allies. When a Hero uses Claim, they place (or replace) the Banner on an empty square that is adjacent to them. While under the influence of a Banner, as a Minor Action, a Hero may discard an INSPIRATION token to make a Weapon Attack of +0 HIT. For rules purposes, all squares that are adjacent to a Banner are considered “Under the Banner”. Finally, Banners are Movable Solid Objects considered Furniture and, therefore, can be crushed by Large Monsters and cause 2 DMG AND BLEED 2 if they are thrown at a Character.",
    },
    {
      id: "cleanse",
      keyword: "CLEANSE X",
      description:
        "Target removes up to X CC and all POISON from its board. <br><br> \
        *Apocalypse updated CLEANSE as follows:* <br><br>\
      The target removes up to X Curse Cubes or Condition Stacks from its board. A Stack is: all tokens of the same kind the Character has. For each CLEANSE point received, that Character may choose to remove a Curse Cube or a Condition Stack. They don’t have to spend all the points the same way.",
    },
    {
      id: "cleave",
      keyword: "CLEAVE X",
      description: "Target up to X enemies adjacent to attacker as single Attack Roll.",
    },
    {
      id: "command",
      keyword: "COMMAND",
      description: "Activates the next Strongest Monster (not itself), then continues its turn.",
    },
    {
      id: "command-draugr",
      keyword: "COMMAND A DRAUGR",
      description:
        "To Command a Draugr means to activate a Draugr of your choice that is already on the board. Unlike other Pets, Draugrs cannot be “Raised” through a “Command” effect or vice-versa. For them, these effects act independently. Other than this detail, Draugrs follow the same rules as a Pet when it comes to their turns and for other rules purposes.",
    },
    {
      id: "command-a-pet",
      keyword: "COMMAND A PET",
      description:
        "Command a Pet is an effect similar to Activate a Pet, with the restriction that it can never be used to invoke a Pet on the board. So, when you Command a Pet you have summoned, you must choose a Pet that is already on the board and that is affiliated with you to Activate. An activation through this effect consists of a Move Action followed by a normal Attack Action. Similarly, any Conditions that this Pet has at the time it is activated are triggered. If another effect that allows you to summon a Pet on the board is triggered at the same time you would Command a Pet, you can choose to resolve it first",
    },
    {
      id: "companions",
      keyword: "COMPANIONS",
      description:
        "Activates after the hero they follow, Move then Attack. Will only be attacked if no hero is in range. Top left number is STURDINESS. Can hold SHIELDS and receive PREVENT effects. Discharged during Camp Phase.",
    },
    {
      id: "copy",
      keyword: "COPY EFFECT",
      description:
        "Copies effect of another Hero skill including its base color (range). **Dungeon Roll Skills, Equipment Skills and Reactions, unless stated otherwise, cannot be copied.**",
    },
    {
      id: "counter",
      keyword: "COUNTER X",
      description:
        "Some Monsters are versed in the art of fencing and know how to take advantage of a Hero's slip-ups when fighting them. Whenever a Hero misses a Weapon Attack against a Monster that has this ability (an attack is only considered a miss after using their reroll abilities), the Monster swings their weapon around, causing the described amount of non-preventable damage to all enemies of the Monster that are adjacent to it.",
    },
    {
      id: "cover",
      keyword: "COVER",
      description:
        "Some protective abilities that Heroes possess go beyond just mitigating damage; they can also change the target of an attack. When a Character Covers the target of an attack, they redirect that attack to themselves, becoming the new target of that attack. Any Prevent effect that comes with a Cover effect is also redirected to the new target of that attack. If an attack is targeting you and another target at the same time, you can still Cover that other Character, but you will suffer both attacks as if you had been targeted by it twice.",
    },
    {
      id: "covetous",
      keyword: "COVETOUS",
      description:
        "A Monster with Covetous Targets the Hero that is holding more Resource tokens (FOCUS, SHIELD, and KI are examples) as its Primary Target. If two Heroes are tied with the same number of Resource tokens, a Monster with Covetous targets the one among them who occupies the fastest Initiative Slot.",
    },
    {
      id: "crit-x",
      keyword: "CRIT X+",
      description: "Roll X or more on D20 gives Critical Hit (x2 DMG). Does not inflict double conditions.",
    },
    {
      id: "cube-action",
      keyword: "CUBE ACTION (CA)",
      description:
        "Spending an AC. A hero can perform 2 AC per turn and may use other actions before, between or after each AC. Reactions do not count.",
    },
    {
      id: "cube-range",
      keyword: "CUBE RANGE (CR)",
      description:
        "Defined by color of cube used. Yellow (Melee) = Target on an adjacent SQUARE. Red (Ranged) = Target on any SQUARE up to 1 AREA away. Green (Agility) / Blue (Wisdom) = Target at any distance.",
    },
    {
      id: "curse-cube",
      keyword: "CURSE CUBES (CC)",
      description:
        "Black cubes that are allocated to Hero or Dungeon Roles skills which block their use. Hero is corrupted upon receiving a 6th CC and ends the adventure. ",
    },
    {
      id: "curse",
      keyword: "CURSE X",
      description: "Target gains X CC as an effect.",
    },
    {
      id: "darkness-behavior",
      keyword: "DARKNESS BEHAVIOR",
      description:
        'Tries to reach the Strongest Hero not on top of Darkness. "Crush": If all Heroes are already on top of Darkness when a Rune is drawn, Skip spawning tile and all Heroes take N Damage. (N = Number of Heroes).',
    },
    {
      id: "darkness-effect",
      keyword: "DARKNESS EFFECT (STANDING ON IT)",
      description:
        "Deals 2 non-preventable Damage to a Hero (once per turn), Companion or Pet caught by it when spawned; stepped on it for first time in a turn; or ended their turn on top of it. Heroes: Imposes a -2 HIT penalty. Monsters: Gives +2 DMG bonus.",
    },
    {
      id: "defiant",
      keyword: "DEFIANT",
      description:
        "A Monster with Defiant Targets the Most Vigorous Hero (the one with most available Action Cubes at the moment) as its Primary Target.",
    },
    {
      id: "devourer",
      keyword: "DEVOURER",
      description:
        "Monsters with this ability show atypical behavior. They prioritize looking for prey rather than victims. Therefore, such Monsters have Injured NPC tokens as their Primary Target instead of the Heroes. When they attack one of these tokens, they immediately slay them, satiating their bloodthirst. This, however, is not a good thing: After doing so, these Monsters complete their purpose and their bodies undergo a hideous mutation. Replace the Rotten Flesh model with an Abomination model and flip over the Unstable Devourer card. It gains 12 Health (this Health can exceed its maximum total) and becomes a Ravenous Abomination. If there are no Injured NPCs on the board (if your party has rescued them all, for example) this Monster’s behavior shifts to the standard: the Strongest Hero in range.",
    },
    {
      id: "difficult-terrain",
      keyword: "DIFFICULT TERRAIN",
      description:
        "A character that is affected by Difficult Terrain (like Water) loses 1 movement point from its current move effect. As with any harmful terrain, a character can only be affected by Difficult Terrain once per turn.",
    },
    {
      id: "disarm",
      keyword: "DISARM",
      description: "(Counts as FATIGUE) EXPEND all available Melee and Ranged AC.",
    },
    {
      id: "discard",
      keyword: "DISCARD",
      description: "Remove that thing from your board.",
    },
    {
      id: "drain-health",
      keyword: "DRAIN HEALTH",
      description: "Target loses X amount of health and caster gains it. Reactions cannot be used.",
    },
    {
      id: "empower",
      keyword: "EMPOWER",
      description:
        "Concentrating your energy, you prepare to deliver a powerful blow. When you Empower, the next single Weapon Attack or Spell Attack you make this turn gains +4 DMG. Note that this effect lasts only until the end of this turn or when you make your next Weapon Attack or Spell Attack (even if you miss), whichever comes first. If an effect allows you to make two or more separate Weapon Attack as part of the same Action, the Empower effect is only applied to the first of them (Cleave is a single hit that affects two or more targets, so this bonus applies to all of them).",
    },
    {
      id: "eot",
      keyword: "END OF TURN (EOT)",
      description:
        "EOT is an abbreviation used to describe the “End of Turn” moment of time, when some effects are triggered, such as those that last until the end of the Character’s turn. The End of Turn is exactly the last thing that happens in a turn, before the Initiative 81 Marker is moved forward: it triggers right after a Hero has completed all their Actions and chooses whether or not to take a Willing Recall Action. If some effect triggers because of this Recall Action, the End of Turn occurs immediately after the resolution of that effect",
    },
    {
      id: "enemy",
      keyword: "ENEMY",
      description: "Any character that is not in your party or an NPC. Heroes are monster's enemies.",
    },
    {
      id: "engaged",
      keyword: "ENGAGED",
      description: "When a Character is adjacent to an Enemy. Ranged Attacks and most Minor Actions are not allowed.",
    },
    {
      id: "enrage",
      keyword: "ENRAGE",
      description:
        "Some Monsters have a taste for battle that grows as they inflict wounds on their enemies. Whenever a Monster possessing this ability as Collateral Damage can reduce a Character’s Health or remove a Special Character (Pet, Companion, or any other kind of ally) from play with an attack, it gains a +1 DMG token. If the Monster has Attack Twice, the second attack made on its activation may do more damage, since this Monster may receive a +1 DMG token as a result of the first attack.",
    },
    {
      id: "entropy",
      keyword: "ENTROPY",
      description:
        "Specialists in spellcasting can bring about miraculous transformations in their spells by releasing large amounts of energy. Whenever they do, the energy oscillation resulting from this process generates what we call Arcane Entropy, or just Entropy. When a Hero has 4 of these tokens, they can discard them to provoke an Entropy Burst and do one of two things: As a Minor Action, to gain an additional Cube Action this turn; Or to gain an additional Reaction against the current Threat. Entropy is a stackable Resource token.",
    },
    {
      id: "evolve",
      keyword: "EVOLVE",
      description: "Monster gains +2 DMG and +1 MOVE.",
    },
    {
      id: "expend",
      keyword: "EXPEND",
      description:
        "Move an available AC to Expended AC box on hero board. Expended AC can be recalled but not used for skills while there.",
    },
    {
      id: "falling-damage",
      keyword: "FALLING DAMAGE",
      description: "Character suffers 2 non-preventable Damage when descending two levels in a single step.",
    },
    {
      id: "fatigue",
      keyword: "FATIGUE X",
      description: "Target must expend X (or as many as possible) of their available AC for no effect.",
    },
    {
      id: "fine",
      keyword: "FINE",
      description:
        "Fine is a term created to condense a larger game state into a single word: a Fine character is one who currently has half or more of their maximum Health (rounded up). Fine is the opposite of Wounded. For example, As long as a Hero with 15 maximum Health has 8 or more HP, they are Fine. If they have 7 or less HP, they are Wounded. A Character may be considered both Wounded and Fine when it has exactly half its maximum Health.",
    },
    {
      id: "fire-trap",
      keyword: "FIRE TRAP",
      description: "All enemies in AREA take 2 non-preventable Damage, BURN 4, DISCARD.",
    },
    {
      id: "flyby",
      keyword: "FLYBY",
      description:
        "This pet freely returns to a SQUARE of their choice adjacent to its master after attacking. Only affected by terrain/Darkness once landed.",
    },
    {
      id: "focus",
      keyword: "FOCUS X",
      description:
        "The Target gains X FOCUS tokens, which they can later spend to use Focus Abilities. FOCUS is a stackable resource.",
    },
    {
      id: "free-recall",
      keyword: "FREE RECALL ACTION",
      description: "Hero takes a RECALL ACTION without taking a CC penalty.",
    },
    {
      id: "fruit-of-life",
      keyword: "FRUIT OF LIFE",
      description:
        "With a Use Consumable Item Minor Action, a Character holding a FRUIT OF LIFE may discard it to: SELF, REGAIN 2 HEALTH. Additionally, these fruits are considered items and may be exchanged with other Heroes like any other item would normally be, but they do not occupy any bag space. FRUIT OF LIFE is a stackable resource.",
    },
    {
      id: "fury",
      keyword: "FURY",
      description:
        "When you hit with a Spell Attack or Weapon Attack, you may discard 1 FURY to add +1 DMG to your Attack. You may discard only 1 FURY token per turn or Reaction (If you have an ability that is also a Reaction, for example). FURY is stackable resource.<br><br> \
        *Apocalypse updated FURY as follows:* <br><br>\
        When you hit with a Spell Attack or Weapon Attack, you may discard 1 FURY to add +1 DMG to your Attack (no action required). You may discard 1 FURY token for each individual Weapon Attack or Spell Attack you make, which can be more than once per tur. FURY is a stackable resources.<br><br>\
        **NOTE:** Whenever you discard 1 Fury in order to boost an attack that targets more than one Character at once (CLEAVE and STRIKE, for instance) the bonus damage is dealt to each target. You don't need to discard 1 Fury token for each Character targeted this way.",
    },
    {
      id: "heal",
      keyword: "HEAL X",
      description: "Target regains X Health that cannot exceed max Health.",
    },
    {
      id: "heavy-wield",
      keyword: "HEAVY WIELD",
      description:
        "Weapons that have the Heavy Wield property are harder to handle, but usually do more damage when they hit. While you are equipped with a Weapon that has Heavy Wield, you can make only a single Weapon Attack from each Weapon Attack action you take or receive. So, you can't make two Weapon Attack from a single Cube Action (as you would with the Twin Strike Skill, for example), Focus Ability, Class Ability, or Command you take or receive while using these weapons. But you can, for example, make a Weapon Attack through each of your two Cube Actions and a third through your Focus Ability or by spending a KI token.",
    },
    {
      id: "idol",
      keyword: "IDOL",
      description:
        "Idols are figures that possess magical properties which Heroes are able to summon to aid them in battle. When an Idol is Invoked, the Hero places or repositions (if that Idol is already on the board) its matching token on the center intersection of the area (blue square) they are in or in an area adjacent to it. Take note that just Invoking an Idol does not activate its effects immediately (Shamans have a class ability that allows them to do this as a special power). Once placed, the Idol is considered an Immovable Ground Object, meaning that it can’t be moved by any means, including Telekinesis. Each Idol has a power that can be Evoked by any Hero (not only the casting one) within Range 1 of that Idol using a Minor Action and spending any combination of 2 Resource tokens",
    },
    {
      id: "immunity",
      keyword: "IMMUNITY",
      description:
        "This character cannot be affected by the conditions/effect. Stealth immunity means they can target that unit and cannot be surprised (x2 DMG).",
    },
    {
      id: "inflict",
      keyword: "INFLICT",
      description:
        "This is the term used to designate an effect (usually Conditions) applied by a casting Character against a target Character without giving them a chance to defend themselves, similar to what non-preventable damage would do. Thus, an Inflicted effect does not generate any Attack or Threat (even if it comes from an Attack card, for example), not allowing Characters to use their Interrupts and Reactions to defend themselves. Remember, if a Character is immune to a Condition, naturally, such Condition does not affect it when it is Inflicted on it.",
    },
    {
      id: "inspire",
      keyword: "INSPIRE",
      description:
        "Representing a morale boost, when a Hero becomes Inspired, they receive an Inspiration token. By discarding one of these tokens (no action required) a Hero can reroll any d20 roll they have just made, taking the second result even if it is lower than the first. Inspiration is a redundant Resource.",
    },
    {
      id: "interact",
      keyword: "INTERACT",
      description:
        "Interactions are situations that happen during an Adventure in which your Hero can (or should) intervene. Some Interactions will be presented to your party through in-game effects, but most of them will be found on the board as Interaction tokens.",
    },
    {
      id: "interact-barrel",
      keyword: "INTERACT (STACK OF BARRELS)",
      description:
        "Dwarves and Halflings (only those) can get inside barrels and use them as hiding places. To stop hiding, the Hero will need to use another Minor Action.<br><br>\
        - When a Hero enters a barrel, remove their model from the board. While there, they won't be able to target, or be targeted, by other Characters with any attack or effect. <br>\
        - Monsters know that the Heroes are there. However, they must destroy the barrel before attacking them. Thus, when a Monster attacks a character inside the barrel, PREVENT all damage that this attack would cause and remove the barrel from the board. Reposition the Hero's model (the one that was hidden) in the square where the barrel was. <br>\
        - If a Large Monster steps on a barrel with a hidden Hero, break that barrel and Shove the Hero aside. That Hero suffers 2 non-preventable damage.",
    },
    {
      id: "interact-bookshelf",
      keyword: "INTERACT (BOOKSHELF)",
      description:
        "When a Hero interacts with a Bookshelf, they can search the Chest deck for a Scroll card and keep it or immediately use it as a Free Action, as if they had just drawn it from the Chest deck. Afterwards, remove the Bookshelf from the board.",
    },
    {
      id: "interact-chest",
      keyword: "INTERACT (CHEST)",
      description:
        "When a Hero interacts with a Chest: <br><br>\
        - They draw a card from the top of the Chest deck. That Hero can choose to consume that Item immediately as a Free Action or store it in their bag (if there is room).<br>\
        - Finally, when searching a Chest, the Hero must roll the Trap Die and suffer the effect.",
    },
    {
      id: "interact-pile-of-crates",
      keyword: "INTERACT (PILE OF CRATES)",
      description:
        "Piles of Crates are not good for anything in particular. They count as obstacles until they are destroyed or thrown.",
    },
    {
      id: "interact-stone-fountain",
      keyword: "INTERACT (STONE FOUNTAIN)",
      description:
        "When a Hero interacts with a fountain, they flip the Concoction token up, apply its effects, then discard it. There are three possible effects:<br><br>\
        **Fresh Water** (Blue): Nothing tastes better to calm rampant emotions! The drinking Character Regains 2 Health and gains CLEANSE 2.<br><br>\
        **Empowerment Potion** (Orange): Search and you will find! The drinking Character gains INSPIRE and EMPOWER, and they may also take an additional Cube Action this turn. If they are a Large Monster, they just gain a +4 DMG Boost during this turn instead. <br><br>\
        **Toxic Inoculation** (Green): The taste is even worse than the effect... The drinking Character suffers POISON 4.",
    },
    {
      id: "interact-stone-pillar",
      keyword: "INTERACT (STONE PILLAR)",
      description: "Stone Pillars are of no use for anything in particular. They just represent a rigid obstacle.",
    },
    {
      id: "interrupt",
      keyword: "INTERRUPT",
      description:
        "This Skill can only be used in response to a Character being targeted by an Attack, but before the targeted Character spends SHIELD tokens and a threat is generated. Thus, Interrupts are “faster” than Reactions. When using an Interrupt, a Character will not be able to use a Reaction against any threats generated by the attack they have interrupted, as if they had already “reacted” to that attack. Interrupts, also, cannot target attacks that deal non-preventable damage, and they are not considered Reactions for triggering abilities such as **Caltrops**, for example. A Hero can take only one Interruption per attack, regardless of how many Characters were targeted by it.",
    },
    {
      id: "intimidate",
      keyword: "INTIMIDATE X",
      description:
        "Character has -X DMG for each INTIMIDATE token they are holding. Unlike other Conditions, INTIMIDATE does not take effect at the beginning of their next turn, it lingers until removed instead. The next time the affected character makes an Attack (either a Weapon Attack or a Spell Attack), whether it hits or misses, it removes all INTIMIDATE tokens they are holding. INTIMIDATE is a stackable Condition.",
    },
    {
      id: "jump",
      keyword: "JUMP X",
      description:
        "Same as MOVE X but only affected by terrain landed on and can move through enemies. Not affected by FALLING DAMAGE. Climbing up 2 levels still costs 2 movement.",
    },
    {
      id: "ki",
      keyword: "KI",
      description:
        "You may discard a KI to make a Weapon Attack with +0 HIT. Regardless if you have spent a KI to make a Weapon Attack or to use any other ability you have learned, you may only discard one KI per turn or Reaction (If you have an ability that is also a Reaction, for example). KI is stackable resource.",
    },
    {
      id: "killing-blow",
      keyword: "KILLING BLOW",
      description:
        "Killing Blow is not necessarily a Keyword, but it is a term worth clarifying. The Killing Blow is the attack (and in this case it is necessarily an attack, Condition damage doesn't count, for example) that is responsible for defeating the Monster. If an effect Slays a Character, naturally, it also delivers the Killing Blow, since the term Slay specifies that it defeats the Character even though it doesn't reduce its Health to 0. **NOTE:** For a Monster to be defeated, it must be removed from the board. If an effect reduces a Monster's Health to zero, but does not cause it to be removed from the board (as happens if Special Mechanic - Shared Lifeline is in progress, for example), the attack is not considered a Killing Blow.",
    },
    {
      id: "keen",
      keyword: "KEEN",
      description:
        "In this second generation, we have replaced the Keyword CRIT 16+ with “Keen”. The effect remains the same: If you roll a natural 16 or more on the d20, you score a Critical Hit. With the introduction of Upgrade Skills and the Warlock Trait update, interactions with Wild Cubes will be more common, and doubling the numeric value “16+” (supposedly to “CRIT 32+”) is aesthetically displeasing as well as representing a detriment to the Skill rather than a benefit. Thus, we deemed it appropriate to turn this benefit into a Keyword to avoid this problem.",
    },
    {
      id: "knock-down",
      keyword: "KNOCK DOWN",
      description:
        "The Target receives a KNOCK DOWN token. Unlike other Conditions, KNOCK DOWN does not take effect at the beginning of the character's next turn, it lingers until removed instead. The next time the affected character receives a Move effect, it cancels that effect and removes their KNOCK DOWN token from their board. KNOCK DOWN is a redundant Condition.",
    },
    {
      id: "knock-out",
      keyword: "KNOCK OUT",
      description:
        "Some Skills will risk everything in exchange for victory. When a Hero receives a Knock Out effect, they are immediately knocked out as if they had their Health reduced to zero (they must lay their model down, take a Trauma Cube, and everything else as described in the Rulebook on page 15). An effect with Knock Out is final. That is, no effect can prevent you from being Knocked Out in this way.",
    },
    {
      id: "large-monster",
      keyword: "LARGE MONSTER",
      description:
        "This Monster is considered Large (even if its base is small-sized). A Large Monster is immune to KNOCK DOWN, PUSH, STUN, and TELEKINESIS.",
    },
    {
      id: "learn",
      keyword: "LEARN",
      description:
        "During the Campaign, the terms used to represent your Hero's progression by acquiring a new Skill or Class Ability was “Learns and Unlocks”. From now on, this term has been simplified to just “Learn”, but its purpose is the same. So, when your Hero learns a Hero or Role Skill Level 1, they must choose a Level 1 Skill from their Hero or Role, take its respective card and Action Cube, and add them to their Hero Board.  \
        <br /><br /> \
        **NOTE:** It is important to remember that a Hero cannot Learn a Hero or Role Skill of Level 2 if they have not learned a Level 1 Skill belonging to that same Skill Tree or Dungeon Role, as already mentioned in the Corebox Rulebook. When a Hero learns a Class Ability, they take the matching card—if it is the Level 1 Ability for that Class Tree—and a White Cube. They place the card beside their board and the cube on the appropriate space to mark the Class Ability they have learned.  \
        <br /><br /> \
        **NOTE:** Likewise, it is important to remember that a Hero cannot Learn a Class Ability of Level 2 or 3 if they have not learned a Class Ability of Level 1 or 2 (respectively) belonging to that same Class Tree.",
    },
    {
      id: "loot-tokens",
      keyword: "LOOT (TOKENS)",
      description:
        "Loot tokens are Movable Ground Objects that can be picked up by Heroes who are adjacent to or on top of them with a Minor Action. When they do, they draw the top card of the Chest deck, but do not have to roll the Trap Die: Loot is always safe. Like a Chest, the moment a Hero draws a Consumable Item, they can choose to use it immediately as a free action. Otherwise, they keep that card in their bag.",
    },
    {
      id: "loot",
      keyword: "LOOT",
      description:
        "If this companion deals the killing blow to an enemy, replace the Target with a Chest. It is safe (no Trap die on opening) and is only an OBJECT (not SOLID).",
    },
    {
      id: "maelstrom",
      keyword: "MAELSTROM",
      description:
        "On Overlord's activation, you shuffle their Attack cards back into the deck and draw a new set (one per Hero).",
    },
    {
      id: "manifest",
      keyword: "MANIFEST",
      description:
        "Randomly take one Rune from the bag and reveal it, triggering the effect. Does not spawn Darkness and is placed back in the bag.",
    },
    {
      id: "mending",
      keyword: "MENDING X",
      description:
        "Monsters with this ability are field doctors in the enemy's service, keeping their allies ready for another round. When this ability is triggered, another weaker Monster (the Monster with the lowest Health at the time) within range 1 of the casting Monster regains X Health (this Health cannot exceed its maximum). If two or more Monsters are tied, the one that occupies the highest color slot on the Monster Status board between them will be the chosen target (yellow is higher than dark blue, for example). If there is no other Monster within Range 1 of the caster, a Monster cannot use Mending on itself.",
    },
    {
      id: "mindlock",
      keyword: "MINDLOCK",
      description:
        "Monsters with this ability are able to interfere with the Heroes thoughts just by being in their presence. While a Monster with this ability is on the board, no Hero can spend (blue) Wisdom Action Cubes to use Skills. They can still Expend these cubes to take Tie-Breaker Actions, additional Minor Actions, additional Move Actions, and so on.",
    },
    {
      id: "most-corrupted-hero",
      keyword: "MOST CORRUPTED HERO",
      description:
        "The Hero with the most Curse Cubes is the Most Corrupted Hero. If two Heroes are tied with the same number of Curse Cubes, the Most Corrupted one among them will be the one who occupies the fastest Initiative Slot.",
    },
    {
      id: "most-tired-hero",
      keyword: "MOST TIRED HERO",
      description:
        "The Hero with the fewest available Action Cubes is the Most Tired Hero. If two Heroes are tied with the same number of available Action Cubes, the Most Tired one among them will be the one who occupies the slowest Initiative Slot.",
    },
    {
      id: "most-vigorous-hero",
      keyword: "MOST VIGOROUS HERO",
      description:
        "The Hero with the most available Action Cubes is the Most Vigorous Hero. If two Heroes are tied with the same number of available Action Cubes, the Most Vigorous one among them will be the one who occupies the fastest Initiative Slot.",
    },
    {
      id: "move",
      keyword: "MOVE X",
      description:
        "Target may move up to X SQUARES orthogonally or diagonally. Cannot pass through SOLID OBJECTS or ENEMIES but can pass through not land on allies. Movement may be interrupted to do a Minor Action then continued, but using a CA or REACTION will lose remaining movement points.",
    },
    {
      id: "multishot",
      keyword: "MULTISHOT X",
      description:
        "Character fires a single Ranged Attack at X different Targets within Range. Heroes make 1 attack roll.",
    },
    {
      id: "non-preventable",
      keyword: "NON-PREVENTABLE",
      description:
        "This damage cannot be prevented by any kind of effect, including SHIELD and/or PREVENT. Non-Preventable damage is not considered a threat and thus can't be responded to with Reactions.",
    },
    {
      id: "npc",
      keyword: "NPC",
      description:
        'NPC (Non-Player Characters) are the bystanders of a Campaign. Some NPC Tokens are used to represent your Companions on the board, while others just embody generic NPCs as "Villagers" or "Children." Regardless, an NPC Token is a Solid Object and every time they are used, they follow a set of special rules of their own. Each Adventure will describe exactly how these tokens interact with the players and the current Adventure.',
    },
    {
      id: "object",
      keyword: "OBJECT",
      description:
        "Traps, Darkness tiles, or others specified as such. Characters can pass through and end movement on them.",
    },
    {
      id: "overpressure",
      keyword: "OVERPRESSURE",
      description:
        "Some Monsters possess eldritch energy so powerful that they distort space-time and often emanate disrupting vibes. Therefore, while a Monster with this ability is on the board, no Hero can take Minor Actions except for “Use a Consumable Item” if they are taking this action to drink a potion.",
    },
    {
      id: "outcome",
      keyword: "OUTCOME",
      description: "Only erased when commanded by another Interaction resolution.",
    },
    {
      id: "passive",
      keyword: "PASSIVE",
      description:
        "Ability is always active (including Commander Attack cards) unless blocked by TRAUMA CUBE or CURSE CUBE.",
    },
    {
      id: "pay-life",
      keyword: "PAY X LIFE",
      description: "Hero takes X Damage to apply benefits. Cannot use if X > current Health.",
    },
    {
      id: "penitence",
      keyword: "PENITENCE",
      description: "Target takes 1 non-preventable Damage per CURSE CUBE.",
    },
    {
      id: "pet",
      keyword: "PET",
      description: "Some Heroes have companions and each one of them has its own token and a card with its attributes.",
    },
    {
      id: "poison",
      keyword: "POISON",
      description:
        "The Target takes X POISON tokens. At the beginning of that character's next turn, it takes 1 non-preventable damage for each POISON token it has. Unlike BLEED or BURN, POISON is not removed after dealing its damage. However, whenever a character receives a CLEANSE effect, it also removes all POISON affecting it. POISON is a stackable Condition.",
    },
    {
      id: "poison-trap",
      keyword: "POISON TRAP",
      description: "All enemies in AREA take 2 non-preventable Damage, POISON 2, DISCARD.",
    },
    {
      id: "polymorph",
      keyword: "POLYMORPH",
      description:
        "There is nothing more satisfying than ridiculing a threat, turning a once-powerful enemy into a defenseless capybara! In order to emulate this effect with its proper glamour in the AoD System, you will need to follow some more preparation steps. However, do not worry: once one understands the concept of this effect, such steps become intuitive! When a Character suffers Polymorph, you must replace their model with a capybara, facing the direction of your choice, and give them a Polymorph Condition token. Take note that the direction these Characters face is important: When manipulating these Characters again, do not change their facing (unless it's specified to do so). The rulebook explains the conecpt fully.",
    },
    {
      id: "polymorph-simple",
      keyword: "POLYMORPH (SIMPLE)",
      description:
        "If you have tried the mechanics of Polymorph and still consider them to be too complicated, you can, as a house rule, ignore the use of the Errant Behavior deck and the capybara model. You can then establish that the Polymorphed Character simply can’t take actions during their turn. Instead, at the beginning of each of their activations, they must roll the d20 to see what happens that turn: <br> \
        - If they roll 11+, they break free from the Polymorph, but do not act this turn. <br>\
        - Otherwise, if they roll 10-, they remain Polymorphed. <br><br> \
        Regardless of your choice to proceed either withStandard Polymorph or with Simple Polymorph, the other rules to end this Condition early or to become immune to it remain the same.",
    },
    {
      id: "prevent",
      keyword: "PREVENT X",
      description: "Ignore up to X Damage that would be dealt to target within Range.",
    },
    {
      id: "primary-target",
      keyword: "PRIMARY TARGET",
      description:
        "A Monster's Primary Target is the character it seeks to attack during its turn. All Monsters that follow the Standard behavior have the Strongest Hero as their Primary Target, for example.",
    },
    {
      id: "protect",
      keyword: "PROTECT",
      description: "This character becomes the Target unless already a Target due to CLEAVE, MULTISHOT or STRIKE.",
    },
    {
      id: "push",
      keyword: "PUSH X",
      description: "Push the Target X SQUARES away from the Caster in a straight line. Must be pushed entire length.",
    },
    {
      id: "pushback",
      keyword: "PUSHBACK",
      description:
        "This effect is similar to Push, but it is a version adapted to be used by Monsters. When a Character undergoes Pushback, they must push their model 1 square back, that is, further away from the source that pushed them. Effectively, they will have three squares to which they can be pushed. A Character who has suffered Pushback must always choose an unoccupied space where they can be pushed, even if it is a harmful terrain or if they have to suffer fall damage because they were pushed from a dungeon tray level 2 to 0. If all possible squares are occupied by Solid Objects, the Character cannot be pushed.",
    },
    {
      id: "raise-a-draugr",
      keyword: "RAISE A DRAUGR",
      description:
        "Reusing the evil energy used by the Darkness to make its Creatures, Necromancers can create an army of their own. Raising a Draugr means placing one of them in an empty square of your choice that is adjacent to you, loyal to the Necromancer who summoned it. Unlike other Pets, Draugrs cannot be “Raised” through a “Command” effect or vice-versa. Likewise, the generic effect of “Activate a Pet of your choice” doesn’t work to Raise or Command them. Only the specific effects of Raise a Draugr and Command a Draugr affect these creatures. Other than this detail, Draugrs follow the same rules as Pets when it comes to their turns and other rules purposes. If all four Draugrs are already on the board, a Necromancer can no longer Raise them, only Command them (note that unlike other Pets, an effect that allows you to Raise a Draugr does not allow you to Command a Draugr—these are separate effects for the Necromancer). <br><br>\
      **NOTE:** Draugrs that are raised during the Draugrs turn (the one the Pets have after their masters turn) do not act during that activation. <br><br>\
      **NOTE:** A Necromancer can Raise all four Draugrs, even though they can only sustain two of them during their turn.",
    },
    {
      id: "range",
      keyword: "RANGE X",
      description: "Range is counted using X AREAS away. RECALL X: Recover X Spent or Expended AC.",
    },
    {
      id: "rangers-mark",
      keyword: "RANGER'S MARK",
      description:
        "When a character is Marked, it receives a RANGER'S MARK token. All Weapon Attacks and Spell Attacks made by the Ranger against a character they marked deals +1 DMG. As mentioned earlier, this damage is doubled if the character scores a Critical Hit as normal.",
    },
    {
      id: "reaction",
      keyword: "REACTION",
      description:
        "Skill that can be used in response to a threat (taking preventable damage). Each hero can only use one Reaction per threat. Shields must be applied before and Reactions can still be used even if damage has been reduced to 0.",
    },
    {
      id: "recall",
      keyword: "RECALL X",
      description:
        "You recover to your Available Action Cubes box up to X Spent or Expended Action Cubes from your board.",
    },
    {
      id: "redirect",
      keyword: "REDIRECT",
      description:
        "When an effect instructs you to Redirect an attack to you or another Character, that Character becomes the target of that attack instead. If the Character in question is already being targeted by that attack (as it could be in Multishot, Cleave, or Strike, for example), they suffer it two times, resolving one attack at a time. Redirecting an attack does not generate an additional threat, and thus does not allow an extra Reaction.",
    },
    {
      id: "reckoner",
      keyword: "RECKONER",
      description:
        "A Monster with Reckoner Targets the Most Corrupted Hero (The one with most Curse Cubes at the moment) as its Primary Target.",
    },
    {
      id: "regain-x-health",
      keyword: "REGAIN X HEALTH",
      description:
        "The target recovers X Health. A Character can never gain more Health than their maximum value. Any excess Health is lost. Since this effect is not bound to the Keyword HEAL, your Hero does not receive any bonus from “HEAL +X” abilities.",
    },
    {
      id: "regain-your-breath",
      keyword: "REGAIN YOUR BREATH",
      description: "Recover from being KNOCKED OUT.",
    },
    {
      id: "redundant",
      keyword: "REDUNDANT",
      description:
        "A redundant effect means that a character can only hold one token of that specific effect. If a character would gain a second token for a redundant effect, just ignore it.",
    },
    {
      id: "regeneration",
      keyword: "REGENERATION X",
      description: "Character regains X Health that cannot exceed max Health.",
    },
    {
      id: "relearn",
      keyword: "RELEARN",
      description:
        "Relearn is a term associated with character progression. It can refer to a Hero or Dungeon Role Skill Level 1 or 2, a Skill Upgrade, or the choice of a Dungeon Role, for example. Relearning something means to replace a choice you made regarding that element. So, Relearn a Dungeon Role is a simple process of “swapping” the cards in your Dungeon Role *(keeping your chosen progressions the same as normal)* while Relearn a Skill would be to forget *(remove the progression from)* a Skill you have and choose another in its place *(remember, when Relearning a Hero or Dungeon Role Skill, you will need to adjust your Action Cubes accordingly and may be forced to Relearn the Level 2 Skill associated with that Skill Tree as well).*",
    },
    {
      id: "relentless",
      keyword: "RELENTLESS",
      description:
        "A Monster with Relentless Targets the Most Tired Hero (The one with fewer available Action Cubes at the moment) as its Primary Target.",
    },
    {
      id: "reroll",
      keyword: "REROLL",
      description:
        "When a Skill has REROLL, it means that you get one free reroll of the d20 for one Weapon Attack performed by that Skill that you may choose to use when you miss.",
    },
    {
      id: "resolved",
      keyword: "RESOLVED",
      description:
        "“Resolved” is the term used to denote the end of some game situation. So, when it is mentioned with an effect, it means right after that effect is applied. For example, analyze the following statement about a basic rule regarding Collateral damage: <br><br> \
        *“Collateral effects are applied after the damage is resolved.”* So, if a character Reacts with a Tumble Skill against a Shadow Knight’s attack, they will move before being Knocked Down, since the Tumble Skill (and its Jump 2) must be fully resolved before any Collateral damage applies (if it is applied at all). <br><br> \
        This term can also be found referring to an Interaction or Resolution. When this is the case, you should know which of these two elements it is connected to. This is the key to understanding its meaning. <br><br> \
        *“Until Interaction... is resolved”* means that the Interaction must be done in full; that is, until the Interaction token is removed from the board. This might be because it has run out of charges or an effect has stipulated that it should be removed before that. <br><br> \
        The sentence *“...this Resolution is resolved”* only applies to the Resolution you are reading at that moment. Even if a Resolution is abruptly resolved by its own command, it will still remove 1 charge from the Interaction token (unless it is a Recurring Interaction or the effect itself specifies otherwise, of course).",
    },
    {
      id: "restrain",
      keyword: "RESTRAIN",
      description:
        "Characters with the Restrain ability are armed with natural or artificial restraints and can use this ability to always keep their opponents within range. When a Character is Restrained by an enemy, they receive a Restrain token and cannot leave the space they occupy as long as they hold it. A Character may discard their Restrain token when there are no more enemies with the ability to Restrain them within Range 1. Restrain is a redundant Condition. <br><br>\
        **NOTE:** Characters who are Restrained are able to leave their space through a Swap effect. When this is the case, the Object swapping with the Restrained Character takes its Restrain token. If this target is not a Character, the Restrain effect ends.",
    },
    {
      id: "retaliate",
      keyword: "RETALIATE X",
      description: "Inflict X Damage to attacker within CR or any range otherwise. Caster must be one of the targets.",
    },
    {
      id: "roll",
      keyword: "ROLL X",
      description: "Triggers a benefit for attack roll on natural roll. +X HIT modifiers do not trigger this.",
    },
    {
      id: "round",
      keyword: "ROUND",
      description:
        "Round is a term used to denote the window of time from the first card to receive a turn on the Initiative Track to the last. Thus, we can say that the Hero playing the Defender Dungeon Role will always be the first Character to act in a Round while the Rune card will always be the last. All effects that are measured through a round (i.e., “...during this round”) end as soon as the Rune card’s turn in that round is resolved.",
    },
    {
      id: "self",
      keyword: "SELF",
      description:
        'Abilities with the SELF Keyword can only target the casting character. For example: "SELF, PREVENT 3" means that the character can prevent 3 damage from themselves only.',
    },
    {
      id: "shadow-aura",
      keyword: "SHADOW AURA",
      description: "A small Darkness tile is placed under Target.",
    },
    {
      id: "shield",
      keyword: "SHIELD X",
      description:
        "The target gains X SHIELD tokens. Each SHIELD token can be used to absorb 1 point of incoming damage against the character. You must use all of your SHIELD tokens before losing any Health or using a PREVENT effect—you cannot choose to take the damage and keep your SHIELD tokens or to PREVENT the damage with another Skill in order to save them. SHIELD tokens are a stackable resource.",
    },
    {
      id: "shove",
      keyword: "SHOVE",
      description:
        "When two characters would occupy the same space and one of them has priority over the other, we say that the first will shove the second. When a character is shoved, it is moved to a square that is adjacent to the area (blue square) that it previously occupied. The Party Leader chooses to where a Monster would be shoved to, while a shoved Hero can choose their new position for themselves. Characters suffer the effects of stepping on harmful terrain when they are shoved into them (if they have not suffered them already this turn.)",
    },
    {
      id: "silence",
      keyword: "SILENCE",
      description: "(Counts as FATIGUE) EXPEND all Agility and Wisdom.",
    },
    {
      id: "skull-cracker",
      keyword: "SKULL-CRACKER",
      description:
        "Monsters with this ability are terribly dangerous. Attacks made by creatures with this ability will pierce any Sturdiness value automatically. So be careful: the attack of such creatures is lethal against Allies such as Companions, Followers, Pets, and so on (you can still use Prevents from your Reactions or Interrupts to try to reduce the damage to 0 and prevent an allied Follower from being defeated).",
    },
    {
      id: "slaughter",
      keyword: "SLAUGHTER",
      description: "A Monster with Slaughter Targets NPC Tokens (non-Companions) as its Primary Target.",
    },
    {
      id: "slayer",
      keyword: "SLAYER",
      description:
        "A Monster with this ability will chase Injured NPC tokens, Cohorts, and Followers as their Primary Target, in that order of preference. If there are two or more of those within reach, the Party Leader chooses which of them will be the target of this Monster this turn. If none of these NPCs are on the board or in reach, these Monsters switch their Primary Target to the Strongest Hero.",
    },
    {
      id: "slow",
      keyword: "SLOW",
      description:
        "The Target receives a SLOW token. Unlike other Conditions, SLOW does not take effect at the beginning of that character's next turn, it lingers until removed instead. The next time the affected character receives a Move effect, it loses 2 movement points from that effect and removes their SLOW token from their board. SLOW is a redundant Condition.",
    },
    {
      id: "solid-objects",
      keyword: "SOLID OBJECTS",
      description:
        "Characters, Chests, Interactions, Piles of Runes, NPCs, and others specified as such during a setup.",
    },
    {
      id: "soul-shard",
      keyword: "SOUL SHARD",
      description:
        "By confining a fragment of life energy from a creature's spirit within them, these crystals can be used to strengthen the Heroes. As a Minor Action, A Hero may discard a Soul Shard to give Double Damage to the next Weapon Attack or Spell Attack they make this turn. Note that this effect lasts only until the end of this turn or when you make your next Weapon Attack or Spell Attack (even if you miss), whichever comes first. If an effect allows you to make two or more separate Weapon Attack as part of the same Action, this effect is only applied to the first of them *(Cleave is a single hit that affects two or more targets, so this bonus applies to all of them)*. Soul Shards are redundant Resource tokens that can be exchanged between Heroes as if they were Consumable Items.",
    },
    {
      id: "special-mechanic-tokens",
      keyword: "SPECIAL MECHANIC TOKENS",
      description:
        "These board elements are used as visual milestones for the function of any Special Mechanic established for an Adventure. Special Mechanic tokens are Immovable Ground Objects.",
    },
    {
      id: "spent",
      keyword: "SPENT",
      description:
        "Spent is not properly a Keyword, however, it is a term that is worth clarifying. An Action Cube is considered spent when it is allocated to a Skill slot. Curse Cubes and Trauma Cubes are not considered Action Cubes even when they are spent as Action Cubes. They are treated as normal wounds once they become allocated to a slot.",
    },
    {
      id: "split",
      keyword: "SPLIT",
      description:
        "The casting Character can choose to split the described effect among any number of targets (within Range) they choose. To be considered a target, a Character must receive a share of at least 1 point. Any empowering bonus that character has is applied to the total amount, not to each target they choose. <br><br>\
        **Example:** *A Bonus of +1 HEAL applied to a SPLIT, HEAL 4 effect would result in a SPLIT, HEAL 5 instead of four individual effects of HEAL 2.*",
    },
    {
      id: "spell-attack",
      keyword: "SPELL ATTACK",
      description: "Magic skill that always succeeds, inflicting damage.",
    },
    {
      id: "stackable",
      keyword: "STACKABLE",
      description:
        "The Stackable property means that a character can hold up to 4 copies of a same token on their boards/cards. A two-sided token that displays the faces 1 and 2 must always be considered as if it was the number of individual tokens indicated. If a character would receive a fifth token of a Stackable effect, just ignore it. <br><br>\
        **Example:** *2 tokens of Focus 2 and 4 tokens of Focus 1 are considered Focus 4 either way.*",
    },
    {
      id: "stalker",
      keyword: "STALKER (TRAIT)",
      description:
        "Some killers specialize in using stealth to their advantage. As long as the Stalker Skill is not blocked, whenever the Slayer’s Stealth fades away *(that is, it is removed on its own at the beginning of its Hero’s turn)*, the Slayer remains Hidden until the end of the current Hero's turn or until they try to surprise another Character. <br><br>\
        **Example:** *Nyx received Stealth through the **Sucker Punch** Skill in the previous round. At the beginning of her turn, in this new round, her Stealth faded away, but she will still remain hidden until she tries to surprise another Character (which could lead her to cause Double Damage) or finishes her current turn (so, she would need to cast another Stealth effect if she wanted to continue in Stealth to escape the Monsters attacks).*",
    },
    {
      id: "status",
      keyword: "STATUS",
      description:
        "Status is a reward related to a choice a character made during the story. Some Statuses can give special abilities as if they were some kind of blessing, while others are just related to the story. Regardless, a character can have any number of Statuses noted on their Campaign Log and all Statuses are erased during the next Camp Phase.",
    },
    {
      id: "stealth",
      keyword: "STEALTH",
      description:
        'The Target receives a STEALTH Token and is considered hidden while they are holding it. <br><br>\
        - Characters without Immunity to STEALTH do not count a hidden character either as their Target nor an enemy for engagement purposes (they still can\'t pass through them if they are enemies). \
        - Hidden characters still take damage from area Attacks such as STRIKE and from Darkness. <br>\
        - At the beginning of its next turn, the character is no longer hidden and must discard its STEALTH token.<br><br>\
        Alternatively, as many seasoned assassins do, a character can end their STEALTH sooner by trying to Surprise a Target. <br><br>\
        - Thus, if a character with a STEALTH token makes a Weapon Attack, whether it hits or not, it Immediately loses STEALTH. On the other hand, if the Attack hits, it gains DOUBLE DAMAGE if the attacking character was considered hidden from its Target. This is called "Surprise." <br>\
        - Characters immune to STEALTH cannot be Surprised.',
    },
    {
      id: "square",
      keyword: "SQUARE",
      description: "Refers to a white square on map tile. ",
    },
    {
      id: "strike",
      keyword: "STRIKE X",
      description: "Targets all characters in X AREAS within Range. Melee must be AREAS adjacent to own SQUARE.",
    },
    {
      id: "strongest-hero",
      keyword: "STRONGEST HERO",
      description:
        "The Hero with the most Health at the moment. Monsters often target the Strongest Hero. If two Heroes are tied with the most Health, the Strongest one among then will be the one who occupies the fastest Initiative Slot.",
    },
    {
      id: "stun",
      keyword: "STUN",
      description:
        "STUN works differently between Heroes and Monsters. When the STUN effect is resolved at the beginning of a Monster's turn, that Monster loses its Attack action for that turn and then removes the STUN token *(it will still take its Move action)*. At the beginning of an affected Hero's turn, on the other hand, they lose one of their two allowed Cube Actions for that turn and then remove the token from their board. STUN is a redundant Condition.",
    },
    {
      id: "sturdiness",
      keyword: "STURDINESS",
      description: "Damage exceeding this number defeats the companion.",
    },
    {
      id: "suffer",
      keyword: "SUFFER",
      description:
        "Suffer is not properly a Keyword, however, it is a term that is worth clarifying. Suffer is used to define something that “hits” a Character after they have tried to protect themselves against it. So, “suffer damage” means to lose Health due to damage after you tried (if you could, naturally) to mitigate it through Prevent, Shield tokens, and so on.",
    },
    {
      id: "swap",
      keyword: "SWAP",
      description: "Two objects trade positions amd CHARACTERS are affected by harmful terrain or Darkness landed on.",
    },
    {
      id: "swarm",
      keyword: "SWARM",
      description:
        "Swarm Monsters are tiny creatures that, joined together, form a single being, and thus they have no vital points in their body. Such creatures suffer only half damage (rounded up, after Prevent reductions have been applied) of all Weapon Attack that hit them.<br><br> \
        **Example:** *If Lorelai has 2 Intimidate tokens when she attacks a Monster that has Swarm and 1 Shield token using a 6-damage attack, that Monster would suffer only 2 points of damage in the end (6 - 2 - 1 = 3; 3 ÷ 2 = 1.5, which is then rounded up to 2).*",
    },
    {
      id: "take",
      keyword: "TAKE",
      description:
        "Take is not properly a Keyword, however, it is a term that is worth clarifying. Take is used to describe something that is given to a Character. Whenever that is damage, they have the opportunity to mitigate it through Shield tokens or Prevent effects (unless, of course, the damage is non-preventable). If it is a Condition (such as Bleed) or an Effect (such as Telekinesis), that Character can’t use Reactions or Interrupts to avoid it, but if they are Immune to the said effects, they simply won't take them. Taking a Curse Cube, on the other hand, is different from suffering Curse and thus, this effect can't be avoided even if the Character is Immune to Curse.",
    },
    {
      id: "telekinesis",
      keyword: "TELEKINESIS X",
      description:
        "Move any small-sized object (including small Darkness tiles) or SOLID OBJECTS (except Interactions) up to X SQUARES. Target is affected by harmful terrain or Darkness landed on including FALLING DAMAGE.",
    },
    {
      id: "threat",
      keyword: "THREAT",
      description:
        "Threat is the term used to define the moment when a Hero can have their Health points reduced by some attack or effect, but is able to defend themselves and try to prevent this from happening.<br><br>\
        Thus, Threat essentially defines when a Hero can usea Reaction in-game. As a rule, Heroes can use such Skills or Abilities whenever a Hero (either themselves or an ally) is threatened, that is, when they take preventable damage (non-preventable damage never generates a Threat).<br><br>\
        Take note that Threat is just a term, it doesn't change any rules. Therefore, Reactions with “SELF” can only be used if the casting Character is also being threatened and so on, as described on page 14 of the Corebox Rulebook.",
    },
    {
      id: "throw-barrel",
      keyword: "THROW (STACK OF BARRELS)",
      description:
        "When thrown at a Character, a barrel deals 2 DMG and inflicts KNOCK DOWN to its target if it is a Small Character. Large Monsters bodies are so powerful that barrels don't even bother them. <br><br> \
        - However, if a Hero was hidden inside the barrel, the throwing causes +2 DMG and it can even target Large Monsters and inflict KNOCK DOWN to them (overcoming their immunity thanks to the extra weight). <br>\
        - Reposition the Hero that was in the barrel in a square of their choice that is adjacent to the target against which the barrel was thrown. *(Don't forget, thrown Furniture is broken and removed from the board).*",
    },
    {
      id: "throw-bookshelf",
      keyword: "THROW (BOOKSHELF)",
      description:
        "Bookshelves are too heavy to be thrown at a Character with a Minor Action. Instead, it is simply knocked over, affecting a Character that is adjacent to it (chosen by the Hero who used the Throw Furniture Minor Action). TELEKINESIS, on the other hand, can throw a bookshelf normally. <br><br>\
        - Regardless of the way it was thrown, a bookshelf deals 2 DMG and inflicts STUN to its target (Don’t forget: Thrown Furniture is always broken and removed from the board.)",
    },
    {
      id: "throw-chest",
      keyword: "THROW (CHEST)",
      description:
        "When thrown at a Character, a Chest causes 2 DMG and you must roll the Trap Die: add the result to this damage as a side effect. *(Don't forget, thrown Furniture is broken and removed from the board.)*",
    },
    {
      id: "throw-piles-of-crates",
      keyword: "THROW (PILE OF CRATES)",
      description:
        "When thrown, the Pile of Crate inflicts BRITTLE to its target if it is a Small Character. <br><br>\
        - Large Monsters bodies are so powerful that the crates don't even bother them. (Don't forget, thrown Furniture is broken and removed from the board.)",
    },
    {
      id: "throw-stone-fountains",
      keyword: "THROW (STONE FOUNTAIN)",
      description:
        "Stone Fountains are attached to the ground and therefore cannot be thrown at other Characters in any way *(but they can still be destroyed by Large Monsters who end their movement by stepping on them).*",
    },
    {
      id: "throw-stone-pillar",
      keyword: "THROW (STONE PILLAR)",
      description:
        "Stone Pillars are attached to the floor and ceiling and therefore cannot be thrown at other characters in any way. However, it is precisely because they are so firm that the opposite becomes true:<br><br>\
        - When a Character is thrown against a stone pillar (by effects like TELEKINESIS or PUSH), they suffer 4 non-preventable damage and are repositioned in a square adjacent to the pillar chosen by the Character who threw them. The pillar is not removed from the board.",
    },
    {
      id: "trample",
      keyword: "TRAMPLE X",
      description: "Pass through but not end on ENEMIES. Inflicts X Damage to each trampled enemy once.",
    },
    {
      id: "trap",
      keyword: "TRAP",
      description:
        "Place a Trap token in the center of an area that is adjacent to your area (blue square). The first time an enemy activates within that area or moves into that area, the Trap is triggered. All enemies inside that area are affected by the Trap, then remove the Trap token. There can only be 1 Trap token in an area at a time.",
    },
    {
      id: "trauma-cube",
      keyword: "TRAUMA CUBE (TC)",
      description:
        "Purple cubes that are allocated to Hero or Dungeon Roles skills which blocks their use. Hero is killed upon receiving a 2nd TRAUMA CUBE and ends the adventure.",
    },
    {
      id: "trick-or-treat",
      keyword: "TRICK OR TREAT",
      description: "Tharmagar's controller chooses RANGE 1, HEAL 2 or RANGE 1, (BLEED 2 or BURN 2 or POISON 2).",
    },
    {
      id: "turn",
      keyword: "TURN",
      description:
        "Turn is the term used to designate the time window in which a Character or a card on the Initiative Track may act. Even though a Monster type has only one card in the Initiative Track to represent all units of that type, each Monster’s turn is taken individually. Therefore, the turn of a Shadow Knight with a pink snap-on base is different from the turn of a Shadow Knight with the green snap-on base. This distinction is important, because effects that can be used once per turn can be used once during the turn of each of these Shadow Knights, for example.",
    },
    {
      id: "unavailable",
      keyword: "UNAVAILABLE",
      description:
        "This is a game term usually associated with Interactions. When an effect states that a Resolution becomes unavailable, it means that Heroes cannot choose that Resolution anymore. Whenever a Hero chooses a Resolution from a Charged Interaction, for example, it becomes unavailable and cannot be chosen again during this Adventure.",
    },
    {
      id: "unique",
      keyword: "UNIQUE",
      description:
        "This pet can only be summoned a specific skill. Otherwise, once summoned, pet-activation skills can be used.",
    },
    {
      id: "unlife",
      keyword: "UNLIFE",
      description:
        "Pets with this trait have a lying life, needing necrotic power to stay upright. At the beginning of their master’s turn, they will be dismissed. At this point, the Necromancer may choose to take a Curse Cube to extend the Unlife of such a Pet for one turn—This is called “Taint”. They may choose for each Pet with this trait whether or not to do so, paying the Taint cost for each one individually.",
    },
    {
      id: "versatile",
      keyword: "VERSATILE",
      description:
        "Equipment that is Versatile can be handled in two different ways by its user. When you first receive this double-sided Equipment card, you can choose which face you want to use. From then on, as a Minor Action, you can flip the card over if there are no Action Cubes occupying any of its slots. You can even flip a card that is in your bag. <br><br>\
        **NOTE:** If you flip a Versatile Equipment to a face with an Equipment type that you are not proficient in, you must immediately Unequip that card.",
    },
    {
      id: "vicious",
      keyword: "VICIOUS",
      description: "The damage dealt by this Monster's attack is non-preventable.",
    },
    {
      id: "voodoo",
      keyword: "VOODOO",
      description:
        "When a Monster has this ability, it is able to remove its Stackable Conditions by inflicting them back against the Heroes. Thus, at the beginning of these Monsters turn, when they are to be affected by Stackable Conditions *(Burn, Bleed, and Intimidate are examples of Stackable Conditions)*, if any of its enemies (Hero, Pet, Companion etc.) are within Range 1 of that Monster, instead of it undergoing such effects, move them to the strongest enemy among them. If the Monster cannot redirect such tokens, only then does it suffers such effects.",
    },
    {
      id: "war-cry",
      keyword: "WAR CRY",
      description:
        "War Cry is a triggered ability that some Monsters possess. When activated, each other Monster within Range 1 of this Monster enrages and gains +1 DMG permanently (place this token on their Monster Status board).",
    },
    {
      id: "warden",
      keyword: "WARDEN (TRAIT)",
      description:
        "Characters who have the Warden trait can use Interrupts and Reactions with the Keyword “SELF” on other Characters as long as they are adjacent to them. Also, Wardens can use such Skills when Characters adjacent to them are attacked or threatened (if the Skill you are using is either an Interrupt or a Reaction, respectively) instead of using them only when they are attacked or threatened themselves.",
    },
    {
      id: "warlock",
      keyword: "WARLOCK (TRAIT)",
      description:
        "Bargaining with the Darkness, Warlocks flirt with corruption in exchange for power. As long as the Otherwordly Pact Skill is not blocked, they receive their Curse Cubes as if they were Action Cubes, and when they spend them, these are treated as Wild Cubes. Once spent, these cubes become conventional Curse Cubes again, and are removed only through Cleanse effects.",
    },
    {
      id: "weakest-hero",
      keyword: "WEAKEST HERO",
      description:
        "The Hero with the least Health at the moment is the Weakest Hero. If two Heroes are tied with the lowest Health, the weakest one among them will be the one who occupies the slowest Initiative slot.",
    },
    {
      id: "weapon-attack",
      keyword: "WEAPON ATTACK",
      description:
        "Attack skill using your Weapon. Roll D20, attack succeeds if roll is equal to or greater than Weapon hit chance after applying HIT modifiers. Attacking from a higher level than the Target gives +2 HIT; however, attacking from a lower level gives -2 HIT. By default, before HIT modifiers, a roll of 1 is always a Critical Failure and a roll of 20 is a Critical Hit (x2 DMG).",
    },
    {
      id: "wild-copy",
      keyword: "WILD COPY",
      description:
        "To copy an ally's effect is one of the most rewarding AoD experiences. And, you'll be able to do it with preeminence from now on! An effect that Wild Copies a Skill applies the same effects as a Copy, but it doubles all the numbers written in its numerical form, as would have happened if those effects had been cast by spending a Wild Cube.",
    },
    {
      id: "wild-cube",
      keyword: "WILD CUBE",
      description:
        "Considered to be any color AC. Hero Skill (not Dungeon Roles or Equipment) effects are doubled including conditions.",
    },
    {
      id: "wounded",
      keyword: "WOUNDED",
      description:
        "Wounded is a rare term that was created to condense a bigger effect into a single word: A Wounded Character is one who currently has half or less of their maximum Health (round down). A Character may be considered both Wounded and Fine when it has exactly half its maximum Health.",
    },
    {
      id: "x",
      keyword: "X",
      description:
        "Any variable 'X' on a Monster or Attack card means the number of Rune tokens on the Initiative Track that matches that Attack's Rune.",
    },
  ];
}