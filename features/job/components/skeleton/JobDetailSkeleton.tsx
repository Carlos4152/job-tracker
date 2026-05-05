import {
  Box,
  Skeleton,
  SkeletonText,
  HStack,
  Stack,
  Separator,
} from '@chakra-ui/react';

export function JobHeaderSkeleton() {
  return (
    <Box>
      <HStack gap={3} alignItems="center">
        <Skeleton height="80px" width="80px" borderRadius="full" />
        <Box flex={1}>
          <Skeleton height="28px" width="70%" mb={2} />
          <Skeleton height="20px" width="50%" />
        </Box>
      </HStack>
      <HStack mt={3} gap={3}>
        <Skeleton height="20px" width="150px" />
        <Separator orientation="vertical" height="20px" />
        <Skeleton height="20px" width="100px" />
        <Separator orientation="vertical" height="20px" />
        <Skeleton height="20px" width="80px" />
      </HStack>
    </Box>
  );
}

export function JobDescriptionSkeleton() {
  return (
    <Box>
      <Skeleton height="24px" width="150px" mb={4} />
      <SkeletonText noOfLines={8} gap={3} />
    </Box>
  );
}

export function JobSourceCardSkeleton() {
  return (
    <Box>
      <Skeleton height="24px" width="180px" mb={3} />
      <Stack gap={3}>
        <Box>
          <Skeleton height="16px" width="80px" mb={2} />
          <Skeleton height="20px" width="60%" />
        </Box>
        <Box>
          <Skeleton height="16px" width="80px" mb={2} />
          <Skeleton height="20px" width="70%" />
        </Box>
        <Box>
          <Skeleton height="16px" width="80px" mb={2} />
          <Skeleton height="20px" width="50%" />
        </Box>
      </Stack>
    </Box>
  );
}

export function NetworkCardSkeleton() {
  return (
    <Box>
      <HStack justifyContent="space-between" mb={3}>
        <Skeleton height="24px" width="180px" />
        <Skeleton height="32px" width="100px" />
      </HStack>
      <HStack gap={4} alignItems="center" mb={3}>
        <Skeleton height="60px" width="60px" borderRadius="full" />
        <Box flex={1}>
          <Skeleton height="20px" width="60%" mb={2} />
          <Skeleton height="16px" width="40%" />
        </Box>
      </HStack>
      <Stack gap={2}>
        <Skeleton height="16px" width="70%" />
        <Skeleton height="16px" width="50%" />
      </Stack>
    </Box>
  );
}

export function JobCardSummarySkeleton({ count = 3 }: { count?: number }) {
  return (
    <Box>
      <Skeleton height="24px" width="120px" mb={3} />
      {Array.from({ length: count }).map((_, i) => (
        <Box key={i} borderWidth="1px" borderRadius="md" p={3} mb={3}>
          <HStack gap={3}>
            <Skeleton height="40px" width="40px" borderRadius="full" />
            <Box flex={1}>
              <Skeleton height="16px" width="70%" mb={2} />
              <Skeleton height="14px" width="50%" />
            </Box>
          </HStack>
          <Separator my={2} />
          <HStack gap={2}>
            <Skeleton height="20px" width="80px" />
            <Skeleton height="14px" width="60px" />
            <Skeleton height="14px" width="80px" />
          </HStack>
        </Box>
      ))}
    </Box>
  );
}

export function JobTimelineSkeleton({ count = 3 }: { count?: number }) {
  return (
    <Box>
      <Skeleton height="24px" width="140px" mb={3} />
      {Array.from({ length: count }).map((_, i) => (
        <HStack key={i} gap={3} mb={4}>
          <Skeleton height="32px" width="32px" borderRadius="full" />
          <Box flex={1}>
            <Skeleton height="18px" width="60%" mb={2} />
            <Skeleton height="14px" width="40%" />
          </Box>
        </HStack>
      ))}
    </Box>
  );
}
