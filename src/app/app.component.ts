import { Component, Input } from '@angular/core';

import { ByteBox } from './byte-box';

// assets/clipboard.js
declare const clipboard: any;
// declare var jQuery: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'Number Converter';
  
  DECIMAL_VALUE_RX = /^\d+$/;
  HEXADECIMAL_VALUE_RX = /^[0-9a-fA-F ]+$/;
  BINARY_VALUE_RX = /^[01 ]+$/;
  
  hintCount = 16;
  hintNumbers = [];
  powerHintNumbers = [];
  
  decVal = '';
  hexVal = '';
  binVal = '';
  
  format = false;
  fullScreen = false;
  
  currentInput;
  
  bytes: ByteBox[];
  
  
  constructor() {
    for (var i = 0; i<this.hintCount; i++) {
      var hintNum = {
        decVal: i.toString(),
        hexVal: i.toString(16).toUpperCase(),
        binVal: this.normalizeValue(i.toString(2), 4)
      };
      
      this.hintNumbers.push(hintNum);
    }
    
    for (var i = 0; i<this.hintCount; i++) {
      var powerExpr = '2<sup>' + i.toString() + '</sup>';
      var powerDecVal = Math.pow(2, i);
      var powerHexVal = powerDecVal.toString(16).toUpperCase();
      var powerBinVal = this.formatValue(powerDecVal.toString(2), 4);
      
      var hintNumPower = {
        powerExpr: powerExpr,
        powerDecVal: powerDecVal,
        powerHexVal: powerHexVal,
        powerBinVal: powerBinVal
      };
      
      this.powerHintNumbers.push(hintNumPower);
    }
  }
  
  decChange() {
    console.log('decChange()');
    
    this.decCalc();
    this.reformatInputs();
    this.updateBitMap();
  }
  
  hexChange() {
    console.log('hexChange()');
    
    this.hexCalc();
    this.reformatInputs();
    this.updateBitMap();
  }
  
  binChange() {
    console.log('binChange()');
    
    this.binCalc();
    this.reformatInputs();
    this.updateBitMap();
  }
  
  inputFocused(event) {
    this.currentInput = event.target;
  }
  
  
// ---------------------- Service ----------------------
  
  decCalc() {
    console.log('  decCalc()');
    
    var decVal = parseInt(this.decVal);
    
    if (decVal || decVal === 0) {
      var hexVal = decVal.toString(16);
      hexVal = hexVal.toUpperCase();
      this.hexVal = hexVal;
      
      var binVal = decVal.toString(2);
      this.binVal = binVal;
    }
    else {
      this.hexVal = '';
      this.binVal = '';
    }
  }
  
  hexCalc() {
    console.log('  hexCalc()');
    
    this.hexVal = this.hexVal.toUpperCase();
    var hexVal = this.clearFormat(this.hexVal);
    hexVal = parseInt(hexVal, 16);
    
    if (hexVal || hexVal === 0) {
      var decVal = hexVal.toString(10);
      this.decVal = decVal;
      
      var binVal = hexVal.toString(2);
      this.binVal = binVal;
    }
    else {
      this.decVal = '';
      this.binVal = '';
    }
  }
  
  binCalc() {
    console.log('  binCalc()');
    
    var binVal = this.clearFormat(this.binVal);
    binVal = parseInt(binVal, 2);
    
    if (binVal || binVal === 0) {
      var decVal = binVal.toString(10);
      this.decVal = decVal;
      
      var hexVal = binVal.toString(16);
      hexVal = hexVal.toUpperCase();
      this.hexVal = hexVal;
    }
    else {
      this.decVal = '';
      this.hexVal = '';
    }
  }
  
  
  // ####### Handlers #######
  
  formatChange() {
    console.log('formatChange()');
    
    var format = this.format;
    if (format) {
      this.formatInputs();
    }
    else {
      this.unformatInputs();
    }
    
    this.currentInput && this.currentInput.focus();
  }
  
  fullScreenChange() {
    console.log('fullScreenChange()');
    this.currentInput && this.currentInput.focus();
  }
  
  clearInputs() {
    console.log('clearInputs()');
    
    this.decVal = '';
    this.hexVal = '';
    this.binVal = '';
    
    this.bytes = [];
  }

  fillPowerField(item) {
    console.log('fillPowerField(' + item + ')');
    
    this.decVal = item.powerDecVal;
    this.decChange();
  }
  
  decCopy() {
    clipboard.copy(this.decVal);
  }
  
  hexCopy() {
    clipboard.copy(this.hexVal);
  }
  
  binCopy() {
    clipboard.copy(this.binVal);
  }
  
  copyAll() {
    clipboard.copy(this.decVal + '\n' + this.hexVal + '\n' + this.binVal);
  }
  

  // ===== Formatting =====
  
  reformatInputs() {
    if (this.format) {
      this.formatInputs();
    }
    else {
      this.unformatInputs();
    }
  }
  
  formatInputs() {
    console.log('  formatInputs()');
    
    var hexVal = this.hexVal;
    
    if (hexVal) {
      var groupLen = 2;
      hexVal = this.clearFormat(hexVal);
      hexVal = this.formatValue(hexVal, groupLen);
      
      if (hexVal) {
        this.hexVal = hexVal;
      }
    }
    
    var binVal = this.binVal;
    
    if (binVal) {
      var groupLen = 4;
      binVal = this.clearFormat(binVal);
      binVal = this.formatValue(binVal, groupLen);
      
      if (binVal) {
        this.binVal = binVal;
      }
    }
  }

  unformatInputs() {
    console.log('  unformatInputs()');
    
    var hexVal = this.hexVal;
    
    if (hexVal) {
      hexVal = this.clearFormat(hexVal);
      this.hexVal = hexVal;
    }
    
    var binVal = this.binVal;
    
    if (binVal) {
      binVal = this.clearFormat(binVal);
      this.binVal = binVal;
    }
  }
  
  updateBitMap() {
    console.log('  updateBitMap()');
    
    var binVal = this.clearFormat(this.binVal);
    binVal = this.normalizeValue(binVal, 8);
    var bitLen = binVal.length;
    
    if (bitLen % 8 != 0) return;
    
    this.bytes = [];
    
    var bytesLen = bitLen / 8;
    var closeWord = false;
    var word;
    
    for (var i = 0; i<bytesLen; ++i) {
      var startId = i * 8;
      var endId = startId + 7;
      
      var highBitNum = bitLen - startId - 1;
      var lowBitNum = bitLen - endId - 1;
      var byteId = bytesLen - i;
      
      var bits = '';
      for (var j = 0; j<8; ++j) {
        bits += binVal[startId + j];
      }

      this.bytes.push({
        num: byteId,
        highBit: highBitNum,
        lowBit: lowBitNum,
        bits: bits
      });
    }
  }
  
  bitmapChanged(event) {
    let binVal = '';
    for (let byte of this.bytes) {
      binVal += byte.bits;
    }
    this.binVal = binVal;
    this.binChange();

    this.currentInput && this.currentInput.focus();
  }
  
  
// ---------------------- Utils ----------------------
  normalizeValue(val, groupLen) {
    var lenRest = val.length % groupLen;
    
    if (lenRest != 0) {
      var leadZeroesNum = groupLen - lenRest + 1;
      var leadZeroes = Array(leadZeroesNum).join('0');
      val = leadZeroes + val;
    }
    
    return val;
  }
  
  formatValue(val, groupLen) {
    val = this.normalizeValue(val, groupLen);
    var resVal = ''
    
    if (val.length > 0) {
      for (var id in val) {
        var ch = val[id];
        if (id != '0' && Number(id) % groupLen == 0)
          ch = ' ' + ch;
        resVal += ch;
      }
    }
    
    return resVal;
  }
  
  clearFormat(val) {
    if (!val || val === '0') return val;

    val = val.replace(/ +/g, '');
    val = val.replace(/^0+/g, '');
    
    return val;
  }
  
}
