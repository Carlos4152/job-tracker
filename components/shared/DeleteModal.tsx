'use client';

import { Button, CloseButton, Dialog, Portal, Stack } from '@chakra-ui/react';
import {
  createContext,
  useContext,
  useRef,
  useState,
  useCallback,
} from 'react';
import { BsTrash3 } from 'react-icons/bs';

interface ConfirmDeleteOptions {
  title: string;
  description: React.ReactNode;
  onConfirm: () => Promise<void> | void;
}

interface ConfirmDeleteContextType {
  confirmDelete: (options: ConfirmDeleteOptions) => Promise<boolean>;
}

const ConfirmDeleteContext = createContext<ConfirmDeleteContextType | null>(
  null,
);

export function ConfirmDeleteProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<ConfirmDeleteOptions | null>(null);
  const [loading, setLoading] = useState(false);
  const resolveRef = useRef<(value: boolean) => void>(() => {});
  const onConfirmRef = useRef<(() => Promise<void> | void) | null>(null);

  const confirmDelete = useCallback(
    (options: ConfirmDeleteOptions): Promise<boolean> => {
      setOptions(options);
      onConfirmRef.current = options.onConfirm;
      setIsOpen(true);
      return new Promise((resolve) => {
        resolveRef.current = resolve;
      });
    },
    [],
  );

  const handleConfirm = useCallback(async () => {
    if (!onConfirmRef.current) return;

    setLoading(true);
    try {
      await onConfirmRef.current();
      resolveRef.current(true);
      setIsOpen(false);
      setOptions(null);
      onConfirmRef.current = null;
    } catch (error) {
      console.error('Delete failed:', error);
      resolveRef.current(false);
      setIsOpen(false); // ✅ also close on failure
      setOptions(null);
      onConfirmRef.current = null;
    } finally {
      setLoading(false);
    }
  }, []);

  const handleCancel = useCallback(() => {
    resolveRef.current?.(false);
    setIsOpen(false);
    setOptions(null);
    onConfirmRef.current = null;
  }, []);

  return (
    <ConfirmDeleteContext.Provider value={{ confirmDelete }}>
      {children}
      <Dialog.Root
        lazyMount
        open={isOpen}
        onOpenChange={(e) => {
          if (!e.open) handleCancel();
        }}
        placement="center"
      >
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Stack gap={3}>
                  <Stack
                    w={10}
                    h={10}
                    bg="red.800/20"
                    color="red.600"
                    alignItems="center"
                    justifyContent="center"
                    borderRadius="lg"
                  >
                    <BsTrash3 size={20} />
                  </Stack>
                  <Dialog.Title>{options?.title}</Dialog.Title>
                </Stack>
                <Dialog.CloseTrigger
                  asChild
                  position="absolute"
                  right={2}
                  top={2}
                >
                  <CloseButton size="sm" />
                </Dialog.CloseTrigger>
              </Dialog.Header>

              <Dialog.Body>{options?.description}</Dialog.Body>

              <Dialog.Footer gap={3}>
                <Dialog.ActionTrigger asChild>
                  <Button variant="outline" size="sm" onClick={handleCancel}>
                    Cancel
                  </Button>
                </Dialog.ActionTrigger>

                <Button
                  onClick={handleConfirm}
                  disabled={loading}
                  colorPalette="red"
                  size="sm"
                  gap={2}
                >
                  <BsTrash3 size={16} />
                  {loading ? 'Deleting...' : 'Delete'}
                </Button>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </ConfirmDeleteContext.Provider>
  );
}

export function useConfirmDelete() {
  const context = useContext(ConfirmDeleteContext);
  if (!context) {
    throw new Error(
      'useConfirmDelete must be used within ConfirmDeleteProvider',
    );
  }
  return context;
}
