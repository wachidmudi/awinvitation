'use client';

import { Skeleton } from '@mantine/core';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { useIdleCallbackEffect } from '~/hooks';

const Loading = () => <Skeleton w={200} h={200} radius="xs" />;

const Component = dynamic(() =>
  import('../qr-code').then(mod => mod.QRCodeImage)
);

Component.displayName = 'DynamicQRCodeImageClient';

export const QRCodeImageClient = () => {
  const [show, setShow] = useState(false);

  useIdleCallbackEffect(onIdle => {
    onIdle(() => setShow(true), { timeout: 2_000 });
  }, []);

  return show ? <Component /> : <Loading />;
};
