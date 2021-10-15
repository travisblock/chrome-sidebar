function save_options() {
    var url = document.getElementById('url').value;
    var param = document.getElementById('parameter').value;
    chrome.storage.sync.set({
      baseUrl: url,
      paramName: param
    }, function() {
      var status = document.getElementById('status');
      status.textContent = 'Options saved.';
      setTimeout(function() {
        status.textContent = '';
      }, 750);
    });
}

function restore_options() {
    chrome.storage.sync.get({
        baseUrl: '',
        paramName: 'name'
    }, function(items) {
        document.getElementById('url').value = items.baseUrl;
        document.getElementById('parameter').value = items.paramName;
    });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);