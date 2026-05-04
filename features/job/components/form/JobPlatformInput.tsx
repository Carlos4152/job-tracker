'use client';

import {
  Portal,
  Select,
  HStack,
  Text,
  useSelectContext,
} from '@chakra-ui/react';
import { JOB_PLATFORM } from '../constants/job-platform';
import Image from 'next/image';

interface SelectStatusInput {
  size?: 'xs' | 'sm' | 'lg' | 'md';
  width?: string;
  value?: string[];
  onValueChange?: (details: { value: string[] }) => void;
}

const SelectValue = () => {
  const select = useSelectContext();
  const items = select.selectedItems as Array<{
    label: string;
    value: string;
    img: string;
  }>;

  if (!items.length) return null;

  const { label, img } = items[0];

  return (
    <Select.ValueText placeholder="Select platform">
      <HStack gap="2">
        <Image src={img} alt={label} width={20} height={20} />
        <Text fontSize="xs">{label}</Text>
      </HStack>
    </Select.ValueText>
  );
};

const JobPlatformInput = ({
  onValueChange,
  size,
  value,
  width,
}: SelectStatusInput) => {
  return (
    <Select.Root
      collection={JOB_PLATFORM}
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
            {JOB_PLATFORM.items.map((platform) => (
              <Select.Item
                item={platform}
                key={platform.value}
                justifyContent="flex-start"
                gap="2"
              >
                <Image
                  src={platform.img}
                  alt={platform.label}
                  width={20}
                  height={20}
                />
                <Text fontSize="sm">{platform.label}</Text>
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );
};

export default JobPlatformInput;
