import moment from 'moment'

export function timeFilter (date :string, format: string = 'YYYY. MM. DD.') {
  return moment(date).format(format)
}
