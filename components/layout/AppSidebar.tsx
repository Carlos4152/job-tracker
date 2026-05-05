'use client';
import {
  Box,
  Stack,
  Button,
  CloseButton,
  Drawer,
  Portal,
  IconButton,
} from '@chakra-ui/react';
import Logo from '../shared/Logo';
import { SIDE_BAR } from '@/constants/app_sidebar';
import { BiMenuAltLeft } from 'react-icons/bi';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import UserMenu from './UserMenu';

export default function AppSidebar() {
  const pathname = usePathname();

  const ResponsiveMenu = (
    <Drawer.Root placement="start">
      <Drawer.Trigger asChild>
        <IconButton variant="outline" size="sm">
          <BiMenuAltLeft />
        </IconButton>
      </Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Box height="100dvh">
              <Stack justifyContent="space-between" py={2} h="100%">
                <Stack>
                  <Box
                    px={4}
                    py={3}
                    borderBottom="1px dashed"
                    borderColor="fg.subtle/20"
                  >
                    <Logo />
                  </Box>

                  <Stack px={4}>
                    {SIDE_BAR.map((nav) => (
                      <Button
                        asChild
                        key={nav.id}
                        variant={
                          pathname.includes(nav.path) ? 'subtle' : 'ghost'
                        }
                        justifyContent="start"
                        size="sm"
                      >
                        <Link href={nav.path}>
                          <nav.icon />
                          {nav.label}
                        </Link>
                      </Button>
                    ))}
                  </Stack>
                </Stack>

                <Box
                  borderTop="1px dashed"
                  borderColor="fg.subtle/20"
                  py={3}
                  px={4}
                >
                  <UserMenu />
                </Box>
              </Stack>
            </Box>
            <Drawer.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );

  return (
    <Box>
      <Box display={{ lg: 'none' }}>{ResponsiveMenu}</Box>
      <Box
        width={{ lg: 260 }}
        height="100dvh"
        borderX="1px dashed"
        borderColor="fg.subtle/20"
        position="sticky"
        top={0}
        display={{ base: 'none', lg: 'block' }}
      >
        <Stack justifyContent="space-between" py={2} h="100%">
          <Stack>
            <Box
              px={4}
              py={3}
              borderBottom="1px dashed"
              borderColor="fg.subtle/20"
            >
              <Logo />
            </Box>

            <Stack px={4}>
              {SIDE_BAR.map((nav) => (
                <Button
                  asChild
                  key={nav.id}
                  variant={pathname.includes(nav.path) ? 'subtle' : 'ghost'}
                  justifyContent="start"
                  size="sm"
                >
                  <Link href={nav.path}>
                    <nav.icon />
                    {nav.label}
                  </Link>
                </Button>
              ))}
            </Stack>
          </Stack>

          <Box borderTop="1px dashed" borderColor="fg.subtle/20" py={3} px={4}>
            <UserMenu />
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}
