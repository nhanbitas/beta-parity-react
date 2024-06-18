import React from 'react';
import { Form, FormBlock, FormCol, FormControl, FormControlLabel } from '@libComponents/Form';
import { Input } from '@libComponents/Input';

type Props = {};

export const DemoBasicForm = (props: Props) => {
  return (
    <div className='w-full'>
      <Form>
        <FormBlock>
          <FormCol>
            <FormControlLabel> Label </FormControlLabel>
            <FormControl>
              <Input data-text-field='' className='text-field' type='text' placeholder='Placeholder' />
            </FormControl>
          </FormCol>
          <FormCol>
            <FormControlLabel> Label 2 </FormControlLabel>
            <FormControl>
              <Input data-text-field='' className='text-field' type='password' placeholder='Placeholder' />
            </FormControl>
          </FormCol>
        </FormBlock>
      </Form>
    </div>
  );
};
