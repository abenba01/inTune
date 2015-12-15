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

      var notification = new Notification("inTune", options); //create notification
    }
  }

  // Ask the user for permission
  else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function (permission) {
      //enabled notifications
      if (permission === "granted") {
        
        theIcon = 'logo.png';
        theBody = "You've enabled push notifications!'";
        var options = {
            body: theBody,
            icon: theIcon
        };

      var notification = new Notification("inTune", options); //create notification

      }
    });
  }
}

notifyMe();