import axios from "axios";

export const axiosJWT = axios.create();

export const searchHotels = async (data) => {
    try {
        // Construct query parameters from filter data
        const params = new URLSearchParams();

        // Add each filter criteria if it exists
        if (data.location) params.append("location", data.location);
        if (data.checkInDate) params.append("checkInDate", data.checkInDate);
        if (data.checkOutDate) params.append("checkOutDate", data.checkOutDate);
        if (data.guests) params.append("guests", data.guests);
        if (data.minPrice) params.append("minPrice", data.minPrice);
        if (data.maxPrice) params.append("maxPrice", data.maxPrice);
        if (data.amenities)
            data.amenities.forEach((amenity) =>
                params.append("amenities", amenity)
            );
        if (data.rating != null) params.append("rating", data.rating); // Only add if rating is not null

        if (data.freeCancellation !== undefined)
            params.append("freeCancellation", data.freeCancellation);
        if (data.breakfastIncluded !== undefined)
            params.append("breakfastIncluded", data.breakfastIncluded);
        if (data.prePayment !== undefined)
            params.append("prePayment", data.prePayment);

        // Log the data and query parameters
        console.log("Data being sent to the API:", data);
        console.log("Query parameters:", params.toString());

        const response = await axios.get(
            `${process.env.REACT_APP_BASE_API_URL}/search/hotels`,
            { params } // Pass the constructed query parameters
        );
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data);
        } else {
            throw new Error("Đã xảy ra lỗi khi kết nối tới máy chủ.");
        }
    }
};
