import JobForm from '@/features/job/components/form/JobForm';
import {
  Stack,
  Link as ChakraLink,
  Box,
  Heading,
  Text,
} from '@chakra-ui/react';
import Link from 'next/link';

export default function page() {
  return (
    <Stack py={3} spaceY={4}>
      <Box>
        <ChakraLink asChild variant="underline" focusRing="none">
          <Link href="/jobs">Back to jobs</Link>
        </ChakraLink>
      </Box>

      <Box spaceY={3}>
        <Heading>Register Application</Heading>
        <Text color="fg.subtle">
          Add a new job application to track your progress.
        </Text>
      </Box>
      <Box width={{ lg: '80%' }}>
        <JobForm />
      </Box>
    </Stack>
  );
}
