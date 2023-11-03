'use client';

import {
  ActionIcon,
  Container,
  CopyButton,
  Paper,
  Table,
  Text,
  Title,
} from '@mantine/core';
import { IconCopy } from '@tabler/icons-react';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { env } from '~/configs/env';
import { getInfo } from '~/lib/api';
import { Invitees } from '~/lib/data/types';

const i = getInfo();

interface CopyLinkButtonProps {
  copy(): void;
  copied: boolean;
  name: string;
}

const CopyLinkButton = ({ copied, copy, name }: CopyLinkButtonProps) => {
  useEffect(() => {
    if (copied) {
      toast.success(t => (
        <span onClick={() => toast.dismiss(t.id)}>
          Tautan untuk <b>&quot;{name}&quot;</b> berhasil disalin
        </span>
      ));
    }
  }, [copied, name]);

  return (
    <ActionIcon
      variant="white"
      c="dark.2"
      title="Salin Tautan Undangan"
      onClick={() => {
        if (!copied) {
          copy();
        }
      }}
      p={0}
    >
      <IconCopy size="1.2rem" />
    </ActionIcon>
  );
};

interface Props {
  data: Invitees;
}

export function GuestListPage({ data }: Props) {
  const renderRows = (rows: Invitees['bride']) => {
    return rows.map((item, idx) => (
      <tr key={item.code}>
        <td>{idx + 1}</td>
        <td>{item.name}</td>
        <td>
          <Text fz="sm" w={80} truncate>
            {item.code}
          </Text>
        </td>
        <td>
          <CopyButton
            value={`${env.APP_URL}/${i.app.slug}/${item.code}`}
            timeout={2000}
          >
            {({ copied, copy }) => (
              <CopyLinkButton copy={copy} copied={copied} name={item.name} />
            )}
          </CopyButton>
        </td>
      </tr>
    ));
  };

  return (
    <Container py="lg">
      <Title order={3} ta="center" mb="sm">
        Daftar Undangan
      </Title>

      <Title order={4} fw={500} mb="sm">
        Undangan Pengantin Wanita
      </Title>
      <Paper radius="md" withBorder mb="lg" sx={{ overflow: 'hidden' }}>
        <Table striped>
          <thead>
            <tr>
              <th style={{ width: '10%' }}>No</th>
              <th style={{ width: '70%' }}>Nama</th>
              <th style={{ width: '10%' }}>Kode</th>
              <th style={{ width: '10%' }}>#</th>
            </tr>
          </thead>
          <tbody>{renderRows(data.bride)}</tbody>
        </Table>
      </Paper>

      <Title order={4} fw={500} mb="sm">
        Undangan Pengantin Pria
      </Title>
      <Paper radius="md" withBorder mb="lg" sx={{ overflow: 'hidden' }}>
        <Table striped>
          <thead>
            <tr>
              <th style={{ width: '10%' }}>No</th>
              <th style={{ width: '70%' }}>Nama</th>
              <th style={{ width: '10%' }}>Kode</th>
              <th style={{ width: '10%' }}>#</th>
            </tr>
          </thead>
          <tbody>{renderRows(data.groom)}</tbody>
        </Table>
      </Paper>
    </Container>
  );
}
