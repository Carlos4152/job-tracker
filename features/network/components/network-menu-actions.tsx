'use client';

import { useConfirmDelete } from '@/components/shared/DeleteModal';
import { IconButton, Menu, Portal, Text } from '@chakra-ui/react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FiEdit } from 'react-icons/fi';
import { GoTrash } from 'react-icons/go';
import { DeleteNetwork } from '../actions/delete-network';
import { NetworkDTO } from '../types/network.types';
import { toast } from '@/components/shared/toast';
import NetWorkForm from './network-form';
import { useState } from 'react';

interface NetworkMenuActionProps {
  network: NetworkDTO;
}

export function NetworkMenuActions({ network }: NetworkMenuActionProps) {
  const { confirmDelete } = useConfirmDelete();
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    await confirmDelete({
      title: 'Delete Connection',
      description: (
        <Text>
          Are you sure you want to remove <strong>{network.name}</strong> from
          this application? This action cannot be undone.
        </Text>
      ),
      onConfirm: async () => {
        const res = await DeleteNetwork(network._id);
        if (!res.success) {
          toast.error('Error', res.message || 'Failed to delete client');
          throw new Error(res.message);
        }
        toast.success('Success', 'Job deleted successfully', 3000);
      },
    });
  };
  return (
    <>
      <NetWorkForm
        initialData={network}
        applicationId={network.applicationId}
        open={open}
        setOpen={setOpen}
      />

      <Menu.Root>
        <Menu.Trigger asChild>
          <IconButton variant="ghost" size="xs" focusRing="none">
            <BsThreeDotsVertical />
          </IconButton>
        </Menu.Trigger>
        <Portal>
          <Menu.Positioner>
            <Menu.Content>
              <Menu.Item value="update_info" onClick={() => setOpen(true)}>
                <FiEdit />
                Update
              </Menu.Item>
              <Menu.Item value="delete_connection" onClick={handleDelete}>
                <GoTrash />
                Delete
              </Menu.Item>
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>
    </>
  );
}
