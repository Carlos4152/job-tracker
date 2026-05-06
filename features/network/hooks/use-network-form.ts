'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { networkSchema, NetworkData } from '../schemas/network.schema';
import { toast } from '@/components/shared/toast';
import { NetworkDTO } from '../types/network.types';
import { UpdateNetwork } from '../actions/update-network';
import { AddNetwork } from '../actions/add-network';
import { useState } from 'react';

export default function useNetworkForm(
  initialData?: NetworkDTO,
  applicationId?: string,
  onClose?: () => void,
) {
  const isEdit = !!initialData?._id;
  const applicationID = applicationId || '';

  const [open, setOpen] = useState(false);

  const form = useForm<NetworkData>({
    resolver: zodResolver(networkSchema),
    defaultValues: {
      name: initialData?.name || '',
      jobTitle: initialData?.jobTitle || '',
      email: initialData?.email || '',
      phone: initialData?.phone || '',
      location: initialData?.location || '',
      linkedin: initialData?.linkedin || '',
      imageUrl: initialData?.imageUrl || '',
    },
  });

  const onSubmit = async (data: NetworkData) => {
    const result =
      isEdit && initialData?._id
        ? await UpdateNetwork(initialData._id, data)
        : await AddNetwork(data, applicationID);

    if (!result.success) {
      toast.error('Failed to save contact', result.message);
      return;
    }
    form.reset();
    onClose ? onClose() : setOpen(false);
    toast.success('Contact saved', result.message);
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isEdit,
    open,
    setOpen,
  };
}
