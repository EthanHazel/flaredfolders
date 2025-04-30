export const kebabToPascalCase = (kebabCase) => {
  return kebabCase
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
};

export const pascalToKebabCase = (pascalCase) => {
  return pascalCase
    .replace(/([A-Z])/g, " $1")
    .trim()
    .toLowerCase()
    .split(" ")
    .join("-");
};
