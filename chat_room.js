const firebaseConfig = {
    apiKey: "AIzaSyDKghwT-NpxcDA0U9uhE_S0-YkIeWanixY",
    authDomain: "kwitter-4c789.firebaseapp.com",
    databaseURL: "https://kwitter-4c789-default-rtdb.firebaseio.com",
    projectId: "kwitter-4c789",
    storageBucket: "kwitter-4c789.appspot.com",
    messagingSenderId: "665588899591",
    appId: "1:665588899591:web:c3ce3052dc3d544305afa2"
};
firebase.initializeApp(firebaseConfig);

room_name = localStorage.getItem("room_name");
user_name = localStorage.getItem("user_name");
document.getElementById("room_name").innerHTML = "dear " + user_name + ", welcome to " + room_name;

function send() {
    msg = document.getElementById("msg").value;
    firebase.database().ref(room_name).push({
        name: user_name,
        message: msg,
        like: 0
    });
    document.getElementById("msg").value = "";
}

function getData() {
    firebase.database().ref("/").on('value', function (snapshot) {
        document.getElementById("output").innerHTML = "";
        snapshot.forEach(function (childSnapshot) {
            childKey = childSnapshot.key;
            Room_names = childKey;
            //Start code
            console.log("Room Name -" + Room_names);
            // row = "<div class= 'room_name' id=" + Room_names + "onclick = 'redirectToRoomName(this.id)'>#" + Room_names + "</div><hr>"
            row = "<div class='room_name' id=" + Room_names + " onclick='redirectToRoomName(this.id)' >#" + Room_names + "</div><hr>";
            document.getElementById("output").innerHTML += row;
            //End code
        });
    });
}
getData();

function addRoom() {
    room_name = document.getElementById("room_name").value;
    firebase.database().ref("/").child(room_name).update({
        purpose: "adding room name"
    });

    localStorage.setItem("room_name", room_name);

    window.location = "chat_room.html";
}

function redirectToRoomName(name) {
    console.log(name);
    localStorage.setItem("room_name", name)
    window.location = "chat_room.html"
}

function logout() {
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location = "index.html";
}