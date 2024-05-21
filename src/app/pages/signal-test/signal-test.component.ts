import { Component, inject } from '@angular/core';
import { TestSignalService } from '../../services/test-signal.service';

@Component({
  selector: 'app-signal-test',
  standalone: true,
  imports: [],
  templateUrl: './signal-test.component.html',
  styleUrl: './signal-test.component.scss'
})
export class SignalTestComponent {
  signalService = inject(TestSignalService);
  signalValue = this.signalService.signalValue();
  
  constructor() { }

  updateSignalValue(e: Event) {
    const newSignalVal =  (e.target as HTMLInputElement).value;
    this.signalService.updateSignal(newSignalVal);
  }
}
