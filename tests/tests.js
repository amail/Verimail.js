var verimailStatus = Comfirm.AlphaMail.Verimail.Status;

module("Syntax");

test("Fails when local address is invalid", function(){
	var verimail = new Comfirm.AlphaMail.Verimail();

	var subjects = ["@test.com", "testset.@test.com", "test:dd@test.com", "test\"dd@test.com", "\"test\"dd@test.com", "test\ test@test.com", "test..test@test.com"];

	expect(subjects.length);

	subjects.forEach(function(subject){
		verimail.verify(subject, function(status, message, suggestion){
			ok(status == verimailStatus.SyntaxError, "'" + subject + "' should be treated as invalid.");
		});
	});
});

test("Succeeds when local address is valid", function(){
	var verimail = new Comfirm.AlphaMail.Verimail();

	var subjects = ["\"test\"@test.com", "test+test@test.com", "test.test@test.com", "test.test@test.com", "\"Abc@def\"@test.com", "test/test=test@test.com", "$A12345@test.com", "!def!xyz%abc@test.com", "test.\"test\"@test.com"];

	expect(subjects.length);

	subjects.forEach(function(subject){
		verimail.verify(subject, function(status, message, suggestion){
			ok(status == verimailStatus.CorrectSyntax, "'" + subject + "' should be treated as correct.");
		});
	});
});

/*test("Domain", function(){
	var verimail = new Comfirm.AlphaMail.Verimail();

	validSubjects = ["test.test@test.test.com", ];
	ok(true);
});

test("TLD", function(){
	var verimail = new Comfirm.AlphaMail.Verimail();
	ok(true);
});*/

module("Suggestions");

test("Can suggest common email domain corrections", function() {
	var verimail = new Comfirm.AlphaMail.Verimail();

	var subjects = [
		{
			subject: "test@gnail.con",
			suggestion: "test@gmail.com"
		},
		{
			subject: "test@gamil.com",
			suggestion: "test@gmail.com"
		},
		{
			subject: "test@fabook.con",
			suggestion: "test@facebook.com"
		},
		{
			subject: "test@hottmail.cmo",
			suggestion: "test@hotmail.com"
		},
		{
			subject: "test@alo.com",
			suggestion: "test@aol.com"
		},
		{
			subject: "test@alo.com",
			suggestion: "test@aol.com"
		}
	];

	expect(subjects.length);
	
	subjects.forEach(function(item){
		verimail.verify(item.subject, function(status, message, suggestion){
			ok(item.suggestion == suggestion, "'" + item.subject + "' suggested as '" + suggestion + "'");
		});
	});
});

test("Can suggest common TLD corrections", function() {
	var verimail = new Comfirm.AlphaMail.Verimail();

	var subjects = [
		{
			subject: "test@test.con",
			suggestion: "test@test.com"
		},
		{
			subject: "test@test.cmo",
			suggestion: "test@test.com"
		},
		{
			subject: "test@test.sw",
			suggestion: "test@test.se"
		},
		{
			subject: "test@test.nat",
			suggestion: "test@test.net"
		},
		{
			subject: "test@test.ogr",
			suggestion: "test@test.org"
		}
	];

	expect(subjects.length);
	
	subjects.forEach(function(item){
		verimail.verify(item.subject, function(status, message, suggestion){
			ok(item.suggestion == suggestion, "'" + item.subject + "' suggested as '" + suggestion + "'");
		});
	});
});