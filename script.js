var userHeader = document.getElementById("userHeader");
var nameButton = document.getElementById("nameButton");
var nameInput = document.getElementById("nameInput");
var messages = document.getElementById("messages");
var text = document.getElementById("text");
var textSubmit = document.getElementById("textSubmit");

var nameUser = "User name";
userHeader.innerHTML = nameUser;

nameButton.onclick = function() {
    nameUser = nameInput.value || "User Name";
    userHeader.innerText = nameUser;
}

var ajaxRequest = function(options) {
    let url = options.url || '/';
    let method = options.method || 'GET';
    let callback = options.callback || function () { };
    let data = options.data || {};
    let xmlHttp = new XMLHttpRequest();

    xmlHttp.open(method, url, true);
    xmlHttp.setRequestHeader('Content-Type', 'application/json');
    xmlHttp.send(JSON.stringify(data));

    xmlHttp.onreadystatechange = () => {
      if (xmlHttp.status == 200 && xmlHttp.readyState === 4) {
        callback(xmlHttp.responseText);
      }
    };
  };

textSubmit.onclick = function(){
    var data = {
        name: nameUser,
        text: text.value
    };

    text.value = "";

    ajaxRequest({
        method: 'POST',
        url: '/messages',
        data: data
    })
}

  var getData = function() {
    ajaxRequest({
      url: '/messages',
      method: 'GET',
      callback: (msg) => {
        msg = JSON.parse(msg);
        console.log(msg);
        messages.innerHTML = '';
        for (var i in msg) {
          if (msg.hasOwnProperty(i)) {
            var el = document.createElement("li");	         
            el.innerText = `${msg[i].name}: ${msg[i].text}`;	
            messages.appendChild(el); 
          }
        }
      }
    });
  };

getData();

setInterval(function() {
    getData()
}, 5000);