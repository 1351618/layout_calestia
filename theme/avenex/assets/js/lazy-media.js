function addLazyLoadImage() {

    var lazyImages = [].slice.call(document.querySelectorAll(".lazy-img"));

    if ("IntersectionObserver" in window) {
        let lazyImageObserver = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    let lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImage.srcset = lazyImage.dataset.src;
                    lazyImage.classList.remove("lazy-img");
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });

        lazyImages.forEach(function (lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });
    } else {
        // Possibly fall back to event handlers here
    }
}

function addLazyLoadBackground() {

    var lazyBackgrounds = [].slice.call(document.querySelectorAll(".lazy-background"));

    if ("IntersectionObserver" in window) {
        let lazyBackgroundObserver = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    lazyBackgroundObserver.unobserve(entry.target);
                }
            });
        });

        lazyBackgrounds.forEach(function (lazyBackground) {
            lazyBackgroundObserver.observe(lazyBackground);
        });
    }
}

document.addEventListener("DOMContentLoaded", addLazyLoadImage);
window.addEventListener("scroll", addLazyLoadImage);
window.addEventListener("resize", addLazyLoadImage);
window.addEventListener("orientationChange", addLazyLoadImage);

document.addEventListener("DOMContentLoaded", addLazyLoadBackground);
window.addEventListener("scroll", addLazyLoadBackground);
window.addEventListener("resize", addLazyLoadBackground);
window.addEventListener("orientationChange", addLazyLoadBackground);