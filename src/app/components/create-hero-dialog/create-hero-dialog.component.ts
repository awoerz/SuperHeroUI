import { Component, Inject } from '@angular/core';
import { HeroService } from '../../services/hero.service';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-create-hero-dialog',
  standalone: true,
  imports: [ MatDialogModule ],
  templateUrl: './create-hero-dialog.component.html',
  styleUrl: './create-hero-dialog.component.scss'
})
export class CreateHeroDialogComponent {
  constructor(    
    private _heroService: HeroService,
    public dialogRef:MatDialogRef<CreateHeroDialogComponent>
  ) {}
}
