import { Activity } from './activity';

export interface Session {
    id: string
    weight?: number;
    sessionDate?: Date;
    sessionType: string;
    activities: Activity[];
}

export interface SessionType {
    id: string;
    name: string;
}
