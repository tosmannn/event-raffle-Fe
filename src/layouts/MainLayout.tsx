import React, { useState } from 'react';
import SidebarMenu from '../components/sidebar/Sidebar';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/lara-light-indigo/theme.css'; // or any theme
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 1000 }}>
        <Button icon="pi pi-arrow-right" onClick={() => setVisible(true)} className="p-button-sm p-button-text" />
      </div>
      <SidebarMenu visible={visible} onHide={setVisible} />

      <div style={{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        minHeight: '100vh',
      }}>
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
