document.addEventListener("DOMContentLoaded", function () {
    // 1. Ambil nama file HTML yang sedang aktif dibuka di browser saat ini
    const currentPath = window.location.pathname.split("/").pop();

    // 2. Buat Kamus Pemetaan (Mapping) Nama File ke Judul Header yang Diinginkan
    const menuTitles = {
        "dashboard.html": "Dashboard Admin",
        "pendaftaran_kasir.html": "Pendaftaran & Kasir",
        "kasir_pembayaran.html": "Pendaftaran & Kasir", // Tetap pendaftaran & kasir sesuai mockup
        "rekam_medis.html": "Pendaftaran & Kasir",       // Tetap pendaftaran & kasir sesuai mockup
        "data_pasien.html": "Data Pasien",
        "data_dokter.html": "Data Dokter & Jadwal",
        "laporan.html": "Laporan Klinik",
        "kelola_layanan.html": "Kelola Layanan & Artikel",
        "manajemen_staff.html": "Manajemen Staff"
    };

    // 3. MUAT KOMPONEN SIDEBAR KIRI
    const sidebarPlaceholder = document.getElementById("admin-sidebar-placeholder");
    if (sidebarPlaceholder) {
        fetch("../components/admin_sidebar.html")
            .then(response => response.text())
            .then(data => {
                sidebarPlaceholder.innerHTML = data;
                
                // Berikan background biru (class active) pada menu yang cocok dengan file aktif
                const sidebarLinks = sidebarPlaceholder.querySelectorAll(".sidebar-menu li a");
                sidebarLinks.forEach(link => {
                    const hrefAttribute = link.getAttribute("href");
                    link.classList.remove("active");

                    // Khusus modul kasir turunan, kunci agar menu Pendaftaran & Kasir tetap aktif biru
                    if (currentPath === hrefAttribute || 
                       ((currentPath === "kasir_pembayaran.html" || currentPath === "rekam_medis.html") && hrefAttribute === "pendaftaran_kasir.html")) {
                        link.classList.add("active");
                    }
                });
            });
    }

    // 4. MUAT KOMPONEN HEADER ATAS (SEARCH BAR)
    const headerPlaceholder = document.getElementById("admin-header-placeholder");
    if (headerPlaceholder) {
        fetch("../components/admin_header.html")
            .then(response => response.text())
            .then(data => {
                headerPlaceholder.innerHTML = data;
                
                // JALAN LURUS GANTI JUDUL DINAMIS:
                const headerTitleElement = document.getElementById("dynamic-header-title");
                if (headerTitleElement) {
                    // Ambil judul dari kamus pemetaan di atas berdasarkan file aktif saat ini
                    // Jika tidak terdaftar di kamus, default-nya kembali ke "Dashboard Admin"
                    const judulBaru = menuTitles[currentPath] || "Dashboard Admin";
                    headerTitleElement.innerText = judulBaru;
                }
            });
    }
});