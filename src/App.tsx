import { useRef, useState } from 'react'
import axios from 'axios'

const API_BASE = 'https://www.fodownloader.com/csgeturl'

function App() {
  const [url, setUrl] = useState('')
  const divRef = useRef<HTMLDivElement>(null)


  const parse = () => {
    const encodeUrl = encodeURIComponent(url)
    const requestUrl = import.meta.env.PROD ? `${API_BASE}?urlInfo=${ encodeUrl }&lang=zh-cn`:`/api?urlInfo=${ encodeUrl }&lang=zh-cn`
    console.log(requestUrl)
    axios.get(requestUrl).then(res => {
      const { data } = res
      const wrapper = document.createElement('div')
      wrapper.innerHTML = data
      if (divRef.current) {
        divRef.current.innerHTML = ''
        divRef.current?.appendChild(wrapper)
      }
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
