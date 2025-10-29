// src/services/toastService.ts
import { Toast } from 'primereact/toast';
import { RefObject } from 'react';

export class ToastService {
  private toastRef: RefObject<Toast>;

  constructor(toastRef: RefObject<Toast>) {
    this.toastRef = toastRef;
  }

  showSuccess(detail: string, summary = 'Success') {
    this.toastRef.current?.show({
      severity: 'success',
      summary,
      detail,
      life: 3000,
    });
  }

  showInfo(detail: string, summary = 'Info') {
    this.toastRef.current?.show({
      severity: 'info',
      summary,
      detail,
      life: 3000,
    });
  }

  showWarn(detail: string, summary = 'Warning') {
    this.toastRef.current?.show({
      severity: 'warn',
      summary,
      detail,
      life: 3000,
    });
  }

  showError(detail: string, summary = 'Error') {
    this.toastRef.current?.show({
      severity: 'error',
      summary,
      detail,
      life: 3000,
    });
  }

  showSecondary(detail: string, summary = 'Secondary') {
    this.toastRef.current?.show({
      severity: 'secondary',
      summary,
      detail,
      life: 3000,
    });
  }

  showContrast(detail: string, summary = 'Contrast') {
    this.toastRef.current?.show({
      severity: 'contrast',
      summary,
      detail,
      life: 3000,
    });
  }
}
