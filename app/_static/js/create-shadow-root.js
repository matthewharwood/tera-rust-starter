


const createShadowRoot = (self, id, mode, deep) => {
  const template = document.getElementById(id);
  const content = template.content;

  const shadowRoot = self.attachShadow({ mode });
  shadowRoot.appendChild(content.cloneNode(deep));
  return {
    template, content, shadowRoot,
  }
};

export {
  createShadowRoot
}
