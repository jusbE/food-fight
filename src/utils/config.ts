export interface Config {
  server: {
    port: number,
  }
  integrations: {
    google: {
      baseUrl: string
      apikey: string
      engine: string
    }
    fineli: {
      baseUrl: string
    }
  }
}

const getEnvVariable = (key: string): string => {
  const value = process.env[key]
  if (value) {
    return value
  }
  throw new Error(`Env variable ${key} not set`)
}

export const config: Config = {
  server: {
    port: Number(process.env.PORT || 3001),
  },
  integrations: {
    google: {
      baseUrl: 'https://customsearch.googleapis.com/customsearch/v1',
      apikey: getEnvVariable('GOOGLE_APIKEY'),
      engine: getEnvVariable('GOOGLE_ENGINE')
    },
    fineli: {
      baseUrl: 'https://fineli.fi/fineli/api/v1/foods'
    }
  }
}