$(document).ready(function(){

	var socket = io.connect('http://localhost:3000');

	$("#uploadForm").on("submit", function(){

			// e.preventDefault();

			// var picture = "/images/" + $("#productPicture").val();
			var picture = /*$("#picture").val();*/ "/images/" + ($("#productPicture").val()).replace('C:\\fakepath\\', '');
			var title = $("#title").val();
			var description = $("#description").val();
			var price = $("#price").val();
			var type = $("#type").val();

			var data = {picture: picture, title: title, description: description, price: price, type:type};

			console.log("data")

			socket.emit("addProduct", data);
			
			$(this).ajaxSubmit({
				error: function(xhr){
					status('Error: ' + xhr.status);
				},
				success: function(response){
					console.log(response);
				}
			});
			return false;
		});

	socket.on('showProducts', function(r){

		console.log("hihi");

		console.log(r);
		var total= r.length;
		for(var i=0; i < total; i++){
			$('.product').prepend('<div><p>' + r[i].title + r[i].description + r[i].price + r[i].type + '</p></div>');
			console.log(r[i]);
		}

	});

});