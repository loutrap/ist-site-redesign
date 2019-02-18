//now what?
//api:  http://www.ist.rit.edu/api
$(document).ready(function(){
	console.log("ready function");

	//Fullpage.js plugin
	$('#fullpage').fullpage();

	// Dropotron.js plugin
	var foo = $('#navbar > ul');
	foo.dropotron();

	// iziModal.js plugin
	$("#modal").iziModal({
  title: '',
  subtitle: '',
  headerColor: '#88A0B9',
  background: null,
  theme: '',  // light
  icon: null,
  iconText: null,
  iconColor: '',
  rtl: false,
  width: '70%',
  top: null,
  bottom: null,
  borderBottom: true,
  padding: 0,
  radius: 3,
  zindex: 999,
  iframe: false,
  iframeHeight: 400,
  iframeURL: null,
  focusInput: true,
  group: '',
  loop: false,
  navigateCaption: true,
  navigateArrows: true, // Boolean, 'closeToModal', 'closeScreenEdge'
  history: false,
  restoreDefaultContent: false,
  autoOpen: 0, // Boolean, Number
  bodyOverflow: false,
  fullscreen: false,
  openFullscreen: false,
  closeOnEscape: true,
  closeButton: true,
  appendTo: 'body', // or false
  appendToOverlay: 'body', // or false
  overlay: true,
  overlayClose: true,
  overlayColor: 'rgba(0, 0, 0, 0.4)',
  timeout: false,
  timeoutProgressbar: false,
  pauseOnHover: false,
  timeoutProgressbarColor: 'rgba(255,255,255,0.5)',
  transitionIn: 'comingIn',
  transitionOut: 'comingOut',
  transitionInOverlay: 'fadeIn',
  transitionOutOverlay: 'fadeOut',
  onFullscreen: function(){},
  onResize: function(){},
  onOpening: function(){},
  onOpened: function(){},
  onClosing: function(){},
  onClosed: function(){},
  afterRender: function(){}
	});



	// About Section
	myXHR('get', {'path':'/about/'}).done(function(json){
		console.log("myXHR");
		var x='<h2>'+json.title+'</h2>';
		x+='<p>'+json.description+'</p>';
		x+='<hr>'
		x+='<p id="quote"">"'+json.quote+'"</p>';
		x+='<p id="quote-author">~'+json.quoteAuthor+'</p>';

		$('#description-container').html(x);
	});

	// Degrees Section
	// undergrad
	myXHR('get',{'path':'/degrees/undergraduate/'}).done(function(json){
		$.each(json.undergraduate,function(i, item){
			var x='';
			x+='<h2>'+item.title+' ('+item.degreeName+')</h2>';
			x+='<p>'+item.description+'</p>';
			x+='<h3>Concentrations</h3>'
			x+='<ul>';
			$.each(item.concentrations,function(k, kItem){
				x+='<li>'+kItem+'</li>';
				$('#undergrad'+(i+1)).html(x);				
			});
			x+='</ul>';
			$('#undergrad'+(i+1)).html(x);

		});
	});

	myXHR('get',{'path':'/degrees/graduate/'}).done(function(json){
	$.each(json.graduate,function(i, item){
			var x='';
			x+='<h2>'+item.title+' ('+item.degreeName+')</h2>';
			x+='<p>'+item.description+'</p>';
			x+='<h3>Concentrations</h3>'
			x+='<ul>';
			$.each(item.concentrations,function(k, kItem){
				x+='<li>'+kItem+'</li>';
				$('#grad'+(i+1)).html(x);				
			});
			x+='</ul>';
			$('#grad'+(i+1)).html(x);
		});
	});

	// Minors Section
	myXHR('get', {'path':'/minors/UgMinors/'}).done(function(json){
		var x='';
		x+='<h1>Our Undergraduate Minors</h1>'
		$.each(json.UgMinors,function(i, item){
			var name = item.name;
			x+='<a id="'+name+'" href="#" class="trigger box-long" onclick="getMinorInfo(this.id);">';
			x+='<h3>'+item.title+'</h3>';
			x+='</a>';
			$('#minors-container').html(x);	
		});
	});

	// Employment Section
	myXHR('get', {'path':'/employment/'}).done(function(json){
		var x='';
		x+="<h2>"+json.introduction.title+"</h2>";
		x+="<h3 class=''>"+json.introduction.content[0].title+"</h3>";
		x+="<p class='content-wrapper'>"+json.introduction.content[0].description+"</p>";

		x+="<h3 class=''>"+json.introduction.content[1].title+"</h3>";
		x+="<p class='content-wrapper'>"+json.introduction.content[1].description+"</p>";

		x+="<h2>"+json.degreeStatistics.title+"</h2>";
		x+="<div class='row-box'>";
		var y ='';
		$.each(json.degreeStatistics.statistics, function(i, item){ 
			x+="<div class='single-box'>";
			x+="<h2>"+item.value+"</h2>";
			x+="<p>"+item.description+"</p>";
			x+="</div>";
		});
		x+="</div>";

		x+='<div id="emp-coop-row">';
		x+='<div class="single-box-lg">';
		x+="<h2>"+json.employers.title+"</h2>";
		x+="<ul>";
		$.each(json.employers.employerNames, function(i, item){
			x+="<li class='hor-list'>"+item+"</li>";
		})
		x+="</ul>";
		x+='</div>';

		x+='<div class="single-box-lg">';
		x+="<h2>"+json.careers.title+"</h2>";
		x+="<ul>";
		$.each(json.careers.careerNames, function(i, item){
			x+="<li class='hor-list'>"+item+"</li>";
		})
		x+="</ul>";
		x+='</div>';
		x+='</div>';

		$('#employment-stats-container').html(x);			
	});

	// Map Section
	myXHR('get', {'path':'/employment/'}).done(function(json){
		var x='';
		x+='<h2>To view employment and coop history of our students, click below.</h2>';
		x+='<a href="#" class="long-table trigger" id="emp-table" onclick="getCoopTableInfo(this.id);">';
		x+='<div>';
		x+='<h2>'+json.coopTable.title+'</h2>';
		x+='</div>';
		x+='</a>';
		x+='<a href="#" class="long-table trigger" id="emp-table" onclick="getEmpTableInfo(this.id);">';
		x+='<div>';
		x+='<h2>'+json.employmentTable.title+'</h2>';
		x+='</div>';
		x+='</a>';
		$('#emp-table-section-container').html(x);
	});

	// People Section
	myXHR('get', {'path':'/people/'}).done(function(json){
		var x='';
		x+='<h2>'+json.title+'</h2>';
		x+='<h4>'+json.subTitle+'</h4>';
		x+='<h3>Faculty</h3>';
		x+='<div id="faculty-container">';
		$.each(json.faculty, function(i, item){
			x+='<a id="'+item.username+'" href="#" class="trigger people-box" onclick="getFacultyInfo(this.id);">';
			x+='<div>';
			x+='<p>'+item.name+'</p>';
			x+='<p>'+item.title+'</p>'
			x+='</div>';
			x+='</a>';

		});
		x+='</div>';
		$('#faculty').html(x);
		var x='';
		x+='<h2>'+json.title+'</h2>';
		x+='<h4>'+json.subTitle+'</h4>';
		x+='<h3>Staff</h3>';
		x+='<div id="faculty-container">';
		$.each(json.staff, function(i, item){
			x+='<a id="'+item.username+'" href="#" class="trigger people-box" onclick="getStaffInfo(this.id);">';
			x+='<div>';
			x+='<p>'+item.name+'</p>';
			x+='<p>'+item.title+'</p>'
			x+='</div>';
			x+='</a>';

		});
		x+='</div>';
		$('#staff').html(x);
	});

	// Research Section
	myXHR('get', {'path':'/research/'}).done(function(json){
		var x='';
		x+='<h2>Faculty Research: Areas of Interest</h2>';
    x+='<h6>Click the area you’re interested in to explore our faculty publications</h6>';
		x+='<div id="research-topic-container">';
		$.each(json.byInterestArea, function(i, item){
			x+='<a id="'+item.areaName+'" href="#" class="trigger research-box" onclick="getResearchInfo(this.id);">';
			x+='<div>';
			x+='<p>'+item.areaName+'</p>';
			x+='</div>';
			x+='</a>';
		});
		x+='</div>';
		$('#research-container').html(x);
	});

	// Resources Section
	myXHR('get', {'path':'/resources/'}).done(function(json){
		var x='';
		x+='<h2>'+json.title+'</h2>';
    x+='<h6>'+json.subTitle+'</h6>';
		x+='<div id="resource-topic-container">';
		x+='<a id="'+json.studyAbroad.title+'" href="#" class="trigger resource-box" onclick="getStudyAbroadInfo(this.id);">';	
		x+='<div>';	
		x+='<p>'+json.studyAbroad.title+'</p>';
		x+='</div>';
		x+='</a>';
		x+='<a id="'+json.studentServices.title+'" href="#" class="trigger resource-box" onclick="getStudentServicesInfo(this.id);">';	
		x+='<div>';	
		x+='<p>'+json.studentServices.title+'</p>';
		x+='</div>';
		x+='</a>';
		x+='<a id="'+json.tutorsAndLabInformation.title+'" href="#" class="trigger resource-box" onclick="getTutorsInfo(this.id);">';	
		x+='<div>';
		x+='<p>'+json.tutorsAndLabInformation.title+'</p>';	
		x+='</div>';
		x+='</a>';
		x+='<a id="'+json.studentAmbassadors.title+'" href="#" class="trigger resource-box" onclick="getAmbassadorsInfo(this.id);">';	
		x+='<div>';	
		x+='<p>'+json.studentAmbassadors.title+'</p>';
		x+='</div>';
		x+='</a>';
		x+='<a id="'+json.coopEnrollment.title+'" href="#" class="trigger resource-box" onclick="getCoopEnrollmentInfo(this.id);">';	
		x+='<div>';	
		x+='<p>'+json.coopEnrollment.title+'</p>';
		x+='</div>';
		x+='</a>';
		x+='</div>';
		$('#resources-container').html(x);
	});
}); // end document ready

// this function will get the rest of the Minors data to insert into the modal
function getMinorInfo(id) {
	console.log("target: " + id);	
	var match = '';

	myXHR('get', {'path':'/minors/UgMinors/name='+id}).done(function(json){
		var x='';
		x+='<p>'+json.description+'</p>';
		x+='<ul>';
		$.each(json.courses, function(i, item){
			x+='<li>'+item+'</li>';
		});
		x+='</ul>';
		$('#modal-text').html(x);
		$('#modal').iziModal('setTitle', json.title);
    $('#modal').iziModal('open');

	});
}

// this function will get the rest of the Faculty data to insert into the modal
function getFacultyInfo(id) {
	console.log("target: " + id);	
	var match = '';

	myXHR('get', {'path':'/people/faculty/username='+id}).done(function(json){
		var x='';
		x+='<h3>'+json.name+'</h3>';
		x+='<img src="https://ist.rit.edu/assets/img/people/'+id+'.jpg"></img>';
		x+='<h4>'+json.title+'</h4>';
		x+='<ul id="people-list">';
		x+='<li>'+json.office+'</li>';
		x+='<li>'+json.phone+'</li>';
		x+='<li>'+json.email+'</li>';
		x+='</ul>';
		$('#modal-text').html(x);
		$('#modal').iziModal('setTitle', json.title);
    $('#modal').iziModal('open');

	});
}

// this function will get the rest of the Staff data to insert into the modal
function getStaffInfo(id) {
	console.log("target: " + id);	
	var match = '';
	myXHR('get', {'path':'/people/staff/username='+id}).done(function(json){
		var x='';
		x+='<h3>'+json.name+'</h3>';
		x+='<img src="https://ist.rit.edu/assets/img/people/'+id+'.jpg"></img>';
		x+='<h4>'+json.title+'</h4>';
		x+='<ul id="people-list">';
		x+='<li>'+json.office+'</li>';
		x+='<li>'+json.phone+'</li>';
		x+='<li>'+json.email+'</li>';
		x+='</ul>';
		$('#modal-text').html(x);
		$('#modal').iziModal('setTitle', json.title);
    $('#modal').iziModal('open');
	});
}

// this function will get the rest of the Research data to insert into the modal
function getResearchInfo(id) {
	console.log("target: " + id);	
	var match = '';
	myXHR('get', {'path':'/research/byInterestArea/areaName='+id}).done(function(json){
		var x='';
		$.each(json.citations, function(i, item) {
			x+='<p>'+item+'</p>';
		});
		$('#modal-text').html(x);
		$('#modal').iziModal('setTitle', json.areaName);
    $('#modal').iziModal('open');
	});
}

// this function will get the rest of the Co-op Table data to insert into the modal
function getCoopTableInfo(id) {
	myXHR('get', {'path':'/employment/'}).done(function(json){
		var x='';
		x+='<ul id="coop-list">';
		$.each(json.coopTable.coopInformation, function(i, item) {
		 	x+='<li>'+item.degree+' '+item.employer+' '+item.city+' '+item.term+'</li>';
		});
		x+='</ul>';
		$('#modal-text').html(x);
		$('#modal').iziModal('setTitle', json.coopTable.title);
    $('#modal').iziModal('open');
	});
}

// this function will get the rest of the Employer Table data to insert into the modal
function getEmpTableInfo(id) {
	myXHR('get', {'path':'/employment/'}).done(function(json){
		var x='';
		x+='<ul id="emp-list">';
		$.each(json.employmentTable.professionalEmploymentInformation, function(i, item) {
		 	x+='<li>'+item.degree+' '+item.employer+' '+item.city+' '+item.title+' '+item.startDate+'</li>';
		});
		x+='</ul>';
		$('#modal-text').html(x);
		$('#modal').iziModal('setTitle', json.employmentTable.title);
    $('#modal').iziModal('open');
	});
}

// this function will get the rest of the Study Abroad data to insert into the modal
function getStudyAbroadInfo(id) {
	console.log("HERE");
	myXHR('get', {'path':'/resources/'}).done(function(json){
		var x ='';
		x+='<h2>'+json.studyAbroad.title+'</h2>';
		x+='<p>'+json.studyAbroad.description+'</p>';
		$.each(json.studyAbroad.places, function (i, item){
			x+='<h3>'+item.nameOfPlace+'</h3>';
			x+='<p>'+item.description+'</p>';
		});
		$('#modal-text').html(x);
		$('#modal').iziModal('setTitle', json.title);
    $('#modal').iziModal('open');
	});
}	

// this function will get the rest of the Student Services data to insert into the modal
function getStudentServicesInfo(id) {
	myXHR('get', {'path':'/resources/'}).done(function(json){
		var x ='';
		x+='<h2>'+json.studentServices.academicAdvisors.title+'</h2>';
		x+='<p>'+json.studentServices.academicAdvisors.description+'</p>';
		x+='<h2>'+json.studentServices.professonalAdvisors.title+'</h2>';
		$.each(json.studentServices.professonalAdvisors.advisorInformation, function(i, item){
			x+='<p>'+item.name+'<br/>'+item.department+'</br>'+item.email+'</p>';
		});
		x+='<h2>'+json.studentServices.facultyAdvisors.title+'</h2>';
		x+='<p>'+json.studentServices.facultyAdvisors.description+'</p>';

		x+='<h2>'+json.studentServices.istMinorAdvising.title+'</h2>';
		$.each(json.studentServices.istMinorAdvising.minorAdvisorInformation, function(i, item){
			x+='<p>'+item.title+'<br/>'+item.advisor+'</br>'+item.email+'</p>';
		});
		$('#modal-text').html(x);
		$('#modal').iziModal('setTitle', json.title);
    $('#modal').iziModal('open');
	});
}	

// this function will get the rest of the Tutors data to insert into the modal
function getTutorsInfo(id) {
	myXHR('get', {'path':'/resources/'}).done(function(json){
		var x ='';
		x+='<h2>'+json.tutorsAndLabInformation.title+'</h2>';
		x+='<p>'+json.tutorsAndLabInformation.description+'</p>';
		x+='<a href="'+json.tutorsAndLabInformation.tutoringLabHoursLink+'">'+json.tutorsAndLabInformation.tutoringLabHoursLink+'</a>';
		$('#modal-text').html(x);
		$('#modal').iziModal('setTitle', json.title);
    $('#modal').iziModal('open');
	});
}

function getAmbassadorsInfo() {
	myXHR('get', {'path':'/resources/'}).done(function(json){
		var x ='';
		x+='<h2>'+json.studentAmbassadors.title+'</h2>';
		x+='<img src="'+json.studentAmbassadors.ambassadorsImageSource+'">';
		$.each(json.studentAmbassadors.subSectionContent, function (i, item){
			x+='<h3>'+item.title+'</h3>';
			x+='<p>'+item.description+'</p>';
		});
		x+='<a href='+json.studentAmbassadors.applicationFormLink+'>Application Form</a>'
		x+='<h5>'+json.studentAmbassadors.note+'</h5>';

		$('#modal-text').html(x);
		$('#modal').iziModal('setTitle', json.title);
    $('#modal').iziModal('open');
	});
}		

function getCoopEnrollmentInfo(id) {
	myXHR('get', {'path':'/resources/'}).done(function(json){
		var x ='';
		x+='<h2>'+json.coopEnrollment.title+'</h2>';
		$.each(json.coopEnrollment.enrollmentInformationContent, function (i, item){
			x+='<h3>'+item.title+'</h3>';
			x+='<p>'+item.description+'</p>';
		});
		x+='<a href='+json.coopEnrollment.RITJobZoneGuidelink+'>RIT JobZone Guide</a>';

		$('#modal-text').html(x);
		$('#modal').iziModal('setTitle', json.title);
    $('#modal').iziModal('open');
	});
}

// AJAX 
function myXHR(t,d) {
	return $.ajax({
		type:t,
		cache:false,
		async:true,
		dataType:'json',
		url:'proxy.php',
		data:d,
		beforeSend:function() {
			// happens before sending information
		}
	}).always(function(){
			// happens at end, no matter what
	}).fail(function(){
		// handles failure
	});
} // end myXHR
