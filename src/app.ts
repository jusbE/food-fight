import express from 'express';
import cors from 'cors'
import { config } from './utils/config';
import { getFighter, getFighterNames, getFightResult } from './handler';

const app = express();
const port = config.server.port;

app.use(cors())

app.get('/fighter', async (req, res) => {
  try {
    const foodName = String(req.query.name)
    const fighter = await getFighter(foodName)
    if (fighter) {
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
  try {
    const prefix = String(req.query.prefix)
    const fighterNames = await getFighterNames(prefix)
    res.send(fighterNames);
  } catch (err) {
    console.error(JSON.stringify(err))
    res.status(500).send('Internal error occured')
  }
});

app.get('/fightResult', async (req, res) => {
  try {
    const food1 = String(req.query.name1)
    const food2 = String(req.query.name2)
    const fightResult = await getFightResult(food1, food2)
    if (fightResult) {
      res.send(fightResult);
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