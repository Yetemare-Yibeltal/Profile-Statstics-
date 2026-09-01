/**
 * DOM manipulation and element creation helpers
 */

export const $ = (selector, scope = document) => scope.querySelector(selector);
export const $$ = (selector, scope = document) => [
  ...scope.querySelectorAll(selector),
];

export const createElement = (tag, attributes = {}, children = []) => {
  const element = document.createElement(tag);

  Object.entries(attributes).forEach(([key, value]) => {
    if (key === "className") {
      element.className = value;
    } else if (key === "dataset") {
      Object.entries(value).forEach(([dataKey, dataValue]) => {
        element.dataset[dataKey] = dataValue;
      });
    } else if (key.startsWith("on") && typeof value === "function") {
      element.addEventListener(key.substring(2).toLowerCase(), value);
    } else {
      element.setAttribute(key, value);
    }
  });

  children.forEach((child) => {
    if (typeof child === "string") {
      element.appendChild(document.createTextNode(child));
    } else if (child instanceof HTMLElement) {
      element.appendChild(child);
    }
  });

  return element;
};

export const clearContainer = (container) => {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
};
