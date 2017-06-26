function loadgames() {
	$.ajax({
		type : "GET",
		url : "rest/games",
		dataType : "json",
	}).done(function(data, status) {
		console.log("loaded");
		listGames(data);
	}).fail(function(xhr, status, error) {
		console.log(error);
	});
}

function listGames(games) {
	var table = $('<table>');
	var tr = $('<tr>');
	var th1 = $('<th>');
	var th2 = $('<th>');
	var th3 = $('<th>');
	var th4 = $('<th>');
	var th5 = $('<th>');
	var th6 = $('<th>');
	var th7 = $('<th>');
	var th8 = $('<th>');
	var th9 = $('<th>');
	th1.text('Game Name');
	th2.text('Company');
	th3.text('Category');
	th4.text('Play Game');
	th5.text('Delete Game');
	th6.text('Hr spent');
	th7.text('Min spent');
	th8.text('Sec spent');
	th9.text('Edit');
	tr.append(th1);
	tr.append(th2);
	tr.append(th3);
	tr.append(th4);
	tr.append(th5);
	tr.append(th6);
	tr.append(th7);
	tr.append(th8);
	tr.append(th9);
	table.append(tr);

	games.forEach(function(game, index, array) {
		console.log(game.name);
		console.log(td1);
		var tr = $('<tr>');
		var td1 = $('<td>').text(game.name);
		var td2 = $('<td>').text(game.company);
		var td3 = $('<td>').text(game.category);
		var play = $('<td>').append($('<button>').text('Play game!'));
		var deleteG = $('<td>').append($('<button>').text('Delete game'));
		var editG = $('<td>').append($('<button>').text('edit game'));
		var timeee = 0;

		$.ajax({
			type : "GET",
			url : "rest/games/" + game.id + "/time/",
			dataType : "json",
		}).done(function(data, status) {
			data.forEach(function(time, index, array) {
				timeee += (time.endTime - time.startTime);

			});
			
			var hr = Math.floor(timeee / 3600000);
			
			var remaining = timeee - (hr * 3600000);
			
			var min = Math.floor(remaining / 60000);
			
			remaining = remaining - (min * 60000);
			
			var sec = Math.floor(remaining / 1000);
			
			var hrWasted = $('<td>').text(hr);
			var minWasted = $('<td>').text(min);
			var secWasted = $('<td>').text(sec);

			play.click(function() {
				addTime(game);
			});
			deleteG.click(function() {
				deleteGame(game);
			});
			editG.click(function(){
				editGames(game);
			});
			tr.append(td1);
			tr.append(td2);
			tr.append(td3);
			tr.append(play);
			tr.append(deleteG);
			tr.append(hrWasted);
			tr.append(minWasted);
			tr.append(secWasted);
			tr.append(editG);
			table.append(tr);
		}).fail(function(xhr, status, error) {
			console.log(error);

		});

	});
	$('body').append(table);

	createGameFunc();
}

function calculateTimes(game) {

}

function addTime(game) {
	$.ajax({
		type : "POST",
		url : "rest/games/" + game.id + "/time/",
		dataType : "json",
	}).done(function(data, status) {

		addEndTime(data, game);
		console.log(data);

	}).fail(function(xhr, status, error) {
		console.log(error);

	});
}

function addEndTime(time, game) {
	$('body').load('playing.html', function() {
		$('#game').text(game.name);
		$('button').click(function() {
			$.ajax({
				type : "PUT",
				url : "rest/games/" + game.id + "/time/" + time.id,
				dataType : "json",
			}).done(function(data, status) {
				$('body').children().remove();
				loadgames();
			}).fail(function(xhr, status, error) {
				console.log(error);
			});
		});
	})
}

function deleteGame(game) {
	var response = confirm('Do you really want to delete?');
	if (response) {
		$.ajax({
			type : "DELETE",
			url : "rest/games/" + game.id,
			dataType : "json",
		}).done(function(data, status) {
			$('body').children().remove();
			loadgames();

		}).fail(function(xhr, status, error) {
			console.log(error);

		});
	} else {
		return;
	}
}

function editGames(game) {

	$('body').load('createGame.html', function() {

		$(gameAdd.name).val(game.name);
		$(gameAdd.company).val(game.company);
		$(gameAdd.category).val(game.category);
	
		
		$(gameAdd.submit).click(function(e) {
			e.preventDefault();
			console.log($(gameAdd.company).val());
			var Game = {
				name : $(gameAdd.name).val(),
				category : $(gameAdd.category).val(),
				company : $(gameAdd.company).val(),
			}
			$.ajax({
				type : "PUT",
				url : "rest/games/" + game.id,
				dataType : "json",
				contentType : 'application/json',
				data : JSON.stringify(Game),
			}).done(function(data, status) {
				$('body').children().remove();
				loadgames();

			}).fail(function(xhr, status, error) {
				console.log(error);

			});
		});
	});

}

function createGameFunc() {
	var button = $('<button>').text('Add new game');
	button.click(function() {
		$('body').load('createGame.html', function() {
			$(gameAdd.submit).click(function(e) {
				e.preventDefault();

				var Game = {
					name : $(gameAdd.name).val(),
					category : $(gameAdd.category).val(),
					company : $(gameAdd.company).val()
				}
				console.log(Game);
				$.ajax({
					type : "POST",
					url : "rest/games/",
					dataType : "json",
					contentType : 'application/json',
					data : JSON.stringify(Game),
				}).done(function(data, status) {
					$('body').children().remove();
					loadgames();

				}).fail(function(xhr, status, error) {
					console.log(error);

				});
			})

		});
	})

	$('body').append(button);
}
