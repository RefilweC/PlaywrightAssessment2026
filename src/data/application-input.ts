import path from 'path';
import xlsx from 'xlsx';

export type LoginCredentials = {
  email: string;
  password: string;
};

export function getLoginCredentials(): LoginCredentials {
  const workbook = xlsx.readFile(path.resolve(__dirname, '../../data/testData.xlsx'));
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows = xlsx.utils.sheet_to_json<LoginCredentials>(sheet, { defval: '' });

  const firstRow = rows[0];

  if (!firstRow?.email || !firstRow?.password) {
    throw new Error('No login credentials found in data/testData.xlsx');
  }

  return {
    email: String(firstRow.email),
    password: String(firstRow.password),
  };
}
