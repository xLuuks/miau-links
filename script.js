const clickableContainerSelector =
  ".hero-photo, .grooming-card, .team-card__photo, .specialty-card__media";

const lightbox = document.getElementById("lightbox");
const lightboxImage = lightbox ? lightbox.querySelector(".lightbox__image") : null;
const closeButton = lightbox ? lightbox.querySelector(".lightbox__close") : null;
const clickableContainers = document.querySelectorAll(clickableContainerSelector);

if (lightbox && lightboxImage && closeButton && clickableContainers.length > 0) {
  let lastFocusedElement = null;

  const closeLightbox = () => {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("lightbox-open");
    lightboxImage.removeAttribute("src");
    lightboxImage.removeAttribute("alt");

    if (lastFocusedElement) {
      lastFocusedElement.focus();
      lastFocusedElement = null;
    }
  };

  const openLightbox = (imageElement) => {
    lastFocusedElement = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    lightboxImage.src = imageElement.currentSrc || imageElement.src;
    lightboxImage.alt = imageElement.alt || "Imagem ampliada";
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("lightbox-open");
    closeButton.focus();
  };

  clickableContainers.forEach((container) => {
    const image = container.querySelector("img");

    if (!image || container.getAttribute("aria-hidden") === "true") {
      return;
    }

    container.setAttribute("role", "button");
    container.setAttribute("tabindex", "0");
    container.setAttribute("aria-label", `Ampliar ${image.alt || "imagem"}`);

    const handleOpen = () => {
      openLightbox(image);
    };

    container.addEventListener("click", handleOpen);

    container.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        handleOpen();
      }
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

    if (event.key === "Tab" && lightbox.classList.contains("is-open")) {
      event.preventDefault();
      closeButton.focus();
    }
  });
}
