import { EquipmentViewModel } from './ViewModel/equipmentviewmodel';

export interface SessionPlan {
    id: string; 
    sessionPlanName: string;
    sessionType: string;
    equipment: EquipmentViewModel[];
}

export interface SessionPlanDto {
    id: string;
    sessionPlanName: string;
}