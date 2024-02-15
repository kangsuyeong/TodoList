// 유저가 값을 입력한다
// +버튼을 클릭하면, 할일이 추가된다.
// delete버튼을 누르면 할일이 삭제된다.
// check버튼을 누르면 할일이 끝나면서 밑줄이 간다
// 1. check 버튼을 클릭하는 순간 true false
// 2. true이면 끝난걸로 간주하고 밑줄 보여주기
// 3. false이면 안끝난걸로 간주하고 그대로

//진행중 끝남 탭을 누르면, 언더바가 이동한다
// 끝남탭은, 끝난 아이템만 , 진행중탭은 진행중 아이템만
// 전체탭을 누르면 다사ㅣ 전체아이템으로 돌아옴

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div")
let mode ='all'
let taskList =[]
let filterList=[]

let underLine = document.getElementById("under-line")

console.log(underLine)
//underline 만들기

for(let i=1;i,i<tabs.length;i++){
    tabs[i].addEventListener("click",(e)=>menuIndicator(e))
}

// underLineMenu.forEach(menu=>
//     menu.addEventListener("click",(e)=>menuIndicator(e))
// )

function menuIndicator(e){
    underLine.style.left = e.currentTarget.offsetLeft + "px";
    underLine.style.width = e.currentTarget.offsetWidth + "px";
    underLine.style.top = e.currentTarget.offsetTop + e.currentTarget.offsetHeight + "px";  
}


addButton.addEventListener("click",addTask)
console.log(tabs)

for(let i=1;i,i<tabs.length;i++){
    tabs[i].addEventListener("click",function (event){
        filter(event);
    })
}

function addTask(){
    if(taskInput.value==""){
        alert("할일을 입력해주세요!")
        return;
    }
    console.log(taskInput.value)
    let task = {
        id:randomIDGenerate(),
        taskContent: taskInput.value,
        isComplete: false
    }
    taskList.push(task)
    taskInput.value = ""; //    빈칸으로 만들기
    
    console.log(taskInput)
    render()
}

function render(){
    // 1. 내가 선택한 탭에 따라서
    let list=[]
    if(mode ==="all"){
        list = taskList;
    }
    else if(mode==="ongoing" || mode=="done"){
        list = filterList
    }
    // 2. 리스트를 달리 보여준다.
   
    console.log(mode)
    console.log(list)
    let resultHTML =``;
    for(let i=0;i<list.length;i++){
        if(list[i].isComplete == true){
            resultHTML+=`<div class = "task">
            
            <div class="task-done">
                ${list[i].taskContent}
            </div>
    
            <div>
                <button onclick="toggleComplete('${list[i].id}')" class="check-button2"><i class="fa-regular fa-square-check fa-xl"></i></button>
                <button onclick="deleteTask('${list[i].id}')" class="delete-button"><i class="fa-solid fa-trash-can fa-xl"></i></button>
            </div>
        </div>`
        }

        else{
            resultHTML +=`<div class = "task">
            <div>
                ${list[i].taskContent}
            </div>
    
            <div>
                <button onclick="toggleComplete('${list[i].id}')" class="check-button"><i class="fa-regular fa-square fa-xl"></i></button>
                <button onclick="deleteTask('${list[i].id}')" class="delete-button"><i class="fa-solid fa-trash-can fa-xl"></i></button>
            </div>
        </div>`
        }

        
    }

    document.getElementById("task-board").innerHTML = resultHTML
}

function toggleComplete(id){
    for(let i=0;i<taskList.length;i++){
        if(taskList[i].id == id){
            taskList[i].isComplete=!taskList[i].isComplete;
            break;
        }
    }
    filter()
    console.log(taskList)

}

function randomIDGenerate(){
    return '_' + Math.random().toString(36).substr(2, 9);
}

function deleteTask(id){
    console.log("id",id)
    for(let i=0;i<taskList.length;i++){
        if(taskList[i].id == id){
            taskList.splice(i,1)
            break;
        }
    }
    filter()
    console.log(taskList)
}

function filter(e){
    if (e) {
        mode = e.target.id;
        
      } 
    filterList=[]
    if(mode=="all"){
        //전체리스트를 보여준다.
        render()
    }
    else if(mode=="ongoing"){
        //진행중인 아이템을 보여준다.
        //task.isComplete : false
        for(let i=0;i<taskList.length;i++){
            if(taskList[i].isComplete==false){
                filterList.push(taskList[i])
            }
        }
        console.log("진행중",filterList)
        render()
    }
    else if(mode=="done"){
        //끝나는 케이스
        //task.isComplete : true
        for(let i=0;i<taskList.length;i++){
            if(taskList[i].isComplete==true){
                filterList.push(taskList[i])
            }
        }
        console.log("끝남",filterList)
        render()
    }
}


//enter key 만들기
// Execute a function when the user presses a key on the keyboard
taskInput.addEventListener("keypress", function(event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
        addTask()
    }
  });