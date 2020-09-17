import { Component, Input, Output, EventEmitter } from '@angular/core';

import { ByteBox } from '../byte-box';

@Component({
  selector: 'bitmap',
  templateUrl: './bitmap.component.html'
})
export class BitmapComponent {
  
  @Input() bytes: ByteBox [];
  @Output() bitClicked = new EventEmitter<string>();
  
  constructor() {
  }
  
  byteClick(event, byte) {
    console.log('byteClick:', event.target);
    
    let bit = event.target.dataset.bit;
    bit = 7 - bit;
    
    let new_bits = '';
    for (let i in byte.bits) {
      let b = byte.bits[i];
      if (i == bit) {
        if (b == '0') b = '1'
        else if (b == '1') b = '0';
      }
      new_bits += b;
    }
    byte.bits = new_bits;
    
    this.bitClicked.emit();
  }

}
