import JobForm from '@/features/job/components/form/job-form';
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

      <Box>
        <Heading>Add Application</Heading>
        <Text color="fg.subtle">Create a new application.</Text>
      </Box>
      <Box width={{ lg: '80%' }}>
        <JobForm />
      </Box>
    </Stack>
  );
}
