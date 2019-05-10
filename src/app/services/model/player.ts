import { Foosball } from './foosball';
import { CarRacing } from './car-racing';
import { TableTennis } from './table-tennis';

export interface Player {
    id: string;
    name: string;
    foosball: Foosball;
    carRacing: CarRacing;
    tableTennis: TableTennis;
}
