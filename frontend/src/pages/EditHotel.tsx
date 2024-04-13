import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import ManageHotelForm from "../forms/ManageHotelForms/ManageHotelForms";
import { useAppContext } from "../context/AppContext";

const EditHotel = () => {
    const { showToast } = useAppContext();

    const { hotelId } = useParams();
    const { data: hotel } = useQuery("fetchMyHotel", () => apiClient.fetchMyHotel(hotelId || ""), {
        enabled: !!hotelId,
        }
    );

    const { mutate, isLoading } = useMutation(apiClient.updateMyHotel, {
        onSuccess: () => {
            showToast({message: "Updated Hotel", type:"SUCCESS"});
        },
        onError: () => {
            showToast({message: "Error Updating Hotel", type:"ERROR"});
        }
    });

    const handleSave = (hotelFormData: FormData) => {
        mutate(hotelFormData);
    }


    return (
        <ManageHotelForm hotel={hotel} onSave={handleSave} isLoading={isLoading}/>
    );
};

export default EditHotel;