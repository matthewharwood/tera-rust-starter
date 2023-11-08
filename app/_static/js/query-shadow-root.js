

const queryShadowRoot = (self, selector) => {
  const el = self.shadowRoot.querySelector(`slot[name=${selector}]`);
  return el;
}

export {queryShadowRoot}
