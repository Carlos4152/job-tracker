import {
  JobCardSummarySkeleton,
  JobDescriptionSkeleton,
  JobHeaderSkeleton,
  JobSourceCardSkeleton,
  JobTimelineSkeleton,
  NetworkCardSkeleton,
} from '@/features/job/components/skeleton/job-detail-skeleton';
import {
  Stack,
  Box,
  Grid,
  GridItem,
  Separator,
  Skeleton,
} from '@chakra-ui/react';

export default function JobDetailsLoading() {
  return (
    <Stack py={3} spaceY={4}>
      <Box>
        <Skeleton height="20px" width="100px" />
      </Box>

      <Grid templateColumns={{ lg: 'repeat(12, 1fr)' }} gap={5}>
        <GridItem colSpan={{ lg: 8 }}>
          <Stack gap={5}>
            <JobHeaderSkeleton />
            <JobDescriptionSkeleton />
          </Stack>
        </GridItem>

        <GridItem colSpan={{ lg: 4 }} spaceY={5}>
          <JobSourceCardSkeleton />
          <Separator variant="dashed" />
          <NetworkCardSkeleton />
          <Separator variant="dashed" />
          <JobCardSummarySkeleton count={3} />
          <Separator variant="dashed" />
          <JobTimelineSkeleton count={3} />
        </GridItem>
      </Grid>
    </Stack>
  );
}
