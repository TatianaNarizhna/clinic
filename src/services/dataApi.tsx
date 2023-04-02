import axios from 'axios';
import { ISearchResponse } from '../types/searchTypes';
const BASE_URL = 'https://north-wind.pp.ua:5544/api/v1';

export const getSearchResult = async (value: string, search: string) => {
  try {
    const response = await axios.get<ISearchResponse>(
      `${BASE_URL}/clinics/${value}/${search}`,
    );
    // console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};
