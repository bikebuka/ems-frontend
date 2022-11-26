import {RotatingSquare} from "react-loader-spinner";
import {Backdrop} from "@mui/material";

export default function () {
    return (
        <Backdrop open={true}>
            <RotatingSquare
                height="100"
                width="100"
                color="#4fa94d"
                ariaLabel="rotating-square-loading"
                strokeWidth="4"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        </Backdrop>
    )
}
