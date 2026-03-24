const clickableContainerSelector =
  ".hero-photo, .grooming-card, .team-card__photo, .specialty-card__media";

const lightbox = document.getElementById("lightbox");
const lightboxImage = lightbox ? lightbox.querySelector(".lightbox__image") : null;
const closeButton = lightbox ? lightbox.querySelector(".lightbox__close") : null;
const clickableContainers = document.querySelectorAll(clickableContainerSelector);

if (lightbox && lightboxImage && closeButton && clickableContainers.length > 0) {
  const closeLightbox = () => {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("lightbox-open");
    lightboxImage.removeAttribute("src");
    lightboxImage.removeAttribute("alt");
  };

  const openLightbox = (imageElement) => {
    lightboxImage.src = imageElement.currentSrc || imageElement.src;
    lightboxImage.alt = imageElement.alt || "Imagem ampliada";
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("lightbox-open");
  };

  clickableContainers.forEach((container) => {
    container.addEventListener("click", () => {
      const image = container.querySelector("img");

      if (!image) {
        return;
      }

      openLightbox(image);
    });
  });

  closeButton.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && lightbox.classList.contains("is-open")) {
      closeLightbox();
    }
  });
}
