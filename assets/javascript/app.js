
var config = {
    apiKey: "AIzaSyA8M_5lYpMyai148IIMJiKH9hAhZEzXSrA",
    authDomain: "my-first-firebase-cf941.firebaseapp.com",
    databaseURL: "https://my-first-firebase-cf941.firebaseio.com",
    storageBucket: "my-first-firebase-cf941.appspot.com",
  };
  firebase.initializeApp(config);



var database = firebase.database();

$("#addEmployee").on("click", function() {

  var name = $('#nameInput').val().trim(); 
  var destination = $('#roleInput').val().trim(); 
  var start = $('#dateInput').val().trim(); 
  var frequency = $('#monthsInput').val().trim(); 
  
  
  var timeDifference = moment().diff(moment(start,"HH:mm"),'m');
  var timeRemaining = timeDifference % frequency;
  var away = frequency - timeRemaining;
  var next = moment().add(away,'m');

  console.log(name);
  var row = $('<tr>');
  var cellDest = $('<th>').text(destination);
  var cellName = $('<th>').text(name);
  var cellFreq = $('<th>').text(frequency);
  var cellNext = $('<th>').text(moment(next).format("HH:mm"));
  var cellAway = $('<th>').text(away);

    row .append(cellName)
        .append(cellDest)
        .append(cellFreq)
        .append(cellNext)
        .append(cellAway);


    $('#currentTrains').append(row);


  database.ref().push({
      name: name,
      destination: destination,
      frequency: frequency,
      next: moment(next).format('HH:mm'),
      away: away,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
      });

  return false;
});


