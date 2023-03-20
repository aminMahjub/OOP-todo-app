let todoDataBase = [];

class Todo {
    constructor(todoText) {
        this.todoText = todoText;
        this.id = todoDataBase.length;
        this.checked = false;
    }
}

class TodoArrUpdate {
    addTodoInArr(todoText) {
        const todo = new Todo(todoText);
        todoDataBase.push(todo);
    }

    removeTodo(todo) {
        todoDataBase = todoDataBase.filter(element => element.id !== +todo.id);
    }
}

class UpdateUI {
    constructor(todoArrMethods) {
        this.todoArrMethods = todoArrMethods;
    }

    errorHandler(errorMessage) {
        const errorMessagePara = document.querySelector('.error-message');
        errorMessagePara.textContent = errorMessage;
        throw 'App Has Error Please Check The Program';
    }

    validateInput() {
        const input = document.querySelector('input[name="todo-input"]');
        let inputValue = input.value;
        if (input.value !== '') {
            input.value = '';
            return inputValue;    
        } else {
            this.errorHandler('Please do not add empty todo');
        }
    }

    addTodo() {
        const addBtn = document.querySelector('.add-todo');

        addBtn.addEventListener('click', (e) => {
            e.preventDefault();
            let inputValue = this.validateInput();
            this.todoArrMethods.addTodoInArr(inputValue);
            this.renderTodoElements();
        });
    }


    createElement(elementObj, childOf) {
        const element = document.createElement(elementObj.type);

        elementObj.attr ? element.setAttribute(elementObj.attr.type, elementObj.attr.value) : null;
        elementObj.text ? element.textContent = elementObj.text : null;

        childOf.appendChild(element);

        return element;
    }

    renderTodoElements() {
        const todoRoot = document.querySelector('.todo-list');

        if (todoRoot.innerHTML !== '') {
            todoRoot.innerHTML = '';
        }

        todoDataBase.forEach((element) => {
            const mainDiv = this.createElement({type: 'div', attr: {type: 'id' ,value: element.id}}, todoRoot);
            const todoText = this.createElement(
            {
             type: 'p',
             attr: {type: 'title', value: element.todoText},
             text: element.todoText
            }, mainDiv); 
            const btnContainer = this.createElement({type: 'div'}, mainDiv);
            const removeBtn = this.createElement({type: 'button', text: 'Remove'}, btnContainer);
            removeBtn.addEventListener('click', (event) => {
                event.preventDefault();
                let targetTodo = event.target.parentElement.parentElement;
                this.todoArrMethods.removeTodo(targetTodo);
                this.renderTodoElements();
            });
            
        })
    }
}

const updateUiObj = new UpdateUI(new TodoArrUpdate());
updateUiObj.addTodo();