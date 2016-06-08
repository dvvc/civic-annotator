(function() {

  var selectedElements = [];


  var cannSubmitShow = function() {

    console.log("show!");
    $("#cann-submit-dialog").show();
  }

  var cannSubmit = function() {

    console.log("SUBMIT");

    var elementsStr = "";

    if (selectedElements.length > 0) {
      var element = selectedElements[0];
      var elementType  = element.get(0).tagName;
      var elementId = element.prop('id');
      var elementClass = element.attr('class');

      console.log(element);
      console.log(element.get(0).id);
      console.log(element.id);
      console.log(element.attr('id'));

      elementStr = "<" + elementType + " id=" + elementId + " class=" + elementClass + " >";
    }



    var annotationData = {
      name: "test",
      element: elementStr,
      timestamp: new Date(),
      user: "Anonymous User",
      url: window.location.toString(),
      comments: $("#cann-comments").val(),
    };

    $.ajax({
      url: "http://localhost:5000/hello/",
      type: "POST",
      data: annotationData,
      success: function(data, status, jqXHR) {
        console.log("SUCCESS");
        console.log(data);
        console.log(status);
        console.log(jqXHR);
      },
      error: function(jqXHR, status, error) {
        console.log("ERROR");
        console.log(jqXHR);
        console.log(status);
        console.log(error);
      }
    });

    var i;
    for(i = 0; i < selectedElements.length; i++) {
      selectedElements[i].removeClass('cann-highlight');
    }

    $("#cann-submit-dialog").hide();
    selectedElements = [];

  };

  var cannAnnotateHandler = function(e) {

    var target = $(e.target);
    target.addClass('cann-highlight');
    selectedElements.push(target);
    this.removeEventListener('click', cannAnnotateHandler);

  };

  var cannAnnotate = function() {

    // switch the mouse pointer


    // register an event listener to send the feedback
    document.addEventListener('click', cannAnnotateHandler);

  };

  var showMenu = function() {

    var menu = $("<div id='cann-menu'></div>");
    var annotateBtn = $("<a href='javascript:cannAnnotate()'>Annotate</a>");
    var submitBtn = $("<a href='javascript:cannSubmitShow()'>Submit</a>");

    menu.append(annotateBtn);
    menu.append($("<span>&nbsp;</span>"));
    menu.append($("<span>&nbsp;</span>"));
    menu.append(submitBtn);

    $('body').append(menu);

    // Submission dialog
    var submitDialog = $("<div id='cann-submit-dialog'>Please enter your comments</div>");
    submitDialog.append($("<textarea id='cann-comments' rows='14' cols='40'></textarea>"));

    var submitButton = $("<button id='cann-submit-button'>Submit</button>");
    submitButton.click(cannSubmit);

    submitDialog.append(submitButton);


    $('body').append(submitDialog);

  };


  showMenu();

  window.cannAnnotate = cannAnnotate;
  window.cannSubmit = cannSubmit;
  window.cannSubmitShow = cannSubmitShow;

})();
