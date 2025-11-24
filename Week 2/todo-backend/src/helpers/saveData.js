import fs from 'fs'

function saveData (data, path) {
    try {
        fs.writeFileSync(path, JSON.stringify(data, null, 2), 'utf8')
    } catch (error) {
        console.error(`Error saving file ${path}:`, error.message)
    }
}

export default saveData