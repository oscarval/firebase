import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import { Heroe } from "../interfaces/heroe.interface";
import "rxjs";

@Injectable()
export class HeroesService {
  heroesURL: string = "https://heroesapp-6522e.firebaseio.com/heroes.json";
  heroeURL: string = "https://heroesapp-6522e.firebaseio.com/heroes/";
  constructor(private http: Http) {}

  /**
   * Insertamos un Heroe nuevo pasando el objeto heroe
   */
  nuevoHeroe(heroe: Heroe) {
    let body = JSON.stringify(heroe);
    let headers = new Headers({
      "Content-Type": "application/json"
    });

    return this.http.post(this.heroesURL, body, { headers }).map(res => {
      console.log(res.json());
      return res.json();
    });
  }
  /**
   * Actualizamos el heroe mandando todo el objeto json
   * @param heroe
   * @param key$
   */

  actualizarHeroe(heroe: Heroe, key$: string) {
    let body = JSON.stringify(heroe);
    let headers = new Headers({
      "Content-Type": "application/json"
    });

    let url = `${this.heroeURL}/${key$}.json`;

    return this.http.put(this.heroesURL, body, { headers }).map(res => {
      return res.json();
    });
  }
/**
 * Obtenemos el Heroe mediante el ID
 * @param key$
 */
  getHeroe(key$: string) {
    let headers = new Headers({
      "Content-Type": "application/json"
    });
    let url = `${this.heroeURL}/${key$}.json`;
    return this.http.get(url, { headers }).map(res => {
      return res.json();
    });
  }
}
