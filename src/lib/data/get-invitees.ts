import data from './invitees-with-code.json';
import { Invitees } from './types';

export async function getInvitees() {
  // const file = await fs.readFile(
  //   process.cwd() + '/src/lib/data/invitees-with-code.json',
  //   'utf8'
  // );

  // return JSON.parse(file) as Invitees;
  return data as Invitees;
}
