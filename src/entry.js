import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import { Frame } from 'chrome-sidebar'

if (Frame.isReady()) {
  Frame.toggle();
} else {
  boot()
}


function App() {
  const [person, setPerson] = useState('');
  const [host, setHost] = useState(() => chrome.storage.sync.get({baseUrl: 'https://7he61.csb.app', paramName: 'contact'}, (items) => items.baseUrl));
  const [param, setParam] = useState(() => chrome.storage.sync.get({baseUrl: 'https://7he61.csb.app', paramName: 'contact'}, (items) => items.paramName));
  const iframeRef = useRef(null);

  useEffect(() => {
    function getContactName() {
      document.querySelectorAll('#pane-side div._3uIPm.WYyr1 div').forEach(function(el) {
        el.addEventListener('click', function(e) {
          let contactname = document.evaluate('//*[@id="main"]/header/div[2]/div[1]/div/span', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE).singleNodeValue;
          setPerson(contactname.innerHTML)
        })
      })

      iframeRef.current.props.url = `${host}?${param}=${person}`
    }

    chrome.storage.sync.get({baseUrl: 'https://7he61.csb.app', paramName: 'contact'}, (items) => {
      setHost(items.baseUrl);
      setParam(items.paramName);
    });
    
    getContactName()
  }, [person])
  
  return (
    <Frame containerStyle={{ maxWidth: '425px' }} ref={iframeRef} url={`${host}?${param}=`} />
  )
}

function boot() {
  const root = document.createElement('div')
  document.body.appendChild(root)
  ReactDOM.render(<App />, root)
}
