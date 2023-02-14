import { Place } from "./Place";
import { Provider } from "./Provider";

export interface HomyPlace extends Omit<Place, "id"> {
  id: number;
}

export class HomeProvider implements Provider {
  public convertResponseToPlace(place: HomyPlace): Place {
    return {
      id: String(place.id),
      image: place.image,
      name: place.name,
      description: place.description,
      remoteness: place.remoteness,
      bookedDates: place.bookedDates,
      price: place.price,
    };
  }
  public getById(id: string): Promise<Place> {
    return fetch(`http://localhost:3030/places/${id}`)
      .then<HomyPlace>((response) => {
        return response.json(); // Error!
      })
      .then<Place>((homyPlace) => {
        return this.convertResponseToPlace(homyPlace);
      });
  }
}