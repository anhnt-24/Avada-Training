const googleFonts = [
  'PT Sans', 'PT Serif', 'Open Sans', 'Roboto', 'Lato', 'Montserrat',
  'Raleway', 'Merriweather', 'Ubuntu', 'Noto Sans', 'Source Sans Pro',
  'Playfair Display', 'Oswald', 'Droid Sans'
]

let fontsLoaded = false

export default function loadFonts () {
  if (fontsLoaded) return
  fontsLoaded = true
  googleFonts.forEach(font => {
    const url = `https://fonts.googleapis.com/css2?family=${font.replace(/ /g, '+')}:wght@400;500;600;700&display=swap`
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = url
    document.head.appendChild(link)
  })
}
