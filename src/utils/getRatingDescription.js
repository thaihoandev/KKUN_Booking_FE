const getRatingDescription = (rating) => {
    if (rating >= 4.5) {
        return "Tuyệt vời";
    } else if (rating >= 3.5) {
        return "Tốt";
    } else if (rating >= 2.5) {
        return "Trung bình";
    } else if (rating >= 1.5) {
        return "Kém";
    } else if (rating === 0 || rating === null) {
        return "Chưa có đánh giá";
    } else {
        return "Rất kém";
    }
};
export default getRatingDescription;
