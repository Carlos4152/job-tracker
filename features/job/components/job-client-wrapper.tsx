'use client';

import { Badge, HStack, Stack, Text } from '@chakra-ui/react';
import { JobDTO } from '../types/job.type';
import JobToolBar from './job-tool-bar';
import JobCardList from './job-card-list';
import { useEffect, useState } from 'react';
import { GlobalEmptyState } from '@/components/shared/global-empty-state';
import { LuBriefcaseBusiness } from 'react-icons/lu';

interface JobClientWrapperProps {
  jobs: JobDTO[];
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
    const savedView = localStorage.getItem('jobViewPreference');
    if (savedView === 'list' || savedView === 'grid') {
      setView(savedView);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('jobViewPreference', view);
  }, [view]);

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

      {jobs.length === 0 ? (
        <GlobalEmptyState
          icon={<LuBriefcaseBusiness />}
          title="No jobs found"
          description={
            searchQuery || statusFilter
              ? 'Try adjusting your search or filter to find what you are looking for'
              : 'You have not added any jobs yet. Start by adding your first job application'
          }
        />
      ) : (
        <JobCardList jobs={jobs} view={view} />
      )}
    </Stack>
  );
}
