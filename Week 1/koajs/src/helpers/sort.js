function sort(data, options = {}) {
    const { limit = -1, sort = '' } = options;

    let sortedData = [...data];

    const sortKey = 'createdAt';
    if(sort.toLocaleLowerCase() == 'desc' || sort.toLocaleLowerCase() === 'asc') sortedData.sort((a, b) => {
        let valA = a[sortKey];
        let valB = b[sortKey];

        if (Date.parse(valA) && Date.parse(valB)) {
            valA = new Date(valA);
            valB = new Date(valB);
        }

        if (!isNaN(valA) && !isNaN(valB)) {
            valA = Number(valA);
            valB = Number(valB);
        }

        if (valA < valB) return sort === 'asc' ? -1 : 1;
        if (valA > valB) return sort === 'asc' ? 1 : -1;
        return 0;
    });

    if (limit > 0) {
        sortedData = sortedData.slice(0, limit);
    }

    return sortedData;
}

export default sort;
