let task=JSON.parse(localStorage.getItem("task"))||[];
render();
const add=document.getElementById("submit");
add.addEventListener("click",addtask);

let inputBox=document.getElementById("task");
inputBox.addEventListener("keydown", function(event){

    if(event.key === "Enter"){
        addtask();
    }
});

function addtask(event){
    let input1=inputBox.value;
    inputBox.focus();
    if(input1.trim()){
     let newtasks={
        taskid: Date.now(),
        taskname:input1,
        status:"Incomplete"
     };
    task.push(newtasks);
    save();
    render();
    alert("Task added Successfully");
  }
}

function save(event){
    localStorage.setItem("task",JSON.stringify(task));
    
}

const display=document.getElementById("display");
display.addEventListener("click",render);
function render(event){
     document.getElementById("card").innerHTML="";
    task.forEach(newtasks => {
    let div=document.createElement("div");
    let para=document.createElement("p");
    const stat=document.createElement("button");
    const delet=document.createElement("button");
    para.innerHTML=newtasks.taskname;
    stat.innerHTML=newtasks.status;
    delet.innerHTML="Delete";
    stat.addEventListener("click",function(){
        if(newtasks.status==="Incomplete"){
            newtasks.status="Complete";
            stat.innerHTML="Complete";
        }
        else{
            newtasks.status="Incomplete";
            stat.innerHTML="Incomplete";
        }
        save();
    });
    delet.addEventListener("click",function(){
        deleteTask(newtasks.taskid);
        });
        function deleteTask(id){
        let index=task.findIndex(function(t){
            return t.taskid===id;
        });
        if(index!==-1){
            task.splice(index,1);
            save();
            render();
        }
    }
    
    div.append(para);
    div.append(stat);
    div.append(delet);
    document.getElementById("card").appendChild(div);
    });
}
const clear=document.getElementById("clear");
clear.addEventListener("click",clearAll);
function clearAll(event){
    task.length=0;
    localStorage.removeItem("task");
    render();
}
