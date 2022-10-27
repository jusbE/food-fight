import { fetchFood, fetchFoodNames } from "./integrations/fineliApi";
import { getFighterImage } from "./integrations/googleApi";
import { BattleLog } from "./models/battleLog";
import { FoodFighter } from "./models/foodFighter";
import { fight } from "./utils/fight";
import { createFighter } from "./utils/fighterUtils";

export const getFighter = async (foodName: string): Promise<FoodFighter | undefined> => {
  const fineliFood = await fetchFood(foodName)
  if (fineliFood) {
    const appearance = await getFighterImage(fineliFood.name.en, fineliFood.name.fi)
    return createFighter(fineliFood, appearance)
  }
}

export const getFighterNames = async (prefix: string): Promise<String[]> => {
  return await fetchFoodNames(prefix)
}

export const getFightResult = async (foodName1: string, foodName2: string): Promise<BattleLog> => {
  const fineliFood1 = await fetchFood(foodName1)
  const fineliFood2 = await fetchFood(foodName2)
  if (fineliFood1 && fineliFood2) {
    const appearance1 = await getFighterImage(fineliFood1.name.en, fineliFood1.name.fi)
    const appearance2 = await getFighterImage(fineliFood2.name.en, fineliFood2.name.fi)
    const fighter1 = createFighter(fineliFood1, appearance1)
    const fighter2 = createFighter(fineliFood2, appearance2)
    return await fight(fighter1, fighter2)
  }
}