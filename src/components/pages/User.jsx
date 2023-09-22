import { useContext, useEffect, useState } from "react";
import { AiOutlineRollback } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import loginUser from "../../api/api";
import { AuthContext } from "./AuthContext";

const User = () => {
  const { user: authUser } = useContext(AuthContext);
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (!authUser.email) {
      navigate("/");
    }
  }, [authUser.email, navigate]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await loginUser();
        setUser(response.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
  }, [id]);

  const renderUser = () => {
    return (
      <div className="border border-[#ccc] p-4 rounded-md">
        <h3>Name: {user.username}</h3>
        <p>Email: {user.password}</p>
        <img
          src={user.avatar}
          alt={user.username}
          className="w-[100px] h-[100px] object-cover"
        />
      </div>
    );
  };

  return (
    <div>
      <div
        className="m-4 max-w-[100px] flex items-center justify-center gap-2 bg-gray-400 hover:bg-gray-700 rounded-md cursor-pointer text-white"
        onClick={() => navigate(-1)}
      >
        <span>Back</span>
        <AiOutlineRollback />
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {renderUser()}
      </div>
    </div>
  );
};

export default User;
