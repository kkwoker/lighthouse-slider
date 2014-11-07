$(document).ready(function() {

  // See: http://docs.jquery.com/Tutorials:Introducing_$(document).ready()
	var url = "https://api.instagram.com/v1/tags/lighthouse/media/recent?client_id=584f9c276fea46628e3ede05daae2498&callback=callbackFunction";
  function batch(){
	  
	  // ajax request to get 20 photos response object
	  var request = $.ajax({type:"GET", url: url, dataType: "jsonp"});
	  request.done(function(response){

	  	// Run through all 20 photos  	
			var data = response.data;
			var i = 0;
			function loop(){
				function display(){
					console.log(data[i].images.standard_resolution.url);
					console.log(i);
					$("img").attr("src", data[i].images.standard_resolution.url)
					i++;
					if(i < 20){
						loop();
					}else{
						console.log("I need more photos");
						url = response.pagination.next_url;
						console.log(response.pagination.next_url);
						batch();
					}
				}
				$("img").fadeOut("slow",function(){
					$(this).attr("src", data[i].images.standard_resolution.url).fadeIn();
				});
				var timerId = setTimeout(function(){display();},3000)

				$("#pause").on("click",function(){
					console.log("Pause");
					clearTimeout(timerId);
					timerId = null;						
				})
				$("#resume").on("click",function(){
					console.log("Resuming");
					timerId = setTimeout(function(){display();}, 1000);
				})

			}
			loop();
	  })
	}
	batch();
});