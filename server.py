from flask import Flask
from pymongo import MongoClient
client = MongoClient()
app = Flask(__name__)

@app.route("/")
def index():
    db = client['cnty-annt-db']
    coll = db.annotation.find()
    for document in coll:
	print(document)
    return "mierda"

@app.route('/hello/',  methods=['POST'])
def hello():
    formdict = request.form
    for key, value in formdict.iteritems():
    	print key
	print value
    return formdict

@app.route('/post/<int:post_id>')
def show_post(post_id):
    # show the post with the given id, the id is an integer
    return 'Post %d' % post_id

if __name__ == "__main__":
    app.run()
