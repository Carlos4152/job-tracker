'use client';

import { useDebouncedCallback } from 'use-debounce';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Input, InputGroup } from '@chakra-ui/react';
import { IoIosSearch } from 'react-icons/io';

interface SearchInputProps {
  route: string;
  queryKey?: string;
  placeholder?: string;
  debounceMs?: number;
  showIcon?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function SearchInput({
  route,
  queryKey = 'q',
  placeholder = 'Search...',
  debounceMs = 300,
  showIcon = true,
}: SearchInputProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [value, setValue] = useState(() => searchParams.get(queryKey) || '');

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set(queryKey, term);
    } else {
      params.delete(queryKey);
    }

    router.push(`${route}?${params.toString()}`);
  }, debounceMs);

  return (
    <InputGroup
      startElement={<IoIosSearch size={18} />}
      width={{ base: 'full', md: '320px' }}
    >
      <Input
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          const val = e.target.value;
          setValue(val);
          handleSearch(val);
        }}
        pl={showIcon ? 8 : undefined}
      />
    </InputGroup>
  );
}
