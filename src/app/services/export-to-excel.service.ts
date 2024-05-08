import { Injectable } from '@angular/core';
import { share } from 'rxjs';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExportToExcelService {

  constructor() { }

  exportToExcel(tableId: string, name?: string): void {
    let timeSpan = new Date().toISOString();
    let prefix = name || 'ExportResult';
    let filename = `${prefix}-${timeSpan}`;
    let targetTableElm = document.getElementById(tableId);
    if (targetTableElm != null) {
      let wb = XLSX.utils.table_to_book(targetTableElm, <XLSX.Table2SheetOpts>{ sheet: prefix });
      XLSX.writeFile(wb, `${filename}.xlsx`);
    }
  }

}
