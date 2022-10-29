import axios from 'axios';
import { config } from '../utils/config';

const { integrations: { fineli: { baseUrl } } } = config

type FineliResponse = FineliFood[]

export interface FineliFood {
  id: string,
  name: {
    fi: string,
    en: string
  },
  energyKcal: number
  fat: number,
  carbohydrate: number,
  protein: number
}

export const fetchFood = async (foodName: string): Promise<FineliFood | undefined> => {
  const queryParams = {
    q: foodName
  }
  const res = (await axios.get<FineliResponse>(baseUrl, { params: queryParams })).data
  if (res?.length > 0) {
    const bestMatch = res.find(food => food.name.fi.toLowerCase() == foodName.toLowerCase())
    if (bestMatch) {
      return {
        id: bestMatch.id,
        name: {
          fi: bestMatch.name?.fi,
          en: bestMatch.name?.en,
        },
        energyKcal: bestMatch.energyKcal,
        fat: bestMatch.fat,
        carbohydrate: bestMatch.carbohydrate,
        protein: bestMatch.protein
      }
    }
  }
}

export const fetchFoodNames = async (foodName: string): Promise<String[]> => {
  const queryParams = {
    q: foodName
  }
  const names: string[] = []
  const res = (await axios.get<FineliResponse>(baseUrl, { params: queryParams })).data
  if (res) {
    names.push(...res.map(food => food.name.fi).filter((name) => !name.includes(',')))
  }
  return names
}