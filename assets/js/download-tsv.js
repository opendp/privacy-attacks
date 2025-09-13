function flatten(obj, parent, result = {}){
    for(let key in obj){
        let propName = parent ? `${parent}.${key}` : key;
        if (obj[key] && typeof obj[key] === 'object' && !Array.isArray(obj[key])){
            flatten(obj[key], propName, result);
        } else {
            result[propName] = String(obj[key] ?? '').replaceAll(/\s+/g, ' ');
        }
    }
    return result;
}

function setTsvHref(id, records) {
    // records may be an object keyed by filenames, either mapping to {deployment: {...}} or to flat objects
    const values = Object.values(records);
    const details = values.map((entry) => entry && entry.deployment ? entry.deployment : entry);
    const rows = details.map((detail) => flatten(detail));
    const columns = Array.from(
        rows.map((row) => new Set(Object.keys(row)))
            .reduce((unionOfKeys, currentKeys) => unionOfKeys.union(currentKeys), new Set())
    );
    const tsv = columns.join("\t") + "\n" + rows.map((row) => columns.map((col) => row[col] ?? '').join("\t")).join("\n");
    const tsvBlob = new Blob([tsv], {type: "text/tab-separated-values"});
    const tsvUrl = URL.createObjectURL(tsvBlob);
    document.getElementById(id).setAttribute("href", tsvUrl);
}

window.addEventListener("load", () => {
    // eslint-disable-next-line no-undef
    const data = window.deployments || (typeof attacks !== 'undefined' ? attacks : {});
    setTsvHref("download-tsv", data);
});
