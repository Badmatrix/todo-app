addTodo = document.querySelector('.add')
const todoList = document.querySelector('.todos')
const searchTodo = document.querySelector('.search input')

addTodo.addEventListener('submit', e => {
  e.preventDefault()
  const todo = addTodo.add.value.toLowerCase().trim()
  if (todo) {
    todoList.innerHTML += `<li class='list-group-item d-flex justify-content-between align-item-center'>
                <span>${todo}</span>
                <i class='far fa-trash-alt delete'></i>
              </li>`
  }
  addTodo.reset()
})

todoList.addEventListener('click', e => {
  if (e.target.classList.contains('delete')) {
    e.target.parentElement.remove()
  } 
})

searchTodo.addEventListener('keyup', () => {
  const term = searchTodo.value.trim().toLowerCase()
  //  console.log(term)
  Array.from(todoList.children)
    .filter(todo => !todo.textContent.includes(term))
    .forEach(todo => todo.classList.add('filtered'))
  Array.from(todoList.children)
    .filter(todo => todo.textContent.includes(term))
    .forEach(todo => todo.classList.remove('filtered'))
})
