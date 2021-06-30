from flask import Blueprint
from flask_restful import Api

from app.api.resources import Start, Stop

api_blueprint = Blueprint('api', __name__)
api = Api(api_blueprint)

# ======== Routes
api.add_resource(Start, '/<string:partner>/start')
api.add_resource(Stop, '/<string:partner>/stop')
# ========
