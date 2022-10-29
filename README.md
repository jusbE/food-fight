# food-fight
Solidabis koodihaaste 2022

# Summary

Integrations used:
- Fineli API (https://fineli.fi/fineli/api/v1/foods)
  - Get base stats for food fighters.
- Google custom search API (https://customsearch.googleapis.com/customsearch/v1)
  - Get image based on foodname. If english name does not return any hits it tries to find in finnish.

Implementation is based on expressjs. This backend exposes 3 apis:
- GET /fighter?name={name}
  - returns food fighter with converted stats in json format
  - example: /fighter?name=tomaatti
- GET /fighterNames?prefix={prefix}
  - returns list of possible fighter names based on prefix parameter in json format
  - example: /fighterNames?name=toma
- GET /fightResult?name1={name1}&name2={name2}
  - returns battlelog in json format between given fighters
  - This execution might take couple of seconds depending on how though fighters there are :)
  - example: /fightResult?name1=Kurkku&name2=Tomaatti

## Prerequisite
- Node 16

## Local setup

### Environment variables
- PORT 
  - Server port to listen, defaults to 3001
- GOOGLE_APIKEY
  - Apikey to use google search engine
- GOOGLE_ENGINE
  - Id of google engine

### Run local
Run commands below in terminal, root of the project
```
npm install
npm run build
npm run start
```
