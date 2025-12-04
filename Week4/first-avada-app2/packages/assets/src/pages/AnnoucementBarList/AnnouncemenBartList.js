import { Badge, Box, IndexTable, Link, Page, Text, useIndexResourceState } from '@shopify/polaris'
import { useCallback, useState } from 'react'
import useFetchApi from '@assets/hooks/api/useFetchApi'
import useDeleteApi from '@assets/hooks/api/useDeleteApi'

export default function AnnouncementBarList () {
  const { data = [], loading, setData } = useFetchApi({ url: '/announcements' })
  const { handleDelete, deleting } = useDeleteApi({ url: '/announcements/delete-many' })
  const [sortValue, setSortValue] = useState('DATE_DESC')

  const {
    selectedResources,
    allResourcesSelected,
    handleSelectionChange,
    clearSelection
  } = useIndexResourceState(data)

  const sortOptions = [
    { label: 'Newest', value: 'DATE_DESC' },
    { label: 'Oldest', value: 'DATE_ASC' }
  ]
  const handleSortChange = useCallback((value) => setSortValue(value), [])
  const resourceName = { singular: 'Announcement', plural: 'Announcements' }
  const handleBulkDelete = async () => {
    try {
      await handleDelete({ data: selectedResources })
      const newData = data.filter(item => !selectedResources.includes(item.id))
      setData(newData)
      clearSelection()
    } catch (e) {

    }

  }
  return (
    <Page
      title="Announcement Bars"
      subtitle="List of announcement bars for the shop"
      primaryAction={{ content: 'New announcement bar', url: '/announcements/create' }}
    >
      <Box>
        <IndexTable
          resourceName={resourceName}
          loading={loading || deleting}
          pagination={{
            hasNext: true,
            onNext: () => {},
          }}
          promotedBulkActions={[
            {
              content: 'Delete',
              destructive: true,
              onAction: handleBulkDelete,
              loading: deleting
            }
          ]}
          itemCount={data.length}
          selectedItemsCount={
            allResourcesSelected ? 'All' : selectedResources.length
          }

          onSelectionChange={handleSelectionChange}
          headings={[
            { title: 'Name' },
            { title: 'Title' },
            { title: 'Type' },
            { title: 'Published' },
            { title: 'Created At' }
          ]}
          sortValue={sortValue}
          sortOptions={sortOptions}
          onSortChange={handleSortChange}
        >
          {data.map((bar) => (
            <IndexTable.Row
              id={bar.id}
              key={bar.id}
              position={bar.id}
              selected={selectedResources.includes(bar.id)}
            >
              <IndexTable.Cell>
                <Text variant="bodyMd" fontWeight="bold">
                  <Link url={`/announcements/${encodeURIComponent(bar.id)}`}>
                    {bar.content.name}
                  </Link>
                </Text>
              </IndexTable.Cell>
              <IndexTable.Cell>{bar.content.title}</IndexTable.Cell>
              <IndexTable.Cell>{bar.content.type}</IndexTable.Cell>
              <IndexTable.Cell>{bar.isPublished ? <Badge tone={'success'}>True</Badge> : <Badge
                tone={'critical'}>False</Badge>}</IndexTable.Cell>
              <IndexTable.Cell>{new Date(bar.updatedAt).toLocaleDateString()}</IndexTable.Cell>
            </IndexTable.Row>
          ))}
        </IndexTable>
      </Box>
    </Page>
  )
}
