'use client';
import {
  Box,
  Stack,
  Menu,
  Portal,
  Avatar,
  Text,
  Button,
  Icon,
  Separator,
} from '@chakra-ui/react';
import { signOut, useSession } from 'next-auth/react';
import { MdLogout } from 'react-icons/md';

export default function UserMenu() {
  const { data: session } = useSession();

  const user = {
    firstName: session?.user?.firstName || 'N/A',
    lastName: session?.user?.lastName || 'N/A',
    email: session?.user?.email || 'N/A',
  };
  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Stack
          direction="row"
          _hover={{ bgColor: 'fg.subtle/10' }}
          p={1}
          rounded="md"
          cursor="pointer"
        >
          <Avatar.Root size="md">
            <Avatar.Fallback name={`${user.firstName} ${user.lastName}`} />
          </Avatar.Root>
          <Box>
            <Text textTransform="capitalize">{`${user.firstName} ${user.lastName}`}</Text>
            <Text textStyle="xs" color="fg.subtle">
              {user.email}
            </Text>
          </Box>
        </Stack>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content spaceY={2}>
            <Stack direction="row" p={1}>
              <Avatar.Root size="md">
                <Avatar.Fallback name={`${user.firstName} ${user.lastName}`} />
              </Avatar.Root>
              <Box>
                <Text textTransform="capitalize">{`${user.firstName} ${user.lastName}`}</Text>
                <Text textStyle="xs" color="fg.subtle">
                  {user.email}
                </Text>
              </Box>
            </Stack>
            <Separator />

            <Menu.Item value="sign-out" onClick={() => signOut()}>
              <Icon size="sm" color="red.500">
                <MdLogout />
              </Icon>
              Sign out
            </Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
}
