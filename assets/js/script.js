var currentDay = moment(new Date()).format("dddd, MMMM Do");
var currentTime = moment(new Date()).format("HH:mm:ss A");

$("#currentDay").html("Today is " + "<strong>" + currentDay + "</strong>");


var savedTasks = [];

//dynamically create rows
var createRows = function () {
  for (var i = 9; i < 22; i++) {
    $("#task-container").append(
      `<div class="row" id="task-${i-9}">
        <div class="col-2 hour">${(i<=11) ? i +'AM' : ( (i === 12) ? i + 'PM' : i-12+'PM' )}</div>
        <div class="col-9 border border-dark border-bottom-0 position-relative" id="task-div">
        <textarea id="task-text" name="task-text" rows="1" maxlength="55"></textarea>
        </div>
        <div class="col-1 border border-dark border-left-0 rounded-right save-btn">
          <span class="oi h1 m-0" data-glyph="check"></span>
        </div>
      </div>`
    );
  }
};

createRows();

$('textarea').on('blur', function() {
  var i = $(this).closest('.row').index();
  var task = $(this).val().trim();
  //check if task has value
  if(task) {
    saveTask(i, task);
  }
});

var saveTask = function(i, task) {
  //check if task id exists in savedTask array, update if it does, add if it doesn't
  var currentTask = savedTasks.find(task => ((task.index === i)))
  if(currentTask){
    currentTask.tasks = task;
  } else {
    savedTasks.push({"index": i, "tasks": task})
  }
  localStorage.setItem('tasks', JSON.stringify(savedTasks));
}

var loadTasks = function() {
  savedTasks = JSON.parse(localStorage.getItem('tasks'));

  if(!savedTasks) {
    savedTasks = []
  }
}

loadTasks()