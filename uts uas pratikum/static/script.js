document.addEventListener("DOMContentLoaded", function() {
    fetchData();
});

// Ambil data dari API
function fetchData() {
    fetch('/api/penjualan')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById("data-penjualan");
            tableBody.innerHTML = "";
            data.forEach(item => {
                const row = `<tr>
                    <td>${item.id}</td>
                    <td>${item.nama_pelanggan}</td>
                    <td>${item.merek_hp}</td>
                    <td>${item.model_hp}</td>
                    <td>Rp${item.harga.toLocaleString()}</td>
                    <td>${item.jumlah}</td>
                    <td>Rp${item.total_harga.toLocaleString()}</td>
                    <td>
                        <button onclick="hapusData(${item.id})">🗑 Hapus</button>
                    </td>
                </tr>`;
                tableBody.innerHTML += row;
            });
        })
        .catch(error => console.error("Error fetching data:", error));
}

// Fungsi menambah data
function tambahData() {
    const nama = document.getElementById("nama_pelanggan").value;
    const merek = document.getElementById("merek_hp").value;
    const model = document.getElementById("model_hp").value;
    const harga = document.getElementById("harga").value;
    const jumlah = document.getElementById("jumlah").value;

    if (!nama || !merek || !model || !harga || !jumlah) {
        alert(" Mohon isi semua data!");
        return;
    }

    fetch('/api/penjualan', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            nama_pelanggan: nama,
            merek_hp: merek,
            model_hp: model,
            harga: parseInt(harga),
            jumlah: parseInt(jumlah)
        })
    })
    .then(response => response.json())
    .then(() => {
        alert(" Data berhasil ditambahkan!");
        fetchData();
    })
    .catch(error => console.error("Error adding data:", error));
}

// Fungsi hapus data
function hapusData(id) {
    if (confirm(" Yakin ingin menghapus data ini?")) {
        fetch(`/api/penjualan/${id}`, { method: "DELETE" })
            .then(response => response.json())
            .then(() => {
                alert("🗑 Data berhasil dihapus!");
                fetchData();
            })
            .catch(error => console.error("Error deleting data:", error));
    }
}
