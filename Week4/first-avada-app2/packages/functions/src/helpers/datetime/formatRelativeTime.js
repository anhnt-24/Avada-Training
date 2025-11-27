import moment from 'moment'

moment.locale('en')

export default function formatRelativeTime (datetime) {
  const relativeTime = datetime.toDate()
  if (!datetime?.toDate) return null
  return moment(relativeTime).fromNow()
}
