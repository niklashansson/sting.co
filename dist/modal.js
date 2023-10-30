"use strict";
(() => {
  // bin/live-reload.js
  new EventSource(`${"http://localhost:3000"}/esbuild`).addEventListener("change", () => location.reload());

  // src/utils/queryElements.ts
  function queryElements(selector, parent) {
    return Array.from((parent || document).querySelectorAll(selector));
  }

  // src/utils/modal/closeModal.ts
  function closeModal(modalElement, closeButtons, modalIndex) {
    if (modalIndex === 1)
      localStorage.setItem("modal-popup-1", "already-shown");
    modalElement.setAttribute("modal-active", "");
    closeButtons.forEach((btn) => btn.removeEventListener("click", null));
  }

  // src/utils/modal/openModal.ts
  function openModal(modalElement, modalIndex) {
    const closeButtons = queryElements('[modal-element="close-btn"]', modalElement);
    if (!closeButtons.length)
      return;
    closeButtons.forEach((button) => {
      button.addEventListener("click", () => {
        closeModal(modalElement, closeButtons, modalIndex);
      });
    });
    modalElement.setAttribute("modal-active", `${modalIndex}`);
  }

  // src/utils/queryElement.ts
  function queryElement(selector, parent) {
    return (parent || document).querySelector(selector);
  }

  // src/modal.ts
  window.Webflow = window.Webflow || [];
  window.Webflow.push(async () => {
    const modalElement = queryElement('[modal-element="component"]');
    const openSearchModalBtns = queryElements('a[href="#modal-popup-1"]').map((el) => {
      return { el, i: 1 };
    });
    const allOpenBtns = [...openSearchModalBtns];
    if (localStorage.getItem("modal-popup-1") !== "already-shown") {
      if (!modalElement)
        return;
      openModal(modalElement, 1);
    }
    if (!allOpenBtns.length || !modalElement)
      return;
    allOpenBtns.forEach(({ el, i }) => {
      el.setAttribute("href", "#");
      el.addEventListener("click", () => {
        openModal(modalElement, i);
      });
    });
  });
})();
//# sourceMappingURL=modal.js.map
