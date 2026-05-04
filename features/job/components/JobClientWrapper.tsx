'use client';

import { Badge, HStack, Stack, Text } from '@chakra-ui/react';
import { Job } from '../types/job.type';
import JobToolBar from './JobToolBar';
import JobCardList from './JobCardList';
import { useEffect, useState } from 'react';

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
  const [view, setView] = useState<'list' | 'grid'>('grid');

  useEffect(() => {
    const savedView = localStorage.getItem('jobViewPreference') as
      | 'list'
      | 'grid';
    if (savedView && (savedView === 'list' || savedView === 'grid')) {
      setView(savedView);
    }
  }, []);

  return (
    <Stack spaceY={5}>
      <JobToolBar view={view} setView={setView} />

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

      <JobCardList jobs={jobs || []} view={view} />
    </Stack>
  );
}
