export function shaderColor(color, percent) {
  const number_ = Number.parseInt(color.slice(1), 16);
  const amt = Math.round(2.55 * percent);
  const R = (number_ >> 16) + amt;
  const G = ((number_ >> 8) & 0x00_ff) + amt;
  const B = (number_ & 0x00_00_ff) + amt;
  const new_color =
    '#' +
    (
      0x1_00_00_00 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x1_00_00 +
      (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x1_00 +
      (B < 255 ? (B < 1 ? 0 : B) : 255)
    )
      .toString(16)
      .slice(1);
  return new_color;
}
