'use client';

import {
  Stack,
  Heading,
  Button,
  Drawer,
  Portal,
  CloseButton,
  InputGroup,
  Input,
} from '@chakra-ui/react';
import { NetworkDTO } from '../types/network.types';
import NetworkCard from './network-card';
import NetWorkForm from './network-form';

import { IoSearchOutline } from 'react-icons/io5';
import { IoIosGitNetwork } from 'react-icons/io';

import { useMemo, useState } from 'react';
import { GlobalEmptyState } from '@/components/shared/global-empty-state';

interface NetworkListProps {
  networkData: NetworkDTO[];
  applicationId: string;
}

export function NetworkList({ networkData, applicationId }: NetworkListProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredNetworks = useMemo(() => {
    if (!searchQuery.trim()) {
      return networkData;
    }

    const query = searchQuery.toLowerCase().trim();
    return networkData.filter(
      (network) =>
        network.name?.toLowerCase().includes(query) ||
        network.jobTitle?.toLowerCase().includes(query) ||
        network.name?.toLowerCase().includes(query),
    );
  }, [networkData, searchQuery]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <Stack gap={3}>
      <Stack direction="row" justifyContent="space-between">
        <Heading>Connections</Heading>
        <NetWorkForm applicationId={applicationId} />
      </Stack>

      <Stack gap={5}>
        {networkData.length === 0 && (
          <GlobalEmptyState
            icon={<IoIosGitNetwork />}
            title="Not Connections"
            description="There are not connections attached to this application"
          />
        )}
        {networkData.slice(0, 2).map((network) => (
          <NetworkCard key={network._id} network={network} />
        ))}
      </Stack>

      {networkData.length > 2 && (
        <Drawer.Root size="md">
          <Drawer.Trigger asChild>
            <Button variant="outline" size="sm">
              View more {networkData.length - 2}+
            </Button>
          </Drawer.Trigger>
          <Portal>
            <Drawer.Backdrop />
            <Drawer.Positioner>
              <Drawer.Content>
                <Drawer.Header>
                  <Drawer.Title>All Connections</Drawer.Title>
                </Drawer.Header>
                <Drawer.Body spaceY={5}>
                  <InputGroup startElement={<IoSearchOutline />}>
                    <Input
                      placeholder="Search by name or title"
                      value={searchQuery}
                      onChange={handleSearchChange}
                    />
                  </InputGroup>
                  {filteredNetworks.length === 0 ? (
                    <Stack textAlign="center" py={8}>
                      <Heading size="sm" color="gray.500">
                        No connections found
                      </Heading>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSearchQuery('')}
                      >
                        Clear search
                      </Button>
                    </Stack>
                  ) : (
                    <>
                      {filteredNetworks.length !== networkData.length && (
                        <Heading size="xs" color="gray.500">
                          Showing {filteredNetworks.length} of{' '}
                          {networkData.length} connections
                        </Heading>
                      )}
                      <Stack gap={5}>
                        {filteredNetworks.map((network) => (
                          <NetworkCard key={network._id} network={network} />
                        ))}
                      </Stack>
                    </>
                  )}
                </Drawer.Body>

                <Drawer.CloseTrigger asChild>
                  <CloseButton size="sm" />
                </Drawer.CloseTrigger>
              </Drawer.Content>
            </Drawer.Positioner>
          </Portal>
        </Drawer.Root>
      )}
    </Stack>
  );
}
