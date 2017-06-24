function loadgames(){
	$.ajax({
	    type: "GET",
	    url: "rest/games",
	    dataType: "json",
	})
	  .done(function(data, status) {
      console.log("loaded");
      listGames(data);
      })
      .fail(function(xhr, status, error) {
        console.log(error);
      });
}



function listGames(games){
  var table = $('<table>');
  var tr = $('<tr>');
  var th1 = $('<th>');
  var th2 = $('<th>');
  var th3 = $('<th>');
  var th4 = $('<th>');
  var th5 = $('<th>');
  th1.text('Game Name');
  th2.text('Company');
  th3.text('Category');
  th4.text('Play Game');
  th5.text('Delete Game');
  tr.append(th1);
  tr.append(th2);
  tr.append(th3);
  tr.append(th4);
  tr.append(th5);
  table.append(tr);


  games.forEach(function(game, index, array){
    console.log(game.name);
    console.log(td1);
var tr = $('<tr>');
var td1 = $('<td>').text(game.name);
var td2 = $('<td>').text(game.company);
var td3 = $('<td>').text(game.category);
var play =$('<td>').append($('<button>').text('Play game!'));
var deleteG =$('<td>').append($('<button>').text('Delete game'));
play.click(function(){
addTime(game);
});
deleteG.click(function(){
deleteGame(game);
});
tr.append(td1);
tr.append(td2);
tr.append(td3);
tr.append(play);
tr.append(deleteG);
table.append(tr);
  });
  $('body').append(table);

  createGameFunc();
}


function addTime(game){
  $.ajax({
	    type: "POST",
	    url: "rest/games/" + game.id +"/time/",
	    dataType: "json",
	})
	  .done(function(data, status) {
	    	 $('body').children().remove();
    console.log(data);

      })
      .fail(function(xhr, status, error) {
        console.log(error);

      });
}

function deleteGame(game){
  var response = confirm('Do you really want to delete?');
	if(response){
	$.ajax({
	    type: "DELETE",
	    url: "rest/games/" + game.id,
	    dataType: "json",
	})
	  .done(function(data, status) {
	    	 $('body').children().remove();
    	 loadgames();

      })
      .fail(function(xhr, status, error) {
        console.log(error);

      });
	}
	else{
		return;
	}
}


function createGameFunc(){
  var button =$('<button>').text('Add new game');
button.click(function(){
  $('body').load('createGame.html', function(){
    $(gameAdd.submit).click(function(e){
      e.preventDefault();
      console.log('hahahaha');

      var Game ={
        name:$(gameAdd.name).val(),
        category:$(gameAdd.category).val(),
        company:$(gameAdd.company).val()
      }
      console.log(Game);
      $.ajax({
        			    type: "POST",
        			    url: "rest/games/",
        			    dataType: "json",
        		        contentType: 'application/json',
        		        data: JSON.stringify(Game),
        			})
        			  .done(function(data, status) {
         		    	 $('body').children().remove();
        		    	 loadgames();

        		      })
        		      .fail(function(xhr, status, error) {
        		        console.log(error);

        		      });
    })



  });
})

  $('body').append(button);
}
