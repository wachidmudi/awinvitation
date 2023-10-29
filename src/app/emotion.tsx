'use client';
export const dynamic = 'force-dynamic';
import { CacheProvider } from '@emotion/react';
import {
  ColorScheme,
  MantineProvider,
  createEmotionCache,
} from '@mantine/core';
import { useServerInsertedHTML } from 'next/navigation';
import { useRef } from 'react';

interface Props {
  themeColor?: ColorScheme;
  children: React.ReactNode;
}

// must be created outside of the component to persist across renders
const cache = createEmotionCache({ key: 'css' });
cache.compat = true;

export function RootStyleRegistry({ children }: Props) {
  const isServerInserted = useRef(false);

  useServerInsertedHTML(() => {
    if (!isServerInserted.current) {
      isServerInserted.current = true;
      return (
        <style
          data-emotion={`${cache.key} ${Object.keys(cache.inserted).join(' ')}`}
          dangerouslySetInnerHTML={{
            __html: Object.values(cache.inserted).join(' '),
          }}
        />
      );
    }
  });

  return (
    <CacheProvider value={cache}>
      <MantineProvider
        withNormalizeCSS
        withGlobalStyles
        theme={{
          fontFamily: 'var(--font-open-sans), sans-serif',
          components: {
            Button: {
              defaultProps: {
                color: 'dark',
                radius: 'xl',
              },
            },
            TextInput: {
              defaultProps: {
                radius: 'md',
              },
            },
            Textarea: {
              defaultProps: {
                radius: 'md',
              },
            },
          },
        }}
        emotionCache={cache}
      >
        {children}
      </MantineProvider>
    </CacheProvider>
  );
}
