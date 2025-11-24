import { Modal } from '@shopify/polaris'

export default function ModalConfirmation ({
  isOpen,
  setIsOpen,
  onPrimaryAction,
  label = 'Confirm Action',
  content = 'Are you sure you want to perform this action?',
  primaryBtnText = 'Delete',
  destructive = false,
  secondaryBtnText = 'Cancel'
}) {
  return (
    <Modal
      open={isOpen}
      onClose={() => setIsOpen(false)}
      title={label}
      primaryAction={{
        content: primaryBtnText,
        destructive: destructive,
        onAction: () => {
          if (onPrimaryAction) onPrimaryAction()
          setIsOpen(false)
        },
      }}
      secondaryActions={[
        {
          content: secondaryBtnText,
          onAction: () => setIsOpen(false),
        },
      ]}
    >
      <Modal.Section>{content}</Modal.Section>
    </Modal>
  )
}
