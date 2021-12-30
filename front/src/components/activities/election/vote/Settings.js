



export const sortByValueASC = (array = [], valueKey = "") => {
    const objectsValStore  = [];
    array.forEach((el, index) => {
        objectsValStore.push({len: el[valueKey], id: index, element: el});
    });
    const keyPick = objectsValStore.sort((a, b) => a.len < b.len);
    const keyPickb = objectsValStore.sort((a, b) => a.len > b.len);

    console.log("A=> ", keyPick)
    console.log("B=> ", keyPickb)

    if(keyPick && keyPick[0]) {
        return keyPick;
    } else return new Array(0);
}