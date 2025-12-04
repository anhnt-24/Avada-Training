import { Badge, Box, Layout, Loading, Page, Sticky, Tabs } from '@shopify/polaris'
import React, { useCallback, useEffect, useState } from 'react'
import { CustomeSkeletonPage } from '@assets/components/CustomeSkeletonPage/SkeletonPage'
import { ContentSideBar } from '@assets/components/AnnoucementBarComponents/ContentSideBar'
import { DesignSideBar } from '@assets/components/AnnoucementBarComponents/DesignSideBar'
import { AnnouncementBarSettingsDefault } from '@assets/const/annoucementBarSettingsDefault'
import useEditApi from '@assets/hooks/api/useEditApi'
import { useHistory, useParams } from 'react-router-dom'
import useFetchApi from '@assets/hooks/api/useFetchApi'
import useCreateApi from '@assets/hooks/api/useCreateApi'
import useDeleteApi from '@assets/hooks/api/useDeleteApi'
import ModalConfirmation from '@assets/components/ModalConfirmation/ModalConfirmation'
import AnnouncementBar from '@assets/components/AnnouncementBar/AnnouncementBar'
import { XIcon } from '@shopify/polaris-icons'
import AnnouncementCarousel from '@assets/components/AnnouncementCarousel/AnnouncementCarousel'
import { SaveBar, useAppBridge } from '@shopify/app-bridge-react'

export default function AnnouncementBarForm () {
  const shopify = useAppBridge()
  const SAVE_BAR_ID = 'save_announcement_bar_settings'
  const [initialSettings, setInitialSettings] = useState(null)
  const [selected, setSelected] = useState(0)
  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    [],
  )
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [duplicateModalOpen, setDuplicateModalOpen] = useState(false)

  const history = useHistory()
  const { id } = useParams()
  console.log(id)
  const isEdit = !!id
  const { data: form, setData: setForm, loading, fetched } = useFetchApi({
    url: `/announcements/${id}`,
    initLoad: isEdit,
    defaultData: AnnouncementBarSettingsDefault,
  })
  const { handleEdit, editing } = useEditApi({ url: `/announcements/${id}` })
  const { handleCreate, creating } = useCreateApi({ url: `/announcements`, fullResp: true })
  const { handleDelete } = useDeleteApi({ url: `/announcements` })
  const {
    handleEdit: togglePublish,
    editing: publishing
  } = useEditApi({ url: `/announcements/${id}/toggle-published` })
  useEffect(() => {
    if (!initialSettings && fetched) {
      setInitialSettings(form)
      return
    }
    const changed = JSON.stringify(form) !== JSON.stringify(initialSettings)
    if (changed) shopify.saveBar.show(SAVE_BAR_ID)
    else shopify.saveBar.hide(SAVE_BAR_ID)
  }, [form, initialSettings])

  const tabs = [
    {
      id: 'content',
      content: 'Content',
      accessibilityLabel: 'All customers',
      component: ContentSideBar
    },
    {
      id: 'design',
      content: 'Design',
      component: DesignSideBar

    },
    // {
    //   id: 'placement',
    //   content: 'Placement',
    //   component: PlacementSideBar
    // },
  ]
  const Component = tabs[selected].component

  const handleBackAction = async () => {
    await shopify.saveBar.leaveConfirmation()
    history.push('/announcements')
  }

  const handleSubmit = async () => {
    if (isEdit) {
      await handleEdit(form)
      setInitialSettings(form)
    } else {
      const res = await handleCreate(form)
      history.push(`/announcements/${encodeURIComponent(res.data.id)}`)
      setForm(res.data)
      setInitialSettings(res.data)
    }
  }
  const handleDiscard = async () => {
    setForm(initialSettings)
    await shopify.saveBar.hide(SAVE_BAR_ID)
  }

  const handleDuplicate = async () => {
    await handleBackAction()
    const { id, ...newForm } = form
    newForm.isPublished = false
    const res = await handleCreate(newForm)
    history.push(`/announcements/${encodeURIComponent(res.data.id)}`)
    setForm(res.data)

  }
  const handlePublish = async () => {
    try {
      if (!isEdit) {
        const newForm = { ...form, isPublished: true }
        const res = await handleCreate(newForm)
        history.push(`/announcements/${encodeURIComponent(res.data.id)}`)
        setForm(res.data)
        setInitialSettings(res.data)

      } else {
        await shopify.saveBar.leaveConfirmation()
        await togglePublish()
        setForm(form => ({ ...form, isPublished: !form.isPublished }))
        setInitialSettings(form => ({ ...form, isPublished: !form.isPublished }))

      }
    } catch (error) {}
  }
  const isUpdating = editing || creating || publishing
  const cardBackground =
    form.design.card.background.type === 'gradient'
      ? `linear-gradient(${form.design.card.background.angle}deg, ${form.design.card.background.colors.join(', ')})`
      : form.design.card.background.colors[0]
  if (loading) return <Loading></Loading>
  return (
    <Page title={`${form.content.name}`}
          backAction={{ content: 'Settings', onAction: handleBackAction }}
          subtitle={!isEdit ? 'Create and customize your announcement bar here' : `ID: ${id}`}
          primaryAction={{
            content: `${form.isPublished ? 'Unpublish' : 'Publish'}`,
            onAction: async () => await handlePublish(),
            destructive: form.isPublished,
            loading: isUpdating
          }}
          secondaryActions={isEdit && [
            {
              content: 'Duplicate',
              accessibilityLabel: 'Secondary action label',
              onAction: async () => setDuplicateModalOpen(true),
              disabled: isUpdating
            },
            {
              content: 'Delete',
              accessibilityLabel: 'Delete',
              onAction: () => {
                setDeleteModalOpen(true)
              },
              destructive: true,
              disabled: isUpdating
            },
          ]}
          titleMetadata={
            form.isPublished ? (
              <Badge tone="success" status="success">
                Published
              </Badge>
            ) : (
              <Badge tone="warning">
                Draft
              </Badge>
            )
          }
    >

      <ModalConfirmation
        onPrimaryAction={async () => {
          await shopify.saveBar.hide(SAVE_BAR_ID)
          await handleDelete({ id })
          history.push('/announcements')
        }}
        primaryBtnText={'Delete'}
        isOpen={deleteModalOpen}
        setIsOpen={setDeleteModalOpen}
        destructive={true}
      />
      <ModalConfirmation
        onPrimaryAction={handleDuplicate}
        primaryBtnText={'Duplicate'}
        isOpen={duplicateModalOpen}
        setIsOpen={setDuplicateModalOpen}
      />
      <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
      </Tabs>
      <Layout>
        <Layout.Section variant={'oneThird'}>
          <Component form={form} setForm={setForm}></Component>
        </Layout.Section>
        <Layout.Section>
          <Sticky>
            <Box
              position={'relative'}
              borderColor="border"
              borderWidth="025"
              background="bg-fill-active"
              shadow="100"
              borderRadius="400"
              borderStartStartRadius="0"
              borderStartEndRadius="0"
              paddingBlock="1000"
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  zIndex: 2,
                  background: cardBackground,
                  padding: '10px',
                  borderRadius: form.design.card.cornerRadius,
                  border: `${form.design.card.border.size}px solid ${form.design.card.border.color}`,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '12px'
                }}
              >
                {form.content.type === 'rotating' ?
                  <AnnouncementCarousel form={form}></AnnouncementCarousel>
                  :
                  <AnnouncementBar
                    form={form}
                  />
                }
                {form.content.closeIcon && (
                  <XIcon
                    width={form.design.closeIcon.size}
                    height={form.design.closeIcon.size}
                    fill={form.design.closeIcon.color}
                    style={{
                      width: `${form.design.closeIcon.size}px`,
                      height: `${form.design.closeIcon.size}px`,
                      color: form.design.closeIcon.color,
                      marginLeft: 'auto'
                    }}
                  />
                )}
              </div>
              <CustomeSkeletonPage/>
            </Box>
            <SaveBar id={SAVE_BAR_ID}>
              <button onClick={handleSubmit} variant={'primary'} loading={isUpdating && ''}>Save</button>
              <button onClick={handleDiscard} disabled={isUpdating}>Discard</button>
            </SaveBar>
          </Sticky>
        </Layout.Section>
      </Layout>
    </Page>

  )
}
