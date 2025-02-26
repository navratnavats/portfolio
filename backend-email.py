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

# ✅ Use environment variables
EMAIL_USER = os.getenv("EMAIL_USER")  # Must be "apikey" for SendGrid
EMAIL_PASS = os.getenv("EMAIL_PASS")  # Your SendGrid API Key
SMTP_SERVER = os.getenv("SMTP_SERVER", "smtp.sendgrid.net")
SMTP_PORT = int(os.getenv("SMTP_PORT", 587))
VERIFIED_SENDER = os.getenv("VERIFIED_SENDER")  # Your verified email in SendGrid
ADMIN_EMAIL = os.getenv("ADMIN_EMAIL")  # Your email where you want to receive messages

# ✅ Add root (`/`) route to confirm the service is running
@app.route('/', methods=['GET'])
def home():
    return jsonify({"message": "Flask Email API is running"}), 200

# ✅ Add `/health` route for Render’s health check
@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy"}), 200

@app.route('/send-email', methods=['POST'])
def send_email():
    try:
        data = request.json
        name = data.get('name')
        user_email = data.get('email')  # User's email
        subject = data.get('subject')
        message = data.get('message')

        if not all([name, user_email, subject, message]):
            return jsonify({"error": "All fields are required"}), 400

        msg = MIMEMultipart()
        msg['From'] = VERIFIED_SENDER  # Must be a verified sender
        msg['To'] = ADMIN_EMAIL  # Your email to receive messages
        msg['Subject'] = f"New Contact Form Submission: {subject}"
        msg.add_header('Reply-To', user_email)  # ✅ Set "Reply-To" as the user's email

        # ✅ Email body
        body = f"""
        Name: {name}
        Email: {user_email}
        Subject: {subject}

        Message:
        {message}
        """
        msg.attach(MIMEText(body, 'plain'))

        # ✅ Send email using SendGrid SMTP
        print("Connecting to SMTP server...")
        server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
        server.starttls()
        server.login(EMAIL_USER, EMAIL_PASS)
        print("Login successful.")

        server.sendmail(VERIFIED_SENDER, ADMIN_EMAIL, msg.as_string())
        server.quit()
        print("Email sent successfully.")

        return jsonify({"message": "Email sent successfully!"}), 200

    except smtplib.SMTPAuthenticationError:
        return jsonify({"error": "SMTP Authentication failed. Check API Key."}), 401
    except smtplib.SMTPException as e:
        return jsonify({"error": f"SMTP error: {str(e)}"}), 500
    except Exception as e:
        return jsonify({"error": f"General error: {str(e)}"}), 500

# ✅ Proper production-ready Flask app setup
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
