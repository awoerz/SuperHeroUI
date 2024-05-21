import { Component, ViewChild, inject } from '@angular/core';
import { Hero } from '../../models/hero';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { HeroService } from '../../services/hero.service';
import { TestSubjectService } from '../../services/test-subject.service';

@Component({
  selector: 'app-pagination-test',
  standalone: true,
  imports: [ MatTableModule, MatPaginatorModule, MatSortModule ],
  templateUrl: './pagination-test.component.html',
  styleUrl: './pagination-test.component.scss'
})
export class PaginationTestComponent {
  private _heroService = inject(HeroService)

  heroServiceData: Hero[] = []
  
  displayedColumns = ['id', 'name', 'firstName', 'lastName', 'place']
  dataSource = new MatTableDataSource<Hero>(this.heroServiceData);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    this.getHeroesFromService();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getHeroesFromService() {
    this._heroService.getHeroes().subscribe(res => {
      if(res != undefined) {
        this.heroServiceData = res;
        this.dataSource.data = this.heroServiceData;
      }
    })
  }
}