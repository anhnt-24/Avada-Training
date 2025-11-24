import { Card, IndexTable, Page, Text, } from '@shopify/polaris'
import { useCallback, useState } from 'react'
import NotificationPopup from '@assets/components/NotificationPopup/NotificationPopup'
import useFetchApi from '@assets/hooks/api/useFetchApi'

export default function Notifications () {
  const { data: notifications = [], loading } = useFetchApi({ url: '/notifications' })
  const [selectedResources, setSelectedResources] = useState([])
  const [page, setPage] = useState(1)
  const [itemsPerPage] = useState(10)

  const resourceName = {
    singular: 'notification',
    plural: 'notifications',
  }

  const handleSelectionChange = useCallback((selected) => setSelectedResources(selected), [])

  const formatDate = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const paginatedItems = notifications.slice((page - 1) * itemsPerPage, page * itemsPerPage)

  const rowMarkup = paginatedItems.map((item, index) => (
    <IndexTable.Row
      id={item.id}
      key={item.id}
      position={index}
      selected={selectedResources.includes(item.id)}
    >
      <IndexTable.Cell>
        <NotificationPopup/>
      </IndexTable.Cell>
      <IndexTable.Cell>
        <Text>{item.productName}</Text>
      </IndexTable.Cell>
      <IndexTable.Cell>
        <Text>{item.city}, {item.country}</Text>
      </IndexTable.Cell>
      <IndexTable.Cell>
        <Text>{formatDate(item.timestamp)}</Text>
      </IndexTable.Cell>
    </IndexTable.Row>
  ))

  return (
    <Page title="Notifications" subtitle="List of sales notifications from Shopify">
      <Card>
        <IndexTable
          resourceName={resourceName}
          itemCount={notifications.length}
          selectedItemsCount={selectedResources.length}
          onSelectionChange={handleSelectionChange}
          headings={[
            { title: 'Popup' },
            { title: 'Product' },
            { title: 'Location' },
            { title: 'Date' },
          ]}
          pagination={{
            hasNext: true,
            onNext: () => {},
          }}
          loading={loading} // loading mặc định của IndexTable
        >
          {rowMarkup}
        </IndexTable>
      </Card>
    </Page>
  )
}
