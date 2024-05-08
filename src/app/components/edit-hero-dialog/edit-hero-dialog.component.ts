import { Component, Inject } from '@angular/core';
import { HeroService } from '../../services/hero.service';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Hero } from '../../models/hero';

interface passedId { id: number }

@Component({
  selector: 'app-edit-hero-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatIconModule],
  templateUrl: './edit-hero-dialog.component.html',
  styleUrl: './edit-hero-dialog.component.scss'
})
export class EditHeroDialogComponent {
  constructor(
    private _heroService: HeroService,
    public dialogRef:MatDialogRef<EditHeroDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: passedId,
  ) {}

  currentHero: Hero = {id: 0, name: 'error', firstName: 'error', lastName: 'error', place: 'error'}

  ngOnInit(): void {
    this._heroService.getHero(this.data.id).subscribe(res =>
      this.currentHero = res
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
