import { useNavigate } from "react-router-dom";

const YourComponent = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/path/to/push");
    }

    return (
        <div>
            <button onClick={handleClick} type="button" />
        </div>
    );
}

export default YourComponent;