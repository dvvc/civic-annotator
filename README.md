# County Annotator

## What
A bookmarklet and a web application to help annotate county websites with user feedback. It provides a visual interface for web admins to review and prioritize these comments.

#### Status
This is a very early prototype. There are many issues that need to be addressed.

#### Screenshots
*TO-DO*

## Why
The Miami-Dade county and the city of Miami are going through great efforts to improve the usability of their web pages. However, they lack tools to gather feedback that can help prioritize what needs to be addressed. Having a direct channel where non-technical users can propose changes and point to errors would speed the process.

## Who
This project was developed during the National Day of Civic Hacking 2016 by
* [David Villegas](https://twitter.com/dvvc)
* [Jose Hurtado](https://twitter.com/inkatown)
* Richard Olivieri

## How
#### Dependencies
The project is developed as a Flask app (tested with Python 2.7). The webapp hosts a bookmarklet and a basic front/back-end. Python requirements are listed in requirements.txt

The bookmarklet code is tested in Firefox 46.

#### Install
```shell
$ pip -r requirements.txt
```

#### Deploy
*TO-DO*

#### Usage
Run the `start_server.sh` script to start the Flask embedded server, then go to *http://localhost:5000* in a browser and drag and drop the bookmarklet to your browser's Bookmarks Toolbar.

Then open *http://localhost:5000/test.html* and click on the bookmarklet. The mouse will change shape, and you can select an HTML element to annotate. Once it's been selected, click submit on the annotation menu and fill in some text.

After submitting the comment, go back to *http://localhost:5000*, there should be a new entry with your annotation.

## License
Licensed through Code for America [LICENSE.md file](https://github.com/chimecms/chime/blob/master/LICENCE.md).
