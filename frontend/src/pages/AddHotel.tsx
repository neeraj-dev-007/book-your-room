import { useMutation } from "react-query";
import ManageHotelForm from "../forms/ManageHotelForms/ManageHotelForms";
import * as apiClient from "../api-client";
import { useAppContext } from "../context/AppContext";


const AddHotel  = () => {
    const { showToast } = useAppContext();
    
    const { mutate, isLoading } = useMutation(apiClient.addHotel, {
        onSuccess: () => {
            showToast({message: "Added New Hotel", type:"SUCCESS"});
        },
        onError: () => {
            showToast({message: "Error Adding Hotel", type:"ERROR"});
        }
    });

    const handleSave = (hotelFormData: FormData) => {
        mutate(hotelFormData);
    }
    
    return (
        <ManageHotelForm onSave={handleSave} isLoading={isLoading}/>
    );
};

export default AddHotel;