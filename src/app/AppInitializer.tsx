import { useEffect } from 'react';
import { useEventContext } from '../context/EventContext';
import { EventService } from '../services/eventService';

export const AppInitializer = () => {
  const { setActiveEvent } = useEventContext();

  useEffect(() => {
    const fetchActiveEvent = async () => {
      try {
        const result = await EventService.getActiveEvent();
        if (result.data?.success) {
            setActiveEvent(result.data?.data ?? null)
        }
      } catch (error) {
        console.error("Failed to fetch active event", error);
      }
    };

    fetchActiveEvent();
  }, []);

  return null; 
};
