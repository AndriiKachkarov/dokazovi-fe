import axios, { AxiosResponse } from 'axios';

const BASE_URL = 'https://api.imgur.com/3';
const CLIENT_ID = '4415dae57a57524';

export type ImgurPostResponseType = {
  data: { deletehash: string; link: string };
};

export const postImage = (
  url: string,
  config = {
    headers: {
      Authorization: `Client-ID ${CLIENT_ID}`,
    },
  },
): Promise<AxiosResponse<ImgurPostResponseType>> => {
  const formData = new FormData();
  formData.append('image', url);
  return axios.post(`${BASE_URL}/image`, formData, {
    method: 'post',
    ...config,
  });
};

// Fetch version for localhost

export interface IFetchConfig {
  headers: {
    Authorization: string;
  };
  mode: RequestMode;
}

export const postImageFetch = async (
  url: string,
  config = {
    headers: {
      Authorization: `Client-ID ${CLIENT_ID}`,
    },
    mode: 'cors',
  } as IFetchConfig,
): Promise<any> => {
  const formData = new FormData();
  formData.append('image', url);
  let result;
  try {
    const response = await fetch(`${BASE_URL}/image`, {
      method: 'POST',
      body: formData,
      ...config,
    });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    result = await response.json();
  } catch (error) {
    console.error(error);
  }
  console.log(result);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return result;
};

// show the remaining limits to make requests to the imgurAPI
// By defalut imgur provide us approximately 1,250 uploads per day or approximately 12,500 requests per day.
// Max 12,500 requests - allowed during 1 month
// If the daily limit is hit five times in a month, then the app will be blocked for the rest of the month
export const getLimits = (
  config = {
    headers: {
      Authorization: `Client-ID ${CLIENT_ID}`,
    },
  },
): Promise<AxiosResponse> => {
  return axios.get(`${BASE_URL}/credits`, {
    method: 'get',
    ...config,
  });
};
