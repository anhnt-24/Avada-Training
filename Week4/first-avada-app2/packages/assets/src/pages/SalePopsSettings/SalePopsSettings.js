import React, { useEffect, useState } from 'react'
import { Card, Layout, Page, Tabs } from '@shopify/polaris'
import { SaveBar, useAppBridge } from '@shopify/app-bridge-react'
import { salePopsSettings } from '@assets/const/salePopsSettings'
import PopUpDisplaySetting from '@assets/components/PopUpDisplaySetting/PopUpDisplaySetting'
import PageRestriction from '@assets/components/PageRestriction/PageRestriction'
import SalePopsPreview from '@assets/components/SalePopsPreview/SalePopsPreview'
import LoadingSkeletonPage from '@assets/components/LoadingSkeletonPage/LoadingSkeletonPage'
import useFetchApi from '@assets/hooks/api/useFetchApi'
import useEditApi from '@assets/hooks/api/useEditApi'

export default function SalePopsSettings () {
  const shopify = useAppBridge()
  const { data: form, setData, loading } = useFetchApi({ url: '/settings', defaultData: salePopsSettings })
  const { handleEdit, editing } = useEditApi({ url: '/settings' })
  const [selectedTab, setSelectedTab] = useState(0)
  const [initialForm, setInitialForm] = useState(null)
  const SAVE_BAR_ID = 'my-save-bar'
  const updateFormKey = (key, value) => {
    setData(prev => ({ ...prev, [key]: value }))
  }

  const handleTabChange = (selectedIndex) => setSelectedTab(selectedIndex)

  const handleSave = async () => {
    try {
      await handleEdit(form)
      setInitialForm(form)
      await shopify.saveBar.hide(SAVE_BAR_ID)
    } catch (err) {
    }
  }

  const handleDiscard = async () => {
    setData(initialForm)
    await shopify.saveBar.hide(SAVE_BAR_ID)
  }

  useEffect(() => {
    if (!initialForm) return

    const isChanged = JSON.stringify(form) !== JSON.stringify(initialForm)

    if (isChanged) {
      shopify.saveBar.show(SAVE_BAR_ID)
    } else {
      shopify.saveBar.hide(SAVE_BAR_ID)
    }
  }, [form, initialForm])

  useEffect(() => {
    if (form && !initialForm) {
      setInitialForm(form)
    }
  }, [form, initialForm])

  const tabs = [
    { id: 'display', content: 'Display', contentJsx: <PopUpDisplaySetting form={form} updateFormKey={updateFormKey}/> },
    { id: 'triggers', content: 'Triggers', contentJsx: <PageRestriction form={form} updateFormKey={updateFormKey}/> },
  ]

  if (loading) return <LoadingSkeletonPage/>

  return (
    <Page title="Sale Pops settings" subtitle="Decide how your notifications will display"
          backAction={{ url: '/notifications' }}>
      <Layout>
        <Layout.Section>
          <Tabs tabs={tabs} selected={selectedTab} onSelect={handleTabChange}/>
          <Card>{tabs[selectedTab].contentJsx}</Card>
        </Layout.Section>
        <Layout.Section variant="oneThird">
          <SalePopsPreview settings={form}/>
        </Layout.Section>
      </Layout>

      <SaveBar id={SAVE_BAR_ID}>
        <button onClick={handleSave} variant={'primary'} loading={editing && ''}>Save</button>
        <button onClick={handleDiscard} disabled={editing}>Discard</button>
      </SaveBar>
    </Page>
  )
}
