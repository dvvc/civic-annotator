from flask import Flask
from pymongo import MongoClient
from datetime import timedelta
from flask import make_response, request, current_app
from functools import update_wrapper

html = """
<html>

  <head>
    <title>MiamiDade county annotations</title>
  </head>

  <body>

    <h1>County annotation tool</h1>

    <a href="javascript:(function(){
             var%20bootstrapScript=document.createElement('script');
             bootstrapScript.type='text/javascript';
             bootstrapScript.src='https://dl.dropboxusercontent.com/u/21478613/bootstrap.js';

                   document.getElementsByTagName('head')[0].appendChild(bootstrapScript);

})();
">CountyAnnotatorV2<a>

    <h1>Live annotations</h1>
"""
htmlend = """
  </body>

</html>

"""

def crossdomain(origin=None, methods=None, headers=None,
                max_age=21600, attach_to_all=True,
                automatic_options=True):
    if methods is not None:
        methods = ', '.join(sorted(x.upper() for x in methods))
    if headers is not None and not isinstance(headers, basestring):
        headers = ', '.join(x.upper() for x in headers)
    if not isinstance(origin, basestring):
        origin = ', '.join(origin)
    if isinstance(max_age, timedelta):
        max_age = max_age.total_seconds()

    def get_methods():
        if methods is not None:
            return methods

        options_resp = current_app.make_default_options_response()
        return options_resp.headers['allow']

    def decorator(f):
        def wrapped_function(*args, **kwargs):
            if automatic_options and request.method == 'OPTIONS':
                resp = current_app.make_default_options_response()
            else:
                resp = make_response(f(*args, **kwargs))
            if not attach_to_all and request.method != 'OPTIONS':
                return resp

            h = resp.headers

            h['Access-Control-Allow-Origin'] = origin
            h['Access-Control-Allow-Methods'] = get_methods()
            h['Access-Control-Max-Age'] = str(max_age)
            if headers is not None:
                h['Access-Control-Allow-Headers'] = headers
            return resp

        f.provide_automatic_options = False
        return update_wrapper(wrapped_function, f)
    return decorator


client = MongoClient()
app = Flask(__name__)


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

if __name__ == "__main__":
    app.run()
