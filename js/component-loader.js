document.addEventListener("DOMContentLoaded", function() {
    // ==========================================
    // 1. LOGIKA MEMUAT HEADER (NAVBAR)
    // ==========================================
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (headerPlaceholder) {
        fetch('components/header.html')
            .then(response => response.text())
            .then(data => {
                headerPlaceholder.innerHTML = data;
                
                // Jalankan fungsi menandai menu aktif setelah HTML navbar berhasil masuk
                setDynamicActiveMenu();
            })
            .catch(error => console.error('Gagal memuat header:', error));
    }

    // ==========================================
    // 2. LOGIKA MEMUAT FOOTER 
    // ==========================================
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
        fetch('components/footer.html')
            .then(response => response.text())
            .then(data => {
                footerPlaceholder.innerHTML = data;
            })
            .catch(error => console.error('Gagal memuat footer:', error));
    }
});

// ==========================================
// 3. FUNGSI MENANDAI MENU AKTIF DINAMIS
// ==========================================
function setDynamicActiveMenu() {
    // Ambil nama file HTML yang sedang dibuka saat ini
    const currentPath = window.location.pathname.split("/").pop();
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        // Bersihkan semua class active bawaan hardcode agar tidak bentrok
        link.classList.remove('active');

        const hrefAttribute = link.getAttribute('href');

        // Kondisi 1: Jika sedang membuka halaman beranda / index utama
        if ((currentPath === "index.html" || currentPath === "") && hrefAttribute === "index.html") {
            link.classList.add('active');
        } 
        
        // Kondisi 2: Jika membuka katalog layanan atau halaman detail turunannya (Menu Layanan menyala)
        else if (
            (currentPath === "layanan.html" || 
             currentPath === "detail_dokter_umum.html" || 
             currentPath === "detail_layanan_khitan.html") && 
            hrefAttribute === "layanan.html"
        ) {
            link.classList.add('active');
        }
        
        // Kondisi 3: Jika membuka halaman tim dokter (Menu Dokter menyala)
        else if (
            (currentPath === "dokter.html") && 
            (hrefAttribute === "dokter.html" || hrefAttribute === "#dokter")
        ) {
            link.classList.add('active');
        }

        // Kondisi 4: Jika membuka halaman formulir pendaftaran online (Tombol Pendaftaran Menyala)
        else if (currentPath === "pendaftaran.html" && hrefAttribute === "pendaftaran.html") {
            link.classList.add('active');
        }
        
        // Kondisi 5: Untuk halaman spesifik lainnya jika nama file sama persis dengan href
        else if (currentPath === hrefAttribute) {
            link.classList.add('active');
        }
    });
}