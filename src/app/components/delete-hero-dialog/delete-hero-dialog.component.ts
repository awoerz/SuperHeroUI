import { Component, Inject } from '@angular/core';
import { HeroService } from '../../services/hero.service';
import { Hero } from '../../models/hero';

import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

interface passedId { id: number }

@Component({
  selector: 'app-delete-hero-dialog',
  standalone: true,
  imports: [ MatDialogModule, MatIconModule, MatButtonModule ],
  templateUrl: './delete-hero-dialog.component.html',
  styleUrl: './delete-hero-dialog.component.scss'
})
export class DeleteHeroDialogComponent {
  heroToDelete: Hero = {id: 0, name: 'error', firstName: 'error', lastName: 'error', place: 'error'}
  
  constructor(
    private _heroService: HeroService,
    public dialogRef:MatDialogRef<DeleteHeroDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: passedId,
  ) {}

  ngOnInit(): void {
    this._heroService.getHero(this.data.id).subscribe(res =>
      this.heroToDelete = res
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete() {
    this._heroService.deleteHero(this.heroToDelete.id);
    this.dialogRef.close();
  }

}
