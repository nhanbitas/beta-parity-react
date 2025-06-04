'use client';

import React from 'react';
import { Chip } from 'beta-parity-react/ui/Chip';
import { CarFront } from 'lucide-react';

const values = ['Toyota', 'Ford', 'Mazda', 'Vinfast', 'Mercedes', 'BMW'];

export const MultiFilter = () => {
  const [value, setValue] = React.useState(['Toyota', 'Ford']);
  return (
    <>
      <div className='not-prose flex flex-wrap gap-2'>
        {values.map((item) => (
          <Chip
            color='accent'
            icon={<CarFront />}
            key={item}
            value={item}
            label={item}
            kind='glass'
            checked={value.includes(item)}
            onChange={(e) =>
              setValue(
                value.includes(e.value as string)
                  ? value.filter((i) => i !== e.value)
                  : ([...value, e.value] as string[])
              )
            }
          />
        ))}
      </div>
      <div className='not-prose flex flex-wrap gap-2'>
        {values.map((item) => (
          <Chip
            icon={<CarFront />}
            key={item}
            value={item}
            label={item}
            checked={value.includes(item)}
            kind='glass'
            color='neutral'
            onChange={(e) =>
              setValue(
                value.includes(e.value as string)
                  ? value.filter((i) => i !== e.value)
                  : ([...value, e.value] as string[])
              )
            }
          />
        ))}
      </div>
    </>
  );
};
