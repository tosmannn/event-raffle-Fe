import { createContext, useContext, useState } from 'react';
import { EventNameAndIdResponse } from '../types/event';
import { EventService } from '../services/eventService';

export type EventContextType = {
    activeEvent: EventNameAndIdResponse | null;
    setActiveEvent: (event: EventNameAndIdResponse | null) => void;
    refreshActiveEvent: () => Promise<void>;
};

const EventContext = createContext<EventContextType | undefined>(undefined);

export const useEventContext = () => {
    const ctx = useContext(EventContext);
    if (!ctx) throw new Error("useEventContext must be used within EventProvider");
    return ctx;
};

export const EventProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [activeEvent, setActiveEvent] = useState<EventNameAndIdResponse | null>(null);

    const refreshActiveEvent = async () => {
        try {
            const result = await EventService.getActiveEvent();
            if (result.data?.success) {
                setActiveEvent(result.data?.data ?? null);
            }
        } catch (err) {
            console.error("Failed to refresh active event", err);
        }
    }

    return (
        <EventContext.Provider value={{ activeEvent, setActiveEvent, refreshActiveEvent }}>
            {children}
        </EventContext.Provider>
    );
};
