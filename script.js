
"use strict";

/*
  KIVRA WEB STUDIO
  Main JavaScript file

  IMPORTANT:
  Replace WHATSAPP_NUMBER with your own WhatsApp number.
  Use international format without +, spaces or dashes.
  Example format: 233XXXXXXXXX
*/

const WHATSAPP_NUMBER = "233539378752";

// Mobile navigation
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

function closeMenu() {
  if (!menuToggle || !navLinks) return;

  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation menu");
  navLinks.classList.remove("open");
}

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen =
      menuToggle.getAttribute("aria-expanded") === "true";

    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Open navigation menu" : "Close navigation menu"
    );

    navLinks.classList.toggle("open", !isOpen);
  });

  // Close the menu after a navigation link is selected.
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Close the menu when the user presses Escape.
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
      menuToggle.focus();
    }
  });

  // Return to desktop navigation behaviour after resizing.
  window.addEventListener("resize", () => {
    if (window.innerWidth > 720) {
      closeMenu();
    }
  });
}

// Automatically update the footer year.
const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// Let customers choose a package from the pricing section.
const serviceSelect = document.getElementById("service");
const packageButtons = document.querySelectorAll("[data-package]");

packageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const packageName = button.dataset.package;

    if (!serviceSelect) return;

    const packageOptions = {
      "Starter": "One-page website",
      "Business": "Business website",
      "Website care": "Website maintenance"
    };

    serviceSelect.value = packageOptions[packageName] || "";

    // Move focus to the contact form after the link navigation.
    window.setTimeout(() => {
      serviceSelect.focus();
    }, 300);
  });
});

// Contact form: prepare a WhatsApp message.
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!contactForm.reportValidity()) {
      return;
    }

    // Prevent the placeholder number from being used.
    if (!/^233\d{9}$/.test(WHATSAPP_NUMBER)) {
      if (formStatus) {
        formStatus.textContent =
          "The WhatsApp contact number has not been configured yet. Please contact the website owner.";
      }

      return;
    }

    const name = document.getElementById("name").value.trim();
    const business = document.getElementById("business").value.trim();
    const service = document.getElementById("service").value;
    const message = document.getElementById("message").value.trim();

    const whatsappMessage = [
      "Hello Kivra Web Studio!",
      "",
      `My name is ${name}.`,
      business ? `Business name: ${business}` : "",
      `Service needed: ${service}`,
      "",
      "Project details:",
      message,
      "",
      "Please let me know the next steps and estimated cost."
    ].filter(Boolean).join("\n");

    const whatsappURL =
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;

    if (formStatus) {
      formStatus.textContent =
        "Opening WhatsApp. Review your message and press Send to submit your enquiry.";
    }

    const whatsappWindow = window.open(
      whatsappURL,
      "_blank",
      "noopener,noreferrer"
    );

    // Fallback for browsers that block opening a new tab.
    if (!whatsappWindow) {
      window.location.href = whatsappURL;
    }
  });
}