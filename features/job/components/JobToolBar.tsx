'use client';
import {
  Button,
  Grid,
  GridItem,
  Input,
  InputGroup,
  Stack,
  Tabs,
} from '@chakra-ui/react';
import { IoSearchOutline } from 'react-icons/io5';
import SelectStatus from './SelectStatus';
import { LuTableOfContents } from 'react-icons/lu';
import { BsFillGrid1X2Fill } from 'react-icons/bs';

import { PiReadCvLogo } from 'react-icons/pi';
import Link from 'next/link';

export default function JobToolBar() {
  return (
    <Grid templateColumns={{ lg: 'repeat(2, 1fr)' }} gap={{ lg: 8 }}>
      <GridItem>
        <Stack direction={{ base: 'column', md: 'row' }} gap={4}>
          <InputGroup
            startElement={<IoSearchOutline />}
            width={{ lg: '300px' }}
          >
            <Input placeholder="Search jobs application.." />
          </InputGroup>
          <SelectStatus size="md" />
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
