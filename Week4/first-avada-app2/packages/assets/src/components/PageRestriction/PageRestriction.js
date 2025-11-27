import { BlockStack, Box, Checkbox, ChoiceList, Text } from '@shopify/polaris'
import PropTypes from 'prop-types'
import React from 'react'
import { RESTRICTION_OPTIONS, SPECIFIC_PAGES } from '@assets/const/salePopsSettings'

export default function PageRestriction ({ form, updateFormKey }) {
  const selectedPages = [form.allowShow]
  const handleSpecificPageCheckboxChange = (key) => (value) => {
    updateFormKey('specificPages', {
      ...form.specificPages,
      [key]: value,
    })
  }

  return (
    <BlockStack gap="400">
      <Text variant="headingMd" as="h3">
        Show sales pop when visitors on page
      </Text>
      <Box>

        <ChoiceList
          title="Select pages"
          choices={RESTRICTION_OPTIONS}
          selected={selectedPages}
          onChange={(selected) => updateFormKey('allowShow', selected[0])}

        />

        {form.allowShow === 'specific' && (
          <Box paddingInline={'600'}>
            <Text tone="subdued">
              Select specific pages where sales pop should appear
            </Text>
            <BlockStack>
              {SPECIFIC_PAGES.map((item) => (
                <Checkbox
                  key={item.key}
                  label={item.label}
                  checked={form.specificPages?.[item.key]}
                  onChange={handleSpecificPageCheckboxChange(item.key)}
                />
              ))}
            </BlockStack>
          </Box>
        )}
      </Box>

      {/*<Divider></Divider>*/}
      {/*<Text variant="headingMd" as="h3">*/}
      {/*  You can also use some link*/}
      {/*</Text>*/}

      {/*<TextField*/}
      {/*  label="Included pages"*/}
      {/*  type="text"*/}
      {/*  value={form.includedUrls || ''}*/}
      {/*  onChange={(value) => updateFormKey('includedUrls', value)}*/}
      {/*  multiline={4}*/}
      {/*  helpText="Page URLs to show the pop-up (separated by new lines)"*/}
      {/*/>*/}

      {/*<TextField*/}
      {/*  label="Excluded pages"*/}
      {/*  type="text"*/}
      {/*  value={form.excludedUrls || ''}*/}
      {/*  onChange={(value) => updateFormKey('excludedUrls', value)}*/}
      {/*  multiline={4}*/}
      {/*  helpText="Page URLs NOT to show the pop-up (separated by new lines)"*/}
      {/*/>*/}
    </BlockStack>
  )
}

PageRestriction.propTypes = {
  form: PropTypes.shape({
    allowShow: PropTypes.string,
    specificPages: PropTypes.object,
    includedUrls: PropTypes.string,
    excludedUrls: PropTypes.string,
  }),
  updateFormKey: PropTypes.func,
}
