import { AfterRenderOptions, Component, OnChanges, OnInit, ViewChild } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { FormsModule } from '@angular/forms';

// Hero model and service
import { Hero } from '../../models/hero';
import { HeroService } from '../../services/hero.service';
import { ExportToExcelService } from '../../services/export-to-excel.service';

// Other Components
import { EditHeroDialogComponent } from '../../components/edit-hero-dialog/edit-hero-dialog.component';
import { CreateHeroDialogComponent } from '../../components/create-hero-dialog/create-hero-dialog.component';

// Material UI Imports
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, Sort, MatSortModule} from '@angular/material/sort';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-home',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatTableModule, MatInputModule, MatFormFieldModule, MatCheckboxModule, MatButtonModule, MatIconModule, MatDatepickerModule, MatSortModule, FormsModule, RouterLink, RouterLinkActive ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  constructor(private _heroService: HeroService, private _excelExportService: ExportToExcelService, private _liveAnnouncer: LiveAnnouncer, public dialog: MatDialog,) {}
  heroList: Hero[] = []
  currentHeroes = new MatTableDataSource(this.heroList)
  displayedColumns = ['select', 'id', 'name', 'firstName', 'lastName', 'place']
  selection = new SelectionModel<Hero>(true, [])
  tableId = 'Hero-Table'
  filterValue = '';
  @ViewChild(MatSort) sort!: MatSort;

  //Lifecycle
  ngOnInit() {
    this.getHeroes();
  }

  ngAfterViewChecked() {
    this.currentHeroes.sort = this.sort;
  }

  //Retrieve Heroes From API
  getHeroes() {
    this._heroService.getHeroes().subscribe(res => {
      this.heroList = res;
      this.currentHeroes = new MatTableDataSource(res);
      console.log(this.currentHeroes)
    });
  }

  //Add Hero Button Functions
  openCreateDialog(): void {
    const dialogRef = this.dialog.open(CreateHeroDialogComponent, {});
    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
      this.getHeroes();
    })
  }

  //Edit Hero Button Functions
  openEditDialog(): void {
    if(this.selection.selected.length == 1) {
      const dialogRef = this.dialog.open(EditHeroDialogComponent, {
        data: {
          id: this.selection.selected[0].id,
        }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log(result)
      })
    } else if(this.selection.selected.length == 0) {
      alert('Please select a hear you\'d like to edit first')
    } else {
      alert('Please select only one hero to edit at a time.')
    }
  }

  //export function
  export() {
    this._excelExportService.exportToExcel(this.tableId, 'HeroExport')
  }

  //filter function
  applyFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.currentHeroes.filter = this.filterValue.trim().toLowerCase();
  }

  removeFilter() {
    this.filterValue = ''
    this.currentHeroes.filter = this.filterValue.trim().toLowerCase();
  }

  //sort functions
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
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
}
