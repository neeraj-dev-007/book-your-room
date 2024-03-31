import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForms";

const HotelGuestsSection = () => {
    
    const { register, formState: { errors } } = useFormContext<HotelFormData>();

    return (
        <div>
            <h2 className="text-2xl font-bold mb-3">
                Guests
            </h2>
            <div className="flex flex-row gap-5 bg-blue-600 py-5 px-5">
                <label className="text-white text-sm font-bold flex-1">
                    Adults
                    <input className="border rounded w-full py-1 px-2 font-normal text-gray-700" type="number" min={1}
                    {...register("adultCount", {required: "This field is required"})}>
                    </input>
                    {errors.adultCount && (
                        <span className="text-red-700 text-sm font-bold">{errors.adultCount.message}</span>
                    )}
                </label>
                <label className="text-white text-sm font-bold flex-1">
                    Children
                    <input className="border rounded w-full py-1 px-2 font-normal text-gray-700" type="number" min={0}
                    {...register("childCount", {required: "This field is required"})}>
                    </input>
                    {errors.childCount && (
                        <span className="text-red-700 text-sm font-bold">{errors.childCount.message}</span>
                    )}
                </label>
            </div>
        </div>
    );
};

export default HotelGuestsSection;