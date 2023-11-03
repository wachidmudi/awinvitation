import fs from 'node:fs/promises';
import { Invitees } from './types';

export async function getInvitees() {
  const file = await fs.readFile(
    process.cwd() + '/src/lib/data/invitees-with-code.json',
    'utf8'
  );

  return JSON.parse(file) as Invitees;
}
