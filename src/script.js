const formAddTodo = document.querySelector('.add--todo')
const searchForm = document.querySelector('.search-todo')
const todos = document.querySelector('.todos')
const emptyUl = document.querySelector('.empty')
const clearTodo=document.querySelector('.reset')


class App {
  #todoList = []
  constructor() { 
    formAddTodo.addEventListener('submit', this._addTodo.bind(this))
    searchForm.addEventListener('keyup', this._searchTodo.bind(this))
    clearTodo.addEventListener('click', this.reset)
    todos.addEventListener('click',this._deleteTodo.bind(this))
    this._getStorage()
  }
  _renderTodo(todo) {
    const html = `
    <li class="todo" data-id="">
        <p>${todo}</p>
        <div class="li-action">
         
          <span class="delete-todo" title="delete todo"><i class="fa-solid fa-trash-can"></i></span>
        </div>   
    </li>`

    emptyUl.insertAdjacentHTML('afterend', html)
    emptyUl.classList.add('hidden')
  }
  _addTodo (e) {
    e.preventDefault()
    const todo = formAddTodo.todo.value.toLowerCase().trim()
    if (!todo) return
    this.#todoList.push(todo)
      this._renderTodo(todo)
      this._setStorage()
    formAddTodo.reset()
  }
  _deleteTodo(e) {
    const target = e.target.closest('li')
    const click = e.target.closest('span')
      if (!click) return
    if (click.classList.contains('delete-todo')) {
      const text = target.innerText.toLowerCase()
      const index = this.#todoList.indexOf(text)
      const newList = this.#todoList.splice(index,1)
      this._setStorage()
      target.remove()

      }
    }
  _searchTodo() {
      const term = searchForm.value.trim().toLowerCase()
      //  console.log(term)
      Array.from(todos.children)
        .filter(todo => !todo.textContent.includes(term))
        .forEach(todo => todo.classList.add('filtered'))
      Array.from(todos.children)
        .filter(todo => todo.textContent.includes(term))
        .forEach(todo => todo.classList.remove('filtered'))
  }
  _setStorage() {
    localStorage.setItem('todos', JSON.stringify(this.#todoList))
  }
  _getStorage() {
    const data = JSON.parse(localStorage.getItem('todos'))
    if(!data) return
    this.#todoList = data
    this.#todoList.forEach(todo => this._renderTodo(todo))
    // console.log(this.#todoList)
    
  }
  reset() {
    localStorage.removeItem('todos')
    location.reload()
  }
}
const app = new App()
