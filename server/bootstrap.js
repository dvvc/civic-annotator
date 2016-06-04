(function() {

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
        loadStylesheet("bookmarklet_style.css", function() {
          loadScript("bookmarklet.js", function() {
            // Phew!
          });
        });
      });
    });
  });


})();

/*
  var%20jqueryScript=document.createElement('script');
  jqueryScript.type='text/javascript';
  jqueryScript.src='http://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.min.js';


  var%20jqueryScript=document.createElement('script');
  jqueryScript.type='text/javascript';
  jqueryScript.src='http://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.min.js';
	var%20annotatorScript=document.createElement('script');
	annotatorScript.type='text/javascript';
	annotatorScript.src='bookmarklet.js';
  var%20countyAnnotatorScript=document.createElement('script');
  countyAnnotatorScript.type='text/javascript';
  countyAnnotatorScript.src='http://assets.annotateit.org/annotator/v1.2.5/annotator-full.min.js';
  var%20annotatorStyle=document.createElement('link');
  annotatorStyle.rel='stylesheet';
  annotatorStyle.href='http://assets.annotateit.org/annotator/v1.2.5/annotator.min.css';
  var%20countyAnnotatorStyle=document.createElement('link');
  countyAnnotatorStyle.rel='stylesheet';
  countyAnnotatorStyle.href='bookmarklet_style.css';

	document.getElementsByTagName('head')[0].appendChild(jqueryScript);
	document.getElementsByTagName('head')[0].appendChild(annotatorScript);
	document.getElementsByTagName('head')[0].appendChild(annotatorStyle);
	document.getElementsByTagName('head')[0].appendChild(countyAnnotatorStyle);
	document.getElementsByTagName('head')[0].appendChild(countyAnnotatorScript);
*/
