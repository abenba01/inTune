function notifyMe() {
  // Check if the browser supports notifications
  if (!("Notification" in window)) {
    alert("This browser does not support system notifications");
  }

  // Check whether notification permissions have already been granted
  else if (Notification.permission === "granted") {
    // Create a notification
   

   if (localStorage.getItem("playlist") != null) { //if playlist exists    

    theIcon = 'logo.png';
    theBody = "You have a saved playlist in myTunes.";
    var options = {
		      body: theBody,
		      icon: theIcon
		  };

    var notification = new Notification("inTune", options);
    }
  }

  // Ask the user for permission
  else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        var notification = new Notification("You've enabled push notifications!");
      }
    });
  }
}

notifyMe();