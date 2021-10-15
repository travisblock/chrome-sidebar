import { attachHeadersListener } from 'chrome-sidebar'
import { hosts, iframeHosts } from './settings'

console.log('Chrome Sidebar Extension Registered')

chrome.browserAction.onClicked.addListener(tab => {
  console.log('Browser Action Triggered')
	chrome.tabs.executeScript(tab.id, {
    file: 'entry.js'
	})
})

var xhost, xiframeHost;
chrome.storage.sync.get({baseUrl: ''}, (items) => {
  try{
    let uri = new URL(items.baseUrl);
    xhost = uri.hostname ? uri.hostname : hosts;
    xiframeHost = uri.origin ? uri.origin : iframeHosts;
  }catch(e){
    xhost = hosts;
    xiframeHost = iframeHosts;
  }

  attachHeadersListener({
    webRequest: chrome.webRequest,
    hosts: xhost,
    iframeHosts: xiframeHost,
    overrideFrameOptions: true
  })
});