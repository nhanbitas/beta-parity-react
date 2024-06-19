'use client';

import React from 'react';
import { NumberInput } from '@libComponents/NumberInput';
import { FloatingLabel } from '@libComponents/FloatingLabel';

type Props = {};

export const DemoNumberInput = (props: Props) => {
  return (
    <NumberInput
      onValueChange={(values, sourceInfo) => console.log(values, sourceInfo)}
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
      isClearable
      isPattern
      allowEmptyFormatting
      format='##-##/##'
      mask='_'
    />
  );
};

export const DemoPhoneLabelInput = (props: Props) => {
  return (
    <FloatingLabel label='Phone Number'>
      <NumberInput
        onValueChange={(values, sourceInfo) => console.log(values, sourceInfo)}
        isClearable
        thousandsGroupStyle='thousand'
        thousandSeparator=' '
      />
    </FloatingLabel>
  );
};
