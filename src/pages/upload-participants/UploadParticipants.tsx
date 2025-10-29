import { useEventContext } from "../../context/EventContext";
import { FileUpload, FileUploadHandlerEvent } from "primereact/fileupload"
import { ParticipantService } from "../../services/participantService";
import { useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { ToastService } from "../../services/toastService";
import { AxiosError } from "axios";
import { Button } from "primereact/button";

const UploadParticipants = () => {
    const [uploaded, setUploaded] = useState<boolean>(false);
    const { activeEvent } = useEventContext();
    const toastRef = useRef<Toast>(null!);
    const toast = new ToastService(toastRef);

    if (activeEvent == undefined) {
        return null;
    }


    const handleUpload = async (event: FileUploadHandlerEvent) => {
        const file = event.files[0];
        if (!file) return;

        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("eventId", activeEvent.id);

            const result = await ParticipantService.createParticipants(formData);

            if (result.data.success) {

                toast.showSuccess(result.data.message!)
                event.options.clear();
                setUploaded(true);
            }

        } catch (error) {
            const err = error as AxiosError;

            console.error("API error:", err.response?.data || err.message);
            toast.showError("Failed to reach the server or process the request.");
            setUploaded(false);
        }
    };

    return <>

        {activeEvent?.id ? (
            <div>
                {uploaded &&
                    <h2>
                        Proceed to Registration
                    </h2>
                }
                <div>
                    <Button
                        label="Download Template"
                        icon="pi pi-download"
                        onClick={() => window.open("/templates/participant-template.xlsx", "_blank")}
                        style={{ marginBottom: "0.5rem" }}
                    />
                </div>

                <Toast ref={toastRef} />
                <FileUpload
                    name="file"
                    accept=".xlsx,.xls"
                    customUpload
                    uploadHandler={handleUpload}
                    chooseLabel="Upload Excel"
                    maxFileSize={1000000} //1mb
                    mode="advanced"
                    multiple={false}
                />
            </div>
        ) : (
            <div>
                <p>Please choose an event to continue.</p>
            </div>
        )}
    </>
}


export default UploadParticipants;