import { FineliFood } from "../integrations/fineliApi";
import { FoodFighter } from "../models/foodFighter";

export const createFighter = (fineliFood: FineliFood): FoodFighter => {
  const { name, energyKcal, carbohydrate, protein, fat } = fineliFood
  return {
    name: name.fi,
    health: Number(energyKcal.toFixed(1)),
    attack: Number(carbohydrate.toFixed(1)),
    defence: Number(protein.toFixed(1)),
    speed: Number((carbohydrate + protein + fat).toFixed(1))
  }
}