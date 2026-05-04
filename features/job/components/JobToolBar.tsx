'use client';

import { Grid, GridItem, Stack, Tabs, Button } from '@chakra-ui/react';
import { LuTableOfContents } from 'react-icons/lu';
import { BsFillGrid1X2Fill } from 'react-icons/bs';
import { PiReadCvLogo } from 'react-icons/pi';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { SearchInput } from '@/components/shared/SearchInput';
import SelectStatus from './SelectStatus';

export default function JobToolBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentStatus = searchParams.get('status') || '';

  const handleStatusChange = ({ value }: { value: string[] }) => {
    const params = new URLSearchParams(searchParams);

    if (value[0]) {
      params.set('status', value[0]);
    } else {
      params.delete('status');
    }

    router.push(`/jobs?${params.toString()}`);
  };

  return (
    <Grid templateColumns={{ lg: 'repeat(2, 1fr)' }} gap={{ lg: 8 }}>
      <GridItem>
        <Stack direction={{ base: 'column', md: 'row' }} gap={4}>
          <SearchInput
            route="/jobs"
            queryKey="q"
            placeholder="Search by title or company name..."
          />
          <SelectStatus
            size="md"
            value={currentStatus ? [currentStatus] : []}
            onValueChange={handleStatusChange}
          />
        </Stack>
      </GridItem>

      <GridItem>
        <Stack
          direction={{ lg: 'row' }}
          gap={3}
          justifyContent={{ lg: 'end' }}
          alignItems={{ lg: 'center' }}
        >
          <Tabs.Root defaultValue="members" variant="enclosed" size="sm">
            <Tabs.List>
              <Tabs.Trigger value="members">
                <LuTableOfContents />
              </Tabs.Trigger>
              <Tabs.Trigger value="projects">
                <BsFillGrid1X2Fill />
              </Tabs.Trigger>
            </Tabs.List>
          </Tabs.Root>
          <Button asChild>
            <Link href="/jobs/new">
              <PiReadCvLogo />
              Register application
            </Link>
          </Button>
        </Stack>
      </GridItem>
    </Grid>
  );
}
