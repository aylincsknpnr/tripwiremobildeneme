//storage file list 
function listContents(storagename) {
  console.log("app lunch");
	//Clear up the list first
	$('#results').html("");
	var files = navigator.getDeviceStorage(storagename);
	var cursor = files.enumerate();
		cursor.onsuccess = function () {
			var file = this.result;
			if (file != null) {
				//file name add checkbox
				$("<label><p><input type='checkbox' class='sec' name='file[]' value='" + file.name + "'/>" + file.name + "</p></label>").appendTo('#izle');
				$("<label><p><input type='checkbox' class='sec' name='file[]' value='" + file.name + "'/>" + file.name + "</p></label>").appendTo('#çalış');
				var res=$("#results").html();
		/*var ifrm = document.getElementById('content');
	ifrm = (ifrm.contentWindow) ? ifrm.contentWindow : (ifrm.contentDocument.document) ? ifrm.contentDocument.document : ifrm.contentDocument;
	ifrm.document.open();
	ifrm.document.write(res);
	ifrm.document.close();*/			
				//.appendTo('#content');	
				this.done = false;
			}
			else {
				//save button 
			
				$('<p><input type="button" class="btn3 btn-primary" value="Tümünü seç" /></p>').appendTo('#izle');
				$('<p><input type="button" class="btn3 btn-primary" value="Tümünü seç" /></p>').appendTo('#çalış');
					$('<p><input type="button" class="btn4 btn-secondary" value="Bırak" /></p>').appendTo('#çalış');
					$('<p><input type="button" class="btn4 btn-secondary" value="Bırak" /></p>').appendTo('#izle');
					$('<p><input type="button" class="btn btn-primary" value="YAZ" /></p>').appendTo('#izle');
				
				$('<p><input type="button" class="btn2 btn-secondary" value="ÇALIŞTIR" /></p>').appendTo('#çalış');
				
				this.done = true;
			}
			if (!this.done) {
				this.continue();
			}
		}
}
//listed files stored on sdcard
$(document).ready(function(){
	
listContents('sdcard');
	//page 
var content = $('.content'),
    loader = $('.loader');
content.hide();
$('.menu li a').on('click', function(e){
    var self = $(this);
    setTimeout(function(){
        content.hide().filter(self.attr('href')).fadeIn();
    }, 2000);
    loader.fadeIn(1000).delay(1000).fadeOut(1000);
    e.preventDefault();
});

	
});
//button click event
$('input.btn').live('click', function() {
  console.log("buton click");
	var fileNames = [];
	$('input.sec:checked').each(function() {
		alert($(this).val())
		//creating files in sdcard
		$('#results').html("start")
		fileNames.push($(this).val());
	});
	//is printed on the selected files in the file
	var fileString = fileNames.join("\n");
	var file = new Blob([fileString], {type: "text/plain"});
	//files named with the time information
	var sdcard = navigator.getDeviceStorage("sdcard");
	var request = sdcard.addNamed(file, d.yyyymmdd()+".txt");
	request.onsuccess = function () {  
		var name = $(this).result;
		$('#results2').html("yazıldı");
		console.log('File "' + name + '" successfully wrote on the sdcard storage area');  
	}
	// An error typically occur if a file with the same name already exist
	request.onerror = function () {
		$('#results2').html("hata")
		console.warn('Unable to write the file: ' + this.error);
	}
	$('#results').html("text")
}); 
//Retrieving current date time information
Date.prototype.yyyymmdd = function() {
	var yyyy = this.getFullYear().toString();
	var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
	var dd  = this.getDate().toString();
	var h = this.getHours().toString();
	var m = this.getMinutes().toString();
	var s = this.getSeconds().toString();
	return yyyy + "." + (mm[1]?mm:"0"+mm[0]) + "." + (dd[1]?dd:"0"+dd[0]) + "-" + (h[1]?h:"0"+h[0]) +"." + (m[1]?m:"0"+m[0]) +"." + (s[1]?s:"0"+s[0]); 
};
d = new Date();
alert( d.yyyymmdd() );


//button click event
$('input.btn2').live('click', function() {
  console.log("buton click");
	$('input.sec:checked').each(function() {
	//	alert($(this).val())
	var sdcard = navigator.getDeviceStorage('sdcard'); 
   alert($('input.sec:checked').length);
   var k=$('input.sec:checked').length;
   var part=$('input[type=checkbox]:checked').map(function(_, el) {
        return $(el).val();
    }).get();
    var part2=[];
		for(var i=0;i<k;i++){
		part2=part;
   // alert(part2[i]);
			
		var request = sdcard.get(part2[i]);
	
request.onsuccess = function () {
	alert("başarılı");
  var file = this.result;
	alert(file.name);
	var blob = new Blob([file], {type: "text/plain"});
  console.log("Get the file: " + file.name);
	alert(file.name);
	var reader = new FileReader();
reader.addEventListener("loadend", function() {
   // reader.result contains the contents of blob as a typed array
	alert(this.result);
	
	
	//dosya içinden satır satır okuma
	var read=this.result;
  //alert($.md5(read));
	var reads = new Array();
  reads=read.split("\n");
	//alert(reads[1]);
	
	//md5 karşılaştırma
var a="aylin janimmmm"
//alert($.md5(a));
if($.md5(read)==$.md5(a)){
		alert("değişmemiş ulan!");
}
	else{
		alert("aynı değil yaw");
	}
});
reader.readAsText(blob);
  }

		}
request.onerror = function () {
   alert("başarısız!")
	console.warn("Unable to get the file: ");
} 
});
});






//complete checked 
$('input.btn3').live('click', function() {
  console.log("buton click");
	$("input:checkbox").each(function(){
			
				this.checked = true;
			
			});
	
});
//not checked
$('input.btn4').live('click', function() {
  console.log("buton click");
	$("input:checkbox").each(function(){
			
				this.checked = false;
			
			});
	
});