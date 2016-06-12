(function() {
  "use strict";

  var selectedElements = [];
  var cannSubmitShow = function() {

    $("#cann-submit-dialog").show();
  }

  /**
   * Once an element has been selected and the user has entered some comments,
   * submit all data to the server
   */
  var cannSubmit = function() {

    var element, elementType, elementId, elementClass;

    // First, hide all overlay
    hideOverlay();

    // TODO: If there are no selected elements, we could either:
    //   - Abort (don't let the user submit)
    //   - Assume this is a general comment (attach to body element?)

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

  /**
   * This handler is called when the user clicks on an html element while we are in annotation
   * mode. It records the element, highlights it, and removes itself as a click handler
   */
  var cannAnnotateHandler = function(e) {

    var target = $(e.target);
    target.addClass('cann-highlight');
    selectedElements.push(target);
    this.removeEventListener('click', cannAnnotateHandler);

    $('#cann-submit-pane').animate({width: "toggle"});

    $('body').removeClass('cann-cursor-selection');

  };

  /**
   * Start annotating / enter annotation mode
   */
  var cannAnnotate = function() {

    // switch the mouse pointer
    $('body').addClass('cann-cursor-selection');

    // register an event listener to send the feedback
    document.addEventListener('click', cannAnnotateHandler);
  };

  /**
   * Creates all the HTML elements needed for the overlay, and hides them. This function should
   * only be called once.
   */
  var createOverlay = function() {

    console.log("Creating overlay");

    /*** TOP MENU ***/
    var menu = $("<div id='cann-menu'></div>");
    var annotateBtn = $("<div id='cann-annotate-btn'></div>");
    var annotateDesc = $("<div id='cann-annotate-desc'>Select an area to submit your comment, or ESC to abort.</div>");
    //var submitBtn = $("<a href='javascript:cannSubmitShow()' id='cann-submit-btn' title='Submit'></a>");

    menu.append(annotateBtn);
    menu.append(annotateDesc);
    //menu.append(submitBtn);

    menu.hide();
    $('body').append(menu);


    /*** RIGHT SUBMISSION PANE ***/
    // Submission pane
    var submissionPane = $("<div id='cann-submit-pane'></div>");
    submissionPane.append($("<div>Please enter your comments</div>"));
    submissionPane.append($("<div></div>").append("<textarea id='cann-comments'></textarea>"));

    var submitButton = $("<button id='cann-submit-button'>Submit</button>");
    submitButton.click(cannSubmit);

    submissionPane.append(submitButton);

    submissionPane.hide();
    $('body').append(submissionPane);

  };

  /**
   * Activate the overlay menu and enter annotation mode.
   */
  var cannActivate = function() {
    console.log("Activating");
    $('#cann-menu').slideDown();
    cannAnnotate();
  };

  var hideOverlay = function() {
    $('#cann-submit-pane').animate({width: 'toggle'});
    $('#cann-menu').slideUp();
  };


  // createOverlay is *always* called when the script is first loaded. It creates all the HTML elements
  // to be shown later when cannActivate is called.
  createOverlay();

  // On the first load, we also activate the overlay. On subsequent loads, the bookmarklet code will
  // directly call this function without re-creating the overlay
  cannActivate();

  // Make these functions visible so that they can be called when buttons are clicked
  window.cannAnnotate = cannAnnotate;
  window.cannSubmit = cannSubmit;
  window.cannSubmitShow = cannSubmitShow;

  // This is the main variable that tells the bookmarklet code whether it should load/inject all the
  // necessary scripts. By defining it here, we are acknowledging all the necessary code is already
  // loaded.
  window.cannActivate = cannActivate;

})();
