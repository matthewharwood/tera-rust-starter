const updateSlotContent = (el, value) => {
  el.assignedElements()[0].textContent = value;
}

export {
  updateSlotContent
}
