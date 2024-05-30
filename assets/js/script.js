var currentDay = moment(new Date()).format("dddd, MMMM Do");
var currentTime = moment(new Date()).format("HH:mm:ss A");

$("#currentDay").html("Today is " + "<strong>" + currentDay + "</strong>");


//dynamically create rows
var createRows = function () {
  for (var i = 9; i < 19; i++) {
    $("#task-container").append(
      `<div class="row" id="task-${i-9}">
        <div class="col-2 hour">${(i<=11) ? i +'AM' : ( (i === 12) ? i + 'PM' : i-12+'PM' )}</div>
        <div class="col-9 border border-dark border-bottom-0 position-relative">
          <p><input class="task-input" /></p>
        </div>
        <div class="col-1 border border-dark border-left-0 rounded-right save-btn">
          <span class="oi h1 m-0" data-glyph="check"></span>
        </div>
      </div>`
    );
  }
};

createRows();
