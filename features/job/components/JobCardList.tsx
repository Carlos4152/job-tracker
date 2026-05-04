import { Grid } from '@chakra-ui/react';

import { Job } from '../types/job.type';
import JobCard from './JobCard';
import JobCard2 from './JobCard2';

interface JobCardListProps {
  jobs: Job[];
  view: 'list' | 'grid';
}

export default function JobCardList({ jobs, view }: JobCardListProps) {
  if (view === 'list') {
    return (
      <Grid  gap={3}>
        {jobs.map((job) => (
          <JobCard2 key={job._id} job={job} />
        ))}
      </Grid>
    );
  }

  return (
    <Grid templateColumns={{ lg: 'repeat(3, 1fr)' }} gap={3}>
      {jobs.map((job) => (
        <JobCard key={job._id} job={job} />
      ))}
    </Grid>
  );
}
