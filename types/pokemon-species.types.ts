import { Result } from "./search.types";

export interface PokemonSpecies {
  base_happiness: number;
  capture_rate: number;
  color: Result;
  egg_groups: Result[];
  evolution_chain: EvolutionchainUrl;
  evolves_from_species: Result;
  flavor_text_entries: Flavortextentry[];
  form_descriptions: any[];
  forms_switchable: boolean;
  gender_rate: number;
  genera: Genus[];
  generation: Result;
  growth_rate: Result;
  habitat: Result;
  has_gender_differences: boolean;
  hatch_counter: number;
  id: number;
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  name: string;
  names: Name[];
  order: number;
  pal_park_encounters: Palparkencounter[];
  pokedex_numbers: Pokedexnumber[];
  shape: Result;
  varieties: Variety[];
}

export interface Variety {
  is_default: boolean;
  pokemon: Result;
}

export interface Pokedexnumber {
  entry_number: number;
  pokedex: Result;
}

export interface Palparkencounter {
  area: Result;
  base_score: number;
  rate: number;
}

export interface Name {
  language: Result;
  name: string;
}

export interface Genus {
  genus: string;
  language: Result;
}

export interface Flavortextentry {
  flavor_text: string;
  language: Result;
  version: Result;
}

export interface EvolutionchainUrl {
  url: string;
}
