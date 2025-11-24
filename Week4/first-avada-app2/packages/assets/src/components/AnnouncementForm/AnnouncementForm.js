import { BlockStack, Box, Button, Text, TextField } from '@shopify/polaris'

export default function AnnouncementForm ({ form, setForm }) {
  const data = form.content

  const addAnnouncement = () => {
    setForm(prev => ({
      ...prev,
      content: {
        ...prev.content,
        announcements: [...(prev.content.announcements || []), { title: '', subheading: '' }]
      }
    }))
  }

  const updateAnnouncement = (index, key, value) => {
    const newAnnouncements = [...form.content.announcements]
    newAnnouncements[index][key] = value
    setForm(prev => ({
      ...prev,
      content: {
        ...prev.content,
        announcements: newAnnouncements
      }
    }))
  }

  return (
    <div>
      {form.content.type === 'rotating' ? (
          <Box>
            {form.content.announcements?.map((announcement, index) => (
              <div key={index} style={{ marginBottom: '10px' }}>
                <Text variant={'headingMd'}>Announcements #{index}</Text>
                <BlockStack gap={'400'}>
                  <TextField
                    label={`Title`}
                    value={announcement.title}
                    onChange={(value) => updateAnnouncement(index, 'title', value)}
                  />
                  <TextField
                    label={`Subheading`}
                    value={announcement.subheading}
                    onChange={(value) => updateAnnouncement(index, 'subheading', value)}
                  />
                </BlockStack>

              </div>
            ))}

            <Button onClick={addAnnouncement} primary>
              Add Announcement
            </Button>
          </Box>
        )
        : <>
          <TextField
            label="Title"
            value={data.title}
            onChange={(value) =>
              setForm(prev => ({
                ...prev,
                content: { ...prev.content, title: value }
              }))
            }
            autoComplete="off"
          />

          <TextField
            label="Subheading"
            value={data.subheading}
            onChange={(value) =>
              setForm(prev => ({
                ...prev,
                content: { ...prev.content, subheading: value }
              }))
            }
            autoComplete="off"
          />

        </>

      }
    </div>
  )
}
