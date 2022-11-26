import {CirclesWithBar} from "react-loader-spinner";

export default function () {
    return (
        <div className="d-flex justify-content-center">
            <CirclesWithBar
                height="100"
                width="100"
                color="#4fa94d"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                outerCircleColor=""
                innerCircleColor=""
                barColor=""
                ariaLabel='circles-with-bar-loading'
            />
        </div>
    )
}
