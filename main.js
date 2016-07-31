var toml = require('toml')
var json2toml = require('json2toml')

var app = {}

app.tomlEl = function() {
  return document.getElementById('toml-src')
}

app.jsonEl = function() {
  return document.getElementById('json-src')
}

app.errEl = function() {
  return document.getElementById('err-box')
}

app.convertT2J = function() {
  try {
    var t = app.tomlEl().value
    var o = toml.parse(t)
    var j = JSON.stringify(o, null, 2)
    app.jsonEl().value = j
    app.showErr(null)
  } catch (err) {
    app.showErr(err)
  }
}

app.convertJ2T = function() {
  try {
    var j = app.jsonEl().value
    var o = JSON.parse(j)
    var t = json2toml(o)
    app.tomlEl().value = t
    app.showErr(null)
  } catch (err) {
    app.showErr(err)
  }
}

app.showErr = function(err) {
  var el = app.errEl()
  if (err == null) {
    el.className = ''
    el.innerText = ''
  } else {
    el.className = 'highlighted'
    el.innerText = '' + err
  }
}

app.registerHandlers = function() {
  app.tomlEl().onkeyup = app.tomlEl().onchange = function(e) {
    if (document.activeElement != this)
      return // only process this function if active

    app.convertT2J()
  }

  app.jsonEl().onkeyup = app.jsonEl().onchange = function(e) {
    if (document.activeElement != this)
      return // only process this function if active

    app.convertJ2T()
  }
}

app.main = function() {
  app.registerHandlers()
}

document.addEventListener('DOMContentLoaded', app.main)
