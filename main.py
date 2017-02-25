"""`main` is the top level module for your Flask application."""
# Import the Flask Framework
from flask import Flask
from flask import request, jsonify

from googleapiclient.discovery import build

app = Flask(__name__)
# Note: We don't need to call run() since our application is embedded within
# the App Engine WSGI application server.


@app.route('/')
def hello():
    """Return a friendly HTTP greeting."""
    return app.send_static_file('index.html')

def _analyze(text, type='analyzeSentiment'):
    body = {
        'document': {
            'type': 'PLAIN_TEXT',
            'content': text,
        },
        'encoding_type': 'UTF32'
    }

    service = build('language', 'v1')

    meth = getattr(service.documents(), type)
    request = meth(body=body)
    response = request.execute()

    return response


@app.route('/analyze', methods=['POST'])
def analyzer():
    q = request.get_json()
    t = q['text']

    return jsonify(_analyze(t))


@app.errorhandler(404)
def page_not_found(e):
    """Return a custom 404 error."""
    return 'Sorry, Nothing at this URL.', 404


@app.errorhandler(500)
def application_error(e):
    """Return a custom 500 error."""
    return 'Sorry, unexpected error: {}'.format(e), 500
