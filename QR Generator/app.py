from flask import Flask, render_template, request, jsonify
import qrcode
from io import BytesIO
import base64

app = Flask(__name__)

# Ruta principal para cargar la página web
@app.route('/')
def home():
    return render_template('index.html')

# Ruta para procesar el texto y generar el QR
@app.route('/generate_qr', methods=['POST'])
def generate_qr():
    data = request.json.get('text')
    
    # Generar el código QR
    img = qrcode.make(data)
    buf = BytesIO()
    img.save(buf, format="PNG")
    img_str = base64.b64encode(buf.getvalue()).decode('utf-8')

    return jsonify({"qr_code": img_str})

if __name__ == "__main__":
    app.run(debug=True)