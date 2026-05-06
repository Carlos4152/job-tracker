import { GetJob } from '@/features/job/actions/get-job';
import JobForm from '@/features/job/components/form/job-form';
import {
  Stack,
  Link as ChakraLink,
  Box,
  Heading,
  Text,
} from '@chakra-ui/react';
import Link from 'next/link';

interface JobPageParams {
  params: {
    id: string;
  };
}

export default async function page({ params }: JobPageParams) {
  const { id } = await params;
  const response = await GetJob(id);

  return (
    <Stack py={3} spaceY={4}>
      <Box>
        <ChakraLink asChild variant="underline" focusRing="none">
          <Link href="/jobs">Back to jobs</Link>
        </ChakraLink>
      </Box>

      <Box>
        <Heading>Edit Application</Heading>
        <Text color="fg.subtle">Make changes to your application.</Text>
      </Box>
      <Box width={{ lg: '80%' }}>
        <JobForm isEdit={true} initialData={response.data} />
      </Box>
    </Stack>
  );
}
