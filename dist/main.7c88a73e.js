// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"epB2":[function(require,module,exports) {
var $siteList = $('.siteList');
var $listLi = $siteList.find('li.last');
var x = localStorage.getItem('x');
var xObject = JSON.parse(x);
var hashMap = xObject || [{
  logo: 'A',
  url: 'https://www.acfun.com'
}, {
  logo: 'B',
  url: 'https://www.bilibili.com'
}];

var jianhua = function jianhua(url) {
  return url.replace('https://', '').replace('http://', '').replace('www.', '').replace(/\/.*/, '');
};

var render = function render() {
  //找到siteList里面的所有项  但要忽略last
  $siteList.find('li:not(.last)').remove();
  hashMap.forEach(function (node, index) {
    var $li = $("\n        <li>\n                <div class=\"site\">\n                    <div class=\"logo\">".concat(node.logo[0], "</div>\n                    <div class=\"link\">").concat(jianhua(node.url), "</div>\n                    <div class=\"close\">\n                        <svg class=\"icon\">\n                             <use xlink:href=\"#icon-close\"></use>\n                        </svg>\n                    </div>\n                </div>\n        </li>")).insertBefore($listLi);
    $li.on('click', function () {
      window.open(node.url);
    });
    $li.on('click', '.close', function (e) {
      e.stopPropagation();
      hashMap.splice(index, 1);
      render();
    });
  });
};

render(); //第一步 得到网址  把他插在添加按钮的前面   但是

$('.addButton').on('click', function () {
  var url = window.prompt("请问你要添加什么网址？");

  if (url.indexOf('http') !== 0) {
    url = 'https://' + url;
  } //找
  //const $siteList = $('.siteList')  放上面
  //在siteList里面找去li.last
  //const $listLi = $siteList.find('li.last')
  //生成网址卡片后  插到listLi前面


  hashMap.push({
    logo: jianhua(url)[0].toUpperCase(),
    url: url
  });
  render(); //     const $li = $(`
  //             <li>
  //                 <a href="${node.url}">
  //                     <div class="site">
  //                         <div class="logo">${node.url[0]}</div>
  //                         <div class="link">${node.url}</div>
  //                     </div>
  //                 </a>
  //             </li>
  //     `).insertBefore($listLi)
}); //js用户关闭网页之前出发什么window.onbeforeunload     走之前要存一下hasMap   存在那里呢ocalStorage 只能存字符串  

window.onbeforeunload = function () {
  var string = JSON.stringify(hashMap); //在本地的存储里面设置x 他的值就是 string

  localStorage.setItem('x', string);
}; //键盘事件


$(document).on('keypress', function (e) {
  var key = e.key;

  for (var i = 0; i < hashMap.length; i++) {
    if (hashMap[i].logo.toLowerCase() === key) {
      window.open(hashMap[i].url);
    }
  }
});
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.7c88a73e.js.map