let todo_text=document.getElementById('todo-input');
let todo_list=document.querySelector('.task-list');
let clear_box=document.querySelector('.clear-box');
let priority_box=document.querySelector('.priority-box');
let body=document.querySelector('body');
let priority_message=document.querySelector('.priority-message');
let previous_index='';
let todo_li='';
let selected_element='';
let parent_element='';
let todos=new Array();
if(localStorage.getItem('todo')==null)
localStorage.setItem('todo',JSON.stringify(todos));
else
todos=JSON.parse(localStorage.getItem('todo'));
showTodoItems();
todo_text.addEventListener('keypress',function(e){
    value=todo_text.value.trim();
    if(e.key=='Enter')
    {
        if(ValidateText(value))
        {
            let date=new Date();
            let done=false;
            let todo=new Todo(value,date,done);
            console.log("todos"+todo.length);
            todos.push(todo);
            localStorage.setItem("todo",JSON.stringify(todos));
            todo_text.value="";
            showTodoItems();
        }
    }
});
function ValidateText(value){
    if(value.trim()=="")
    return 0;
    else
    return 1;

}
function showTodoItems(){
    clearAll(todo_list);
        
            let todo_array=new Array();
            if(localStorage.getItem('todo')!=null)
            todo_array=JSON.parse(localStorage.getItem('todo'));
            else
            todo_array=[];

            for(let i=0;i<todo_array.length;i++)
            {
                let statusClass="";
                if(todo_array[i].done=="true")
                    statusClass="done";

                let item='<li class="todo-li '+statusClass+'" draggable="true" id="todo'+i+'" index="'+i+'" created="'+todo_array[i].time_created+'" done="'+todo_array[i].done+'">'+todo_array[i].text+'<div><span class="fa fa-check" onclick="checkTodo(this);"></span>&nbsp;&nbsp;<span class="fa fa-trash-o trash-todo'+i+'" todo_id="'+i+'" onclick="deletetodo(this);"></span></div></li>';
                todo_list.innerHTML+=item;

            }

            if(todo_array.length>=2)
            {
                priority_message.innerHTML="Drag and arrange to prioritize";
                
                if(!priority_message.classList.contains('fadein'))
                {
                    priority_message.classList.add('fadein');
                }
   
            }
            else
            {
                priority_message.innerHTML="";
            }
            

            eventSetter();
        
}
function clearAll(element){
    element.innerHTML="";

}
clear_box.addEventListener('click',function(){
    localStorage.clear();
    todos.splice(0,todos.length);
    showTodoItems();
});
priority_box.addEventListener('click',function(){
    updateTodos();
    showTodoItems();
});
function deletetodo(element)
{
    let todo_id=element.getAttribute('todo_id');
    let todo_index=element.getAttribute('index');
    let todo_modified=new Array();
    for(let i=0;i<JSON.parse(localStorage.getItem('todo')).length;i++)
    {
        if(i!=todo_id)
        {
            let todo=JSON.parse(localStorage.getItem('todo'))[i];
            todo_modified.push(todo);
        }
    }
    // console.log(todo_modified);
    localStorage.setItem('todo',JSON.stringify(todo_modified));
    todos=JSON.parse(localStorage.getItem('todo'));
    if(todos==null)
    todos=[];
    showTodoItems();

}
function checkTodo(element){
    let todo_li_element=element.parentNode.parentNode;
    let todo_element_classList= todo_li_element.classList;
    if(!todo_element_classList.contains('done'))
    {
        todo_element_classList.add('done');
        todo_li_element.attributes.done.nodeValue=true;
    }
    else
    {
        todo_element_classList.remove('done');
        todo_li_element.attributes.done.nodeValue=false;
    }
    updateTodos();

}

function eventSetter(){
// document.addEventListener("DOMContentLoaded", function() { 

    todo_li=document.querySelectorAll('.todo-li');
    todo_li.forEach(function(todo){
        // todo.addEventListener('mousedown',selectTodo);
        // todo.addEventListener('mouseup',unselectTodo);
        todo.addEventListener('dragstart', dragstart);        
        
    });
    body.addEventListener('drop',dragdrop);
    body.addEventListener('dragenter',(e) => e.preventDefault());
    body.addEventListener('dragover', (e) => e.preventDefault());
    body.addEventListener('dragleave', (e) => e.preventDefault());  




// });
}
function selectTodo(element){
    setTimeout(() => {
        element.classList.add('selected');
    },0);
    
}
function unselectTodo(element){
    setTimeout(() => {
        element.classList.remove('selected');
    },0);
    
}
function dragstart(){
    
    selected_element=document.querySelector('#'+event.target.id);
    previous_index=selected_element.getAttribute('index');
    parent_element=selected_element.parentNode;
    
    setTimeout(() => {
        parent_element.removeChild(selected_element);
        
    },0);
    
}
function dragdrop(){
    event.preventDefault();
    let position=event.clientY;
    let children=parent_element.childNodes;
    let position_index=0;
    children.forEach((item) => {

        let todoPlace=item.getBoundingClientRect();
        let todoTop=todoPlace.top;
        let todoBottom=todoPlace.bottom;
        let center=(todoTop+todoBottom)/2;
        if(position<center)
       {
           
       }
       else
       position_index++;
    });
    let target_index=position_index;

    setTimeout(() => {
        parent_element.insertBefore(selected_element,parent_element.children[target_index]);
        unselectTodo(selected_element);
    },0);

    // updateTodos();
    // showTodoItems();


}

function updateTodos(){
    let updated_todo_list=document.querySelectorAll('.todo-li');
    let updated_array=new Array();
    updated_todo_list.forEach((item) => updated_array.push(new Todo(item.textContent,item.attributes.created.nodeValue,item.attributes.done.nodeValue)));
    localStorage.setItem('todo',JSON.stringify(updated_array));
}
