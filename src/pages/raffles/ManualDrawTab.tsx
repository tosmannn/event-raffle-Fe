import { Button } from "primereact/button";
import { RaffleDto } from "../../types/raffle";
import { useRef, useState } from "react";
import { RaffleService } from "../../services/raffleService";
import { AxiosError } from "axios";
import { ToastService } from "../../services/toastService";
import { Toast } from "primereact/toast";
import running1 from ".././../gifs/running-1.gif";
import running2 from ".././../gifs/running-2.gif";
import running3 from ".././../gifs/running-3.gif";
import running4 from ".././../gifs/running-4.gif";
import styles from "./ManualDrawTab.module.scss";
type ManualDrawTabProps = {
    eventId: string | undefined
}

const ManualDrawTab = ({ eventId }: ManualDrawTabProps) => {
    const [winner, setWinner] = useState<RaffleDto | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedGif, setSelectedGif] = useState<string>("");

    const gifs = [running1, running2, running3, running4];

    const toastRef = useRef<Toast>(null!);
    const toast = new ToastService(toastRef);

    const handleDraw = async () => {
        if (!eventId) return;

        setLoading(true);
        setWinner(null);
        setSelectedGif(gifs[Math.floor(Math.random() * gifs.length)]);

        setTimeout(async () => {
            try {
                const result = await RaffleService.drawWinner(eventId);

                if (result?.data?.success) {
                    setWinner(result.data.data!);
                } else {
                    toast.showError(result.data.message!);
                }
            } catch (error) {
                const err = error as AxiosError;
                console.error("API error:", err.response?.data || err.message);
                toast.showError("Failed to reach the server or process the request.");
            } finally {
                setLoading(false);
            }
        }, 3000);
    };

    return <>
        {loading && selectedGif && (
            <div>
                <img src={selectedGif} alt="Drawing..." className={styles.gif} />
            </div>
        )}

        {winner && !loading && (
            <div className={styles.winner}>
                🎉 Winner: {winner.firstName} {winner.lastName}
            </div>
        )}

        <Toast ref={toastRef} />
        <Button
            label="Draw"
            icon="pi pi-star"
            onClick={handleDraw}
            disabled={loading}
            className={styles.drawButton}
        />
    </>
}


export default ManualDrawTab;