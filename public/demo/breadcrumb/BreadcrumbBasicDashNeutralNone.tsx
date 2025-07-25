'use client';
import { BreadcrumbItem, Breadcrumb } from 'beta-parity-react/ui/Breadcrumb';
import React from 'react';

type Props = {};

export const BreadcrumbBasicDashNeutralNone = (props: Props) => {
  return (
    <div className='not-prose'>
      <Breadcrumb separator='dash' color='neutral' underline='none' {...props}>
        <BreadcrumbItem href='#home'>Home</BreadcrumbItem>
        <BreadcrumbItem href='#docs'>Docs</BreadcrumbItem>
        <BreadcrumbItem href='#components'>Components</BreadcrumbItem>
        <BreadcrumbItem href='#breadcrumb'>Breadcrumb</BreadcrumbItem>
      </Breadcrumb>
    </div>
  );
};
