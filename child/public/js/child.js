{
  const postMessage = (type, data) => {
    const rawData = JSON.stringify({type: type, data: data})
    window.parent.postMessage(rawData, '*')
  }
  // iframe内でレンダリングされた場合にのみ発火させる
  if (window !== window.parent) {
    window.addEventListener('load', () => {
      // 子の高さを親に伝え、親の iframe の heigit を変更
      postMessage('PageHeight', {height: document.body.scrollHeight})
    }, false)
  }
}
