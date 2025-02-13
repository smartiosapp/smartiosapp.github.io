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
        function addMe(item, idx, itemsArray) {
            item.title = 'Video '+(idx + 1)+' of '+itemsArray.length;
            this.push(item);
        }
        function addAMEnt(item, idx, itemsArray) {
            if (item.link) {
/*
                 console.log("Title: ["+item.program_title+"]");
                 console.log("SubTi: ["+item.title+"]");
                 console.log("vlink: ["+encodeURIComponent(item.hls_stream)+"]");
                 console.log(`Image: [${resourceLoader.BASEURL}images/finewCablethumbnail.png]`);
*/
                
                var mediaItem;
                mediaItem = new MediaItem("video", item.link);
//                mediaItem.artworkImageURL = item.thumbnail;
                mediaItem.artworkImageURL = `${resourceLoader.BASEURL}images/TVBenthumbnail.png`;
                
                mediaItem.title = item.name+' [ '+(idx + 1)+' / '+itemsArray.length+' ]';
                
                this.push(mediaItem);
            }
        }
        function addiEnt(item, idx, itemsArray) {
            if (item.hls_stream) {
/*
                console.log("Title: ["+item.program_title+"]");
                console.log("SubTi: ["+item.title+"]");
                console.log("vlink: ["+encodeURIComponent(item.hls_stream)+"]");
                console.log(`Image: [${resourceLoader.BASEURL}images/finewCablethumbnail.png]`);
*/

                var mediaItem;
                mediaItem = new MediaItem("video", "http://netleave.appspot.com/cableprogram?link="+encodeURIComponent(item.hls_stream));
//                mediaItem.artworkImageURL = item.thumbnail;
                mediaItem.artworkImageURL = `${resourceLoader.BASEURL}images/TVBenthumbnail.png`;

                mediaItem.title = item.category_name+' [ '+(idx + 1)+' / '+itemsArray.length+' ]';
                if (item.program_title != item.title) {
                    mediaItem.subtitle = item.program_title;
                }
                mediaItem.description = item.title;

                this.push(mediaItem);
            }
        }
        function addiFin(item, idx, itemsArray) {
            if (item.hls_stream) {
/*
                console.log("Title: ["+item.program_title+"]");
                console.log("SubTi: ["+item.title+"]");
                console.log("vlink: ["+encodeURIComponent(item.hls_stream)+"]");
                console.log(`Image: [${resourceLoader.BASEURL}images/finewCablethumbnail.png]`);
*/

                var mediaItem;
                mediaItem = new MediaItem("video", "http://netleave.appspot.com/cableprogram?link="+encodeURIComponent(item.hls_stream));
//                mediaItem.artworkImageURL = item.thumbnail;
                mediaItem.artworkImageURL = `${resourceLoader.BASEURL}images/finewCablethumbnail.png`;
/*
                mediaItem.title = item.program_title+' [ '+(idx + 1)+' / '+itemsArray.length+' ]';
                if (item.program_title != item.title) {
                    mediaItem.subtitle = item.title;
                }
                mediaItem.description = item.category_name;
 */
                mediaItem.title = item.category_name+' [ '+(idx + 1)+' / '+itemsArray.length+' ]';
                if (item.program_title != item.title) {
                    mediaItem.subtitle = item.program_title;
                }
                mediaItem.description = item.title;

                this.push(mediaItem);
            }
/*            for ( var i = 0; i < item.mediaGroup.length; i++ ) {
                if ( item.mediaGroup[i].type=="videos" ) {
                    if ( item.mediaGroup[i].quality=="360p" ) {
                        var mediaItem;
//                        console.log("URL: ["+item.mediaGroup[i].url+"]");
                        mediaItem = new MediaItem("video", item.mediaGroup[i].url);
                        mediaItem.artworkImageURL = item.mediaGroup[i].smallPath;
                        
                        mediaItem.title = item.title;
                        mediaItem.subtitle = item.brandCategoryName;
                        mediaItem.description = item.title;
                        this.push(mediaItem);
                    }
                }
            }
  */
        }
        function addMove(item, idx, itemsArray) {
//            console.log("TT: ["+item.title+"]");
            for ( var i = 0; i < item.mediaGroup.length; i++ ) {
                if ( item.mediaGroup[i].type=="videos" ) {
                    if ( item.mediaGroup[i].quality=="360p" ) {
                        var mediaItem;
//                        console.log("URL: ["+item.mediaGroup[i].url+"]");
                        mediaItem = new MediaItem("video", item.mediaGroup[i].url);
//                        mediaItem.artworkImageURL = item.mediaGroup[i].smallPath;
                        mediaItem.artworkImageURL = `${resourceLoader.BASEURL}images/moovnewsthumbnail.png`;

                        mediaItem.title = item.brandName+' [ '+(idx + 1)+' / '+itemsArray.length+' ]';
                        mediaItem.subtitle = item.brandCategoryName;
                        mediaItem.description = item.title;
                        this.push(mediaItem);
                    }
                }
            }
        }
        function addPiped(item, idx, itemsArray) {
            var MAXITEMSTORE = 80;
            if (idx > MAXITEMSTORE - 1) return;
            if (item.lengthSeconds == 0) return;
//            console.log("TT: ["+item.title+"]");
//            for ( var i = 0; i < item.length; i++ ) {
//                console.log("TT: ["+item[i].title+"]");
                var mediaItem;
//                        console.log("URL: ["+item[i].url+"]");
                mediaItem = new MediaItem("video", "https://inv.riverside.rocks/latest_version?id="+item.videoId+"&itag=18");
//                        mediaItem.artworkImageURL = item.mediaGroup[i].smallPath;
//                mediaItem.artworkImageURL = `${resourceLoader.BASEURL}images/moovnewsthumbnail.png`;
                mediaItem.artworkImageURL = item.videoThumbnails[4].url.replace(':3000', '');

                mediaItem.title = 'VIDEO [ '+(idx + 1)+' / '+Math.min(itemsArray.length,MAXITEMSTORE)+' ]';
//                mediaItem.subtitle = item.brandCategoryName;
                mediaItem.description = item.title;

            var highlights = [{
                name: "next skip",
                highlights: []
            }];
            const temphl = {};
            temphl.name = "next";
            temphl.description = "next";
            temphl.starttime = Math.ceil(item.lengthSeconds) - 1;
            temphl.duration = 10;
            temphl.imageURL = `${resourceLoader.BASEURL}images/next.png`;
            highlights[0].highlights.push(temphl);
            mediaItem.highlightGroups = highlights;

                this.push(mediaItem);
//            }
        }
        function addInvidious(item, idx, itemsArray) {
            var MAXITEMSTORE = 80;
            if (idx > MAXITEMSTORE - 1) return;
            if (item.duration == 0) return;
//            console.log("TT: ["+item.title+"]");
                var mediaItem;
//                mediaItem = new MediaItem("video", "https://inv.riverside.rocks/latest_version?id="+item.url.replace('/watch?v=', '')+"&itag=22");
//            mediaItem = new MediaItem("video", "https://youtube.076.ne.jp/latest_version?id="+item.url.replace('/watch?v=', '')+"&itag=22");
//            mediaItem = new MediaItem("video", "https://invidious.esmailelbob.xyz/latest_version?id="+item.url.replace('/watch?v=', '')+"&itag=22");
//            mediaItem = new MediaItem("video", "https://vid.puffyan.us/latest_version?id="+item.url.replace('/watch?v=', '')+"&itag=22");
//            mediaItem = new MediaItem("video", "https://yt.artemislena.eu/latest_version?id="+item.url.replace('/watch?v=', '')+"&itag=22");
//            mediaItem = new MediaItem("video", "https://yt.oelrichsgarcia.de/latest_version?id="+item.url.replace('/watch?v=', '')+"&itag=22");
//            mediaItem = new MediaItem("video", "https://yewtu.be/latest_version?id="+item.url.replace('/watch?v=', '')+"&itag=22");
//            mediaItem = new MediaItem("video", "https://iv.ggtyler.dev/latest_version?id="+item.url.replace('/watch?v=', '')+"&itag=22");
//            mediaItem = new MediaItem("video", "https://iv.melmac.space/latest_version?id="+item.url.replace('/watch?v=', '')+"&itag=22");
//            mediaItem = new MediaItem("video", "https://invidious.perennialte.ch/latest_version?id="+item.url.replace('/watch?v=', '')+"&itag=18");
//            mediaItem = new MediaItem("video", "https://invidious.nerdvpn.de/latest_version?id="+item.url.replace('/watch?v=', '')+"&itag=18");
            if (idx % 3 === 1) {
//                mediaItem = new MediaItem("video", "https://tube.kuylar.dev/proxy/media/"+item.url.replace('/watch?v=', '')+".m3u8");
//                mediaItem = new MediaItem("video", "https://pol1.iv.ggtyler.dev/latest_version?id="+item.url.replace('/watch?v=', '')+"&itag=18");
//                mediaItem = new MediaItem("video", "https://invidious.f5.si/latest_version?id="+item.url.replace('/watch?v=', '')+"&itag=18");
                mediaItem = new MediaItem("video", "https://votedb.netlify.app/api/"+item.url.replace('/watch?v=', '')+"/gomovie?server=3&id="+item.url.replace('/watch?v=', ''));
            } else if (idx % 3 === 2) {
                mediaItem = new MediaItem("video", "https://cal1.iv.ggtyler.dev/latest_version?id="+item.url.replace('/watch?v=', '')+"&itag=18");
            } else {
//                mediaItem = new MediaItem("video", "https://inv.nadeko.net/latest_version?id="+item.url.replace('/watch?v=', '')+"&itag=18");
//                mediaItem = new MediaItem("video", "https://inv.ngn.tf/latest_version?id="+item.url.replace('/watch?v=', '')+"&itag=18");
//                mediaItem = new MediaItem("video", "https://inv-us2-c.nadeko.net/latest_version?id="+item.url.replace('/watch?v=', '')+"&itag=18");
                mediaItem = new MediaItem("video", "https://votedb.netlify.app/api/"+item.url.replace('/watch?v=', '')+"/gomovie?server=4&id="+item.url.replace('/watch?v=', ''));
            }
//            mediaItem = new MediaItem("video", "https://cal1.iv.ggtyler.dev/latest_version?id="+item.url.replace('/watch?v=', '')+"&itag=18");
//            mediaItem.artworkImageURL = item.thumbnail;
            mediaItem.artworkImageURL = 'https://i.ytimg.com/vi/'+item.url.replace('/watch?v=', '')+'/mqdefault.jpg';
                mediaItem.title = 'VIDEO [ '+(idx + 1)+' / '+Math.min(itemsArray.length,MAXITEMSTORE)+' ]';
                mediaItem.description = item.title;

//            console.log(mediaItem.title+" URL:["+mediaItem.url+"] ("+mediaItem.artworkImageURL+")");

            var highlights = [{
                name: "next skip",
                highlights: []
            }];
            const temphl = {};
            temphl.name = "next";
            temphl.description = "next";
            temphl.starttime = Math.ceil(item.duration) - 2;
            temphl.duration = 1;
            temphl.imageURL = `${resourceLoader.BASEURL}images/next.png`;
            highlights[0].highlights.push(temphl);
            mediaItem.highlightGroups = highlights;

                this.push(mediaItem);
        }
        function addAcast(item, idx, itemsArray) {
            var MAXITEMSTORE = 80;
            if (idx > Math.min(itemsArray.length,MAXITEMSTORE) - 1) return;
            if (item.duration == 0) return;

//            item.subtitle = 'Video '+(idx + 1)+' of '+itemsArray.length;
            item.subtitle = 'Talk '+(idx + 1)+' of '+Math.min(itemsArray.length,MAXITEMSTORE);
            item.description = item.title+'\n['+item.addDate+' HKT]';

            const regex = /^【.*?】/;
            const match = item.title.match(regex);

            if (match) {
                item.title = match[0].trim();
            } else if (item.title.includes("｜")) {
                // Split the input string by "｜" and return the first element
                item.title = item.title.split("｜")[0].trim();
            }
            
            item.title = item.title.replace(/　/g, "\n");
            item.title = item.title.replace(/：/g, "：\n");
            item.title = item.title.replace(/・/g, "・\n");

            var highlights = [{
                name: "next skip",
                highlights: []
            }];
            const temphl = {};
            temphl.name = "next";
            temphl.description = "next";
            temphl.starttime = Math.ceil(item.duration) - 2;
            temphl.duration = 1;
            temphl.imageURL = `${resourceLoader.BASEURL}images/next.png`;
            highlights[0].highlights.push(temphl);
            item.highlightGroups = highlights;
            this.push(item);
        }
        function makeMobile() {
            return '9'+makedigit(7);
        }
        function makeUUID() {
            return makehex(8)+"-"+makehex(4)+"-"+makehex(4)+"-"+makehex(4)+"-"+makehex(12);
        }
        function deviceID() {
            return makehex(8)+"-"+makehex(4)+"-"+makehex(4);
        }
        function timestamp() {
            return (new Date()).getTime();
        }
		function gennnOink() {
			return 'https://olympics.com/tokenGenerator?url=https://ott-dai-oc.akamaized.net/OC1/master.m3u8&domain=https://ott-dai-oc.akamaized.net&_ts=1627107400540';
		}
        function gennnLink() {
            return 'https://hkt-mobile-api.nowtv.now.com/09/1/getLiveURL';
        }
        function gennnLink2() {
            return 'https://api.viu.now.com/p8/3/getLiveURL';
        }
        function genMoveLink() {
            return 'http://mlprd.api.appledaily.com.hk/arc/1/ArticleList?Offset=40&Type=VIDEO_LANDING&Start=0&Lang=zh_TW&ABT=UX_WHEEL%3DL%7CUX_MAR%3D1&Platform=IPHONE&Build=5900&D=&FromCC=HK&CC=HK&S=&FromD=&FromS=';
        }
        function genieLink() {
            return 'https://mobileapp.i-cable.com/iCableMobile/API/api.php?cate_id=4&method=getContentList';
        }
        function genifLink() {
            return 'https://mobileapp.i-cable.com/iCableMobile/API/api.php?cate_id=2&method=getContentList';
        }
        function genRTLink(xl) {
            return 'http://podcast.rthk.hk/podcast/'+xl;
        }
		function genRTLink1(xl) {
			return 'http://programme.rthk.hk/apps/tvapp/feeds_v3.php?language=zh&action=retrieveprogramdetail&programid='+xl;
		}
		function genRTLink2(yl) {
			return 'http://geoblock-akamai.rthk.hk.edgesuite.net/apps/tvapp/feeds_v3.php?language=zh&action=retrieveepisodedetail&episodeid='+yl;
		}
        function genRSLink(xl) {
            return 'https://feeds.acast.com/public/shows/'+xl;
        }
        function geniLink() {
            return 'https://mobileapp.i-cable.com/iCableMobile/API/api.php?appVersion=1.0.6&channel_no=_9&deviceModel=iPad&deviceName=iPad&deviceToken=&hkid='+makeMobile()+'&is_premium=0&method=streamingGenerator&network=wifi&osVersion=11.0.3&platform=4&quality=l&type=live&uuid='+makeUUID();
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
        function goAcast(xlsParam) {

            const chParam = xlsParam.split(",");

            var player = new Player();
            player.addEventListener('mediaItemWillChange', function(event){
                console.log("change reason:"+event.reason+" currentId:"+getParameterByName('id', event.target.currentMediaItem.url))
                checkandSkip(event.target.currentMediaItem.url, event.target);
            });
            player.addEventListener('stateWillChange', function(event){
                console.log("event: "+ event.oldState+ "->"+ event.state+ " player:"+ event.target.playbackState);
//                        console.log(event.target);
                if (event.state == 'playing' && event.oldState == 'loading') {
                    setTimeout(function(con,orgURL){
                        console.log("8s READY to check~~~");
                        if ( orgURL == con.currentMediaItem.url ) {
                            if (con.currentMediaItemDuration == 0) {
                                con.next();
                            } else {
                                console.log("READY to play!");
                            }
                        } else {
                            console.log("NOT the same movie!");
                        }
                    }.bind(null, player, player.currentMediaItem.url), 8000);
                }
            });
            player.addEventListener('playbackError', function(event){
                event.target.next();
                console.log("error with reason:"+event.reason, event);
            });

            var resultsemail = "...";
            var loadingTemplate = '<document><loadingTemplate><activityIndicator><text>Loading'+resultsemail+'</text></activityIndicator></loadingTemplate></document>';
            var AJAXtemplate = new DOMParser().parseFromString(loadingTemplate, "application/xml");
            navigationDocument.presentModal(AJAXtemplate);
            
            var all_items = [];

            console.log("RS AJAX processing...");

            chParam.forEach(function(xlParam, index, array) {
                console.log("xl="+xlParam);
                
                rsdeoURL = genRSLink(xlParam);
                console.log("rsdeoURL: "+rsdeoURL);

                var xhr = new XMLHttpRequest();
                xhr.open("GET", rsdeoURL, false);
//                xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
                xhr.setRequestHeader('User-Agent', 'Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5376e Safari/8536.25');
                xhr.onreadystatechange = function () {
                    if (this.readyState == 4 && this.status == 200) {
//                        console.log("output: ["+xhr.responseText+"]");
                        console.log("getU[RS] callback okay!!!");

                        var sourceText = xhr.responseText;
                        
                        const parser = new DOMParser();
                        const xmlDoc = parser.parseFromString(sourceText, "application/xml");

                        const items = xmlDoc.getElementsByTagName('item');
                        console.log('Number of <item> elements found:', items.length);

                        if (items.length === 0) {
                            console.log("No <item> elements found");
                        } else {

                            var pubArtwork = "";

                            while (result = (/<itunes:title>(.*)<\/itunes:title>/gi).exec(sourceText)) {

                                var rsURL = (/<enclosure url=\"([^<]+)\" length=\".+\" type=\"audio\/mpeg\"\/>/g).exec(sourceText);

                                var mediaItem = new MediaItem("audio", rsURL[1]);


                                var rsTitle = result;
                                var rsSubtitle = (/<itunes:summary><!\[CDATA\[([^<]+)\]\]><\/itunes:summary>/g).exec(sourceText);
                                var rsDesc = (/<description><!\[CDATA\[([^<]+)\]\]><\/description>/g).exec(sourceText);
                                var rsArtwork = (/<itunes:image href=\"([^<]+)\"\/>/g).exec(sourceText);
                                var rsDuration = (/<itunes:duration>(.*)<\/itunes:duration>/gi).exec(sourceText);
                                var rsPubDate = (/<pubDate>(.*)<\/pubDate>/gi).exec(sourceText);

                                if (rsDuration) {
                                    const parts = rsDuration[1].split(":").map(Number);
                                    let totalSeconds = 0;

                                    if (parts.length === 2) {
                                        // hh:mm format
                                        const [hours, minutes] = parts;
                                        totalSeconds = (hours * 60) + (minutes * 1);
                                    } else if (parts.length === 3) {
                                        // hh:mm:ss format
                                        const [hours, minutes, seconds] = parts;
                                        totalSeconds = (hours * 3600) + (minutes * 60) + seconds;
                                    }

                                    mediaItem.duration = totalSeconds;
                                }
                                if (rsTitle) {
                                    mediaItem.title = rsTitle[1];
                                }
                                if (rsSubtitle) {
                                    mediaItem.subtitle = rsSubtitle[1];
                                }
                                if (rsDesc) {
                                    mediaItem.description = rsDesc[1];
                                }
                                if (rsArtwork) {
                                    mediaItem.artworkImageURL = rsArtwork[1];
                                    pubArtwork = rsArtwork[1];
                                } else {
                                    mediaItem.artworkImageURL = pubArtwork;
                                }
                                if (rsPubDate) {
                                    const dateStr = rsPubDate[1];
                                    const date = new Date(dateStr);

                                    date.setHours(date.getUTCHours() + 8);

                                    const day = String(date.getUTCDate()).padStart(2, '0');
                                    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // getUTCMonth() returns month from 0 to 11
                                    const year = date.getUTCFullYear();
                                    const hours = String(date.getUTCHours()).padStart(2, '0');
                                    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
                                    const seconds = String(date.getUTCSeconds()).padStart(2, '0');

//                                    const formattedDate = `${day}${month}${year}${hours}${minutes}${seconds}`;
                                    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

                                    mediaItem.addDate = formattedDate;
//                                    console.log(formattedDate);
                                }
                                all_items.push(mediaItem);
                                
                                nextitem = (/(<\/item>)/gi).exec(sourceText)
                                sourceText = sourceText.substr(nextitem.index+nextitem[1].length);
                            }
                        }
                    }
                }
                xhr.send();
            });

            function parseDate(dateStr) {
              return new Date(dateStr.replace(' ', 'T') + 'Z');
            };

            all_items.sort(function(a, b){
                return parseDate(b.addDate) - parseDate(a.addDate);
            });

            var playlist = new Playlist();
            player.playlist = playlist;
            all_items.forEach(addAcast, player.playlist);
            console.log("Playlist items: " + player.playlist.length);

            navigationDocument.dismissModal();

            if (player.playlist.length>0) {
                player.play();
            }
        }
        function goReport(myParamURL, myParamStatus) {
            console.log("report AJAX processing...");
            var getData = {
                referrer_msg: getDomain(myParamURL, true),
                url_msg: myParamURL,
                response_code_int: myParamStatus
            };
            var reportstatusxhr = new XMLHttpRequest();
            reportstatusxhr.open("POST", "https://votedb.netlify.app/api/machinestatus", true);
            reportstatusxhr.setRequestHeader('User-Agent', 'Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5376e Safari/8536.25');
            reportstatusxhr.onreadystatechange = function () {
                if (this.readyState == 4) {
                    console.log("reported URL["+this.status+"]: "+myParamURL+"("+myParamStatus+")");
                }
            }
            reportstatusxhr.send(JSON.stringify(getData));
        }
        function checkandSkip(myParamURL, container) {
            console.log("CK AJAX processing...");
            var statusxhr = new XMLHttpRequest();
            statusxhr.open("GET", myParamURL, true);
            statusxhr.setRequestHeader('User-Agent', 'Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5376e Safari/8536.25');
            statusxhr.setRequestHeader('Range', 'bytes=0-1');
            statusxhr.onreadystatechange = function () {
                if (this.readyState == 4) {
                    console.log("URL:"+myParamURL+" ["+this.status+"]("+this.readyState+")");
                    if (this.status < 250) {
                        console.log("MOVIE SAFE!!!");
						skipSpo("https://sponsor.ajay.app/api/skipSegments?videoID="+getParameterByName('id', myParamURL)+"&categories=%5B%22preview%22%2C%22sponsor%22%2C%22intro%22%2C%22outro%22%2C%22interaction%22%2C%22selfpromo%22%5D",container);
                    } else {
                        console.log("MOVIE CANNOT PLAY!!!");
                        container.next();
                    }
                    goReport(myParamURL, this.status);
                }
            }
            statusxhr.send();
        }
        function skipSpo(myParamURL, container) {
            console.log("SP AJAX processing...");
            var xhr = new XMLHttpRequest();
            xhr.open("GET", myParamURL, true);
            xhr.setRequestHeader('User-Agent', 'Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5376e Safari/8536.25');
            xhr.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
//                    console.log("output: ["+xhr.responseText+"]");
                    console.log("SP[MV] callback okay!!!");

                    try {
                        const obj = JSON.parse(xhr.responseText);
                        var skipMin = 0;
                        var highlights = [{
                            name: "Ad skip",
                            highlights: []
                        }];
                        for (i = 0; i < obj.length; i++) {
                            if ( i==0 ) { console.log("Spo object found!"); }

                            const temphl = {};
                            temphl.name = "skip #"+(i+1);
                            temphl.description = "skip";
                            if ( obj[i].videoDuration == obj[i].segment[1] ) {
                                temphl.starttime = Math.ceil(obj[i].segment[1]) - 2;
                            } else {
                                temphl.starttime = Math.ceil(obj[i].segment[1]);
                            }
                            temphl.duration = 1;
                            temphl.imageURL = `${resourceLoader.BASEURL}images/adskip.png`;
                            highlights[0].highlights.push(temphl);

                            console.log("obj["+i+"]: "+obj[i].category+", skip: "+obj[i].segment[0]+"->"+obj[i].segment[1]);
                            setTimeout(function(skip,i,con,orgURL){
                                if ( orgURL == con.currentMediaItem.url ) {
                                    if ( skip[i].videoDuration == skip[i].segment[1] ) {
//                                        con.seekToTime(Math.ceil(skip[i].segment[1]) - 1);
                                        con.next();
                                    } else {
                                        con.seekToTime(Math.ceil(skip[i].segment[1]));
                                    }
    //                                console.log("skip begin! ["+skip.segment[0]+"->"+skip.segment[1]+"]", con);
                                    console.log("skip ["+(i+1)+"/"+skip.length+"] begin! ("+Math.ceil(skip[i].segment[1])+"s)");
                                } else {
                                    console.log("VOID: skip ["+(i+1)+"/"+skip.length+"] begin! ("+Math.ceil(skip[i].segment[1])+"s)");
                                }
                            }.bind(null, obj, i, container, container.currentMediaItem.url), (obj[i].segment[0] - skipMin)*1000);
//                            console.log("obj["+i+"]: "+obj[i].segment);
                            skipMin = skipMin + obj[i].segment[1] - obj[i].segment[0];
                        }
                        container.currentMediaItem.highlightGroups = highlights;
//                        console.log("container: ", container);
                    } catch (err) {
                        console.log("SP JSON error: "+err.message);
                    }
                    var uoTV = xhr.responseText.match(/\<mediaURL\>([^\<]+)\<\/mediaURL\>/);
                    if (uoTV) {
                        console.log("UTTV: ["+uoTV[1]+"]");
                        navigationDocument.dismissModal();
//                        playVideo("Hello TVML!",subxhr.responseText);
                        console.log("uuuuURL okay!!!");
                        var player = new Player();
                        var playlist = new Playlist();
                        var mediaItem = new MediaItem("video", uoTV[1]);
                        mediaItem.title = 'Go!';
                        
                        player.playlist = playlist;
                        player.playlist.push(mediaItem);
                        player.play();
                    }
                } else {
                    console.log("Sorry! No Spo. info. found !!! [apistate:" + this.readyState + ", code:" + this.status + "]");
                }
            }
            xhr.send();
        }
        function goUTTV(myParamURL) {
            console.log("MV AJAX processing...");
            var xhr = new XMLHttpRequest();
            xhr.open("GET", myParamURL);
            xhr.setRequestHeader('User-Agent', 'com.google.ios.youtube/1.2 iOS/11.2 AppleTV/11.2 model/AppleTV5,3 hwp/t7000 build/15K106 (3; dt:119)');
            xhr.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    console.log("output: ["+xhr.responseText+"]");
                    console.log("goUTTV[MV] callback okay!!!");
                    var uoTV = xhr.responseText.match(/\<mediaURL\>([^\<]+)\<\/mediaURL\>/);
                    if (uoTV) {
                        console.log("UTTV: ["+uoTV[1]+"]");
                        navigationDocument.dismissModal();
//                        playVideo("Hello TVML!",subxhr.responseText);
                        console.log("uuuuURL okay!!!");
                        var player = new Player();
                        var playlist = new Playlist();
                        var mediaItem = new MediaItem("video", uoTV[1]);
                        mediaItem.title = 'Go!';
                        
                        player.playlist = playlist;
                        player.playlist.push(mediaItem);
                        player.play();
                    }
/*
                    var subxhr = new XMLHttpRequest();
                    subxhr.open("POST", uideoURL);
                    //                    subxhr.setRequestHeader('User-Agent', 'Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5376e Safari/8536.25');
                    subxhr.onreadystatechange = function () {
                        if (this.readyState == 4 && this.status == 200) {
                            console.log("output: ["+subxhr.responseText+"]");
                            console.log("goUT[MV] callcallback okay!!!");
                            navigationDocument.dismissModal();
                            //                            playVideo("Hello TVML!",subxhr.responseText);
                            console.log("uuuuURL okay!!!");
                            var player = new Player();
                            var playlist = new Playlist();
                            var mediaItem = new MediaItem("video", subxhr.responseText);
                            mediaItem.title = resultsemail;
                            
                            player.playlist = playlist;
                            player.playlist.push(mediaItem);
                            player.play();
                        }
                    }
                    subxhr.send(xhr.responseText);
*/
                }
            }
            xhr.send();
        }
        function goInAppUT(myParamURL, uideoURL) {
            console.log("MV AJAX processing...");

            Date.prototype.yyyymmdd = function() {
                var mm = this.getMonth() + 1; // getMonth() is zero-based
                var dd = this.getDate();
                
                return [this.getFullYear(),
                        (mm>9 ? '' : '0') + mm,
                        (dd>9 ? '' : '0') + dd
                        ].join('');
            };
            
            var date = new Date();
            var dateParam = date.yyyymmdd();
            
            var mvParam = getParameterByName('v', myParamURL);
            console.log("v="+mvParam);
            console.log("dateParam="+dateParam);

            myParamURL = 'https://www.youtube.com/get_video_info?html5=1&video_id='+mvParam+'&cpn=GpB7IYKdPrirkh0p&eurl=https%3A%2F%2Fyoutube.com%2F&ps=native&el=embedded&hl=zh_TW&sts=18149&lact=2341&c=WEB_EMBEDDED_PLAYER&cver='+dateParam+'&cplayer=UNIPLAYER&cbr=Webview&cos=iPhone&cosver=11_0_3&cc_load_policy=1&iv_load_policy=3&width=304&height=171&ei=pEZ5XYbtD4y8qQGnnZ64Dg&iframe=1&embed_config=%7B%7D&co_rel=1&ancestor_origins=https%3A%2F%2Fyoutube.com';
            console.log("FIRE:["+myParamURL+"](GET)");
            var xhr = new XMLHttpRequest();
            xhr.open("GET", myParamURL);
            xhr.setRequestHeader('User-Agent', 'Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5376e Safari/8536.25');
            xhr.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
//                    console.log("output: ["+decodeURIComponent(decodeURIComponent(xhr.responseText))+"]");
                    console.log("goInAppUT[MV] callback okay!!!");
                    console.log("FIRE:["+uideoURL+"](POST)");
                    
                    var subxhr = new XMLHttpRequest();
                    subxhr.open("POST", uideoURL);
//                    subxhr.setRequestHeader('User-Agent', 'Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5376e Safari/8536.25');
                    subxhr.onreadystatechange = function () {
                        if (this.readyState == 4 && this.status == 200) {
//                            console.log("output: ["+subxhr.responseText+"]");
//                            var movielink = subxhr.responseText;
                            var movielink = decodeURIComponent(decodeURIComponent(xhr.responseText)).match(/https:\/\/r[^\"]*720p/gi);
                            console.log("goInAppUT[MV] callcallback okay!!!");
                            console.log("RESULT:["+movielink+"]");
//                            console.log("movielink.length="+movielink.length+"");

                            if ( movielink == null ) {
                                        var loadingTemplate1 = '<document><alertTemplate><title>Video has some issue, please try again.</title><description>Code: 999</description><button><text>OK</text></button></alertTemplate></document>'
                                        var AJAXtemplate1 = new DOMParser().parseFromString(loadingTemplate1, "application/xml");
                                        navigationDocument.presentModal(AJAXtemplate1);
                                        return;
                            }
                            var counter = 0;
                            var n = 0;

                            while ( !counter || n > 0 ) {
                            counter++;
                                    n = movielink[0].lastIndexOf("&");
                                    if ( n > 0 ) movielink[0] = movielink[0].substr(0,n);

                            console.log("n="+n+", ("+movielink[0]+")");

                                    if ( counter > 6 ) n = 0;

                            var statusxhr = new XMLHttpRequest();
                            statusxhr.open("GET", movielink[0], false);
                            statusxhr.setRequestHeader('User-Agent', 'Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5376e Safari/8536.25');
                            statusxhr.setRequestHeader('Range', 'bytes=0-1');
                            statusxhr.onreadystatechange = function () {
                                if (this.readyState == 4) {
                                    console.log("URL:"+movielink[0]+" ["+this.status+"]("+this.readyState+") n:"+n);
//                                    navigationDocument.dismissModal();
                                    console.log("InuuuuURL okay!!!");
//                                    if (this.status < 400) {
                                    if (this.status < 250) {
                                        var player = new Player();
                                        var playlist = new Playlist();
                                        var mediaItem = new MediaItem("video", movielink[0]);
                                        player.onStateDidChange = function(stateObj) {
                                                 console.log("onStateDidChange: "+stateObj.oldState+" to "+stateObj.state);
                                        }
                                        player.addEventListener("stateDidChange", player.onStateDidChange);
//                                        player.addEventListener("stateDidChange", videoPlayer.onStateDidChange);
                                        mediaItem.title = resultsemail;
                                        
                                        player.playlist = playlist;
                                        player.playlist.push(mediaItem);
                                        player.play();
//                                        break;
                                        n = 0;
                                    } else {
                                        console.log("InxxxxURL okay!!!");
//                                        var loadingTemplate1 = '<document><alertTemplate><title>Video has some issue, please try again.</title><description>Code: '+this.status+'</description><button><text>OK</text></button></alertTemplate></document>'
//                                        var AJAXtemplate1 = new DOMParser().parseFromString(loadingTemplate1, "application/xml");
//                                        navigationDocument.presentModal(AJAXtemplate1);
                                        console.log("InyyyyURL okay!!!");
                                    }
                                    goReport(movielink[0], this.status);
                                }
                            }
                            statusxhr.send();
                            }
                        }
                    }
                    subxhr.send(decodeURIComponent(decodeURIComponent(xhr.responseText)));
                }
            }
            xhr.send();
        }
        function goIn2AppUT(myParamURL, uideoURL, uideoTitle) {
            console.log("MV AJAX processing...");

            Date.prototype.yyyymmdd = function() {
                var mm = this.getMonth() + 1; // getMonth() is zero-based
                var dd = this.getDate();
                
                return [this.getFullYear(),
                        (mm>9 ? '' : '0') + mm,
                        (dd>9 ? '' : '0') + dd
                        ].join('');
            };
            
            var date = new Date();
            var dateParam = date.yyyymmdd();
            
            var mvParam = getParameterByName('v', myParamURL);
            console.log("v="+mvParam);
            console.log("dateParam="+dateParam);

//            myParamURL = 'https://www.youtube.com/get_video_info?html5=1&video_id='+mvParam+'&cpn=GpB7IYKdPrirkh0p&eurl=https%3A%2F%2Fyoutube.com%2F&ps=native&el=embedded&hl=zh_TW&sts=18149&lact=2341&c=WEB_EMBEDDED_PLAYER&cver='+dateParam+'&cplayer=UNIPLAYER&cbr=Webview&cos=iPhone&cosver=11_0_3&cc_load_policy=1&iv_load_policy=3&width=304&height=171&ei=pEZ5XYbtD4y8qQGnnZ64Dg&iframe=1&embed_config=%7B%7D&co_rel=1&ancestor_origins=https%3A%2F%2Fyoutube.com';
//            myParamURL = 'https://www.youtube.com/get_video_info?html5=1&video_id='+mvParam+'&eurl=https%3A%2F%2Fyoutube.googleapis.com%2Fv%2Fonz2k4zoLjQ&c=TVHTML5&cver=6.20180913';
//            myParamURL = 'https://m.youtube.com/watch?v='+mvParam+'&pbj=1';
//            myParamURL = 'https://api-piped.shimul.me/streams/'+mvParam;
//            myParamURL = 'https://pipedapi.kavin.rocks/streams/'+mvParam;
//            myParamURL = 'https://pipedapi.aeong.one/streams/'+mvParam;
//            myParamURL = 'https://api.piped.privacydev.net/streams/'+mvParam;
            myParamURL = 'https://pipedapi.wireway.ch/streams/'+mvParam;
//            myParamURL = 'https://pipedapi.ezero.space/streams/'+mvParam;
            console.log("FIRE:["+myParamURL+"](GET)");
            var xhr = new XMLHttpRequest();
            xhr.open("GET", myParamURL);
            xhr.setRequestHeader('User-Agent', 'Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5376e Safari/8536.25');
            xhr.setRequestHeader('x-youtube-device', 'cbr=Safari+Mobile&cbrand=apple&cbrver=14.1.1.15E148&ceng=WebKit&cengver=605.1.15&cmodel=iphone&cos=iPhone&cosver=14_6&cplatform=MOBILE');
            xhr.setRequestHeader('x-youtube-page-label', 'youtube.mobile.web.client_20210721_07_RC00');
            xhr.setRequestHeader('x-youtube-client-version', '2.20210721.07.00');
            xhr.setRequestHeader('x-youtube-sts', '18830');
            xhr.setRequestHeader('x-youtube-page-cl', '386111208');
            xhr.setRequestHeader('x-youtube-client-name', '2');
            xhr.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
//                    console.log("output: ["+decodeURIComponent(decodeURIComponent(xhr.responseText))+"]");
                    console.log("goIn2AppUT[MV] callback okay!!!");
                    console.log("FIRE:["+uideoURL+"](POST)");
                    
                    var subxhr = new XMLHttpRequest();
                    subxhr.open("POST", uideoURL);
//                    subxhr.setRequestHeader('User-Agent', 'Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5376e Safari/8536.25');
                    subxhr.onreadystatechange = function () {
                        if (this.readyState == 4 && this.status == 200) {
//                            console.log("output: ["+subxhr.responseText+"]");
                            var movielink = subxhr.responseText;
//                            var movielink = decodeURIComponent(decodeURIComponent(xhr.responseText)).match(/\"formats\":\[[^\]]*\]/gi);
                            console.log("goIn2AppUT[MV] callcallback okay!!!");
                            suggestedMovielink = movielink;
                            console.log("RESULT:["+movielink+"]");
                            if ( movielink == null ) {
                                        var loadingTemplate1 = '<document><alertTemplate><title>Video has some issue, please try again.</title><description>Code: 999</description><button><text>OK</text></button></alertTemplate></document>'
                                        var AJAXtemplate1 = new DOMParser().parseFromString(loadingTemplate1, "application/xml");
                                        navigationDocument.presentModal(AJAXtemplate1);
                                        return;
                            }
//                            movielink[0] = '{'+movielink[0]+'}';
//                            obj = JSON.parse(movielink[0]);
//                            var suggestedMovielink = '';
//                            var maxWidthFound = 0;
//                            for ( var i = 0; i < obj.formats.length; i++ ) {
//                                if ( obj.formats[i].height > maxWidthFound ) {
//                                    maxWidthFound = obj.formats[i].height;
//                                    suggestedMovielink = obj.formats[i].url;
//                                    console.log("suggestedMovielink:["+suggestedMovielink+"]("+maxWidthFound+")");
//                                }
//                            }
//                            return;
//                            console.log("movielink.length="+movielink.length+"");

//                            if ( suggestedMovielink == '' ) {
                            if ( !suggestedMovielink.startsWith("http") ) {
                                        var loadingTemplate1 = '<document><alertTemplate><title>Video has some issue, please try again.</title><description>Code: 999</description><button><text>OK</text></button></alertTemplate></document>'
                                        var AJAXtemplate1 = new DOMParser().parseFromString(loadingTemplate1, "application/xml");
                                        navigationDocument.presentModal(AJAXtemplate1);
                                        return;
                            }

                            console.log("InuuuuURL okay!!!");
                            var player = new Player();
                            var playlist = new Playlist();
                            var mediaItem = new MediaItem("video", suggestedMovielink);

                            try {
                                const obj = JSON.parse(xhr.responseText);
                                mediaItem.title = obj.title;
                                mediaItem.subtitle = obj.uploadDate;
            //                    mediaItem.description = obj.description;
//                                mediaItem.artworkImageURL = obj.thumbnailUrl;
                                mediaItem.artworkImageURL = 'https://i.ytimg.com/vi/'+mvParam+'/mqdefault.jpg';
                                skipSpo("https://sponsor.ajay.app/api/skipSegments?videoID="+mvParam+"&categories=%5B%22preview%22%2C%22sponsor%22%2C%22intro%22%2C%22outro%22%2C%22interaction%22%2C%22selfpromo%22%5D",player);

        //                    console.log("Title: "+obj.title);
                            } catch (err) {
                                mediaItem.title = uideoTitle;
                                console.log("JSON error:"+err.message);
                            }

                            player.playlist = playlist;
                            player.playlist.push(mediaItem);
                            player.play();
                        }
                    }
//                    subxhr.send(decodeURIComponent(decodeURIComponent(xhr.responseText)));
                    subxhr.send(xhr.responseText);
                }
            }
            xhr.send();
        }
		function goUT(uPageURL, tvPageURL) {
			console.log("MV AJAX processing...");
			console.log("FIRE:["+uPageURL+"](GET)");
			var xhrUT = new XMLHttpRequest();
			xhrUT.open("GET", uPageURL);
//			xhrUT.setRequestHeader('origin', 'https://piped.lunar.icu');
			xhrUT.setRequestHeader('User-Agent', 'Yattee/174 CFNetwork/1390 Darwin/22.0.0');
//			xhrUT.setRequestHeader('referer', 'https://piped.lunar.icu/');
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

//                                        if(getDomain(uPageURL, true)=="api-piped.shimul.me") {
                                        if(getDomain(uPageURL, true)=="pipedapi.kavin.rocks") {
                                            try {
                                                const obj = JSON.parse(xhrUT.responseText);
                                                mediaItem.title = obj.title;
                                                mediaItem.subtitle = obj.uploadDate;
                            //					mediaItem.description = obj.description;
//                                                mediaItem.artworkImageURL = obj.thumbnailUrl;
                                                mediaItem.artworkImageURL = 'https://i.ytimg.com/vi/'+getParameterByName('mv', tvPageURL)+'/mqdefault.jpg';
                        //					console.log("Title: "+obj.title);
                                            } catch (err) {
                                                console.log("goUT JSON error:"+err.message);
                                            }
                                            skipSpo("https://sponsor.ajay.app/api/skipSegments?videoID="+getParameterByName('mv', tvPageURL)+"&categories=%5B%22preview%22%2C%22sponsor%22%2C%22intro%22%2C%22outro%22%2C%22interaction%22%2C%22selfpromo%22%5D",player);
                                        } else {
                                            mediaItem.title = resultsemail;
                                        }
										
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
                                    goReport(movielink, this.status);
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
        function getFPSAssetId(uri, callback) {
          console.log("===== HERE === ");
            var assetID = uri;
            if (assetID != null) {
                console.log("[FPS]: Successfully parsed asset ID: " + assetID);
                callback(assetID.split("skd://")[1]);
            } else {
                console.log("[FPS]: Error parsing asset ID from URI: " + uri);
                callback(null, "Error parsing asset ID from URI: " + uri);
            }
        }
        function getCertificate(uri, callback) {
            console.log("==== Getting the certificate");

            var certUrl = 'https://static.viu.tv/drm/fairplay-now.cer';
            SkyChnlApi.debugLog("[FPS] certUrl: " + certUrl);
            http.apiRequest(certUrl, "GET", true, "", function(certRequest) {
                if (certRequest.status == 200) {
                    console.log("Received cert data: " + certRequest.responseDataAsBase64);
                    callback(certRequest.responseDataAsBase64);
                } else {
                    console.log("Error receiving cert data" + certRequest.status);
                    callback(null, "Got bad response from server: " + certRequest.status);
                }
            });
        }
        var viutoken = "";
        function getFPSKey(uri, requestData, callback) {
            console.log("======= [FPS] getting the FPS asset key");
            var assetID = uri;
//            var postBody = "payload=" + requestData + "&id=" + assetID;
    // if (fpsToken) postBody += "&fpstoken=" + fpsToken;
    // fpsToken = null; //reset right away.
            var o = {};
            o.rawLicenseRequestBase64 = base64EncodeUint8Array(requestData),
            o.contentKID = encodeURIComponent(assetID),
            o.drmToken = token;

            var keyUrl = 'https://fwp.nowe.com/wrapperFP';
//            console.log("[FPS] keyurl: " + keyUrl + " sending " + postBody);
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
        }
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
        goReport(mediaItem.url, 200);
  	}
        rtdeoURL = ele.getAttribute("rtdeoURL")
        if(rtdeoURL) {
            var xlParam = getParameterByName('xl', rtdeoURL);
            
            xlParam = xlParam.replace("9444", "11552");
            xlParam = xlParam.replace("866", "11507");
            xlParam = xlParam.replace("9710", "11526");
            xlParam = xlParam.replace("9593", "11452");
            xlParam = xlParam.replace("9866", "11199");
            xlParam = xlParam.replace("9427", "9713");


            console.log("xl="+xlParam);

            rtdeoURL = genRTLink1(xlParam);
            console.log("rtdeoURL: "+rtdeoURL);

            var resultsemail = "...";
            var loadingTemplate = '<document><loadingTemplate><activityIndicator><text>Loading'+resultsemail+'</text></activityIndicator></loadingTemplate></document>';
            var AJAXtemplate = new DOMParser().parseFromString(loadingTemplate, "application/xml");
            navigationDocument.presentModal(AJAXtemplate);
            
            console.log("RT AJAX processing...");
            var xhr = new XMLHttpRequest();
            xhr.open("GET", rtdeoURL, true);
//            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
            xhr.setRequestHeader('User-Agent', 'tv-ios/214.20161215 CFNetwork/887 Darwin/17.0.0');
            xhr.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
//                    console.log("output: ["+xhr.responseText+"]");
                    console.log("getU[RT] callback okay!!!");
                    navigationDocument.dismissModal();
//                    obj = JSON.parse(xhr.responseText);
//                    console.log("result: ["+obj.result.stream+"]");
/*                    var res = xhr.responseText.match(/<TITLE>(.*)<\/TITLE>/gi);
                    var x, i, xmlDoc, txt, result;
                    for (i = 0; i < res.length; i++) {
                        console.log("result["+i+"]: "+res[i]);
                    }
*/
                    var sourceText = xhr.responseText;
					if (result = (/<episodeId>(.*)<\/episodeId>/gi).exec(sourceText)) {
						console.log( `Found ${result[1]} at ${result.index}` );
						// shows: Found JavaScript at 12, then:
						// shows: Found javascript at 34
						var bbTime = sourceText.match(/<firstRunTime>([^<]+)<\/firstRunTime>/);
                        console.log("BBTime: "+bbTime[1]);
                        console.log("Now   : "+Math.floor(Date.now() / 1000));
                            sourceText = sourceText.substr(bbTime.index+bbTime[1].length+14+15);
						while ( Math.floor(Date.now() / 1000) < bbTime[1] ) {
//                            sourceText = sourceText.substr(result.index+result[1].length);
                            result = (/<episodeId>(.*)<\/episodeId>/gi).exec(sourceText);
			bbTime = sourceText.match(/<firstRunTime>([^<]+)<\/firstRunTime>/);
                            sourceText = sourceText.substr(bbTime.index+bbTime[1].length+14+15);
                            console.log( `Found ${result[1]} at ${result.index}` );
                            console.log("another link reach!");
						}
						rtdeoURL = genRTLink2(result[1]);
						console.log("rtdeoURL: "+rtdeoURL);
						
						console.log("RT AJAX processing...");
						var xhrEpisode = new XMLHttpRequest();
						xhrEpisode.open("GET", rtdeoURL, true);
//						xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
						xhrEpisode.setRequestHeader('User-Agent', 'tv-ios/214.20161215 CFNetwork/887 Darwin/17.0.0');
						xhrEpisode.onreadystatechange = function () {
							if (this.readyState == 4 && this.status == 200) {
								if (result = (/<streamVideoLink>(.*)<\/streamVideoLink>/gi).exec(xhrEpisode.responseText)) {
									console.log( `Found ${result[1]} at ${result.index}` );
									// shows: Found JavaScript at 12, then:
									// shows: Found javascript at 34
									var player = new Player();
									var playlist = new Playlist();
									var mediaItem = new MediaItem("video", result[1]);

									var rtTitle = xhrEpisode.responseText.match(/<programName><!\[CDATA\[([^<]+)\]\]><\/programName>/);
									var rtSubtitle = xhrEpisode.responseText.match(/<episodeName><!\[CDATA\[([^<]+)\]\]><\/episodeName>/);
									var rtDesc = xhrEpisode.responseText.match(/<description><!\[CDATA\[([^<]+)\]\]><\/description>/);
									var rtArtwork = xhrEpisode.responseText.match(/<episodeImageSmall>([^<]+)<\/episodeImageSmall>/);

									if (rtTitle) {
										mediaItem.title = rtTitle[1];
									}
									if (rtSubtitle) {
										mediaItem.subtitle = rtSubtitle[1];
									}
									if (rtDesc) {
										mediaItem.description = rtDesc[1];
									}
									if (rtArtwork) {
										mediaItem.artworkImageURL = rtArtwork[1];
									}

									player.playlist = playlist;
									player.playlist.push(mediaItem);
									player.play();
                                    goReport(mediaItem.url, 200);
								}
							}
						}
						xhrEpisode.send();
					}
					/*
                    var uoTV = xhr.responseText.match(/\<title\>([^\<]+)\<\/title\>/);
                    if (uoTV) {
                        console.log("TITLE: "+uoTV[1]);
                    }
                    if (result = (/<guid>(.*)<\/guid>/gi).exec(xhr.responseText)) {
                        console.log( `Found ${result[1]} at ${result.index}` );
                        // shows: Found JavaScript at 12, then:
                        // shows: Found javascript at 34
                        var player = new Player();
                        var playlist = new Playlist();
                        var mediaItem = new MediaItem("video", result[1]);
                        if (uoTV) {
                            mediaItem.title = uoTV[1];
                        }

                        player.playlist = playlist;
                        player.playlist.push(mediaItem);
                        player.play();
                    }
					 */
//                    console.log("result: ["+res+"]");

/*                    if (xhr.responseText.match( /https:/gi ) > -1 ) {
                        var res = str.match(/a(i)n/gi);
                        document.getElementById("demo").innerHTML = res[0][2];
                    }
                    var x, i, xmlDoc, txt;
                    xmlDoc = xhr.responseXML;
                    var parser = new DOMParser();
                    xmlDoc = parser.parseFromString(xhr.responseText,"text/xml");
                    txt = "";
                    x = xmlDoc.getElementsByTagName("TITLE");
                    for (i = 0; i< x.length; i++) {
                        txt += x[i].childNodes[0].nodeValue + "<br>";
                    }
                    console.log(txt);
 */
/*                    var xmlDoc = xhr.responseXML;
                    var x = xmlDoc.getElementsByTagName("ARTIST");
                    for (i = 0; i < x.length; i++) {
                        console.log("result["+i+"]: "+x[i].childNodes[0].nodeValue);
                    }
 */
//                    myFunction(this);
                    /*
                    console.log("iiiiURL okay!!!");
                    var player = new Player();
                    var playlist = new Playlist();
                    var mediaItem = new MediaItem("video", obj.result.stream);
                    mediaItem.title = 'i-CABLE News';
                    
                    player.playlist = playlist;
                    player.playlist.push(mediaItem);
                    player.play();
                     */
                }
            }
            xhr.send();
        }
        hideoURL = ele.getAttribute("hideoURL")
        if(hideoURL) {
            var player = new Player();
            var playlist = new Playlist();
            var mediaItem = [];
            
            if (hideoURL.search( /httpss:/gi ) > -1 ) {
                mediaItem.push(new MediaItem("video", "https://player.vimeo.com/external/166355317.hd.mp4?s=155a995c8dbb06fc3804e6eeeef1c595686b02e2&profile_id=119"));
			} else if (hideoURL.search( /\/166323727/gi ) > -1 ) {
				mediaItem.push(new MediaItem("video", "https://player.vimeo.com/external/166323727.hd.mp4?s=0d00f9258cb3a11df58d8545ec1686578334e054&profile_id=119"));
				mediaItem.push(new MediaItem("video", "https://player.vimeo.com/external/166325081.hd.mp4?s=2ddbf6194bc43598b425847bef08a372fd7d4861&profile_id=119"));
				mediaItem.push(new MediaItem("video", "https://player.vimeo.com/external/166336659.hd.mp4?s=84004aea71adc631688cc7b20ae45ef81636dbe0&profile_id=119"));
				mediaItem.push(new MediaItem("video", "https://player.vimeo.com/external/166344635.hd.mp4?s=63e73cf71b88d9b380144519ff7e0682de406235&profile_id=119"));
				mediaItem.push(new MediaItem("video", "https://player.vimeo.com/external/166348635.hd.mp4?s=9eac3797da26f9c50e0374846c1eb504842c9984&profile_id=119"));
				mediaItem.push(new MediaItem("video", "https://player.vimeo.com/external/166355317.hd.mp4?s=155a995c8dbb06fc3804e6eeeef1c595686b02e2&profile_id=119"));
				mediaItem.push(new MediaItem("video", "https://player.vimeo.com/external/166360100.hd.mp4?s=bc01f9868f33526d9ed01d7ee61dc0cc2c3a2f70&profile_id=119"));
				mediaItem.push(new MediaItem("video", "https://player.vimeo.com/external/166396044.hd.mp4?s=63b6944d9c5b76b7a44029a027e6c82acdf21da3&profile_id=119"));
				mediaItem.push(new MediaItem("video", "https://player.vimeo.com/external/166399667.hd.mp4?s=20f00a08e7279d4319f64f78af7b35f7cf51fb6e&profile_id=119"));
				mediaItem.push(new MediaItem("video", "https://player.vimeo.com/external/166388033.hd.mp4?s=57cc8897e259e44a00ea156acf0b55536e6505d2&profile_id=119"));
            } else if (hideoURL.search( /\/mosttenbig.m3u8/gi ) > -1 ) {
                mediaItem.push(new MediaItem("video", "https://player.vimeo.com/external/151514227.hd.mp4?s=eca5916034329992d5d6303ef588f3571eee71bb&profile_id=119"));
                mediaItem.push(new MediaItem("video", "https://player.vimeo.com/external/151517881.hd.mp4?s=33f457471518f1c85ee2c5ba0e7420b1bf9adaed&profile_id=119"));
                mediaItem.push(new MediaItem("video", "https://player.vimeo.com/external/151520703.hd.mp4?s=7ce4e4e39403d53f45db638daf1f7890b0a0f2ea&profile_id=119"));
                mediaItem.push(new MediaItem("video", "https://player.vimeo.com/external/151515784.hd.mp4?s=54d1abfc7a26e29be37dd0a4049392e391382eaa&profile_id=119"));
                mediaItem.push(new MediaItem("video", "https://player.vimeo.com/external/151516633.hd.mp4?s=8f71392f649b9d4d6074f57e1dce8be2b1a4feee&profile_id=119"));
                mediaItem.push(new MediaItem("video", "https://player.vimeo.com/external/151519940.hd.mp4?s=906be57ac04e71089c736fd055f394515b4e1367&profile_id=119"));
                mediaItem.push(new MediaItem("video", "https://player.vimeo.com/external/151519943.hd.mp4?s=095abbcaafee331f26f20459b9b74d9f933ed82b&profile_id=119"));
                mediaItem.push(new MediaItem("video", "https://player.vimeo.com/external/151526627.hd.mp4?s=e17c043a4fd5f1c91daabc184beb4523a8e4b809&profile_id=119"));
                mediaItem.push(new MediaItem("video", "https://player.vimeo.com/external/151526626.hd.mp4?s=da847c3069472e6e98d92ea49ee7e4796926d843&profile_id=119"));
                mediaItem.push(new MediaItem("video", "https://player.vimeo.com/external/151539515.hd.mp4?s=68542ecc6daa0505f4845a7271e021faec439af3&profile_id=119"));
                mediaItem.push(new MediaItem("video", "https://player.vimeo.com/external/151539513.hd.mp4?s=7d3a5e367a5ecde315056079489f53fdee00baef&profile_id=119"));
                mediaItem.push(new MediaItem("video", "https://player.vimeo.com/external/151539516.hd.mp4?s=7b43d8a8cc6156599418f97937774e004d0055d7&profile_id=119"));
                mediaItem.push(new MediaItem("video", "https://player.vimeo.com/external/151539514.hd.mp4?s=f3ceeef64752bb6de133edb4e822095d8f76ac91&profile_id=119"));
            }

            player.playlist = playlist;
            mediaItem.forEach(addMe, player.playlist);
            console.log("Playlist items: " + player.playlist.length);
            
            if (player.playlist.length>0) {
                player.play();
            }
        }
        aideoURL = ele.getAttribute("aideoURL")
        if(aideoURL) {
            console.log("aideoURL: "+aideoURL);
            var player = new Player();
            var playlist = new Playlist();
            var mediaItem1 = new MediaItem("video", "https://r1---sn-vgqsrned.googlevideo.com/videoplayback?expire=1562765034&ei=ipIlXYOAM8WlwQGCn6P4CA&ip=107.178.194.245&id=o-ALmrpvXuJYSFBcPeuc-XqQqeCtOWl8tTtF4V3LtOHsfX&itag=22&source=youtube&requiressl=yes&mm=31%2C26&mn=sn-vgqsrned%2Csn-qxoedn7k&ms=au%2Conr&mv=u&mvi=0&pl=28&mime=video%2Fmp4&ratebypass=yes&dur=1297.136&lmt=1562588627512478&mt=1562742835&fvip=1&c=MWEB&txp=2316222&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cmime%2Cratebypass%2Cdur%2Clmt&sig=ALgxI2wwRQIgJjiap9bvvKcS0EZK2zoFqVBkAVzTRw9LTgQqfKOg5gICIQClKxN-2tQpwwmtWZmp3Ly_C4GzGzOjcZnvB516jZqQ1w%3D%3D&lsparams=mm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl&lsig=AHylml4wRQIgLcg4eONH3RMPBnjhb70I7rTYWWkDN4K1fanbbhUJjYQCIQCgF21razIKdnwMxpqmV6xL-kzZrOfFk0hnCWgAnK7xHA%3D%3D");
            var mediaItem2 = new MediaItem("video", "https://livecdn01-earthtv-com.freetls.fastly.net/stream25/cdnedge/smil:TWL-en.smil/playlist.m3u8?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJodHRwczovL2xpdmVjbG91ZC5lYXJ0aHR2LmNvbSIsImh0dHBzOi8vbGl2ZWNsb3VkLmVhcnRodHYuY29tIjp7ImFpZCI6IjcwMWI2OTI5LTUxOWEtNDI3NS05YTVjLTllNTU5ZDNhZDg4NCIsInNpZCI6IjBjMzU0NGFiLTRiYjEtNDE3ZS04ZWFjLTIyYTllZDdhNTUxZiIsInRpZCI6ImFiNDNjMzQ1LTk4MmMtNGEwYS1hZjEyLTBkYWQwNmUzMmY1ZiIsInR5cCI6InVyaSJ9LCJpYXQiOjE1NTA1NjQ3ODZ9.yPZT9XYIJq4YNlaR7eycjQeApd9IcH5Z4E0QT6dSjX8");
            mediaItem1.title = "V1";
            mediaItem2.title = "V2";

            player.playlist = playlist;
            player.playlist.push(mediaItem1);
            player.playlist.push(mediaItem2);
            player.play();
        }
        oldeoURL = ele.getAttribute("oldeoURL")
        if(oldeoURL) {
            oldeoURL = gennnOink();
            console.log("oldeoURL: "+oldeoURL);

            var resultsemail = "Olympic Channel";
            var loadingTemplate = '<document><loadingTemplate><activityIndicator><text>Loading'+resultsemail+'</text></activityIndicator></loadingTemplate></document>';
            var AJAXtemplate = new DOMParser().parseFromString(loadingTemplate, "application/xml");
            navigationDocument.presentModal(AJAXtemplate);

            console.log("OL AJAX processing...");
            var xhr = new XMLHttpRequest();
            xhr.open("GET", oldeoURL);
//            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
            xhr.setRequestHeader('User-Agent', 'Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5376e Safari/8536.25');
            xhr.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
//                    console.log("output: ["+xhr.responseText+"]");
                    console.log("getU[NL] callback okay!!!");
                    navigationDocument.dismissModal();
                    obj = JSON.parse(xhr.responseText);
                    console.log("result: ["+obj+"]");

                    console.log("nnnnURL okay!!!");
                    var player = new Player();
                    var playlist = new Playlist();
                    var mediaItem = new MediaItem("video", obj);
                    mediaItem.title = 'now Live';

                    player.playlist = playlist;
                    player.playlist.push(mediaItem);
                    player.play();
                    goReport(mediaItem.url, 200);
                }
            }
//            xhr.send(JSON.stringify(getData));
            xhr.send();
        }
        nldeoURL = ele.getAttribute("nldeoURL")
        if(nldeoURL) {
            nldeoURL = gennnLink();
            console.log("nldeoURL: "+nldeoURL);

            var resultsemail = "...";
            var loadingTemplate = '<document><loadingTemplate><activityIndicator><text>Loading'+resultsemail+'</text></activityIndicator></loadingTemplate></document>';
            var AJAXtemplate = new DOMParser().parseFromString(loadingTemplate, "application/xml");
            navigationDocument.presentModal(AJAXtemplate);

            var getData = {
            channelno: "331",
            mode: "prod",
            audioCode: "",
            format: "HLS",
            callerReferenceNo: "20140702122500"
            };

            console.log("NL AJAX processing...");
            var xhr = new XMLHttpRequest();
            xhr.open("POST", nldeoURL);
//            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
            xhr.setRequestHeader('User-Agent', 'Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5376e Safari/8536.25');
            xhr.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
//                    console.log("output: ["+xhr.responseText+"]");
                    console.log("getU[NL] callback okay!!!");
                    navigationDocument.dismissModal();
                    obj = JSON.parse(xhr.responseText);
                    console.log("result: ["+obj.asset.hls.adaptive+"]");

                    console.log("nnnnURL okay!!!");
                    var player = new Player();
                    var playlist = new Playlist();
                    var mediaItem = new MediaItem("video", obj.asset.hls.adaptive);
                    mediaItem.title = 'now Live';

                    player.playlist = playlist;
                    player.playlist.push(mediaItem);
                    player.play();
                    goReport(mediaItem.url, 200);
                }
            }
            xhr.send(JSON.stringify(getData));
        }
        uldeoURL = ele.getAttribute("uldeoURL")
        if(uldeoURL) {
            console.log("uldeoURL: "+uldeoURL);

            var resultsemail = "...";
            var loadingTemplate = '<document><loadingTemplate><activityIndicator><text>Loading'+resultsemail+'</text></activityIndicator></loadingTemplate></document>';
            var AJAXtemplate = new DOMParser().parseFromString(loadingTemplate, "application/xml");
            navigationDocument.presentModal(AJAXtemplate);

            var getData = {
            "callerReferenceNo": timestamp(),
            "format": "HLS",
            "deviceId": deviceID(),
            "contentId": "099",
            "mode": "prod",
            "deviceType": "IOS_TABLET",
            "contentType": "Channel",
            "channelno":"099"
            };

            console.log("UL AJAX processing...");
            var xhr = new XMLHttpRequest();
            xhr.open("POST", gennnLink2());
//            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
            xhr.setRequestHeader('User-Agent', 'viutv-tvos/2.0.4 (tv.viu.viutv; build:11; tvOS 12.4.0) Alamofire/4.7.3');
            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
//                    console.log("output: ["+xhr.responseText+"]");
                    console.log("getU[NL] callback okay!!!");
                    navigationDocument.dismissModal();
                    obj = JSON.parse(xhr.responseText);
                    console.log("result: ["+obj.asset+"]");
                    console.log("token: ["+obj.drmToken+"]");
                    viutoken = obj.drmToken;

                    console.log("nnnnURL okay!!!");
                    var player = new Player();
                    var playlist = new Playlist();
//                    var mediaItem = new MediaItem("video", obj.asset);
                    var mediaItem = new MediaItem("video", obj.asset[0]);
                    mediaItem.title = 'viu99';
//                    mediaItem.loadAssetID = getFPSAssetId;
//                    mediaItem.loadCertificate = getCertificate;
//                    mediaItem.loadKey = getFPSKey;
                    mediaItem.loadAssetID = function(url, callback) {
               console.log('loadAssetID started.')
                               callback(btoa("91ba752a-4461-48c6-8400-d78374b178b4"));
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
            request.open('GET', 'https://static.viu.tv/drm/fairplay-now.cer', true);
            request.setRequestHeader('Pragma', 'Cache-Control: no-cache');
            request.setRequestHeader('User-Agent', 'viutv-tvos/11 CFNetwork/978.0.7 Darwin/18.7.0');
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
o.drmToken = viutoken;
            request.open('POST', 'https://fwp.nowe.com/wrapperFP', true);
            request.setRequestHeader('User-Agent', 'viutv-tvos/11 CFNetwork/978.0.7 Darwin/18.7.0');
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
                               o.drmToken = viutoken;

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
                    goReport(mediaItem.url, 200);
                }
            }
            xhr.send(JSON.stringify(getData));
        }
        updeoURL = ele.getAttribute("updeoURL")
        if(updeoURL) {
            console.log("updeoURL: "+updeoURL);

            var resultsemail = "...";
            var loadingTemplate = '<document><loadingTemplate><activityIndicator><text>Loading'+resultsemail+'</text></activityIndicator></loadingTemplate></document>';
            var AJAXtemplate = new DOMParser().parseFromString(loadingTemplate, "application/xml");
            navigationDocument.presentModal(AJAXtemplate);

            var getData = {
            "callerReferenceNo": timestamp(),
            "format": "HLS",
            "deviceId": deviceID(),
            "contentId": "099",
            "mode": "prod",
            "deviceType": "IOS_TABLET",
            "contentType": "Channel",
            "channelno":"099"
            };

            console.log("UL AJAX processing...");
            var xhr = new XMLHttpRequest();
            xhr.open("POST", gennnLink2());
//            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
            xhr.setRequestHeader('User-Agent', 'viutv-tvos/2.0.4 (tv.viu.viutv; build:11; tvOS 12.4.0) Alamofire/4.7.3');
            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
//                    console.log("output: ["+xhr.responseText+"]");
                    console.log("getU[NL] callback okay!!!");
                    navigationDocument.dismissModal();
                    obj = JSON.parse(xhr.responseText);
                    console.log("result: ["+obj.asset+"]");
                    console.log("token: ["+obj.drmToken+"]");
                    viutoken = obj.drmToken;

                    console.log("nnnnURL okay!!!");
                    var player = new Player();
                    var playlist = new Playlist();
//                    var mediaItem = new MediaItem("video", obj.asset);
                    var mediaItem = new MediaItem("video", updeoURL);
                    mediaItem.title = 'viu99';
//                    mediaItem.loadAssetID = getFPSAssetId;
//                    mediaItem.loadCertificate = getCertificate;
//                    mediaItem.loadKey = getFPSKey;
                    mediaItem.loadAssetID = function(url, callback) {
               console.log('loadAssetID started.')
                               callback(btoa("91ba752a-4461-48c6-8400-d78374b178b4"));
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
            request.open('GET', 'https://static.viu.tv/drm/fairplay-now.cer', true);
            request.setRequestHeader('Pragma', 'Cache-Control: no-cache');
            request.setRequestHeader('User-Agent', 'viutv-tvos/11 CFNetwork/978.0.7 Darwin/18.7.0');
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
o.drmToken = viutoken;
            request.open('POST', 'https://fwp.nowe.com/wrapperFP', true);
            request.setRequestHeader('User-Agent', 'viutv-tvos/11 CFNetwork/978.0.7 Darwin/18.7.0');
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
                               o.drmToken = viutoken;

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
                    goReport(mediaItem.url, 200);
                }
            }
            xhr.send(JSON.stringify(getData));
        }
        wedeoURL = ele.getAttribute("wedeoURL")
        if(wedeoURL) {
            console.log("wedeoURL: "+wedeoURL);
            
            if(getDomain(wedeoURL, true)=="netleave.appspot.com") {
/*
                var cyParam = getParameterByName('ch', uideoURL);
                console.log("ch="+cyParam);
                
                if(cyParam) {
*/
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

//                            goUT(xhr.responseText);
                            if(weParam) {
                                goUT("https://m.youtube.com/watch?v="+weParam, xhr.responseText);
                            }
                            //                            goUTTV(xhr.responseText.replace('m.youtube.com/watch', 'www.youtube.com/appletv/watch'));
                            /*
                             var subxhr = new XMLHttpRequest();
                             subxhr.open("POST", uideoURL);
                             //            subxhr.setRequestHeader('User-Agent', 'Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5376e Safari/8536.25');
                             subxhr.onreadystatechange = function () {
                             if (this.readyState == 4 && this.status == 200) {
                             console.log("output: ["+subxhr.responseText+"]");
                             console.log("getU callcallback okay!!!");
                             navigationDocument.dismissModal();
                             //                    playVideo("Hello TVML!",subxhr.responseText);
                             console.log("uuuuURL okay!!!");
                             var player = new Player();
                             var playlist = new Playlist();
                             var mediaItem = new MediaItem("video", subxhr.responseText);
                             mediaItem.title = resultsemail;
                             
                             player.playlist = playlist;
                             player.playlist.push(mediaItem);
                             player.play();
                             }
                             }
                             subxhr.send(xhr.responseText);
                             */
                        }
                    }
                    xhr.send();
                }
            }
        }
        wadeoURL = ele.getAttribute("wadeoURL")
        if(wadeoURL) {
            console.log("wadeoURL: "+wadeoURL);
            
            if(getDomain(wadeoURL, true)=="netleave.appspot.com") {
/*
                var cyParam = getParameterByName('ch', uideoURL);
                console.log("ch="+cyParam);
                
                if(cyParam) {
*/
                if(wadeoURL) {
                    var resultsemail = "...";
                    var loadingTemplate = '<document><loadingTemplate><activityIndicator><text>Loading'+resultsemail+'</text></activityIndicator></loadingTemplate></document>';
                    var AJAXtemplate = new DOMParser().parseFromString(loadingTemplate, "application/xml");
                    navigationDocument.presentModal(AJAXtemplate);
                    
                    console.log("WA AJAX processing...");
                    var xhr = new XMLHttpRequest();
                    xhr.open("GET", wadeoURL);
                    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
                    xhr.setRequestHeader('User-Agent', 'Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5376e Safari/8536.25');
                    xhr.onreadystatechange = function () {
                        if (this.readyState == 4 && this.status == 200) {
                            console.log("output: ["+xhr.responseText+"]");
                            console.log("getU[WA] callback okay!!!");
                            
                            var weParam = getParameterByName('mv', xhr.responseText);
                            console.log("wa="+weParam);

//                            goUT(xhr.responseText);
                            if(weParam) {
//                                goUT("https://api-piped.shimul.me/streams/"+weParam, xhr.responseText);
//                                goUT("https://pipedapi.kavin.rocks/streams/"+weParam, xhr.responseText);
//                                goUT("https://pipedapi.aeong.one/streams/"+weParam, xhr.responseText);
//                                goUT("https://api.piped.privacydev.net/streams/"+weParam, xhr.responseText);
                                goUT("https://pipedapi.wireway.ch/streams/"+weParam, xhr.responseText);
//                                goUT("https://pipedapi.ezero.space/streams/"+weParam, xhr.responseText);
                            }
                            //                            goUTTV(xhr.responseText.replace('m.youtube.com/watch', 'www.youtube.com/appletv/watch'));
                            /*
                             var subxhr = new XMLHttpRequest();
                             subxhr.open("POST", uideoURL);
                             //            subxhr.setRequestHeader('User-Agent', 'Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5376e Safari/8536.25');
                             subxhr.onreadystatechange = function () {
                             if (this.readyState == 4 && this.status == 200) {
                             console.log("output: ["+subxhr.responseText+"]");
                             console.log("getU callcallback okay!!!");
                             navigationDocument.dismissModal();
                             //                    playVideo("Hello TVML!",subxhr.responseText);
                             console.log("uuuuURL okay!!!");
                             var player = new Player();
                             var playlist = new Playlist();
                             var mediaItem = new MediaItem("video", subxhr.responseText);
                             mediaItem.title = resultsemail;
                             
                             player.playlist = playlist;
                             player.playlist.push(mediaItem);
                             player.play();
                             }
                             }
                             subxhr.send(xhr.responseText);
                             */
                        }
                    }
                    xhr.send();
                }
            }
        }
        amdeoURL = ele.getAttribute("amdeoURL")
        if(amdeoURL) {
            amdeoURL = 'https://netleave.appspot.com/AMEntplayer';
            console.log("amdeoURL: "+amdeoURL);
            
            var resultsemail = "...";
            var loadingTemplate = '<document><loadingTemplate><activityIndicator><text>Loading'+resultsemail+'</text></activityIndicator></loadingTemplate></document>';
            var AJAXtemplate = new DOMParser().parseFromString(loadingTemplate, "application/xml");
            navigationDocument.presentModal(AJAXtemplate);
            
            console.log("AM AJAX processing...");
            var xhr = new XMLHttpRequest();
            xhr.open("GET", amdeoURL);
            xhr.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    console.log("output: ["+xhr.responseText+"]");
                    console.log("getU[AM] callback okay!!!");
                    navigationDocument.dismissModal();
                    obj = JSON.parse(xhr.responseText);
                    console.log("result: ["+obj.AMENT[0].name+"]");
                    
                    items = obj.AMENT;
                    
                    var player = new Player();
                    var playlist = new Playlist();
                    items.forEach(addAMEnt, playlist);
                    player.playlist = playlist;
                    
                    console.log("Playlist items: " + player.playlist.length);
                    
                    if (player.playlist.length>0) {
                        player.play();
                    }
                }
            }
            xhr.send();
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
        iedeoURL = ele.getAttribute("iedeoURL")
        if(iedeoURL) {
            iedeoURL = genieLink();
            console.log("iedeoURL: "+iedeoURL);
            
            var resultsemail = "...";
            var loadingTemplate = '<document><loadingTemplate><activityIndicator><text>Loading'+resultsemail+'</text></activityIndicator></loadingTemplate></document>';
            var AJAXtemplate = new DOMParser().parseFromString(loadingTemplate, "application/xml");
            navigationDocument.presentModal(AJAXtemplate);
            
            console.log("II AJAX processing...");
            var xhr = new XMLHttpRequest();
            xhr.open("GET", iedeoURL);
//            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
            xhr.setRequestHeader('User-Agent', 'i-CABLE/1.0.6 (iPad; iOS 11.0.3; Scale/2.00)');
            xhr.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
//                    console.log("output: ["+xhr.responseText+"]");
                    console.log("getU[II] callback okay!!!");
                    navigationDocument.dismissModal();
                    obj = JSON.parse(xhr.responseText);
                    console.log("result: ["+obj.result.method+"]");
                    
                    items = obj.result.content_list;
                    
                    var player = new Player();
                    var playlist = new Playlist();
                    items.forEach(addiEnt, playlist);
                    player.playlist = playlist;
                    
                    console.log("Playlist items: " + player.playlist.length);
                    
                    if (player.playlist.length>0) {
                        player.play();
                    }
                }
            }
            xhr.send();
        }
        ifdeoURL = ele.getAttribute("ifdeoURL")
        if(ifdeoURL) {
            ifdeoURL = genifLink();
            console.log("ifdeoURL: "+ifdeoURL);
            
            var resultsemail = "...";
            var loadingTemplate = '<document><loadingTemplate><activityIndicator><text>Loading'+resultsemail+'</text></activityIndicator></loadingTemplate></document>';
            var AJAXtemplate = new DOMParser().parseFromString(loadingTemplate, "application/xml");
            navigationDocument.presentModal(AJAXtemplate);
            
            console.log("II AJAX processing...");
            var xhr = new XMLHttpRequest();
            xhr.open("GET", ifdeoURL);
//            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
            xhr.setRequestHeader('User-Agent', 'i-CABLE/1.0.6 (iPad; iOS 11.0.3; Scale/2.00)');
            xhr.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
//                    console.log("output: ["+xhr.responseText+"]");
                    console.log("getU[II] callback okay!!!");
                    navigationDocument.dismissModal();
                    obj = JSON.parse(xhr.responseText);
                    console.log("result: ["+obj.result.method+"]");

                    items = obj.result.content_list;

                    var player = new Player();
                    var playlist = new Playlist();
                    items.forEach(addiFin, playlist);
                    player.playlist = playlist;
                    
                    console.log("Playlist items: " + player.playlist.length);

                    if (player.playlist.length>0) {
                        player.play();
                    }
                }
            }
            xhr.send();
        }
        modeoURL = ele.getAttribute("modeoURL")
        if(modeoURL) {
            modeoURL = genMoveLink();
            console.log("modeoURL: "+modeoURL);
            
            var resultsemail = "...";
            var loadingTemplate = '<document><loadingTemplate><activityIndicator><text>Loading'+resultsemail+'</text></activityIndicator></loadingTemplate></document>';
            var AJAXtemplate = new DOMParser().parseFromString(loadingTemplate, "application/xml");
            navigationDocument.presentModal(AJAXtemplate);
            
            console.log("II AJAX processing...");
            var xhr = new XMLHttpRequest();
            xhr.open("GET", modeoURL);
//            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
            xhr.setRequestHeader('User-Agent', 'Apple Daily PROD/5.9.0 (iPhone; iOS 11.1.1; Scale/2.00)');
            xhr.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
//                    console.log("output: ["+xhr.responseText+"]");
                    console.log("getU[II] callback okay!!!");
                    navigationDocument.dismissModal();
                    obj = JSON.parse(xhr.responseText);
                    console.log("result: ["+obj.state+"]");
                    items = obj.content;
                    
                    var player = new Player();
                    var playlist = new Playlist();
                    items.forEach(addMove, playlist);
                    player.playlist = playlist;

                    console.log("Playlist items: " + player.playlist.length);
                    
                    if (player.playlist.length>0) {
                        player.play();
                    }
                }
            }
            xhr.send();
        }
        podeoURL = ele.getAttribute("podeoURL")
        podeoTT = ele.getAttribute("poTitle")
        if(podeoURL) {
            var resultsemail = "...";
            if(podeoTT) { resultsemail = podeoTT }
            var loadingTemplate = '<document><loadingTemplate><activityIndicator><text>Loading'+resultsemail+'</text></activityIndicator></loadingTemplate></document>';
            var AJAXtemplate = new DOMParser().parseFromString(loadingTemplate, "application/xml");
            navigationDocument.presentModal(AJAXtemplate);
            
            var cyParam = getParameterByName('ch', podeoURL);
            cyParam = cyParam.replace("PLPY0_ooDN1dt-B9om-dPyZ5F7xdDXHmPk", "PLPY0_ooDN1dswSMK8akjVipmqYFvAjXBq");
            cyParam = cyParam.replace("PLzrFT7CrcDKzqJjFo5a4OVmUbW-Iv_g4W", "PLzrFT7CrcDKzdQ1hSVT5LFdMDpRvip3by");

            console.log("ch="+cyParam);
            
            if(cyParam) {
//            podeoURL = 'https://inv.riverside.rocks/api/v1/playlists/'+cyParam
//            podeoURL = 'https://pipedapi.tokhmi.xyz/playlists/'+cyParam
//            podeoURL = 'https://pipedapi.kavin.rocks/playlists/'+cyParam
//            podeoURL = 'https://piped-api.lunar.icu/playlists/'+cyParam
//            podeoURL = 'https://pipedapi.adminforge.de/playlists/'+cyParam
//                podeoURL = 'https://api.piped.yt/playlists/'+cyParam
                podeoURL = 'https://api.piped.private.coffee/playlists/'+cyParam
//            podeoURL = 'https://pipedapi.osphost.fi/playlists/'+cyParam
//            podeoURL = 'https://api.piped.projectsegfau.lt/playlists/'+cyParam
            console.log("podeoURL: "+podeoURL);

            console.log("III AJAX processing...");
            var xhr = new XMLHttpRequest();
            xhr.open("GET", podeoURL);
//            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
            xhr.setRequestHeader('User-Agent', 'Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5376e Safari/8536.25');
            xhr.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
//                    console.log("output: ["+xhr.responseText+"]");
                    console.log("getU[III] callback okay!!!");
                    navigationDocument.dismissModal();
                    obj = JSON.parse(xhr.responseText);
//                    console.log("result: ["+obj.title+"]");
//                    items = obj.videos;
                    console.log("result: ["+obj.name+"]");
                    items = obj.relatedStreams;
                    
                    var player = new Player();
                    player.addEventListener('mediaItemWillChange', function(event){
                        console.log("change reason:"+event.reason+" currentId:"+getParameterByName('id', event.target.currentMediaItem.url))
                        checkandSkip(event.target.currentMediaItem.url, event.target);
//                        skipSpo("https://sponsor.ajay.app/api/skipSegments?videoID="+getParameterByName('id', event.target.currentMediaItem.url)+"&categories=%5B%22preview%22%2C%22sponsor%22%2C%22intro%22%2C%22outro%22%2C%22interaction%22%2C%22selfpromo%22%5D",event.target);
                    });
                    player.addEventListener('stateWillChange', function(event){
                        console.log("event: "+ event.oldState+ "->"+ event.state+ " player:"+ event.target.playbackState);
//                        console.log(event.target);
                        if (event.state == 'playing' && event.oldState == 'loading') {
                            setTimeout(function(con,orgURL){
                                console.log("8s READY to check~~~");
                                if ( orgURL == con.currentMediaItem.url ) {
                                    if (con.currentMediaItemDuration == 0) {
                                        con.next();
                                    } else {
                                        console.log("READY to play!");
                                    }
                                } else {
                                    console.log("NOT the same movie!");
                                }
                            }.bind(null, player, player.currentMediaItem.url), 8000);
                        }
                    });
                    player.addEventListener('playbackError', function(event){
                        event.target.next();
                        console.log("error with reason:"+event.reason, event);
                    });
                    var playlist = new Playlist();
//                    items.forEach(addPiped, playlist);
                    items.forEach(addInvidious, playlist);
                    player.playlist = playlist;

                    console.log("Playlist items: " + player.playlist.length);

                    if (player.playlist.length>0) {
                        player.play();
                        checkandSkip(player.currentMediaItem.url, player);
//                        skipSpo("https://sponsor.ajay.app/api/skipSegments?videoID="+obj.videos[0].videoId+"&categories=%5B%22preview%22%2C%22sponsor%22%2C%22intro%22%2C%22outro%22%2C%22interaction%22%2C%22selfpromo%22%5D",player);
//                        skipSpo("https://sponsor.ajay.app/api/skipSegments?videoID="+obj.relatedStreams[0].url.replace('/watch?v=', '')+"&categories=%5B%22preview%22%2C%22sponsor%22%2C%22intro%22%2C%22outro%22%2C%22interaction%22%2C%22selfpromo%22%5D",player);
                    }
                }
            }
            xhr.send();
            }
        }
        prdeoURL = ele.getAttribute("prdeoURL")
        podeoTT = ele.getAttribute("poTitle")
        if(prdeoURL) {
            var resultsemail = "...";
            if(podeoTT) { resultsemail = podeoTT }
            var loadingTemplate = '<document><loadingTemplate><activityIndicator><text>Loading'+resultsemail+'</text></activityIndicator></loadingTemplate></document>';
            var AJAXtemplate = new DOMParser().parseFromString(loadingTemplate, "application/xml");
            navigationDocument.presentModal(AJAXtemplate);
            
            var cysParam = getParameterByName('ch', prdeoURL);
            let text = "How are you doing today?";
            const chParam = cysParam.split(",");
            chParam.forEach(function(cyParam, index, array) {
                console.log("ch="+cyParam);
            });

            console.log("IV AJAX processing...");

            if(chParam.length > 0) {

            var player = new Player();
            player.addEventListener('mediaItemWillChange', function(event){
                console.log("change reason:"+event.reason+" currentId:"+getParameterByName('id', event.target.currentMediaItem.url))
                checkandSkip(event.target.currentMediaItem.url, event.target);
            });
            player.addEventListener('stateWillChange', function(event){
                console.log("event: "+ event.oldState+ "->"+ event.state+ " player:"+ event.target.playbackState);
//                        console.log(event.target);
                if (event.state == 'playing' && event.oldState == 'loading') {
                    setTimeout(function(con,orgURL){
                        console.log("8s READY to check~~~");
                        if ( orgURL == con.currentMediaItem.url ) {
                            if (con.currentMediaItemDuration == 0) {
                                con.next();
                            } else {
                                console.log("READY to play!");
                            }
                        } else {
                            console.log("NOT the same movie!");
                        }
                    }.bind(null, player, player.currentMediaItem.url), 8000);
                }
            });
            player.addEventListener('playbackError', function(event){
                event.target.next();
                console.log("error with reason:"+event.reason, event);
            });

            var all_items = [];

            chParam.forEach(function(cyParam, index, array) {
//            podeoURL = 'https://inv.riverside.rocks/api/v1/playlists/'+cyParam
//            prdeoURL = 'https://pipedapi.tokhmi.xyz/channel/'+cyParam
//            prdeoURL = 'https://api-piped.mha.fi/channel/'+cyParam
//            prdeoURL = 'https://piped-api.garudalinux.org/channel/'+cyParam
            prdeoURL = 'https://pipedapi.drgns.space/channel/'+cyParam
            console.log("prdeoURL: "+prdeoURL);

            var xhr = new XMLHttpRequest();
            xhr.open("GET", prdeoURL, false);
//            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
            xhr.setRequestHeader('User-Agent', 'Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5376e Safari/8536.25');
            xhr.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
//                    console.log("output: ["+xhr.responseText+"]");
                    console.log("getU[IV] callback okay!!!");
//                    navigationDocument.dismissModal();

                    obj = JSON.parse(xhr.responseText);
//                    console.log("result: ["+obj.title+"]");
//                    items = obj.videos;
                    console.log("result: ["+obj.name+"]");
                    items = obj.relatedStreams;
//                        items.push(items);
                    for(var i in items) {
                        all_items.push(items[i]);
                    }
                }
            }
            xhr.send();
            });

            all_items.sort(function(a, b){
                return b.uploaded - a.uploaded;
            });
            
            var playlist = new Playlist();
            all_items.forEach(addInvidious, playlist);
            player.playlist = playlist;
            console.log("Playlist items: " + player.playlist.length);
            navigationDocument.dismissModal();

            if (player.playlist.length>0) {
                player.play();
                checkandSkip(player.currentMediaItem.url, player);
            }
            }
        }
        uideoURL = ele.getAttribute("uideoURL")
        uideoTT = ele.getAttribute("uiTitle")
        if(uideoURL) {
            console.log("URLDomain: "+getDomain(uideoURL, true));
            
            if(getDomain(uideoURL, true)=="netleave.appspot.com") {
         
                var myParam = getParameterByName('mv', uideoURL);

                if (myParam) {
                    myParam = myParam.replace("DOPEzhk8u28", "4Ck5f_GUn2w");
                    console.log("mv="+myParam);
                } else {
                    console.log("Parameter 'myParam' is null or undefined.");
                }

                if(myParam) {
                    var resultsemail = "...";
                    var loadingTemplate = '<document><loadingTemplate><activityIndicator><text>Loading'+resultsemail+'</text></activityIndicator></loadingTemplate></document>';
                    var AJAXtemplate = new DOMParser().parseFromString(loadingTemplate, "application/xml");
                    navigationDocument.presentModal(AJAXtemplate);
                    
//                    goUT("https://m.youtube.com/watch?v="+myParam, uideoURL);
//                    goUT("https://api-piped.shimul.me/streams/"+myParam, uideoURL);
//                    goUT("https://pipedapi.kavin.rocks/streams/"+myParam, uideoURL);
//                    goUT("https://pipedapi.aeong.one/streams/"+myParam, uideoURL);
//                    goUT("https://api.piped.privacydev.net/streams/"+myParam, uideoURL);
                    goUT("https://pipedapi.wireway.ch/streams/"+myParam, uideoURL);
//                    goUT("https://pipedapi.ezero.space/streams/"+myParam, uideoURL);
//                    goIn2AppUT("https://m.youtube.com/watch?v="+myParam, uideoURL, uideoTT);
//                    goUTTV("https://www.youtube.com/appletv/watch?v="+myParam);
/*
                    console.log("MV AJAX processing...");
                    var xhr = new XMLHttpRequest();
                    xhr.open("GET", "https://m.youtube.com/watch?v="+myParam);
                    xhr.setRequestHeader('User-Agent', 'Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5376e Safari/8536.25');
                    xhr.onreadystatechange = function () {
                        if (this.readyState == 4 && this.status == 200) {
                            //            console.log("output: ["+xhr.responseText+"]");
                            console.log("getU[MV] callback okay!!!");
                            
                            var subxhr = new XMLHttpRequest();
                            subxhr.open("POST", uideoURL);
                            //            subxhr.setRequestHeader('User-Agent', 'Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5376e Safari/8536.25');
                            subxhr.onreadystatechange = function () {
                                if (this.readyState == 4 && this.status == 200) {
                                    console.log("output: ["+subxhr.responseText+"]");
                                    console.log("getU[MV] callcallback okay!!!");
                                    navigationDocument.dismissModal();
                                    //                    playVideo("Hello TVML!",subxhr.responseText);
                                    console.log("uuuuURL okay!!!");
                                    var player = new Player();
                                    var playlist = new Playlist();
                                    var mediaItem = new MediaItem("video", subxhr.responseText);
                                    mediaItem.title = resultsemail;
                                    
                                    player.playlist = playlist;
                                    player.playlist.push(mediaItem);
                                    player.play();
                                }
                            }
                            subxhr.send(xhr.responseText);
                        }
                    }
                    xhr.send();
 */
                }

                var cyParam = getParameterByName('ch', uideoURL);
                var numberParam = getParameterByName('no', uideoURL);
                
                if (cyParam) {
//                    cyParam = cyParam.replace("PLrB86vfeOe3ZbFejGBKLlebcj0SKwhgFG", "PLDvDiLKUHy2NK3mZN5vwyW2lvM00CkLwc");
                    if ( cyParam == "PLrB86vfeOe3ZbFejGBKLlebcj0SKwhgFG" ) {
                        goAcast("20251-simon-patreon-podcast,20252-simon-patreon-podcast");
                        return;
                    }
                    console.log("ch="+cyParam);
                    console.log("no="+numberParam);
                } else {
                    console.log("Parameter 'cyParam' is null or undefined.");
                }

                if(cyParam) {
                    var resultsemail = "...";
                    var loadingTemplate = '<document><loadingTemplate><activityIndicator><text>Loading'+resultsemail+'</text></activityIndicator></loadingTemplate></document>';
                    var AJAXtemplate = new DOMParser().parseFromString(loadingTemplate, "application/xml");
                    navigationDocument.presentModal(AJAXtemplate);
                    
                    console.log("CH AJAX processing...");
                    var xhr = new XMLHttpRequest();
                    if(numberParam) {
                        xhr.open("GET", "http://netleave.appspot.com/utubeplayer?ch="+cyParam+"&no="+numberParam);
                    } else {
                        xhr.open("GET", "http://netleave.appspot.com/utubeplayer?ch="+cyParam);
                    }
                    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
                    xhr.setRequestHeader('User-Agent', 'Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5376e Safari/8536.25');
                    xhr.onreadystatechange = function () {
                        if (this.readyState == 4 && this.status == 200) {
                            console.log("output: ["+xhr.responseText+"]");
                            console.log("getU[CH] callback okay!!!");
                            
//                            goUT(xhr.responseText, uideoURL);
//                            goInAppUT(xhr.responseText, uideoURL);
                            goIn2AppUT(xhr.responseText, uideoURL, uideoTT);
//                            goUTTV(xhr.responseText.replace('m.youtube.com/watch', 'www.youtube.com/appletv/watch'));
                            /*
                            var subxhr = new XMLHttpRequest();
                            subxhr.open("POST", uideoURL);
                            //            subxhr.setRequestHeader('User-Agent', 'Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5376e Safari/8536.25');
                            subxhr.onreadystatechange = function () {
                                if (this.readyState == 4 && this.status == 200) {
                                    console.log("output: ["+subxhr.responseText+"]");
                                    console.log("getU callcallback okay!!!");
                                    navigationDocument.dismissModal();
                                    //                    playVideo("Hello TVML!",subxhr.responseText);
                                    console.log("uuuuURL okay!!!");
                                    var player = new Player();
                                    var playlist = new Playlist();
                                    var mediaItem = new MediaItem("video", subxhr.responseText);
                                    mediaItem.title = resultsemail;
                                    
                                    player.playlist = playlist;
                                    player.playlist.push(mediaItem);
                                    player.play();
                                }
                            }
                            subxhr.send(xhr.responseText);
                             */
                        }
                    }
                    xhr.send();
                }
            }
        }
    },
}
