/* eslint-disable @next/next/no-img-element */
'use client';

import { Paper, Skeleton, Text } from '@mantine/core';
import QRCode from 'qrcode';
import { useEffect, useState } from 'react';

type Status = 'loading' | 'success' | 'error';

export const QRCodeImage = () => {
  const [status, setStatus] = useState<Status>('loading');
  const [svg, setSvg] = useState('');

  const getLocationQRCode = async (text: string) => {
    try {
      const data = await QRCode.toString(text, { type: 'svg' });
      setSvg(data);
      setStatus('success');
      return data;
    } catch (err) {
      setStatus('error');
      console.log('Failed to generate QRCode', err);
      return '';
    }
  };

  useEffect(() => {
    getLocationQRCode('http://google.com');
  }, []);

  let element = <Skeleton w={200} h={200} radius="xs" />;

  if (status === 'success') {
    element = (
      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svg)}`}
        width={200}
        height={200}
        alt="Lokasi"
        style={{
          borderRadius: '0.25rem',
          border: '0.0625rem solid #ced4da',
        }}
      />
    );
  }

  if (status === 'error') {
    element = (
      <Paper w={200} h={200} radius="xs" withBorder>
        <Text ta="center">Maaf, kode QR lokasi tidak bisa ditampilkan</Text>
      </Paper>
    );
  }

  return element;
};
