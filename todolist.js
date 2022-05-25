
  
  class ToDo{
    constructor(title, done){
        this.title=title;
        this.done=done;

    }

    toggle(){
        this.done=!this.done;
    }
}

class ToDoList {
    constructor (listSelector){
        this.list=[];
        this.$list=document.querySelector(listSelector);
        
        this.initialize();
        this.addEvents();
    };
    
   
initialize(){
    const template= 
    `<div class="form-row">
    <div class="col-10">
          <input type="text" class="form-control todo-inp" placeholder="add task"/>
    </div>
    <div class="col-2">
        <button type="submit" class="add-task btn btn-primary">
        Add 
         </button>
    </div>

</div>

<div class="tasks"> </div>

`;

this.$list.innerHTML=template;

 }


addEvents(){
    this.$todoInp=this.$list.querySelector(".todo-inp");
    this.$todoAddBtn=this.$list.querySelector(".add-task");

    this.$todoAddBtn.addEventListener("click", this.handleAddTodo.bind(this));
    this.$list.addEventListener("click", this.handleToDoClick.bind(this));

}



handleAddTodo(e){
    const title=this.$todoInp.value;
    if (title) {
    console.log(title);
    const newToDo=new ToDo(title, false);
    this.addToDo(newToDo);
    this.$todoInp.value="";
 }
}


handleToDoClick(e){
    console.log(e.target.className);
    const className=e.target.className;
    if (className.includes("done-checkbox")){
        this.toggleTodo(e);
    }
    if(className.includes("dlt-btn")){
        this.deleteTodo(e);
    }
    if(className.includes("edit-btn")){
        this.EditTodo(e);
    }
    
}



toggleTodo(e){
    
    const id=this.getToDoId(e.target.closest(".alert"));

    this.list[id].toggle();
    this.renderTasks();
}

deleteTodo(e){
    const id=this.getToDoId(e.target.closest(".alert"));
    this.list.splice(id,1);
    this.renderTasks();
}

EditTodo(e){
    const id=this.getToDoId(e.target.closest(".alert"));

}
getToDoId($todo) {

   const idpart=$todo.id.split("-");
   return parseInt(idpart[1]);
}

addToDo(todo){
    this.list.push(todo);
    this.renderTasks();
}

renderTasks(){
    this.$listTasks=this.$list.querySelector(".tasks");

    const todoTemplate= this.list.map((task,i) => {
      const {title, done} =task;

      return `
      <div id="todo-${i}" class="alert alert-dark clearfix">
      <label class="title float-left">
      <input type="checkbox" class="done-checkbox" ${done ? "checked" : ""}/>
      ${done ? `<strike>${title}</strike>` : title}
      </label>
      <button class="dlt-btn btn  float-right">x</button>
      <button class="edit-btn btn  float-right">edit</button>

  </div>`;
    });

    this.$listTasks.innerHTML=todoTemplate.join("");

 }
}

/*const newListBtn=document.querySelector(".add-btn");
newListBtn.addEventListener("click", function(e) {
    console.log("new list button");
    const hd=document.createElement("h2");
    hd.innerHTML="New To Do List";
    document.querySelector(".listcol").appendChild(hd);
    const newdiv=document.createElement("div");
    newdiv.className="todo-list";
    newdiv.innerHTML="";
    document.querySelector(".listcol").appendChild(newdiv);
    const newList=new ToDoList(".todo-list");


  }); */


const list=new ToDoList(".todo-list");