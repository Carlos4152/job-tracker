import { Box, HStack, Skeleton, Stack } from '@chakra-ui/react';

export function CardSkeleton() {
  return (
    <Box borderWidth="1px" borderRadius="lg" p={4} spaceY={3}>
      <HStack justifyContent="space-between">
        <Skeleton height="24px" width="100px" />
        <Skeleton height="24px" width="24px" borderRadius="full" />
      </HStack>

      <HStack gap={3}>
        <Skeleton height="48px" width="48px" borderRadius="full" />
        <Stack gap={1} flex={1}>
          <Skeleton height="20px" width="70%" />
          <Skeleton height="16px" width="50%" />
        </Stack>
      </HStack>

      <Stack gap={2}>
        <HStack>
          <Skeleton height="16px" width="60px" />
          <Skeleton height="16px" width="100px" />
        </HStack>
        <HStack>
          <Skeleton height="16px" width="50px" />
          <Skeleton height="16px" width="80px" />
        </HStack>
        <HStack>
          <Skeleton height="16px" width="60px" />
          <Skeleton height="16px" width="120px" />
        </HStack>
      </Stack>
    </Box>
  );
}
