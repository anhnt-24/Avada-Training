import { BlockStack, Box, Checkbox, Divider, InlineGrid, Text } from '@shopify/polaris'
import DesktopPositionInput from '@assets/components/DesktopPositionInput/DesktopPositionInput'
import Slider from '@assets/components/Slider/Slider'
import PropTypes from 'prop-types'

export default function PopUpDisplaySetting ({ form, updateFormKey }) {
  return <BlockStack gap="600">
    <Box>
      <Text variant="headingMd" as={'h1'}>Appearance</Text>
      <Box paddingBlockStart="300">
        <DesktopPositionInput label={'Desktop Position'} value={form.position}
                              onChange={(position) => updateFormKey('position', position)}></DesktopPositionInput>
        <Text>The display position of the pop on your website</Text>
      </Box>
    </Box>
    <Checkbox
      label="Hide time ago"
      checked={form.hideTimeAgo}
      onChange={(value) => updateFormKey('hideTimeAgo', value)}
    />
    <Checkbox
      label="Truncate content text"
      helpText="If your product name is long for one line, it will be truncated to 'Product na...'"
      checked={form.truncateProductName}
      onChange={(value) => updateFormKey('truncateProductName', value)}
    />

    <Divider/>

    <Text variant="headingMd">Timing</Text>

    <InlineGrid columns={2} gap={'600'}>

      <BlockStack gap="400">
        <Slider
          label="Display duration"
          value={form.displayDuration}
          min={1}
          max={20}
          step={1}
          unit="second(s)"
          onChange={(value) => updateFormKey('displayDuration', value)}

        />
        <Slider
          label="Time before the first pop"
          value={form.firstDelay}
          min={1}
          max={60}
          step={1}
          unit="second(s)"
          onChange={(value) => updateFormKey('firstDelay', value)}

        />
      </BlockStack>
      <BlockStack gap="600">
        <Slider
          label="Gap time between two pops"
          value={form.popsInterval}
          min={1}
          max={10}
          unit="second(s)"
          onChange={(value) => updateFormKey('popsInterval', value)}

        />
        <Slider
          label="Maximum of popups"
          value={form.maxPopsDisplay}
          min={1}
          max={80}
          step={1}
          unit="pop(s)"
          onChange={(value) => updateFormKey('maxPopsDisplay', value)}
        />
      </BlockStack>
    </InlineGrid>
  </BlockStack>
}

PopUpDisplaySetting.propTypes = {
  form: PropTypes.shape({}),
  updateFormKey: PropTypes.func,
}
