// Cek kode pada halaman intro
function checkCode() {
  const code = document.getElementById('codeInput').value;
  const errorMessage = document.getElementById('errorMessage');

  if (code === '311606') {
    window.history.pushState({page: 'mainPage'}, '', ''); // Menambahkan state untuk tombol back
    navigateTo('mainPage');
  } else {
    errorMessage.innerHTML = 'Incorrect code. Please try again.';
  }
}

// Navigasi antar halaman
function navigateTo(pageId) {
  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.add('hidden');
  });
  document.getElementById(pageId).classList.remove('hidden');

  // Menambahkan state halaman agar tombol back bisa digunakan
  window.history.pushState({page: pageId}, '', '');
}

// Fungsi untuk mendeteksi tombol back bawaan browser/ponsel
window.onpopstate = function(event) {
  if (event.state && event.state.page) {
    navigateTo(event.state.page);
  } else {
    // Jika tidak ada state (misalnya di halaman pertama), kembali ke intro
    navigateTo('intro');
  }
};

// Fungsi untuk mengunggah foto
function uploadPhoto() {
  const fileInput = document.getElementById('uploadPhoto');
  const file = fileInput.files[0]; // Ambil file yang di-upload pengguna

  if (file) {
    const reader = new FileReader(); // Gunakan FileReader untuk membaca file

    reader.onload = function(event) {
      const imageData = event.target.result; // Data foto dalam format base64

      // Simpan foto ke LocalStorage
      savePhotoToLocalStorage(imageData);

      // Tampilkan foto di halaman
      displayUploadedPhotos();
    };

    reader.readAsDataURL(file); // Baca file sebagai URL data base64
  } else {
    alert("Please select a photo to upload.");
  }
}

// Fungsi untuk menyimpan foto ke LocalStorage
function savePhotoToLocalStorage(imageData) {
  let photos = JSON.parse(localStorage.getItem('uploadedPhotos')) || [];
  photos.push(imageData); // Tambahkan foto baru ke array
  localStorage.setItem('uploadedPhotos', JSON.stringify(photos)); // Simpan array ke LocalStorage
}

// Fungsi untuk menampilkan foto yang sudah di-upload
function displayUploadedPhotos() {
  const uploadedPhotosDiv = document.getElementById('uploadedPhotos');
  uploadedPhotosDiv.innerHTML = ''; // Kosongkan area foto sebelumnya

  const photos = JSON.parse(localStorage.getItem('uploadedPhotos')) || [];

  if (photos.length > 0) {
    photos.forEach((photo, index) => {
      const img = document.createElement('img');
      img.src = photo;
      img.alt = `Uploaded Photo ${index + 1}`;
      img.style.width = '100px'; // Ukuran foto
      img.style.margin = '10px';

      // Tombol hapus
      const deleteButton = document.createElement('button');
      deleteButton.innerHTML = 'Delete';
      deleteButton.onclick = function() {
        deletePhoto(index);
      };

      const photoWrapper = document.createElement('div');
      photoWrapper.appendChild(img);
      photoWrapper.appendChild(deleteButton);

      uploadedPhotosDiv.appendChild(photoWrapper);
    });
  }a
}

// Fungsi untuk menghapus foto
function deletePhoto(index) {
  let photos = JSON.parse(localStorage.getItem('uploadedPhotos')) || [];
  photos.splice(index, 1); // Hapus foto berdasarkan index
  localStorage.setItem('uploadedPhotos', JSON.stringify(photos)); // Simpan array yang sudah dihapus
  displayUploadedPhotos(); // Refresh tampilan foto
}

// Panggil fungsi ini untuk menampilkan foto saat halaman dimuat
document.addEventListener('DOMContentLoaded', displayUploadedPhotos);
