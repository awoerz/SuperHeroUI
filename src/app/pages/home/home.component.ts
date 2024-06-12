import { Component, ViewChild, inject } from '@angular/core';
import { RouterModule} from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { FormsModule } from '@angular/forms';

// Hero model and service
import { Hero } from '../../models/hero';
import { HeroService } from '../../services/hero.service';
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
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  standalone: true,
  imports: [ RouterModule, FormsModule, MatDialogModule, MatTableModule, MatSortModule, MatDatepickerModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatCheckboxModule, MatIconModule, MatPaginatorModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './home.component.html',
  selector: 'app-home',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  // Dependency Injection
  private _heroService = inject(HeroService)
  private _excelExportService = inject(ExportToExcelService)
  dialog = inject(MatDialog)

  // table related data
  displayedColumns = ['select', 'id', 'name', 'firstName', 'lastName', 'place']
  tableData: Hero[] = []
  currentHeroes = new MatTableDataSource<Hero>(this.tableData)

  // selection, filter and sort for table
  selection = new SelectionModel<Hero>(true, [])
  filterValue = '';
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // used for Table Export
  tableId = 'Hero-Table'

  constructor() {
    this.getHeroes();
  }

  ngAfterViewInit() {
    this.currentHeroes.paginator = this.paginator;
    this.currentHeroes.sort = this.sort;
  }

  //Retrieve Heroes From API
  getHeroes() {
    this._heroService.stateSubject$.subscribe(heroes => {
      this.tableData = heroes;
      this.currentHeroes.data = this.tableData;
    })
    this._heroService.getHeroes();
  }

  //Add Hero Button Functions
  openCreateDialog(): void {
    const dialogRef = this.dialog.open(CreateHeroDialogComponent, {});
    dialogRef.afterClosed().subscribe(res =>{
      this.getHeroes();
    })
  }

  //Edit Hero Button Functions
  openEditDialog(): void {
    if(this.selection.selected.length == 1) {
      let heroToPass: Hero = this.selection.selected[0]
      const dialogRef = this.dialog.open(EditHeroDialogComponent, {
        data: {
          hero: heroToPass
        }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        this.selection.clear(); //This line is required to not break the select all button after closing the delete dialog.
        this._heroService.getHeroes()
      })
    } else if(this.selection.selected.length == 0) {
      alert('Please select a hear you\'d like to edit first')
    } else {
      alert('Please select only one hero to edit at a time.')
    }
  }

  //Delete Hero Button
  openDeleteDialog() {
    if(this.selection.selected.length == 1) {
      const dialogRef = this.dialog.open(DeleteHeroDialogComponent, {
        data: {
          id: this.selection.selected[0].id,
        }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        this.selection.clear(); //This line is required to not break the select all button after closing the delete dialog.
        this._heroService.getHeroes();
      })
    } else if(this.selection.selected.length == 0) {
      alert('Please select a hear you\'d like to delete first')
    } else {
      alert('Please select only one hero to delete at a time. Bulk Delete is an administrative function.')
    }
  }

  //export function
  export() {
    this._excelExportService.arrayToExcel(this.tableData, 'HeroExport');
  }

  //filter function
  applyFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.currentHeroes.filter = this.filterValue.trim().toLowerCase();

    if (this.currentHeroes.paginator) {
      this.currentHeroes.paginator.firstPage();
    }
  }

  removeFilter() {
    this.filterValue = ''
    this.currentHeroes.filter = this.filterValue.trim().toLowerCase();
  }

  //select functions
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.currentHeroes.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.currentHeroes.data);
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

  selectHeroById(id: number): Hero {
    let returnHero : Hero | undefined = this.tableData.find(hero => hero.id === id)
    if(!returnHero) {
      return {
        id: 0,
        name: "Empty",
        firstName: "Not",
        lastName: "Found",
        place: "Nowhere"
      }
    }
    return returnHero
  }

}
