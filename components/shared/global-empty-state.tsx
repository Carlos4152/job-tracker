import { EmptyState, VStack } from '@chakra-ui/react';
import React from 'react';
interface GlobalEmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export function GlobalEmptyState({
  title,
  description,
  icon,
}: GlobalEmptyStateProps) {
  return (
    <EmptyState.Root>
      <EmptyState.Content>
        <EmptyState.Indicator>{icon && icon}</EmptyState.Indicator>
        <VStack textAlign="center">
          <EmptyState.Title>{title}</EmptyState.Title>
          <EmptyState.Description>{description}</EmptyState.Description>
        </VStack>
      </EmptyState.Content>
    </EmptyState.Root>
  );
}
