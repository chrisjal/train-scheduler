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
var next = "";
var minutesAway = "";

$("#add-train").on("click", function() {
	event.preventDefault();

	var trainName = $("#input-name").val().trim();
	var trainDestination = $("#input-destination").val().trim();
	// var trainFirst = moment($("#input-first-train").val().trim(), "HH:mm").subtract(10, "years").format("X");
	var trainFirst = $("#input-first-train").val().trim();
	var trainFrequency = $("#input-frequency").val().trim();

	database.ref().push({
		name: trainName,
		destination: trainDestination,
		firstTime: trainFirst,
		frequency: trainFrequency,
		next: nextTrain,
		minAway: minutesAway
	});
	// Clear form
	$('form').trigger("reset");
});

// database.ref().on("value", function(snapshot) {
// 	console.log(snapshot.val());
// 	var tableName = snapshot.val().name;
// 	var tableDestination = snapshot.val().destination;
// 	var tableFirstTime = snapshot.val().firstTime;
// 	var tableFrequency = snapshot.val().frequency;

// 	$("#train-table").append("<tr><td>" + tableName + "</td><td>" + tableDestination + "</td><td>" + tableFirstTime + "</td><td>" + tableFrequency + "</td></tr>");

// 	}, function(errorObject) {
// 		console.log("Errors handled: " + errorObject.code);
// });

database.ref().on("child_added", function(childSnapshot){
	console.log(childSnapshot.val());
	var tableName = childSnapshot.val().name;
	var tableDestination = childSnapshot.val().destination;
	var tableFirstTime = childSnapshot.val().firstTime;
	var tableFrequency = childSnapshot.val().frequency;
	var tableNext = childSnapshot.val().next;
	var tableAway = childSnapshot.val().minAway;

	$("#train-table").append("<tr><td>" + tableName + "</td><td>" + tableDestination + "</td><td>" + tableFrequency + "</td><td>" + tableNext + "</td><td>" + tableAway + "</td></tr>");

	}, function(errorObject) {
		console.log("Errors handled: " + errorObject.code);
});