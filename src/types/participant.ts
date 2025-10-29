export interface ParticipantDto {
    id: string;
    firstName: string;
    lastName: string;
    fullName: string;
    employeeId?: string;
    eventId: string;
    isRegistered: boolean;
    registeredAt?: string;
}