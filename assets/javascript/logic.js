// Initialize Firebase
var config = {
	apiKey: "AIzaSyDLqIU7nSPsZ7Z2HP77jHeiWPMBbd0FUgc",
	authDomain: "train-scheduler-9189d.firebaseapp.com",
	databaseURL: "https://train-scheduler-9189d.firebaseio.com",
	projectId: "train-scheduler-9189d",
	storageBucket: "train-scheduler-9189d.appspot.com",
	messagingSenderId: "993913339106"
};
firebase.initializeApp(config);

var database = firebase.database();

var trainName = "";
var trainDestination = "";
var trainFirst = "";
var trainFrequency = "";
var nextTrain = "";
var minutesAway = "";

$("#add-train").on("click", function() {
	event.preventDefault();
	// Take user inputs
	var trainName = $("#input-name").val().trim();
	var trainDestination = $("#input-destination").val().trim();
	// takes user input as a unix time (inputted as HH:mm)
	var trainFirst = moment($("#input-first-train").val().trim(), "HH:mm").format("X");
	var trainFrequency = $("#input-frequency").val().trim();
	// frequency(min) minus current time minus the first train time(converted to minutes) with the modulus of frequency(min)
	var minutesAway = trainFrequency - (moment().diff(moment.unix(trainFirst), "minutes") % trainFrequency);
	// Current time plus minutes away formatted to calculate the next train arrival
	var nextTrain = moment().add(minutesAway, "minutes").format("hh:mm A");

	database.ref().push({
		name: trainName,
		destination: trainDestination,
		firstTime: trainFirst,
		frequency: trainFrequency,
		next: nextTrain,
		minAway: minutesAway
	});
	// Reset form on submit
	$('form').trigger("reset");
});

// reference firebase database when child added and run snapshot of children to append values
database.ref().on("child_added", function(childSnapshot){
	console.log(childSnapshot.val());
	var tableName = childSnapshot.val().name;
	var tableDestination = childSnapshot.val().destination;
	var tableFirstTime = childSnapshot.val().firstTime;
	var tableFrequency = childSnapshot.val().frequency;
	var tableNext = childSnapshot.val().next;
	var tableAway = childSnapshot.val().minAway;
	// Append values to table
	$("#train-table").append("<tr><td>" + tableName + "</td><td>" + tableDestination + "</td><td>" + tableFrequency + "</td><td>" + tableNext + "</td><td>" + tableAway + "</td></tr>");
	}, function(errorObject) {
		console.log("Errors handled: " + errorObject.code);
});