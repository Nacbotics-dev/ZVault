import { formatDistanceToNow } from "date-fns";


export const getFormValues = () =>{
    let formData = {}
    const formElem = document.querySelector('form')
    let inputElements = formElem.querySelectorAll('input')
    inputElements.forEach((input,)=>{
        formData[input.name] = input.value
    })

    return(formData)
}

export function convertToDecimals(assetAmount, assetDecimal) {
    return assetAmount * Math.pow(10, assetDecimal);
}

export function convertToUnit(assetAmount, assetDecimal) {
    return assetAmount / Math.pow(10, assetDecimal);
}

export function timeAgoDetailed(unixTimestamp) {
    unixTimestamp = parseInt(unixTimestamp)
    const date = new Date(unixTimestamp*1000);
    return formatDistanceToNow(date,{ addSuffix: true });
  }