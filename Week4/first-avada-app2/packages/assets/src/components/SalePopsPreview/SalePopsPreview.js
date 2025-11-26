import { BlockStack, Box, Button, Card, Divider, Icon, InlineStack, Text } from '@shopify/polaris'
import { DesktopIcon, EyeCheckMarkIcon } from '@shopify/polaris-icons'
import NotificationPopup from '@assets/components/NotificationPopup/NotificationPopup'
import React, { useState } from 'react'
import './SalePopsPreviews.scss'
import PreviewDesktopModal from '@assets/components/PreviewDesktopModal/PreviewDesktopModal'

export default function SalePopsPreview ({ settings }) {
  const [isDesktopPreview, setIsDesktopPreview] = useState(false)
  return <Card>
    <BlockStack gap={'400'}>
      <InlineStack align={'space-between'}>
        <InlineStack gap={'100'} blockAlign={'center'}>
          <Icon source={EyeCheckMarkIcon}></Icon>
          <Text variant={'headingMd'} as={'h2'}>
            Preview</Text>
        </InlineStack>
        <Button icon={DesktopIcon} onClick={() => setIsDesktopPreview(true)}>
          Desktop</Button>
      </InlineStack>
      <Divider></Divider>
      <div className={'SalePops__Mobile-Preview'}>
        <Box borderWidth={'050'} borderRadius={'full'} padding={'050'}>
          <Box borderWidth={'100'} borderRadius={'full'}></Box>
        </Box>
        <div style={{ marginTop: 'auto' }}>
          <NotificationPopup settings={settings}></NotificationPopup>
        </div>
      </div>
      <PreviewDesktopModal isOpen={isDesktopPreview} onClose={() => setIsDesktopPreview(false)}
                           settings={settings}>
      </PreviewDesktopModal>
    </BlockStack>
  </Card>
}
