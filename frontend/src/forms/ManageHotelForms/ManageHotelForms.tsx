import { FormProvider, useForm } from "react-hook-form";
import HotelDetailsSection from "./HotelDetailsSection";
import HotelTypesSection from "./HotelTypesSection";
import HotelFacilitiesSection from "./HotelFacilitiesSection";
import HotelGuestsSection from "./HotelGuestsSection";
import HotelImagesSection from "./HotelImagesSection";

export type HotelFormData = {
    name: string;
    city: string;
    country: string;
    description: string;
    pricePerNight: number;
    starRating: number;
    type: string;
    adultCount: number;
    childCount: number;
    facilities: string[];
    imageFiles: FileList;
}

type Props = {
    onSave: (hotelFormData: FormData) => void
    isLoading: boolean
}

const ManageHotelForm = ({onSave, isLoading}: Props) => {
    
    //Instead of desctructuring form methods like register, handleSubmit - we are using formMethods as we need to pass that to our
    //children form components. we don't have 1 full form instead we will have a component for hotel description, images, hotel type,
    //child and adult count, facilities offered. so it's necessary to wrap these components in FormProvider tag. 
    const formMethods = useForm<HotelFormData>();
    const { handleSubmit } = formMethods;

    //https://www.geeksforgeeks.org/how-to-use-backticks-in-javascript/
    const onSubmit = handleSubmit((data: HotelFormData) => {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("city", data.city);
        formData.append("country", data.country);
        formData.append("description", data.description);
        formData.append("type", data.type);
        formData.append("pricePerNight", data.pricePerNight.toString());
        formData.append("starRating", data.starRating.toString());
        formData.append("adultCount", data.adultCount.toString());
        formData.append("childCount", data.childCount.toString());
        
        data.facilities.forEach((facility, index) => {
            formData.append(`facilities[${index}]`, facility)
        })
        //converting imageFiles from fileList to Array 
        Array.from(data.imageFiles).forEach((imageFile) => {
            formData.append(`imageFiles`, imageFile);
        })

        onSave(formData);
    });

    return (
        <FormProvider {...formMethods}>
            <form className="flex flex-col gap-10" onSubmit={ onSubmit }>
                <HotelDetailsSection />
                <HotelTypesSection />
                <HotelFacilitiesSection />
                <HotelGuestsSection />
                <HotelImagesSection />  
                <span className="flex justify-end">
                    <button disabled={isLoading} type='submit' 
                    className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl disabled:bg-gray-500">
                        {isLoading ? "Saving...": "Save"}
                    </button>
                </span>
            </form>
        </FormProvider>
    );
};

export default ManageHotelForm;