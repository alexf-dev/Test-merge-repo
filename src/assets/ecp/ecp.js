var webSocket = null; //new WebSocket('wss://127.0.0.1:13579/');
var heartbeat_msg = '--heartbeat--';
var heartbeat_interval = null;
var missed_heartbeats = 0;
var missed_heartbeats_limit_min = 3;
var missed_heartbeats_limit_max = 50;
var missed_heartbeats_limit = missed_heartbeats_limit_min;
var keytype = "SIGN";
var callback = null;
var infosignXML = {
  storageAlias: '',
  storagePath: '',
  alias: '',
  storagePssw: ''
};
var arrsignXML = [];

//var rw = null;


function setMissedHeartbeatsLimitToMax() {
  missed_heartbeats_limit = missed_heartbeats_limit_max;
}

function setMissedHeartbeatsLimitToMin() {
  missed_heartbeats_limit = missed_heartbeats_limit_min;
}

function openDialog() {
  if (confirm("Ошибка при подключении к программному обеспечению NCALayer. Пожалуйста перезапустите программу. \n" +
    "Если на Вашем компьютере отсутствует программа NCALayer, Вы можете скачать актуальную версию ПО на сайте pki.gov.kz. \n" +
    "В случае проблем с установкой ПО просим обратиться к системным администраторам, обслуживающим ваши компьютеры. ") === true) {
    location.reload();
  }
}

function startLayer() {
  webSocket = new WebSocket('wss://127.0.0.1:13579/');

  webSocket.onopen = function (event) {
    if (heartbeat_interval === null) {
      missed_heartbeats = 0;
      heartbeat_interval = setInterval(pingLayer, 2000);
    }
    console.log("Connection opened");
  };

  webSocket.onclose = function (event) {
    if (event.wasClean) {
      console.log('connection has been closed');
    } else {
      console.log('Connection error');
      openDialog();
    }
  };

  webSocket.onmessage = function (event) {
    if (event.data === heartbeat_msg) {
      missed_heartbeats = 0;
      return;
    }

    var result = JSON.parse(event.data);

    var rw = {
      result: result['result'],
      secondResult: result['secondResult'],
      errorCode: result['errorCode'],
      getResult: function () {
        return this.result;
      },
      getSecondResult: function () {
        return this.secondResult;
      },
      getErrorCode: function () {
        return this.errorCode;
      }
    }
    if (callback) window[callback](rw);
    setMissedHeartbeatsLimitToMin();
  };
}

function stopLayer() {
  console.log('stopLayer');
  clearInterval(heartbeat_interval);
  heartbeat_interval = null;
  webSocket.close();
  webSocket = null;
}

function pingLayer() {
  console.log("pinging...");
  try {
    missed_heartbeats++;
    if (missed_heartbeats >= missed_heartbeats_limit)
      throw new Error("Too many missed heartbeats.");
    webSocket.send(heartbeat_msg);
  } catch (e) {
    clearInterval(heartbeat_interval);
    heartbeat_interval = null;
    console.warn("Closing connection. Reason: " + e.message);
    webSocket.close();
  }
}

function browseKeyStore(storageName, fileExtension, currentDirectory, callBack) {
  var vbrowseKeyStore = {
    "method": "browseKeyStore",
    "args": [storageName, fileExtension, currentDirectory]
  };
  callback = callBack;
  //TODO: CHECK CONNECTION
  setMissedHeartbeatsLimitToMax();
  webSocket.send(JSON.stringify(vbrowseKeyStore));
}

function checkNCAVersion(callBack) {
  var vcheckNCAVersion = {
    "method": "browseKeyStore",
    "args": [storageName, fileExtension, currentDirectory]
  };
  callback = callBack;
  //TODO: CHECK CONNECTION
  setMissedHeartbeatsLimitToMax();
  webSocket.send(JSON.stringify(vcheckNCAVersion));
}


function loadSlotList(storageName, callBack) {
  var vloadSlotList = {
    "method": "loadSlotList",
    "args": [storageName]
  };
  callback = callBack;
  setMissedHeartbeatsLimitToMax();
  webSocket.send(JSON.stringify(vloadSlotList));
}

function showFileChooser(fileExtension, currentDirectory, callBack) {
  var vshowFileChooser = {
    "method": "showFileChooser",
    "args": [fileExtension, currentDirectory]
  };
  callback = callBack;
  setMissedHeartbeatsLimitToMax();
  webSocket.send(JSON.stringify(vshowFileChooser));
}

function getKeys(storageName, storagePath, password, type, callBack) {
  var vgetKeys = {
    "method": "getKeys",
    "args": [storageName, storagePath, password, type]
  };
  callback = callBack;
  setMissedHeartbeatsLimitToMax();
  webSocket.send(JSON.stringify(vgetKeys));
}

function getNotAfter(storageName, storagePath, alias, password, callBack) {
  var vgetNotAfter = {
    "method": "getNotAfter",
    "args": [storageName, storagePath, alias, password]
  };
  callback = callBack;
  setMissedHeartbeatsLimitToMax();
  webSocket.send(JSON.stringify(vgetNotAfter));
}

function getNotBefore(storageName, storagePath, alias, password, callBack) {
  var vgetNotBefore = {
    "method": "getNotBefore",
    "args": [storageName, storagePath, alias, password]
  };
  callback = callBack;
  setMissedHeartbeatsLimitToMax();
  webSocket.send(JSON.stringify(vgetNotBefore));
}

function getSubjectDN(storageName, storagePath, alias, password, callBack) {
  var vgetSubjectDN = {
    "method": "getSubjectDN",
    "args": [storageName, storagePath, alias, password]
  };
  callback = callBack;
  setMissedHeartbeatsLimitToMax();
  webSocket.send(JSON.stringify(vgetSubjectDN));
}

function getIssuerDN(storageName, storagePath, alias, password, callBack) {
  var vgetIssuerDN = {
    "method": "getIssuerDN",
    "args": [storageName, storagePath, alias, password]
  };
  callback = callBack;
  setMissedHeartbeatsLimitToMax();
  webSocket.send(JSON.stringify(vgetIssuerDN));
}

function getRdnByOid(storageName, storagePath, alias, password, oid, oidIndex, callBack) {
  var vgetRdnByOid = {
    "method": "getRdnByOid",
    "args": [storageName, storagePath, alias, password, oid, oidIndex]
  };
  callback = callBack;
  setMissedHeartbeatsLimitToMax();
  webSocket.send(JSON.stringify(vgetRdnByOid));
}

function signPlainData(storageName, storagePath, alias, password, dataToSign, callBack) {
  var vsignPlainData = {
    "method": "signPlainData",
    "args": [storageName, storagePath, alias, password, dataToSign]
  };
  callback = callBack;
  setMissedHeartbeatsLimitToMax();
  webSocket.send(JSON.stringify(vsignPlainData));
}

function verifyPlainData(storageName, storagePath, alias, password, dataToVerify, base64EcodedSignature, callBack) {
  var vverifyPlainData = {
    "method": "verifyPlainData",
    "args": [storageName, storagePath, alias, password, dataToVerify, base64EcodedSignature]
  };
  callback = callBack;
  setMissedHeartbeatsLimitToMax();
  webSocket.send(JSON.stringify(vverifyPlainData));
}

function createCMSSignature(storageName, storagePath, alias, password, dataToSign, attached, callBack) {
  var vcreateCMSSignature = {
    "method": "createCMSSignature",
    "args": [storageName, storagePath, alias, password, dataToSign, attached]
  };
  callback = callBack;
  setMissedHeartbeatsLimitToMax();
  webSocket.send(JSON.stringify(vcreateCMSSignature));
}

function createCMSSignatureFromFile(storageName, storagePath, alias, password, filePath, attached, callBack) {
  var vcreateCMSSignatureFromFile = {
    "method": "createCMSSignatureFromFile",
    "args": [storageName, storagePath, alias, password, filePath, attached]
  };
  callback = callBack;
  setMissedHeartbeatsLimitToMax();
  webSocket.send(JSON.stringify(vcreateCMSSignatureFromFile));
}

function verifyCMSSignature(sigantureToVerify, signedData, callBack) {
  var vverifyCMSSignature = {
    "method": "verifyCMSSignature",
    "args": [sigantureToVerify, signedData]
  };
  callback = callBack;
  setMissedHeartbeatsLimitToMax();
  webSocket.send(JSON.stringify(vverifyCMSSignature));
}

function verifyCMSSignatureFromFile(signatureToVerify, filePath, callBack) {
  var vverifyCMSSignatureFromFile = {
    "method": "verifyCMSSignatureFromFile",
    "args": [signatureToVerify, filePath]
  };
  callback = callBack;
  setMissedHeartbeatsLimitToMax();
  webSocket.send(JSON.stringify(vverifyCMSSignatureFromFile));
}


function signXml(storageName, storagePath, alias, password, xmlToSign, callBack) {
  var vsignXml = {
    "method": "signXml",
    "args": [storageName, storagePath, alias, password, xmlToSign]
  };
  callback = callBack;
  setMissedHeartbeatsLimitToMax();
  webSocket.send(JSON.stringify(vsignXml));
}

function signXmlByElementId(storageName, storagePath, alias, password, xmlToSign, elementName, idAttrName, signatureParentElement, callBack) {
  var vsignXmlByElementId = {
    "method": "signXmlByElementId",
    "args": [storageName, storagePath, alias, password, xmlToSign, elementName, idAttrName, signatureParentElement]
  };
  callback = callBack;
  setMissedHeartbeatsLimitToMax();
  webSocket.send(JSON.stringify(vsignXmlByElementId));
}

function verifyXml(xmlSignature, callBack) {
  var vverifyXml = {
    "method": "verifyXml",
    "args": [xmlSignature]
  };
  callback = callBack;
  setMissedHeartbeatsLimitToMax();
  webSocket.send(JSON.stringify(vverifyXml));
}

function verifyXmlById(xmlSignature, xmlIdAttrName, signatureElement, callBack) {
  var vverifyXml = {
    "method": "verifyXml",
    "args": [xmlSignature, xmlIdAttrName, signatureElement]
  };
  callback = callBack;
  setMissedHeartbeatsLimitToMax();
  webSocket.send(JSON.stringify(vverifyXml));
}

function getHash(data, digestAlgName, callBack) {
  var vgetHash = {
    "method": "getHash",
    "args": [data, digestAlgName]
  };
  callback = callBack;
  setMissedHeartbeatsLimitToMax();
  webSocket.send(JSON.stringify(vgetHash));
}

function fNCAshowModal() {
  console.log('fNCAshowModal');
  $('#signDialog').load('/src/assets/ecp/ecp.html', function (responseTxt, statusTxt, xhr) {
    if (statusTxt == 'success') {
      console.log($('#mNCAsignXML'));

      $('#mNCAsignXML').modal();

      $('#mNCAsignXML').on('shown.bs.modal', function (e) {
        console.log('Open mNCAsignXML');
        startLayer();
      });

      $('#mNCAsignXML').on('hidden.bs.modal', function (e) {
        console.log('Close mNCAsignXML');
        stopLayer();
      });
    } else if (statusTxt == 'error')
      alert('Error: ' + xhr.status + ': ' + xhr.statusText);
  });
}

function fNCAcloseModal() {
  $('#imgLoading').prop('hidden', true);
  $('#mNCAsignXML').modal('hide');
}

function fNCAsignXML() {
  $('#btnSignXML').prop('disabled', true);
  $('#imgLoading').prop('hidden', false);
  window['saveSolutions']();
}

function fNCAsignXmlCall(strXML1, strXML2, strXML3, strXML4, strXML5, strXML6, strXML7) {
  if (strXML1 === null || strXML1 === undefined) strXML1 = '';
  if (strXML2 === null || strXML2 === undefined) strXML2 = '';
  if (strXML3 === null || strXML3 === undefined) strXML3 = '';
  if (strXML4 === null || strXML4 === undefined) strXML4 = '';
  if (strXML5 === null || strXML5 === undefined) strXML5 = '';
  if (strXML6 === null || strXML6 === undefined) strXML6 = '';
  if (strXML7 === null || strXML7 === undefined) strXML7 = '';
  var storageAlias = $("#storageAlias").val();
  var storagePath = $("#storagePath").val();
  var storagePssw = $("#storagePssw").val();
  var alias = $('#keyList').val();
  if (storagePath !== null && storagePath !== "" && storageAlias !== null && storageAlias !== "") {
    if (storagePssw !== null && storagePssw !== "") {
      if (alias !== null && alias !== "") {
        infosignXML.storageAlias = storageAlias;
        infosignXML.storagePath = storagePath;
        infosignXML.alias = alias;
        infosignXML.storagePssw = storagePssw;
        arrsignXML = [];
        arrsignXML.push({signed: false, xml: strXML1, signXML: ''});
        arrsignXML.push({signed: false, xml: strXML2, signXML: ''});
        arrsignXML.push({signed: false, xml: strXML3, signXML: ''});
        arrsignXML.push({signed: false, xml: strXML4, signXML: ''});
        arrsignXML.push({signed: false, xml: strXML5, signXML: ''});
        arrsignXML.push({signed: false, xml: strXML6, signXML: ''});
        arrsignXML.push({signed: false, xml: strXML7, signXML: ''});
        fNCAsignXmlRec();
      } else {
        alert("Вы не выбрали ключ!");
      }
    } else {
      alert("Введите пароль к хранилищу");
    }
  } else {
    alert("Не выбран хранилище!");
  }
}

function fNCAsignXmlRec() {
  console.log('fNCAsignXmlRec');
  var foundsignXML = arrsignXML.find(function (item) {
    return (!item.signed && item.xml !== '');
  });
  if (foundsignXML !== undefined) {
    var data = foundsignXML.xml;
    signXml(infosignXML.storageAlias, infosignXML.storagePath, infosignXML.alias, infosignXML.storagePssw, data, "fNCAsignXmlBack");
  } else {
    infosignXML = {storageAlias: '', storagePath: '', alias: '', storagePssw: ''};
    window['generatePDF'](arrsignXML[0].signXML, arrsignXML[1].signXML, arrsignXML[2].signXML, arrsignXML[3].signXML, arrsignXML[4].signXML, arrsignXML[5].signXML, arrsignXML[6].signXML);

  }
}

function fNCAsignXmlBack(result) {
  if (result['errorCode'] === "NONE") {
    var signedXML = result['result'];
    var foundsignXML = arrsignXML.find(function (item) {
      return (!item.signed && item.xml !== '');
    });
    if (foundsignXML !== undefined) {
      foundsignXML.signXML = signedXML;
      foundsignXML.signed = true;
    }
    fNCAsignXmlRec();
  }
  else {
    if (result['errorCode'] === "WRONG_PASSWORD" && result['result'] > -1) {
      alert("Неправильный пароль! Количество оставшихся попыток: " + result['result']);
    } else if (result['errorCode'] === "WRONG_PASSWORD") {
      alert("Неправильный пароль!");
    } else {
      alert(result['errorCode']);
    }
  }
}

function fNCAsetStoragePath() {
  var storageAlias = $('#storageAlias').val();
  var storagePath = $('#storagePath').val();
  if (storageAlias !== 'NONE') {
    browseKeyStore(storageAlias, 'P12', storagePath, 'fNCAsetStoragePathBack');
  } else {
    fNCArefreshVals();
  }
}

function fNCAsetStoragePathBack(rw) {
  var storagePath = $('#storagePath').val();
  if (rw.getErrorCode() === 'NONE') {
    storagePath = rw.getResult();
    if (storagePath !== undefined && storagePath !== null && storagePath !== '') {
      $('#storagePath').val(storagePath);
      $('#storagePssw').prop('readonly', false);
      $('#btnGetKeyList').prop('disabled', false);
      $('#messagetext').text('Введите пароль для хранилища!');
    } else {
      fNCArefreshVals();
    }
  } else {
    fNCArefreshVals();
  }
}

function fNCAgetKeyList() {
  var storageAlias = $('#storageAlias').val();
  var storagePath = $('#storagePath').val();
  var storagePssw = $('#storagePssw').val();
  var keyType = keytype;
  if (storagePath !== null && storagePath !== '' && storageAlias !== null && storageAlias !== '') {
    if (storagePssw !== null && storagePssw !== '') {
      getKeys(storageAlias, storagePath, storagePssw, keyType, 'fNCAgetKeyListBack');
    } else {
      alert('Введите пароль к хранилищу');
    }
  } else {
    alert('Не выбран хранилище!');
  }
}

function fNCAgetKeyListBack(result) {
  $('#keyList').html('');
  if (result['errorCode'] === 'NONE') {
    var list = result['result'];
    var slotListArr = list.split('\n');
    for (var i = 0; i < slotListArr.length; i++) {
      if (slotListArr[i] === null || slotListArr[i] === '') {
        continue;
      }
      var str = slotListArr[i];
      var alias = str.split('|')[3];
      $('#keyList').append($('<option>', {
        value: alias,
        text: str
      }));
    }
    $('#storagePssw').prop('readonly', true);
    $('#btnGetKeyList').prop('disabled', true);
    $('#messagetext').text('Выберите ключ!');
    fNCAgetKeyInfo();
  } else {
    if (result['errorCode'] === 'WRONG_PASSWORD' && result['result'] > -1) {
      alert('Неправильный пароль! Количество оставшихся попыток: ' + result['result']);
    } else if (result['errorCode'] === 'WRONG_PASSWORD') {
      alert('Неправильный пароль!');
    } else if (result['errorCode'] === 'EMPTY_KEY_LIST') {
      alert('Хранилище не содержить ключей для подписи!');
    } else {
      alert(result['errorCode']);
    }
  }
}

function fNCAgetKeyInfo() {
  var storageAlias = $('#storageAlias').val();
  var storagePath = $('#storagePath').val();
  var storagePssw = $('#storagePssw').val();
  var alias = $('#keyList').val();
  if (storagePath !== null && storagePath !== '' && storageAlias !== null && storageAlias !== '') {
    if (storagePssw !== null && storagePssw !== '') {
      if (alias !== null && alias !== '') {
        getSubjectDN(storageAlias, storagePath, alias, storagePssw, 'fNCAgetKeyInfoBack');
      } else {
        alert('Вы не выбрали ключ!');
      }
    } else {
      alert('Введите пароль к хранилищу');
    }
  } else {
    alert('Не выбран хранилище!');
  }
}

function fNCAgetKeyInfoBack(result) {
  if (result['errorCode'] === 'NONE') {
    var subjectDN = result['result'];
    var subjectAttrs = subjectDN.split(',');
    $('#sertIIN').val(fNCASubjectAttr(subjectAttrs, 'SERIALNUMBER').substr(3));
    $('#sertEMail').val(fNCASubjectAttr(subjectAttrs, 'E'));
    var cn = fNCASubjectAttr(subjectAttrs, 'CN');
    cn = cn || '';
    var middleName = fNCASubjectAttr(subjectAttrs, 'G');
    middleName = middleName || '';
    var fullName = cn.concat(' ').concat(middleName);
    $('#sertFIO').val(fullName);
    $('#sertBIN').val(fNCASubjectAttr(subjectAttrs, 'OU').substr(3));
    $('#sertORG').val(fNCASubjectAttr(subjectAttrs, 'O').replace(/\\/g, ''));
    getNotBeforeCall();
  } else {
    alert(result['errorCode']);
  }
}

function getNotBeforeCall() {
  var storageAlias = $('#storageAlias').val();
  var storagePath = $('#storagePath').val();
  var storagePssw = $('#storagePssw').val();
  var alias = $('#keyList').val();
  if (storagePath !== null && storagePath !== '' && storageAlias !== null && storageAlias !== '') {
    if (storagePssw !== null && storagePssw !== '') {
      if (alias !== null && alias !== '') {
        getNotBefore(storageAlias, storagePath, alias, storagePssw, 'getNotBeforeBack');
      } else {
        alert('Вы не выбран ключ!');
      }
    } else {
      alert('Введите пароль к хранилищу');
    }
  } else {
    alert('Не выбран хранилище!');
  }
}

function getNotBeforeBack(result) {
  if (result['errorCode'] === 'NONE') {
    $('#sertSrok').val(result['result']);
    getNotAfterCall();
  } else {
    if (result['errorCode'] === 'WRONG_PASSWORD' && result['result'] > -1) {
      alert('Неправильный пароль! Количество оставшихся попыток: ' + result['result']);
    } else if (result['errorCode'] === 'WRONG_PASSWORD') {
      alert('Неправильный пароль!');
    } else {
      alert(result['errorCode']);
    }
  }
}

function getNotAfterCall() {
  var storageAlias = $('#storageAlias').val();
  var storagePath = $('#storagePath').val();
  var storagePssw = $('#storagePssw').val();
  var alias = $('#keyList').val();
  if (storagePath !== null && storagePath !== '' && storageAlias !== null && storageAlias !== '') {
    if (storagePssw !== null && storagePssw !== '') {
      if (alias !== null && alias !== '') {
        getNotAfter(storageAlias, storagePath, alias, storagePssw, 'getNotAfterBack');
      } else {
        alert('Вы не выбрали ключ!');
      }
    } else {
      alert('Введите пароль к хранилищу');
    }
  } else {
    alert('Не выбран хранилище!');
  }
}

function getNotAfterBack(result) {
  if (result['errorCode'] === 'NONE') {
    var str = $('#sertSrok').val();
    $('#sertSrok').val(str.concat(' - ').concat(result['result']));
    $('#btnSignXML').prop('disabled', false);
    $('#messagetext').text('');
  } else {
    if (result['errorCode'] === 'WRONG_PASSWORD' && result['result'] > -1) {
      alert('Неправильный пароль! Количество оставшихся попыток: ' + result['result']);
    } else if (result['errorCode'] === 'WRONG_PASSWORD') {
      alert('Неправильный пароль!');
    } else {
      alert(result['errorCode']);
    }
  }
}

function fNCASubjectAttr(attrs, attr) {
  var tmp;
  var numb;
  for (numb = 0; numb < attrs.length; numb++) {
    tmp = attrs[numb];
    if (tmp.indexOf(attr + '=') === 0) {
      return tmp.substr(attr.length + 1);
    }
  }
  return null;
}

function fNCArefreshVals() {
  $('#btnSignXML').prop('disabled', true);
  $('#imgLoading').prop('hidden', true);
  $('#storageAlias').val('NONE');
  $('#storageAlias').attr('selectedIndex', 0);
  $('#storagePath').val('');
  $('#storagePssw').prop('readonly', true);
  $('#storagePssw').val('');
  $('#btnGetKeyList').prop('disabled', true);
  $('#keyList').html('');
  $('#keyList').prop('readonly', true);
  $('#sertIIN').val('');
  $('#sertEMail').val('');
  $('#sertFIO').val('');
  $('#sertBIN').val('');
  $('#sertORG').val('');
  $('#sertSrok').val('');
  $('#messagetext').text('Выберите тип хранилища ключа!');
}

