function strToArrayBuffer(str) {
  var buf = new ArrayBuffer(str.length * 2);
  var bufView = new Uint16Array(buf);
  for (var i = 0, strLen = str.length; i < strLen; i++) {
  bufView[i] = str.charCodeAt(i);
  }
  return buf;
  }
  function arrayBufferToString(buf) {
  return String.fromCharCode.apply(null, new Uint16Array(buf));
  }
  var algoKeyGen = {
  name: 'AES-GCM',
  length: 256
  };
  var iv = window.crypto.getRandomValues(new Uint8Array(12));
  var algoEncrypt = {
  name: 'AES-GCM',
  iv: iv,
  tagLength: 128
  };
  var keyUsages = [
  'encrypt',
  ];
  var plainText = 'This is a secure message from Mary';
  var secretKey;
  window.crypto.subtle.generateKey(algoKeyGen, false, keyUsages).then(function (key) {
  secretKey = key;
  return window.crypto.subtle.encrypt(algoEncrypt, key, strToArrayBuffer(plainText));
  }).then(function (cipherText) {
  console.log('Cipher Text: ' + arrayBufferToString(cipherText));
  }).catch (function (err) {
  console.log('Error: ' + err.message);
  });