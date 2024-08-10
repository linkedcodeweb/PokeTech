import { Result } from "./search.types";

export interface Type {
  damage_relations: TypeRelations;
  game_indices: Gameindex[];
  generation: Result;
  id: number;
  move_damage_class: null;
  moves: Result[];
  name: string;
  names: Name[];
  past_damage_relations: any[];
  pokemon: Pokemons[];
}

export interface Pokemons {
  pokemon: Result;
  slot: number;
}

export interface Name {
  language: Result;
  name: string;
}

export interface Gameindex {
  game_index: number;
  generation: Result;
}

export interface TypeRelations {
  double_damage_from: Result[];
  double_damage_to: Result[];
  half_damage_from: Result[];
  half_damage_to: Result[];
  no_damage_from: Result[];
  no_damage_to: Result[];
}
