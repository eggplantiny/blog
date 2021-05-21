import moment from 'moment'

export function timeFilter (date :string, format: string = 'YYYY년 MM월 DD일') {
  return moment(date).format(format)
}
