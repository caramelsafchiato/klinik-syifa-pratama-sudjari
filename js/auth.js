// 1. DATA AKUN STAFF (SIMULASI)
const dummyUsers = [
    { username: 'admin@gmail.com', password: 'admin', role: 'admin' },
    { username: 'dokter@gmail.com', password: 'dokter', role: 'dokter' },
    { username: 'pemilik@gmail.com', password: 'pemilik', role: 'pemilik' }
];

// 2. LOGIKA VALIDASI LOGIN
function handleLogin(event) {
    event.preventDefault(); // Menahan form agar tidak reload halaman

    const userInput = document.getElementById('username').value;
    const passwordInput = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    // Mencari kecocokan data username dan password
    const userFound = dummyUsers.find(user => 
        user.username === userInput && user.password === passwordInput
    );

    if (userFound) {
        // Simpan status login dan role ke localStorage browser
        localStorage.setItem('userRole', userFound.role);
        localStorage.setItem('isLoggedIn', 'true');

        // Alihkan otomatis ke halaman dashboard sesuai dengan Role-nya
        if (userFound.role === 'dokter') {
            window.location.href = 'dokter/dashboard.html';
        } else if (userFound.role === 'pemilik') {
            window.location.href = 'pemilik/dashboard.html';
        } else if (userFound.role === 'admin') {
            window.location.href = 'admin/dashboard.html'; 
        }
    } else {
        // Tampilkan pesan error jika salah
        errorMessage.innerText = "Username atau password salah!";
        errorMessage.style.color = "red";
    }
}

// 3. FUNGSI LOGOUT STAFF
function handleLogout() {
    localStorage.clear(); // Menghapus data login di browser
    
    // Pastikan path-nya disesuaikan. Jika tombol logout ada di dalam folder admin/dokter, gunakan '../index.html'
    window.location.href = '../index.html'; 
}

// 4. FUNGSI PROTEKSI HALAMAN INTERNAL
// Digunakan di halaman dashboard/kelola agar tidak bisa ditembak langsung via URL oleh Customer
function checkPageAccess(allowedRoles) {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userRole = localStorage.getItem('userRole');

    // Cek apakah sudah login
    if (!isLoggedIn || isLoggedIn !== 'true') {
        alert('Akses ditolak! Anda harus login terlebih dahulu.');
        // Pastikan path-nya disesuaikan jika file berada di dalam folder
        window.location.href = '../login.html'; 
        return;
    }

    // Cek apakah role diizinkan melihat halaman ini
    if (!allowedRoles.includes(userRole)) {
        alert('Anda tidak memiliki izin (hak akses) untuk halaman ini!');
        
        // Lempar kembali ke dashboard masing-masing jika memaksa masuk halaman role lain
        if (userRole === 'dokter') {
            window.location.href = '../dokter/dashboard.html';
        } else if (userRole === 'pemilik') {
            window.location.href = '../pemilik/dashboard.html';
        } else {
            window.location.href = '../admin/dashboard.html';
        }
    }
}