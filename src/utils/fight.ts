import { BattleEvent, BattleLog } from "../models/battleLog";
import { FoodFighter } from "../models/foodFighter";

const calculateDamage = (attack: number, defence: number): number => {
  return attack * (1 - (defence / 100))
}

const recordEvent = (eventTime: string, attacker: string, attackerLink: string, defender: string, defenderLink: string, damage: number, defenderHealth: number): BattleEvent => {
  return {
    eventTime,
    attacker,
    attackerLink,
    defender,
    defenderLink,
    damage: damage.toFixed(1),
    defenderHealth: defenderHealth.toFixed(1),
  }
}

const createBattleLog = (fighter1Name: string, fighter2Name: string, winner: string, events: BattleEvent[]): BattleLog => {
  return {
    fighter1: fighter1Name,
    fighter2: fighter2Name,
    winner,
    events
  }
}

export const fight = async (fighter1: FoodFighter, fighter2: FoodFighter): Promise<BattleLog> => {
  //Todo: split code to smaller functions
  const events: BattleEvent[] = []
  let health1 = fighter1.health
  let health2 = fighter2.health
  let damage1 = calculateDamage(fighter1.attack, fighter2.defence)
  let damage2 = calculateDamage(fighter2.attack, fighter1.defence)
  const interval1 = 1 / fighter1.speed * 1000
  const interval2 = 1 / fighter2.speed * 1000
  let intervalId1
  let intervalId2
  const startTime = Date.now()
  const theFight = new Promise<string>((resolve) => {
    intervalId1 = setInterval(() => {
      const durationSeconds = ((Date.now() - startTime) / 1000).toFixed(2)
      health2 = health2 - damage1
      events.push(recordEvent(durationSeconds, fighter1.name, fighter1.appearance, fighter2.name, fighter2.appearance, damage1, health2))
      if (health2 <= 0) {
        resolve(fighter1.name);
      }
    }, interval1);
    intervalId2 = setInterval(() => {
      const durationSeconds = ((Date.now() - startTime) / 1000).toFixed(2)
      health1 = health1 - damage2
      events.push(recordEvent(durationSeconds, fighter2.name, fighter2.appearance, fighter1.name, fighter1.appearance, damage2, health1))
      if (health1 <= 0) {
        resolve(fighter2.name);
      }
    }, interval2);
  });
  const winner = await theFight
  clearInterval(intervalId1)
  clearInterval(intervalId2)
  return createBattleLog(fighter1.name, fighter2.name, winner, events)
}