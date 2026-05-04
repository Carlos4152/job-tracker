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

export default function NetWorkForm() {
  return (
    <Dialog.Root placement="center">
      <Dialog.Trigger asChild>
        <IconButton size="xs">
          <PiShareNetwork />
        </IconButton>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Add Connection</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Stack gap={5}>
                <Grid templateColumns={{ md: 'repeat(2, 1fr)' }} gap={5}>
                  <Field.Root>
                    <Field.Label>Connection Name</Field.Label>
                    <InputGroup startElement={<LuUser />}>
                      <Input placeholder="Jhon Doe" />
                    </InputGroup>
                  </Field.Root>

                  <Field.Root>
                    <Field.Label>Job Title</Field.Label>

                    <InputGroup startElement={<LuBriefcaseBusiness />}>
                      <Input placeholder="HR Manager" />
                    </InputGroup>
                  </Field.Root>
                </Grid>

                <Grid templateColumns={{ md: 'repeat(2, 1fr)' }} gap={5}>
                  <Field.Root>
                    <Field.Label>Email</Field.Label>
                    <InputGroup startElement={<MdOutlineEmail />}>
                      <Input placeholder="jhon.doe@example.com" />
                    </InputGroup>
                  </Field.Root>

                  <Field.Root>
                    <Field.Label>Phone</Field.Label>

                    <InputGroup startElement={<LuPhone />}>
                      <Input placeholder="+1 584 868 9685" />
                    </InputGroup>
                  </Field.Root>
                </Grid>

                <Field.Root>
                  <Field.Label>Location</Field.Label>

                  <InputGroup startElement={<LuMapPin />}>
                    <Input placeholder="Hartford, CT" />
                  </InputGroup>
                </Field.Root>
                <Grid gap={5}>
                  <Field.Root>
                    <Field.Label>LinkedIn</Field.Label>
                    <InputGroup startElement={<BiLogoLinkedinSquare />}>
                      <Input placeholder="linkedin.com/in/jhondoe2" />
                    </InputGroup>
                  </Field.Root>

                  <Field.Root>
                    <Field.Label>Image url</Field.Label>

                    <InputGroup startElement={<IoIosLink />}>
                      <Input placeholder="www.media.licn.com/img/D4E35AQEXB1fymvwGow" />
                    </InputGroup>
                  </Field.Root>
                </Grid>
              </Stack>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>
              <Button>
                <LuSave />
                Save Connection
              </Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
