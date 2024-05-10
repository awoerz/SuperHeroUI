import { Component, Inject } from '@angular/core';
import { Location } from '@angular/common';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';

// Hero related Imports
import { Hero } from '../../models/hero';
import { HeroService } from '../../services/hero.service';

// Material Imports
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-create-hero-dialog',
  standalone: true,
  imports: [ MatDialogModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatButtonModule, MatIconModule ],
  templateUrl: './create-hero-dialog.component.html',
  styleUrl: './create-hero-dialog.component.scss'
})
export class CreateHeroDialogComponent {
  heroCreateForm = new FormGroup({
    name: new FormControl<string>('', Validators.required),
    firstName: new FormControl<string>('', Validators.required),
    lastName: new FormControl<string>('', Validators.required),
    city: new FormControl<string>('', Validators.required)
  })

  constructor(    
    private _heroService: HeroService,
    public dialogRef:MatDialogRef<CreateHeroDialogComponent>
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    let heroFormControls = this.heroCreateForm.controls;
    let newHero: Hero = {
      id: 0,
      name: heroFormControls.name.value ? heroFormControls.name.value : '',
      firstName: heroFormControls.firstName.value ? heroFormControls.firstName.value : '',
      lastName: heroFormControls.lastName.value ? heroFormControls.lastName.value : '',
      place: heroFormControls.city.value ? heroFormControls.city.value : ''
    }
    console.log(newHero)
    this._heroService.addHero(newHero);
    this.dialogRef.close();
  }
}
