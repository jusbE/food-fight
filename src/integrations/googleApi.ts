import axios from 'axios';
import { config } from '../utils/config';

const SEARCH_PREFIX = 'smiling'
const SEARCH_TYPE = 'image'

const { integrations: { google: { apikey, baseUrl, engine } } } = config

export interface SearchResponse {
  items: [
    {
      link: string
    }
  ]
}

export const getFighterImage = async (foodNameEn: string, foodNameFi: string): Promise<string | undefined> => {
  const queryParams = {
    cx: engine,
    key: apikey,
    exactTerms: `${SEARCH_PREFIX} ${foodNameEn}`,
    searchType: SEARCH_TYPE
  }
  let res = (await axios.get<SearchResponse>(baseUrl, { params: queryParams })).data
  if (!res?.items?.length) {
    res = (await axios.get<SearchResponse>(baseUrl, { params: { ...queryParams, exactTerms: foodNameFi } })).data
  }
  return res?.items?.length > 0 ? res.items[0].link : undefined
}