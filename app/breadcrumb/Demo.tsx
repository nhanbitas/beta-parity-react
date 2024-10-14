import { Box } from '@libComponents/Box';
import { BreadcrumbItem, Breadcrumb } from '@libComponents/Breadcrumb';
import React from 'react';

type Props = {};

export const DemoBreadcrumbBasic = (props: Props) => {
  return (
    <Box component='div' className='flex flex-col gap-4' mt={50} p={8} radius={4} bg='aliceblue' w='fit-content'>
      <Breadcrumb {...props}>
        <BreadcrumbItem>Home</BreadcrumbItem>
        <BreadcrumbItem>Docs</BreadcrumbItem>
        <BreadcrumbItem>Components</BreadcrumbItem>
        <BreadcrumbItem>Breadcrumb</BreadcrumbItem>
      </Breadcrumb>
    </Box>
  );
};
