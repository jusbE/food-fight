import express from 'express';
import cors from 'cors'
import { fetchFood, fetchFoodNames } from './integrations/fineliApi';
import { fight } from './utils/fight';
import { createFighter } from './utils/fighterUtils';

const app = express();
const port = 3001;

app.use(cors())

//Todo: swagger doc
app.get('/fighter', async (req, res) => {
  //Todo: request validation
  const food = String(req.query.name)
  const fineliFood = await fetchFood(food)
  if (fineliFood) {
    const fighter = createFighter(fineliFood)
    res.send(fighter);
  } else {
    res.status(404).send('Fighter not found');
  }
});

app.get('/fighterNames', async (req, res) => {
  //Todo: request validation
  const name = String(req.query.name)
  const fineliFood = await fetchFoodNames(name)
  if (fineliFood) {
    res.send(fineliFood);
  } else {
    res.status(404).send('Fighter not found');
  }
});

app.get('/fight', async (req, res) => {
  //Todo: request validation
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
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});