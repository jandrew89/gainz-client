export interface User {
    id: string;
    firstName?: string;
    lastName?: string;
    settings: EnvironmentSettings;
    sessions: UserSession[];
}

export interface UserSession {

}

export interface EnvironmentSettings {
    sessionsListLoadAmount: number;
    previousSetLoadAmount: number;
}