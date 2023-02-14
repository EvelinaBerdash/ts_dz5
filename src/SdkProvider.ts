import { Flat, FlatRentSdk } from "./flat-rent-sdk.js";
// import { HomyPlace } from "./HomyProvider";
import { Place } from "./Place";
import { Provider } from "./Provider";

export class SdkProvider implements Provider {
  constructor() {
    this.sdk = new FlatRentSdk();
  }
  private sdk: FlatRentSdk;

  public convertResponseToPlace(flat: Flat): Place {
    return {
      id: flat.id,
      image: flat.photos[0],
      name: flat.title,
      description: flat.details,
      remoteness: 0,
      bookedDates: [],
      price: flat.price,
    };
  }

  public getById(id: string): Promise<Place> {
    return this.sdk.get(id).then<Place>((flat) => {
      return this.convertResponseToPlace(flat);
    });
  }
}