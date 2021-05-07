//Convert yyyy-mm-dd format to dd.mm.yyyy
export default function convertData(data) {
    let dataArray = data.split("-");
    return dataArray[2]+"."+dataArray[1]+"."+dataArray[0];
}
