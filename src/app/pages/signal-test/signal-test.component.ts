import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TestSubjectService } from '../../services/test-subject.service';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';


//Material Imports
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { TestSignalService } from '../../services/test-signal.service';

@Component({
  selector: 'app-signal-test',
  standalone: true,
  imports: [ RouterLink, ReactiveFormsModule, MatInputModule, MatButtonModule ],
  templateUrl: './signal-test.component.html',
  styleUrl: './signal-test.component.scss'
})
export class SignalTestComponent {
  // State related properties
  //private _stateService = inject(TestSubjectService)
  private _signalStateService = inject(TestSignalService)
  state = computed(this._signalStateService.signalValue)

  // Form properties
  stateForm = new FormGroup({
    updateState: new FormControl('', Validators.required)
  })

  // constructor() {
  //   this._stateService.stateSubject$.subscribe(res => {
  //     this.state = res;
  //   })
  // }

  onSubmit(): void {
    let updatedState = this.stateForm.controls.updateState.value;
    if(updatedState != null) {  
      this._signalStateService.updateSignal(updatedState)
      console.log(this.state())
    }
    this.stateForm.reset()
  }
}
