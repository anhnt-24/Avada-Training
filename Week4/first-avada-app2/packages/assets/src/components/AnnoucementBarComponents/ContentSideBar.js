import React from 'react'
import { BlockStack, Box, Button, Card, Checkbox, ChoiceList, Divider, Text, TextField } from '@shopify/polaris'
import {
  ANNOUNCEMENT_TYPE_OPTIONS,
  CTA_TYPE_OPTIONS,
  SCHEDULE_OPTIONS
} from '@assets/const/annoucementBarSettingsDefault'
import AnnouncementForm from '@assets/components/AnnouncementForm/AnnouncementForm'

export function ContentSideBar ({ form, setForm }) {
  const data = form.content

  return (
    <Card>
      <BlockStack gap="400">
        <Text variant="headingMd" as="h2">Announcement</Text>
        <ChoiceList
          choices={ANNOUNCEMENT_TYPE_OPTIONS}
          selected={[data.type]}
          onChange={(value) => setForm(prev => ({
            ...prev,
            content: { ...prev.content, type: value[0] }
          }))}
        />

        <Divider/>
        <Text variant="headingMd" as="h2">Announcement content</Text>
        <TextField
          label="Announcement name"
          value={data.name}
          onChange={(value) => setForm(prev => ({
            ...prev,
            content: { ...prev.content, name: value }
          }))}
          autoComplete="off"
          helpText="Only visible to you. For your own internal reference."
        />
        <AnnouncementForm form={form} setForm={setForm}></AnnouncementForm>
        <Divider/>
        <Checkbox
          label="Close icon"
          checked={data.closeIcon}
          onChange={(value) => setForm(prev => ({
            ...prev,
            content: { ...prev.content, closeIcon: value }
          }))}
        />

        <Divider/>
        <Text variant="headingMd" as="h2">Call To Action</Text>
        <ChoiceList
          choices={CTA_TYPE_OPTIONS}
          selected={[data.cta.type]}
          onChange={(value) => setForm(prev => ({
            ...prev,
            content: { ...prev.content, cta: { ...prev.content.cta, type: value[0] } }
          }))}
        />

        {data.cta.type !== 'none' && (
          <>
            <TextField
              label="Text Button"
              value={data.cta.textBtn}
              onChange={(value) => setForm(prev => ({
                ...prev,
                content: { ...prev.content, cta: { ...prev.content.cta, textBtn: value } }
              }))}
              autoComplete="off"
            />

            <TextField
              label="Link"
              value={data.cta.link}
              onChange={(value) => setForm(prev => ({
                ...prev,
                content: { ...prev.content, cta: { ...prev.content.cta, link: value } }
              }))}
              autoComplete="off"
            />
          </>
        )}

        <Divider/>
        <Text variant="headingMd" as="h2">Scheduling</Text>
        <Box>
          <ChoiceList
            title="Starts"
            choices={SCHEDULE_OPTIONS}
            selected={[data.schedule.startOption]}
            onChange={(value) => setForm(prev => ({
              ...prev,
              content: { ...prev.content, schedule: { ...prev.content.schedule, startOption: value[0] } }
            }))}
          />
          {data.schedule.startOption === 'specific' && (
            <TextField
              type="datetime-local"
              value={data.schedule.startDate || ''}
              onChange={(value) => setForm(prev => ({
                ...prev,
                content: { ...prev.content, schedule: { ...prev.content.schedule, startDate: value } }
              }))}
              autoComplete="off"
            />
          )}
        </Box>

        <Box>
          <ChoiceList
            title="Ends"
            choices={[{ label: 'Never', value: 'never' }, { label: 'Specific date', value: 'specific' }]}
            selected={[data.schedule.endOption]}
            onChange={(value) => setForm(prev => ({
              ...prev,
              content: { ...prev.content, schedule: { ...prev.content.schedule, endOption: value[0] } }
            }))}
          />
          {data.schedule.endOption === 'specific' && (
            <TextField
              type="datetime-local"
              value={data.schedule.endDate || ''}
              onChange={(value) => setForm(prev => ({
                ...prev,
                content: { ...prev.content, schedule: { ...prev.content.schedule, endDate: value } }
              }))}
              autoComplete="off"
            />
          )}
        </Box>

        <Button variant="primary">Continue to Design</Button>
      </BlockStack>
    </Card>
  )
}
