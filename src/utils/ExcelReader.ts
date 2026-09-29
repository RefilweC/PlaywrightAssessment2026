// utils/excelReader.ts
import xlsx from 'xlsx';

export function readExcel(path: string) {
  const workbook = xlsx.readFile(path);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  return xlsx .utils.sheet_to_json(sheet);
}