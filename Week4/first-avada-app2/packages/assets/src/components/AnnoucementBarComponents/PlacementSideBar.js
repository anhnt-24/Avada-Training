import React from 'react'
import { BlockStack, Card, ChoiceList, Text, TextField } from '@shopify/polaris'
import { PAGE_SELECTION_OPTIONS } from '@assets/const/annoucementBarSettingsDefault'

export const PlacementSideBar = ({ form, setForm }) => {
  const data = form.placement

  const handlePageSelectionChange = (value) => {
    setForm(prev => ({
      ...prev,
      placement: { ...prev.placement, selected: value[0] }
    }))
  }

  const handleIncludedPagesChange = (value) => {
    setForm(prev => ({
      ...prev,
      placement: { ...prev.placement, includedPages: value }
    }))
  }

  const handleExcludedPagesChange = (value) => {
    setForm(prev => ({
      ...prev,
      placement: { ...prev.placement, excludedPages: value }
    }))
  }

  return (
    <Card>
      <BlockStack gap="400">
        <Text variant="headingMd" as="h2">Select pages to display the bar</Text>
        <ChoiceList
          choices={PAGE_SELECTION_OPTIONS}
          selected={[data.selected]}
          onChange={handlePageSelectionChange}
        />

        <Text variant="headingMd" as="h2">You can also use some link</Text>
        <>
          <TextField
            label="Included pages"
            multiline={4}
            value={data.includedPages}
            onChange={handleIncludedPagesChange}
            helpText="Page URLs to show the pop-up (separated by new lines)"
          />
          <TextField
            label="Excluded pages"
            multiline={4}
            value={data.excludedPages}
            onChange={handleExcludedPagesChange}
            helpText="Page URLs NOT to show the pop-up (separated by new lines)"
          />
        </>
      </BlockStack>
    </Card>
  )
}
