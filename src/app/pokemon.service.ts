import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pokemon } from 'src/Pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  http: HttpClient;

  // We are using dependency injection to inject the HttpClient object into the PokemonService object
  constructor(http: HttpClient) {
    this.http = http;
  }

  getPokemon(id: number): Observable<HttpResponse<Pokemon>> {
    // Remember that fetch returns a Promise
    // HttpClient will return an observable
    return this.http.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${id}`, {
      // 'withCredentials': true // If you are using HttpSession (cookie based authorization), then you need to have this option
      // so that you include cookies in the request

      'observe': 'response'
    });
  }

}
