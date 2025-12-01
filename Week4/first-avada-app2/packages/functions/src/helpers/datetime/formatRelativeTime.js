import moment from 'moment'

moment.locale('en')
/**
 *
 * @param datetime
 * @returns {string|null}
 */
export default function formatRelativeTime (datetime) {
  const relativeTime = datetime.toDate()
  if (!datetime?.toDate) return null
  return moment(relativeTime).fromNow()
}
