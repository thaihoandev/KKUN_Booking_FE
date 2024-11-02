export const getRatingDescription = (rating) => {
    const ratingOutOf10 = convertRating5To10Scale(rating);

    if (ratingOutOf10 >= 9) {
        return "Tuyệt vời";
    } else if (ratingOutOf10 >= 7) {
        return "Tốt";
    } else if (ratingOutOf10 >= 5) {
        return "Trung bình";
    } else if (ratingOutOf10 >= 3) {
        return "Kém";
    } else if (ratingOutOf10 === 0 || ratingOutOf10 === null) {
        return "Chưa có đánh giá";
    } else {
        return "Rất kém";
    }
};

export const convertRating5To10Scale = (rating) => {
    if (rating > 5) {
        return parseFloat(rating.toFixed(2)); // giữ nguyên rating nếu > 5 và làm tròn 2 chữ số thập phân
    } else {
        return parseFloat((rating * 2).toFixed(2)); // chuyển thang điểm từ 5 sang 10 và làm tròn 2 chữ số thập phân
    }
};
