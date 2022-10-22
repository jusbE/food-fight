import express from 'express';
import cors from 'cors'
import { fetchFood, fetchFoodNames } from './integrations/fineliApi';
import { fight } from './utils/fight';
import { createFighter } from './utils/fighterUtils';
import { getFighterImage } from './integrations/googleApi';

const app = express();
const port = 3001;

app.use(cors())

//Todo: swagger doc
app.get('/fighter', async (req, res) => {
  //Todo: request validation'
  try {
    const food = String(req.query.name)
    const fineliFood = await fetchFood(food)
    if (fineliFood) {
      const appearance = await getFighterImage(fineliFood.name.en, fineliFood.name.fi)
      const fighter = createFighter(fineliFood, appearance)
      res.send(fighter);
    } else {
      res.status(404).send('Fighter not found');
    }
  } catch (err) {
    console.error(JSON.stringify(err))
    res.status(500).send('Internal error occured')
  }
});

app.get('/fighterNames', async (req, res) => {
  //Todo: request validation
  try {
    const name = String(req.query.name)
    const fineliFood = await fetchFoodNames(name)
    if (fineliFood) {
      res.send(fineliFood);
    } else {
      res.status(404).send('Fighter not found');
    }
  } catch (err) {
    console.error(JSON.stringify(err))
    res.status(500).send('Internal error occured')
  }
});

app.get('/fight', async (req, res) => {
  //Todo: request validation
  try {
    const food1 = String(req.query.name1)
    const food2 = String(req.query.name2)
    const fineliFood1 = await fetchFood(food1)
    const fineliFood2 = await fetchFood(food2)
    if (fineliFood1 && fineliFood2) {
      const fighter1 = createFighter(fineliFood1)
      const fighter2 = createFighter(fineliFood2)
      const result = await fight(fighter1, fighter2)
      res.send(result);
    } else {
      res.status(404).send('Fighter(s) not found');
    }
  } catch (err) {
    console.error(JSON.stringify(err))
    res.status(500).send('Internal error occured')
  }
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});