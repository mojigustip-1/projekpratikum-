from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

data_penjualan = []

@app.route('/')
def index():
    return render_template('index.html')  # File ini harus ada di folder templates

@app.route('/penjualan', methods=['GET', 'POST'])
def handle_penjualan():
    if request.method == 'GET':
        return jsonify(data_penjualan)  # Mengambil semua data penjualan
    
    elif request.method == 'POST':
        data = request.json
        data['id'] = len(data_penjualan) + 1
        data['total_harga'] = data['harga'] * data['jumlah']
        data_penjualan.append(data)
        return jsonify({"message": "Data berhasil ditambahkan"}), 201

@app.route('/penjualan/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def penjualan_detail(id):
    global data_penjualan
    item = next((item for item in data_penjualan if item['id'] == id), None)

    if not item:
        return jsonify({"message": "Data tidak ditemukan"}), 404

    if request.method == 'GET':
        return jsonify(item)  # Mengambil data berdasarkan ID

    elif request.method == 'PUT':
        data = request.json
        item.update(data)
        item['total_harga'] = item['harga'] * item['jumlah']
        return jsonify({"message": "Data berhasil diperbarui"}), 200

    elif request.method == 'DELETE':
        data_penjualan = [item for item in data_penjualan if item['id'] != id]
        return jsonify({"message": "Data berhasil dihapus"}), 200

if __name__ == '__main__':
    app.run(debug=True)
