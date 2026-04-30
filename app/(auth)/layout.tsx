import { Box, Grid, GridItem } from '@chakra-ui/react';

function Authlayout({ children }: { children: React.ReactNode }) {
  return (
    <Grid
      templateColumns={{ base: 'repeat(1, 1fr)', lg: 'repeat(2, 1fr)' }}
      h="100vh"
    >
      <GridItem py={10}>{children}</GridItem>
      <GridItem display={{ base: 'none', lg: 'block' }}>
        <Box bgColor="fg.subtle/10" h="full" />
      </GridItem>
    </Grid>
  );
}

export default Authlayout;
