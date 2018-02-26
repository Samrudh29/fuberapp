
var ajax = (function () {
  function makeCall(method, url, data, successFunction, errorFunction) {
    var xhttp;
    if (window.XMLHttpRequest) {
      xhttp = new XMLHttpRequest();
    } else {
      xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhttp.onreadystatechange = function () {
      if (this.readyState == 4) {
        if (this.status == 200)
          successFunction(this.responseText);
        else
          errorFunction(this.responseText);
      }
    };
    xhttp.open(method, url, true);
    if (data) {
      xhttp.setRequestHeader("Content-type", "application/json");
      xhttp.send(data);
    } else
      xhttp.send();
  }

  function getMethod(url) {
    const promise = new Promise(function (resolve, reject) {
      makeCall("GET", url, undefined, function (data) { resolve(data); }, function (data) { reject(data); });
    });
    return promise;
  }

  function deleteMethod(url) {
    const promise = new Promise(function (resolve, reject) {
      makeCall("DELETE", url, undefined, function (data) { resolve(data); }, function (data) { reject(data); });
    });
    return promise;
  }

  function postMethod(url, sendData) {
    const promise = new Promise(function (resolve, reject) {
      makeCall("POST", url, sendData, function (data) { resolve(data); }, function (data) { reject(data); });
    });
    return promise;
  }

  return {
    get: getMethod,
    post: postMethod,
    delete: deleteMethod
  }
})();


function addOrUpdateTaxi() {
  var taxi = {
    id: document.getElementById('taxiNumber').value,
    pink: document.getElementById('pink').checked,
    longitude: document.getElementById('longitude').value,
    latitdue: document.getElementById('latitude').value
  };

  if (!taxi.id) {
    alert("Please provide taxinumber.");
    return;
  }

  ajax.post('/api/taxi', JSON.stringify(taxi))
    .then(function (data) {
      resetTaxiForm();
      getTaxis();
    })
    .catch(function (err) {
      alert('Error : ' + err);
    });
}

var taxis = {};
function getTaxis() {
  ajax.get('/api/taxi').then(function (data) {
    taxis = JSON.parse(data);
    renderTaxis();
  });
}

function renderTaxis() {
  var text = '';
  for (var each in taxis) {
    text += ('<tr class="' + (taxis[each].pink ? 'pinkRow' : '') + '">' +
      '<td><span class="tButton" onclick="editTaxi(\'' + each + '\')">E</span><span class="tButton" onclick="deleteTaxi(\'' + each + '\')">D</span></td>' +
      '<td>' + taxis[each].id + '</td>' +
      '<td>(' + taxis[each].longitude + ', ' + taxis[each].latitdue + ')</td>' +
      '<td>' + (taxis[each].pink ? 'YES' : 'NO') + '</td>' +
      '<td>' + (taxis[each].reservedAt ? new Date(taxis[each].reservedAt) : '') + '</td>' +
      '</tr>');
  }
  document.getElementById('taxiList').innerHTML = text;
}

function editTaxi(id) {
  var taxiNumber = document.getElementById('taxiNumber');
  taxiNumber.disabled = true;
  taxiNumber.value = id;
  document.getElementById('pink').checked = taxis[id].pink;
  document.getElementById('longitude').value = taxis[id].longitude;
  document.getElementById('latitude').value = taxis[id].latitdue;
}

function deleteTaxi(id) {
  ajax.delete('/api/taxi/' + id).then(function (data) {
    taxis = JSON.parse(data);
    renderTaxis();
  });
}

function resetTaxiForm() {
  var taxiNumber = document.getElementById('taxiNumber');
  taxiNumber.disabled = false;
  taxiNumber.value = "";
  document.getElementById('pink').checked = false;
  document.getElementById('longitude').value = "";
  document.getElementById('latitude').value = "";
}

getTaxis();