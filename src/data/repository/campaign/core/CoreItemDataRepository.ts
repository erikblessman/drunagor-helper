import type {
  ArmorItemData,
  ConsumableItemData,
  ItemData,
  OffHandItemData,
  WeaponItemData,
} from "@/data/repository/ItemData";
import {
  instanceOfArmorCardData,
  instanceOfConsumableCardData,
  instanceOfOffHandCardData,
  instanceOfWeaponCardData,
} from "@/data/repository/ItemData";
import type { ItemDataRepository } from "@/data/repository/ItemDataRepository";
import type { ArmorType } from "@/data/type/ArmorType";
import type { ConsumableType } from "@/data/type/ConsumableType";
import type { ItemType } from "@/data/type/ItemType";
import type { OffHandType } from "@/data/type/OffHandType";
import type { WeaponType } from "@/data/type/WeaponType";
import * as _ from "lodash-es";

export class CoreItemDataRepository implements ItemDataRepository {
  private cards = [
    {
      id: "amiran-crossbow",
      name: "Amiran Crossbow",
      itemType: "Weapon",
      weaponTypes: ["Ranged"],
    } as WeaponItemData,
    {
      id: "amiran-halberd",
      name: "Amiran Halberd",
      itemType: "Weapon",
      weaponTypes: ["Heavy", "Light"],
    } as WeaponItemData,
    {
      id: "amiran-royal-maul",
      name: "Amiran Royal Maul",
      itemType: "Weapon",
      weaponTypes: ["Light"],
    } as WeaponItemData,
    {
      id: "amulet-of-power",
      name: "Amulet Of Power",
      itemType: "Trinket",
    } as ItemData,
    {
      id: "amulet-of-rewinding",
      name: "Amulet Of Rewinding",
      itemType: "Trinket",
    } as ItemData,
    {
      id: "amulet-of-the-copycat",
      name: "Amulet Of The Copycat",
      itemType: "Trinket",
    } as ItemData,
    {
      id: "badge-of-the-wardens",
      name: "Badge Of The Wardens",
      itemType: "Trinket",
    } as ItemData,
    {
      id: "bane-of-the-shadows",
      name: "Bane Of The Shadows",
      itemType: "Weapon",
      weaponTypes: ["Heavy"],
    } as WeaponItemData,
    {
      id: "battle-maul",
      name: "Battle Maul",
      itemType: "Weapon",
      weaponTypes: ["Light"],
    } as WeaponItemData,
    {
      id: "blacksteel-blade",
      name: "Blacksteel Blade",
      itemType: "Weapon",
      weaponTypes: ["Heavy"],
    } as WeaponItemData,
    {
      id: "blacksteel-greatsword",
      name: "Blacksteel Greatsword",
      itemType: "Weapon",
      weaponTypes: ["Heavy"],
    } as WeaponItemData,
    {
      id: "blacksteel-longsword",
      name: "Blacksteel Longsword",
      itemType: "Weapon",
      weaponTypes: ["Heavy"],
    } as WeaponItemData,
    {
      id: "blooded-sword",
      name: "Blooded Sword",
      itemType: "Weapon",
      weaponTypes: ["Light"],
    } as WeaponItemData,
    {
      id: "bloody-axe-cosmic-gem",
      name: "Bloody Axe (Cosmic Gem)",
      itemType: "Weapon",
      weaponTypes: ["Light", "Heavy"],
    } as WeaponItemData,
    {
      id: "bloody-axe-socketed",
      name: "Bloody Axe (Socketed)",
      itemType: "Weapon",
      weaponTypes: ["Light", "Heavy"],
    } as WeaponItemData,
    {
      id: "blue-flame-torch",
      name: "Blue Flame Torch",
      itemType: "Trinket",
    } as ItemData,
    {
      id: "boots-of-agility",
      name: "Boots Of Agility",
      itemType: "Trinket",
    } as ItemData,
    {
      id: "boots-of-levitation",
      name: "Boots Of Levitation",
      itemType: "Trinket",
    } as ItemData,
    {
      id: "boots-of-striding",
      name: "Boots Of Striding",
      itemType: "Trinket",
    } as ItemData,
    {
      id: "bracers-of-endurance",
      name: "Bracers Of Endurance",
      itemType: "Trinket",
    } as ItemData,
    {
      id: "breastplate",
      name: "Breastplate",
      itemType: "Armor",
      armorTypes: ["Plate"],
    } as ArmorItemData,
    {
      id: "broken-phylactery",
      name: "Broken Phylactery",
      itemType: "Trinket",
    } as ItemData,
    {
      id: "cloth-armor",
      name: "Cloth Armor",
      itemType: "Armor",
      armorTypes: ["Cloth"],
    } as ArmorItemData,
    {
      id: "corruptor-knife",
      name: "Corruptor Knife",
      itemType: "Weapon",
      weaponTypes: ["Light"],
    } as WeaponItemData,
    {
      id: "cosmic-gemstone",
      name: "Cosmic Gemstone",
      consumableType: "Gem",
    } as ConsumableItemData,
    {
      id: "cosmic-gemstone-chest",
      name: "Cosmic Gemstone (Chest)",
      consumableType: "Gem",
    } as ConsumableItemData,
    {
      id: "cosmic-gemstone-from-sigil-of-honor",
      name: "Cosmic Gemstone (From Sigil Of Honor)",
      consumableType: "Gem",
    } as ConsumableItemData,
    {
      id: "crossbow",
      name: "Crossbow",
      itemType: "Weapon",
      weaponTypes: ["Ranged"],
    } as WeaponItemData,
    {
      id: "cursed-bracelet",
      name: "Cursed Bracelet",
      itemType: "Trinket",
    } as ItemData,
    {
      id: "dark-piercer",
      name: "Dark Piercer",
      itemType: "Weapon",
      weaponTypes: ["Heavy", "Light"],
    } as WeaponItemData,
    {
      id: "deadly-backstabber",
      name: "Deadly Backstabber",
      itemType: "Off Hand",
      offHandTypes: ["Off Hand Weapon"],
    } as OffHandItemData,
    {
      id: "deft-stilleto",
      name: "Deft Stilleto",
      itemType: "Off Hand",
      offHandTypes: ["Off Hand Weapon"],
    } as OffHandItemData,
    {
      id: "dewey-and-guss-collar",
      name: "Dewey & Guss' Collar",
      itemType: "Trinket",
    } as ItemData,
    {
      id: "displacement-cloak",
      name: "Displacement Cloak",
      itemType: "Armor",
      armorTypes: ["Cloth"],
    } as ArmorItemData,
    {
      id: "dragon-eye-of-memory",
      name: "Dragon Eye Of Memory",
      itemType: "Trinket",
    } as ItemData,
    {
      id: "dragonbone-wand",
      name: "Dragonbone Wand",
      itemType: "Off Hand",
      offHandTypes: ["Off Hand Weapon", "Relic"],
    } as OffHandItemData,
    {
      id: "dragonclaw-shield",
      name: "Dragonclaw Shield",
      itemType: "Off Hand",
      offHandTypes: ["Relic", "Shield"],
    } as OffHandItemData,
    {
      id: "dream-weaveplate",
      name: "Dream Weaveplate",
      itemType: "Armor",
      armorTypes: ["Cloth", "Plate"],
    } as ArmorItemData,
    {
      id: "dreamcrafted-buckler",
      name: "Dreamcrafted Buckler",
      itemType: "Off Hand",
      offHandTypes: ["Off Hand Weapon", "Shield"],
    } as OffHandItemData,
    {
      id: "dreamcrafted-pattern-bracers-of-endurance",
      name: "Dreamcrafted Pattern (Bracers Of Endurance)",
      consumableType: "Pattern",
    } as ConsumableItemData,
    {
      id: "dreamcrafted-pattern-dream-weaveplate",
      name: "Dreamcrafted Pattern (Dream Weaveplate)",
      consumableType: "Pattern",
    } as ConsumableItemData,
    {
      id: "dreamcrafted-pattern-dreamcrafted-buckler",
      name: "Dreamcrafted Pattern (Dreamcrafted Buckler)",
      consumableType: "Pattern",
    } as ConsumableItemData,
    {
      id: "dreamcrafted-pattern-dreampiercer-bow",
      name: "Dreamcrafted Pattern (Dreampiercer Bow)",
      consumableType: "Pattern",
    } as ConsumableItemData,
    {
      id: "dreamcrafted-pattern-exquisite-dreamblade",
      name: "Dreamcrafted Pattern (Exquisite Dreamblade)",
      consumableType: "Pattern",
    } as ConsumableItemData,
    {
      id: "dreamcrafted-pattern-sigil-of-narangerel",
      name: "Dreamcrafted Pattern (Sigil Of Narang'erel)",
      consumableType: "Pattern",
    } as ConsumableItemData,
    {
      id: "dreampiercer-bow",
      name: "Dreampiercer Bow",
      itemType: "Weapon",
      weaponTypes: ["Implement", "Ranged"],
    } as WeaponItemData,
    {
      id: "dueling-dagger",
      name: "Dueling Dagger",
      itemType: "Off Hand",
      offHandTypes: ["Off Hand Weapon"],
    } as OffHandItemData,
    {
      id: "dwarven-kings-sword-cosmic-gem",
      name: "Dwarven King's Sword (Cosmic Gem)",
      itemType: "Weapon",
      weaponTypes: ["Light", "Heavy"],
    } as WeaponItemData,
    {
      id: "dwarven-kings-sword-socketed",
      name: "Dwarven King's Sword (Socketed)",
      itemType: "Weapon",
      weaponTypes: ["Light", "Heavy"],
    } as WeaponItemData,
    {
      id: "elvish-bow",
      name: "Elvish Bow",
      itemType: "Weapon",
      weaponTypes: ["Ranged"],
    } as WeaponItemData,
    {
      id: "empowered-pact-blade",
      name: "Empowered Pact Blade",
      itemType: "Off Hand",
      offHandTypes: ["Off Hand Weapon"],
    } as OffHandItemData,
    {
      id: "enchanted-crossbow-cosmic-gem",
      name: "Enchanted Crossbow (Cosmic Gem)",
      itemType: "Weapon",
      weaponTypes: ["Ranged", "Implement"],
    } as WeaponItemData,
    {
      id: "enchanted-crossbow-socketed",
      name: "Enchanted Crossbow (Socketed)",
      itemType: "Weapon",
      weaponTypes: ["Ranged", "Implement"],
    } as WeaponItemData,
    {
      id: "exquisite-dreamblade",
      name: "Exquisite Dreamblade",
      itemType: "Weapon",
      weaponTypes: ["Heavy", "Light"],
    } as WeaponItemData,
    {
      id: "family-locket-cosmic-gem",
      name: "Family Locket (Cosmic Gem)",
      itemType: "Trinket",
    } as ItemData,
    {
      id: "family-locket-socketed",
      name: "Family Locket (Socketed)",
      itemType: "Trinket",
    } as ItemData,
    {
      id: "frozen-tears-of-alagast",
      name: "Frozen Tears Of Alagast",
      itemType: "Trinket",
    } as ItemData,
    {
      id: "full-plate-armor",
      name: "Full Plate Armor",
      itemType: "Armor",
      armorTypes: ["Plate"],
    } as ArmorItemData,
    {
      id: "gold-medal",
      name: "Gold Medal",
      itemType: "Trinket",
    } as ItemData,
    {
      id: "golden-locket",
      name: "Golden Locket",
      itemType: "Trinket",
    } as ItemData,
    {
      id: "good-quality-stick",
      name: "Good-Quality Stick",
      itemType: "Trinket",
    } as ItemData,
    {
      id: "good-quality-torch",
      name: "Good-Quality Torch",
      itemType: "Trinket",
    } as ItemData,
    {
      id: "greater-displacement-cloak",
      name: "Greater Displacement Cloak",
      itemType: "Armor",
      armorTypes: ["Cloth"],
    } as ArmorItemData,
    {
      id: "greater-mystical-symbol",
      name: "Greater Mystical Symbol",
      itemType: "Off Hand",
      offHandTypes: ["Relic"],
    } as OffHandItemData,
    {
      id: "greater-spellweave-cloak",
      name: "Greater Spellweave Cloak",
      itemType: "Armor",
      armorTypes: ["Cloth"],
    } as ArmorItemData,
    {
      id: "greater-symbol-of-light",
      name: "Greater Symbol Of Light",
      itemType: "Off Hand",
      offHandTypes: ["Relic"],
    } as OffHandItemData,
    {
      id: "half-plate-armor",
      name: "Half-Plate Armor",
      itemType: "Armor",
      armorTypes: ["Plate"],
    } as ArmorItemData,
    {
      id: "heavy-shield",
      name: "Heavy Shield",
      itemType: "Off Hand",
      offHandTypes: ["Shield"],
    } as OffHandItemData,
    {
      id: "heavy-thornmail",
      name: "Heavy Thornmail",
      itemType: "Armor",
      armorTypes: ["Plate"],
    } as ArmorItemData,
    {
      id: "hellscarian-short-bow",
      name: "Hellscarian Short Bow",
      itemType: "Weapon",
      weaponTypes: ["Ranged"],
    } as WeaponItemData,
    {
      id: "iron-shield",
      name: "Iron Shield",
      itemType: "Off Hand",
      offHandTypes: ["Shield"],
    } as OffHandItemData,
    {
      id: "jagged-blade-axe",
      name: "Jagged Blade Axe",
      itemType: "Weapon",
      weaponTypes: ["Heavy"],
    } as WeaponItemData,
    {
      id: "kite-shield-cosmic-gem",
      name: "Kite Shield (Cosmic Gem)",
      itemType: "Off Hand",
      offHandTypes: ["Shield"],
    } as OffHandItemData,
    {
      id: "kite-shield-socketed",
      name: "Kite Shield (Socketed)",
      itemType: "Off Hand",
      offHandTypes: ["Shield"],
    } as OffHandItemData,
    {
      id: "leather-armor",
      name: "Leather Armor",
      itemType: "Armor",
      armorTypes: ["Leather"],
    } as ArmorItemData,
    {
      id: "lesser-displacement-cloak",
      name: "Lesser Displacement Cloak",
      itemType: "Armor",
      armorTypes: ["Cloth"],
    } as ArmorItemData,
    {
      id: "lesser-mystical-symbol",
      name: "Lesser Mystical Symbol",
      itemType: "Off Hand",
      offHandTypes: ["Relic"],
    } as OffHandItemData,
    {
      id: "lesser-spellweave-cloak",
      name: "Lesser Spellweave Cloak",
      itemType: "Armor",
      armorTypes: ["Cloth"],
    } as ArmorItemData,
    {
      id: "lesser-symbol-of-light",
      name: "Lesser Symbol Of Light",
      itemType: "Off Hand",
      offHandTypes: ["Relic"],
    } as OffHandItemData,
    {
      id: "light-maul",
      name: "Light Maul",
      itemType: "Weapon",
      weaponTypes: ["Light"],
    } as WeaponItemData,
    {
      id: "light-thornmail",
      name: "Light Thornmail",
      itemType: "Armor",
      armorTypes: ["Plate"],
    } as ArmorItemData,
    {
      id: "lovers-promise",
      name: "Lover's Promise",
      itemType: "Trinket",
    } as ItemData,
    {
      id: "marksman-bow",
      name: "Marksman Bow",
      itemType: "Weapon",
      weaponTypes: ["Ranged"],
    } as WeaponItemData,
    {
      id: "moonlight-dagger",
      name: "Moonlight Dagger",
      itemType: "Off Hand",
      offHandTypes: ["Off Hand Weapon", "Relic"],
    } as OffHandItemData,
    {
      id: "mystical-symbol",
      name: "Mystical Symbol",
      itemType: "Off Hand",
      offHandTypes: ["Relic"],
    } as OffHandItemData,
    {
      id: "orcish-blade",
      name: "Orcish Blade",
      itemType: "Weapon",
      weaponTypes: ["Heavy"],
    } as WeaponItemData,
    {
      id: "orcish-cleaver",
      name: "Orcish Cleaver",
      itemType: "Weapon",
      weaponTypes: ["Heavy"],
    } as WeaponItemData,
    {
      id: "orcish-reaper-blade",
      name: "Orcish Reaper Blade",
      itemType: "Weapon",
      weaponTypes: ["Heavy"],
    } as WeaponItemData,
    {
      id: "pact-blade",
      name: "Pact Blade",
      itemType: "Off Hand",
      offHandTypes: ["Off Hand Weapon"],
    } as OffHandItemData,
    {
      id: "padded-leather-armor",
      name: "Padded Leather Armor",
      itemType: "Armor",
      armorTypes: ["Leather"],
    } as ArmorItemData,
    {
      id: "periapt-of-greater-healing",
      name: "Periapt Of Greater Healing",
      itemType: "Trinket",
    } as ItemData,
    {
      id: "periapt-of-healing",
      name: "Periapt Of Healing",
      itemType: "Trinket",
    } as ItemData,
    {
      id: "periapt-of-supreme-healing",
      name: "Periapt Of Supreme Healing",
      itemType: "Trinket",
    } as ItemData,
    {
      id: "plate-armor",
      name: "Plate Armor",
      itemType: "Armor",
      armorTypes: ["Plate"],
    } as ArmorItemData,
    {
      id: "potion-of-fortitude",
      name: "Potion Of Fortitude",
      consumableType: "Potion",
    } as ConsumableItemData,
    {
      id: "potion-of-healing",
      name: "Potion Of Healing",
      consumableType: "Potion",
    } as ConsumableItemData,
    {
      id: "potion-of-preparation",
      name: "Potion Of Preparation",
      consumableType: "Potion",
    } as ConsumableItemData,
    {
      id: "reinforced-leather-armor",
      name: "Reinforced Leather Armor",
      itemType: "Armor",
      armorTypes: ["Leather"],
    } as ArmorItemData,
    {
      id: "reinforced-shadow-leather",
      name: "Reinforced Shadow Leather",
      itemType: "Armor",
      armorTypes: ["Leather"],
    } as ArmorItemData,
    {
      id: "repeating-crossbow",
      name: "Repeating Crossbow",
      itemType: "Weapon",
      weaponTypes: ["Ranged"],
    } as WeaponItemData,
    {
      id: "ring-of-greater-precision",
      name: "Ring Of Greater Precision",
      itemType: "Trinket",
    } as ItemData,
    {
      id: "ring-of-legendary-precision",
      name: "Ring Of Legendary Precision",
      itemType: "Trinket",
    } as ItemData,
    {
      id: "ring-of-precision",
      name: "Ring Of Precision",
      itemType: "Trinket",
    } as ItemData,
    {
      id: "round-brass-shield",
      name: "Round Brass Shield",
      itemType: "Off Hand",
      offHandTypes: ["Shield"],
    } as OffHandItemData,
    {
      id: "round-golden-shield",
      name: "Round Golden Shield",
      itemType: "Off Hand",
      offHandTypes: ["Shield"],
    } as OffHandItemData,
    {
      id: "round-silver-shield",
      name: "Round Silver Shield",
      itemType: "Off Hand",
      offHandTypes: ["Shield"],
    } as OffHandItemData,
    {
      id: "ruby-brooch",
      name: "Ruby Brooch",
      itemType: "Trinket",
    } as ItemData,
    {
      id: "runecarved-blade",
      name: "Runecarved Blade",
      itemType: "Weapon",
      weaponTypes: ["Light", "Implement"],
    } as WeaponItemData,
    {
      id: "runecarved-cloak",
      name: "Runecarved Cloak",
      itemType: "Armor",
      armorTypes: ["Leather", "Cloth"],
    } as ArmorItemData,
    {
      id: "runecarved-shield",
      name: "Runecarved Shield",
      itemType: "Off Hand",
      offHandTypes: ["Shield", "Relic"],
    } as OffHandItemData,
    {
      id: "scroll-of-displacement",
      name: "Scroll Of Displacement",
      consumableType: "Scroll",
    } as ConsumableItemData,
    {
      id: "scroll-of-icy-bolts",
      name: "Scroll Of Icy Bolts",
      consumableType: "Scroll",
    } as ConsumableItemData,
    {
      id: "scroll-of-incinerate",
      name: "Scroll Of Incinerate",
      consumableType: "Scroll",
    } as ConsumableItemData,
    {
      id: "scroll-of-unmaking",
      name: "Scroll Of Unmaking",
      consumableType: "Scroll",
    } as ConsumableItemData,
    {
      id: "seed-of-darkness-bright",
      name: "Seed Of Darkness (Bright)",
      itemType: "Trinket",
    } as ItemData,
    {
      id: "seed-of-darkness-dim",
      name: "Seed Of Darkness (Dim)",
      itemType: "Trinket",
    } as ItemData,
    {
      id: "shadow-leather-armor",
      name: "Shadow Leather Armor",
      itemType: "Armor",
      armorTypes: ["Leather"],
    } as ArmorItemData,
    {
      id: "sigil-of-honor",
      name: "Sigil Of Honor",
      itemType: "Off Hand",
      offHandTypes: ["Relic"],
    } as OffHandItemData,
    {
      id: "sigil-of-narangerel",
      name: "Sigil Of Narang'erel",
      itemType: "Trinket",
    } as ItemData,
    {
      id: "spellweave-cloak",
      name: "Spellweave Cloak",
      itemType: "Armor",
      armorTypes: ["Cloth"],
    } as ArmorItemData,
    {
      id: "staff-of-gravity",
      name: "Staff Of Gravity",
      content: "desert-of-hellscar",
      itemType: "Weapon",
      weaponTypes: ["Implement"],
    } as WeaponItemData,
    {
      id: "staff-of-the-arcana",
      name: "Staff Of The Arcana",
      itemType: "Weapon",
      weaponTypes: ["Implement"],
    } as WeaponItemData,
    {
      id: "staff-of-the-dawn",
      name: "Staff Of The Dawn",
      itemType: "Weapon",
      weaponTypes: ["Implement"],
    } as WeaponItemData,
    {
      id: "staff-of-the-moon",
      name: "Staff Of The Moon",
      itemType: "Weapon",
      weaponTypes: ["Implement"],
    } as WeaponItemData,
    {
      id: "staff-of-the-noon",
      name: "Staff Of The Noon",
      itemType: "Weapon",
      weaponTypes: ["Implement"],
    } as WeaponItemData,
    {
      id: "staff-of-the-stars",
      name: "Staff Of The Stars",
      itemType: "Weapon",
      weaponTypes: ["Implement"],
    } as WeaponItemData,
    {
      id: "staff-of-the-twilight",
      name: "Staff Of The Twilight",
      itemType: "Weapon",
      weaponTypes: ["Implement"],
    } as WeaponItemData,
    {
      id: "staff-of-the-wildfire-cosmic-gem",
      name: "Staff Of The Wildfire (Cosmic Gem)",
      itemType: "Weapon",
      weaponTypes: ["Implement"],
    } as WeaponItemData,
    {
      id: "staff-of-the-wildfire-socketed",
      name: "Staff Of The Wildfire (Socketed)",
      itemType: "Weapon",
      weaponTypes: ["Implement"],
    } as WeaponItemData,
    {
      id: "steel-shield",
      name: "Steel Shield",
      itemType: "Off Hand",
      offHandTypes: ["Shield"],
    } as OffHandItemData,
    {
      id: "studded-leather-armor",
      name: "Studded Leather Armor",
      itemType: "Armor",
      armorTypes: ["Leather"],
    } as ArmorItemData,
    {
      id: "studded-shadow-leather",
      name: "Studded Shadow Leather",
      itemType: "Armor",
      armorTypes: ["Leather"],
    } as ArmorItemData,
    {
      id: "sword-of-the-dynasty",
      name: "Sword Of The Dynasty",
      itemType: "Weapon",
      weaponTypes: ["Light", "Heavy"],
    } as WeaponItemData,
    {
      id: "sword-of-the-prince",
      name: "Sword Of The Prince",
      itemType: "Weapon",
      weaponTypes: ["Light", "Heavy"],
    } as WeaponItemData,
    {
      id: "symbol-of-light",
      name: "Symbol Of Light",
      itemType: "Off Hand",
      offHandTypes: ["Relic"],
    } as OffHandItemData,
    {
      id: "teddy-bear",
      name: "Teddy Bear",
      itemType: "Trinket",
    } as ItemData,
    {
      id: "terror-blade",
      name: "Terror Blade",
      itemType: "Weapon",
      weaponTypes: ["Light"],
    } as WeaponItemData,
    {
      id: "thornmail",
      name: "Thornmail",
      itemType: "Armor",
      armorTypes: ["Plate"],
    } as ArmorItemData,
    {
      id: "throwing-dagger",
      name: "Throwing Dagger",
      itemType: "Off Hand",
      offHandTypes: ["Off Hand Weapon"],
    } as OffHandItemData,
    {
      id: "undermountain-scabbard",
      name: "Undermountain Scabbard",
      itemType: "Off Hand",
      offHandTypes: ["Off Hand Weapon", "Shield", "Relic"],
    } as OffHandItemData,
    {
      id: "valaranian-runebow",
      name: "Valaranian Runebow",
      itemType: "Weapon",
      weaponTypes: ["Ranged"],
    } as WeaponItemData,
    {
      id: "vengeful-pact-blade",
      name: "Vengeful Pact Blade",
      itemType: "Off Hand",
      offHandTypes: ["Off Hand Weapon"],
    } as OffHandItemData,
    {
      id: "vicious-knife",
      name: "Vicious Knife",
      itemType: "Weapon",
      weaponTypes: ["Light"],
    } as WeaponItemData,
    {
      id: "weapon-of-the-ancients",
      name: "Weapon Of The Ancients",
      content: "desert-of-hellscar",
      itemType: "Weapon",
      weaponTypes: ["Heavy", "Light", "Implement", "Ranged"],
    } as WeaponItemData,
    {
      id: "wooden-staff",
      name: "Wooden Staff",
      itemType: "Weapon",
      weaponTypes: ["Implement"],
    } as WeaponItemData,
    {
      id: "wormscale-breastplate",
      name: "Wormscale Breastplate",
      itemType: "Armor",
      armorTypes: ["Leather", "Plate"],
    } as ArmorItemData,
    {
      id: "xerethian-breastplate",
      name: "Xerethian Breastplate",
      itemType: "Armor",
      armorTypes: ["Leather", "Plate"],
    } as ArmorItemData,
  ];

  find(cardId: string): ItemData | undefined {
    return _.find(this.cards, { id: cardId });
  }

  findAll(): ItemData[] {
    return this.cards;
  }

  findByType(type: ItemType, subType: ArmorType | ConsumableType | OffHandType | WeaponType | null = null): ItemData[] {
    const cards: ItemData[] = [];

    const isSubType = function (
      item: ItemData,
      st: ArmorType | ConsumableType | OffHandType | WeaponType | null
    ): boolean {
      if (st === null) {
        return true;
      }

      if (instanceOfArmorCardData(item)) {
        return (item as ArmorItemData).armorTypes.some((value) => value === st);
      }
      if (instanceOfConsumableCardData(item)) {
        return (item as ConsumableItemData).consumableType === st;
      }
      if (instanceOfOffHandCardData(item)) {
        return (item as OffHandItemData).offHandTypes.some((value) => value === st);
      }
      if (instanceOfWeaponCardData(item)) {
        return (item as WeaponItemData).weaponTypes.some((value) => value === st);
      }
      return false;
    };

    this.cards.forEach((card) => {
      const c = card as ItemData;
      if (c.itemType === type && (subType == null || isSubType(c, subType))) {
        cards.push(c);
      }
    });

    return cards;
  }
}