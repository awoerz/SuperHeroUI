import { Injectable, computed, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TestSignalService {
  #signalValue = signal<string>('')
  signalValue = computed(this.#signalValue);
  
  constructor() { }

  updateSignal(val: string) {
    this.#signalValue.set(val)
  }
}
