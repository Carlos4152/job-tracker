import AppSidebar from '@/components/layout/AppSidebar';
import { Box, Container, Flex } from '@chakra-ui/react';

export default function WebApplayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container maxW="8xl">
      <Flex gap={{ base: 5, lg: 10 }} direction={{ base: 'column', lg: 'row' }} py={{ base: 3, lg: 0}}>
        <AppSidebar />
        <Box flex={1} py={{lg: 8}}>{children}</Box>
      </Flex>
    </Container>
  );
}
