'use client';
import {
  Box,
  Stack,
  Button,
  Menu,
  Portal,
  Avatar,
  Text,
  Container,
} from '@chakra-ui/react';
import { signOut, useSession } from 'next-auth/react';

export default function WebAppNavbar() {
  const { data: session } = useSession();

  const user = {
    firstName: session?.user?.firstName || 'N/A',
    lastName: session?.user?.lastName || 'N/A',
    email: session?.user?.email || 'N/A',
  };

  return (
    <Box bgColor="fg.subtle/10">
      <Container maxW="6xl">
        <Stack direction="row" justifyContent="space-between" py={2}>
          <Box>Logo here</Box>

          <Menu.Root>
            <Menu.Trigger asChild>
              <Stack direction="row">
                <Avatar.Root size="lg">
                  <Avatar.Fallback
                    name={`${user.firstName} ${user.lastName}`}
                  />
                </Avatar.Root>
                <Box>
                  <Text textTransform="capitalize">{`${user.firstName} ${user.lastName}`}</Text>
                  <Text textStyle="sm" color="fg.subtle">
                    {user.email}
                  </Text>
                </Box>
              </Stack>
            </Menu.Trigger>
            <Portal>
              <Menu.Positioner>
                <Menu.Content>
                  <Menu.Item value="new-txt">New Text File</Menu.Item>
                  <Menu.Item value="new-file">New File...</Menu.Item>
                  <Menu.Item value="new-win">New Window</Menu.Item>
                  <Menu.Item value="open-file">Open File...</Menu.Item>
                  <Menu.Item value="sign-out" onClick={() => signOut()}>
                    Sign out
                  </Menu.Item>
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>
        </Stack>
      </Container>
    </Box>
  );
}
