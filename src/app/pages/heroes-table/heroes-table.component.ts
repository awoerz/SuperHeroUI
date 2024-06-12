import { Component, Injector, ViewChild, inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop'
import { SelectionModel } from '@angular/cdk/collections';
import { FormsModule } from '@angular/forms';


import { HeroSignalService } from '../../services/hero-signal.service';
import { Hero } from '../../models/hero';
import { ExportToExcelService } from '../../services/export-to-excel.service';

// Other Components
import { EditHeroDialogComponent } from '../../components/edit-hero-dialog/edit-hero-dialog.component';
import { CreateHeroDialogComponent } from '../../components/create-hero-dialog/create-hero-dialog.component';
import { DeleteHeroDialogComponent } from '../../components/delete-hero-dialog/delete-hero-dialog.component';


// Material UI Imports
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckbox, MatCheckboxModule } from '@angular/material/checkbox';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';


@Component({
  selector: 'app-heroes-table',
  standalone: true,
  imports: [ FormsModule, MatDialogModule, MatTableModule, MatSortModule, MatDatepickerModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatCheckboxModule, MatIconModule, MatPaginatorModule ],
  templateUrl: './heroes-table.component.html',
  styleUrl: './heroes-table.component.scss'
})
export class HeroesTableComponent {
  // Hero state management
  private _heroSignalService = inject(HeroSignalService)
  private _injector = inject(Injector)
  heroes = this._heroSignalService.heroSignalValue
  
  // Dialog Buttons
  dialog = inject(MatDialog)

  // Table State Management
  tableData = new MatTableDataSource<Hero>([])
  displayedColumns = ['select', 'id', 'name', 'firstName', 'lastName', 'place']
  tableId = 'Hero-Table'
  selection = new SelectionModel<Hero>(true, [])
  filterValue = '';
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // Initial hero data from service.
  ngOnInit() {
    this._heroSignalService.getHeroes()
    toObservable(this.heroes, {
      injector: this._injector
    }).subscribe(() => {
      this.tableData.data = this._heroSignalService.heroSignalValue()
    })
  }

  // Set Paginator and sort
  ngAfterViewInit() {
    this.tableData.paginator = this.paginator;
    this.tableData.sort = this.sort;
  }

  // Controls for CRUD buttons
  openCRUDDialog(dialogType?: string): void {
    switch(dialogType) {
      case "create":
        const dialogRef = this.dialog.open(CreateHeroDialogComponent, {});
        dialogRef.afterClosed().subscribe(res =>{
          this._heroSignalService.getHeroes();
        })
        break;
      case "edit":
        if(this.selection.selected.length == 1) {
          let heroToPass: Hero = this.selection.selected[0]
          const dialogRef = this.dialog.open(EditHeroDialogComponent, {
            data: {
              hero: heroToPass
            }
          });
      
          dialogRef.afterClosed().subscribe(result => {
            this.selection.clear() //This line is required to not break the select all button after closing the delete dialog.
            this._heroSignalService.getHeroes()
          })
        } else if(this.selection.selected.length == 0) {
          alert('Please select a hear you\'d like to edit first')
        } else {
          alert('Please select only one hero to edit at a time.')
        }
        break;
      case "delete":
        if(this.selection.selected.length == 1) {
          const dialogRef = this.dialog.open(DeleteHeroDialogComponent, {
            data: {
              id: this.selection.selected[0].id,
            }
          });
          dialogRef.afterClosed().subscribe(result => {
            this.selection.clear() //This line is required to not break the select all button after closing the delete dialog.
            this._heroSignalService.getHeroes() 
          })
        } else if(this.selection.selected.length == 0) {
          alert('Please select a hear you\'d like to delete first')
        } else {
          alert('Please select only one hero to delete at a time. Bulk Delete is an administrative function.')
        }
        break;
      default:
        alert("default")
        break;
    }
  }

  // Export to Excel
  export() {
    alert("export")
  }


  // Filter Functions
  applyFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.tableData.filter = this.filterValue.trim().toLowerCase();
    if (this.tableData.paginator) {
      this.tableData.paginator.firstPage();
    }
  }

  removeFilter() {
    this.filterValue = ''
    this.tableData.filter = this.filterValue.trim().toLowerCase();
  }

  //select functions
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.tableData.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.tableData.data);
  }

  checkboxLabel(row?: Hero): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  showSelected() {
    if(this.selection.selected.length > 0) {
      let output = "You have selected ";
      this.selection.selected.forEach(hero => {
        output += `${hero.name}, `;
      })
      alert(output)
    } else {
      alert("You haven't selected anything")
    }
  }

}
