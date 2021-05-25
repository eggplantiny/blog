export default function () {
  console.time('font')
  document.fonts.onloadingdone = () => {
    console.time('font')
    console.log('font loaded')
  }
}
