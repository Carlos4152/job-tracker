import { getJobsAction } from '@/features/job/actions/job.actions';
import JobCardList from '@/features/job/components/JobCardList';
import JobToolBar from '@/features/job/components/JobToolBar';
import { Box, Heading, Stack } from '@chakra-ui/react';

export default async function page() {
  const fetchJobs = await getJobsAction();

  return (
    <Stack spaceY={5}>
      <Box>
        <Heading>Job Page</Heading>
      </Box>

      <JobToolBar />

      <JobCardList jobs={fetchJobs.data || []} />
    </Stack>
  );
}
