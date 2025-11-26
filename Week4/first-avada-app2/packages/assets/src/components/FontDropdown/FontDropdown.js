import { useState } from 'react'
import { ActionList, BlockStack, Box, Button, Popover, Text } from '@shopify/polaris'

export default function FontDropdown ({ value, onChange }) {
  const [active, setActive] = useState(false)
  const toggleActive = () => setActive((prev) => !prev)
  const fonts = [
    'Arial', 'Helvetica', 'Times New Roman', 'Courier New', 'Verdana', 'Tahoma', 'Georgia', 'Impact', 'Comic Sans MS', 'Trebuchet MS',
    'Palatino', 'Garamond', 'Bookman', 'Avant Garde', 'Candara', 'Optima', 'Didot', 'Futura', 'Lucida Sans', 'Gill Sans',
    'Century Gothic', 'Franklin Gothic Medium', 'Cambria', 'Calibri', 'Corbel', 'Constantia', 'Consolas', 'Rockwell', 'Baskerville', 'Copperplate',
    'Charter', 'Geneva', 'Hoefler Text', 'Lucida Bright', 'Lucida Console', 'Monaco', 'PT Sans', 'PT Serif', 'Open Sans', 'Roboto',
    'Lato', 'Montserrat', 'Raleway', 'Merriweather', 'Ubuntu', 'Noto Sans', 'Source Sans Pro', 'Playfair Display', 'Oswald', 'Droid Sans'
  ]
  return (
    <>
      <Text>Font family</Text>

      <Box maxWidth={'200px'} background={'bg'} paddingBlock={'600'}>
        <BlockStack gap={'200'} inlineAlign={'center'}>
          <span style={{ fontFamily: value, fontSize: '24px' }}>{value}</span>
          <Popover
            active={active}
            activator={
              <Button onClick={toggleActive}>
                Select a font
              </Button>
            }
            onClose={() => setActive(false)}
          >
            <ActionList
              items={fonts.map((font) => ({
                content: <span style={{ fontFamily: font }}>{font}</span>,
                onAction: () => {
                  onChange(font)
                  setActive(false)
                },
                destructive: false,
                accessibilityLabel: font,
                helpText: '',
              }))}

            />
          </Popover>
        </BlockStack>
      </Box>
    </>

  )
}
