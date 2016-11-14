
var currentInput;
var appContainerWidth;
var gFullScreen = false;


$(function(){
  
  $(window).resize(function(){
    calcSidebarDistance();
  });
  
  appContainerWidth = $(".app-container").width();
  currentInput = $("#decInput");
  
  calcSidebarDistance();
  
  $("#decInput").focus(function(){
    currentInput = $(this);
  });
  $("#hexInput").focus(function(){
    currentInput = $(this);
  });
  $("#binInput").focus(function(){
    currentInput = $(this);
  });
  
  $("#decCopy").click(function(){
    var val = $("#decInput").val();
    if(val){
      clipboard.copy(val);
    }
  });
  
  $("#hexCopy").click(function(){
    var val = $("#hexInput").val();
    if(val){
      clipboard.copy(val);
    }
  });
  
  $("#binCopy").click(function(){
    var val = $("#binInput").val();
    if(val){
      clipboard.copy(val);
    }
  });
  
  $("#buttonClear").click(function(){
    $("#decInput").val('');
    $("#hexInput").val('');
    $("#binInput").val('');
    
    $("#decInput").focus();
  });
  
  $("#buttonCopyAll").click(function(){
    var val = '';
    
    val += $("#decInput").val() + '\n';
    val += $("#hexInput").val() + '\n';
    val += $("#binInput").val();
    
    if(val.trim()){
      clipboard.copy(val);
    }
    
    $("#decInput").focus();
  });
  
});


function updateBits(bitEl){
  console.log('Global :: updateBits()');
  
  var currentBit = bitEl.innerText;
  if(currentBit == '0')
    currentBit = '1';
  else
    currentBit = '0';
  bitEl.innerText = currentBit;
  
  var binVal = '';
  var bits = $(".bit");
  bits.each(function(id, el){
    binVal += el.innerText;
  });
  
  $("#binInput").val(binVal);
  $("#binInput").change();
}

function setFullScreen(fullScreen) {
  gFullScreen = fullScreen;
  
  if(fullScreen){
    // appContainerWidth = $(".app-container").width();
    
    $(".left-side").hide();
    $(".right-side").hide();
    
    $(".app-container").css('width', '90%');
    $("#bytes .word").css('display', 'inline-block');
    
    var valWidth =  $(".val-form").width() - $(".val-form .btn-copy").outerWidth(true) - $(".val-form .control-label").outerWidth(true);
    $(".val-form .val-control").css({
      'width': valWidth
    });
  }
  else{
    var winWidth = $(window).width();
    if(winWidth > 992){
      $(".left-side").show();
    }
    if(winWidth > 1300){
      $(".right-side").show();
    }
    
    // $(".app-container").css('width', appContainerWidth);
    $(".app-container").css('width', '');
    $("#bytes .word").css('display', '');
    
    $(".val-form .val-control").css({
      'width': ''
    });
  }
}

function calcSidebarDistance() {
  var sideDist = 80;
  var leftVal = $(".app-container").offset().left - $(".left-side").width() - sideDist;
  $(".left-side").css('left', leftVal);
  
  leftVal = $(".app-container").offset().left + $(".app-container").width() + sideDist;
  $(".right-side").css('left', leftVal);
}


function clearFormat(val){
  if(!val || val === '0') return val;

  val = val.replace(/ +/g, '');
  val = val.replace(/^0+/g, '');
  
  return val;
}

function normalizeValue(val, groupLen){
  var lenRest = val.length % groupLen;
  
  if(lenRest != 0){
    var leadZeroesNum = groupLen - lenRest + 1;
    var leadZeroes = Array(leadZeroesNum).join('0');
    val = leadZeroes + val;
  }
  
  return val;
}

function formatValue(val, groupLen){
  val = normalizeValue(val, groupLen);
  var resVal = ''
  
  if(val.length > 0){
    for(var id in val){
      var ch = val[id];
      if(id != 0 && id % groupLen == 0)
        ch = ' ' + ch;
      resVal += ch;
    }
  }
  
  return resVal;
}
