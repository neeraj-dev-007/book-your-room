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

const ManageHotelForm = () => {
    
    //Instead of desctructuring form methods like register, handleSubmit - we are using formMethods as we need to pass that to our
    //children form components. we don't have 1 full form instead we will have a component for hotel description, images, hotel type,
    //child and adult count, facilities offered. so it's necessary to wrap these components in FormProvider tag. 
    const formMethods = useForm<HotelFormData>();
    const { handleSubmit } = formMethods;

    const onSubmit = handleSubmit((data: HotelFormData) => {
        console.log(data);
    })

    return (
        <FormProvider {...formMethods}>
            <form className="flex flex-col gap-10" onSubmit={ onSubmit }>
                <HotelDetailsSection />
                <HotelTypesSection />
                <HotelFacilitiesSection />
                <HotelGuestsSection />
                <HotelImagesSection />  
                <span className="flex justify-end">
                    <button type='submit' className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl">
                        Save
                    </button>
                </span>
            </form>
        </FormProvider>
    );
};

export default ManageHotelForm;