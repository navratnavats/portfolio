import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# SMTP credentials from .env file
EMAIL_USER = os.getenv("EMAIL_USER")  # Must be "apikey" for SendGrid
EMAIL_PASS = os.getenv("EMAIL_PASS")  # Your SendGrid API Key
SMTP_SERVER = os.getenv("SMTP_SERVER", "smtp.sendgrid.net")
SMTP_PORT = int(os.getenv("SMTP_PORT", 587))
VERIFIED_SENDER = "navratna1719210171@gmail.com"  # Your verified email in SendGrid
ADMIN_EMAIL = "navratna.vats.work@gmail.com"  # Your email where you want to receive messages

@app.route('/send-email', methods=['POST'])
def send_email():
    try:
        # Get form data
        data = request.json
        name = data.get('name')
        user_email = data.get('email')  # User's email
        subject = data.get('subject')
        message = data.get('message')

        if not all([name, user_email, subject, message]):
            return jsonify({"error": "All fields are required"}), 400

        # Create email message
        msg = MIMEMultipart()
        msg['From'] = VERIFIED_SENDER  # ✅ Use your verified sender email
        msg['To'] = ADMIN_EMAIL  # ✅ Your email to receive messages
        msg['Subject'] = f"New Contact Form Submission: {subject}"

        # ✅ Set the "Reply-To" field as the user's email
        msg.add_header('Reply-To', user_email)

        # Email body
        body = f"""
        Name: {name}
        Email: {user_email}
        Subject: {subject}

        Message:
        {message}
        """
        msg.attach(MIMEText(body, 'plain'))

        # Send email
        print("Connecting to SMTP server...")
        server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
        server.starttls()
        server.login(EMAIL_USER, EMAIL_PASS)
        print("Login successful.")

        server.sendmail(VERIFIED_SENDER, ADMIN_EMAIL, msg.as_string())  # ✅ Use verified sender
        server.quit()
        print("Email sent successfully.")

        return jsonify({"message": "Email sent successfully!"}), 200

    except smtplib.SMTPAuthenticationError:
        return jsonify({"error": "Authentication failed. Check API Key."}), 401
    except smtplib.SMTPException as e:
        return jsonify({"error": f"SMTP error: {str(e)}"}), 500
    except Exception as e:
        return jsonify({"error": f"General error: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
