import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForms";

const HotelDetailsSection = () => {
    const { register, formState: {errors} } = useFormContext<HotelFormData>();

    return (
        <div className="flex flex-col gap-5" >   
            <h2 className="text-3xl font-bold">
                Add Hotel Details
            </h2>
            {/* If you include the input tag in the label tag, you don't need to use the 'for' attribute. */}
            <label className="text-gray-700 text-sm font-bold flex-1">
                Name
                <input className="border rounded w-full py-1 px-2 font-normal" 
                {...register("name", {required: "This field is required"})}>
                </input>
                {errors.name && (
                    <span className="text-red-500">{errors.name.message}</span>
                )}
            </label>
            <div className="flex flex-row gap-5">
                <label className="text-gray-700 text-sm font-bold flex-1">
                    City
                    <input className="border rounded w-full py-1 px-2 font-normal" 
                    {...register("city", {required: "This field is required"})}>
                    </input>
                    {errors.city && (
                        <span className="text-red-500">{errors.city.message}</span>
                    )}
                </label>
                <label className="text-gray-700 text-sm font-bold flex-1">
                    Country
                    <input className="border rounded w-full py-1 px-2 font-normal" 
                    {...register("country", {required: "This field is required"})}>
                    </input>
                    {errors.country && (
                        <span className="text-red-500">{errors.country.message}</span>
                    )}
                </label>
            </div>
            <label className="text-gray-700 text-sm font-bold flex-1">
                Description (500 words only)
                <textarea className="border rounded w-full py-1 px-2 font-normal" rows ={10} 
                {...register("description", {required: "This field is required"})}>
                </textarea>
                {errors.description && (
                    <span className="text-red-500">{errors.description.message}</span>
                )}
            </label>
            <label className="text-gray-700 text-sm font-bold max-w-[50%]">
                Price per Night
                <input className="border rounded w-full py-1 px-2 font-normal" type="number" min={1}
                {...register("pricePerNight", {required: "This field is required"})}>
                </input>
                {errors.pricePerNight && (
                    <span className="text-red-500">{errors.pricePerNight.message}</span>
                )}
            </label>
            <label className="text-gray-700 text-sm font-bold max-w-[50%]">
                Star Rating
                <select className="border rounded w-full py-1 px-2 font-normal" {...register("starRating", {required: "This field is required"})}>
                    <option className="text-sm font-bold" value="">
                        Select Rating
                    </option>
                    {[1,2,3,4,5].map((num)=> (
                        <option value={num}>{num}</option>
                    ))}
                </select>
                {errors.starRating && (
                    <span className="text-red-500">{errors.starRating.message}</span>
                )}
            </label>
        </div>
    );
};

export default HotelDetailsSection;