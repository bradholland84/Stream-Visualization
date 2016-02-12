(function($){

	$(function(){

		var $doc = $(document),
			range = [1, 100];

		window.streamInterval = setInterval(function(){
			$doc.trigger("message", {
				color: '#'+(Math.random()*0xFFFFFF<<0).toString(16),
				weight: Math.max(Math.floor(Math.random() * range[1]), range[0])
			});
		}, 1000);

	});

}(jQuery));