const { createStore, applyMiddleware } = require("redux");
const { fetchTodos } = require("./functons");
const { delayActionMiddleware, fetchAsyncMiddleware } = require('./middlewares');
const thunk = require('redux-thunk');

// initial State
const initialState = {
    todos: []
}

// reducer
const todoReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'todos/todoAdded':
            return {
                ...state,
                todos: [
                    ...state.todos,
                    {
                        title: action.payload,
                    }
                ]
            }
        case 'todos/todoLoaded':
            return {
                ...state,
                todos: [
                    ...state.todos,
                    ...action.payload,
                ]
            }
        default:
            break;
    }
}

//store
const store = createStore(todoReducer, applyMiddleware(thunk.default));


// Subscribe to state changes
store.subscribe(() => {
    console.log(store.getState());
})

//dispatch actions
// store.dispatch({
//     type: 'todos/todoAdded',
//     payload: 'Learn Redux with me'
// })
store.dispatch(fetchTodos)