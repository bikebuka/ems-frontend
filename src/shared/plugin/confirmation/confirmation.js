import Swal from "sweetalert2";
export default function ({text,action,dispatch}) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        inputAttributes: {
            autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: text,
        showLoaderOnConfirm: true,
        preConfirm: () => {
            dispatch(action)
        },
        allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
        //do nothing
    })
}
export function ConfirmationInput ({text,action,dispatch}) {
    Swal.fire({
        title: 'Enter OTP',
        input: 'text',
        inputAttributes: {
            autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: text,
        showLoaderOnConfirm: true,
        preConfirm: () => {
            return dispatch(action)
        },
        allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                text: `You're not authorised`,
            })
        }
    })
}
