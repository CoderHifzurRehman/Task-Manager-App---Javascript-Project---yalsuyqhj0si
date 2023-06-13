const todos = document.querySelectorAll(".todo");
const all_status = document.querySelectorAll(".status");
let draggableTodo = null;



todos.forEach((todo) => {
  todo.addEventListener("dragstart", dragStart);
  todo.addEventListener("dragend", dragEnd);
  todo.addEventListener("touchstart", touchStart);
  todo.addEventListener("touchend", touchEnd);
});

function dragStart() {
  // e.dataTransfer.setData("text/plain", null);
  draggableTodo = this;
  // progress = this.document.querySelector(".progress");
  // console.log(progress);
  setTimeout(() => {
    this.style.display = "none";
  }, 0);
  console.log("dragStart");
}

function dragEnd() {
  draggableTodo = null;
  setTimeout(() => {
    this.style.display = "block";
  }, 0);
  console.log("dragEnd");
}

function touchStart(e) {
  e.preventDefault();
  draggableTodo = this;
  setTimeout(() => {
    this.style.opacity = "0.3";
  }, 0);
  console.log("touchStart");
  this.addEventListener("touchmove", touchMove);
}

function touchMove(e) {
  e.preventDefault();
  console.log("move");
}

function touchEnd(e) {
  e.preventDefault();
  draggableTodo.style.transform = "none";
    const targetStatus = getTargetStatus(e.changedTouches[0]);
    if (targetStatus) {
      targetStatus.appendChild(draggableTodo);
      progress = draggableTodo.querySelector(".progress");

      if (targetStatus == open_status) {
        draggableTodo.style.borderLeft = "5px solid red";
        progress.style.width = "25%";
        progress.style.setProperty("--my-end-width", "25%");
        progress.style.backgroundColor = "red";
      } else if (targetStatus == progress_status) {
        draggableTodo.style.borderLeft = "5px solid orange";
        progress.style.width = "50%";
        progress.style.setProperty("--my-end-width", "50%");
        progress.style.backgroundColor = "orange";
      } else if (targetStatus == review_status) {
        draggableTodo.style.borderLeft = "5px solid yellow";
        progress.style.width = "75%";
        progress.style.setProperty("--my-end-width", "75%");
        progress.style.backgroundColor = "yellow";
      } else if (targetStatus == done_status) {
        draggableTodo.style.borderLeft = "5px solid green";
        progress.style.width = "100%";
        progress.style.setProperty("--my-end-width", "100%");
        progress.style.backgroundColor = "green";
      }
      console.log("dropped");
    }
  draggableTodo = null;
  setTimeout(() => {
    this.style.opacity = "1";
  }, 0);
  console.log("touchEnd");
  this.removeEventListener("touchmove", touchMove);
}

function getTargetStatus(touch) {
  const x = touch.clientX;
  const y = touch.clientY;

  for (let i = 0; i < all_status.length; i++) {
    const status = all_status[i];
    const rect = status.getBoundingClientRect();
    if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
      return status;
    }
  }
  return null;
}

//


all_status.forEach((status) => {
  status.addEventListener("dragover", dragOver);
  status.addEventListener("dragenter", dragEnter);
  status.addEventListener("dragleave", dragLeave);
  status.addEventListener("drop", dragDrop);
});

function dragOver(e) {
  e.preventDefault();
  //   console.log("dragOver");
}

function dragEnter() {
  this.style.border = "1px dashed #ccc";
  console.log("dragEnter");
}

function dragLeave() {
  this.style.border = "none";
  console.log("dragLeave");
}

function dragDrop() {
  this.style.border = "none";
  this.appendChild(draggableTodo);
  progress = draggableTodo.children[0].children[0];

  if(this==open_status){
    draggableTodo.style.borderLeft = "5px solid red";
    
    progress.style.width ="25%";
    progress.style.setProperty('--my-end-width', '25%');
    // getComputedStyle(document.documentElement).getPropertyValue('--my-start-width');
    progress.style.backgroundColor = "red";
  }
  else if(this==progress_status){
    draggableTodo.style.borderLeft = "5px solid orange";
    progress.style.width ="50%";
    progress.style.setProperty('--my-end-width', '50%');
    // getComputedStyle(document.documentElement).getPropertyValue('--my-start-width');
    progress.style.backgroundColor = "orange";
  }
  else if(this==review_status){
    draggableTodo.style.borderLeft = "5px solid yellow";
    progress.style.width ="75%";
    progress.style.setProperty('--my-end-width', '75%');
    // getComputedStyle(document.documentElement).getPropertyValue('--my-start-width');
    progress.style.backgroundColor = "yellow";
  }
  else if(this==done_status){
    draggableTodo.style.borderLeft = "5px solid green";
    progress.style.width ="100%";
    progress.style.setProperty('--my-end-width', '100%');
    // getComputedStyle(document.documentElement).getPropertyValue('--my-start-width');
    progress.style.backgroundColor = "green";
  }
  console.log("dropped");
}




const deleteAll = document.getElementById("delete_btn");

deleteAll.addEventListener("click", clearAllTasks);

function clearAllTasks(){
  const doneSection = document.getElementById("done_status");
  const doneTasks = doneSection.querySelectorAll(".todo");
  
    doneTasks.forEach((doneTodos)=>{
      doneTodos.remove();
    });
  
}

/* Modal */

const btns = document.querySelectorAll("[data-target-modal]");
const close_modals = document.querySelectorAll(".close-modal");
const overlay = document.getElementById("overlay");

btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector(btn.dataset.targetModal).classList.add("active");
    overlay.classList.add("active");
  });
});

close_modals.forEach((btn) => {
  btn.addEventListener("click", () => {
    const modal = btn.closest(".modals");
    modal.classList.remove("active");
    overlay.classList.remove("active");
  });
});

window.onclick = (event) => {
  if (event.target == overlay) {
    const modals = document.querySelectorAll(".modal");
    modals.forEach((modal) => modal.classList.remove("active"));
    overlay.classList.remove("active");
  }
};

/* create todo  */
const todo_submit = document.getElementById("todo_submit");

todo_submit.addEventListener("click", createTodo);

function createTodo() {
  const input_val = document.getElementById("todo_input").value;
  const input_val2 = document.getElementById("descn_input").value;

  if(input_val.length<3){
    alert("Type Atleast 3 Characters Of Task Title");
    return;
  }
  if(input_val2.length<6){
    alert("Type Atleast 6 Characters Of Task Discription");
    return;
  }

  const todo_div = document.createElement("div");
  const todo_p = document.createElement("p");
  const todo_h = document.createElement("h3");
  const todo_progressBar = document.createElement("div");
  const todo_progress = document.createElement("div");
  
  
  const txt = document.createTextNode(input_val);
  const txt2 = document.createTextNode(input_val2);


  todo_div.appendChild(todo_progressBar);
  todo_div.appendChild(todo_h);
  todo_h.appendChild(txt);
  todo_div.appendChild(todo_p);
  todo_p.appendChild(txt2);
  todo_progressBar.appendChild(todo_progress);
  todo_div.classList.add("todo");
  todo_h.classList.add("t_head");
  todo_p.classList.add("descp");
  todo_progressBar.classList.add("progress-bar");
  todo_progress.classList.add("progress");
  todo_div.setAttribute("draggable", "true");

  /* create span */
  const span = document.createElement("span");
  const span_txt = document.createTextNode("\u00D7");
  span.classList.add("close");
  span.appendChild(span_txt);

  const time_span = document.createElement("span");
  let currentDate = new Date();
  var am_pm = currentDate.getHours() >= 12 ? "PM" : "AM";
  let time = currentDate.getDate() + "/"+ currentDate.getUTCMonth() + "/"+currentDate.getFullYear() + "  "+ (currentDate.getHours()% 12 || 12) + ":" + currentDate.getMinutes()+am_pm;
  const time_span_txt = document.createTextNode(time);
  time_span.classList.add("time");
  time_span.appendChild(time_span_txt);

  todo_div.appendChild(span);
  todo_div.appendChild(time_span);

  open_status.appendChild(todo_div);
  const todoHTML = todo_div.outerHTML;

  


  span.addEventListener("click", () => {
    span.parentElement.style.display = "none";
  });


  //   console.log(todo_div);

  todo_div.addEventListener("dragstart", dragStart);
  todo_div.addEventListener("dragend", dragEnd);
  todo_div.addEventListener("touchstart", touchStart);
  todo_div.addEventListener("touchend", touchEnd);

  document.getElementById("todo_input").value = "";
  document.getElementById("descn_input").value = "";
  todo_form.classList.remove("active");
  overlay.classList.remove("active");
}


const close_btns = document.querySelectorAll(".close");

close_btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.parentElement.style.display = "none";
  });
});



