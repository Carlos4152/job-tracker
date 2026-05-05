'use client';
import { Box, Text, Timeline, Icon } from '@chakra-ui/react';
import { LuClock } from 'react-icons/lu';
import { timelineHelper } from '../../helper/job.helper';
import { date_format } from '@/helper/date_format';

interface TimelineEvent {
  event: string;
  date: string;
  note: string | null;
}

interface JobTimelineProps {
  timeline: TimelineEvent[];
}


export default function JobTimeline({ timeline }: JobTimelineProps) {
  if (!timeline || timeline.length === 0) {
    return (
      <Box textAlign="center" py={8}>
        <Text color="fg.subtle">No timeline events yet</Text>
      </Box>
    );
  }

  const sortedTimeline = [...timeline].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );

  return (
    <Timeline.Root>
      {sortedTimeline.map((event, index) => {
        const IconComponent = timelineHelper.getTimelineIcon(event.event);
        const eventColor = timelineHelper.getEventColor(event.event);
        const isLast = index === sortedTimeline.length - 1;

        return (
          <Timeline.Item key={index}>
            <Timeline.Connector>
              {!isLast && <Timeline.Separator />}
              <Timeline.Indicator colorPalette={eventColor}>
                <Icon>
                  <IconComponent />
                </Icon>
              </Timeline.Indicator>
            </Timeline.Connector>
            <Timeline.Content>
              <Timeline.Title fontWeight="semibold">
                {event.event}
              </Timeline.Title>
              <Timeline.Description fontSize="sm" color="fg.muted">
                <Icon as={LuClock} size="xs" mr={1} />
                {date_format.timeline(event.date)}
              </Timeline.Description>
              {event.note && (
                <Text
                  textStyle="sm"
                  mt={2}
                  p={2}
                  bg="bg.muted"
                  borderRadius="md"
                  borderLeft="3px solid"
                  borderLeftColor={`${eventColor}.400`}
                >
                  {event.note}
                </Text>
              )}
            </Timeline.Content>
          </Timeline.Item>
        );
      })}
    </Timeline.Root>
  );
}
