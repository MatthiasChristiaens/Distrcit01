$(document).ready(function(){

		var socket = io.connect('http://localhost:3000');

		socket.on('showAllOrders', function(r){

			var total= r.length;
			for(var i=0; i < total; i++){

			var uId = r[i].userorder

				socket.emit("getUserData", uId);

					$('.orderList').append('<tr><td>' + r[i]._id + '</td><td class="status status' + r[i]._id + ' '+r[i].status+'">' + r[i].status + '<input type="button" class="changeStatus" id="' + r[i]._id + '" value=" V "></td><td class="userData">' + r[i].userorder + '</td></tr>');

			}

		});

		socket.on('updateOrders', function(data){

			$('.orderList').append('<tr><td>' + data._id + '</td><td class="status status' + data._id + ' '+data.status+'">' + data.status + '<input type="button" class="changeStatus" id="' + data._id + '" value=" V "></td><td class="userData">' + data.userorder + '</td></tr>'); 

		});

		socket.on('idToName', function(b){

				var name = b;
				var htmldata = $(".userData").val();

			// while(htmldata != name ){
				$(".userData").html(name);
			// }

		});

		$(document).on("click", ".changeStatus", function(){
			
			var oId = $(this).attr('id');

			socket.emit("changeState", oId);

		});

		socket.on('updateState', function(updateThis){

			$(".status"+updateThis._id).html(updateThis.status);

		});


		$(document).on("click", ".filter", function(e){

			e.preventDefault();
			
			if($("#statusFilter").val() == "verzonden"){

				$("td.Wachten").closest("tr").addClass('hidden');
				$("td.Verzonden").closest("tr").removeClass('hidden');

			}else if($("#statusFilter").val() == "wachtenOpVerzending"){

				$("td.Verzonden").closest("tr").addClass('hidden');
				$("td.Wachten").closest("tr").removeClass('hidden');

			}else if($("#statusFilter").val() == "showAll"){

				$("td.status").closest("tr").removeClass('hidden');

			}
			
		});

});