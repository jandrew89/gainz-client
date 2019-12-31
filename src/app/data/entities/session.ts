import { Activity } from './activity';

export interface Session {
    id: string
    weight?: number;
    sessionDate?: Date;
    sessionType: string;
    sessionPlan?: SessionPlanViewModel
    activities: Activity[];
}

export interface SessionType {
    id: string;
    name: string;
}

export interface SessionPlanViewModel {
    id: string;
    sessionPlanName: string;
}
