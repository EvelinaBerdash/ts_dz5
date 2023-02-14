export interface Place {
  id: string;
  image: string;
  name: string;
  description: string;
  remoteness: number;
  bookedDates: number[];
  price: number;
}
  
  export interface FavoritePlace {
    id: string;
    image: string;
    name: string;
  }
