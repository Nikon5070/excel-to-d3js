import { XLSX$Utils } from 'xlsx';

export const makeCols = (refstr: string | undefined, utils: XLSX$Utils): string[] => {
  if (!refstr) {
    return [''];
  }

  return Array(utils.decode_range(refstr).e.c + 1)
    .fill(0)
    .map((x, i) => utils.encode_col(i));
};

export const makeRows = (): string[] => [];
