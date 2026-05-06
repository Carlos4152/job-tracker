'use client';
import {
  Button,
  CloseButton,
  Dialog,
  Field,
  Grid,
  IconButton,
  Input,
  InputGroup,
  Portal,
  Stack,
} from '@chakra-ui/react';
import { BiLogoLinkedinSquare } from 'react-icons/bi';
import { IoIosLink } from 'react-icons/io';
import {
  LuBriefcaseBusiness,
  LuMapPin,
  LuPhone,
  LuSave,
  LuUser,
} from 'react-icons/lu';
import { MdOutlineEmail } from 'react-icons/md';
import { PiShareNetwork } from 'react-icons/pi';
import useNetworkForm from '../hooks/use-network-form';
import { NetworkDTO } from '../types/network.types';

interface NetworkFormProps {
  initialData?: NetworkDTO;
  applicationId: string;
  open?: boolean;
  setOpen?: (open: boolean) => void;
}

export default function NetWorkForm({
  initialData,
  applicationId,
  open: openProp,
  setOpen: setOpenProp,
}: NetworkFormProps) {
  const {
    form,
    onSubmit,
    open: openHook,
    setOpen: setOpenHook,
  } = useNetworkForm(
    initialData,
    applicationId,
    setOpenProp ? () => setOpenProp(false) : undefined,
  );

  const {
    register,
    formState: { errors, isSubmitting },
  } = form;

  const isControlled = openProp !== undefined;
  const open = openProp ?? openHook;
  const setOpen = setOpenProp ?? setOpenHook;

  return (
    <Dialog.Root
      placement="center"
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
    >
      <Dialog.Trigger asChild>
        {!isControlled && (
          <Dialog.Trigger asChild>
            <IconButton size="xs">
              <PiShareNetwork />
            </IconButton>
          </Dialog.Trigger>
        )}
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <form onSubmit={onSubmit}>
              <Dialog.Header>
                <Dialog.Title>Add Connection</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <Stack gap={5}>
                  <Grid templateColumns={{ md: 'repeat(2, 1fr)' }} gap={5}>
                    <Field.Root invalid={!!errors.name}>
                      <Field.Label>Connection Name</Field.Label>
                      <InputGroup startElement={<LuUser />}>
                        <Input placeholder="Jhon Doe" {...register('name')} />
                      </InputGroup>
                      <Field.ErrorText>{errors.name?.message}</Field.ErrorText>
                    </Field.Root>

                    <Field.Root invalid={!!errors.jobTitle}>
                      <Field.Label>Job Title</Field.Label>

                      <InputGroup startElement={<LuBriefcaseBusiness />}>
                        <Input
                          placeholder="HR Manager"
                          {...register('jobTitle')}
                        />
                      </InputGroup>
                      <Field.ErrorText>
                        {errors.jobTitle?.message}
                      </Field.ErrorText>
                    </Field.Root>
                  </Grid>

                  <Grid templateColumns={{ md: 'repeat(2, 1fr)' }} gap={5}>
                    <Field.Root invalid={!!errors.email}>
                      <Field.Label>Email</Field.Label>
                      <InputGroup startElement={<MdOutlineEmail />}>
                        <Input
                          placeholder="jhon.doe@example.com"
                          {...register('email')}
                        />
                      </InputGroup>
                      <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
                    </Field.Root>

                    <Field.Root invalid={!!errors.phone}>
                      <Field.Label>Phone</Field.Label>

                      <InputGroup startElement={<LuPhone />}>
                        <Input
                          placeholder="+1 584 868 9685"
                          {...register('phone')}
                        />
                      </InputGroup>
                      <Field.ErrorText>{errors.phone?.message}</Field.ErrorText>
                    </Field.Root>
                  </Grid>

                  <Field.Root invalid={!!errors.location}>
                    <Field.Label>Location</Field.Label>

                    <InputGroup startElement={<LuMapPin />}>
                      <Input
                        placeholder="Hartford, CT"
                        {...register('location')}
                      />
                    </InputGroup>
                    <Field.ErrorText>
                      {errors.location?.message}
                    </Field.ErrorText>
                  </Field.Root>

                  <Grid gap={5}>
                    <Field.Root invalid={!!errors.linkedin}>
                      <Field.Label>LinkedIn</Field.Label>
                      <InputGroup startElement={<BiLogoLinkedinSquare />}>
                        <Input
                          placeholder="linkedin.com/in/jhondoe2"
                          {...register('linkedin')}
                        />
                      </InputGroup>
                      <Field.ErrorText>
                        {errors.linkedin?.message}
                      </Field.ErrorText>
                    </Field.Root>

                    <Field.Root invalid={!!errors.imageUrl}>
                      <Field.Label>Image url</Field.Label>

                      <InputGroup startElement={<IoIosLink />}>
                        <Input
                          placeholder="www.media.licn.com/img/D4E35AQEXB1fymvwGow"
                          {...register('imageUrl')}
                        />
                      </InputGroup>
                      <Field.ErrorText>
                        {errors.imageUrl?.message}
                      </Field.ErrorText>
                    </Field.Root>
                  </Grid>
                </Stack>
              </Dialog.Body>
              <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  <Button variant="outline">Cancel</Button>
                </Dialog.ActionTrigger>
                <Button
                  type="submit"
                  loading={isSubmitting}
                  loadingText="Saving..."
                  spinnerPlacement="start"
                >
                  <LuSave />
                  Save Connection
                </Button>
              </Dialog.Footer>
            </form>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
