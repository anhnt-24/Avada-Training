import React from 'react'
import { BlockStack, Box, Card, ChoiceList, Divider, InlineGrid, Select, Text, TextField } from '@shopify/polaris'
import { ColorPicker } from '@assets/components/ColorPicker/ColorPicker'
import { BACKGROUND_TYPE_OPTIONS, FONT_OPTIONS } from '@assets/const/annoucementBarSettingsDefault'
import Slider from '@assets/components/Slider/Slider'

export const DesignSideBar = ({ form, setForm }) => {
  const data = form.design
  const handleBackgroundTypeChange = (value) =>
    setForm(prev => ({
      ...prev,
      design: {
        ...prev.design,
        card: { ...prev.design.card, background: { ...prev.design.card.background, type: value[0] } }
      }
    }))

  const handleBackgroundColorChange = (index, color) =>
    setForm(prev => {
      const newColors = [...prev.design.card.background.colors]
      newColors[index] = color
      return {
        ...prev,
        design: {
          ...prev.design,
          card: { ...prev.design.card, background: { ...prev.design.card.background, colors: newColors } }
        }
      }
    })
  const handleBackgroundAngleChange = (value) =>
    setForm(prev => ({
      ...prev,
      design: {
        ...prev.design,
        card: { ...prev.design.card, background: { ...prev.design.card.background, angle: value } }
      }
    }))

  return (
    <Card>
      <BlockStack gap="400">
        <Text variant="headingMd" as="h2">Card</Text>
        <ChoiceList
          title="Background type"
          choices={BACKGROUND_TYPE_OPTIONS}
          selected={[data.card.background.type]}
          onChange={handleBackgroundTypeChange}
        />

        {data.card.background.type === 'gradient' ? (
          <>
            <Slider
              label="Gradient angle"
              min={0}
              max={360}
              step={1}
              value={data.card.background.angle}
              onChange={handleBackgroundAngleChange}
            />
            {data.card.background.colors.map((color, index) => (
              <ColorPicker
                key={index}
                value={color}
                onChange={(newColor) => handleBackgroundColorChange(index, newColor)}
              />
            ))}
          </>
        ) : (
          <ColorPicker
            value={data.card.background.colors[0]}
            onChange={(newColor) => handleBackgroundColorChange(0, newColor)}
          />
        )}


        <InlineGrid gap="200" columns={2}>
          <TextField
            label="Corner radius"
            type="number"
            suffix="px"
            value={data.card.cornerRadius}
            onChange={(value) =>
              setForm(prev => ({
                ...prev,
                design: { ...prev.design, card: { ...prev.design.card, cornerRadius: Number(value) } }
              }))
            }
          />
          <TextField
            label="Border size"
            type="number"
            suffix="px"
            value={data.card.border.size}
            onChange={(value) =>
              setForm(prev => ({
                ...prev,
                design: {
                  ...prev.design,
                  card: { ...prev.design.card, border: { ...prev.design.card.border, size: Number(value) } }
                }
              }))
            }
          />
        </InlineGrid>

        <Box>
          <Text>Border color</Text>
          <ColorPicker
            value={data.card.border.color}
            onChange={(color) =>
              setForm(prev => ({
                ...prev,
                design: { ...prev.design, card: { ...prev.design.card, border: { ...prev.design.card.border, color } } }
              }))
            }
          />
        </Box>

        <Divider/>

        <Text variant="headingMd" as="h2">Typography</Text>
        <Select
          label="Font"
          options={FONT_OPTIONS}
          value={data.typography.font}
          onChange={(value) =>
            setForm(prev => ({
              ...prev,
              design: { ...prev.design, typography: { ...prev.design.typography, font: value } }
            }))
          }
        />

        <InlineGrid gap="200" columns={['oneThird', 'twoThirds']} alignItems="end">
          <TextField
            label="Title size"
            type="number"
            suffix="px"
            value={data.typography.title.size}
            onChange={(value) =>
              setForm(prev => ({
                ...prev,
                design: {
                  ...prev.design,
                  typography: {
                    ...prev.design.typography,
                    title: { ...prev.design.typography.title, size: Number(value) }
                  }
                }
              }))
            }
          />
          <ColorPicker
            value={data.typography.title.color}
            onChange={(color) =>
              setForm(prev => ({
                ...prev,
                design: {
                  ...prev.design,
                  typography: { ...prev.design.typography, title: { ...prev.design.typography.title, color } }
                }
              }))
            }
          />
        </InlineGrid>

        <InlineGrid gap="200" columns={['oneThird', 'twoThirds']} alignItems="end">
          <TextField
            label="Subtitle size"
            type="number"
            suffix="px"
            value={data.typography.subtitle.size}
            onChange={(value) =>
              setForm(prev => ({
                ...prev,
                design: {
                  ...prev.design,
                  typography: {
                    ...prev.design.typography,
                    subtitle: { ...prev.design.typography.subtitle, size: Number(value) }
                  }
                }
              }))
            }
          />
          <ColorPicker
            value={data.typography.subtitle.color}
            onChange={(color) =>
              setForm(prev => ({
                ...prev,
                design: {
                  ...prev.design,
                  typography: { ...prev.design.typography, subtitle: { ...prev.design.typography.subtitle, color } }
                }
              }))
            }
          />
        </InlineGrid>

        {/* Button */}
        <Divider/>
        <Text variant="headingMd" as="h2">Button</Text>
        <ChoiceList
          title="Background type"
          choices={BACKGROUND_TYPE_OPTIONS}
          selected={[data.button.background.type]}
          onChange={(value) =>
            setForm(prev => ({
              ...prev,
              design: {
                ...prev.design,
                button: {
                  ...prev.design.button,
                  background: {
                    ...prev.design.button.background,
                    type: value[0]
                  }
                }
              }
            }))
          }
        />

        {data.button.background.type === 'gradient' ? (
          <>
            {data.button.background.colors.map((color, index) => (
              <ColorPicker
                key={index}
                value={color}
                onChange={(newColor) =>
                  setForm(prev => {
                    const newColors = [...prev.design.button.background.colors]
                    newColors[index] = newColor
                    return {
                      ...prev,
                      design: {
                        ...prev.design,
                        button: {
                          ...prev.design.button,
                          background: { ...prev.design.button.background, colors: newColors }
                        }
                      }
                    }
                  })
                }
              />
            ))}
            <Slider
              label="Gradient angle"
              min={0}
              max={360}
              step={1}
              type="number"
              unit="deg"
              value={data.button.background.angle}
              onChange={(value) =>
                setForm(prev => ({
                  ...prev,
                  design: {
                    ...prev.design,
                    button: {
                      ...prev.design.button,
                      background: { ...prev.design.button.background, angle: value }
                    }
                  }
                }))
              }
            />
          </>
        ) : (
          <ColorPicker
            value={data.button.background.colors[0]}
            onChange={(newColor) =>
              setForm(prev => ({
                ...prev,
                design: {
                  ...prev.design,
                  button: {
                    ...prev.design.button,
                    background: { ...prev.design.button.background, colors: [newColor] }
                  }
                }
              }))
            }
          />
        )}


        <InlineGrid gap="200" align="space-between" columns={2}>
          <TextField
            label="Corner radius"
            type="number"
            suffix="px"
            value={data.button.cornerRadius}
            onChange={(value) =>
              setForm(prev => ({
                ...prev,
                design: { ...prev.design, button: { ...prev.design.button, cornerRadius: Number(value) } }
              }))
            }
          />
          <TextField
            label="Border size"
            type="number"
            suffix="px"
            value={data.button.border.size}
            onChange={(value) =>
              setForm(prev => ({
                ...prev,
                design: {
                  ...prev.design,
                  button: { ...prev.design.button, border: { ...prev.design.button.border, size: Number(value) } }
                }
              }))
            }
          />
          <TextField
            label="Font size"
            type="number"
            suffix="px"
            value={data.button.size}
            onChange={(value) =>
              setForm(prev => ({
                ...prev,
                design: {
                  ...prev.design,
                  button: { ...prev.design.button, size: value }
                }
              }))
            }
          />
        </InlineGrid>

        <Box>
          <Text>Border color</Text>
          <ColorPicker
            value={data.button.border.color}
            onChange={(color) =>
              setForm(prev => ({
                ...prev,
                design: {
                  ...prev.design,
                  button: { ...prev.design.button, border: { ...prev.design.button.border, color } }
                }
              }))
            }
          />
        </Box>

        {/* Close Icon */}
        <Divider/>
        <Text variant="headingMd" as="h2">Close icon</Text>
        <InlineGrid columns={['oneThird', 'twoThirds']} gap="200" alignItems="end">
          <TextField
            label="Size"
            type="number"
            suffix="px"
            value={data.closeIcon.size}
            onChange={(value) =>
              setForm(prev => ({
                ...prev,
                design: { ...prev.design, closeIcon: { ...prev.design.closeIcon, size: Number(value) } }
              }))
            }
          />
          <ColorPicker
            value={data.closeIcon.color}
            onChange={(color) =>
              setForm(prev => ({
                ...prev,
                design: { ...prev.design, closeIcon: { ...prev.design.closeIcon, color } }
              }))
            }
          />
        </InlineGrid>
      </BlockStack>
    </Card>
  )
}
