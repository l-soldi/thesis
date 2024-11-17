export const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0]
}

export const compareDateFormatter = (d: Date) => {
    d.setHours(0)
    d.setMinutes(0)
    d.setSeconds(0,0)
    return d.getTime()
}