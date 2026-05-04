'use client';
import {
  Avatar,
  Card,
  Circle,
  Flex,
  Float,
  HStack,
  Icon,
  Stack,
  Text,
  Link as ChakraLink,
  Badge,
  Box,
  Menu,
  Portal,
  IconButton,
} from '@chakra-ui/react';
import {
  IoCashOutline,
  IoEyeOutline,
  IoLocationOutline,
} from 'react-icons/io5';
import { FaLink } from 'react-icons/fa6';
import Link from 'next/link';
import Image from 'next/image';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FiEdit } from 'react-icons/fi';
import { GoTrash } from 'react-icons/go';
import { Job } from '../types/job.type';
import { PLATFORMS } from '../constants/job-platform';
import { JOB_STATUS } from '../constants/job-status';
import { urlHelper } from '../helper/job.helper';
import { useConfirmDelete } from '@/components/shared/DeleteModal';
import { toast } from '@/components/shared/toast';
import { deleteJobAction } from '../actions/job.actions';

export default function JobCard({ job }: { job: Job }) {
  const { confirmDelete } = useConfirmDelete();

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

  const selectedPlatform = PLATFORMS.find((item) => item.value === platform);
  const currentStatus = JOB_STATUS.find((item) => item.value === status);

  const companyLogoUrl = companyWebsite
    ? urlHelper.getCompanyLogoUrl(companyWebsite)
    : null;

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
        const res = await deleteJobAction(job._id);
        if (!res.success) {
          toast.error('Error', res.message || 'Failed to delete client');
          throw new Error(res.message);
        }
        toast.success('Success', 'Job deleted successfully', 3000);
      },
    });
  };

  return (
    <Card.Root key={job._id}>
      <Card.Body spaceY={3}>
        <Stack direction="row" justifyContent="space-between">
          <Box>
            <Badge textTransform="capitalize">
              <Image
                src={selectedPlatform?.img || PLATFORMS[0]?.img}
                alt={selectedPlatform?.value || PLATFORMS[0]?.value}
                width={15}
                height={15}
              />
              {platform}
            </Badge>
          </Box>

          <Menu.Root>
            <Menu.Trigger asChild>
              <IconButton variant="ghost" size="xs" focusRing="none">
                <BsThreeDotsVertical />
              </IconButton>
            </Menu.Trigger>
            <Portal>
              <Menu.Positioner>
                <Menu.Content>
                  <Menu.Item value="view_details" asChild>
                    <Link href={`/jobs/${_id}`}>
                      <IoEyeOutline />
                      View details
                    </Link>
                  </Menu.Item>
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
        </Stack>

        <HStack gap="3">
          <Avatar.Root>
            <Avatar.Image
              src={companyLogoUrl ?? undefined}
              alt={`${company} logo`}
              onError={(e) => {
                // Browser couldn't load it → hide and show fallback initials
                e.currentTarget.style.display = 'none';
              }}
            />
            <Avatar.Fallback name={company || 'Company'} />
            <Float placement="top-end" offsetX="1" offsetY="1">
              <Circle
                bg={`${currentStatus?.color}.500`}
                size="8px"
                outline="0.2em solid"
                outlineColor="bg"
              />
            </Float>
          </Avatar.Root>
          <Stack gap="0">
            <Text fontWeight="semibold" textStyle="md">
              {title}
            </Text>
            <Text color="fg.muted" textStyle="sm">
              {company}
            </Text>
          </Stack>
        </HStack>

        <Stack pt={5}>
          <HStack>
            <Flex alignItems="center" gap={2} color="fg.muted">
              <Icon size="sm">
                <IoLocationOutline />
              </Icon>
              <Text textStyle="sm">Location:</Text>
            </Flex>

            <Text textStyle="sm">{location}</Text>
          </HStack>

          <HStack>
            <Flex alignItems="center" gap={2} color="fg.muted">
              <Icon size="sm">
                <IoCashOutline />
              </Icon>
              <Text textStyle="sm">Salary:</Text>
            </Flex>

            <Text textStyle="sm">{salary}</Text>
          </HStack>

          <HStack>
            <Flex alignItems="center" gap={2} color="fg.muted">
              <Icon size="sm">
                <FaLink />
              </Icon>
              <Text textStyle="sm">Website:</Text>
            </Flex>

            {companyWebsite ? (
              <ChakraLink asChild color="blue.500" focusRing="none">
                <Link href={companyWebsite} target="_blank">
                  link
                </Link>
              </ChakraLink>
            ) : (
              'No register'
            )}
          </HStack>
        </Stack>
      </Card.Body>
    </Card.Root>
  );
}
