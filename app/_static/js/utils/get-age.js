const getAge = (birthDate) => {
  const date = new Date();
  const time = new Date(birthDate).getTime();
  const diff = (date - time) / 3.15576e10;
  return Math.floor(diff);
};

export {
  getAge
}
