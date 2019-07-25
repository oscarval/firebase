import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import { Heroe } from "../interfaces/heroe.interface";
import "rxjs";

@Injectable()
export class HeroesService {
  heroesURL: string = "https://heroesapp-6522e.firebaseio.com/heroes.json";
  heroeURL: string = "https://heroesapp-6522e.firebaseio.com/heroes/";
  constructor(private http: Http) { }

  /**
   * insert new Heroe send all object json
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
   * update heroe send all object json
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
   * Get the Heroe by ID
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
  /**
   * Get all recors of heroes
   */
  getHeroes() {
    let headers = new Headers({
      "Content-Type": "application/json"
    });
    let url = `${this.heroesURL}`;
    return this.http.get(url, { headers }).map(res => {
      return this.createArray(res.json());
    });
  }

  private createArray(heroesObj: object) {
    const heroes: Heroe[] = [];

    Object.keys(heroesObj).forEach(key => {
      const heroe: Heroe = heroesObj[key];
      heroe.key$ = key;
      heroes.push(heroe);
    });

    if (heroesObj === null) { return []; }

    return heroes;
  }
}
