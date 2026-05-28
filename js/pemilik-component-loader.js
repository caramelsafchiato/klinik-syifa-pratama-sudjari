document.addEventListener("DOMContentLoaded", function () {
    const currentPath = (window.location.pathname.split("/").pop() || "dashboard.html").toLowerCase();

    const menuTitles = {
        "dashboard.html": "Dashboard Pemilik",
        "laporan_keuangan.html": "Laporan Keuangan",
        "laporan_pasien.html": "Laporan Pasien",
        "performa_dokter.html": "Performa Dokter",
        "detail_performa_dokter.html": "Detail Performa Dokter"
    };

    const sidebarPlaceholder = document.getElementById("pemilik-sidebar-placeholder");
    if (sidebarPlaceholder) {
        fetch("../components/pemilik_sidebar.html")
            .then(response => response.text())
            .then(data => {
                sidebarPlaceholder.innerHTML = data;

                const sidebarLinks = sidebarPlaceholder.querySelectorAll(".sidebar-menu li a");
                sidebarLinks.forEach(link => {
                    const hrefAttribute = (link.getAttribute("href") || "").toLowerCase();
                    const isPerformaRoute = currentPath === "detail_performa_dokter.html" && hrefAttribute === "performa_dokter.html";
                    link.classList.toggle("active", currentPath === hrefAttribute || isPerformaRoute);
                });
            });
    }

    const headerPlaceholder = document.getElementById("pemilik-header-placeholder");
    if (headerPlaceholder) {
        fetch("../components/pemilik_header.html")
            .then(response => response.text())
            .then(data => {
                headerPlaceholder.innerHTML = data;

                const headerTitleElement = document.getElementById("dynamic-header-title");
                if (headerTitleElement) {
                    headerTitleElement.innerText = menuTitles[currentPath] || "Dashboard Pemilik";
                }
            });
    }
});