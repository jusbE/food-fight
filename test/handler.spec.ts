import { getFighter, getFighterNames, getFightResult } from '../src/handler'
import { FoodFighter } from '../src/models/foodFighter'
import { fight } from '../src/utils/fight'
import expectedBattlelog from './resources/battlelog_tomaatti_vs_kurkku.json'

jest.mock('../src/integrations/fineliApi', () => ({
  fetchFood: async (name: string) => {
    let fineliResponse
    if (name === 'tomaatti') {
      fineliResponse = {
        "id": 352,
        "name": {
          "fi": "Tomaatti",
          "en": "Tomato"
        },
        "energyKcal": 22.722060444921304,
        "fat": 0.300000011920929,
        "carbohydrate": 3.45000004768372,
        "protein": 0.550000011920929
      }
    } else if (name === 'kurkku') {
      fineliResponse = {
        "id": 346,
        "name": {
          "fi": "Kurkku",
          "en": "Cucumber"
        },
        "energyKcal": 11.292942915993047,
        "fat": 0.100000001490116,
        "carbohydrate": 1.39999997615814,
        "protein": 0.649999976158142
      }
    }
    return fineliResponse
  }
}))

jest.mock('../src/integrations/googleApi', () => ({
  getFighterImage: async () => {
    return 'linktopicture.fi'
  }
}))

describe('handler', () => {
  describe('getFighter()', () => {
    it('should map fighter correctly based on fineli response', async () => {
      const fighter = await getFighter('tomaatti')
      const excpected = { appearance: 'linktopicture.fi', attack: 3.5, defence: 0.6, health: 22.7, name: 'Tomaatti', speed: 4.3 }
      expect(fighter).toEqual(excpected)
    })
  })
  describe('fight()', () => {
    it('should calculate battlelog correctly', async () => {
      const fighter1 = await getFighter('tomaatti')
      const fighter2 = await getFighter('kurkku')
      const battlelog = await fight(fighter1 as FoodFighter, fighter2 as FoodFighter)
      expect(battlelog).toEqual(expectedBattlelog)
    })
  })
})