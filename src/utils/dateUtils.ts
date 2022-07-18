import dayjs, { Dayjs } from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat.js"

dayjs.extend(customParseFormat)

export const generateNewCardDate = () => formatDate(dayjs().add(5, 'year'))

export const formatDate = (date: Dayjs) => date.format('MM/YY')

export const parseDate = (date: string) => {
    
    const parsedDate = dayjs(date, 'MM/YY', true).valueOf()
    if(isNaN(parsedDate)) throw "Erro!"

    return parsedDate
}

export const isOutdated = (date: string) => parseDate(date) - dayjs().valueOf() <= 0