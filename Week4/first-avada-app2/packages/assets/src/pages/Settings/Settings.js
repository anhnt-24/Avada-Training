import React, { useEffect } from 'react'
import {
  BlockStack,
  Box,
  Card,
  InlineGrid,
  Page,
  SkeletonBodyText,
  SkeletonDisplayText,
  SkeletonThumbnail,
  Tabs,
} from '@shopify/polaris'
import NotificationPopup from '@assets/components/NotificationPopup/NotificationPopup'
import useFetchApi from '@assets/hooks/api/useFetchApi'
import { defaultSetting } from '@assets/const/setting/defaultSetting'
import useEditApi from '@assets/hooks/api/useEditApi'
import PopUpDisplaySetting from '@assets/components/PopUpDisplaySetting/PopUpDisplaySetting'
import PageRestriction from '@assets/components/PageRestriction/PageRestriction'

export default function Settings () {
  const { data: form, setData, loading } = useFetchApi({ url: '/settings', defaultData: defaultSetting })
  const { editing, handleEdit } = useEditApi({ url: '/settings' })
  const [selectedTab, setSelectedTab] = React.useState(0)

  useEffect(() => {
    if (form)
      setData(form)
  }, [form])

  const updateFormKey = (key, value) => {
    setData(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const tabs = [
    {
      id: 'display',
      content: 'Display',
      contentJsx: <PopUpDisplaySetting form={form} updateFormKey={updateFormKey}></PopUpDisplaySetting>
    },
    {
      id: 'triggers',
      content: 'Triggers',
      contentJsx: <PageRestriction form={form} updateFormKey={updateFormKey}></PageRestriction>
    },
  ]

  const handleTabChange = (selectedIndex) => setSelectedTab(selectedIndex)
  return (
    <Page title={'Settings'} subtitle={'Decide how your notifications will display'}
          primaryAction={{ content: 'Save', onAction: () => handleEdit(form) }}>
      {editing || loading ?
        <InlineGrid columns={['oneHalf', 'twoThirds']} gap={'400'}>
          <Card>
            <SkeletonThumbnail size="large"/>
            <SkeletonBodyText/>
          </Card>
          <Box borderWidth="025" borderColor="bg" borderRadius="150">
            <Box padding="400">
              <BlockStack gap="600">
                <SkeletonDisplayText size="small"/>
                <SkeletonBodyText/>
                <SkeletonDisplayText size="small"/>
                <InlineGrid columns={2} gap="600">
                  <SkeletonBodyText/>
                  <SkeletonBodyText/>
                </InlineGrid>
              </BlockStack>
            </Box>
          </Box>
        </InlineGrid>
        :
        <InlineGrid columns={['oneHalf', 'twoThirds']} gap={'400'}>
          <Card>
            <NotificationPopup></NotificationPopup>
          </Card>
          <Card>
            <Tabs tabs={tabs} selected={selectedTab} onSelect={handleTabChange}></Tabs>
            {tabs[selectedTab].contentJsx}
          </Card>
        </InlineGrid>
      }

    </Page>

  )
}
