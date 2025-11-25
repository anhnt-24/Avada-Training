import React from 'react'
import { Box, InlineStack as Stack, RangeSlider, TextField } from '@shopify/polaris'

export default function Slider ({
  label = 'Delay Time',
  min = 1,
  max = 60,
  step = 1,
  unit = 'second(s)',
  value,
  onChange,
}) {
  const handleChange = (newValue) => {
    let num = Number(newValue)
    if (isNaN(num)) return
    if (num < min) num = min
    if (num > max) num = max
    onChange?.(num)
  }

  // semantic

  return (
    <Stack blockAlign={'end'} gap={'200'}>
      <div style={{ flex: 1 }}>
        <RangeSlider
          label={label}
          value={value}
          onChange={handleChange}
          min={min}
          max={max}
          step={step}
          suffix={''}
        />
      </div>
      <Box maxWidth={'150px'} minWidth={'150px'}>
        <TextField
          type="number"
          value={String(value)}
          onChange={handleChange}
          suffix={unit}
          autoComplete="off"
          min={min}
          max={max}
        />
      </Box>
    </Stack>

  )
}
