// Portfolio interactions
document.addEventListener("DOMContentLoaded", () => {
  // Current year in footer
  const yearElement = document.getElementById("currentYear");
  if (yearElement) yearElement.textContent = new Date().getFullYear();

  // Close the mobile navigation after selecting a section
  const navElement = document.getElementById("mainNav");
  document.querySelectorAll("#mainNav .nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      if (navElement && navElement.classList.contains("show") && window.bootstrap) {
        bootstrap.Collapse.getOrCreateInstance(navElement).hide();
      }
    });
  });

  // Certificate image popup
  const cards = document.querySelectorAll(".cert-card");
  const modal = document.getElementById("certificateModal");
  const modalContent = modal?.querySelector(".certificate-modal-content");
  const preview = document.getElementById("certificatePreview");
  const title = document.getElementById("certificateModalTitle");
  const closeButton = document.getElementById("closeCertificate");
  let previousFocus = null;

  function openCertificate(card) {
    const imagePath = card.dataset.image;
    const certificateTitle = card.dataset.title || "Sertifikat";
    if (!modal || !preview || !imagePath) return;

    previousFocus = card;
    title.textContent = certificateTitle;
    preview.style.display = "block";
    preview.src = imagePath;
    preview.alt = certificateTitle;

    // If the image is not present, show a helpful message in the popup.
    preview.onerror = () => {
      preview.style.display = "none";
      const oldError = modalContent.querySelector(".certificate-error");
      if (oldError) oldError.remove();
      const error = document.createElement("div");
      error.className = "certificate-error";
      error.innerHTML = '<i class="fa-regular fa-image"></i>Gambar sertifikat belum ditemukan.<br>Letakkan file gambar di folder <code>assets/img/certificates/</code> sesuai nama file yang ditentukan.';
      preview.insertAdjacentElement("afterend", error);
    };

    preview.onload = () => {
      preview.style.display = "block";
      modalContent.querySelector(".certificate-error")?.remove();
    };

    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    closeButton?.focus();
  }

  function closeCertificate() {
    if (!modal) return;
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    preview?.removeAttribute("src");
    modalContent?.querySelector(".certificate-error")?.remove();
    if (preview) preview.style.display = "block";
    if (previousFocus) previousFocus.focus();
  }

  cards.forEach((card) => {
    card.addEventListener("click", () => openCertificate(card));
  });

  closeButton?.addEventListener("click", closeCertificate);

  modal?.addEventListener("click", (event) => {
    if (event.target === modal) closeCertificate();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal?.classList.contains("active")) {
      closeCertificate();
    }
  });
});
