import React, { useRef, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card'
import styles from './CreateEvent.module.scss';
import { EventService } from '../../services/eventService';
import { CreatEventPayload, EventResponse } from '../../types/event';
import { Toast } from 'primereact/toast';
import { ToastService } from '../../services/toastService';
import { AxiosError } from 'axios';
import { ResultModel } from '../../types/resultModel';
import { useEventContext } from '../../context/EventContext';

type CreateEventDto = {
   name: string;
   description?: string;
   startDateUtc: Date | null | undefined;
   endDateUtc: Date | null | undefined;
   isActive: boolean;
};

const CreateEvent = () => {
   const [event, setEvent] = useState<CreateEventDto>({
      name: '',
      description: '',
      startDateUtc: null,
      endDateUtc: null,
      isActive: false
   });
   const isFormValid = !!event.name && !!event.startDateUtc && !!event.endDateUtc;

   const [isSubmitting, setIsSubmitting] = useState(false);
   const { refreshActiveEvent } = useEventContext();

   const toastRef = useRef<Toast>(null!);
   const toast = new ToastService(toastRef);

   const handleSubmit = async () => {
      setIsSubmitting(true);

      const payload = buildPayload(event);
      try {
         const isNameValid = await validateEventName(payload.name);
         if (!isNameValid) return;

         const result = await EventService.createEvent(payload);
         handleCreateResponse(result.data);
      } catch (error) {
         const err = error as AxiosError;

         console.error("API error:", err.response?.data || err.message);
         toast.showError("Failed to reach the server or process the request.");
      } finally {
         setIsSubmitting(false);
      }
   }

   const buildPayload = (event: CreateEventDto): CreatEventPayload => ({
      name: event.name,
      description: event.description,
      startDateUtc: event.startDateUtc?.toISOString() ?? "",
      endDateUtc: event.endDateUtc?.toISOString() ?? "",
      isActive: event.isActive,
   });

   const validateEventName = async (name: string): Promise<boolean> => {
      const result = await EventService.validateEventName(name);
      const isValid = result.data.data;

      if (!isValid) {
         toast.showWarn(result.data.message ?? "Event name is not valid.");
      }

      return isValid!;
   };

   const handleCreateResponse = (response: ResultModel<EventResponse>) => {
      const { success, message } = response;

      if (success) {
         toast.showSuccess(message ?? "Event created successfully!");

         if (event.isActive)
            refreshActiveEvent();
      } else {
         toast.showError(message ?? "Failed to create event.");
      }
   };


   return (
      <>
         <Toast ref={toastRef} />
         <Card className={styles.card}>
            <h2> Create Event</h2>

            <div className="p-fluid">
               <div className={`p-field ${styles["form-group"]}`} style={{ textAlign: 'left' }}>
                  <label>Name</label>
                  <InputText
                     value={event.name}
                     onChange={(e) => setEvent({ ...event, name: e.target.value })}
                  />
               </div>

               <div className={`p-field ${styles["form-group"]}`} style={{ textAlign: 'left' }}>
                  <label>Description</label>
                  <InputText
                     value={event.description}
                     onChange={(e) => setEvent({ ...event, description: e.target.value })}
                  />
               </div>

               <div className={`p-field ${styles["form-group"]}`} style={{ textAlign: 'left' }}>
                  <label htmlFor="startDate">Start Date</label>
                  <Calendar
                     id="startDate"
                     value={event.startDateUtc}
                     onChange={(e) => setEvent({ ...event, startDateUtc: e.value })}
                     showIcon
                  />
               </div>

               <div className={`p-field ${styles["form-group"]}`} style={{ textAlign: 'left' }}>
                  <label htmlFor="endDate">End Date</label>
                  <Calendar
                     id="endDate"
                     value={event.endDateUtc}
                     onChange={(e) => setEvent({ ...event, endDateUtc: e.value })}
                     showIcon
                  />
               </div>

               <div className={`p-field-checkbox ${styles["form-group"]}`}>
                  <Checkbox
                     checked={event.isActive ?? false}
                     onChange={(e) => setEvent({ ...event, isActive: e.checked ?? false })}
                  />
                  <label style={{ marginLeft: '0.5rem' }}>Is Active</label>
               </div>

               <Button label={isSubmitting ? 'Creating...' : 'Create Event'}
                  icon={isSubmitting ? 'pi pi-spin pi-spinner' : undefined}
                  disabled={isSubmitting || !isFormValid}
                  loading={isSubmitting}
                  onClick={handleSubmit} />
            </div>
         </Card>
      </>
   )
}


export default CreateEvent;