const HASH_LENGTH = 6;

export function generateRandomHash(length = HASH_LENGTH) {
  const characters = '0123456789ABCDEFGHIJKLMNPQRSTUVWXYZ';
  let string = '';
  for (let i = 0; i <= length; i++) {
    string += characters[Math.floor(Math.random() * characters.length)];
  }
  return string;
}
