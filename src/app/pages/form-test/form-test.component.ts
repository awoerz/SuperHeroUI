import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-form-test',
  standalone: true,
  imports: [ MatFormFieldModule, ReactiveFormsModule, MatInputModule ],
  templateUrl: './form-test.component.html',
  styleUrl: './form-test.component.scss'
})
export class FormTestComponent {
  name = new FormControl('');
}
