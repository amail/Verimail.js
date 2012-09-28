Verimail.js
======================

Simply a kit for validating/verifying e-mails through javascript. Can prevent many common typos.

Current support:

    * Syntax validation (according to RFC 822)
    * IANA TLD validation
    * Spelling suggestion for the most common TLDs and email domains
    * Deny temporary email account domains such as mailinator.com

E.g. validating 'cool@fabeook.cmo' will result in a typo suggestion:

    Did you mean cool@facebook.com?

### Example

	var email = "cool@fabeook.cmo";
	var verimail = new Comfirm.AlphaMail.Verimail();
	
	verimail.verify(email, function(status, message, suggestion){
		if(status < 0){
			// Incorrect syntax!
			if(suggestion){
				// But we might have a solution to this!
				console.log("Did you mean " + suggestion + "?");
			}
		}else{
			// Syntax looks great!
			if(suggestion){
				// But we're guessing that you misspelled something
				console.log("Did you mean " + suggestion + "?");
			}
		}
	});

Check out the rest of our stuff at:
http://www.comfirm.se/