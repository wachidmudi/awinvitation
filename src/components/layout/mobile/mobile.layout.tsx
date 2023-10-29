'use client';

import { Container, rem } from '@mantine/core';

interface Props {
  children: React.ReactNode;
}

export const MobileLayout = ({ children }: Props) => {
  return (
    <Container
      size="500px"
      // c="yellow.5"
      // bg="dark.6"
      bg="white"
      px={0}
      pb={rem(80)}
      pos="relative"
      sx={{ overflowX: 'hidden' }}
    >
      {children}
    </Container>
  );
};
