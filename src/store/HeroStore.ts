import { useStorage } from "@vueuse/core";
import * as _ from "lodash-es";
import { defineStore } from "pinia";
import type { Hero } from "./Hero";
import * as spoils from "@/data/content/spoilsofwar/hero";
import * as rotud from "@/data/content/riseoftheundeaddragon/hero";
import { Lorien } from "@/data/content/lorien/hero/Lorien";
import { Lordwrath } from "@/data/content/lordwrath/hero/Lordwrath";
import * as hp1 from "@/data/content/heropack1/hero";
import { Handuriel } from "@/data/content/handuriel/hero/Handuriel";
import * as dohs from "@/data/content/desertofhellscar/hero";
import * as core from "@/data/content/core/hero";
import * as awakenings from "@/data/content/awakenings/hero";

export const HeroStore = defineStore("hero", () => {
  const heroes = useStorage("HeroStore.heroes", [] as Hero[]);

  function hasInCampaign(heroId: string, campaignId: string): boolean {
    const inCampaign = _.find(heroes.value, { heroId: heroId, campaignId: campaignId });
    if (inCampaign == undefined) {
      return false;
    }
    return true;
  }

  function findInCampaign(heroId: string, campaignId: string): Hero {
    const hero = _.find(heroes.value, { heroId: heroId, campaignId: campaignId });
    if (hero == undefined) {
      throw new Error("Hero could not be found: " + campaignId + " " + heroId);
    }
    return hero;
  }

  function findAllInCampaign(campaignId: string): Hero[] {
    return _.filter(heroes.value, (hero: Hero) => {
      if (hero.campaignId === campaignId) {
        return true;
      }
      return false;
    });
  }

  function add(hero: Hero) {
    heroes.value.push(hero);
  }

  function removeFromCampaign(heroId: string, campaignId: string) {
    heroes.value = heroes.value.filter((hero: Hero) => {
      if (hero.campaignId === campaignId && hero.heroId === heroId) {
        return false;
      }
      return true;
    });
  }

  function getHero(id: string) {
    switch (id) {
      case 'arkhanos':
        return new spoils.Arkhanos();
      case 'barak':
        return new spoils.Barak();
      case 'devron':
        return new spoils.Devron();
      case 'duncan':
        return new spoils.Duncan();
      case 'flavian':
        return new spoils.Flavian();
      case 'kellam':
        return new spoils.Kellam();
      case 'pietro':
        return new spoils.Pietro();
      case 'savran':
        return new spoils.Savran();
      case 'shadow':
        return new spoils.Shadow();
      case 'sskar':
        return new spoils.Sskar();
      case 'sun':
        return new spoils.Sun();
      case 'Willow':
        return new spoils.Willow();
      case 'drasek':
        return new rotud.Drasek();
      case 'jade':
        return new rotud.Jade();
      case 'lorien':
        return new Lorien();
      case 'lordwrath':
        return new Lordwrath();
      case 'azriel':
        return new hp1.Azriel();
      case 'brihitte':
        return new hp1.Brihitte();
      case 'diana':
        return new hp1.Diana();
      case 'drixx':
        return new hp1.Drixx();
      case 'gramosh':
        return new hp1.Gramosh();
      case 'mordred':
        return new hp1.Mordred();
      case 'sahara':
        return new hp1.Sahara();
      case 'siff':
        return new hp1.Siff();
      case 'handuriel':
        return new Handuriel();
      case 'katarina':
        return new dohs.Katarina();
      case 'tork':
        return new dohs.Tork();
      case 'elros':
        return new core.Elros();
      case 'jaheen':
        return new core.Jaheen();
      case 'lorelai':
        return new core.Lorelai();
      case 'maya':
        return new core.Maya();
      case 'vorn':
        return new core.Vorn();
      case 'andreas-cleric':
        return new awakenings.AndreasCleric();
      case 'andreas':
        return new awakenings.AndreasNecromancer();
      case 'catharina-mage':
        return new awakenings.CatharinaMage();
      case 'catharina':
        return new awakenings.CatharinaShaman();
      case 'nyx-assassin':
        return new awakenings.NyxAssassin();
      case 'nyx':
        return new awakenings.NyxSwordmage();
      case 'vacren':
        return new awakenings.VacrenWarlord();
      case 'vacren-warrior':
        return new awakenings.VacrenWarrior();
      default:
        console.error("Unknown hero: " + id);
    }
  }

  return {
    heroes,
    getHero,
    hasInCampaign,
    findInCampaign,
    findAllInCampaign,
    add,
    removeFromCampaign,
  };
});
