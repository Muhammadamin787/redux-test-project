import { useRouteError } from "react-router-dom";

export const ErrorBoundary = () => {

    // Helper Hooks
    const error = useRouteError();

    // Functions
    const errorStyle = { color: "red" };

    return (
        <div style={{ padding: "40px" }}>
            <h2 style={errorStyle}>{(error as Error)?.message}</h2>
            <br />
            <div style={errorStyle}>{(error as Error)?.stack}</div>
        </div>
    );
};
