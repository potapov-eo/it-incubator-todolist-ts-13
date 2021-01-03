import {appReducer, InitialStateType, setAppErrorAC, setAppStatusAC} from "./App-reducer";

let startState:InitialStateType
beforeEach(() => {
    startState = {
        status: 'succeeded',
        error:null
    };
});

test('correct status should be added', () => {
    const action = setAppStatusAC('idle');

    const endState = appReducer(startState, action)

    expect(endState).toEqual({
        status: 'idle',
        error: null
    });
})
test('correct error should be added', () => {
    const action = setAppErrorAC('errors');

    const endState = appReducer(startState, action)

    expect(endState).toEqual({
        status: 'succeeded',
        error: "errors"
    });
})