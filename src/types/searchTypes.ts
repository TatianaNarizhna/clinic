export interface IResItem {
  longName: string;
  registration: string;
  psm: string;
  metaTitle: string;
  metaDescription: string;
  slug: string;
  website: string;
  name: string;
  isDisplay: boolean;
  clinicSuburbLink: string;
  address: string;
  city: string;
  suburb: string;
  state: string;
  postcode: string;
  email: string;
  phone: string;
  nearby1: string;
  nearby1Link: string;
  nearby2: string;
  nearby2Link: string;
  nearby3: string;
  nearby3Link: string;
  nearby4: string;
  nearby4Link: string;
  about: string;
  latitude: number;
  longitude: number;
}

export interface ISearchResponse {
  length: number;
  latitude: number;
  longitude: number;
  data: IResItem[];
}
