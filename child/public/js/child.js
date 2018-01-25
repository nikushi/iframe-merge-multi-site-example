'use strict'

{
  const parentUrlBase = 'http://localhost:4000'
  const childUrlBase = 'http://localhost:5000'

  const postMessage = (type, data) => {
    const rawData = JSON.stringify({type: type, data: data})
    window.parent.postMessage(rawData, '*')
  }

  const parseUrl = function (url) {
    let parser = document.createElement('a');
    parser.href = url
    return parser
  }

  const getPathFromUrl = function (url) {
    const parser = parseUrl(url)
    return parser.pathname.replace(/^\/+/, '') + parser.search + parser.hash
  }

  const getProxyUrl = (url) => {
    return `${parentUrlBase}/proxy?path=${encodeURIComponent(getPathFromUrl(url))}`
  }

  const clickEventHandler = function (mouseEvent) {
    // shift, ctrl押しながら新しいウィンドウやタブで開く場合はその動作をさせる
    if (mouseEvent.ctrlKey ||
      mouseEvent.shiftKey ||
      mouseEvent.metaKey || // Mac
      (mouseEvent.button && mouseEvent.button === 1) // middle click
    ) return

    mouseEvent.preventDefault()
    postMessage('PageMove', {href: this.href})
  }

  const applyAdditionalCss = function () {
    const style = document.createElement('link')
    style.rel = 'stylesheet'
    style.href = '/css/child.css'
    document.getElementsByTagName('head')[0].appendChild(style)
  }

  const setClickEventHandler = () => {
    const regexp = new RegExp(`^${childUrlBase}`)
    document.querySelectorAll('a').forEach(function (elm) {
      if (regexp.test(elm.href)) { // 内部URL
        elm.href = getProxyUrl(elm.href)

        elm.addEventListener('click', clickEventHandler, false)
      } else { // 外部サイトURL は target="_blank" を強制。iframe内では開かせない
        elm.setAttribute('target', '_blank')
      }
    })
  }

  const replaceHref = () => {
    const regexp = new RegExp(`^${childUrlBase}`)
    document.querySelectorAll('a').forEach(function (elm) {
      if (regexp.test(elm.href)) { // 内部URL
        elm.href = getProxyUrl(elm.href)
      }
    })
  }

  // iframe内でレンダリングされた場合にのみ発火させる
  if (window !== window.parent) {
    window.addEventListener('DOMContentLoaded', () => {
      applyAdditionalCss()
      setClickEventHandler()
      replaceHref()

      // CORS の都合か 親側だけで iframe の load を検知できないので
      // 子iframeのload完了を親に伝える。
      postMessage('PageDOMContentLoaded', {})
    }, false)

    window.addEventListener('load', () => {
      // 子の高さを親に伝え、親の iframe の heigit を変更
      postMessage('PageHeight', {height: document.body.scrollHeight})
    }, false)
  }
}
