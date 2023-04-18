import { useState } from "react";
import { signIn } from "../reducers/authSlice";
import { useAppDispatch } from "../reducers/hooks";
import { useNavigate } from "react-router-dom";

const SignInPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await dispatch(signIn({ username, password }));
    if (signIn.fulfilled.match(res)) {
      navigate("/products");
    } else {
      //error
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-md shadow-md">
        <h1 className="text-2xl font-semibold mb-4">Sign In</h1>
        <form onSubmit={handleSignIn}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-500 text-white font-medium rounded-md"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;
