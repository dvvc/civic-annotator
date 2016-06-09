(function() {

  // Use timestamps to avoid caching. This can be improved to force cache
  // updates when the files are changed

  var timestamp = new Date().getTime();

  var CANN_STYLE = "http://localhost:5000/static/bookmarklet_style.css" + "?ts=" + timestamp;
  var CANN_SCRIPT = "http://localhost:5000/static/bookmarklet.js" + "?ts=" + timestamp;

  // load all dependencies to the web page. After all of them finish loaded,
  // execute our annotation tool

  // Taken from http://stackoverflow.com/questions/756382/bookmarklet-wait-until-javascript-is-loaded

  function loadScript(url, callback)
  {
	  var head = document.getElementsByTagName("head")[0];
	  var script = document.createElement("script");
	  script.src = url;

    // Attach handlers for all browsers
	  var done = false;
	  script.onload = script.onreadystatechange = function()
	  {
		  if( !done && ( !this.readyState
					           || this.readyState == "loaded"
					           || this.readyState == "complete") )
		  {
			  done = true;

			  // Continue your code
			  callback();

			  // Handle memory leak in IE
			  //script.onload = script.onreadystatechange = null;
			  //head.removeChild( script );
		  }
	  };

	  head.appendChild(script);
  }

 function loadStylesheet(url, callback)
  {
	  var head = document.getElementsByTagName("head")[0];
	  var link = document.createElement("link");
    link.rel = "stylesheet";
	  link.href = url;

    // Attach handlers for all browsers
	  var done = false;
	  link.onload = link.onreadystatechange = function()
	  {
		  if( !done && ( !this.readyState
					           || this.readyState == "loaded"
					           || this.readyState == "complete") )
		  {
			  done = true;

			  // Continue your code
			  callback();

			  // Handle memory leak in IE
			  //link.onload = link.onreadystatechange = null;
			  //head.removeChild( link );
		  }
	  };

	  head.appendChild(link);
  }


  // If I just knew promises!
  loadScript("http://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.min.js", function() {
    loadStylesheet("http://assets.annotateit.org/annotator/v1.2.5/annotator.min.css", function() {
      loadScript("http://assets.annotateit.org/annotator/v1.2.5/annotator-full.min.js", function() {
        loadStylesheet(CANN_STYLE, function() {
          loadScript(CANN_SCRIPT, function() {
            // Phew!
          });
        });
      });
    });
  });


})();
