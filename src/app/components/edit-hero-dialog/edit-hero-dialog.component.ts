import { Component, Inject, inject } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';

// Hero related Imports
import { Hero } from '../../models/hero';
import { HeroService } from '../../services/hero.service';

// Material Imports
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';

interface IncomingData {
  hero: Hero
}

@Component({
  selector: 'app-edit-hero-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, MatDialogModule,MatInputModule, MatButtonModule, MatIconModule, MatFormFieldModule ],
  templateUrl: './edit-hero-dialog.component.html',
  styleUrl: './edit-hero-dialog.component.scss'
})
export class EditHeroDialogComponent {
  heroCreateForm = new FormGroup({
    name: new FormControl<string>('', Validators.required),
    firstName: new FormControl<string>('', Validators.required),
    lastName: new FormControl<string>('', Validators.required),
    city: new FormControl<string>('', Validators.required)
  })

  _heroService = inject(HeroService);

  constructor(
    public dialogRef:MatDialogRef<EditHeroDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IncomingData,
  ) {}

  currentHero: Hero = {id: 0, name: 'error', firstName: 'error', lastName: 'error', place: 'error'}

  ngOnInit(): void {
    this.currentHero = this.data.hero;
    let controls = this.heroCreateForm.controls;
    controls.name.setValue(this.data.hero.name);
    controls.firstName.setValue(this.data.hero.firstName);
    controls.lastName.setValue(this.data.hero.lastName);
    controls.city.setValue(this.data.hero.place);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    let heroFormControls = this.heroCreateForm.controls;
    let updatedHero: Hero = {
      id: this.currentHero.id,
      name: heroFormControls.name.value ? heroFormControls.name.value : '',
      firstName: heroFormControls.firstName.value ? heroFormControls.firstName.value : '',
      lastName: heroFormControls.lastName.value ? heroFormControls.lastName.value : '',
      place: heroFormControls.city.value ? heroFormControls.city.value : ''
    }
    this._heroService.updateHero(updatedHero);
    this.dialogRef.close();
  }

}
