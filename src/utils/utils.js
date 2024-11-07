import moment from "moment";
export const isJsonString = (data) => {
    try {
        JSON.parse(data);
    } catch (error) {
        return false;
    }

    return true;
};

export const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

export const calculateNumberOfNights = (checkInDateStr, checkOutDateStr) => {
    const checkInDate = checkInDateStr ? moment(checkInDateStr) : null;
    const checkOutDate = checkOutDateStr ? moment(checkOutDateStr) : null;

    if (checkInDate && checkOutDate) {
        const diffDays = checkOutDate.diff(checkInDate, "days");
        return diffDays + (checkOutDate.isAfter(checkInDate, "day") ? 1 : 0);
    }
    return 0;
};

export const formatDateDDMMYYYY = (formatDate) => {
    return moment(formatDate).format("DD/MM/YYYY");
};
