function notifyMe() {
  // Let's check if the browser supports notifications
  if (!("Notification" in window)) {
    alert("This browser does not support system notifications");
  }

  // Let's check whether notification permissions have already been granted
  else if (Notification.permission === "granted") {
    // If it's okay let's create a notification
   
    //if playlist exists

    var theIcon = new Image();
    theIcon.src = 'logo.png';
    theBody = "You have a saved playlist in myTunes.";
    var options = {
		      body: theBody,
		      icon: theIcon
		  };

    var notification = new Notification("icon.png","inTune", options);
  }

  // Otherwise, we need to ask the user for permission
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