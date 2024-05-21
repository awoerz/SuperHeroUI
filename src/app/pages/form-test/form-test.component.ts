import { Component, inject } from '@angular/core';
import { Location } from '@angular/common';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';

// Hero related Imports
import { Hero } from '../../models/hero';
import { HeroService } from '../../services/hero.service';

// Material Imports
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-form-test',
  standalone: true,
  imports: [ MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatButtonModule ],
  templateUrl: './form-test.component.html',
  styleUrl: './form-test.component.scss'
})
export class FormTestComponent {
  hero = new FormGroup({
    name: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required)
  })

  private _location = inject(Location)
  private _heroService = inject(HeroService)

  backClick() {
    this._location.back();
  }

  onSubmit() {
    let newHero: Hero = {
      id: 0,
      name: this.hero.controls.name.value ? this.hero.controls.name.value : '',
      firstName: this.hero.controls.firstName.value ? this.hero.controls.firstName.value : '',
      lastName: this.hero.controls.lastName.value ? this.hero.controls.lastName.value : '',
      place: this.hero.controls.city.value ? this.hero.controls.city.value : ''
    }

    console.log(newHero)

    this._heroService.addHero(newHero);
    this.hero.reset();
  }

}
