import { Box, InlineStack as Stack, TextField } from '@shopify/polaris'
import { useRef, useState } from 'react'

export function ColorPicker ({ value, onChange }) {
  const [color, setColor] = useState(value || '#000000')
  const hiddenInputRef = useRef(null)

  const handleInputChange = (val) => {
    if (/^#([0-9A-F]{3}){1,2}$/i.test(val)) {
      setColor(val)
      onChange(val)
    } else {
      setColor(val)
    }
  }

  const handleColorChange = (e) => {
    setColor(e.target.value)
    onChange(e.target.value)
  }

  const openNativeColorPicker = () => {
    hiddenInputRef.current?.click()
  }

  return (
    <Stack blockAlign="center" gap="100">
      <button
        type="button"
        className="color-picker"
        style={{ backgroundColor: color }}
        onClick={openNativeColorPicker}
      />
      <input
        type="color"
        ref={hiddenInputRef}
        value={color}
        onChange={handleColorChange}
        style={{ display: 'none' }}
      />
      <Box
        style={{ flex: 1 }}

      >

        <TextField
          value={color}
          onChange={handleInputChange}
          placeholder="#000000"
        />
      </Box>

    </Stack>
  )
}
