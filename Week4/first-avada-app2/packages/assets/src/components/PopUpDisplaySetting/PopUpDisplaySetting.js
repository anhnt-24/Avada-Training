import { BlockStack, Box, Checkbox, ChoiceList, Divider, Text } from '@shopify/polaris'
import DesktopPositionInput from '@assets/components/DesktopPositionInput/DesktopPositionInput'
import Slider from '@assets/components/Slider/Slider'
import PropTypes from 'prop-types'
import React from 'react'
import FontDropdown from '@assets/components/FontDropdown/FontDropdown'
import { DISPLAY_METHOD_OPTIONS } from '@assets/const/salePopsSettings'

export default function PopUpDisplaySetting ({ form, updateFormKey }) {

  return (
    <BlockStack gap="400">
      <Box>
        <Text variant="headingMd" as={'h1'}>Appearance</Text>
        <Box paddingBlockStart="300">
          <DesktopPositionInput
            label={'Desktop Position'}
            value={form.position}
            onChange={(position) => updateFormKey('position', position)}
          />
          <Text tone={'subdued'} variant={'bodyxs'}>The display position of the pop on your website</Text>
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

      <Checkbox
        label="Hide close icon"
        checked={form.hideCloseIcon}
        onChange={(value) => updateFormKey('hideCloseIcon', value)}
        helpText={' If enabled, customers can close the sale popup after a certain interval.  \n' +
          '  This prevents the popup from bothering them.'}
      />

      {form.hideCloseIcon && (
        <Slider
          label="Hide pops after"
          value={form.hidePopsAfter}
          min={1}
          max={24}
          unit="hour(s)"
          onChange={(value) => updateFormKey('hidePopsAfter', value)}
        />
      )}
      <Divider/>

      <FontDropdown value={form.fontFamily}
                    onChange={(selected) => updateFormKey('fontFamily', selected)}></FontDropdown>

      <Text variant="headingMd">Timing</Text>

      <BlockStack gap="600">
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
      <Divider/>
      <Text variant="headingMd" as="h3">Sales Pop Strategy</Text>
      <ChoiceList
        title="Display by"
        choices={DISPLAY_METHOD_OPTIONS}
        selected={[form.displayMethod]}
        onChange={(selected) => updateFormKey('displayMethod', selected[0])}
      />

      <Checkbox
        label={
          <Text as="span" fontWeight="regular">
            Replay playlist
            <Text as="p" variant="bodySm" tone={'subdued'}>
              If enabled, the playlist will be replayed when all items have been displayed.
            </Text>
          </Text>
        }
        checked={form.replayPlaylist}
        onChange={(value) => updateFormKey('replayPlaylist', value)}
      />

      <Checkbox
        label={
          <Text as="span" fontWeight="regular">
            Continue after page reload
            <Text as="p" variant="bodySm" tone={'subdued'}>
              If enabled, after the page is reloaded, the next popup is displayed. If not, the list will be replayed
              from the start.
            </Text>
          </Text>
        }
        checked={form.continueAfterReload}
        onChange={(value) => updateFormKey('continueAfterReload', value)}
      />

      <Checkbox
        label={
          <Text as="span" fontWeight="regular">
            Based on product view
            <Text as="p" variant="bodySm" tone="subdued">
              If enabled, only display the popups regarding the product a customer is viewing.
            </Text>
          </Text>
        }
        checked={form.basedOnProductView}
        onChange={(value) => updateFormKey('basedOnProductView', value)}
      />
    </BlockStack>
  )
}

PopUpDisplaySetting.propTypes = {
  form: PropTypes.shape({
    position: PropTypes.string,
    hideTimeAgo: PropTypes.bool,
    truncateProductName: PropTypes.bool,
    displayDuration: PropTypes.number,
    firstDelay: PropTypes.number,
    popsInterval: PropTypes.number,
    maxPopsDisplay: PropTypes.number,
    displayMethod: PropTypes.string,
    replayPlaylist: PropTypes.bool,
    continueAfterReload: PropTypes.bool,
    basedOnProductView: PropTypes.bool,
  }),
  updateFormKey: PropTypes.func,
}
