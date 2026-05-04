'use client';

import {
  Portal,
  Select,
  Status,
  HStack,
  Text,
  useSelectContext,
} from '@chakra-ui/react';
import { status } from '../constants/job-status';

const SelectValue = () => {
  const select = useSelectContext();
  const items = select.selectedItems as Array<{
    label: string;
    value: string;
    color: string;
  }>;

   if (!items.length || !items[0]) {
    return <Select.ValueText placeholder="Select status" />
  }
  const { label, color } = items[0];
  return (
    <Select.ValueText placeholder="Select status">
      <HStack gap="2">
        <Status.Root colorPalette={color}>
          <Status.Indicator />
        </Status.Root>
        <Text>{label}</Text>
      </HStack>
    </Select.ValueText>
  );
};

interface SelectStatusInput {
  size?: 'xs' | 'sm' | 'lg' | 'md';
  width?: string;
  value?: string[];
  onValueChange?: (details: { value: string[] }) => void;
}
const SelectStatus = ({
  size,
  width,
  onValueChange,
  value,
}: SelectStatusInput) => {
  return (
    <Select.Root
      collection={status}
      size={size ? size : 'xs'}
      width={width ? width : '120px'}
      value={value}
      positioning={{ sameWidth: true }}
      onValueChange={onValueChange}
    >
      <Select.HiddenSelect />

      <Select.Control>
        <Select.Trigger>
          <SelectValue />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            {status.items.map((status) => (
              <Select.Item
                item={status}
                key={status.value}
                justifyContent="flex-start"
              >
                <Status.Root colorPalette={status.color}>
                  <Status.Indicator />
                </Status.Root>
                {status.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );
};

export default SelectStatus;
