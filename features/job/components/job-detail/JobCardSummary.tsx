'use client';
import Image from 'next/image';
import { PLATFORMS } from '../../constants/job-platform';
import { urlHelper } from '../../helper/job.helper';
import { Job } from '../../types/job.type';
import {
  Avatar,
  Badge,
  Card,
  Heading,
  HStack,
  Separator,
  Stack,
  Text,
  Link as ChakraLink,
} from '@chakra-ui/react';
import Link from 'next/link';
import { TbExternalLink } from 'react-icons/tb';

export default function JobCardSummary({ jobs }: { jobs: Job[] }) {
  return (
    <Stack gap={3}>
      <Heading>Other jobs</Heading>

      {jobs.map((job) => {
        const selectedPlatform = PLATFORMS.find(
          (item) => item.value === job.platform,
        );

        const companyLogoUrl = job.companyWebsite
          ? urlHelper.getCompanyLogoUrl(job.companyWebsite)
          : null;
        return (
          <Card.Root key={job._id} variant="outline">
            <Card.Body p={2} spaceY={2}>
              <HStack gap="3">
                <Avatar.Root>
                  <Avatar.Image
                    src={companyLogoUrl ?? undefined}
                    alt={`${job.company} logo`}
                    onError={(e) => {
                      // Browser couldn't load it → hide and show fallback initials
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <Avatar.Fallback name={job.company || 'Company'} />
                </Avatar.Root>
                <Stack gap="0">
                  <Text fontWeight="semibold" textStyle="md">
                    {job.title}
                  </Text>
                  <HStack color="fg.subtle">
                    <Text textStyle="sm">{job.company}</Text>•
                    <Text textStyle="sm">{job.location}</Text>
                  </HStack>
                </Stack>
              </HStack>
            </Card.Body>
            <Separator />
            <Stack p={2}>
              <HStack>
                <Badge textTransform="capitalize" variant="outline">
                  <Image
                    src={selectedPlatform?.img || PLATFORMS[0]?.img}
                    alt={selectedPlatform?.value || PLATFORMS[0]?.value}
                    width={15}
                    height={15}
                  />
                  {selectedPlatform?.label}
                </Badge>
                <Separator orientation="vertical" height="4" />
                <Text textStyle="sm">${job.salary}</Text>
                <Separator orientation="vertical" height="4" />
                <ChakraLink
                  asChild
                  fontSize="sm"
                  color="blue.500"
                  focusRing="none"
                >
                  <Link href={`/jobs/${job._id}`}>
                    View details
                    <TbExternalLink />
                  </Link>
                </ChakraLink>
              </HStack>
            </Stack>
          </Card.Root>
        );
      })}
    </Stack>
  );
}
