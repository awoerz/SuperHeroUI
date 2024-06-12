import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TestSubjectService } from '../../services/test-subject.service';

//Material Imports
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { TestSignalService } from '../../services/test-signal.service';


@Component({
  selector: 'app-page-test',
  standalone: true,
  imports: [ RouterLink, MatInputModule, MatButtonModule ],
  templateUrl: './page-test.component.html',
  styleUrl: './page-test.component.scss'
})
export class PageTestComponent {
  // private _stateService = inject(TestSubjectService)
  private _signalService = inject(TestSignalService)
  state = computed(this._signalService.signalValue)

  constructor() {
    // this._stateService.stateSubject$.subscribe(res => {
    //   this.state = res;
    // })
  }
}
