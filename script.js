const selectElement = document.querySelectorAll("select");
const currentTime = document.querySelector("h1");
const clockContent = document.querySelector(".content");
const button = document.querySelector(".Alarm-Button");
const alarmList = document.getElementById("alarm-list");
// rintone
let alarmTime;
let ringtone = new Audio("./ringtone.mp3");

// Array to store alarms
let alarms = [];

// setting Up for  hour
for (let i = 12; i > 0; i--) {
  i = i < 10 ? "0" + i : i;

  let option = `<option value="${i}">${i}</option>`;
  selectElement[0].firstElementChild.insertAdjacentHTML("afterend", option);
}
// setting Up for  minutes
for (let i = 59; i >= 0; i--) {
  i = i < 10 ? "0" + i : i;

  let option = `<option value="${i}">${i}</option>`;
  selectElement[1].firstElementChild.insertAdjacentHTML("afterend", option);
}
// setting Up for  AM/PM
for (let i = 2; i > 0; i--) {
  let amPm = i == 1 ? "AM" : "PM";

  let option = `<option value="${amPm}">${amPm}</option>`;
  selectElement[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

// set Interval for current time
setInterval(() => {
  //getting hours,min,sec
  let date = new Date();
  let h = date.getHours();
  let m = date.getMinutes();
  let s = date.getSeconds();
  let ampm = "AM";
  if (h >= 12) {
    h = h - 12;
    ampm = "PM";
  }
  //if hour value is 0,set this value to 12
  h = h == 0 ? (h = 12) : h;

  // adding 0 before h,m,s if value is less then 0
  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;
  currentTime.innerText = `${h}:${m}:${s} ${ampm}`;
  // Check if it's time for the alarm to ring
  let currentFormattedTime = `${h}:${m} ${ampm}`;
  if (alarmTime === currentFormattedTime) {
    ringtone.play();
    // ringtone.loop = true;
  } else {
    // Stop the ringtone if it's not time for the alarm
    ringtone.pause();
    ringtone.currentTime = 0;
  }
}, 1000);

//set Alarm
function setAlarm() {
  let hour = selectElement[0].value;
  let minute = selectElement[1].value;
  let ampm = selectElement[2].value;
  if (hour === "hour" || minute === "Minute" || ampm === "AM/PM") {
    return alert("Select valid time!");
  }
  let time = `${hour}:${minute} ${ampm}`;
  alarms.push(time);
  alert(`Alarm set for ${time}`);
  // Set alarmTime for comparison with current time
  alarmTime = time;
}

// Function to display alarms
function displayAlarms() {
  alarmList.innerHTML = ""; // Clear previous list
  alarms.forEach((alarm, index) => {
    const listItem = document.createElement("div");
    listItem.className = "set-alarm";
    listItem.textContent = `${index + 1}. ${alarm}`;
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete-alarm";
    deleteButton.addEventListener("click", () => {
      deleteAlarm(index);
      displayAlarms();
    });

    listItem.appendChild(deleteButton);

    alarmList.appendChild(listItem);
  });
}
// Function to stop the ringtone
function stopRingtone() {
  ringtone.pause();
  ringtone.currentTime = 0;
}

// Function to delete an alarm
function deleteAlarm(index) {
  alarms.splice(index, 1);
  console.log(`Alarm ${index + 1} deleted.`);
}

// Set up click event for Set Alarm button
button.addEventListener("click", () => {
  setAlarm();
  displayAlarms();
});
