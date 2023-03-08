export const getAvatar = (username) => {
  switch (username) {
    case 'amyrobson':
      return amyAvatar
    case 'juliusomo':
      return juliusAvatar
    case 'maxblagun':
      return maxAvatar
    case 'ramsesmiron':
      return ramsesAvatar
    default:
      return null
  }
}
