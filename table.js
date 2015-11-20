 $(function() {
     //slider function
    $( "#slider1" ).slider({
      value:0,
      min: -10,
      max: 10,
      step: 1,
      slide: function( event, ui ) {
        $("#multiplierstart").val(ui.value);
      }
    });
    $( "#slider2" ).slider({
      value:0,
      min: -10,
      max: 10,
      step: 1,
      slide: function( event, ui ) {
        $("#multiplierend").val(ui.value);
      }
    });
    $( "#slider3" ).slider({
      value:0,
      min: -10,
      max: 10,
      step: 1,
      slide: function( event, ui ) {
        $("#multiplicandstart").val(ui.value);
      }
    });
    $( "#slider4" ).slider({
      value:0,
      min: -10,
      max: 10,
      step: 1,
      slide: function( event, ui ) {
        $("#multiplicandend").val(ui.value);
      }
    });
    //Event handlers for when input box changes and affects slider values
     $("#multiplierstart").change(function() {
        $( "#slider1" ).slider( "value", $("#multiplierstart").val() );
    });
    $("#multiplierend").change(function() {
        $( "#slider2" ).slider( "value", $("#multiplierend").val() );
    });
    $("#multiplicandstart").change(function() {
        $( "#slider3" ).slider( "value", $("#multiplicandstart").val() );
    });
    $("#multiplicandend").change(function() {
        $( "#slider4" ).slider( "value", $("#multiplicandend").val() );
    });
     //tab vars     
      var tabTitle = $( "#tab_title" ),
      tabContent = $( "#tab_content" ),
      tabTemplate = "<li><a href='#{href}'>#{label}</a> <span class='ui-icon ui-icon-close' role='presentation'>Remove Tab</span></li>",
      tabCounter = 1;
 
      var tabs = $( "#tabs" ).tabs();
    
      function addTab() {
        var label = tabTitle.val() || "Table " + tabCounter,
        id = "tabs-" + tabCounter,
        li = $( tabTemplate.replace( /#\{href\}/g, "#" + id ).replace( /#\{label\}/g, label ) ),
        tabContentHtml = tabContent.val() || "Tab " + tabCounter + " content.";
 
        tabs.find( ".ui-tabs-nav" ).append( li );
        tabs.append( "<div id='" + id + "'><p>" + tabContentHtml + "</p></div>" );
        tabs.tabs( "refresh" );
        tabCounter++;
        createTable(id);
         $("#tabs").tabs("option", "active", tabCounter);
    }
      tabs.delegate( "span.ui-icon-close", "click", function() {
            console.log( $( "#" + panelId ));
            var panelId = $( this ).closest( "li" ).remove().attr( "aria-controls" );
            $( "#" + panelId ).remove();
            tabs.tabs( "refresh" );
            tabCounter--;
    });
     
     // Generates multiplication table
       var createTable = function(tableid){
           //Calculate amount of rows and cols based on user input
           var rows = document.getElementById("multiplierend").value - document.getElementById("multiplierstart").value + 1;
           console.log(rows);
           var cols = document.getElementById("multiplicandend").value - document.getElementById("multiplicandstart").value + 1;
           console.log(cols);
           var strheader = "<table border='1'>\n";
           var strbody = "";
           var curmultiplier = document.getElementById("multiplierstart").value;
           var curmultiplicand = document.getElementById("multiplicandstart").value;
           
           for(var i = 0; i <= rows; i++){
               strbody += "<tr>";
               for(var j = 0; j <= cols; j++){
                   strbody += "<td";
                   //check to see if it should display the multiplicand/multiplier (first row/column will show multiplier/multiplicand not the multiplication results)
                   if((i === 0) || (j ===0)){
                       //top left space needs to be left empty
                       if((i === 0) && (j ===0)){
                           strbody += " class='empty'>";
                       }
                       //show multiplier
                       if((i ===0) && (j !== 0)){
                           strbody += " class='outrow'>" + curmultiplicand + "";
                       }
                       //show multiplicand
                       if((i !== 0) && (j === 0)){
                           strbody += " class='outrow'>" + curmultiplier + "";
                       }
                           
                   }
                   //inside table so regular multiplication
                   else{
                       strbody += ">" + (curmultiplier * curmultiplicand) + "";
                   }
                   strbody += "</td>";
                   //increment multiplicand  if moving across a row on the inside table
                   if (j !== 0){
                       curmultiplicand++;
                   }
               }
               strbody += "</tr>\n";
               //increment multiplier if moving down a column on the inside table
               if (i !== 0){
                   curmultiplier++;
               }
               //reset multiplicand value to starting value each time we move down one row
               curmultiplicand = document.getElementById("multiplicandstart").value;
           }
           var strfooter = "</table>";
           document.getElementById(tableid).innerHTML = strheader + strbody + strfooter;
       };
  
    // Setup form validation on the submit form
    $("#submitform").validate({
    
        // Specify the validation rules
        rules: {
            multiplierstart: {
                required: true,
                number: true
            },
            multiplierend: {
                required: true,
                number: true
            },
            multiplicandstart: {
                required: true,
                number: true
            },
            multiplicandend: {
                required: true,
                number: true
            }
        },
        
        // Specify the validation error messages
        messages: {
            multiplierstart: {
                required: "Please provide a starting multiplier value",
                number: "Please only submit numbers for starting multiplier value"
            },
            multiplierend: {
                required: "Please provide a ending multiplier value",
                number: "Please only submit numbers for ending multiplier value"
            },
            multiplicandstart: {
                required: "Please provide a starting multiplicand value",
                number: "Please only submit numbers for starting multiplicand value"
            },
            multiplicandend: {
                required: "Please provide a ending multiplicand value",
                number: "Please only submit numbers for ending multiplicand value"
            }
        },
        submitHandler: function(form) {
            addTab();
            return false;
        },
        errorElement : 'div',
        errorLabelContainer: '.errorTxt'
        
    });

  });
