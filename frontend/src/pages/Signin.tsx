import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { useForm } from "react-hook-form";
import * as apiClient from "../api-client";
import { useMutation, useQueryClient } from "react-query";

export type SignInFormData = {
    email: string;
    password: string;
}

//https://medium.com/@mitchelldalehein25/react-query-usemutation-hook-2603f103f9a3 - to understand useMutation() hook.

const Signin = () => {

    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { showToast } = useAppContext();
    
    const { register, handleSubmit, formState: { errors } } = useForm<SignInFormData>();

    const mutation = useMutation(apiClient.signIn, {
        onSuccess: async () => {
            //running validateToken query to change buttons to display
            await queryClient.invalidateQueries("validateToken");
            showToast({message:"Sign In Successful", type:"SUCCESS"});
            navigate("/");
        },
        onError: (error: Error) => {
            showToast({message:error.message, type:"ERROR"});
        }
    })

    const onSubmit = handleSubmit((data) => {
        mutation.mutate(data);
    })
    
    return (
        <form className="flex flex-col gap-5" onSubmit={onSubmit}>
            <h2 className="text-3xl font-bold">
                Please Enter your Credentials!
            </h2>
            <label className="text-gray-700 text-sm font-bold flex-1">
                Email
                <input type="email" className="border rounded w-full py-1 px-2 font-normal"
                    {...register("email", {required: "This field is required"})}>
                </input>
                {errors.email && (
                        <span className="text-red-500">{errors.email.message}</span>
                )}
            </label>
            <label className="text-gray-700 text-sm font-bold flex-1">
                Password
                <input type="password" className="border rounded w-full py-1 px-2 font-normal"
                    {...register("password", {required: "This field is required", minLength:{value:6, message:"Password must be atleast 6 characters"}})}>
                </input>
                {errors.password && (
                        <span className="text-red-500">{errors.password.message}</span>
                )}
            </label>
            <div className="flex flex-row items-center justify-between">
                <span>
                    Not Registered? <Link to="/register" className="underline">Create an Account here</Link> 
                </span>
                <button type="submit" className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl">
                    Sign In
                </button>
            </div>
            
        </form>
    );
}

export default Signin; 