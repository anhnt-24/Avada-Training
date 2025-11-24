import React from 'react'
import { FormLayout, Modal, TextField } from '@shopify/polaris'

function TodoModalForm ({ value, onChange }) {
    return (
        <Modal.Section>
            <FormLayout>
                <TextField label="Title" value={value} onChange={onChange} autoComplete="off"/>
            </FormLayout>
        </Modal.Section>
    )
}

export default TodoModalForm
