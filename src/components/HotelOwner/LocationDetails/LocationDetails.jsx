import React, { useEffect, useState } from "react";
import NiceSelect from "../../NiceSelect/NiceSelect";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import addressData from "../../../data/vietnamAddress.json";
import { locationHotelschema } from "../../../schemas/validationSchemas";

function LocationDetails({ setLocation, onNext }) {
    const [districtOptions, setDistrictOptions] = useState([]);
    const [wardOptions, setWardOptions] = useState([]);

    const {
        control,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(locationHotelschema),
        defaultValues: {
            location: "",
            province: null,
            district: null,
            ward: null,
        },
    });

    const selectedProvince = watch("province");
    const selectedDistrict = watch("district");

    // Cập nhật danh sách quận/huyện khi chọn tỉnh/thành
    useEffect(() => {
        if (selectedProvince) {
            const province = addressData.find(
                (p) => p.Id === selectedProvince.value
            );
            setDistrictOptions(
                province?.Districts.map((district) => ({
                    value: district.Id,
                    label: district.Name,
                })) || []
            );
            setWardOptions([]); // Reset ward khi đổi tỉnh/thành
        } else {
            setDistrictOptions([]);
        }
    }, [selectedProvince]);

    // Cập nhật danh sách phường/xã khi chọn quận/huyện
    useEffect(() => {
        if (selectedDistrict) {
            const district = addressData
                .find((p) => p.Id === selectedProvince.value)
                ?.Districts.find((d) => d.Id === selectedDistrict.value);
            setWardOptions(
                district?.Wards.map((ward) => ({
                    value: ward.Id,
                    label: ward.Name,
                })) || []
            );
        } else {
            setWardOptions([]);
        }
    }, [selectedDistrict]);

    // Xử lý khi submit form
    const onSubmit = (data) => {
        // Tạo chuỗi với các giá trị nối với nhau bởi dấu phẩy
        const combinedLocation = [
            data.location,
            data.ward?.label,
            data.district?.label,
            data.province?.label,
        ]
            .filter(Boolean) // Loại bỏ các giá trị null hoặc undefined
            .join(", "); // Nối các phần tử thành chuỗi với dấu phẩy

        setLocation(combinedLocation); // Lưu chuỗi vào state setLocation

        onNext(); // Chuyển sang bước tiếp theo
    };

    return (
        <div className="dashboard-profile-tab-content">
            <div className="account-details-tab-content">
                <div className="account-tab-content-title">
                    <h4>Vị trí chi tiết</h4>
                    <p>
                        Nhập thông tin vị trí và mô tả chi tiết về khách sạn của
                        bạn.
                    </p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row mb-30">
                        {/* Địa chỉ khách sạn */}
                        <div className="form-inner mb-30">
                            <label>Địa chỉ khách sạn*</label>
                            <Controller
                                name="location"
                                control={control}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type="text"
                                        placeholder="Nhập địa chỉ cụ thể của khách sạn..."
                                        className="form-control"
                                    />
                                )}
                            />
                            {errors.location && (
                                <p className="error-message">
                                    {errors.location.message}
                                </p>
                            )}
                        </div>

                        {/* Chọn Tỉnh/Thành phố */}
                        <div className="col-6 mb-30">
                            <div className="form-inner mb-30">
                                <label>Tỉnh/Thành phố*</label>
                                <Controller
                                    name="province"
                                    control={control}
                                    render={({ field }) => (
                                        <NiceSelect
                                            options={addressData.map(
                                                (province) => ({
                                                    value: province.Id,
                                                    label: province.Name,
                                                })
                                            )}
                                            value={field.value}
                                            onChange={(option) =>
                                                field.onChange(option)
                                            }
                                            placeholder="Chọn tỉnh/thành phố"
                                        />
                                    )}
                                />
                                {errors.province && (
                                    <p className="error-message">
                                        {errors.province.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Chọn Quận/Huyện */}
                        <div className="col-6 mb-30">
                            <div className="form-inner mb-30">
                                <label>Quận/Huyện*</label>
                                <Controller
                                    name="district"
                                    control={control}
                                    render={({ field }) => (
                                        <NiceSelect
                                            options={districtOptions}
                                            value={field.value}
                                            onChange={(option) =>
                                                field.onChange(option)
                                            }
                                            isDisabled={!selectedProvince}
                                            placeholder="Chọn quận/huyện"
                                        />
                                    )}
                                />
                                {errors.district && (
                                    <p className="error-message">
                                        {errors.district.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Chọn Phường/Xã */}
                        <div className="col-6 mb-30">
                            <div className="form-inner mb-30">
                                <label>Phường/Xã*</label>
                                <Controller
                                    name="ward"
                                    control={control}
                                    render={({ field }) => (
                                        <NiceSelect
                                            options={wardOptions}
                                            value={field.value}
                                            onChange={(option) =>
                                                field.onChange(option)
                                            }
                                            isDisabled={!selectedDistrict}
                                            placeholder="Chọn phường/xã"
                                        />
                                    )}
                                />
                                {errors.ward && (
                                    <p className="error-message">
                                        {errors.ward.message}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Nút Tiếp theo */}
                    <button type="submit" className="primary-btn3">
                        Tiếp theo
                    </button>
                </form>
            </div>
        </div>
    );
}

export default LocationDetails;
