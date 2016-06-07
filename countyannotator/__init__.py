from flask import Flask
from pymongo import MongoClient

client = MongoClient()
app = Flask(__name__)

import countyannotator.views
