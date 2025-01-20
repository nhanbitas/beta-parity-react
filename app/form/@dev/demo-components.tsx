'use client';

import React from 'react';
import { Form, FormBlock, FormCol, FormControl, FormControlLabel } from '@libComponents/Form';
import { TextInput } from '@libComponents/TextInput';

type Props = {};

export const DemoBasicForm = (props: Props) => {
  return (
    <div className='w-full'>
      <Form>
        <FormBlock>
          <FormCol>
            <FormControlLabel> Label </FormControlLabel>
            <FormControl>
              <TextInput data-text-field='' className='text-field' placeholder='Placeholder' />
            </FormControl>
          </FormCol>
          <FormCol>
            <FormControlLabel> Label 2 </FormControlLabel>
            <FormControl>
              <TextInput data-text-field='' className='text-field' placeholder='Placeholder' />
            </FormControl>
          </FormCol>
        </FormBlock>
      </Form>
    </div>
  );
};
