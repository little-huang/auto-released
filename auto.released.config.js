module.exports = {
  git: {
    checkClean: true,
    push: true,
    tag: true
  },
  npm: {
    build: true,
    publish: true,
    buildCommand: 'npm run build',
  },
  webhook: {
    enabled: false,
    url: '',
    body: {}
  },
}
