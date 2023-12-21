const generatePlayerId = () => {
  return 'xxxx-xxxx-xxxx-xxxx'.replace(/[x]/g, (c) => {
    const r = (Math.random() * 16) | 0
    return r.toString(16)
  })
}

export const getPlayerId = () => {
  let id = sessionStorage.getItem('playerId')
  if (!id) {
    id = generatePlayerId()
    sessionStorage.setItem('playerId', id)
  }
  return id
}
