import { SessionType } from './session';

export interface Equipment {
    id: string; 
    name: string;
    sessionTypes: SessionType[];
}
