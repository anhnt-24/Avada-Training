import moment from 'moment'
import 'moment/locale/vi'

moment.locale('vi')

export default function formatRelativeTime (datetime) {
  const relativeTime = datetime.toDate()
  if (!datetime?.toDate) return null
  return moment(relativeTime).fromNow()
}
