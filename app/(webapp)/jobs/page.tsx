import { getJobsAction } from '@/features/job/actions/job.actions';
import JobClientWrapper from '@/features/job/components/JobClientWrapper';
import { Box, Heading, Stack } from '@chakra-ui/react';

interface PageProps {
  searchParams: Promise<{
    q?: string;
    status?: string;
  }>;
}

export default async function page({ searchParams }: PageProps) {
  const { q, status } = await searchParams;
  const query = q || '';
  const statusFilter = status || '';
  const fetchJobs = await getJobsAction(query, statusFilter);

  return (
    <Stack spaceY={5}>
      <Box>
        <Heading>Job Page</Heading>
      </Box>

      <JobClientWrapper
        jobs={fetchJobs.data || []}
        searchQuery={query}
        statusFilter={statusFilter}
      />
    </Stack>
  );
}
