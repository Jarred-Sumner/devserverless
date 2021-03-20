const titleFont = `font-size: 1rem; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
"Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
sans-serif; font-weight: 500; display: inline-block;`;

const rgb = {
  pending: "rgb(55,179,222)",
  success: "rgb(164,189,0)",
  background: "rgb(21,21,21)",
};

const colors = {
  pending: `color: ${rgb.pending}`,
  success: `color: ${rgb.success}`,
};

const titleStyle = `${titleFont} ${colors.pending} background-color: ${rgb.background}; padding: 8px;`;

export function titleLog(text: string) {
  console.log(`%c${text}`, titleStyle);
}
