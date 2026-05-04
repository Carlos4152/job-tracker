import { Grid } from '@chakra-ui/react';

import { Job } from '../types/job.type';
import JobCard from './JobCard';

export default function JobCardList({ jobs }: { jobs: Job[] }) {
  return (
    <Grid templateColumns={{ lg: 'repeat(3, 1fr)' }} gap={3}>
      {jobs.map((job) => (
        <JobCard key={job._id} job={job} />
      ))}
    </Grid>
  );
}
