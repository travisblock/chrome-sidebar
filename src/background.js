import { attachHeadersListener } from 'chrome-sidebar'
import { hosts, iframeHosts } from './settings'

console.log('Chrome Sidebar Extension Registered')

chrome.browserAction.onClicked.addListener(tab => {
  console.log('Browser Action Triggered')
  chrome.storage.sync.get(['key'], function(result) {
    console.log('URL currently is ' + result.key);
  });
	// for the current tab, inject the "inject.js" file & execute it
	chrome.tabs.executeScript(tab.id, {
    file: 'entry.js'
	})
})

attachHeadersListener({
  webRequest: chrome.webRequest,
  hosts,
  iframeHosts,
  overrideFrameOptions: true
})
chrome.storage.sync.get(['key'], function(result) {
  console.log('Value currently is ' + result.key);
});