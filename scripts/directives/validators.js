
'use strict';

var DECIMAL_VALUE_RX = /^\-?\d+$/;
var HEXADECIMAL_VALUE_RX = /^[0-9a-fA-F ]+$/;
var BINARY_VALUE_RX = /^[01 ]+$/;

var app = angular.module('NumberConverter');

app.directive('decimalValue', function() {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
      ctrl.$validators.decimalValue = function(modelValue, viewValue) {
        if (ctrl.$isEmpty(modelValue)) {
          return true;
        }

        if (DECIMAL_VALUE_RX.test(viewValue)) {
          return true;
        }

        return false;
      };
    }
  };
});


app.directive('hexadecimalValue', function() {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
      ctrl.$validators.hexadecimalValue = function(modelValue, viewValue) {
        if (ctrl.$isEmpty(modelValue)) {
          return true;
        }

        if (HEXADECIMAL_VALUE_RX.test(viewValue)) {
          return true;
        }

        return false;
      };
    }
  };
});

app.directive('binaryValue', function() {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
      ctrl.$validators.binaryValue = function(modelValue, viewValue) {
        if (ctrl.$isEmpty(modelValue)) {
          return true;
        }

        if (BINARY_VALUE_RX.test(viewValue)) {
          return true;
        }

        return false;
      };
    }
  };
});
