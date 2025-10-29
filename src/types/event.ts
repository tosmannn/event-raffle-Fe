export type CreatEventPayload = {
    name: string;
    description?: string;
    startDateUtc: string;
    endDateUtc: string;
    isActive: boolean;
};

export type EventResponse = {
    name: string;
    description?: string;
    startDateUtc: string;
    endDateUtc: string;
    isActive: boolean;
}


export type EventNameAndIdResponse = {
    id: string;
    name: string;
}