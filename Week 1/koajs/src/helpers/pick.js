function pick (obj = {}, fields = []) {
    return Object.fromEntries(
        fields.map((field) => [field, obj[field]])
    )
}

export default pick
