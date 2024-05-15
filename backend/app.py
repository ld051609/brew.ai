from flask import Flask, request, jsonify, session, redirect
from flask_cors import CORS
from flask_session import Session
from redis import Redis
from flask_sqlalchemy import SQLAlchemy
from predict import predict_coffee
from datetime import timedelta
app = Flask(__name__)
CORS(app)
app.secret_key = 'super secret key'


# # Configure SQLAlchemy
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite3'
# db = SQLAlchemy(app)

# # Configure Flask-Session to use SQLAlchemy
# app.config['SESSION_TYPE'] = 'sqlalchemy'
# app.config['SESSION_SQLALCHEMY'] = db
# sess = Session(app)

# # Define SQLAlchemy model for session
# class MySession(db.Model):
#     __tablename__ = 'sessions'
#     sid = db.Column(db.String(255), primary_key=True)
#     data = db.Column(db.PickleType)
#     expiry = db.Column(db.DateTime)

# # Create all tables (including the session table)
# with app.app_context():
#     db.create_all()

app.config['SESSION_TYPE'] = 'filesystem'
app.config["SESSION_PERMANENT"] = False
Session(app)

@app.route('/coffeeList', methods=['POST', 'GET'])
def get_form_value():
    if request.method == 'POST':
        flavors = request.form.getlist('flavor')
        grinds = request.form.getlist('grind')
        roastLevel = int(request.form['roastLevel'])
        coffeeTypes = predict_coffee(roastLevel, flavors, grinds)
        return jsonify({'coffeeTypes': coffeeTypes})

    elif request.method == 'GET':

        
        print(f'{session.get('flavors')} {session.get('grinds')} {session.get('roastLevel')}')
        
        return {'success': 'Response is OK'}, 200

    else:
        return {'error': 'Invalid file format'}, 400


if __name__ == '__main__':
    app.run(debug=True)
