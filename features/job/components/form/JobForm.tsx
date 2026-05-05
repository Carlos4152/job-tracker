'use client';

import {
  Button,
  Field,
  Grid,
  HStack,
  Input,
  InputGroup,
  Stack,
} from '@chakra-ui/react';
import { Controller } from 'react-hook-form';
import { LuMapPin, LuUser } from 'react-icons/lu';
import { BsBuildings } from 'react-icons/bs';
import { TbWorld } from 'react-icons/tb';
import { AiFillLinkedin } from 'react-icons/ai';
import { IoIosLink } from 'react-icons/io';
import { RiMoneyDollarCircleLine } from 'react-icons/ri';
import DescriptionInput from './DescriptionInput';
import useJobForm from '../../hooks/useJobForm';
import { Job } from '../../types/job.type';
import SelectStatus from './SelectStatus';
import JobPlatformInput from './JobPlatformInput';

interface JobFormProps {
  initialData?: Job;
  isEdit?: boolean;
}

export default function JobForm({ initialData }: JobFormProps) {
  const { form, editor, onSubmit } = useJobForm(initialData);

  const {
    register,
    control,
    formState: { errors, isSubmitting },
  } = form;

  return (
    <form onSubmit={onSubmit}>
      <Stack gap={5} pt={5}>
        {/* Title + Company */}
        <Grid templateColumns={{ md: 'repeat(2, 1fr)' }} gap={5}>
          <Field.Root invalid={!!errors.title}>
            <Field.Label>Job Title</Field.Label>
            <InputGroup startElement={<LuUser />}>
              <Input
                placeholder="e.g Software Engineer"
                {...register('title')}
              />
            </InputGroup>
            <Field.ErrorText>{errors.title?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!errors.company}>
            <Field.Label>Company</Field.Label>
            <InputGroup startElement={<BsBuildings />}>
              <Input placeholder="e.g Microsoft" {...register('company')} />
            </InputGroup>
            <Field.ErrorText>{errors.company?.message}</Field.ErrorText>
          </Field.Root>
        </Grid>

        {/* Status + Platform */}
        <Grid templateColumns={{ md: 'repeat(2, 1fr)' }} gap={5}>
          <Field.Root invalid={!!errors.status}>
            <Field.Label>Status</Field.Label>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <SelectStatus
                  size="md"
                  width="100%"
                  value={[field.value]}
                  onValueChange={(details) => field.onChange(details.value[0])}
                />
              )}
            />
            <Field.ErrorText>{errors.status?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!errors.platform}>
            <Field.Label>Platform</Field.Label>
            <Controller
              name="platform"
              control={control}
              render={({ field }) => (
                <JobPlatformInput
                  value={[field.value]}
                  onValueChange={(details) => field.onChange(details.value[0])}
                />
              )}
            />
            <Field.ErrorText>{errors.platform?.message}</Field.ErrorText>
          </Field.Root>
        </Grid>

        {/* Location + Salary */}
        <Grid templateColumns={{ md: 'repeat(2, 1fr)' }} gap={5}>
          <Field.Root invalid={!!errors.location}>
            <Field.Label>Location</Field.Label>
            <InputGroup startElement={<LuMapPin />}>
              <Input placeholder="e.g Buffalo, NY" {...register('location')} />
            </InputGroup>
            <Field.ErrorText>{errors.location?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!errors.salary}>
            <Field.Label>Salary</Field.Label>
            <InputGroup startElement={<RiMoneyDollarCircleLine />}>
              <Input placeholder="120,000" {...register('salary')} />
            </InputGroup>
            <Field.ErrorText>{errors.salary?.message}</Field.ErrorText>
          </Field.Root>
        </Grid>

        {/* Job URL */}
        <Field.Root invalid={!!errors.jobLink}>
          <Field.Label>Job URL</Field.Label>
          <InputGroup startElement={<IoIosLink />}>
            <Input
              placeholder="e.g https://example.com/careers"
              {...register('jobLink')}
            />
          </InputGroup>
          <Field.ErrorText>{errors.jobLink?.message}</Field.ErrorText>
        </Field.Root>

        {/* Company Website + LinkedIn */}
        <Grid templateColumns={{ md: 'repeat(2, 1fr)' }} gap={3}>
          <Field.Root invalid={!!errors.companyWebsite}>
            <Field.Label>Company Website</Field.Label>
            <InputGroup startElement={<TbWorld />}>
              <Input
                placeholder="e.g https://google.com"
                {...register('companyWebsite')}
              />
            </InputGroup>
            <Field.ErrorText>{errors.companyWebsite?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!errors.companyLinkedIn}>
            <Field.Label>Company LinkedIn</Field.Label>
            <InputGroup startElement={<AiFillLinkedin />}>
              <Input
                placeholder="e.g https://linkedin.com/company/google"
                {...register('companyLinkedIn')}
              />
            </InputGroup>
            <Field.ErrorText>{errors.companyLinkedIn?.message}</Field.ErrorText>
          </Field.Root>
        </Grid>

        {/* Description */}
        <Field.Root invalid={!!errors.description}>
          <Field.Label>Description</Field.Label>
          <DescriptionInput editor={editor} />
          <Field.ErrorText>{errors.description?.message}</Field.ErrorText>
        </Field.Root>

        <HStack>
          <Button variant="outline" type="button">
            Cancel
          </Button>
          <Button
            type="submit"
            loading={isSubmitting}
            spinnerPlacement="start"
            loadingText="Saving..."
          >
            Save
          </Button>
        </HStack>
      </Stack>
    </form>
  );
}
