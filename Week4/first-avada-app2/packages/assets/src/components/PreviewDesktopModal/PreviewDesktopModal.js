import { Box, Modal } from '@shopify/polaris'
import NotificationPopup from '@assets/components/NotificationPopup/NotificationPopup'

export default function PreviewDesktopModal ({ isOpen, onClose, settings }) {

  const getBoxPosition = (pos) => {
    const style = {
      position: 'absolute',
      zIndex: 9999,
    }
    style.bottom = pos.includes('bottom') ? '10px' : 'auto'
    style.top = pos.includes('top') ? '10px' : 'auto'
    style.left = pos.includes('left') ? '10px' : 'auto'
    style.right = pos.includes('right') ? '10px' : 'auto'

    return style
  }
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      title="Desktop Preview"
      primaryAction={{
        content: 'Close',
        onAction: onClose,
      }}
      size="large"
    >
      <Modal.Section>
        <div style={{ position: 'relative', height: '500px' }}>
          <Box style={getBoxPosition(settings.position)}>
            <NotificationPopup settings={settings}/>
          </Box>
        </div>
      </Modal.Section>
    </Modal>
  )
}
