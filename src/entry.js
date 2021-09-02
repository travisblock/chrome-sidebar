import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import { Frame } from 'chrome-sidebar'
import { url } from './settings'

if (Frame.isReady()) {
  Frame.toggle();
} else {
  boot()
}


function App() {
  const [person, setPerson] = useState('')
  const iframeRef = useRef(null);
  useEffect(() => {

    function getContactName() {
      document.querySelectorAll('#pane-side div._3uIPm.WYyr1 div').forEach(function(el) {
        el.addEventListener('click', function(e) {
          let contactname = document.evaluate('//*[@id="main"]/header/div[2]/div[1]/div/span', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE).singleNodeValue;
          setPerson(contactname.innerHTML)
        })
      })

      iframeRef.current.props.url = `${url}/?contact=${person}`
    }

    getContactName()
  }, [person])
  return (
    <Frame ref={iframeRef} url={`${url}/?contact=`} />
  )
}

function boot() {
  const root = document.createElement('div')
  document.body.appendChild(root)
  ReactDOM.render(<App />, root)
}
