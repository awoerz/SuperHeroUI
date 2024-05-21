import { Injectable } from '@angular/core';
import { share } from 'rxjs';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExportToExcelService {

  constructor() { }

  /**
   * Exports a table on the screen to an excel document.
   * 
   * @param tableId ID of the table currently in the UI that you would like to export
   * @param exportedFileName optional, name of the exported file
   */
  exportToExcel(tableId: string, exportedFileName?: string): void {
    let timeSpan = new Date().toISOString();
    let prefix = exportedFileName || 'ExportResult';
    let filename = `${prefix}-${timeSpan}`;
    let targetTableElm = document.getElementById(tableId);
    if (targetTableElm != null) {
      let wb = XLSX.utils.table_to_book(targetTableElm, <XLSX.Table2SheetOpts>{ sheet: prefix });
      XLSX.writeFile(wb, `${filename}.xlsx`);
    }
  }

  arrayToExcel(arrayToExport: any[], exportedFileName?: string): void {
    let timeSpan = new Date().toISOString();
    let prefix = exportedFileName || 'ExportResult';
    let filename = `${prefix}-${timeSpan}`;
    const worksheet = XLSX.utils.json_to_sheet(arrayToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "export");
    XLSX.writeFile(workbook, `${filename}.xlsx`, { compression: true });
  }

}
