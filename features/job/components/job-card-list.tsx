import { Grid } from '@chakra-ui/react';

import { JobDTO } from '../types/job.type';
import JobCard from './job-card';
import JobCard2 from './job-card2';

interface JobCardListProps {
  jobs: JobDTO[];
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
    <Grid templateColumns={{ md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={3}>
      {jobs.map((job) => (
        <JobCard key={job._id} job={job} />
      ))}
    </Grid>
  );
}
