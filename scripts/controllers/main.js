'use strict';

angular.module('NumberConverter').controller('MainCtrl', function($scope) {
  
  var hintNumbers = [];
  for(var i = 0; i<16; i++){
    var hintNum = {
      decVal: i.toString(),
      hexVal: i.toString(16).toUpperCase(),
      binVal: normalizeBin(i.toString(2), 4)
    };
    
    hintNumbers.push(hintNum);
  }
  
  $scope.hintNumbers = hintNumbers;
  
  
  var powerHintNumbers = [];
  for(var i = 0; i<16; i++){
    var powerExpr = '2<sup>' + i.toString() + '</sup>';
    var powerVal = Math.pow(2, i);
    var powerHexVal = powerVal.toString(16).toUpperCase();
    var powerBinVal = formatBin(powerVal.toString(2), 4);
    
    var hintNum = {
      powerExpr: powerExpr,
      powerVal: powerVal,
      powerHexVal: powerHexVal,
      powerBinVal: powerBinVal
    };
    
    powerHintNumbers.push(hintNum);
  }
  
  $scope.powerHintNumbers = powerHintNumbers;
  
  
  // ===== Decimal =====
  
  $scope.decChange = function(){
    console.log('decChange()');
    
    decCalc();
    reformatInputs();
    updateBitMap();
  }
  
  $scope.decKey = function($event){
    var key = $event.originalEvent.keyCode;
    
    if(key == 38 || key == 40){
      console.log('decKey()');
      
      var decVal = parseInt($scope.decVal);
      if(!decVal) decVal = 0;
      var newVal = decVal;
      
      if(key == 38){
        newVal = decVal + 1;
      }
      else if(key == 40){
        newVal = decVal - 1;
      }
      
      $scope.decVal = newVal;
      $scope.decChange();
    }
  }
  
  
  // ===== Hexadecimal =====
  
  $scope.hexChange = function(){
    console.log('hexChange()');
    
    hexCalc();
    reformatInputs();
  }
  
  $scope.hexKey = function($event){
    var key = $event.originalEvent.keyCode;
    
    if(key == 38 || key == 40){
      console.log('hexKey()');
      
      var hexVal = clearFormat($scope.hexVal);
      hexVal = parseInt(hexVal, 16);
      
      if(!hexVal) hexVal = 0;
      var newVal = hexVal;
      
      if(key == 38){
        newVal = hexVal + 1;
      }
      else if(key == 40){
        newVal = hexVal - 1;
      }
      
      $scope.hexVal = newVal.toString(16);
      $scope.hexChange();
    }
  }
  
  
  // ===== Binary =====
  
  $scope.binChange = function(){
    console.log('binChange()');
    
    binCalc();
    reformatInputs();
  }
  
  $scope.binKey = function($event){
    var key = $event.originalEvent.keyCode;
    
    if(key == 38 || key == 40){
      console.log('binKey()');
      
      var binVal = clearFormat($scope.binVal);
      binVal = parseInt(binVal, 2);
      
      if(!binVal) binVal = 0;
      var newVal = binVal;
      
      if(key == 38){
        newVal = binVal + 1;
      }
      else if(key == 40){
        newVal = binVal - 1;
      }
      
      $scope.binVal = newVal.toString(2);
      $scope.binChange();
    }
  }
  
  
  // ####### Handlers #######
  
  $scope.formatChange = function(){
    console.log('formatChange()');
    
    var format = $scope.format;
    if(format){
      formatInputs();
    }
    else{
      unformatInputs();
    }
    
    currentInput.focus();
  }
  
  $scope.fullScreenChange = function(){
    console.log('fullScreenChange()');
    
    var fullScreen = $scope.fullScreen;
    setFullScreen(fullScreen);
    
    currentInput.focus();
  }
  
  $scope.clearInputs = function(){
    console.log('clearInputs()');
    
    $scope.decVal = '';
    $scope.hexVal = '';
    $scope.binVal = '';
  }

  $scope.updateBits = function(){
    console.log('updateBits()');
  }
  
  $scope.fillPower = function($index){
    console.log('fillPower(' + $index + ')');
    $scope.decVal = $(".power-val-col")[$index].innerText;
    $scope.decChange();
  }

  $scope.testClick = function(){
    console.log('testClick()');
    $scope.decVal = '123';
  }


// ---------------------- Service ----------------------
  
  function decCalc(){
    console.log('  decCalc()');
    
    var decVal = parseInt($scope.decVal);
    
    if(decVal || decVal === 0){
      var hexVal = decVal.toString(16);
      hexVal = hexVal.toUpperCase();
      $scope.hexVal = hexVal;
      
      var binVal = decVal.toString(2);
      $scope.binVal = binVal;
    }
    else{
      $scope.hexVal = '';
      $scope.binVal = '';
    }
  }
  
  function hexCalc(){
    console.log('  hexCalc()');
    
    $scope.hexVal = $scope.hexVal.toUpperCase();
    var hexVal = clearFormat($scope.hexVal);
    hexVal = parseInt(hexVal, 16);
    
    if(hexVal || hexVal === 0){
      var decVal = hexVal.toString(10);
      $scope.decVal = decVal;
      
      var binVal = hexVal.toString(2);
      $scope.binVal = binVal;
    }
    else{
      $scope.decVal = '';
      $scope.binVal = '';
    }
  }
  
  function binCalc(){
    console.log('  binCalc()');
    
    var binVal = clearFormat($scope.binVal);
    binVal = parseInt(binVal, 2);
    
    if(binVal || binVal === 0){
      var decVal = binVal.toString(10);
      $scope.decVal = decVal;
      
      var hexVal = binVal.toString(16);
      hexVal = hexVal.toUpperCase();
      $scope.hexVal = hexVal;
    }
    else{
      $scope.decVal = '';
      $scope.hexVal = '';
    }
  }
  
  
  // ===== Formatting =====
  
  function clearFormat(val){
    if(!val || val === '0') return val;

    val = val.replace(/ +/g, '');
    val = val.replace(/^0+/g, '');
    
    return val;
  }
  
  function normalizeBin(val, groupLen){
    var lenRest = val.length % groupLen;
    
    if(lenRest != 0){
      var leadZeroesNum = groupLen - lenRest + 1;
      var leadZeroes = Array(leadZeroesNum).join('0');
      val = leadZeroes + val;
    }
    
    return val;
  }
  
  function formatBin(val, groupLen){
    val = normalizeBin(val, groupLen);
    var resBinVal = ''
    
    if(val.length > 0){
      for(var id in val){
        var ch = val[id];
        if(id != 0 && id % groupLen == 0)
          ch = ' ' + ch;
        resBinVal += ch;
      }
    }
    
    return resBinVal;
  }
  
  function reformatInputs(){
    if($scope.format){
      formatInputs();
    }
    else{
      unformatInputs();
    }
  }
  
  function formatInputs(){
    console.log('  formatInputs()');
    
    var hexVal = $scope.hexVal;
    
    if(hexVal){
      var groupLen = 2;
      hexVal = clearFormat(hexVal);
      
      if(hexVal.length % groupLen != 0){
        hexVal = '0' + hexVal;
      }
      
      var resHexVal = '';
      
      if(hexVal.length > 0){
        for(var id in hexVal){
          var ch = hexVal[id];
          if(id != 0 && id % groupLen == 0)
            ch = ' ' + ch;
          resHexVal += ch;
        }
      }
      
      if(resHexVal){
        $scope.hexVal = resHexVal;
      }
    }
    
    var binVal = $scope.binVal;
    
    if(binVal){
      var groupLen = 4;
      binVal = clearFormat(binVal);
      
      var lenRest = binVal.length % groupLen;
      
      if(lenRest != 0){
        var leadZeroesNum = groupLen - lenRest + 1;
        var leadZeroes = Array(leadZeroesNum).join('0');
        binVal = leadZeroes + binVal;
      }
      
      var resBinVal = '';
      
      if(binVal.length > 0){
        for(var id in binVal){
          var ch = binVal[id];
          if(id != 0 && id % groupLen == 0)
            ch = ' ' + ch;
          resBinVal += ch;
        }
      }
      
      if(resBinVal){
        $scope.binVal = resBinVal;
      }
    }
  }

  function unformatInputs(){
    console.log('  unformatInputs()');
    
    var hexVal = $scope.hexVal;
    
    if(hexVal){
      hexVal = clearFormat(hexVal);
      $scope.hexVal = hexVal;
    }
    
    var binVal = $scope.binVal;
    
    if(binVal){
      binVal = clearFormat(binVal);
      $scope.binVal = binVal;
    }
  }
  
  function updateBitMap(){
    console.log('  updateBitMap()');
    
    var binVal = clearFormat($scope.binVal);
    binVal = normalizeBin(binVal, 8);
    var bitLen = binVal.length;
    
    // console.log('-- binVal: ' + binVal + ' (' + bitLen + ')');
    if(bitLen % 8 != 0) return;
    
    var bytes = $("#bytes");
    bytes.empty();
    
    var bytesLen = bitLen / 8;
    var closeWord = false;
    var word;
    
    for(var i=0; i<bytesLen; ++i){
      var startId = i * 8;
      var endId = startId + 7;
      
      var highBitNum = bitLen - startId - 1;
      var lowBitNum = bitLen - endId - 1;
      var byteId = bytesLen - i;
      
      var byteWrap = $("<div>").addClass("byte-wrap");
      var byteInfo = $("<div>").addClass("byte-info");
      var byte = $("<div>").addClass("byte");
      
      var highHalfByte = $("<div>").addClass("high-half-byte");
      var lowHalfByte = $("<div>").addClass("low-half-byte");
      
      var byteHighBitNum = $("<div>").addClass("high-bit-num").text(highBitNum);
      var byteLowBitNum = $("<div>").addClass("low-bit-num").text(lowBitNum);
      var byteNumText = $("<div>").addClass("byte-num").text('byte ' + byteId);
      
      byteInfo.append(byteHighBitNum);
      byteInfo.append(byteNumText);
      byteInfo.append(byteLowBitNum);
      
      
      for(var j=0; j<8; ++j){
        var bitVal = binVal[startId + j];

        var bit = $("<span>");
        bit.addClass("bit unselectable");
        bit.text(bitVal);
        bit.click(function(){updateBits(this);});
        
        if(j < 4)
          highHalfByte.append(bit);
        else
          lowHalfByte.append(bit);
      }
      
      byte.append(highHalfByte);
      byte.append(lowHalfByte);
      
      byteWrap.append(byteInfo);
      byteWrap.append(byte);
      // bytes.append(byteWrap);        // to disable bytes grouping in words uncomment the line and comment the block below
      
      if(!closeWord){
        word = $("<div>").addClass("word");
        if(gFullScreen){
          word.css('display', 'inline-block');
        }
        
        byte.addClass("high-byte");
        word.append(byteWrap);
        
        closeWord = true;
      }
      else{
        byte.addClass("low-byte");
        word.append(byteWrap);
        bytes.append(word);
        
        closeWord = false;
      }
      
      if(closeWord && i == bytesLen-1){
        bytes.append(word);
      }
    }
  }

});
