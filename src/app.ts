import express from 'express';
import { fetchFood } from './integrations/fineliApi';
import { createFighter } from './utils/fighterUtils';

const app = express();
const port = 3000;

//Todo: swagger doc
app.get('/fighter', async (req, res) => {
  //Todo: request validation
  const food = String(req.query.name)
  const fineliFood = await fetchFood(food)
  const fighter = createFighter(fineliFood)
  res.send(fighter);
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});