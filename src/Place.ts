import { Flat } from "./flat-rent-sdk";

export interface Place {
  id: number;
  image: string;
  photos?: string[];
  name: string;
  title?: string;
  description: string;
  details: string;
  remoteness: number;
  coordinates?: number[];
  bookedDates: number[];
  price: number;
}
  
  export interface FavoritePlace {
    id: number | string;
    image: string;
    name: string;
  }

  export interface FavoritePlaceFlat extends Partial<Flat> {
    id: string;
    photos: string[];
    title: string;
  }