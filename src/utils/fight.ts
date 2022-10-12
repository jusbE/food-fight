import { FoodFighter } from "../models/foodFighter";

const calculateDamage = (attack: number, defence: number): number => {
  return attack * (1 - (defence / 100))
}

export const fight = async (fighter1: FoodFighter, fighter2: FoodFighter): Promise<string> => {
  //Todo: split code to smaller functions
  let health1 = fighter1.health
  let health2 = fighter2.health
  let damage1 = calculateDamage(fighter1.attack, fighter2.defence)
  let damage2 = calculateDamage(fighter2.attack, fighter1.defence)
  const interval1 = 1 / fighter1.speed * 1000
  const interval2 = 1 / fighter2.speed * 1000
  console.log(`Fight starting between ${fighter1.name} hp: ${fighter1.health} interval: ${interval1} and ${fighter2.name} hp: ${fighter2.health} interval: ${interval2}`)
  let intervalId1
  let intervalId2
  const theFight = new Promise<string>((resolve) => {
    intervalId1 = setInterval(() => {
      health2 = health2 - damage1
      console.log(`${fighter1.name} attacked ${fighter2.name} with damage of ${damage1}. ${health2} health left for ${fighter2.name}`)
      if (health2 <= 0) {
        resolve(`${fighter1.name} won`);
      }
    }, interval1);
    intervalId2 = setInterval(() => {
      health1 = health1 - damage2
      console.log(`${fighter2.name} attacked ${fighter1.name} with damage of ${damage2}. ${health1} health left for ${fighter1.name}`)
      if (health1 <= 0) {
        resolve(`${fighter2.name} won`);
      }
    }, interval2);
  });
  const result = await theFight
  clearInterval(intervalId1)
  clearInterval(intervalId2)
  return result
}