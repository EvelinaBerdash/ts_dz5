export interface Flat {
    id: string;
    title: string;
    details: string;
    photos: string[];
    coordinates: number[];
    bookedDates: string[];
    price: number;
  }
  
  export interface SearchParams {
    city: string;
    checkInDate: Date;
    checkOutDate: Date;
    priceLimit?: number | undefined;
  }
  
  export class FlatRentSdk {
    constructor();
    get(id: string): Promise<Flat>;
    search(parameters: SearchParams);
    book(flatId: number, checkInDate: Date, checkOutDate: Date): number;
  }