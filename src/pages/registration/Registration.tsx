import { useEffect, useEffectEvent, useRef, useState } from "react";
import { useEventContext } from "../../context/EventContext";
import { ParticipantDto } from "../../types/participant";
import { Toast } from "primereact/toast";
import { ToastService } from "../../services/toastService";
import { ParticipantService } from "../../services/participantService";
import { AxiosError } from "axios";
import RegistrationTable from "../../components/RegistrationTable";

const Registration = () => {
    const { activeEvent } = useEventContext();
    const [participants, setParticipants] = useState<ParticipantDto[]>([]);
    const toastRef = useRef<Toast>(null!);
    const toast = new ToastService(toastRef);

    useEffect(() => {
        let isMounted = true;
        async function getParticipants() {
            if (!activeEvent?.id) return;
            try {
                const result = await ParticipantService.getParticipants(activeEvent?.id!)

                if (result.data.success && isMounted)
                    setParticipants(result.data?.data!)
            } catch (error) {
                const err = error as AxiosError;

                if (isMounted) {
                    console.error("API error:", err.response?.data || err.message);
                    toast.showError("Failed to reach the server or process the request.");
                }
            }
        }

        getParticipants();

        return () => {
            isMounted = false;
        }
    }, [activeEvent?.id])

    if (activeEvent == undefined) {
        return null;
    }

    //return <Toast useRef= here>
    return (
        <>
            <div>
                <div>
                    <h2>Registration</h2>
                </div>
                <RegistrationTable participants={participants}/>
            </div>
            
        </>)
}

export default Registration;