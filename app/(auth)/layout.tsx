import { Box, Grid, GridItem } from '@chakra-ui/react';
import Image from 'next/image';

function Authlayout({ children }: { children: React.ReactNode }) {
  return (
    <Grid
      templateColumns={{ base: 'repeat(1, 1fr)', lg: 'repeat(12, 1fr)' }}
      h="100vh"
    >
      <GridItem py={10} colSpan={{ lg: 5}}>{children}</GridItem>
      <GridItem
        display={{ base: 'none', lg: 'block' }}
        position="relative" 
        colSpan={{ lg: 7}}
      >
        <Image
          src="/auth-img.png"
          alt="Developer Searching for jobs"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
      </GridItem>
    </Grid>
  );
}

export default Authlayout;
