export const appendNewElement = (elParent, elType, elClass) => {
  let element = elParent.appendChild(document.createElement(`${elType}`));
  element.classList.add(`${elClass}`);
  return element;
};
