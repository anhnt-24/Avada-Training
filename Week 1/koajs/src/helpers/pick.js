function pick(obj = {}, fields = []) {
    const result = {};

    for (const field of fields) {
        const path = field.split('.');
        let value = obj;

        for (const part of path) {
            if (value == null || typeof value !== 'object' || !(part in value)) {
                value = undefined;
                break;
            }
            value = value[part];
        }

        if (value !== undefined) {
            setDeep(result, path, value);
        }
    }

    return result;
}

function setDeep(obj, path, value) {
    let current = obj;
    for (let i = 0; i < path.length; i++) {
        const part = path[i];
        if (i === path.length - 1) {
            current[part] = value;
        } else {
            if (!current[part] || typeof current[part] !== 'object') {
                current[part] = {};
            }
            current = current[part];
        }
    }
}

export default pick;
