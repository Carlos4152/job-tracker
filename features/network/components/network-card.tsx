import {
  Avatar,
  Box,
  HStack,
  Icon,
  Stack,
  Text,
  Link as ChakraLink,
} from '@chakra-ui/react';
import Link from 'next/link';

import { IoLocationOutline } from 'react-icons/io5';
import { MdOutlineEmail } from 'react-icons/md';
import { TbExternalLink } from 'react-icons/tb';
import { NetworkDTO } from '../types/network.types';

import { FiPhone } from 'react-icons/fi';
import { NetworkMenuActions } from './network-menu-actions';

interface NetworkCardProps {
  network: NetworkDTO;
}

export default function NetworkCard({ network }: NetworkCardProps) {
  const { location, email, jobTitle, linkedin, name, imageUrl, phone } =
    network;
  return (
    <Stack
      gap={5}
      border="1px solid"
      borderColor="fg.subtle/20"
      p={4}
      position="relative"
    >
      <Box position="absolute" top={0} right={0} m={3}>
        <NetworkMenuActions network={network} />
      </Box>
      <Stack direction={{ lg: 'row' }} gap={4} alignItems="center">
        <Avatar.Root size="xl">
          <Avatar.Fallback name={name} />
          <Avatar.Image src={imageUrl || ''} />
        </Avatar.Root>
        <Box>
          <HStack>
            <Text>{name}</Text>
            <ChakraLink asChild fontSize="xs" color="blue.500" focusRing="none">
              <Link href={linkedin} target="_blank">
                <Icon size="sm">
                  <TbExternalLink />
                </Icon>
              </Link>
            </ChakraLink>
          </HStack>
          <Text textStyle="sm" color="fg.subtle">
            {jobTitle}
          </Text>
        </Box>
      </Stack>
      <Stack>
        {email && (
          <HStack>
            <Icon color="fg.subtle">
              <MdOutlineEmail />
            </Icon>
            <Text textStyle="sm">{email}</Text>
          </HStack>
        )}

        {location && (
          <HStack>
            <Icon color="fg.subtle">
              <IoLocationOutline />
            </Icon>
            <Text textStyle="sm">{location}</Text>
          </HStack>
        )}

        {phone && (
          <HStack>
            <Icon color="fg.subtle">
              <FiPhone />
            </Icon>
            <Text textStyle="sm">{phone}</Text>
          </HStack>
        )}
      </Stack>
    </Stack>
  );
}
