'use client';

import { Card, Container, Flex, Title } from '@mantine/core';
import { useEffect } from 'react';

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: Props) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <>
      <Container bg="gray.1" h="100vh">
        <Flex justify="center" align="center" h="100%">
          <Card ta="center" radius="lg" withBorder>
            <Title>Sorry</Title>
            <p>We encounter an error in our site</p>
            <p>You can try the following methods :</p>
            <ul style={{ textAlign: 'left' }}>
              <li>Clear browser Cookies & Cache</li>
              <li>Update your browser to latest version</li>
              <li>Use Google Chrome browser</li>
            </ul>
            <p>or</p>
            <button
              type="button"
              onClick={
                // Attempt to recover by trying to re-render the segment
                () => reset()
              }
            >
              Try again
            </button>
          </Card>
        </Flex>
      </Container>
    </>
  );
}
