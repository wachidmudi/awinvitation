const keys = ['NEXT_PUBLIC_APP_NAME', 'NEXT_PUBLIC_APP_URL'] as const;

keys.forEach(key => {
  if (!process.env[key]) {
    throw new Error('Missing environment variable: ' + key);
  }
});

export const env = {
  APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || '',
  APP_URL: process.env.NEXT_PUBLIC_APP_URL || '',
};
