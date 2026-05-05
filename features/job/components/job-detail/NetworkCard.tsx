import {
  Avatar,
  Box,
  HStack,
  Icon,
  Stack,
  Text,
  Link as ChakraLink,
  Heading,
} from '@chakra-ui/react';
import Link from 'next/link';

import { IoLocationOutline } from 'react-icons/io5';
import { MdOutlineEmail } from 'react-icons/md';
import { TbExternalLink } from 'react-icons/tb';
import NetWorkForm from '../NetworkForm';

export default function NetworkCard() {
  return (
    <Stack gap={3}>
      <Stack direction="row" justifyContent="space-between">
        <Heading>Network Connection</Heading>
        <NetWorkForm />
      </Stack>
      <Stack gap={5}>
        <Stack direction={{ lg: 'row' }} gap={4} alignItems="center">
          <Avatar.Root size="xl">
            <Avatar.Fallback name="Segun Adebayo" />
            <Avatar.Image src="https://bit.ly/sage-adebayo" />
          </Avatar.Root>
          <Box>
            <HStack>
              <Text>Michael Lee</Text>
              <ChakraLink asChild fontSize="xs" color="blue.500">
                <Link href="/">
                  <Icon size="sm">
                    <TbExternalLink />
                  </Icon>
                </Link>
              </ChakraLink>
            </HStack>
            <Text textStyle="sm" color="fg.subtle">
              Engineering Manager
            </Text>
          </Box>
        </Stack>
        <Stack>
          <HStack>
            <Icon color="fg.subtle">
              <MdOutlineEmail />
            </Icon>
            <Text textStyle="sm">emily@nextwave.com</Text>
          </HStack>

          <HStack>
            <Icon color="fg.subtle">
              <IoLocationOutline />
            </Icon>
            <Text textStyle="sm">San Francisco, CA</Text>
          </HStack>
        </Stack>
      </Stack>
    </Stack>
  );
}
