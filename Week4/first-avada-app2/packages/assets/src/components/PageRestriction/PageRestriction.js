import { BlockStack, Box, ChoiceList, Text } from '@shopify/polaris'
import PropTypes from 'prop-types'
import React, { useCallback } from 'react'
import { RESTRICTION_OPTIONS } from '@assets/const/salePopsSettings'
import ResourcePickerComponent from '@assets/components/ResourcePickerComponent/ResourcePickerComponent'

const RenderSpecificPageProduct = ({ specificProducts, updateSpecificProducts }) => {
  const renderChildren = useCallback(
    (isSelected) =>
      isSelected && (
        <ResourcePickerComponent
          selectedItems={specificProducts.list}
          setSelectedItems={(productIds) => updateSpecificProducts({
            ...specificProducts,
            list: productIds
          })}></ResourcePickerComponent>
      ), [specificProducts, updateSpecificProducts]
  )
  const PRODUCT_SPECIFIC_CHOICES = [{ label: 'All products', value: 'all' },
    { label: 'Specific products', value: 'specific', renderChildren }]
  return <ChoiceList
    choices={PRODUCT_SPECIFIC_CHOICES}
    selected={[specificProducts.type]}
    onChange={(value) => updateSpecificProducts(({ ...specificProducts, type: value[0] }))}
  />
}
const RenderSpecificPageCollection = ({ specificProducts, updateSpecificProducts }) => {
  const renderChildren = useCallback(
    (isSelected) =>
      isSelected && (
        <ResourcePickerComponent
          resourceType={'collection'}
          selectedItems={specificProducts.list}
          setSelectedItems={(productIds) => updateSpecificProducts({
            ...specificProducts,
            list: productIds
          })}></ResourcePickerComponent>
      ), [specificProducts, updateSpecificProducts]
  )
  const PRODUCT_SPECIFIC_CHOICES = [{ label: 'All collections', value: 'all' },
    { label: 'Specific collections', value: 'specific', renderChildren }]
  return <ChoiceList
    choices={PRODUCT_SPECIFIC_CHOICES}
    selected={[specificProducts.type]}
    onChange={(value) => updateSpecificProducts(({ ...specificProducts, type: value[0] }))}
  />
}
export default function PageRestriction ({ form, updateFormKey }) {
  const selectedPages = [form.allowShow]
  const renderSpecificProducts = useCallback(
    (isSelected) =>
      isSelected && (
        <RenderSpecificPageProduct
          specificProducts={form.specificProducts}
          updateSpecificProducts={(value) => updateFormKey('specificProducts', value)}/>
      ),
  )
  const renderSpecificCollections = useCallback(
    (isSelected) =>
      isSelected && (
        <RenderSpecificPageCollection
          specificProducts={form.specificCollections}
          updateSpecificProducts={(value) => updateFormKey('specificCollections', value)}/>
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

