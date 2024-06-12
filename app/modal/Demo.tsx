'use client';

import React from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader } from '@libComponents/Modal';
import { Button } from '@libComponents/Button';
import { X } from 'lucide-react';

const mockText =
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur dolorum voluptate ratione dicta. Maxime cupiditate, est commodi consectetur earum iure, optio, obcaecati in nulla saepe maiores nobis iste quasi alias!';

type Props = {};

export const DemoBasicModal = (props: Props) => {
  const [active, setActive] = React.useState(false);
  return (
    <>
      <Button onClick={() => setActive(true)} className='w-24'>
        Open
      </Button>

      <Modal type='dynamic' isActive={active} onClose={() => setActive(false)}>
        <ModalHeader>
          Modal Title
          <Button variant='ghost' onClick={() => setActive(false)}>
            <X />
          </Button>
        </ModalHeader>
        <ModalBody>{mockText}</ModalBody>
        <ModalFooter>
          <Button onClick={() => setActive(false)}>Close</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};
