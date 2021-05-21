export function generateColorClass (color: String = 'indigo', dark: boolean = true, text: boolean = false) {
  const classList = []

  const colorClass = text ? 'bg-transparent' : `bg-${color}-400 hover:bg-${color}-300`
  const darkClass = dark ? 'text-white' : 'text-black'

  classList.push(colorClass)
  classList.push(darkClass)

  return classList
}
