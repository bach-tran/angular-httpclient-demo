import { Component } from '@angular/core';
import { Pokemon } from 'src/Pokemon';
import { PokemonService } from './pokemon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pokemon-info';

  myPokemon: Pokemon[] = [];
  pokemonService: PokemonService;
  pokemonId!: number;

  errorMessage: string = '';

  // Dependency injection: Angular will automatically provide an object of type PokemonService
  // to AppComponent. Importantly, only 1 instance of PokemonService exists for the entire Angular application (because
  // services are singletons)
  constructor(pokemonService: PokemonService) {
    this.pokemonService = pokemonService;
  }

  retrievePokemon() {
    // Ideally, you shouldn't be making HTTP calls directly inside of a component
    // Instead, this function will invoke a function inside of a service that will then make use of httpClient to send
    // the HTTP request
    // Angular.io definition:
    // Service is a broad category encompassing any value, function, or feature that an application needs. A service is typically a class with a narrow, well-defined purpose. It should do something specific and do it well.

    // the subscribe function takes an object, which contains 2 properties: next and error
    // the value of the next property should be a callback function if the observable successfully retrieves the "next"
    // value
    // the value of the error property should be a callback function if the observable encounters an error
    this.pokemonService.getPokemon(this.pokemonId).subscribe({
      'next': (res) => {
        this.errorMessage = '';

        if (res.status === 200) {
          let pokemon: Pokemon = res.body!;

          this.myPokemon.push(pokemon);
        }
      },
      'error': (err) => {
        this.errorMessage = err.error;
      }
    });
  }



}
