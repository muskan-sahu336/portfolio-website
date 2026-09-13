from flask import Flask, render_template
import mysql.connector
import os

app = Flask(__name__)

db_config = {
    'host': os.environ.get('DB_HOST'),
    'port': int(os.environ.get('DB_PORT', 3306)),
    'user': os.environ.get('DB_USER'),
    'password': os.environ.get('DB_PASSWORD'),
    'database': os.environ.get('DB_NAME'),
    'ssl_ca': os.environ.get('DB_SSL_CA_PATH'),
    'ssl_verify_cert': True
}
@app.route('/')
def home():
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM projects ORDER BY display_order ASC")
    projects = cursor.fetchall()
    cursor.close()
    conn.close()
    return render_template('index.html', projects=projects)

from flask import request, redirect, url_for

@app.route('/contact', methods=['POST'])
def contact():
    first_name = request.form.get('first_name')
    last_name = request.form.get('last_name')
    email = request.form.get('email')
    phone = request.form.get('phone')
    message = request.form.get('message')

    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO contact_messages (first_name, last_name, email, phone, message) VALUES (%s, %s, %s, %s, %s)",
        (first_name, last_name, email, phone, message)
    )
    conn.commit()
    cursor.close()
    conn.close()

    return redirect(url_for('home', sent=1) + '#contact')

if __name__ == '__main__':
    app.run(debug=True)