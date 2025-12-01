import { useAppBridge } from '@shopify/app-bridge-react'
import { Button, InlineStack, Text } from '@shopify/polaris'

export default function ResourcePickerComponent ({
  selectedItems = [],
  setSelectedItems = () => {},
  resourceType = 'product',
  multiple = true,
  filter = { variants: false },
  action = 'select',
}) {
  const shopify = useAppBridge()

  const handleOpenPicker = async () => {
    try {
      const picker = await shopify.resourcePicker({
        type: resourceType,
        multiple,
        filter,
        action,
        selectionIds: selectedItems.map(item => ({ id: item })),
      })

      const items = picker.selection.map(item => item.id)
      setSelectedItems(items)
    } catch (error) {
      console.error('Error opening resource picker:', error)
    }
  }

  return (
    <InlineStack gap={'200'} blockAlign={'center'}>
      <Text> {selectedItems.length} selected {resourceType}s</Text>
      <Button onClick={handleOpenPicker}>Select {resourceType}s</Button>
    </InlineStack>
  )
}
