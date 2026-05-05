import { getJobsAction } from '@/features/job/actions/job.actions';
import JobClientWrapper from '@/features/job/components/JobClientWrapper';
import { Box, Heading, Stack, Text } from '@chakra-ui/react';

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
        <Heading>My Job Applications</Heading>
        <Text color='fg.subtle'>Track and manage your applications in one place.</Text>
      </Box>

      <JobClientWrapper
        jobs={fetchJobs.data || []}
        searchQuery={query}
        statusFilter={statusFilter}
      />
    </Stack>
  );
}
