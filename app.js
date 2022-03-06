//geting all required elements
const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const clearAllBtn = document.querySelector(".footer button")

inputBox.onkeyup = ()=>{
    let userData = inputBox.value; //getting user entered data
    if(userData.trim() != 0){//if user value aren't only spaces 
        addBtn.classList.add("active"); //activate add button to active    
    }else{ 
          addBtn.classList.remove("active"); //activate add button to not active    
    
    }
} 
showTasks(); //calling a showTasks function
//if users clicks on add btn
addBtn.onclick = ()=>{
    let userData = inputBox.value; //getting user entered data
    let getLocalStorage = localStorage.getItem("New Todo"); //getting local storage
    if(getLocalStorage == null){ //if local storage is null
        listArr = [];//creatin a blank array
    }else{
        listArr = JSON.parse(getLocalStorage); //transforming json string into a js objct
    }
    listArr.push(userData); //pushing or adding user data
    localStorage.setItem("New Todo", JSON.stringify(listArr)); //transforming a js object into a json string
    showTasks(); //calling a showTasks function
} 

//a function for adding task list in ul
function showTasks(){
    let getLocalStorage = localStorage.getItem("New Todo"); //getting local storage   
    if(getLocalStorage == null){ //if local storage is null
        listArr = [];//creatin a blank array
    }else{
        listArr = JSON.parse(getLocalStorage); //transforming json string into a js objct
    }

    const pendingNo = document.querySelector(".pendingNo");
    pendingNo.textContent = listArr.length;//passing the length value in pendingnumber
    if(listArr.length > 0){ //if array length is greater than zero
        clearAllBtn.classList.add("active");//active the clear button
    }else{
        clearAllBtn.classList.remove("active");//unactive clear button
    }

    let newLiTag = '';
    listArr.forEach((element, index) =>{
        newLiTag += `<li> ${element} <span onclick ="deleteTask(${index})";><i class="fas fa-trash"></i></span></li>`;
    });
    todoList.innerHTML = newLiTag; //adding new li tag inside ul tag
    inputBox.value = '';
}
//deleting task function
function deleteTask(){
    let getLocalStorage = localStorage.getItem("New Todo");   
    listArr = JSON.parse(getLocalStorage);
    listArr.splice(index, 1);//deleting or remove a indexed li
    //after remove the li update the local storage
    localStorage.setItem("New Todo", JSON.stringify(listArr)); //transforming a js object into a json string
    showTasks(); //calling a showTasks function
}

//delete all tasks function
clearAllBtn.onclick = ()=>{
    listArr = [];//empty an array 
    //after clearing all tasks again update the local storage
    localStorage.setItem("New Todo", JSON.stringify(listArr)); //transforming a js object into a json string
    showTasks(); //calling a showTasks function
}