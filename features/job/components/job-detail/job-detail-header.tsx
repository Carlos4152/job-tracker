'use client';
import { JobDTO } from '../../types/job.type';
import {
  Avatar,
  Badge,
  Box,
  Heading,
  HStack,
  IconButton,
  Menu,
  Portal,
  Separator,
  Stack,
  Status,
  Text,
} from '@chakra-ui/react';
import { PLATFORMS } from '../../constants/job-platform';
import { JOB_STATUS } from '../../constants/job-status';
import Image from 'next/image';
import { urlHelper } from '../../utils/job.helper';
import { BsThreeDotsVertical } from 'react-icons/bs';
import Link from 'next/link';
import { FiEdit } from 'react-icons/fi';
import { GoTrash } from 'react-icons/go';
import { useConfirmDelete } from '@/components/shared/DeleteModal';
import { toast } from '@/components/shared/toast';
import { useRouter } from 'next/navigation';
import { DeleteJob } from '../../actions/delete-job';

export default function JobDetailHeader({ job }: { job: JobDTO }) {
  const { confirmDelete } = useConfirmDelete();
  const router = useRouter();
  const {
    _id,
    company,
    companyWebsite,
    location,
    salary,
    title,
    platform,
    status,
  } = job;

  const companyLogoUrl = companyWebsite
    ? urlHelper.getCompanyLogoUrl(companyWebsite)
    : null;

  const selectedPlatform = PLATFORMS.find((item) => item.value === platform);
  const currentStatus = JOB_STATUS.find((item) => item.value === status);

  const handleDelete = async () => {
    await confirmDelete({
      title: 'Delete Job',
      description: (
        <Text>
          Are you sure you want to delete the job application{' '}
          <strong>{job.title}</strong>? This action cannot be undone.
        </Text>
      ),
      onConfirm: async () => {
        const res = await DeleteJob(job._id);
        if (!res.success) {
          toast.error('Error', res.message || 'Failed to delete client');
          throw new Error(res.message);
        }
        toast.success('Success', 'Job deleted successfully', 3000);
        router.push('/jobs');
      },
    });
  };

  return (
    <Box position="relative">
      <Stack direction={{ lg: 'row' }} gap={3} alignItems="center">
        <Avatar.Root size="xl">
          <Avatar.Image
            src={companyLogoUrl ?? undefined}
            alt={`${company} logo`}
            onError={(e) => {
              // Browser couldn't load it → hide and show fallback initials
              e.currentTarget.style.display = 'none';
            }}
          />
          <Avatar.Fallback name={company || 'Company'} />
        </Avatar.Root>

        <Box>
          <HStack>
            <Heading>{title}</Heading>
            <Badge variant="outline">
              <Status.Root colorPalette={`${currentStatus?.color}`} size="sm">
                <Status.Indicator />
              </Status.Root>
              {currentStatus?.label}
            </Badge>
          </HStack>

          <HStack color="fg.subtle">
            <Text>{company}</Text>•<Text textStyle="sm">{location}</Text>
          </HStack>
        </Box>
      </Stack>

      <HStack pt={3}>
        <Text color="fg.subtle" textStyle="sm">
          Application ID: #{_id.slice(0, 8).toUpperCase()}
        </Text>
        <Separator orientation="vertical" height="4" />
        <Badge variant="plain">
          <Image
            src={selectedPlatform?.img || PLATFORMS[0]?.img}
            alt={selectedPlatform?.value || PLATFORMS[0]?.value}
            width={15}
            height={15}
          />
          {selectedPlatform?.label || PLATFORMS[0]?.label}
        </Badge>
        <Separator orientation="vertical" height="4" />
        <Text textStyle="sm">${salary}</Text>
      </HStack>
      <Box position="absolute" top={0} right={0}>
        <Menu.Root>
          <Menu.Trigger asChild>
            <IconButton variant="ghost" size="xs" focusRing="none">
              <BsThreeDotsVertical />
            </IconButton>
          </Menu.Trigger>
          <Portal>
            <Menu.Positioner>
              <Menu.Content>
                <Menu.Item value="update_info" asChild>
                  <Link href={`/jobs/${_id}/edit`}>
                    <FiEdit />
                    Update info
                  </Link>
                </Menu.Item>
                <Menu.Item value="delete_application" onClick={handleDelete}>
                  <GoTrash />
                  Delete Application
                </Menu.Item>
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>
      </Box>
    </Box>
  );
}
