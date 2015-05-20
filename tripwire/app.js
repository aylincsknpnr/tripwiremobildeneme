var arr=[];
var arr2=[];
var arr3=[];
var arr4=[];
var ozet;
var returnvalue;
var arrstring;
var arrstring2;
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
			var res=$("#results").html();	
			this.done = false;
		}
		else {
			$('<p><input type="button" class="btn1 btn-primary" value="Tümünü seç" /></p>').appendTo('#izle');	
			$('<p><input type="button" class="btn2 btn-secondary" value="Bırak" /></p>').appendTo('#izle');
			$('<p><input type="button" class="btn3 btn-primary" value="Kritik Olarak Belirle" /></p>').appendTo('#izle');
			$('<p><input type="button" class="btn4 btn-primary" value="Normal Olarak Belirle" /></p>').appendTo('#izle');
            $('<p><input type="button" class="btn5 btn-primary" value="ÇALIŞTIR" /></p>').appendTo('#kritik');
			$('<p><input type="button" class="btn6 btn-primary" value="SISTEM KONTROL" /></p>').appendTo('#kritik');
            $('<p><input type="button" class="btn7 btn-primary" value="ÇALIŞTIR" /></p>').appendTo('#normal');
            $('<p><input type="button" class="btn8 btn-primary" value="SISTEM KONTROL" /></p>').appendTo('#normal');
			  $('<p><input type="button" class="btn9 btn-primary" value="Mail gönder" /></p>').appendTo('#rapor');
			   $('<p><input type="button" class="btn10 btn-primary" value="raporla" /></p>').appendTo('#rapor');
			this.done = true;
		}
		if (!this.done) {
			this.continue();
		}
	}
}
//listed files stored on sdcard

var kritikdizi = [];
var normaldizi = [];

//izlenecek dizinler

//normal belirleme 
$('input.btn4').live('click', function() {
	
	$('input.sec:checked').each(function() {
		alert($(this).val())
		normaldizi.push($(this).val());
	});
	alert("diziboyut...>"+normaldizi.length);
	var j=normaldizi.length;
	alert("filenames i..."+normaldizi);
	for(var i=0;i<j;i++){

		$("<label><p><input type='checkbox' class='sec' name='file[]' value='" + normaldizi[i] + "'/>" + normaldizi[i] + "</p></label>").appendTo('#normal');
	}
}); 

//normal dosyaları okuma özet alma
function read2(kontrol){
	//	alert("çalışıyorr");
	var sdcard = navigator.getDeviceStorage('sdcard');
	var request = sdcard.get(kontrol);
	request.onsuccess = function () {
		//alert("başarılı");
		var comefile = this.result;
		file = new Blob([comefile], {type: "text/plain"});
		var reader = new FileReader();
		reader.addEventListener("loadend", function() {																												
			//dosya içinden satır satır okuma
			var read=this.result;
			reads=read.split("\n");
			//	alert(reads+"....reads");
			var smile=kontrol+" ....dosyanın özeti:... "+$.md5(read)																
			arr2.push(smile);
			arrstring2=arr2.join("\n");											
		});
		reader.readAsText(file);
	}
	request.onerror = function () {
		alert("başarısız!")
		console.warn("Unable to get the file: ");
	} 
}

//her seçimde okuma yapması için 
$('input.sec:checked').live('change', function() {
	console.log("checkbox click");
	read2($('input.sec:checked').val());  


}); 

//normal ilk çalıştırma
$('input.btn7').live('click', function() {
	
	var sdcard2 = navigator.getDeviceStorage("sdcard");
	var hash = new Blob([arrstring2], {type: "text/plain"});
	var request = sdcard2.addNamed(hash, "normal.txt");
	request.onsuccess = function () {  
		alert("yazılıyorr");
		var name = $(this).result;
		console.log('File "' + name + '" successfully wrote on the sdcard storage area');  
	}	
	// An error typically occur if a file with the same name already exist
	request.onerror = function () {
		alert("yazılamıyorr");
		console.warn('Unable to write the file: ' + this.error);
	}
});




var gonder
var degisik=[];
//rapor için
$('input.btn10').live('click', function() {
	alert("raporlama başarılı");
	alert(kritikdizi+	"..kri");
	alert(normaldizi+"..nor");
	alert("length"+kritikdizi.length);
	for(i=0;i<kritikdizi.length;i++){
		if(kritikdizi[i]==normaldizi[i])
			{
				alert("değişiklik yok");
			}
		else{
			alert("değişiklik var"+kritikdizi[i]);
			degisik[i]=kritikdizi[i];
			
		}

	}
	
});






//page
$(document).ready(function(){
	listContents('sdcard');
	//page 
	var content = $('.content'),
			loader = $('.loader');
	content.hide();
	$('.anamenu li a').on('click', function(e){
		var self = $(this);
		setTimeout(function(){
			content.hide().filter(self.attr('href')).fadeIn();
		}, 2000);
		loader.fadeIn(1000).delay(1000).fadeOut(1000);
		e.preventDefault();
	});

	$('.izlemenu li a').on('click', function(e){
		var self = $(this);
		setTimeout(function(){
			content.hide().filter(self.attr('href')).fadeIn();
		}, 2000);
		loader.fadeIn(1000).delay(1000).fadeOut(1000);
		e.preventDefault();
	});

	$('.kritikmenu li a').on('click', function(e){
		var self = $(this);
		setTimeout(function(){
			content.hide().filter(self.attr('href')).fadeIn();
		}, 2000);
		loader.fadeIn(1000).delay(1000).fadeOut(1000);
		e.preventDefault();
	});
$('.kdevammenu li a').on('click', function(e){
		var self = $(this);
		setTimeout(function(){
			content.hide().filter(self.attr('href')).fadeIn();
		}, 2000);
		loader.fadeIn(1000).delay(1000).fadeOut(1000);
		e.preventDefault();
	});
	$('.normalmenu li a').on('click', function(e){
		var self = $(this);
		setTimeout(function(){
			content.hide().filter(self.attr('href')).fadeIn();
		}, 2000);
		loader.fadeIn(1000).delay(1000).fadeOut(1000);
		e.preventDefault();
	});
	$('.ndevammenu li a').on('click', function(e){
		var self = $(this);
		setTimeout(function(){
			content.hide().filter(self.attr('href')).fadeIn();
		}, 2000);
		loader.fadeIn(1000).delay(1000).fadeOut(1000);
		e.preventDefault();
	});
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

var encodedData = window.btoa(degisik);
function sendMail(){
  $.ajax({
    type: "POST",
    url: "https://mandrillapp.com/api/1.0/messages/send.json",
    data: {
      'key': 'ATC-kw9QdL97Wsa7Ppe08A',
      'message': {
        'from_email': 'aylincpinar@gmail.com',
        'to': [
          {
            'email': 'aylincpinar@gmail.com',
            'name': 'aylin',
            'type': 'to'
          }
        ],
				"attachments": [
            {
                "type": "text/plain",
                "name": "rapor.txt",
                "content":  encodedData
            }
        ],
        'subject': 'tripwire',
        'html': 'tripwire rapor'
      }
    }
  });
}


//mail için
$('input.btn9').live('click', function() {
	alert("gönderme başarılı");
	sendMail();

});


//complete checked 
$('input.btn1').live('click', function() {
	console.log("buton click");
	$("input:checkbox").each(function(){

		this.checked = true;

	});
});

//not checked
$('input.btn2').live('click', function() {
	console.log("buton click");
	$("input:checkbox").each(function(){

		this.checked = false;

	});

});





//kritik belirleme
$('input.btn3').live('click', function() {
	
	$('input.sec:checked').each(function() {
		alert($(this).val())
		kritikdizi.push($(this).val());
	});
	alert("diziboyut...>"+kritikdizi.length);
	var j=kritikdizi.length;
	alert("filenames i..."+kritikdizi);
	for(var i=0;i<j;i++){
		$("<label><p><input type='checkbox' class='sec' name='file[]' value='" + kritikdizi[i] + "'/>" + kritikdizi[i] + "</p></label>").appendTo('#kritik');
	}
   


}); 

//var kritikoku=$('#kritik').html();
//kritik ilk çalıştırmadaki dosyaları okuma özet alma
function read(file){
	var sdcard = navigator.getDeviceStorage('sdcard');
	var request = sdcard.get(file);
	request.onsuccess = function () {
		//alert("başarılı");

		var comefile = this.result;


		fileb = new Blob([comefile], {type: "text/plain"});


		var reader = new FileReader();
		reader.addEventListener("loadend", function() {																												

			//dosya içinden satır satır okuma
			var read=this.result;

			reads=read.split("\n");
			//alert(reads+"reads");
			//okunanlar imzaları yazılıyor

			//	alert(ozet+"özet");
		 smile=file+" ...dosyanın özeti:... "+$.md5(read)													
			arr.push(smile);
			arrstring=arr.join("\n");
		
		});
		reader.readAsText(fileb);
	}

	request.onerror = function () {
		alert("başarısız!")
		console.warn("Unable to get the file: ");
	} 



}


//her seçimde okuma yapması için 
$('input.sec:checked').live('change', function() {
	console.log("checkbox click");
	read($('input.sec:checked').val());  


}); 


//kritik ilk çalıştırma
$('input.btn5').live('click', function() {
	
	var sdcard2 = navigator.getDeviceStorage("sdcard");
	var hash = new Blob([arrstring], {type: "text/plain"});
	var request = sdcard2.addNamed(hash, "kritik.txt");
	request.onsuccess = function () {  
		alert("yazılıyorr");
		var name = $(this).result;
		console.log('File "' + name + '" successfully wrote on the sdcard storage area');  
	}	
	// An error typically occur if a file with the same name already exist
	request.onerror = function () {
		alert("yazılamıyorr");
		console.warn('Unable to write the file: ' + this.error);
	}
});











