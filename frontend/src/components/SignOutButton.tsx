import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const SignOutButton = () => {

    const queryClient = useQueryClient();
    const navigate  = useNavigate();

    const { showToast } = useAppContext();

    const mutation = useMutation(apiClient.logOut, {
        onSuccess: async () => {
            //running validateToken query to change buttons to display
            await queryClient.invalidateQueries("validateToken");
            showToast({message:"Signed Out", type:"SUCCESS"});
            navigate("/");
        },
        onError: ( error: Error) => {
            showToast({message:error.message, type:"ERROR"});
        }
    });
    
    const onClick = () => {
        mutation.mutate();
    }

    return (
        <button className="text-blue-600 px-3 font-bold bg-white hover:bg-gray-100" onClick={onClick}>
            Sign Out
        </button>
    );
}

export default SignOutButton;