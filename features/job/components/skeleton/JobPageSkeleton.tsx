import {
  Grid,
  Skeleton,
  Stack,
  Box,
  Heading,
  GridItem,
} from '@chakra-ui/react';
import { CardSkeleton } from './JobCardSkeleton';

export default function JobSkeletonPage() {
  return (
    <Stack spaceY={5}>
      <Box>
        <Heading>Job Page</Heading>
      </Box>

      {/* Toolbar Skeleton */}
      <Grid templateColumns={{ lg: 'repeat(2, 1fr)' }} gap={{ lg: 8 }}>
        <GridItem>
          <Stack direction={{ base: 'column', md: 'row' }} gap={4}>
            <Skeleton height="40px" width={{ base: 'full', md: '320px' }} />
            <Skeleton height="40px" width={{ base: 'full', md: '200px' }} />
          </Stack>
        </GridItem>
        <GridItem>
          <Stack direction="row" justifyContent="flex-end" gap={3}>
            <Skeleton height="32px" width="80px" />
            <Skeleton height="32px" width="160px" />
          </Stack>
        </GridItem>
      </Grid>

      {/* Job Cards Skeleton */}
      <Grid templateColumns={{ lg: 'repeat(3, 1fr)' }} gap={3}>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <CardSkeleton key={i} />
        ))}
      </Grid>
    </Stack>
  );
}
