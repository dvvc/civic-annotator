(function() {

  var selectedElements = [];


  var cannSubmitShow = function() {

    console.log("show!");
    $("#cann-submit-dialog").show();
  }

  var cannSubmit = function() {

    var element, elementType, elementId, elementClass;

    if (selectedElements.length > 0) {
      element = selectedElements[0];
      elementType  = element.get(0).tagName;
      elementId = element.prop('id');
      elementClass = element.attr('class');
    }

    var annotationData = {
      name: "test",
      element_type: elementType,
      element_id: elementId,
      element_class: elementClass,
      timestamp: parseInt(new Date().getTime() / 1000),
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

    $('body').removeClass('cann-cursor-selection');

  };

  var cannAnnotate = function() {

    // switch the mouse pointer
    $('body').addClass('cann-cursor-selection');

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
