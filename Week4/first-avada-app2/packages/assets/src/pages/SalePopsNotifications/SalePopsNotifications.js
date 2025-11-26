import {
  Badge,
  Banner,
  BlockStack,
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
import useEditApi from '@assets/hooks/api/useEditApi'

export default function SalePopsNotifications () {
  const { data: notifications, loading, setData: setNotifications } = useFetchApi({ url: '/notifications' })
  const { data: salePopsSettingsData, setData: setSalePopsSettingsData } = useFetchApi({ url: '/settings' })
  const { editing: activating, handleEdit: handleActive } = useEditApi({ url: '/settings/active' })
  const { handleDelete, deleting } = useDeleteApi({ url: '/notifications/delete' })
  const { handleCreate, creating } = useCreateApi({ url: '/notifications/sync-orders', fullResp: true })
  const [isShowSyncBanner, setIsShowSyncBanner] = useState(true)
  const handleSortChange = useCallback((value) => setSortSelected(value), [])
  const [sortSelected, setSortSelected] = useState('date-created asc')
  const { mode, setMode } = useSetIndexFiltersMode()
  const { selectedResources, allResourcesSelected, handleSelectionChange, clearSelection } =
    useIndexResourceState(notifications)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5
  const paginatedNotifications = notifications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )
  const totalPages = Math.ceil(notifications.length / itemsPerPage)

  const bulkHandleToggleActive = async () => {
    try {
      await handleActive()
      setSalePopsSettingsData(settings => ({ ...settings, isActive: !settings.isActive }))
    } catch (e) {

    }
  }
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

  const rowMarkup = paginatedNotifications.map((item, index) => (
    <IndexTable.Row
      id={item.id}
      key={item.id}
      position={index}
      selected={selectedResources.includes(item.id)}
    >
      <IndexTable.Cell>
        <NotificationPopup settings={salePopsSettingsData} {...item}/>
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
      title="SalePops Notifications"
      subtitle="List of sales notifications from Shopify"
      titleMetadata={<Badge
        tone={salePopsSettingsData.isActive ? 'success' : 'warning'}>{salePopsSettingsData.isActive ? 'Active' : 'Disabled'}</Badge>}
      primaryAction={
        {
          content: !salePopsSettingsData.isActive ? 'Active' : 'Disable',
          onAction: bulkHandleToggleActive,
          destructive: salePopsSettingsData.isActive,
          loading: activating,
        }
      }
      secondaryActions={[{ content: 'Settings', url: '/settings' },
        { content: 'Import', onAction: () => 1 }
      ]}
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
            pagination={{
              hasPrevious: currentPage > 1,
              hasNext: currentPage * itemsPerPage < notifications.length,
              label: <Text
                variant={'bodyLg'}>Page {currentPage}/{totalPages}</Text>,
              onPrevious: () => setCurrentPage(prev => Math.max(prev - 1, 1)),
              onNext: () => setCurrentPage(prev => prev + 1),
            }}
            loading={loading || creating || deleting}
          >
            {rowMarkup}
          </IndexTable>
        </LegacyCard>
      </BlockStack>
    </Page>
  )
}
