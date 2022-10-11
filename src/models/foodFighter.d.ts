export interface FoodFighter {
  name: string,
  health: number,
  attack: number,
  defence: number,
  speed: number,
}

export interface FineliFood {
  id: string,
  name: {
    fi: string,
  },
  energyKcal: number
  fat: number,
  carbohydrate: number,
  protein: number
}