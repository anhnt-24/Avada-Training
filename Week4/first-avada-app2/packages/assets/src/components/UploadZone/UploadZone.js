import { DropZone, LegacyStack, Text } from '@shopify/polaris'

const acceptableCSVFileTypes = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, .csv'
export default function UploadZone ({ file, setFile }) {
  const handleDropZoneDrop = (
    (_dropFiles, acceptedFiles, _rejectedFiles) => {
      const csvFile = acceptedFiles.find(f => f.type === 'text/csv')
      setFile(csvFile)
    }

  )

  const fileUpload = !file && <DropZone.FileUpload actionHint="Accepts .csv only"/>

  const uploadedFileDisplay = file && (
    <LegacyStack alignment="center">
      <div>
        <Text variant="bodyMd" as="p">
          {file.name}
        </Text>
        <Text variant="bodySm" as="p">
          {file.size} bytes
        </Text>
      </div>
    </LegacyStack>
  )

  return (
    <DropZone
      allowMultiple={false}
      type={'file'}
      onDrop={handleDropZoneDrop}
      accept={acceptableCSVFileTypes}
      variableHeight
      
    >
      {uploadedFileDisplay}
      {fileUpload}
    </DropZone>
  )
}
