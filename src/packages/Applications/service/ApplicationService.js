import confirmation from "../../../shared/plugin/confirmation/confirmation";

export const addApplication = (dispatch,action) => {
    let payload={
        dispatch,
        action,
        text: 'Confirm'
    }
    confirmation(payload)
}