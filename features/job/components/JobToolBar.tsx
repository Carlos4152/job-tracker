'use client';

import { Grid, GridItem, Stack, Tabs, Button } from '@chakra-ui/react';
import { LuTableOfContents } from 'react-icons/lu';
import { BsFillGrid1X2Fill } from 'react-icons/bs';
import { PiReadCvLogo } from 'react-icons/pi';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { SearchInput } from '@/components/shared/SearchInput';
import SelectStatus from './form/SelectStatus';
import { IoGridOutline } from 'react-icons/io5';

interface JobToolBarProps {
  view: 'list' | 'grid';
  setView: (value: 'list' | 'grid') => void;
}

export default function JobToolBar({ view, setView }: JobToolBarProps) {
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

  const handleViewChange = (value: 'list' | 'grid') => {
    setView(value);

    localStorage.setItem('jobViewPreference', value);
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
          <Tabs.Root
            variant="enclosed"
            size="sm"
            value={view}
            onValueChange={(details) =>
              handleViewChange(details.value as 'list' | 'grid')
            }
          >
            <Tabs.List>
              <Tabs.Trigger value="list">
                <LuTableOfContents />
              </Tabs.Trigger>
              <Tabs.Trigger value="grid">
                <IoGridOutline />
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
