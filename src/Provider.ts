import { Place } from "./Place";

export interface Provider {
  convertResponseToPlace(response): Place;
  getById(id: string): Promise<Place>;
}