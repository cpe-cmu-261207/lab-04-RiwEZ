/* Your code here */

if (!localStorage.getItem("data")) {
    const data = {
        task: [],
        done: [],
    }
        
    localStorage.setItem("data", JSON.stringify(data))
}

const todoList = document.querySelector("#todoList")
const doneList = document.querySelector("#doneList")

const getData = () => {return JSON.parse(localStorage.getItem("data"))}

const delBtn = (node, mode) => {
    const btn = document.createElement("button")
    btn.innerHTML = "Del"
    btn.className = "del"

    btn.addEventListener("click", () => {
        let data = getData()
        let idx

        if (mode == "task") {
            todoList.removeChild(node)
            idx = data.task.indexOf(node.children[0].innerText)
            data.task.splice(idx, 1)
        }
        else if (mode == "sTask") {
            doneList.removeChild(node)
            idx = data.done.indexOf(node.children[0].innerText)
            data.done.splice(idx, 1)
        }
        
        localStorage.setItem("data", JSON.stringify(data))
    })

    return btn
}

const doneBtn = (node) => {
    const btn = document.createElement("button")
    btn.innerHTML = "Done"
    btn.className = "done"

    btn.addEventListener("click", () => {
        let data = getData()
        let idx = data.task.indexOf(node.children[0].innerText)

        console.log(idx)

        data.done.unshift(data.task[idx])
        data.task.splice(idx, 1)
        localStorage.setItem("data", JSON.stringify(data))
        
        todoList.removeChild(node)
        let t = sTask(node.children[0].innerText)
        doneList.prepend(t)
    })

    return btn
}

const sTask = (val) => {
    const task = document.createElement("li")
    const div = document.createElement("div")
    div.className = "notShow"
    task.className = "gray-text"
    
    task.innerHTML = "<s>" + val + "</s>"
    div.append(delBtn(task, "sTask"))
    task.append(div)

    task.addEventListener("mouseenter", (e) => {
        div.className = "show"   
    })
    task.addEventListener("mouseleave", (e) => {
        div.className = "notShow"   
    })
    
    return task
}

const task = (val) => {
    const task = document.createElement("li")
    const span = document.createElement("span")
    const div = document.createElement("div")
    span.innerText = val
    div.className = "notShow"
    
    task.append(span)
    div.append(delBtn(task, "task"))
    div.append(doneBtn(task))
    task.append(div)


    task.addEventListener("mouseenter", (e) => {
        div.className = "show"   
    })
    task.addEventListener("mouseleave", (e) => {
        div.className = "notShow"   
    })

    return task
}

const render = () => {
    let data = getData()

    data.task.forEach((item) => {
        let t = task(item)
        todoList.append(t)
    })

    data.done.forEach((item) => {
        let t = sTask(item)
        doneList.append(t)
    })
}


const addTodo = () => {
    const todoVal = document.querySelector("#todoVal").value

    if (todoVal == "") {
        alert("Task can't be empty!!")
        return
    }

    let t = task(todoVal)
    todoList.prepend(t)

    let data = getData()
    data.task.unshift(todoVal)
    localStorage.setItem("data", JSON.stringify(data))

} 


const inputField = document.querySelector("#todoVal")
inputField.addEventListener("keyup", (e) => {
    if (e.key == "Enter") addTodo()
})


render()