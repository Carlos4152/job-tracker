// shared/utils/toast.ts
import { toaster } from '@/components/ui/toaster';

export const toast = {
  success: (title: string, description?: string, duration = 5000) => {
    toaster.create({
      title,
      description,
      type: 'success',
      duration,
      closable: true,
    });
  },
  error: (title: string, description?: string, duration = 5000) => {
    toaster.create({
      title,
      description,
      type: 'error',
      duration,
      closable: true,
    });
  },
  warning: (title: string, description?: string, duration = 5000) => {
    toaster.create({
      title,
      description,
      type: 'warning',
      duration,
      closable: true,
    });
  },
  info: (title: string, description?: string, duration = 5000) => {
    toaster.create({
      title,
      description,
      type: 'info',
      duration,
      closable: true,
    });
  },
};