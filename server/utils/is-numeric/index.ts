export default function isNumeric(id: string) {
  return new RegExp(`\\d{${id.length}}`).test(id)
}
