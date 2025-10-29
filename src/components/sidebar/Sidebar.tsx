// src/components/Sidebar.tsx
import React, { useState } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { PanelMenu } from 'primereact/panelmenu';
import { useNavigate } from 'react-router-dom';

type SideBarParams = {
  visible: boolean;
  onHide: (value: boolean) => void;
}

const SidebarMenu = ({ visible, onHide }: SideBarParams) => {

  const navigate = useNavigate();

  const items = [
    {
      label: 'Dashboard',
      icon: 'pi pi-home',
      command: () => navigate('/dashboard'),
    },
    {
      label: 'Create Event',
      icon: 'pi pi-calendar-plus',
      command: () => navigate('/create-event'),
    },
    {
      label: 'Registration',
      icon: 'pi pi-pencil',
      command: () => navigate('/registration')
    },
    {
      label: 'Raffles',
      icon: 'pi pi-ticket',
      command: () => navigate('/raffles'),
    },
    {
      label: 'Upload Participants',
      icon: 'pi pi-users',
      command: () => navigate('/participants'),
    },
    {
      label: 'Settings',
      icon: 'pi pi-cog',
      command: () => navigate('/settings'),
    },
  ];

  return (
    <Sidebar visible={visible} onHide={() => onHide(false)} position="left" showCloseIcon={true}>
      <PanelMenu model={items} />
    </Sidebar>
  );
};

export default SidebarMenu;
