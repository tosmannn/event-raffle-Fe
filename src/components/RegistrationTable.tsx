import React, { useEffect, useRef, useState } from "react";
import { ParticipantDto } from "../types/participant";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode } from "primereact/api";
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { Button } from "primereact/button";
import { ParticipantService } from "../services/participantService";
import { Toast } from "primereact/toast";
import { ToastService } from "../services/toastService";
import { AxiosError } from "axios";

interface RegistrationTableProps {
    participants: ParticipantDto[];
}

const RegistrationTable: React.FC<RegistrationTableProps> = ({ participants }) => {
    const toastRef = useRef<Toast>(null!);
    const toast = new ToastService(toastRef);

    const [_participants, setParticipants] = useState<ParticipantDto[]>([]);

    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        employeeId: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        firstName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        lastName: { value: null, matchMode: FilterMatchMode.STARTS_WITH }
    });
    const [globalFilterValue, setGlobalFilterValue] = useState('');

    useEffect(() => {
        setParticipants(participants);
    }, [participants])

    const columns = [
        { filterField: 'employeeId', header: 'Id' },
        { filterField: 'firstName', header: 'First Name' },
        { filterField: 'lastName', header: 'Last Name' },
    ];

    const onGlobalFilterChange = (e: any) => { // update correct type
        const value = e.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const renderHeader = () => {
        return (
            <div className="flex justify-content-end">
                <IconField iconPosition="left">
                    <InputIcon className="pi pi-search" />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
                </IconField>
            </div>
        );
    };

    const header = renderHeader();

    const handleRegister = async (id: string) => {
        try {
            const result = await ParticipantService.register(id);

            if (!result?.data) {
                toast.showError("Unexpected response from server.");
                return;
            }

            if (result?.data?.success) {
                toast.showSuccess(result.data.message!)
                handleUpdateTable(id);

                return;
            }

            toast.showError(result.data.message!);

        } catch (error) {
            const err = error as AxiosError;

            console.error("API error:", err.response?.data || err.message);
            toast.showError("Failed to reach the server or process the request.");
        }
    }

    const handleUpdateTable = (id: string) => {
        const updatedParticipants = _participants.map(ep =>
            ep.id === id
                ? { ...ep, isRegistered: true }
                : ep
        );

        setParticipants(updatedParticipants);
    }

    return <>
        <Toast ref={toastRef} />
        <DataTable
            value={_participants}
            tableStyle={{ minWidth: '50rem', minHeight: '30rem' }}
            rows={10}
            dataKey={"id"}
            filters={filters}
            header={header}
            globalFilterFields={['firstName', 'employeeId', 'lastName']}
            emptyMessage="No participants found"
            stripedRows
            paginator
            scrollable
            scrollHeight="30rem"
            footer={`Total participants: ${participants.length}`}
        >
            {columns.map((col, i) => (
                <Column key={col.filterField} field={col.filterField} header={col.header} />
            ))}

            <Column
                header="Action"
                body={(rowData: ParticipantDto) => (
                    <Button
                        label={rowData.isRegistered ? "Registered" : "Register"}
                        icon="pi pi-user-plus"
                        className="p-button-sm"
                        onClick={() => handleRegister(rowData.id)}
                        disabled={rowData.isRegistered}
                    />
                )}
            />

        </DataTable>
    </>
};


export default RegistrationTable;