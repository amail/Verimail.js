/*The MIT License

Copyright (c) 2012 Comfirm <http://www.comfirm.se/>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.*/

var Comfirm = Comfirm || {};
Comfirm.AlphaMail = Comfirm.AlphaMail || {};

var Verimail = Comfirm.AlphaMail.Verimail = function(options){
	// Set default options
	this.options = {
		token: null,
		// Fore emails to require a valid TLD
		enforceTld: true
	};

 	// Copy over existing options
 	for (key in options) {
	    if (options.hasOwnProperty(key)) {
	        this.options[key] = options[key];
	    }
	}

 	// Tempoary..
	this.Service = {};
	this.Service.verify = function(email, onSuccess, onError){
		onSuccess();
	};
};

// Table of the most common email domains
Verimail.MostCommonEmailDomains = {
	"gmail.com":null, "msn.com":null, "hotmail.com":null, "hotmail.co.uk":null,
	"yahoo.com":null, "yahoo.co.uk":null, "facebook.com":null, "live.com":null,
	"mail.com":null, "gmx.com":null, "aol.com":null, "verizon.net":null, "comcast.net":null,
	"googlemail.com":null, "att.net":null, "mail.com":null, "mac.com":null,
	"rocketmail.com":null, "ymail.com":null
};

// Table of the most common TLDs according to Google
// Reference http://www.seobythesea.com/2006/01/googles-most-popular-and-least-popular-top-level-domains/
Verimail.MostCommonTlds = {
	com:null, org:null, edu:null, gov:null, uk:null, net:null,
	ca:null, de:null, jp:null, fr:null, au:null, us:null, ru:null,
	ch:null, it:null, nl:null, se:null, dk:null, no:null, es:null, mil:null
};

// Table of all TLDs registered by IANA
// http://data.iana.org/TLD/tlds-alpha-by-domain.txt
// Version 2012092500, Last Updated Tue Sep 25 07:07:01 2012 UTC
Verimail.IANARegisteredTlds = { ac:null, ad:null, ae:null, aero:null, af:null, ag:null, ai:null, al:null,
	am:null, an:null, ao:null, aq:null, ar:null, arpa:null, as:null, asia:null, at:null, au:null,
	aw:null, ax:null, az:null, ba:null, bb:null, bd:null, be:null, bf:null, bg:null, bh:null, bi:null,
	biz:null, bj:null, bm:null, bn:null, bo:null, br:null, bs:null, bt:null, bv:null, bw:null, by:null,
	bz:null, ca:null, cat:null, cc:null, cd:null, cf:null, cg:null, ch:null, ci:null, ck:null, cl:null,
	cm:null, cn:null, co:null, com:null, coop:null, cr:null, cu:null, cv:null, cw:null, cx:null, cy:null,
	cz:null, de:null, dj:null, dk:null, dm:null, do:null, dz:null, ec:null, edu:null, ee:null, eg:null,
	er:null, es:null, et:null, eu:null, fi:null, fj:null, fk:null, fm:null, fo:null, fr:null, ga:null,
	gb:null, gd:null, ge:null, gf:null, gg:null, gh:null, gi:null, gl:null, gm:null, gn:null, gov:null,
	gp:null, gq:null, gr:null, gs:null, gt:null, gu:null, gw:null, gy:null, hk:null, hm:null, hn:null,
	hr:null, ht:null, hu:null, id:null, ie:null, il:null, im:null, in:null, info:null, int:null, io:null,
	iq:null, ir:null, is:null, it:null, je:null, jm:null, jo:null, jobs:null, jp:null, ke:null, kg:null,
	kh:null, ki:null, km:null, kn:null, kp:null, kr:null, kw:null, ky:null, kz:null, la:null, lb:null,
	lc:null, li:null, lk:null, lr:null, ls:null, lt:null, lu:null, lv:null, ly:null, ma:null, mc:null,
	md:null, me:null, mg:null, mh:null, mil:null, mk:null, ml:null, mm:null, mn:null, mo:null, mobi:null,
	mp:null, mq:null, mr:null, ms:null, mt:null, mu:null, museum:null, mv:null, mw:null, mx:null, my:null,
	mz:null, na:null, name:null, nc:null, ne:null, net:null, nf:null, ng:null, ni:null, nl:null, no:null,
	np:null, nr:null, nu:null, nz:null, om:null, org:null, pa:null, pe:null, pf:null, pg:null, ph:null,
	pk:null, pl:null, pm:null, pn:null, post:null, pr:null, pro:null, ps:null, pt:null, pw:null, py:null,
	qa:null, re:null, ro:null, rs:null, ru:null, rw:null, sa:null, sb:null, sc:null, sd:null, se:null,
	sg:null, sh:null, si:null, sj:null, sk:null, sl:null, sm:null, sn:null, so:null, sr:null, st:null,
	su:null, sv:null, sx:null, sy:null, sz:null, tc:null, td:null, tel:null, tf:null, tg:null, th:null,
	tj:null, tk:null, tl:null, tm:null, tn:null, to:null, tp:null, tr:null, travel:null, tt:null, tv:null,
	tw:null, tz:null, ua:null, ug:null, uk:null, us:null, uy:null, uz:null, va:null, vc:null, ve:null,
	vg:null, vi:null, vn:null, vu:null, wf:null, ws:null, ye:null, yt:null, za:null, zm:null, zw: null
};

// Levenshtein distance algorithm
// Implementation from http://webreflection.blogspot.se/2009/02/levenshtein-algorithm-revisited-25.html
Verimail.getLevenshteinDistance = function(min, split){
    try{split=!("0")[0]}catch(i){split=true};
    return function(a, b){
        if(a == b)return 0;
        if(!a.length || !b.length)return b.length || a.length;
        if(split){a = a.split("");b = b.split("")};
        var len1 = a.length + 1,
            len2 = b.length + 1,
            I = 0,
            i = 0,
            d = [[0]],
            c, j, J;
        while(++i < len2)
            d[0][i] = i;
        i = 0;
        while(++i < len1){
            J = j = 0;
            c = a[I];
            d[i] = [i];
            while(++j < len2){
                d[i][j] = min(d[I][j] + 1, d[i][J] + 1, d[I][J] + (c != b[J]));
                ++J;
            };
            ++I;
        };
        return d[len1 - 1][len2 - 1];
    }
}(Math.min, false);

// Gets the closest string using a string distance algorithm (eg. levenshtein)
Verimail.getClosestString = function(subject, suggestions, tolerance, distanceFunction){
	tolerance = tolerance || 0.5;
	var closestDistance = Number.MAX_VALUE, closestSuggestion = false;
	distanceFunction = distanceFunction || Verimail.getLevenshteinDistance;

	if(!(subject in suggestions)){
		for(var suggestion in suggestions){
			var distance = distanceFunction(subject, suggestion);
			if((distance < closestDistance) && ((distance / subject.length) < tolerance)){
				closestDistance = distance;
				closestSuggestion = suggestion;
			}
		}
	}

	return closestSuggestion;
};

// Gets the closest TLD distance-wise
Verimail.getClosestTld = function(domain, tolerance, distanceFunction){
	return Verimail.getClosestString(domain, Verimail.MostCommonTlds, tolerance, distanceFunction);
};

// Gets the closest domain distance-wise
Verimail.getClosestEmailDomain = function(domain, tolerance, distanceFunction){
	return Verimail.getClosestString(domain, Verimail.MostCommonEmailDomains, tolerance, distanceFunction);
};

// Validate the format of an email according to RFC 822
Verimail.testEmailFormat = function(email){
	// Regex should be according to RFC 822
	// Borrowed from http://badsyntax.co/post/javascript-email-validation-rfc822
	return /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/.test(email);
};

// Parse an email address into segments (local, domain, tld)
Verimail.getEmailAddressSegments = function(email){
	var state = 'local';
	var segments = {local:"", domain:"", tld:""};

	for(var i=0;i<email.length;++i){
		var character = email[i];
		switch(state){
			case 'local':
				if(character == '@'){
					state = 'domain';
				}else{
					segments.local += character;
				}
				break;
			case 'domain':
				if(character == '.'){
					state = 'tld';
				}else{
					segments.domain += character;
				}
				break;
			case 'tld':
				if(character == '.'){
					segments.domain += "." + segments.tld;
					segments.tld = "";
				}else{
					segments.tld += character;
				}
				break;
		}
	}

	return segments;
};

Verimail.prototype.verify = function(email, onSuccess, onError){
	email = (email || "").toLowerCase();
	
	// Check if the email is empty.. White space doesn't fool us!
	if(!email || email.length == 0 || (email.replace && email.replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g,'').replace(/\s+/g,' ').length == 0)){
		onError("empty", "Email is empty");
	// Validate the format of the email
	}else if(!Verimail.testEmailFormat(email)){
		onError("syntax", "Email is not correctly formatted");
	}else{
		tldProcessed = false;
		var segments = Verimail.getEmailAddressSegments(email);

		if(this.options.enforceTld){
			if(!segments.tld){
				tldProcessed = true;
				onError("syntax", "Email is not correctly formatted");
			}else if(!(segments.tld in Verimail.IANARegisteredTlds)){
				tldProcessed = true;
				var closestTld = Verimail.getClosestTld(segments.tld, 10);
				if(closestTld){
					var closestDomain = Verimail.getClosestEmailDomain(segments.domain + "." + closestTld, 0.25);
					if(closestDomain){
						var suggestion = segments.local + "@" + closestDomain;
						onSuccess("typo", "Did you mean " + suggestion + "?", suggestion);
					}else{
						onError("typo", "Did you mean " + segments.local + "@" + segments.domain + "." + closestTld + "?");
					}
				}else{
					onError("syntax", "Top level domain " + segments.tld + " does not exist");
				}
			}
		}

		if(!tldProcessed){
			var closestDomain = Verimail.getClosestEmailDomain(segments.domain + "." + segments.tld, 0.25);
			if(closestDomain){
				var suggestion = segments.local + "@" + closestDomain;
				onSuccess("typo", "Did you mean " + suggestion + "?", suggestion);
			}else{
				this.Service.verify(email, onSuccess, onError);
			}
		}
	}
};