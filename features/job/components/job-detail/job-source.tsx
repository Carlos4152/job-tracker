import {
  Stack,
  Link as ChakraLink,
  Text,
  HStack,
  Icon,
  Heading,
} from '@chakra-ui/react';
import Link from 'next/link';
import { BiLogoLinkedinSquare } from 'react-icons/bi';
import { LuExternalLink } from 'react-icons/lu';
import { TfiWorld } from 'react-icons/tfi';
import { MdOutlineDocumentScanner } from 'react-icons/md';
import { JobDTO } from '../../types/job.type';
import { urlHelper } from '../../utils/job.helper';

export default function JobSource({ job }: { job: JobDTO }) {
  return (
    <Stack gap={3}>
      <Heading>Company Resources</Heading>
      <Stack>
        <HStack>
          <Icon size="xs" color="fg.subtle">
            <TfiWorld />
          </Icon>
          <Text textStyle="sm">Website</Text>
        </HStack>

        {job?.companyWebsite ? (
          <ChakraLink asChild fontSize="sm" color="blue.500" focusRing="none">
            <Link href={job?.companyWebsite} target="_blank">
              {urlHelper.extractDomain(job?.companyWebsite)}
            </Link>
          </ChakraLink>
        ) : (
          <Text textStyle="sm" color="fg.subtle">
            Unknown
          </Text>
        )}
      </Stack>

      <Stack>
        <HStack>
          <Icon size="sm" color="fg.subtle">
            <BiLogoLinkedinSquare />
          </Icon>
          <Text textStyle="sm">LinkedIn</Text>
        </HStack>

        {job?.companyLinkedIn ? (
          <ChakraLink asChild fontSize="sm" color="blue.500" focusRing="none">
            <Link href={job.companyLinkedIn} target="_blank">
              {urlHelper.cleanLinkedInUrl(job.companyLinkedIn)}
            </Link>
          </ChakraLink>
        ) : (
          <Text textStyle="sm" color="fg.subtle">
            Unknown
          </Text>
        )}
      </Stack>

      <Stack>
        <HStack>
          <Icon size="sm" color="fg.subtle">
            <MdOutlineDocumentScanner />
          </Icon>
          <Text textStyle="sm">Job Post</Text>
        </HStack>

        {job?.jobLink ? (
          <ChakraLink asChild fontSize="sm" color="blue.500" focusRing="none">
            <Link href={job.jobLink} target="_blank">
              Link
              <Icon size="xs">
                <LuExternalLink />
              </Icon>
            </Link>
          </ChakraLink>
        ) : (
          <Text textStyle="sm" color="fg.subtle">
            Unknown
          </Text>
        )}
      </Stack>
    </Stack>
  );
}
