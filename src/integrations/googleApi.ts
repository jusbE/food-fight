import axios, { AxiosRequestConfig } from 'axios';
import { defaultRetryConfiguration } from '../utils/axiosConfiguration'
import { config } from '../utils/config';

const SEARCH_PREFIX = 'smiling'
const SEARCH_TYPE = 'image'

const { integrations: { google: { apikey, baseUrl, engine } } } = config

const cache: Map<string, string> = new Map<string, string>()

export interface SearchResponse {
  items: [
    {
      link: string
    }
  ]
}

export const getFighterImage = async (foodNameEn: string, foodNameFi: string): Promise<string | undefined> => {
  if (cache.get(foodNameEn)) {
    return cache.get(foodNameEn)
  }
  const queryParams = {
    cx: engine,
    key: apikey,
    exactTerms: `${SEARCH_PREFIX} ${foodNameEn}`,
    searchType: SEARCH_TYPE
  }
  const requestConfig: AxiosRequestConfig = {
    method: 'GET',
    url: baseUrl,
    params: queryParams,
    raxConfig: defaultRetryConfiguration,
  }
  let res = (await axios.request<SearchResponse>(requestConfig)).data
  if (!res?.items?.length) {
    res = (await axios.request<SearchResponse>({ ...requestConfig, params: { ...queryParams, exactTerms: foodNameFi } })).data
  }
  const imageLink = res?.items?.length > 0 ? res.items[0].link : undefined
  if (imageLink) {
    cache.set(foodNameEn, imageLink)
  }
  return imageLink
}