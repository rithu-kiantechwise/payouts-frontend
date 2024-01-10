import { utils, writeFile } from 'xlsx';

export const exportExcel = (data, fileName) => {
    const worksheet = utils.json_to_sheet(data);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, 'Sheet 1');
    writeFile(workbook, fileName);
};