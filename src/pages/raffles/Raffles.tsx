import { TabPanel, TabView } from "primereact/tabview";
import ManualDrawTab from "./ManualDrawTab";
import styles from "./Raffles.module.scss"
import { useEventContext } from "../../context/EventContext";

const Raffles = () => {
    const { activeEvent } = useEventContext();

    return (<>
        <div className={styles.rafflesContainer}>
            <TabView>
                <TabPanel header="Manual Draw">
                    <ManualDrawTab eventId={activeEvent?.id} />
                </TabPanel>

                <TabPanel header="Raffle Wheel">

                </TabPanel>
            </TabView>
        </div>
    </>)
}


export default Raffles;