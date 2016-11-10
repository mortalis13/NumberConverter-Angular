
var currentInput;

$(function(){
  
  currentInput = $("#decInput");
  
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
