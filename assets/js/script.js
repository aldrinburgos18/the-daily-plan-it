var currentDay = moment(new Date()).format("dddd, MMMM Do");
var currentTime = moment(new Date()).format("HH:mm:ss A");

$("#currentDay").html("Today is " + "<strong>" + currentDay + "</strong>");

var savedTasks = [];

//dynamically create rows
var createRows = function () {
  for (var i = 9; i < 22; i++) {
    $("#task-container").append(
      `<div class="row">
        <div class="col-2 hour">${(i<=11) ? i +'AM' : ( (i === 12) ? i + 'PM' : i-12+'PM' )}</div>
        <div class="col-9 border border-dark border-bottom-0 position-relative" id="task-div">
        <textarea id="task-${i-9}" name="task-text" rows="1" spellcheck="false" maxlength="55">${savedTasks[i-9]}</textarea>
        </div>
        <div class="col-1 border border-dark border-left-0 rounded-right save-btn">
          <span class="oi h1 m-0" data-glyph="check"></span>
        </div>
      </div>`
    );
  }
};


var saveTask = function(i, task) {
  console.log('saving task');
  savedTasks[i]= task;
  localStorage.setItem('tasks', JSON.stringify(savedTasks));
}

var loadTasks = function() {
  savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  if(!savedTasks.length) {
    for (var i = 0; i < 14; i++) {
      savedTasks[i] = '';
    }
  }
  createRows();
}

loadTasks()

$('textarea').on('blur', function() {
  console.log('blur');
  var i = $(this).closest('.row').index();
  var task = $(this).val().trim();
  //check if task has value
  if(task) {
    saveTask(i, task);
  }
});