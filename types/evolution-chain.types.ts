import { Result } from "./search.types";

export interface EvolutionChain {
  baby_trigger_item: Result;
  chain: Chain;
  id: number;
}

export interface Chain {
  evolution_details: Evolutiondetail[];
  evolves_to: Chain[];
  is_baby: boolean;
  species: Result;
}

export interface Evolutiondetail {
  gender: number;
  held_item: Result;
  item: Result;
  known_move: Result;
  known_move_type: Result;
  location: Result;
  min_affection: number;
  min_beauty: number;
  min_happiness: number;
  min_level: number;
  needs_overworld_rain: boolean;
  party_species: Result;
  party_type: Result;
  relative_physical_stats: number;
  time_of_day: string;
  trade_species: Result;
  trigger: Result;
  turn_upside_down: boolean;
}
