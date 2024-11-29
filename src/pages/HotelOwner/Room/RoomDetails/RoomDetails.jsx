import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import * as RoomService from "../../../../services/RoomService";
import { toast } from "react-toastify";
import convertToVND from "../../../../utils/convertToVND";

function RoomDetails() {
    const { roomId } = useParams();
    const [roomDetail, setRoomDetail] = useState(null);
    const navigate = useNavigate();

    const mutationRoomDetail = useMutation(
        () => RoomService.getRoomById(roomId),
        {
            onSuccess: (data) => setRoomDetail(data),
            onError: (error) =>
                toast.error(error.message || "Lỗi khi tải dữ liệu phòng."),
        }
    );

    useEffect(() => {
        mutationRoomDetail.mutate();
    }, [roomId]);

    if (!roomDetail) {
        return <p>Đang tải thông tin phòng...</p>;
    }

    //const displayImages = roomDetail.roomImages.slice(0, 5);
    const displayImages = roomDetail.roomImages || []; // Chỉ lấy ảnh hiện có

    while (displayImages.length < 5) {
        displayImages.push("assets/img/placeholder.jpg"); // Thêm ảnh placeholder nếu thiếu ảnh
    }

    // giải điịnh dữ liệu đánh giá phòng
    const reviews = [
        {
            name: "Nguyễn Văn A",
            date: "2023-11-20",
            rating: 4.5,
            comment: "Phòng rất sạch sẽ và tiện nghi.",
            details: {
                cleanliness: 4.5,
                location: 5,
                service: 4.5,
                facilities: 4,
                valueForMoney: 4.5,
            },
        },
        {
            name: "Lê Thị B",
            date: "2023-11-18",
            rating: 4,
            comment: "Dịch vụ ổn nhưng giá hơi cao.",
            details: {
                cleanliness: 4,
                location: 4,
                service: 4,
                facilities: 4,
                valueForMoney: 3.5,
            },
        },
    ];

    return (
        <div className="package-details-area position-relative">
            {/* <div className="booking-form-wrap"> */}
            <button className="primary-btn3 mb-30" onClick={() => navigate(-1)}>
                Trở lại
            </button>

            <div className="row">
                <div className="col-xl-8">
                    <div class="package-img-group mb-50">
                        <div className="row align-items-center g-3">
                            {/* Kiểm tra nếu có ít nhất 1 ảnh */}
                            {displayImages.length > 0 && (
                                <>
                                    {/* Ảnh chính */}
                                    <div className="col-lg-12">
                                        <div className="gallery-img-wrap">
                                            <img
                                                src={displayImages[0]} // Ảnh đầu tiên
                                                alt="Room main view"
                                                className="img-fluid rounded"
                                            />
                                            <a
                                                data-fancybox="gallery-01"
                                                href={displayImages[0]}
                                            >
                                                <i className="bi bi-eye"></i>{" "}
                                                Xem ảnh
                                            </a>
                                        </div>
                                    </div>

                                    {/* Ảnh phụ */}
                                    {displayImages.length > 1 && (
                                        <div className="col-lg-12">
                                            <div className="row g-3">
                                                {/* Lọc và giới hạn hiển thị tối đa 4 ảnh phụ */}
                                                {displayImages
                                                    .slice(1, 3) // Lấy từ ảnh thứ 2 đến tối đa ảnh thứ 5
                                                    .filter((img) => img) // Loại bỏ ảnh rỗng/undefined
                                                    .map((img, index) => (
                                                        <div
                                                            className="col-6"
                                                            key={index}
                                                        >
                                                            <div className="gallery-img-wrap">
                                                                <img
                                                                    src={img}
                                                                    alt={`Room view ${
                                                                        index +
                                                                        2
                                                                    }`}
                                                                    className="img-fluid rounded"
                                                                />
                                                                <a
                                                                    data-fancybox="gallery-01"
                                                                    href={img}
                                                                >
                                                                    <i className="bi bi-eye"></i>{" "}
                                                                    Xem ảnh
                                                                </a>
                                                            </div>
                                                        </div>
                                                    ))}
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>

                    {/* Đáng giá */}
                    <div className="review-wrapper mt-70">
                        <h4>Đánh Giá Khách Hàng</h4>
                        <div className="row">
                            <div className="review-box border-3 col-12">
                                {/* Tổng điểm đánh giá */}
                                <div className="total-review">
                                    <h2>
                                        {(
                                            reviews.reduce(
                                                (acc, cur) => acc + cur.rating,
                                                0
                                            ) / reviews.length
                                        ).toFixed(1)}
                                    </h2>
                                    <div className="review-wrap">
                                        <ul className="star-list">
                                            {[...Array(5)].map((_, index) => (
                                                <li key={index}>
                                                    <i
                                                        className={
                                                            index <
                                                            Math.round(
                                                                reviews.reduce(
                                                                    (
                                                                        acc,
                                                                        cur
                                                                    ) =>
                                                                        acc +
                                                                        cur.rating,
                                                                    0
                                                                ) /
                                                                    reviews.length
                                                            )
                                                                ? "bi bi-star-fill"
                                                                : "bi bi-star"
                                                        }
                                                    ></i>
                                                </li>
                                            ))}
                                        </ul>
                                        <span>{reviews.length} Reviews</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Danh sách đánh giá */}
                        <div className="row">
                            <div className="review-area">
                                <ul className="comment">
                                    {reviews.map((review, index) => (
                                        <li key={index}>
                                            <div className="single-comment-area">
                                                <div className="author-img">
                                                    <img
                                                        src="assets/img/innerpage/comment-author-01.jpg" // Bạn có thể thêm ảnh động
                                                        alt="Reviewer Avatar"
                                                    />
                                                </div>
                                                <div className="comment-content">
                                                    <div className="author-name-deg">
                                                        <h6>{review.name}</h6>
                                                        <span>
                                                            {new Date(
                                                                review.date
                                                            ).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                    {/* Bình luận */}
                                                    <ul className="review-item-list">
                                                        {Object.entries(
                                                            review.details
                                                        ).map(
                                                            ([key, value]) => (
                                                                <li key={key}>
                                                                    <span>
                                                                        {key
                                                                            .charAt(
                                                                                0
                                                                            )
                                                                            .toUpperCase() +
                                                                            key.slice(
                                                                                1
                                                                            )}
                                                                    </span>
                                                                    <ul className="star-list">
                                                                        {[
                                                                            ...Array(
                                                                                5
                                                                            ),
                                                                        ].map(
                                                                            (
                                                                                _,
                                                                                i
                                                                            ) => (
                                                                                <li
                                                                                    key={
                                                                                        i
                                                                                    }
                                                                                >
                                                                                    <i
                                                                                        className={
                                                                                            i <
                                                                                            Math.round(
                                                                                                value
                                                                                            )
                                                                                                ? "bi bi-star-fill"
                                                                                                : "bi bi-star"
                                                                                        }
                                                                                    ></i>
                                                                                </li>
                                                                            )
                                                                        )}
                                                                    </ul>
                                                                </li>
                                                            )
                                                        )}
                                                    </ul>
                                                    <p>{review.comment}</p>
                                                    <div className="replay-btn">
                                                        <i className="bi bi-reply"></i>{" "}
                                                        Reply
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Thông tin phòng */}
                <div className="col-xl-4">
                    <div
                        className="booking-form-wrap p-4"
                        style={{
                            backgroundColor: "#ffffff",
                            borderRadius: "8px",
                            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                        }}
                    >
                        <h4 style={{ marginBottom: "20px" }}>
                            Thông Tin Phòng
                        </h4>
                        <div
                            className="row room-details p-3"
                            style={{
                                backgroundColor: "#f8f9fa",
                                borderRadius: "8px",
                                marginTop: "10px",
                            }}
                        >
                            <div className="col-6">
                                <ul className="list-unstyled">
                                    <li>
                                        <strong>Loại phòng:</strong>{" "}
                                        {roomDetail.typeDisplayName}
                                    </li>
                                    <li>
                                        <strong>Giá gốc:</strong>{" "}
                                        {convertToVND(roomDetail.basePrice)}
                                    </li>
                                    <li>
                                        <strong>Diện tích:</strong>{" "}
                                        {roomDetail.area} m²
                                    </li>
                                    <li>
                                        <strong>Trạng thái:</strong>
                                        <i
                                            className=""
                                            style={{
                                                marginLeft: "10px",
                                                color: roomDetail.available
                                                    ? "#28a745"
                                                    : "#dc3545", // Màu xanh nếu còn phòng, màu đỏ nếu hết phòng
                                                fontWeight: "bold",
                                            }}
                                        >
                                            {roomDetail.available
                                                ? "Còn phòng"
                                                : "Hết phòng"}
                                        </i>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-6">
                                <ul className="list-unstyled">
                                    <li>
                                        <strong>Loại giường:</strong>{" "}
                                        {roomDetail.bedType}
                                    </li>
                                    <li>
                                        <strong>Giá giảm:</strong>{" "}
                                        {convertToVND(
                                            roomDetail.discountedPrice
                                        )}
                                    </li>
                                    <li>
                                        <strong>Số người tối đa:</strong>{" "}
                                        {roomDetail.capacity} người
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="room-amenities mt-4">
                            <h5>Tiện ích:</h5>
                            <div
                                className="p-3"
                                style={{
                                    backgroundColor: "#f8f9fa",
                                    borderRadius: "8px",
                                    marginTop: "10px",
                                }}
                            >
                                <ul className="list-unstyled">
                                    {roomDetail.amenities.map(
                                        (amenity, index) => (
                                            <li
                                                key={index}
                                                style={{ marginBottom: "8px" }}
                                            >
                                                <i
                                                    className="bi bi-check-circle"
                                                    style={{
                                                        marginRight: "10px",
                                                        color: "#28a745",
                                                    }}
                                                ></i>
                                                {amenity.name}
                                            </li>
                                        )
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RoomDetails;
