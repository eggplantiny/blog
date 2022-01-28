import { Content } from '~/types'

const removerRex = /\\/ig

export function refineContent (content: Content | null) {
  if (!content) {
    return
  }

  if (content.title) {
    content.title = content.title.replaceAll(removerRex, '')
  }

  if (content.subtitle) {
    content.subtitle = content.subtitle.replaceAll(removerRex, '')
  }

  console.log(content)
}
