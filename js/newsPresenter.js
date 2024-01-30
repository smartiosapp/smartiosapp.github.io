var Presenter = {
	makeDocument: function(resource) {
		if (!Presenter.parser) {
			Presenter.parser = new DOMParser();
		}
		var doc = Presenter.parser.parseFromString(resource, "application/xml");
		return doc;
	},

	modalDialogPresenter: function(xml) {
		navigationDocument.presentModal(xml);
	},

	pushDocument: function(xml) {
		navigationDocument.pushDocument(xml);
	},

	load: function(event) {
        function geniLink() {
            return 'https://mobileapp.i-cable.com/iCableMobile/API/api.php?appVersion=1.0.6&channel_no=_9&deviceModel=iPad&deviceName=iPad&deviceToken=&hkid='+makeMobile()+'&is_premium=0&method=streamingGenerator&network=wifi&osVersion=11.0.3&platform=4&quality=l&type=live&uuid='+makeUUID();
        }
        function gennnLink() {
            return 'https://webtvapi.now.com/10/7/getLiveURL';
//            return 'https://hkt-mobile-api.nowtv.now.com/09/1/getLiveURL';
        }
        function makeMobile() {
            return '9'+makedigit(7);
        }
        function makeUUID() {
            return makehex(8)+"-"+makehex(4)+"-"+makehex(4)+"-"+makehex(4)+"-"+makehex(12);
        }
        function wdeviceID() {
            return "W-"+makehex(8)+"-"+makehex(4)+"-"+makehex(4)+"-"+makehex(4)+"-"+makehex(8);
        }
        function wtimestamp() {
//            return (new Date()).getTime();
            return "W" + Date.now() + (Math.floor(900 * (1 + Math.random())) + 100)
        }
        function makedigit(length) {
            var result           = '';
            var characters       = '0123456789';
            var charactersLength = characters.length;
            for ( var i = 0; i < length; i++ ) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
        }
        function makehex(length) {
            var result           = '';
            var characters       = 'ABCDE0123456789';
            var charactersLength = characters.length;
            for ( var i = 0; i < length; i++ ) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
        }
        function getParameterByName(name, url) {
            if (!url) url = window.location.href;
            name = name.replace(/[\[\]]/g, '\\$&');
            var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, ' '));
        }
        function getDomain(url, subdomain) {
            subdomain = subdomain || false;

            url = url.replace(/(https?:\/\/)?(www.)?/i, '');

            if (!subdomain) {
                url = url.split('.');

                url = url.slice(url.length - 2).join('.');
            }

            if (url.indexOf('/') !== -1) {
                return url.split('/')[0];
            }

            return url;
        }
		var nntoken = "";
		function base64DecodeUint8Array(input) {
			var raw = window.atob(input);
			var rawLength = raw.length;
			var array = new Uint8Array(new ArrayBuffer(rawLength));
			
			for(i = 0; i < rawLength; i++)
				array[i] = raw.charCodeAt(i);
			
			return array;
		}
		function base64EncodeUint8Array(input) {
			var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
			var output = "";
			var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
			var i = 0;
			
			while (i < input.length) {
				chr1 = input[i++];
				chr2 = i < input.length ? input[i++] : Number.NaN; // Not sure if the index
				chr3 = i < input.length ? input[i++] : Number.NaN; // checks are needed here
				
				enc1 = chr1 >> 2;
				enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
				enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
				enc4 = chr3 & 63;
				
				if (isNaN(chr2)) {
					enc3 = enc4 = 64;
				} else if (isNaN(chr3)) {
					enc4 = 64;
				}
				output += keyStr.charAt(enc1) + keyStr.charAt(enc2) +
				keyStr.charAt(enc3) + keyStr.charAt(enc4);
			}
			return output;
		}
		function goUT(uPageURL, tvPageURL) {
			console.log("MV AJAX processing...");
			console.log("FIRE:["+uPageURL+"](GET)");
			var xhrUT = new XMLHttpRequest();
			xhrUT.open("GET", uPageURL);
			xhrUT.setRequestHeader('User-Agent', 'Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5376e Safari/8536.25');
			xhrUT.onreadystatechange = function () {
				if (this.readyState == 4 && this.status == 200) {
//                    console.log("output: ["+xhrUT.responseText+"]");
					console.log("goUT[MV] callback okay!!!");
					console.log("FIRE:["+tvPageURL+"](POST)");
					
					var subxhrUT = new XMLHttpRequest();
					subxhrUT.open("POST", tvPageURL);
//                    subxhrUT.setRequestHeader('User-Agent', 'Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5376e Safari/8536.25');
					subxhrUT.onreadystatechange = function () {
						if (this.readyState == 4 && this.status == 200) {
//                            console.log("output: ["+subxhrUT.responseText+"]");
							var movielink = subxhrUT.responseText;
							console.log("goUT[MV] callcallback okay!!!");
							console.log("RESULT:["+movielink+"]");
							
							var statusxhrUT = new XMLHttpRequest();
							statusxhrUT.open("GET", movielink);
							statusxhrUT.setRequestHeader('User-Agent', 'Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5376e Safari/8536.25');
							statusxhrUT.setRequestHeader('Range', 'bytes=0-1');
							statusxhrUT.onreadystatechange = function () {
								if (this.readyState == 4) {
									console.log("URL:"+movielink+" ["+this.status+"]("+this.readyState+")");
//                                    navigationDocument.dismissModal();
									console.log("uuuuURL okay!!!");
									if (this.status < 400) {
										var player = new Player();
										var playlist = new Playlist();
										var mediaItem = new MediaItem("video", movielink);

										mediaItem.title = resultsemail;

										player.playlist = playlist;
										player.playlist.push(mediaItem);
										player.play();
									} else {
										console.log("xxxxURL okay!!!");
										var loadingTemplate1 = '<document><alertTemplate><title>Video has some issue, please try again.</title><description>Code: '+this.status+'</description><button><text>OK</text></button></alertTemplate></document>'
										var AJAXtemplate1 = new DOMParser().parseFromString(loadingTemplate1, "application/xml");
										navigationDocument.presentModal(AJAXtemplate1);
										console.log("yyyyURL okay!!!");
									}
								}
								
							}
							statusxhrUT.send();
						}
					}
					subxhrUT.send(xhrUT.responseText);
				}
			}
			xhrUT.send();
		}
        var self = this,
      	ele = event.target,
      	videoURL = ele.getAttribute("videoURL")
  	if(videoURL) {
	    var player = new Player();
	    var playlist = new Playlist();
	    var mediaItem = new MediaItem("video", videoURL);
	    
	    player.playlist = playlist;
	    player.playlist.push(mediaItem);
	    player.play();
  	}
        wedeoURL = ele.getAttribute("wedeoURL")
        if(wedeoURL) {
            console.log("wedeoURL: "+wedeoURL);
            
            if(getDomain(wedeoURL, true)=="netleave.appspot.com") {
                if(wedeoURL) {
                    var resultsemail = "...";
                    var loadingTemplate = '<document><loadingTemplate><activityIndicator><text>Loading'+resultsemail+'</text></activityIndicator></loadingTemplate></document>';
                    var AJAXtemplate = new DOMParser().parseFromString(loadingTemplate, "application/xml");
                    navigationDocument.presentModal(AJAXtemplate);
                    
                    console.log("WE AJAX processing...");
                    var xhr = new XMLHttpRequest();
                    xhr.open("GET", wedeoURL);
                    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
                    xhr.setRequestHeader('User-Agent', 'Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5376e Safari/8536.25');
                    xhr.onreadystatechange = function () {
                        if (this.readyState == 4 && this.status == 200) {
                            console.log("output: ["+xhr.responseText+"]");
                            console.log("getU[WE] callback okay!!!");
                            
                            var weParam = getParameterByName('mv', xhr.responseText);
                            console.log("we="+weParam);

                            if(weParam) {
                                goUT("https://m.youtube.com/watch?v="+weParam, xhr.responseText);
                            }
                        }
                    }
                    xhr.send();
                }
            }
        }
        nndeoURL = ele.getAttribute("nndeoURL")
        if(nndeoURL) {
            nndeoURL = gennnLink();
            console.log("nndeoURL: "+nndeoURL);
            
            var resultsemail = "...";
            var loadingTemplate = '<document><loadingTemplate><activityIndicator><text>Loading'+resultsemail+'</text></activityIndicator></loadingTemplate></document>';
            var AJAXtemplate = new DOMParser().parseFromString(loadingTemplate, "application/xml");
            navigationDocument.presentModal(AJAXtemplate);
            
            var getData = {
            channelno: "332",
            mode: "prod",
            audioCode: "",
            format: "HLS",
            callerReferenceNo: "20140702122500"
            };
            
            console.log("NN AJAX processing...");
            var xhr = new XMLHttpRequest();
            xhr.open("POST", nndeoURL);
//            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
            xhr.setRequestHeader('User-Agent', 'Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5376e Safari/8536.25');
            xhr.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
//                    console.log("output: ["+xhr.responseText+"]");
                    console.log("getU[NN] callback okay!!!");
                    navigationDocument.dismissModal();
                    obj = JSON.parse(xhr.responseText);
                    console.log("result: ["+obj.asset.hls.adaptive+"]");

                    console.log("nnnnURL okay!!!");
                    var player = new Player();
                    var playlist = new Playlist();
                    var mediaItem = new MediaItem("video", obj.asset.hls.adaptive);
                    mediaItem.title = 'now News';

                    player.playlist = playlist;
                    player.playlist.push(mediaItem);
                    player.play();
                }
            }
            xhr.send(JSON.stringify(getData));
        }
        nedeoURL = ele.getAttribute("nedeoURL")
        if(nedeoURL) {
            console.log("nedeoURL: "+nedeoURL);

            var resultsemail = "...";
            var loadingTemplate = '<document><loadingTemplate><activityIndicator><text>Loading'+resultsemail+'</text></activityIndicator></loadingTemplate></document>';
            var AJAXtemplate = new DOMParser().parseFromString(loadingTemplate, "application/xml");
            navigationDocument.presentModal(AJAXtemplate);

            var getData = {
            "callerReferenceNo": wtimestamp(),
            "deviceId": wdeviceID(),
            "contentId": "332",
            "audioCode": "N",
            "deviceType": "IOS_PHONE",
            "profileId": null,
            "secureCookie": null,
            "contentType": "Channel"
            };

            console.log("UL AJAX processing...");
            var xhr = new XMLHttpRequest();
            xhr.open("POST", gennnLink());
//            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
            xhr.setRequestHeader('User-Agent', 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1');
            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
//                    console.log("output: ["+xhr.responseText+"]");
                    console.log("getU[NL] callback okay!!!");
                    navigationDocument.dismissModal();
                    obj = JSON.parse(xhr.responseText);
                    console.log("result: ["+obj.asset+"]");
                    console.log("token: ["+obj.drmToken+"]");
                    nntoken = obj.drmToken;

                    console.log("nnnnURL okay!!!");
                    var player = new Player();
                    var playlist = new Playlist();
//                    var mediaItem = new MediaItem("video", obj.asset);
                    var mediaItem = new MediaItem("video", obj.asset[0]);
                    mediaItem.title = 'now News';
//                    mediaItem.loadAssetID = getFPSAssetId;
//                    mediaItem.loadCertificate = getCertificate;
//                    mediaItem.loadKey = getFPSKey;
                    mediaItem.loadAssetID = function(url, callback) {
               console.log('loadAssetID started.')
                               callback(btoa("e4599e63-e68b-3700-b0e0-5eac89c3b8d6"));
/*
                               console.log("===== HERE === ");
                               var assetID = uri;
                               if (assetID != null) {
                                   console.log("[FPS]: Successfully parsed asset ID: " + assetID);
                                   callback(assetID.split("skd://")[1]);
                               } else {
                                   console.log("[FPS]: Error parsing asset ID from URI: " + uri);
                                   callback(null, "Error parsing asset ID from URI: " + uri);
                               }
*/
                           };
                    mediaItem.loadCertificate = function(url, callback) {
            var request = new XMLHttpRequest();
            request.responseType = 'arraybuffer';
            request.addEventListener('load', function (event) {
               var request = event.target;
               console.log("Received cert data: " + request.response);
//               console.log("uint8Received cert data: " + (new Uint8Array(request.response)));
//               console.log("Received request: " + request);
               callback(base64EncodeUint8Array(new Uint8Array(request.response)));
               console.log('mediaItem.loadCertificate all finished.')
//               startVideo();
//               player.play();
                                                     }, false);
            request.addEventListener('error', function (event) {
               console.log('Failed to retrieve the server certificate.')
                                                     }, false);
            request.open('GET', 'https://news.now.com/site/pccw-player-web/html5player/fairplay.cer', true);
            request.setRequestHeader('Pragma', 'Cache-Control: no-cache');
            request.setRequestHeader('User-Agent', 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1');
            request.setRequestHeader("Cache-Control", "max-age=0");
            request.send();
            console.log('loadCertificate send finished.')
/*
                               console.log("==== Getting the certificate");

                               var certUrl = 'https://static.viu.tv/drm/fairplay-now.cer';
                               console.log("[FPS] certUrl: " + certUrl);
                               http.apiRequest(certUrl, "GET", true, "", function(certRequest) {
                                   if (certRequest.status == 200) {
                                       console.log("Received cert data: " + certRequest.responseDataAsBase64);
                                       callback(certRequest.responseDataAsBase64);
                                   } else {
                                       console.log("Error receiving cert data" + certRequest.status);
                                       callback(null, "Got bad response from server: " + certRequest.status);
                                   }
                               });
*/
                           };
                    mediaItem.loadKey = function(url, requestData, callback) {
               console.log('loadKey started.')
            var request = new XMLHttpRequest();
//            var sessionId = event.sessionId;
            request.responseType = 'text';
//            request.session = session;
            request.addEventListener('load', function (event)
        {
            var request = event.target;
            var session = request.session;
            keyText = request.responseText.trim();
//            key = base64DecodeUint8Array(keyText);
//            session.update(key);
            callback(keyText, null, null);
        }, false);
            request.addEventListener('error', function (event)
        {
            console.log('The license request failed.');
        }, false);
var o = {};
o.rawLicenseRequestBase64 = requestData,
o.contentKID = encodeURIComponent(url.split("skd://")[1]),
o.drmToken = nntoken;
            request.open('POST', 'https://fwp.now.com/wrapperFP', true);
            request.setRequestHeader('User-Agent', 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1');
			request.setRequestHeader("Content-type", "application/json");
			request.send(JSON.stringify(o));
/*
                               console.log("======= [FPS] getting the FPS asset key");
                               var assetID = uri;
//                               var postBody = "payload=" + requestData + "&id=" + assetID;
                       // if (fpsToken) postBody += "&fpstoken=" + fpsToken;
                       // fpsToken = null; //reset right away.
                               var o = {};
                               o.rawLicenseRequestBase64 = base64EncodeUint8Array(requestData),
                               o.contentKID = encodeURIComponent(assetID),
                               o.drmToken = nntoken;

                               var keyUrl = 'https://fwp.nowe.com/wrapperFP';
//                               console.log("[FPS] keyurl: " + keyUrl + " sending " + postBody);
                               console.log("[FPS] keyurl: " + keyUrl + " sending " + o);


                               httpMgr.apiRequest(keyUrl, "POST", true, o, function(keyRequest) {
                                   if (keyRequest.status == 200) {
            // The example server implementation wraps the key response blob in
            // <ckc>...</ckc> tags.  Partners can encode the key response in any
            // manner they wish.
                                       console.log("======== " + keyRequest);
                                       var response = keyRequest.responseText;
                                       console.log("=============== [FPS]: " + response);
                                       callback(response, null, null);
                                   } else {
                                       console.log("=============== [FPS]: Got bad response from server: " + keyRequest.status);
                                       callback(null, null, "Got bad response from server: " + keyRequest.status);
                                   }
                               });
            // callback(keyValue, renewDate, error);
*/
                           };
                    console.log("xxx: ["+mediaItem+"]");

                    player.playlist = playlist;
                    player.playlist.push(mediaItem);
                    player.play();
                }
            }
            xhr.send(JSON.stringify(getData));
        }
        iideoURL = ele.getAttribute("iideoURL")
        if(iideoURL) {
            iideoURL = geniLink();
            console.log("iideoURL: "+iideoURL);

            var resultsemail = "...";
            var loadingTemplate = '<document><loadingTemplate><activityIndicator><text>Loading'+resultsemail+'</text></activityIndicator></loadingTemplate></document>';
            var AJAXtemplate = new DOMParser().parseFromString(loadingTemplate, "application/xml");
            navigationDocument.presentModal(AJAXtemplate);
            
            console.log("II AJAX processing...");
            var xhr = new XMLHttpRequest();
            xhr.open("GET", iideoURL);
//            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
            xhr.setRequestHeader('User-Agent', 'i-CABLE/1.0.6 (iPad; iOS 11.0.3; Scale/2.00)');
            xhr.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    console.log("output: ["+xhr.responseText+"]");
                    console.log("getU[II] callback okay!!!");
                    navigationDocument.dismissModal();
                    obj = JSON.parse(xhr.responseText);
                    console.log("result: ["+obj.result.stream+"]");
                    
                    console.log("iiiiURL okay!!!");
                    var player = new Player();
                    var playlist = new Playlist();
                    var mediaItem = new MediaItem("video", obj.result.stream);
                    mediaItem.title = 'i-CABLE News';
                    
                    player.playlist = playlist;
                    player.playlist.push(mediaItem);
                    player.play();
                }
            }
            xhr.send();
        }
	},
}
