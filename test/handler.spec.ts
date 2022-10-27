import { getFighter, getFighterNames, getFightResult } from '../src/handler'

jest.mock('../src/integrations/fineliApi', () => ({
  fetchFood: async () => {
    return {
      id: 'somid',
      name: {
        fi: 'tomaatti',
        en: 'tomato'
      },
      energyKcal: 100,
      fat: 100,
      carbohydrate: 40,
      protein: 30,
    }
  }
}))

jest.mock('../src/integrations/googleApi', () => ({
  getFighterImage: async () => {
    return 'somelinks.fi'
  }
}))

describe('handler', () => {
  describe('getFighter', () => {
    it('should map fighter correctly based on fineli response', async () => {
      const fighter = await getFighter('tomaatti')
      const excpected = { appearance: 'somelinks.fi', attack: 40, defence: 30, health: 100, name: 'tomaatti', speed: 170 }
      expect(fighter).toEqual(excpected)
    })
  })
  describe('fight', () => {
    it('should calculate battlelog correctly', () => {
      //do nothing
    })
  })
})