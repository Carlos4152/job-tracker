import { createListCollection } from '@chakra-ui/react';

export const JOB_STATUS = [
  { label: 'All statuses', value: '', color: 'gray' },
  { label: 'Applied', value: 'applied', color: 'yellow' },
  { label: 'Interview', value: 'interview', color: 'blue' },
  { label: 'Offer', value: 'offer', color: 'green' },
  { label: 'Rejected', value: 'rejected', color: 'red' },
];

export const status = createListCollection({
  items: JOB_STATUS,
  itemToString: (item) => item.label,
  itemToValue: (item) => item.value,
});
