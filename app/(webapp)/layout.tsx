import WebAppNavbar from '@/components/layout/WebAppNavbar';
import { Box, Container, Stack } from '@chakra-ui/react';

export default function WebApplayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box>
      <Stack spaceY={5}>
        <WebAppNavbar />

        <Container maxW="6xl">{children}</Container>
      </Stack>
    </Box>
  );
}
