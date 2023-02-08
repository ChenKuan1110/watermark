import { useRef, useState } from 'react'
import axios from 'axios'


function App() {
  const [url, setUrl] = useState('')
  const divRef = useRef<HTMLDivElement>(null)


  const parse = () => {
    // 1. 验证
    if (!/h5.pipix.com/.test(url)) {
      setUrl('')
    }
    const encodeUrl = encodeURIComponent(url)
    const requestUrl = `/api?urlInfo=${ encodeUrl }&lang=zh-cn`
    console.log(requestUrl)
    axios.get(requestUrl).then(res => {
      const { data } = res
      const wrapper = document.createElement('div')
      wrapper.innerHTML = data
      divRef.current?.appendChild(wrapper)
    })
  }

  return (
    <div className="App">
      <h1>视频水印去除</h1>
      <input
        type="text" value={url}
        placeholder="请输入视频分享链接"
        onChange={(e) => {
          setUrl(e.target.value)
        }}
      />
      <button className='btn-clear' onClick={() => {
        setUrl('')
        if (divRef.current instanceof HTMLElement) {
          divRef.current.innerHTML = ''
        }
      }}>清除</button>
      <button className='btn-resolve' onClick={parse}>解析</button>
      <div className="tips">
        PS: 灵感来源: <span className="href">https://www.fodownloader.com/</span>
      </div>
      <div className="wrapper" ref={divRef}></div>
    </div>
  )
}

export default App
