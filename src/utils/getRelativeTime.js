export const getRelativeTime = (date) => {
  const now = new Date()
  const diff = now.getTime() - date
  const diffInMinutes = Math.floor(diff / 1000 / 60)
  const diffInHours = Math.floor(diffInMinutes / 60)
  const diffInDays = Math.floor(diffInHours / 24)
  const diffInMonths = Math.floor(diffInDays / 30)
  const diffInYears = Math.floor(diffInMonths / 12)

  if (diffInMinutes < 1) {
    return 'Just now'
  }
  if (diffInHours < 1) {
    return `${diffInMinutes} minutes ago`
  }
  if (diffInDays < 1) {
    return `${diffInHours} hours ago`
  }
  if (diffInMonths < 1) {
    return `${diffInDays} days ago`
  }
  if (diffInYears < 1) {
    return `${diffInMonths} months ago`
  }
  return `${date}`
}
