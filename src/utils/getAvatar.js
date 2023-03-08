import amyAvatar from '../images/avatars/image-amyrobson.png'
import juliusAvatar from '../images/avatars/image-juliusomo.png'
import maxAvatar from '../images/avatars/image-maxblagun.png'
import ramsesAvatar from '../images/avatars/image-ramsesmiron.png'

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
