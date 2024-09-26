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

      <Modal isActive={active} onClose={() => setActive(false)}>
        <ModalHeader>
          Modal Title
          <Button onClick={() => setActive(false)}>
            <X className='h-4 w-4' />
          </Button>
        </ModalHeader>
        <ModalBody>{mockText}</ModalBody>
        <ModalFooter>
          <Button onClick={() => setActive(false)}>Close</Button>
          <Button onClick={() => setActive(false)}>OK</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export const DemoStaticModal = (props: Props) => {
  const [active, setActive] = React.useState(false);
  return (
    <>
      <Button onClick={() => setActive(true)} className='w-24'>
        Open
      </Button>

      <Modal isActive={active} onClose={() => setActive(false)} isStatic>
        <ModalHeader>
          Modal Title
          <Button onClick={() => setActive(false)}>
            <X className='h-4 w-4' />
          </Button>
        </ModalHeader>
        <ModalBody>{mockText}</ModalBody>
        <ModalFooter>
          <Button onClick={() => setActive(false)}>Close</Button>
          <Button onClick={() => setActive(false)}>OK</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export const DemoSmallModal = (props: Props) => {
  const [active, setActive] = React.useState(false);
  return (
    <>
      <Button onClick={() => setActive(true)} className='w-24'>
        Open
      </Button>

      <Modal isActive={active} onClose={() => setActive(false)} isStatic size='small'>
        <ModalHeader>
          Modal Title
          <Button onClick={() => setActive(false)}>
            <X className='h-4 w-4' />
          </Button>
        </ModalHeader>
        <ModalBody>{mockText}</ModalBody>
        <ModalFooter>
          <Button onClick={() => setActive(false)}>Close</Button>
          <Button onClick={() => setActive(false)}>OK</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export const DemoLargeModal = (props: Props) => {
  const [active, setActive] = React.useState(false);
  return (
    <>
      <Button onClick={() => setActive(true)} className='w-24'>
        Open
      </Button>

      <Modal isActive={active} onClose={() => setActive(false)} isStatic size='large'>
        <ModalHeader>
          Modal Title
          <Button onClick={() => setActive(false)}>
            <X className='h-4 w-4' />
          </Button>
        </ModalHeader>
        <ModalBody>{mockText}</ModalBody>
        <ModalFooter>
          <Button onClick={() => setActive(false)}>Close</Button>
          <Button onClick={() => setActive(false)}>OK</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export const DemoXLargeModal = (props: Props) => {
  const [active, setActive] = React.useState(false);
  return (
    <>
      <Button onClick={() => setActive(true)} className='w-24'>
        Open
      </Button>

      <Modal isActive={active} onClose={() => setActive(false)} isStatic size='extra-large'>
        <ModalHeader>
          Modal Title
          <Button onClick={() => setActive(false)}>
            <X className='h-4 w-4' />
          </Button>
        </ModalHeader>
        <ModalBody>
          <div className='h-[70vh]'>{mockText}</div>
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => setActive(false)}>Close</Button>
          <Button onClick={() => setActive(false)}>OK</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};
