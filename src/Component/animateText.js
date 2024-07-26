export const animateText = (text) => {
  return text
    .split("")
    .map(
      (char, index) =>
        `<span style="animation: fadeIn 0.05s ease-in-out ${
          index * 50
        }ms forwards">${char}</span>`
    )
    .join("");
};
