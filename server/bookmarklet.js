(function() {

  var selectedElement = "Some text";


  var cannSubmit = function() {

    var annotationData = {
      name: "test",
      element: selectedElement,
    };

    $.ajax({
      url: "http://localhost:5000/hello",
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

  };

  var cannAnnotateHandler = function(e) {

    var target = $(e.target);
    target.addClass('cann-highlight');
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
    var submitBtn = $("<a href='javascript:cannSubmit()'>Submit</a>");

    menu.append(annotateBtn);
    menu.append(submitBtn);

    $('body').append(menu);


  };


  showMenu();

  window.cannAnnotate = cannAnnotate;

})();
