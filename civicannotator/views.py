from flask import request

from civicannotator import app, client
from civicannotator.utils import crossdomain

####

html = """
<html>

  <head>
    <title>MiamiDade civic annotations</title>
  </head>

  <body>

    <h1>Civic annotation tool</h1>

    <a href="javascript:(function(){
             var%20bootstrapScript=document.createElement('script');
             bootstrapScript.type='text/javascript';
             bootstrapScript.src='http://localhost:5000/static/bootstrap.js';

                   document.getElementsByTagName('head')[0].appendChild(bootstrapScript);

})();
">Civic AnnotatorV2<a>

    <h1>Live annotations</h1>
"""
htmlend = """
  </body>

</html>

"""

def format_list(document):

    return """<tr>
    <td>%s</td>
    <td>%s</td>
    <td>%s</td>
    <td>%s</td>
    <td>%s</td>
</tr>""" % (document['user'],
            document['element'],
            document['timestamp'],
            document['url'],
            document['comments'])


####

@app.route("/static/<path:path>")
def test():
    return app.send_static_file(path)

@app.route("/")
def index():
    db = client['cnty-annt-db']
    coll = db.annotation.find()
    lista = "<table>"
    for document in coll:
	lista += format_list(document)
    lista += "</table>"
    return html + lista + htmlend

@app.route('/hello/',  methods=['POST','OPTIONS'])
@crossdomain(origin='*')
def hello():
    db = client['cnty-annt-db']
    fodic = {}
    formdict = request.form
    insertstring = ""
    for key, value in formdict.iteritems():
    	insertstring += key+":"+value+","
        fodic[key]=value
    querystring = insertstring[:len(insertstring)-1]
    print querystring
    result = db.annotation.insert_one(fodic)
    return "tonto"

@app.route('/post/<int:post_id>')
def show_post(post_id):
    # show the post with the given id, the id is an integer
    return 'Post %d' % post_id
