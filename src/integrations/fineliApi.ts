import axios from 'axios';

const FINELI_BASE_URL = 'https://fineli.fi/fineli/api/v1/foods?q=';

type FineliResponse = FineliFood[]

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

export const fetchFood = async (foodName: string): Promise<FineliFood | undefined> => {
  const res = (await axios.get<FineliResponse>(`${FINELI_BASE_URL}${foodName}`)).data
  if (res) {
    const bestMatch = res.find(food => food.name.fi.toLowerCase() == foodName.toLowerCase())
    if (bestMatch) {
      return {
        id: bestMatch.id,
        name: {
          fi: bestMatch.name?.fi
        },
        energyKcal: bestMatch.energyKcal,
        fat: bestMatch.fat,
        carbohydrate: bestMatch.carbohydrate,
        protein: bestMatch.protein
      }
    }
  }
}