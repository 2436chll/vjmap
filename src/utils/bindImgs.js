const imageContext = require.context('./../static/images', false, /\.(png|jpe?g|svg)$/)

const _img = imageContext.keys().reduce((_images, imagePath) => {
  const imageName = imagePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  _images[imageName] = imageContext(imagePath).default
  return _images
}, {})

export {
  _img
}