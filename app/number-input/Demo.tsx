'use client';

import React from 'react';
import { NumberInput } from '@libComponents/NumberInput';

type Props = {};

export const DemoNumberInput = (props: Props) => {
  return (
    <NumberInput
      onValueChange={(values, sourceInfo) => console.log(values, sourceInfo)}
      floatingLabel='Number Input'
      isClearable
      allowLeadingZeros
      thousandsGroupStyle='thousand'
      thousandSeparator=','
    />
  );
};

export const DemoCurrencyInput = (props: Props) => {
  return (
    <NumberInput
      onValueChange={(values, sourceInfo) => console.log(values, sourceInfo)}
      floatingLabel='Currency Input'
      isClearable
      allowLeadingZeros
      thousandsGroupStyle='thousand'
      suffix=' đ'
      thousandSeparator=','
    />
  );
};

export const DemoPhoneInput = (props: Props) => {
  return (
    <NumberInput
      onValueChange={(values, sourceInfo) => console.log(values, sourceInfo)}
      floatingLabel='Number Phone'
      isClearable
      thousandsGroupStyle='thousand'
      thousandSeparator=' '
    />
  );
};

export const DemoPattenInput = (props: Props) => {
  return (
    <NumberInput
      onValueChange={(values, sourceInfo) => console.log(values, sourceInfo)}
      floatingLabel='Enter your code'
      isPattern
      allowEmptyFormatting
      format='##-##&##'
      mask='_'
    />
  );
};
