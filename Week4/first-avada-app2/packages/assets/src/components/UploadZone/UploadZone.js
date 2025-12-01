import { DropZone, LegacyStack, Text, Thumbnail } from '@shopify/polaris'
import { NoteIcon } from '@shopify/polaris-icons'
import { useCallback, useState } from 'react'

export default function UploadZone () {
  const [files, setFiles] = useState([])

  const handleDropZoneDrop = useCallback(
    (_dropFiles, acceptedFiles, _rejectedFiles) =>
      setFiles((files) => [...files, ...acceptedFiles]),
    [],
  )

  const validImageTypes = ['image/gif', 'image/jpeg', 'image/png']

  const fileUpload = !files.length && (
    <DropZone.FileUpload actionHint="Accepts .csv only"/>
  )

  const uploadedFiles = files.length > 0 && (
    <LegacyStack vertical>
      {files.map((file, index) => (
        <LegacyStack alignment="center" key={index}>
          <Thumbnail
            size="small"
            alt={file.name}
            source={
              validImageTypes.includes(file.type)
                ? window.URL.createObjectURL(file)
                : NoteIcon
            }
          />
          <div>
            {file.name}{' '}
            <Text variant="bodySm" as="p">
              {file.size} bytes
            </Text>
          </div>
        </LegacyStack>
      ))}
    </LegacyStack>
  )

  return (
    <DropZone allowMultiple={false} onDrop={handleDropZoneDrop} variableHeight>
      {uploadedFiles}
      {fileUpload}
    </DropZone>
  )
}
