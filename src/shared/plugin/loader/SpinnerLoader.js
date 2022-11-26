import {RotatingSquare} from "react-loader-spinner";

export default function () {
    return (
        <div className="d-flex justify-content-center">
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
        </div>
    )
}
