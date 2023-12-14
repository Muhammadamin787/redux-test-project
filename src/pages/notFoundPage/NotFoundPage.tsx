/** @format */

import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./notFoundPage.scss";
import { Result } from "antd";
import Loader from "../../components/Loader";

const NotFoundPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Автоматицеская перенаправлия 
        const timer = setTimeout(() => {
            navigate("/");
        }, 2000);

        return () => {
            clearTimeout(timer)
        }
    }, []);

    return (
        <div className="not-found-page">
            <div>
                <Result
                    status="404"
                    title="404"
                    subTitle="Страница не найдено"
                    extra={
                        <h2>
                            <Link to="/">Перейти на главную страницу</Link>
                            <Loader
                                show={true}
                                style={{ fontSize: "40px", marginLeft: "20px" }}
                            />
                        </h2>
                    }
                />
            </div>
        </div>
    );
};

export default NotFoundPage;
