'use client';

import { Badge, HStack, Stack, Text } from '@chakra-ui/react';
import { Job } from '../types/job.type';
import JobToolBar from './JobToolBar';
import JobCardList from './JobCardList';

interface JobClientWrapperProps {
  jobs: Job[];
  searchQuery?: string;
  statusFilter?: string;
}

export default function JobClientWrapper({
  jobs,
  searchQuery = '',
  statusFilter = '',
}: JobClientWrapperProps) {
  return (
    <Stack spaceY={5}>
      <JobToolBar />

      {(searchQuery || statusFilter) && (
        <HStack gap={3} wrap="wrap">
          <Text fontSize="sm" color="fg.muted">
            Found {jobs.length} result{jobs.length !== 1 ? 's' : ''}
          </Text>
          {searchQuery && (
            <Badge colorScheme="blue" size="sm">
              Search: {searchQuery}
            </Badge>
          )}
          {statusFilter && (
            <Badge colorScheme="green" size="sm" textTransform="capitalize">
              Status: {statusFilter}
            </Badge>
          )}
        </HStack>
      )}

      <JobCardList jobs={jobs || []} />
    </Stack>
  );
}
