export default function capitalise(string: string) {
  return string
    .split(" ")
    .map((string) => string.substr(0, 1).toUpperCase() + string.substr(1))
    .join(" ")
    .trim()
}
