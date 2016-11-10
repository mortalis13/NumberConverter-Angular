'use strict';

angular.module('NumberConverter').controller('MainCtrl', function($scope) {
  
  // ===== Decimal =====
  
  $scope.decChange = function(){
    console.log('decChange()');
    
    decCalc();
    reformatInputs();
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


// ----------------- Service -----------------
  
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
  
  function reformatInputs(){
    if($scope.format){
      formatInputs();
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

});
