chrome.browserAction.onClicked.addListener(tab => {
  console.log('Browser Action Triggered')
	chrome.tabs.executeScript(tab.id, {
    file: 'entry.js'
	})
})

var host, iframehost;
const overrideFrameOptions = true;
chrome.storage.sync.get({baseUrl: ''}, (items) => {
  try{
    let uri = new URL(items.baseUrl);
    host = uri.hostname ? uri.hostname : '*';
    iframehost = uri.origin ? `${uri.origin}` : 'https://*/*';
  }catch(e){
    host = '*';
    iframehost = 'https://*/*';
  }

  chrome.webRequest.onHeadersReceived.addListener(details => {
    const responseHeaders = details.responseHeaders.map(header => {
      const isCSPHeader = /content-security-policy/i.test(header.name)
      const isFrameHeader = /x-frame-options/i.test(header.name)
  
      if (isCSPHeader) {
        let csp = header.value
  
        csp = csp.replace('script-src', `script-src ${host}`)
        csp = csp.replace('style-src', `style-src ${host}`)
        csp = csp.replace('frame-src', `frame-src ${iframehost}`)
        csp = csp.replace('child-src', `child-src ${host}`)
  
        if (overrideFrameOptions) {
          csp = csp.replace(/frame-ancestors (.*?);/ig, '')
        }
  
        header.value = csp
      } else if (isFrameHeader && overrideFrameOptions) {
        header.value = 'ALLOWALL'
      }
  
      return header
    })
  
    return { responseHeaders }
  }, {
    urls: ['http://*/*', 'https://*/*'],
    types : ['main_frame', 'sub_frame']
  }, ['blocking', 'responseHeaders'])
});

