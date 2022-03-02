import browser from "webextension-polyfill";
(() => {
  let currentElement: Element | null = null;

  function keyListener(e: any) {
    if (currentElement) {
      e.preventDefault();
      if (e.key === "ArrowUp") {
        switchCurrentElementTo(currentElement.parentElement);
      } else if (e.key === "ArrowDown") {
        switchCurrentElementTo(currentElement.firstElementChild);
      } else if (e.key === "Enter") {
        selectElement(currentElement);
      }
      return false;
    }
  }

  window.addEventListener("keydown", keyListener);

  function selectElement(el: Element) {
    const rect = el.getBoundingClientRect();
    el.classList.remove("flipcap__hovered");
    el.removeEventListener("click", onElementClick);
    window.removeEventListener("mouseover", mouseoverCallback);
    window.removeEventListener("keydown", keyListener);
    currentElement = null;
    browser.runtime.sendMessage({
      type: "select_element",
      rect: rect.toJSON(),
    });
  }

  function onElementClick(e: any) {
    if (currentElement) {
      selectElement(currentElement);
      e.preventDefault();
      return false;
    }
  }

  function switchCurrentElementTo(el: Element | null) {
    if (currentElement) {
      currentElement.classList.remove("flipcap__hovered");
      currentElement.removeEventListener("click", onElementClick);
    }
    currentElement = el;
    if (currentElement !== null) {
      currentElement.classList.add("flipcap__hovered");
      currentElement.addEventListener("click", onElementClick);
    }
  }

  function mouseoverCallback(e: any) {
    if (e.target) {
      switchCurrentElementTo(e.target as HTMLElement);
    }
  }

  window.addEventListener("mouseover", mouseoverCallback);
})();
