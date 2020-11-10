export function generateGivenShouldTestDescription({
  given,
  when,
  should,
}: {
  given?: string
  when?: string
  should?: string
}) {
  const givenStr = `GIVEN ${given}` ?? ""
  const whenStr = `WHEN ${when}` ?? ""
  const shouldStr = `SHOULD ${should}` ?? ""

  return [givenStr, whenStr, shouldStr]
    .filter((str) => !str.includes("undefined"))
    .join(" ")
}
