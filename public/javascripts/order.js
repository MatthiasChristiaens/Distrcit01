$(document).ready(function(){

		var socket = io.connect('http://localhost:3000');

		socket.on('showAllOrders', function(r){

		var total= r.length;
		for(var i=0; i < total; i++){

			$('.orderList').append('<tr><td>' + r[i]._id + '</td><td>' + r[i].status + '<input type="button" class="changeStatus" id="' + r[i]._id + '" value=" V "></td><td>' + r[i].userorder + '</td></tr>');
		}

	});

	$(document).on("click", ".changeStatus", function(){
			var oId = $(this).attr('id');

		socket.emit("changeState", changestate);

	});

});