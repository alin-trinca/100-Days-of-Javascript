const statusDisplay = document.getElementById("status");
const bgColor = document.getElementById("main");

function setColor(online) {
  if (online) {
    bgColor.classList.add("online");
  } else {
    bgColor.classList.remove("online");
  }
}

async function checkConnection() {
  try {
    const fetchResult = await fetch(
      "https://upload.wikimedia.org/wikipedia/en/thumb/7/7d/Lenna_%28test_image%29.png/440px-Lenna_%28test_image%29.png?time=" +
        new Date().getTime()
    );
    const online = fetchResult.status >= 200 && fetchResult.status < 300;
    setColor(online);
    return online;
  } catch (error) {
    console.error(error);
    statusDisplay.textContent = "OOPS!!! Your Internet Connection is Down.";
    setColor(false);
    return false;
  }
}

// Monitor the connection
setInterval(async () => {
  const online = await checkConnection();
  if (online) {
    statusDisplay.textContent = "You're ONLINE!!! Connection looks good.";
  } else {
    statusDisplay.textContent = "Offline";
  }
}, 5000);

// Check Connection When Page Loads
window.addEventListener("load", async (event) => {
  const online = await checkConnection();
  if (online) {
    statusDisplay.textContent = "Online";
  } else {
    statusDisplay.textContent = "Offline";
  }
});