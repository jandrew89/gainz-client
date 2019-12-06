import { Equipment } from './equipment';

export interface Activity {
    id: string;
    notes?: string;
    equipment: Equipment;
    sets: Set[];
    order: number;
}

export interface Set {
    order: number;
    weight: number;
    reps: number;
}

export interface ActivityViewModel extends Activity {
    displayNewSet: boolean
}
