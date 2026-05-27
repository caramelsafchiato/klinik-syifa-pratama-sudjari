document.addEventListener("DOMContentLoaded", function () {
    // 1. Dapatkan nama file yang sedang aktif dibuka
    let currentPath = (window.location.pathname.split("/").pop() || "dashboard.html").toLowerCase();

    // 2. Kamus Judul Header khusus portal Dokter
    const menuTitles = {
        "dashboard.html": "Dashboard Dokter",
        "pemeriksaan.html": "Pemeriksaan Pasien",
        "pasien_saya.html": "Data Pasien Saya",
        "jadwal_saya.html": "Jadwal Praktik Dokter"
    };

    // 3. MUAT SIDEBAR DOKTER
    const sidebarPlaceholder = document.getElementById("dokter-sidebar-placeholder");
    if (sidebarPlaceholder) {
        fetch("../components/dokter_sidebar.html")
            .then(response => response.text())
            .then(data => {
                sidebarPlaceholder.innerHTML = data;
                
                // Logika menyalakan warna biru pada menu yang aktif
                const sidebarLinks = sidebarPlaceholder.querySelectorAll(".sidebar-menu li a");
                sidebarLinks.forEach(link => {
                    const hrefAttribute = (link.getAttribute("href") || "").toLowerCase();
                    
                    // Bersihkan dulu kelas active dari semua tautan
                    link.classList.remove("active");

                    // Jika href sama dengan file saat ini, tambahkan class active
                    if (currentPath === hrefAttribute) {
                        link.classList.add("active");
                    }
                });
            })
            .catch(error => console.error("Gagal memuat sidebar dokter:", error));
    }

    // 4. MUAT HEADER DOKTER
    const headerPlaceholder = document.getElementById("dokter-header-placeholder");
    if (headerPlaceholder) {
        fetch("../components/dokter_header.html")
            .then(response => response.text())
            .then(data => {
                headerPlaceholder.innerHTML = data;
                
                // Logika merubah judul H1 secara dinamis
                const headerTitleElement = document.getElementById("dynamic-header-title");
                if (headerTitleElement) {
                    const judulBaru = menuTitles[currentPath] || "Dashboard Dokter";
                    headerTitleElement.innerText = judulBaru;
                }
            })
            .catch(error => console.error("Gagal memuat header dokter:", error));
    }
});