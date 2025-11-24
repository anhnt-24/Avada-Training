import { BlockStack, Select, TextField } from '@shopify/polaris'

export default function PageRestriction ({ form, updateFormKey }) {
  const restrictionOptions = [
    { label: 'All pages', value: 'all' },
    { label: 'Specific pages', value: 'specific' },
  ]

  return (
    <BlockStack gap="600">
      <Select
        label="Restriction Type"
        options={restrictionOptions}
        value={form.allowShow || 'all'}
        onChange={(value) => updateFormKey('allowShow', value)}
      />

      {form.allowShow === 'specific' && (
        <TextField
          label="Included pages"
          type="text"
          value={form.includedUrls || ''}
          onChange={(value) => updateFormKey('includedUrls', value)}
          multiline={4}
          helpText="Page URLs to show the pop-up (separated by new lines)"
        />
      )}
      <TextField
        label="Excluded pages"
        type="text"
        value={form.excludedUrls || ''}
        onChange={(value) => updateFormKey('excludedUrls', value)}
        multiline={4}
        helpText="Page URLs NOT to show the pop-up (separated by new lines)"
      />

    </BlockStack>
  )
}
