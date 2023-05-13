import os
import pathlib
import time
import requests
from pip._vendor import cachecontrol

#FLASK IMPORTS
from flask import Flask, render_template, redirect, url_for, request, flash, Response, session, abort
from datetime import datetime

# FLASK_LOGIN
from werkzeug.security import generate_password_hash, check_password_hash

# INIT THE APP
app=Flask(__name__)


# SECRETE KEY
app.secret_key = "$0M3_R@ND0M_K3Y"
os.environ['OAUTHLIB_INSECURE_TRANSPORT'] = "1"

#################
# CONFIG SETUP #

###       HOME PAGE         ###
@app.route('/', methods=["GET", "POST"])
def index():

        # DECLARE ALL VARIABLES (FLASK_PAIN)
    try:
        user_name       = ""
        date_selected   = ""
    except:
        print("VARIABLE_ERROR??: index('/')")
    if request.method == 'POST':
        try:
            # Add 'submit' type in the form <button>
            if request.form['submit'] == 'test-dynamic-calendar':
                try:
                    # USER NAME 
                    user_name       = request.form['user-name']

                    # CALENDAR SELECTED DATE
                    date_selected   =  request.form['calendar']

                    print("[UserName]: ", str(user_name))
                    print("[DateSelected]: ", str(date_selected))

                except Exception as e:
                    print("[ERROR]:[GETTING_CLIENT_DATA]", str(e))
        except Exception as e:
            print("[ERROR]:[BOOKING_EMAIL]", str(e))

    try:
        # Example of 'Fully-Booked-Dates' -> DisabledDates
        booked_dates = ['2023-05-07', '2023-05-17', '2023-05-27', '2023-06-22']
        return render_template('index.html', full_dates=booked_dates)
    except Exception as e:
        print("[ERROR]:[DATA_BASE]:[HOME]:",str(e))
        return render_template('index.html', full_dates=booked_dates)
    return render_template('index.html')