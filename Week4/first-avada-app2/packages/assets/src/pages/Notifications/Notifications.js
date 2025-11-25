import {
  Banner,
  BlockStack,
  Box,
  IndexFilters,
  IndexTable,
  LegacyCard,
  Page,
  Text,
  useIndexResourceState,
  useSetIndexFiltersMode,
} from '@shopify/polaris'
import { useCallback, useState } from 'react'
import NotificationPopup from '@assets/components/NotificationPopup/NotificationPopup'
import useFetchApi from '@assets/hooks/api/useFetchApi'
import { DeleteIcon } from '@shopify/polaris-icons'
import useDeleteApi from '@assets/hooks/api/useDeleteApi'
import useCreateApi from '@assets/hooks/api/useCreateApi'

export default function Notifications () {
  const { data: notifications, loading, setData: setNotifications } = useFetchApi({ url: '/notifications' })
  const { handleDelete, deleting } = useDeleteApi({ url: '/notifications/delete' })
  const { handleCreate, creating } = useCreateApi({ url: '/notifications/sync-orders', fullResp: true })
  const [queryValue, setQueryValue] = useState('')
  const [sortSelected, setSortSelected] = useState('date-created asc')
  const { mode, setMode } = useSetIndexFiltersMode()
  const { selectedResources, allResourcesSelected, handleSelectionChange, clearSelection } =
    useIndexResourceState(notifications)

  const bulkHandleDelete = async () => {
    try {
      await handleDelete({ data: { ids: selectedResources } })
      clearSelection()
      setNotifications(prev =>
        prev.filter(notification => !selectedResources.includes(notification.id))
      )
    } catch (error) {
      console.error('Error deleting notifications:', error)
    }
  }
  const bulkHandleSyncOrders = async () => {
    try {
      const data = await handleCreate()
      setNotifications(data.data)
      clearSelection()
    } catch (error) {
      console.error('Error syncing orders:', error)
    }
  }

  const resourceName = { singular: 'notification', plural: 'notifications' }
  const [isShowSyncBanner, setIsShowSyncBanner] = useState(true)
  const handleQueryChange = useCallback((value) => setQueryValue(value), [])
  const handleQueryClear = useCallback(() => setQueryValue(''), [])
  const handleSortChange = useCallback((value) => setSortSelected(value), [])

  const sortOptions = [
    { label: 'Date created', value: 'date-created asc', directionLabel: 'Ascending' },
    { label: 'Date created', value: 'date-created desc', directionLabel: 'Descending' },
  ]
  const promotedBulkActions = [
    {
      icon: DeleteIcon,
      destructive: true,
      content: 'Delete',
      onAction: bulkHandleDelete,
    },
  ]

  const rowMarkup = notifications.map((item, index) => (
    <IndexTable.Row
      id={item.id}
      key={item.id}
      position={index}
      selected={selectedResources.includes(item.id)}
    >
      <IndexTable.Cell>
        <Box maxWidth="350px">
          <NotificationPopup/>
        </Box>
      </IndexTable.Cell>
      <IndexTable.Cell>
        <Text>{new Date(item.timestamp).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}</Text>
      </IndexTable.Cell>
    </IndexTable.Row>
  ))

  return (
    <Page
      title="Notifications"
      subtitle="List of sales notifications from Shopify"
      primaryAction={{ content: 'Import', onAction: () => 1 }}
      secondaryActions={[{ content: 'Settings', url: '/settings' }]}
    >
      <BlockStack gap={'400'}>
        {isShowSyncBanner && (
          <Banner
            title="If orders are not up to date"
            action={{ content: 'Sync manually', onAction: bulkHandleSyncOrders, loading: creating || deleting }}
            secondaryAction={{ content: 'I don\'t want', onAction: () => setIsShowSyncBanner(false) }}
            onDismiss={() => setIsShowSyncBanner(false)}
          >
            <p>
              We only keep maximum amount of 45 purchase notifications synchronized
              from your store. If you find your orders are not up to date, try
              synchronizing it again.
            </p>
          </Banner>
        )}

        <LegacyCard>
          <IndexFilters
            sortOptions={sortOptions}
            sortSelected={sortSelected}
            onSort={handleSortChange}
            queryValue={queryValue}
            onQueryChange={handleQueryChange}
            onQueryClear={handleQueryClear}
            primaryAction={{
              content: 'Delete selected',
              onAction: () => console.log('Delete', selectedResources),
              disabled: selectedResources.length === 0,
            }}
            cancelAction={{
              content: 'Clear selection',
              onAction: () => handleSelectionChange([]),
              disabled: selectedResources.length === 0,
            }}
            filters={[]}
            appliedFilters={[]}
            tabs={[]}
            mode={mode}
            setMode={setMode}
          />
          <IndexTable
            promotedBulkActions={promotedBulkActions}
            resourceName={resourceName}
            itemCount={notifications.length}
            selectedItemsCount={allResourcesSelected ? 'All' : selectedResources.length}
            onSelectionChange={handleSelectionChange}
            headings={[
              { title: 'Notification' },
              { title: 'Date' },
            ]}
            loading={loading || creating || deleting}
          >
            {rowMarkup}
          </IndexTable>
        </LegacyCard>
      </BlockStack>
    </Page>
  )
}
