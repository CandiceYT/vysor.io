function getWhitelist(e){chrome.storage.local.get("whitelist",function(n){var t={};if(!n.whitelist||n.whitelist.constructor.name!="Array"){e(t);return}$.each(n.whitelist,function(e,n){t[n]=true});e(t)})}function saveWhitelist(e,n){chrome.storage.local.set({whitelist:Object.keys(e)},n)}function addToWhitelist(e,n){getWhitelist(function(t){t[e]=true;saveWhitelist(t,n)})}function clearWhitelist(){chrome.storage.local.remove("whitelist")}function isWhitelisted(e,n){chrome.storage.local.get(["whitelist","openServer"],function(t){if(t.openServer){n(true);return}var o={};if(!t.whitelist||t.whitelist.constructor.name!="Array"){n(false);return}$.each(t.whitelist,function(e,n){o[n]=true});n(o[e])})}function getFriendlyNames(e){chrome.storage.sync.get("deviceFriendlyNames",function(n){n=n.deviceFriendlyNames||{};e(n)})}function setFriendlyName(e,n,t){getFriendlyNames(function(o){if(!n||!n.length)delete o[e];else o[e]=n;chrome.storage.sync.set({deviceFriendlyNames:o},function(){if(t)t(o)})})}function nextTick(e){setTimeout(e,0)}function make4Len16(e){var n=e.toString(16);while(n.length<4){n="0"+n}return n}var pendingFuncs;window.addEventListener("message",function(){if(pendingFuncs){$.each(pendingFuncs,function(e,n){n()});pendingFuncs=null}},false);function unsafeCallback(e){return e}function encode_utf8(e){return unescape(encodeURIComponent(e))}function decode_utf8(e){return decodeURIComponent(escape(e))}function ab2str(e){if(e.constructor.name=="ArrayBuffer"){e=new Uint8Array(e)}return decode_utf8(String.fromCharCode.apply(null,e))}function str2ab(e,n,t){e=encode_utf8(e);var o=e.length;if(t)o++;if(!n){n=new ArrayBuffer(o)}var i=new Uint8Array(n);if(t)i[e.length]=0;for(var r=0,a=e.length;r<a;r++){i[r]=e.charCodeAt(r)}return n}var slashN="\n".charCodeAt(0);function writeLine(e,n,t){if(n.constructor.name=="Object")n=JSON.stringify(n);writeString(e,n+"\n",t)}function readLine(e,n){var t=[];function o(){e.read(function(i){for(var r=0;r<i.byteLength;r++){if(i[r]==slashN){var a=i.subarray(0,r);t.push(a);var s="";for(var c in t){c=t[c];s+=ab2str(c)}var l=i.subarray(r+1);e.unshift(l);n(s);return}}t.push(i);o()})}o()}function readString(e,n){var t="";e.onClose=function(){n(t)};function o(n){t+=ab2str(n);e.read(o)}e.read(o)}function writeString(e,n,t){if(n.constructor.name=="Object")n=JSON.stringify(n);e.write(str2ab(n),t)}function appendBuffer(e,n){var t=new Uint8Array(e.byteLength+n.byteLength);t.set(e,0);t.set(n,e.byteLength);return t}var timeThing=(new Date).getTime();function timeTrace(e){var n=(new Date).getTime();console.log(e+": "+(n-timeThing));timeThing=n}function bufferToHex(e){var n=new Uint8Array(e);var t="";for(var o in n){o=n[o];if(o<16)t+="0"+o.toString(16);else t+=o.toString(16)}return t}function hexToBuffer(e){var n=new ArrayBuffer(e.length/2);var t=new Uint8Array(n);for(var o=0;o<e.length/2;o++){var i=e.substr(o*2,2);t[o]=parseInt(i,16)}return n}function base64ToArrayBuffer(e){var n=window.atob(e);var t=n.length;var o=new Uint8Array(t);for(var i=0;i<t;i++){var r=n.charCodeAt(i);o[i]=r}return o.buffer}function arrayBufferToBase64(e){var n="";var t=new Uint8Array(e);var o=t.byteLength;for(var i=0;i<o;i++){n+=String.fromCharCode(t[i])}return window.btoa(n)}var b64map="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";var b64pad="=";function hex2b64(e){var n;var t;var o="";for(n=0;n+3<=e.length;n+=3){t=parseInt(e.substring(n,n+3),16);o+=b64map.charAt(t>>6)+b64map.charAt(t&63)}if(n+1==e.length){t=parseInt(e.substring(n,n+1),16);o+=b64map.charAt(t<<2)}else if(n+2==e.length){t=parseInt(e.substring(n,n+2),16);o+=b64map.charAt(t>>2)+b64map.charAt((t&3)<<4)}while((o.length&3)>0){o+=b64pad}return o}if(!String.prototype.startsWith){Object.defineProperty(String.prototype,"startsWith",{enumerable:false,configurable:false,writable:false,value:function(e,n){n=n||0;return this.lastIndexOf(e,n)===n}})}function getQueryVariable(e,n){if(!n)n=window.location;var t=n.search.substring(1);var o=t.split("&");for(var i=0;i<o.length;i++){var r=o[i].split("=");if(decodeURIComponent(r[0])==e){return decodeURIComponent(r[1])}}}Object.fromArray=function(e){var n={};for(var t in e){var o=e[t];n[o]=o}return n};$.ajaxTransport("+binary",function(e,n,t){if(window.FormData&&(e.dataType&&e.dataType=="binary"||e.data&&(window.ArrayBuffer&&e.data instanceof ArrayBuffer||window.Blob&&e.data instanceof Blob))){return{send:function(n,t){var o=new XMLHttpRequest,i=e.url,r=e.type,a=e.async||true,s=e.responseType||"blob",c=e.data||null,l=e.username||null,u=e.password||null;o.addEventListener("load",function(){var n={};n[e.dataType]=o.response;t(o.status,o.statusText,n,o.getAllResponseHeaders())});o.open(r,i,a,l,u);for(var d in n){o.setRequestHeader(d,n[d])}o.responseType=s;o.send(c)},abort:function(){t.abort()}}}});function throttleTimeout(e,n,t,o){if(e){clearTimeout(e.timeout)}else{e={items:[]}}e.timeout=setTimeout(function(){o(e.items);e.items=[]},t);e.items.push(n);return e}function copyTextToClipboard(e){var n=document.createElement("textarea");n.style.position="fixed";n.style.top=0;n.style.left=0;n.style.width="2em";n.style.height="2em";n.style.padding=0;n.style.border="none";n.style.outline="none";n.style.boxShadow="none";n.style.background="transparent";n.value=e;document.body.appendChild(n);n.select();try{var t=document.execCommand("copy")}catch(o){console.log("Oops, unable to copy")}document.body.removeChild(n)}function showNotification(e,n){console.log("notification:",e);if(!window.chrome||!window.chrome.notifications)return;var t=chrome.runtime.getManifest();var o=t.name;n=n||t.icons[128];chrome.notifications.create({type:"basic",iconUrl:n,title:o,message:e})}var blobFromUrl=function(){var e={};return function(n,t){if(e[n]){t(e[n]);return}var o=new XMLHttpRequest;o.open("GET",n,true);o.responseType="blob";o.onload=function(o){t(e[n]=window.URL.createObjectURL(this.response))};o.send()}}();function Success(){}(function(){function*e(){}var n=e();n.constructor.prototype.async=function(){var e=this;var n=e.next();if(n.done)return;function t(){n=e.throw(new Error(arguments));i()}function o(){var t=arguments[0];n=e.next(t);i()}function i(i){var r;var a;if(n.done)return;if(!n.value){n=e.next(o);return}if(n.value.constructor==Promise){n.value.then(o).catch(t);return}if(n.value==Error){r=true;n=e.next(t)}else if(n.value==Success){a=true;n=e.next(o)}else{throw new Error("Unexpected yield value for callback. Only Error and Success allowed.")}if(!n.value)throw new Error("Double yield callbacks must explicitly define both Error and Success");if(n.value==Error&&r)throw new Error("Error callback already defined");else if(n.value==Success&&a)throw new Error("Success callback already defined");else if(n.value!=Error&&n.value!=Success)throw new Error("Unexpected yield value for callback. Only Error and Success allowed.");if(r)n=e.next(o);else n=e.next(t)}i()}})();function spewSocket(e){e.read(function(n){console.log(ab2str(n));spewSocket(e)})}function getAuthToken(e,n){chrome.identity.getAuthToken({interactive:e,scopes:["https://www.googleapis.com/auth/userinfo.profile","https://www.googleapis.com/auth/userinfo.email","https://www.googleapis.com/auth/chromewebstore.readonly"]},function(e){if(!e)console.error("unable to get authToken",chrome.runtime.lastError);n(e)})}(function(){function e(){chrome.usb.getUserSelectedDevices({multiple:true,filters:[{interfaceClass:255,interfaceSubclass:66,interfaceProtocol:1}]},function(e){$.each(e,function(e,n){var t=n.vendorId.toString(16)+":"+n.productId.toString(16);tracker.sendEvent("select-device",t);adbServer.refreshDevice(n,function(e){if(e){tracker.sendEvent("connect-device",e.properties["ro.product.name"],n.vendorId.toString(16)+":"+n.productId.toString(16),t)}else{var o=chrome.runtime.getManifest().name;chrome.notifications.create("reload",{type:"basic",iconUrl:"/icon.png",title:o,message:"An error occurred while connecting to the Android device. Restarting the Vysor app, or disconnecting and reconnecting the Android may resolve this issue.",buttons:[{title:"Reload"}]})}})})})}function n(){getAuthToken(false,function(e){if(licenseManager.isLicensed()&&!licenseManager.isLicenseCached()){$("#login-container").show();return}if(e||licenseManager.isLicenseCached())$("#login-container").hide();else $("#login-container").show()})}function t(){n();if(!licenseManager.isLicensed())return;$("#purchase").hide();$("#vysor-version").text("Vysor Pro Version "+chrome.runtime.getManifest().version);$(".navbar-brand").text("Vysor Pro")}function o(){if(!licenseManager.isLicensed())return;chrome.storage.local.get("bitrate",function(e){var n=$("#bitrate")[0];if(!n)return;n.selectedIndex=e.bitrate})}function i(e){var n=[5e5,75e4,1e6,15e5,2e6];var t=n[e];var o=chrome.app.window.getAll();for(var i in o){i=o[i];if(!i.contentWindow.sendEvent){console.log(i.id,"not a device window");continue}console.log(i.id,"updating device window");i.contentWindow.sendEvent({type:"bitrate",bitrate:t})}}function r(){chrome.app.window.create("screen.html",{id:"tutorial",bounds:{width:576,height:1024}},function(e){tracker.sendEvent("open-tutorial");e.contentWindow.openList=openList;e.contentWindow.onload=function(){e.contentWindow.docReady()}})}$(document).ready(function(){if(navigator.platform.toLowerCase().indexOf("win")==-1){$("#windows").hide()}licenseManager.globalRefresh=function(){o();t()};$("#logging-in").hide();$("#login-container").hide();$("#connect-android").click(e);$("#vysor-version").text("Vysor Version "+chrome.runtime.getManifest().version);$("#reload-vysor").click(function(){chrome.runtime.reload()});$("#share-all-check").change(function(){if(this.checked)startDeviceFarm();else stopDeviceFarm()});chrome.storage.local.get("connect-automatically",function(e){var n=e["connect-automatically"]!==false;$("#connect-automatically-check").prop("checked",n)});$("#bitrate").change(a("Image Quality",function(){i(this.selectedIndex);chrome.storage.local.set({bitrate:this.selectedIndex})},function(){this.selectedIndex=0}));$("#connect-automatically-check").change(function(){chrome.storage.local.set({"connect-automatically":this.checked})});$("#connect-android").hide();$("#tutorial").click(function(){r()});$("#purchase").click(function(){licenseManager.startPurchase()});chrome.storage.local.get("lastConnectAddress",function(e){if(e.lastConnectAddress)$("#connect-address")[0].value=e.lastConnectAddress});$("#connect-ok").click(function(){$("#connectModal").modal("hide");var e=$("#connect-address")[0].value;chrome.storage.local.set({lastConnectAddress:e});Adb.sendHostCommand("host:connect:"+e,function(e,n){if(!e)return;console.log("adb connect result",ab2str(n))})});$("#connect-cancel").click(function(){$("#connectModal").modal("hide")});$("#connect-network").click(function(){$("#connectModal").modal()});function n(){chrome.storage.local.get(["vysorUsage"],function(e){var n=e.vysorUsage;if(!n)n=0;var t=n/(60*60*1e3);t=Math.round(t*2)/2;console.log("hours used",t);$("#used").html("You've used Vysor for "+t+" hours. Support Vysor. Go Pro.")});setTimeout(n,60*60*1e3)}t();o();n()});function a(e,n,t){return function(){if(!licenseManager.isLicensed()){showModal({title:"Vysor Pro",body:"The "+e+" feature is only avaiable to Vysor Pro users.",okButton:"Upgrade",ok:function(){licenseManager.startPurchase()}});if(t)t.apply(this,arguments);return}n.apply(this,arguments)}}function s(e,n,t){var o=$("#renameModal");var i=o.find("#rename-ok");var r=o.find("#rename-cancel");var a=$("#new-display-name");getFriendlyNames(function(t){a.prop("value",t[e]||n)});i.unbind("click");r.unbind("click");function s(){$("#renameModal").modal("hide");var n=$(a).prop("value");setFriendlyName(e,n,t)}i.click(s);r.click(function(){$("#renameModal").modal("hide")});$("#renameModal").modal();$(a).unbind("focus");$(a).focus(function(){$(a).select()});$(a).unbind("keypress");$(a).bind("keypress",function(e){var n=e.which;if(n==13){s();return false}});setTimeout(function(){$(a).focus()},500)}function c(e,n,t,o,i,r,c,l,u){$("#share-all-check").prop("checked",l&&l.isListening("share"));if(Object.keys(e).length||!adbServer.isRunning())$("#not-found").hide();else $("#not-found").show();if(!u||adbServer.isRunning()){$("#connect-android").show();$("#no-devices").hide()}else{$("#connect-android").hide();$("#no-devices").show()}if(!u){if(navigator.userAgent.indexOf("Windows NT 10")!=-1&&adbPort==null){$("#adb-server-status").show();$("#adb-server-status").html("Windows 10 users MUST download the latest <a href='http://koush.com/post/universal-adb-driver' target='_blank'> Universal ADB Drivers</a>")}else{$("#adb-server-status").show();$("#adb-server-status").text("ADB not running. Click Find Devices to get started.")}}else{$("#adb-server-status").show();if(adbServer.isRunning()){$("#adb-server-status").text("Using built-in Vysor ADB.")}else{$("#adb-server-status").text("Using Android SDK ADB binary.")}}$.each($(".local-device"),function(n,t){if(!e[t.name])$(t).remove()});$("#farms-list").empty();var d=Object.keys(e);var f=Object.keys(t);if(!d.length){var h=$("#devices").find("#no-local-devices");if(!h.length){h=$('<a id="no-local-devices" href="https://www.youtube.com/watch?v=Ucs34BkfPB0&feature=youtu.be"><div class="alert alert-danger">No devices found. Make sure Android USB Debugging is enabled.</div></a>');$("#devices").append(h)}if(!u||adbServer.isRunning()){$("#choose-header").hide();h.hide()}}else{$("#no-local-devices").remove();$("#choose-header").show();$(d).each(function(t,u){if(n[u]&&n[u].farm)return;var d=e[u];var f=d.name;var h=i[u]||f;if(d.status=="unauthorized")h="Unauthorized";var v=$("#devices").find('.local-device[name="'+u+'"]');if(!v.length){v=$('<a class="list-group-item local-device"><button type="button" class="btn btn-sm wireless btn-default"><i class="fa fa-wifi" title="Go Wireless"></i></button><button type="button" class="btn btn-sm edit-name btn-default"><i class="fa fa-edit" title="Edit Name"></i></button><button type="button" class="btn btn-sm share btn-default">Share</button><button type="button" class="btn btn-sm btn-success">View</button><img class="avatar img-rounded"></img><h5 class="list-group-item-heading" id="display"></h5><p class="list-group-item-text" id="serialno"></p></a>');v[0].name=u;var m=v.find(".share");var g=v.find("img");g.click(function(e){e.stopPropagation();var n=o[u].userInfo;blobFromUrl(n.picture,function(e){shortModal("Vysor Share","Device in use by "+n.name)})});v.find(".edit-name").click(function(e){e.stopPropagation();s(u,f,function(e){updateFriendlyNames(e)})});v.find(".wireless").click(a("Go Wireless",function(e){e.stopPropagation();goWireless(u)},function(e){e.stopPropagation()}));if(n[u]){$(m).removeClass("btn-default").addClass("btn-danger");m.text("Disconnect");m.click(function(e){e.stopPropagation();disconnectSharedDevice(u)})}else{$(m).removeClass("btn-danger").addClass("btn-default");m.click(a("Vysor Share",function(e){e.stopPropagation();toggleShare(u)},function(e){e.stopPropagation()}))}v.click(function(){var n=e[u];if(n.status=="unauthorized"){shortModal(null,'Check your Android device and click "Allow USB Debugging".')}else{tracker.sendEvent("click-device",f);var t=c[u];if(t)closeWindow(t);openWindow(u)}});$("#devices").append(v)}var p=r[u];if(p&&e[p])v.hide();else v.show();var m=v.find(".share");var g=v.find("img");if(u.indexOf(":")!=-1)v.find(".wireless").hide();else v.find(".wireless").show();v.find("#display").text(h);v.find("#serialno").text("Serial: "+u);if(o[u]&&o[u].userInfo&&o[u].userInfo.picture){var b=o[u].userInfo;g.attr("alt","Device in use by "+b.name);blobFromUrl(b.picture,function(e){g.attr("src",e)});g.show()}else{g.hide()}if(!n[u]){if(o[u])m.text("Unshare");else m.text("Share")}if(!l)m.hide();else m.show()})}$(f).each(function(e,n){var o=n;var i=a;if(o=="117634581230601031713"){i=function(e,n){return n}}n=t[n];if(!n.devices)return;var r=Object.keys(n.devices);if(!r.length)return;var s=$("<h5 class='list-header'>"+n.info.name+"'s Shared Devices <button class='btn btn-danger btn-xs' style='float: right;' type='button'>Disconnect</button></h5>");s.find("button").click(function(){n.gcmConn.destroy()});$("#farms-list").append(s);s=$("<div id='farm-"+o+"' class='list-group'></div>");$("#farms-list").append(s);$(r).each(function(e,t){var o=n.devices[t];var r=o.name;var a=r;var c;if(n.gcmConn.gcmConns[t])c="Serial: "+n.gcmConn.gcmConns[t].serialno;else c="Remote Serial: "+t;var l=$('<a class="list-group-item"><button type="button" class="btn btn-sm connect"></button><button type="button" class="btn btn-sm btn-success">View</button><img class="avatar img-rounded"></img><h5 class="list-group-item-heading">'+a+'</h5><p class="list-group-item-text">'+c+"</p></a>");var u=l.find("img");if(n.sharedDevices&&n.sharedDevices[t]&&n.sharedDevices[t].userInfo){var d=n.sharedDevices[t].userInfo;u.attr("alt","Device in use by "+d.name);blobFromUrl(d.picture,function(e){u.attr("src",e)});u.click(function(e){e.stopPropagation();blobFromUrl(d.picture,function(e){shortModal("Vysor Share","Device in use by "+d.name)})})}else{u.hide()}if(n.gcmConn.gcmConns[t])l.find(".connect").text("Disconnect").addClass("btn-danger");else l.find(".connect").text("Connect").addClass("btn-default");function f(e){if(n.sharedDevices&&n.sharedDevices[t]&&n.sharedDevices[t].userInfo){if(n.sharedDevices[t].userInfo.id==myUserInfo.id){e();return}showModal({title:"Android In Use",body:"This Android is currently in use by "+d.name+". Do you want to boot them off?",okButton:"Connect Anyways",ok:e})}else{e()}}l.find(".connect").click(i("Vysor Share",function(e){e.stopPropagation();var o=n.gcmConn.gcmConns[t];if(o){o.destroy();l.find(".connect").text("Connect");closeWindow(o.serialno)}else{f(function(){l.find(".connect").text("Disconnect");createDeviceFarmConnection(n,t,function(e){quietSerial(e)})})}},function(e){e.stopPropagation()}));l.click(i("Vysor Share",function(e){f(function(){var e=n.gcmConn.gcmConns[t];if(e){openWindow(e.serialno)}else{l.find(".connect").text("Connect");createDeviceFarmConnection(n,t,function(e){openWindow(e)})}})},function(e){e.stopPropagation()}));s.append(l)});$("#farms-list").append(s)})}window.refreshList=c})();function showModal(e){var n=$("#notificationModal");var t=n.find("#modal-ok");var o=n.find("#modal-cancel");t.unbind("click");o.unbind("click");e.cancelButton=e.cancelButton||"Cancel";e.okButton=e.okButton||"OK";e.title=e.title||"";e.body=e.body||"";if(e.hideCancel)o.hide();else o.show();t.text(e.okButton);o.text(e.cancelButton);n.find("#modal-title").text(e.title);n.find("#modal-body").text(e.body);t.click(function(){if(e.ok)e.ok();$("#notificationModal").modal("hide")});if(e.cancel)e.click(e.cancel);$("#notificationModal").modal();if(e.duration){setTimeout(function(){$("#notificationModal").modal("hide")},e.duration)}}function shortModal(e,n){e=e||chrome.runtime.getManifest().name;showModal({title:e,body:n,duration:5e3,hideCancel:true})}function updateVysorShareServer(e){if(!e){$("#vysor-share-server-status").hide();$("#whitelist-count").hide()}else{$("#whitelist-count").show();getWhitelist(function(n){$("#whitelist-count a").text(Object.keys(n).length+" user(s) can access this server.").click(function(n){chrome.app.window.create("whitelist.html",{id:"whitelist",innerBounds:{width:768,height:512,minWidth:768,minHeight:512}},function(n){n.onClosed.addListener(function(){updateVysorShareServer(e)})})})});$("#vysor-share-server-status").show();$("#vysor-share-server-status").html("Vysor is sharing your devices: "+'<a href="#">'+e+"</a>");var n=$("#vysor-share-server-status a");n.click(function(){copyTextToClipboard(e);var n=chrome.runtime.getManifest().name;shortModal("Copied "+n+" Share Server URL to clipboard.",e)})}}