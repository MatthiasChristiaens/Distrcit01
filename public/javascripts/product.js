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


			socket.emit("addProduct", data);
			
			$(this).ajaxSubmit({
				error: function(xhr){
					status('Error: ' + xhr.status);
				},
				success: function(response){

				}
			});
			return false;
		});

	socket.on('showProducts', function(r){

		var total= r.length;
		for(var i=0; i < total; i++){
			$('.product').append('<div><ul class="productkader"><li><img class="productImage" src="' + r[i].picture + '"></li><li class="title'+ r[i]._id + '">' + r[i].title + '</li><li id="description">' + r[i].description + '</li><li class="price'+r[i]._id + '">' + r[i].price + '</li><li id="type">' + r[i].type + '</li>' + '<div class="loginCheck" id="' + r[i]._id + '"><input type="button" class="addOne" id="' + r[i]._id + '" value=" + "> ' + '<input type="button" class="diminishOne" id="' + r[i]._id + '" value=" - "><p class="amount'+r[i]._id + '">0</p><input type="submit" class="orderFinal" id="' + r[i]._id + '" value="Add to cart"></div></ul></div>');

		}

		if ($(".user").html() == ""){

			$(".loginCheck").addClass("hidden");

		};

	});


	$(document).on("click", ".addOne", function(){
			var pid = $(this).attr('id');





			var teller = $(".amount"+pid).html();
			teller++;

			$(".amount"+pid).html(teller);

			

	});

	$(document).on("click", ".diminishOne", function(){

		var pid = $(this).attr('id');


		var teller = $(".amount"+pid).html();

		if(teller > 0){
			
			teller--;

			$(".amount"+pid).html(teller);

		}

	});

	$(document).on("click", ".orderFinal", function(){

			var pid = $(this).attr('id');

			var title = $(".title"+pid).html();
			var quantity = $(".amount"+pid).html();
			var price = $(".price"+pid).html();
			var total = quantity*price;
			var productId = pid;
			var usercartId = $(".iduser").html();

			var dataCart = {title: title, quantity: quantity, price: price, total: total, productId: productId, usercartId: usercartId};

			socket.emit("addCart", dataCart);

			// window.location = "../cart";

	});

	// socket.on('showCartProducts', function(r){

	// 	console.log(r);
	// 	var total= r.length;
	// 	for(var i=0; i < total; i++){
	// 		$('.cartTotal').append('<ul><li>' + r[i].quantity + '</li><li>' + r[i].productId + '</li><li>' + r[i].usercartId + '</li></ul>');
	// 		console.log(r[i]._id)
	// 		console.log(r[i]);
	// 	}

	// 	if ($(".user").html() == ""){

	// 		$(".loginCheck").addClass("hidden");

	// 	};

	// });



});