export const linear = (p1, p2, t) => {
  const [x1, y1] = p1
  const [x2, y2] = p2
  const x = x1 + (x2 - x1) * t
  const y = y1 + (y2 - y1) * t
  return {x, y}
}
export const quadratic = (p1, p2, cp, t) => {
  const [x1, y1] = p1
  const [x2, y2] = p2
  const [cx, cy] = cp
  let x = (1 - t) * (1 - t) * x1 + 2 * t * (1 - t) * cx + t * t * x2
  let y = (1 - t) * (1 - t) * y1 + 2 * t * (1 - t) * cy + t * t * y2
  return {x, y}
}
export const cubic = (p1, p2, cp1, cp2, t) => {
  const [x1, y1] = p1
  const [x2, y2] = p2
  const [cx1, cy1] = cp1
  const [cx2, cy2] = cp2
  let x =
    x1 * (1 - t) * (1 - t) * (1 - t) +
    3 * cx1 * t * (1 - t) * (1 - t) +
    3 * cx2 * t * t * (1 - t) +
    x2 * t * t * t
  let y =
    y1 * (1 - t) * (1 - t) * (1 - t) +
    3 * cy1 * t * (1 - t) * (1 - t) +
    3 * cy2 * t * t * (1 - t) +
    y2 * t * t * t
  return {x, y}
}
