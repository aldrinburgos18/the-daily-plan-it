var currentDay = moment(new Date()).format("dddd, MMMM Do");
//var currentDay = "Sunday, June 2nd";
$("#currentDay").html("Today is " + "<strong>" + currentDay + "</strong>");
var currentTime = moment(new Date(), "hh:mm A");
//var currentTime = moment("10:01 AM", "hh:mm A");

var savedTasks = [];

//dynamically create rows
var createRows = function () {
  for (var i = 9; i < 22; i++) {
    $("#task-container").append(
      `<div class="row">
        <div class="col-2 hour"><p class='time'>${
          i <= 11 ? i + ":00 AM" : i === 12 ? i + ":00 PM" : i - 12 + ":00 PM"
        }</p></div>
        <div class="col-9 border border-dark position-relative task-div" id="task-${i - 9}">
        <textarea name="task-text" rows="1" spellcheck="false" maxlength="55">${savedTasks[i - 9]}</textarea>
        </div>
        <div class="col-1 border border-dark border-left-0 rounded-right save save-btn" id="save-${i - 9}">
          <span class="oi h1 m-0" data-glyph="check"></span>
        </div>
      </div>`
    );
  }
  auditTasks();
};

var auditTasks = function () {
  //reset class on function run
  $(".task-div").removeClass("past future present");
  $(".save").removeClass("save-btn");
  $(".time").each(function (i, el) {
    var taskHour = moment($(el).text(), "hh:mm A");
    var currentTask = $(".row").find("#task-" + i);
    var saveBtn = $(".row").find("#save-" + i);
    if (currentTime.isBefore(taskHour, "hour")) {
      currentTask.addClass("future");
      saveBtn.addClass("save-btn");
    } else if (currentTime.isAfter(taskHour, "hour")) {
      currentTask.addClass("past");
      currentTask.find("textarea").prop("disabled", true);
      saveBtn.addClass("disabled-save");
    } else {
      currentTask.addClass("present");
      saveBtn.addClass("save-btn");
    }
  });
};

var saveTask = function (i, task) {
  savedTasks[14] = currentDay;
  savedTasks[i] = task;
  localStorage.setItem("tasks", JSON.stringify(savedTasks));
};

var loadTasks = function () {
  savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  //reset saved tasks on the next day
  if (!savedTasks.length || savedTasks[14] != currentDay) {
    for (var i = 0; i < 14; i++) {
      savedTasks[i] = "";
    }
    saveTask();
  }
  createRows();
};

loadTasks();

$(".save-btn").on("click", function () {
  var i = $(this).closest(".row").index();
  var task = $(this).closest(".row").find("textarea").val();
  //check if task has value
  if (task) {
    saveTask(i, task);
  }
});

$("textarea").keydown(function (e) {
  // Enter was pressed without shift key
  if (e.key === "Enter" || (e.key === "Enter" && e.shiftKey)) {
    // prevent default behavior
    e.preventDefault();
  }
});

//run task auditor every 30 mins
setInterval(auditTasks, 1000 * 30 * 60);
