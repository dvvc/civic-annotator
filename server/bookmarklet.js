(function() {


  var cannSubmit = function() {

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
    $('body').append(menu);


  };


  showMenu();

  window.cannAnnotate = cannAnnotate;

})();
