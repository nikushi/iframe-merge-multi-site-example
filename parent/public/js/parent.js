{
  const messageHandlers = {
    PageHeight: (data) => {
      // iframe の height を調整
      let elm = window.document.getElementById('proxy-iframe')
      elm.style.height = `${data.height}px`
    },
    PageMove: (data) => { window.location.href = data.href },
    PageDOMContentLoaded: (_data) => { window.document.getElementById('proxy-iframe').style.visibility = 'visible' },
  }

  window.addEventListener('message', (event) => {
    console.log('[parent] message received', event)

    /*
    // On development environment webpack-dev-server sends message, so skip message from it.
    if (/^https?:\/\/(localhost|127.0.0.1)/.test(event.origin)) return

    // Verify received message from for security manner of postMessage() API,
    const originRe = /child URL regexp/
    if (event.origin.search(originRe) === -1) {
      console.log('Blocked the message from ' + event.origin)
      return
    }
    */

    const data = JSON.parse(event.data)
    if (data.type === null) throw new Error('[parent] Message received, but no type specified')
    if (!messageHandlers.hasOwnProperty(data.type)) {
      throw new Error(`[parent] Message received, but type "${data.type}" is invalid`)
    }
    messageHandlers[data.type](data.data)
  })
}
