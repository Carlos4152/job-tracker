import { getJobByIdAction } from '@/features/job/actions/job.actions';
import JobForm from '@/features/job/components/form/JobForm';
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
  const response = await getJobByIdAction(id);

  return (
    <Stack py={3} spaceY={4}>
      <Box>
        <ChakraLink asChild variant="underline" focusRing="none">
          <Link href="/jobs">Back to jobs</Link>
        </ChakraLink>
      </Box>

      <Box spaceY={3}>
        <Heading>Update Application</Heading>
        <Text color="fg.subtle">
          Add a new job application to track your progress.
        </Text>
      </Box>
      <Box width={{ lg: '80%' }}>
        <JobForm isEdit={true} initialData={response.data} />
      </Box>
    </Stack>
  );
}
