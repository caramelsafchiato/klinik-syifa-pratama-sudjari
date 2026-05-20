document.addEventListener("DOMContentLoaded", function() {
    const images = [
        "assets/images/gambar klinik.png",
        "assets/images/gambar klinik 2.png",
        "assets/images/gambar klinik 3.png",
        "assets/images/gambar klinik 4.png"
    ];
    
    let currentIndex = 0;
    
    const sliderImg = document.getElementById('slider-img');
    const nextBtn = document.querySelector('.slider-btn.next');
    const prevBtn = document.querySelector('.slider-btn.prev');

    if (sliderImg && nextBtn && prevBtn) {
        
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % images.length;
            sliderImg.src = images[currentIndex];
        });

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            sliderImg.src = images[currentIndex];
        });
        
        setInterval(() => {
            currentIndex = (currentIndex + 1) % images.length;
            sliderImg.src = images[currentIndex];
        }, 5000);
    }
});