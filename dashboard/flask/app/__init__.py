from flask import Flask

from app.website import website_blueprint
from app.api import api_blueprint

app = Flask(__name__, subdomain_matching=True)
# app.config['SERVER_NAME'] = 'localhost:5000'  # For local development
app.config['SERVER_NAME'] = 'ddosclearinghouse.eu'

app.register_blueprint(website_blueprint, subdomain='www')
app.register_blueprint(api_blueprint, subdomain='api')
