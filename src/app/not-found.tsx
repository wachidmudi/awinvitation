'use client';

import { Card, Container, Flex, Title } from '@mantine/core';
import Link from 'next/link';

export default function NotFound() {
  return (
    <Container bg="gray.1" h="100vh">
      <Flex align="center" h="100%">
        <Card ta="center" radius="lg" withBorder>
          <Title>Sorry</Title>
          <p>We could not find the requested resource</p>
          <Link href="/">Return Home</Link>
        </Card>
      </Flex>
    </Container>
  );
}
