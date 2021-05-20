import { computed } from '@nuxtjs/composition-api'

export function colorClass (color: String = 'indigo', dark:boolean = true) {
  return computed(() => {
    const classList = []

    const colorClass = `bg-${color}-400 hover:bg-${color}-300`
    const darkClass = dark ? 'text-white' : 'text-black'

    classList.push(colorClass)
    classList.push(darkClass)

    return classList
  })
}
