
const middleware = store => next => action  => {    
    if(action.type !== 'PROMISE') {
        return next(action)
    }
    const [startAction, successAction, failureAction] = action.actions
    store.dispatch({
        type: startAction
    })
    action.promise
        .then(data => store.dispatch({
            type:successAction,
            data,
            id: action.id
        }))
        .catch(error => store.dispatch({
            type: failureAction,
            error
        }))
    
}

export default middleware;