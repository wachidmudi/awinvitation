import { readFileSync } from 'node:fs';
import fs from 'node:fs/promises';
import { generateRandomHash } from '../../utils/hash';
import { Invitees } from './types';
// import invitees from './invitees.json';

const invitees = JSON.parse(
  readFileSync(__dirname + '/invitees-with-code.json', { encoding: 'utf8' })
) as Invitees;

const items1 = [...invitees.bride];
const items2 = [...invitees.groom];

function generateFriendlyCode(str: string): string {
  let code = str
    .trim()
    .replace(/[^a-z0-9 ]/gi, '')
    .split(' ')
    .slice(0, 3)
    .map(x => x.slice(0, 3))
    .join('')
    .toUpperCase();

  if (code.length > 6) {
    code = code.slice(0, 6);
  } else if (code.length < 6) {
    code = (code + generateRandomHash()).slice(0, 6);
  }

  return code;
}

// 1. Generate initial code
const list1 = items1.map(guest => {
  if (guest.code) {
    return guest;
  }
  const code = generateFriendlyCode(guest.name);
  return { ...guest, code };
});
const list2 = items2.map(guest => {
  if (guest.code) {
    return guest;
  }
  const code = generateFriendlyCode(guest.name);
  return { ...guest, code };
});

const uniqueList = new Map();
const bride: Guest[] = [];
const groom: Guest[] = [];

interface Guest {
  name: string;
  code: string;
}

function assign(data: Guest, type: 'bride' | 'groom') {
  if (!uniqueList.has(data.code)) {
    uniqueList.set(data.code, null);
    if (type === 'bride') {
      bride.push(data);
    } else {
      groom.push(data);
    }
  } else {
    // TODO: Possibly reach maximum call stack exceeded exception
    let current = data;
    current.code = current.code.slice(0, 3) + generateRandomHash(3);
    assign(current, type);
  }
}

async function main() {
  try {
    // 2. Generate code uniqueness
    list1.forEach(x => {
      assign(x, 'bride');
    });
    list2.forEach(x => {
      assign(x, 'groom');
    });

    const data = JSON.stringify({ bride, groom }, null, 2);
    await fs.writeFile(__dirname + '/invitees-with-code.json', data);

    console.log('✨ Successfully created "invitees-with-code.json" file');
  } catch (error) {
    console.log('ERROR : Unable to write json file', String(error));
  }
}

main();
