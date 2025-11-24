import { Badge, Box, IndexTable, Link, Page, Text, useIndexResourceState } from '@shopify/polaris'
import { useCallback, useState } from 'react'
import useFetchApi from '@assets/hooks/api/useFetchApi'

export default function AnnouncementBarList () {
  const { data = [], loading } = useFetchApi({ url: '/announcements' })
  const [sortValue, setSortValue] = useState('DATE_DESC')

  const {
    selectedResources,
    allResourcesSelected,
    handleSelectionChange
  } = useIndexResourceState(data.map(bar => bar.id))

  const sortOptions = [
    { label: 'Newest', value: 'DATE_DESC' },
    { label: 'Oldest', value: 'DATE_ASC' }
  ]
  const handleSortChange = useCallback((value) => setSortValue(value), [])

  return (
    <Page
      title="Announcement Bars"
      subtitle="List of announcement bars for the shop"
      primaryAction={{ content: 'New announcement bar', url: '/announcements/create' }}
    >
      <Box>
        <IndexTable
          loading={loading}
          pagination={{
            hasNext: true,
            onNext: () => {},
          }}
          itemCount={data.length}
          selectedItemsCount={
            allResourcesSelected ? 'All' : selectedResources.length
          }
          onSelectionChange={handleSelectionChange}
          headings={[
            { title: 'Name' },
            { title: 'Title' },
            { title: 'Type' },
            { title: 'Position' },
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
                  <Link url={`/announcements/${bar.id}`}>
                    {bar.content.name}
                  </Link>
                </Text>
              </IndexTable.Cell>
              <IndexTable.Cell>{bar.content.title}</IndexTable.Cell>
              <IndexTable.Cell>{bar.content.type}</IndexTable.Cell>
              <IndexTable.Cell>{bar.design.position.value}</IndexTable.Cell>
              <IndexTable.Cell>{bar.isPublished ? <Badge tone={'success'}>True</Badge> : <Badge
                tone={'critical'}>False</Badge>}</IndexTable.Cell>
              <IndexTable.Cell>{new Date(bar.createdAt).toLocaleDateString()}</IndexTable.Cell>
            </IndexTable.Row>
          ))}
        </IndexTable>

        {/* Pagination */}
      </Box>
    </Page>
  )
}
