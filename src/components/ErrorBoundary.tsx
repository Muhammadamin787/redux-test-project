/** @format */
import { useRouteError } from "react-router-dom";

export const ErrorBoundary = () => {
    const err = useRouteError();
    const errorStyle = { color: "red" };

    return (
        <div style={{ padding: "40px" }}>
            <h2 style={errorStyle}>{err.message}</h2>
            <br />
            <div style={errorStyle}>{err.stack}</div>
        </div>
    );
};
