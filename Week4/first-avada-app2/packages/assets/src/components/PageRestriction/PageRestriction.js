import { BlockStack, Box, ChoiceList, Text } from '@shopify/polaris'
import PropTypes from 'prop-types'
import React, { useCallback } from 'react'
import { RESTRICTION_OPTIONS } from '@assets/const/salePopsSettings'
import ResourcePickerComponent from '@assets/components/ResourcePickerComponent/ResourcePickerComponent'

const RenderSpecificItems = ({ items, updateSpecificItems, resourceType }) => {
  const renderChildren = useCallback(
    (isSelected) =>
      isSelected && (
        <ResourcePickerComponent
          resourceType={resourceType}
          selectedItems={items.list}
          setSelectedItems={(ids) => updateSpecificItems({
            ...items,
            list: ids
          })}></ResourcePickerComponent>
      ), [items, updateSpecificItems]
  )
  const SPECIFIC_CHOICES = [{ label: `All ${resourceType}`, value: 'all' },
    { label: `Specific ${resourceType}s`, value: 'specific', renderChildren }]
  return <ChoiceList
    choices={SPECIFIC_CHOICES}
    selected={[items.type]}
    onChange={(value) => updateSpecificItems(({ ...items, type: value[0] }))}
  />
}
export default function PageRestriction ({ form, updateFormKey }) {
  const selectedPages = [form.allowShow]
  const renderSpecificProducts = useCallback(
    (isSelected) =>
      isSelected && (
        <RenderSpecificItems
          resourceType={'product'}
          items={form.specificProducts}
          updateSpecificItems={(value) => updateFormKey('specificProducts', value)}/>
      ),
  )
  const renderSpecificCollections = useCallback(
    (isSelected) =>
      isSelected && (
        <RenderSpecificItems
          resourceType={'collection'}
          items={form.specificCollections}
          updateSpecificItems={(value) => updateFormKey('specificCollections', value)}/>
      ),
  )
  const SPECIFIC_PAGES = [
    { label: 'Homepage', value: 'home' },
    { label: 'Product pages', value: 'product', renderChildren: renderSpecificProducts },
    { label: 'Collection pages', value: 'collection', renderChildren: renderSpecificCollections },
    { label: 'Cart pages', value: 'cart' },
    { label: 'Blog pages', value: 'blog' },
  ]

  const handleSpecificPageCheckboxChange = (selectedValues) => {
    console.log(selectedValues)
    const newSpecificPages = {}
    SPECIFIC_PAGES.forEach(item => {
      newSpecificPages[item.value] = selectedValues.includes(item.value)
    })
    updateFormKey('specificPages', newSpecificPages)
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
          <Box paddingInline={'600'} paddingBlock={'200'}>
            <ChoiceList
              allowMultiple
              choices={SPECIFIC_PAGES}
              selected={Object.keys(form.specificPages || {}).filter(
                key => form.specificPages[key]
              )}
              onChange={handleSpecificPageCheckboxChange}
            />
          </Box>
        )}
      </Box>
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

