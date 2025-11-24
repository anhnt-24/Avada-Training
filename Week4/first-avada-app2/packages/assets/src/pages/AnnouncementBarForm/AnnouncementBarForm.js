import { Badge, Banner, Box, Button, Layout, Loading, Page, Sticky, Tabs } from '@shopify/polaris'
import React, { useCallback, useState } from 'react'
import { CustomeSkeletonPage } from '@assets/components/CustomeSkeletonPage/SkeletonPage'
import { PlacementSideBar } from '@assets/components/AnnoucementBarComponents/PlacementSideBar'
import { ContentSideBar } from '@assets/components/AnnoucementBarComponents/ContentSideBar'
import { DesignSideBar } from '@assets/components/AnnoucementBarComponents/DesignSideBar'
import { AnnouncementBarSettingsDefault } from '@assets/const/annoucementBarSettingsDefault'
import useEditApi from '@assets/hooks/api/useEditApi'
import { useHistory, useParams } from 'react-router-dom'
import useFetchApi from '@assets/hooks/api/useFetchApi'
import useCreateApi from '@assets/hooks/api/useCreateApi'
import useDeleteApi from '@assets/hooks/api/useDeleteApi'
import ModalConfirmation from '@assets/components/DeleteAnnouncementModal/DeleteAnnouncementModal'
import '../../components/AnnouncementBar/AnnoucementBar.scss'
import AnnouncementBar from '@assets/components/AnnouncementBar/AnnouncementBar'
import { XIcon } from '@shopify/polaris-icons'
import AnnouncementCarousel from '@assets/components/AnnouncementCarousel/AnnouncementCarousel'

export default function AnnouncementBarForm () {
  const [selected, setSelected] = useState(0)
  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    [],
  )
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [duplicateModalOpen, setDuplicateModalOpen] = useState(false)

  const history = useHistory()
  const { id } = useParams()
  const isEdit = !!id
  const { data: form, setData: setForm, fetched, loading, } = useFetchApi({
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

  const tabs = [
    {
      id: 'content',
      content: 'Content',
      accessibilityLabel: 'All customers',
      component: <ContentSideBar/>
    },
    {
      id: 'design',
      content: 'Design',
      component: DesignSideBar

    },
    {
      id: 'placement',
      content: 'Placement',
      component: PlacementSideBar
    },
  ]
  const Component = tabs[selected].component
  const handleSubmit = async () => {
    if (isEdit) await handleEdit(form)
    else {
      const res = await handleCreate(form)
      history.push(`/announcements/${res.data.id}`)
      setForm(res.data)
    }
  }
  const handleDuplicate = async () => {
    const { id, ...newForm } = form
    newForm.isPublished = false
    const res = await handleCreate(newForm)
    history.push(`/announcements/${res.data.id}`)
    setForm(res.data)
  }
  const handlePublish = async () => {
    try {
      if (!isEdit) {
        const newForm = { ...form, isPublished: true }
        const res = await handleCreate(newForm)
        history.push(`/announcements/${res.data.id}`)
        setForm(res.data)
      } else {
        await togglePublish()
        setForm(form => ({ ...form, isPublished: !form.isPublished }))
      }
    } catch (error) {}
  }
  const isUpdating = editing || creating || publishing
  const isTop = form.design.position.value === 'top'
  const isBottom = form.design.position.value === 'bottom'

  const cardBackground =
    form.design.card.background.type === 'gradient'
      ? `linear-gradient(${form.design.card.background.angle}deg, ${form.design.card.background.colors.join(', ')})`
      : form.design.card.background.colors[0]
  if (loading) return <Loading></Loading>
  return (
    <Page title={`${form.content.name}`}
          backAction={{ content: 'Settings', url: '/announcements' }}
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
              onAction: async () => setDuplicateModalOpen(true)
            },
            {
              content: 'Delete',
              accessibilityLabel: 'Delete',
              onAction: () => {
                setDeleteModalOpen(true)
              },
              destructive: true
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
      <Banner
        tone="warning"
        title="Essential Announcement Bar app is not activated yet"
        action={{ content: 'Activate' }}
        secondaryAction={{ content: 'I have done it' }}
        dismissible
      >
        <p>
          Please activate the app by clicking 'Activate' button and then 'Save' in the following page.
        </p>
      </Banner>
      <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
      </Tabs>
      <Layout>
        <Layout.Section variant={'oneThird'}>
          <Component form={form} setForm={setForm}></Component>
        </Layout.Section>
        <Layout.Section>
          <Sticky>
            <Box
              paddingBlock={'2000'}
              position={'relative'}
              borderColor="border"
              borderWidth="025"
              background="bg-fill-active"
              shadow="100"
              borderRadius="400"
              borderStartStartRadius="0"
              borderStartEndRadius="0"
              paddingBlockEnd="400"
            >
              <div
                style={{
                  position: 'absolute',
                  top: isTop ? 0 : undefined,
                  bottom: isBottom ? 0 : undefined,
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
                      color: form.decsign.closeIcon.color,
                      marginLeft: 'auto'
                    }}
                  />
                )}
              </div>
              <CustomeSkeletonPage/>
            </Box>
            <Box align={'end'} style={{ marginTop: '16px' }}>
              <Button variant={'primary'} onClick={handleSubmit} loading={isUpdating}>Save</Button>
            </Box>
          </Sticky>


        </Layout.Section>

      </Layout>
    </Page>

  )
}
