import {
  getJobByIdAction,
  getJobsAction,
} from '@/features/job/actions/job.actions';
import { Stack, Grid, GridItem, Separator } from '@chakra-ui/react';
import JobHeader from '@/features/job/components/job-detail/JobHeader';
import { notFound } from 'next/navigation';
import JobDescription from '@/features/job/components/job-detail/JobDescription';
import JobSourceCard from '@/features/job/components/job-detail/JobSourceCard';
import JobTimeline from '@/features/job/components/job-detail/JobTimeline';
import JobCardSummary from '@/features/job/components/job-detail/JobCardSummary';
import BackLink from '@/components/shared/BackLink';
import { GetNetworks } from '@/features/network/actions/get-networks';
import { NetworkList } from '@/features/network/components/network-list';

interface JobPageParams {
  params: {
    id: string;
  };
}

export default async function page({ params }: JobPageParams) {
  const { id } = await params;
  const response = await getJobByIdAction(id);
  const fetchJobs = await getJobsAction();

  if (!response.success || !response.data) {
    notFound();
  }

  const job = response.data;

  const otherJobs =
    fetchJobs.success && fetchJobs.data
      ? fetchJobs.data.filter((j) => j._id !== job._id)
      : [];

  const fetchNetworks = await GetNetworks(job._id);

  return (
    <Stack py={3} spaceY={4}>
      <BackLink path="/jobs" label="Back to jobs" />

      <Grid templateColumns={{ lg: 'repeat(12, 1fr)' }} gap={5}>
        <GridItem colSpan={{ lg: 8 }}>
          <Stack gap={5}>
            <JobHeader job={job} />
            <JobDescription content={job.description} />
          </Stack>
        </GridItem>

        <GridItem colSpan={{ lg: 4 }} spaceY={5}>
          <JobSourceCard job={job} />
          <Separator variant="dashed" />
          <NetworkList
            networkData={fetchNetworks.data || []}
            applicationId={job._id}
          />
          <Separator variant="dashed" />

          <JobCardSummary jobs={otherJobs} />
          <Separator variant="dashed" />
          <JobTimeline timeline={job.timeline} />
        </GridItem>
      </Grid>
    </Stack>
  );
}
