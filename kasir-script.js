// kasir-script.js
var daftarBarang = [];
var hargaProduk = {
  Beras: 15000,
  Gula: 10000,
  Minyak: 20000,
};
var totalHarga = 0;

function tambahBarang() {
  var produk = document.getElementById("produk").value;
  var jumlah = parseInt(document.getElementById("jumlah").value);

  if (isNaN(jumlah) || jumlah <= 0) {
    alert("Masukkan jumlah yang valid.");
    return;
  }

  var harga = hargaProduk[produk];
  if (!harga) {
    alert("Produk tidak valid.");
    return;
  }

  var subtotal = harga * jumlah;
  var existingItemIndex = daftarBarang.findIndex(
    (item) => item.produk === produk
  );
  if (existingItemIndex !== -1) {
    daftarBarang[existingItemIndex].jumlah += jumlah;
    daftarBarang[existingItemIndex].subtotal += subtotal;
  } else {
    daftarBarang.push({
      produk: produk,
      harga: harga,
      jumlah: jumlah,
      subtotal: subtotal,
    });
  }
  tampilkanDaftarBarang();
  hitungTotal();
}

function tampilkanDaftarBarang() {
  var listContainer = document.getElementById("barang-list");
  listContainer.innerHTML = "";

  daftarBarang.forEach(function (barang, index) {
    var listItem = document.createElement("li");
    listItem.textContent = `${barang.produk} - Rp${barang.harga} x ${barang.jumlah} = Rp${barang.subtotal}`;
    listContainer.appendChild(listItem);
  });
}

function hitungTotal() {
  totalHarga = 0;

  daftarBarang.forEach(function (barang) {
    totalHarga += barang.subtotal;
  });

  document.getElementById("total").textContent = "Total: Rp" + totalHarga;
}

function printStruk() {
  var currentTime = new Date().toLocaleString();
  var uangDiberikan = parseInt(document.getElementById("uang").value);
  if (isNaN(uangDiberikan) || uangDiberikan < totalHarga) {
    alert("Masukkan jumlah uang yang valid.");
    return;
  }

  var kembalian = uangDiberikan - totalHarga;

  // Simpan data pembelian ke session storage
  sessionStorage.setItem("daftarBarang", JSON.stringify(daftarBarang));
  sessionStorage.setItem("totalHarga", totalHarga);
  sessionStorage.setItem("uangDiterima", uangDiberikan);
  sessionStorage.setItem("kembalian", kembalian); // Simpan kembalian ke session storage

  // Buka struk dalam jendela baru
  var strukWindow = window.open("struk.html", "_blank");
  if (strukWindow) {
    // Struk telah berhasil dibuka
    strukWindow.focus();
  } else {
    // Browser memblokir jendela pop-up
    alert("Mohon izinkan pop-up untuk membuka struk pembelian.");
  }
}

function bersihkanDaftarBarang() {
  daftarBarang = [];
  tampilkanDaftarBarang();
  hitungTotal();
}

function logout() {
  sessionStorage.removeItem("username");
  sessionStorage.removeItem("role");
  window.location.href = "index.html";
}

// Fungsi untuk mendapatkan waktu saat ini dan menampilkan dalam format hh:mm:ss
function updateClock() {
  var now = new Date();
  var hours = now.getHours().toString().padStart(2, "0");
  var minutes = now.getMinutes().toString().padStart(2, "0");
  var seconds = now.getSeconds().toString().padStart(2, "0");
  var currentTime = hours + ":" + minutes + ":" + seconds;
  document.getElementById("current-time").textContent = currentTime;
}

// Panggil updateClock setiap detik
setInterval(updateClock, 1000);

// Panggil updateClock untuk pertama kali
updateClock();
