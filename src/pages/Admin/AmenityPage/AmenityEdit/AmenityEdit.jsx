import React, { useState, useEffect } from "react";
import NiceSelect from "../../../../components/NiceSelect/NiceSelect";
import * as AmenityService from "../../../../services/AmenityService";
import { useMutation } from "react-query";
import { toast, ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import { amenityEditFormSchema } from "../../../../schemas/validationSchemas";
import { useNavigate, useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import * as yup from "yup";

function AmenityEdit() {

    const { t } = useTranslation();
    const { amenityId } = useParams();
    const [amenities, setAmenities] = useState([]);
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
        control,
    } = useForm({
        resolver: yupResolver(amenityEditFormSchema),
    });

    const mutationAmenityType = useMutation(
        (accessToken) => AmenityService.getAllAmenityType(accessToken),
        {
            onSuccess: (data) => {
                setAmenities(data);
            },
            onError: (error) => {
                toast.error(error.message || t("amenityEdit.errorMessage"));
            },
        }
    );

    const mutationAmenityById = useMutation(
        ({ amenityId, accessToken }) =>
            AmenityService.getAmenityById(amenityId, accessToken),
        {
            onSuccess: (data) => {
                reset({
                    name: data.name,
                    description: data.description,
                    amenityType: data.amenityType,
                });
            },
            onError: (error) => {
                toast.error(error.message || t("amenityEdit.errorMessage"));
            },
        }
    );

    const mutationUpdateAmenity = useMutation(
        ({ amenityId, data, accessToken }) =>
            AmenityService.updateAmenity(amenityId, data, accessToken),
        {
            onSuccess: () => {
                toast.success(t("amenityEdit.successMessage"));
                setTimeout(() => {
                    navigate("/admin/amenities");
                }, 1000);
            },
            onError: (error) => {
                toast.error(error.message || t("amenityEdit.errorMessage"));
            },
        }
    );

    useEffect(() => {
        mutationAmenityType.mutate(user.accessToken);
        mutationAmenityById.mutate({
            amenityId,
            accessToken: user.accessToken,
        });
    }, [user.accessToken, amenityId]);

    const onSubmit = (data) => {
        mutationUpdateAmenity.mutate({
            amenityId,
            data,
            accessToken: user.accessToken,
        });
    };

    return (
        <>
            <ToastContainer />
            <div className="row">
                <div className="col-xl-12">
                    <div className="main-content-title-profile mb-50">
                        <div className="main-content-title">
                        <h3>{t("amenityEdit.title")}</h3>
                        </div>
                    </div>
                    <div className="dashboard-profile-wrapper two">
                        <div className="dashboard-profile-tab-content">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-inner mb-30">
                                        <label>{t("amenityEdit.nameLabel")}</label>
                                        <input
                                                type="text"
                                                placeholder="Tên tiện ích..."
                                                {...register("name")}
                                            />
                                            {errors.name && (
                                                <small className="text-danger">
                                                    {errors.name.message}
                                                </small>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-30">
                                        <div className="form-inner">
                                        <label>{t("amenityEdit.typeLabel")}</label>
                                        <Controller
                                                control={control}
                                                name="amenityType"
                                                render={({ field }) => (
                                                    <NiceSelect
                                                        options={amenities}
                                                        value={amenities.find(
                                                            (option) =>
                                                                option.value ===
                                                                field.value
                                                        )}
                                                        onChange={(selected) =>
                                                            field.onChange(
                                                                selected.value
                                                            )
                                                        }
                                                    />
                                                )}
                                            />
                                            {errors.amenityType && (
                                                <small className="text-danger">
                                                    {errors.amenityType.message}
                                                </small>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-md-12 mb-30">
                                        <div className="form-inner">
                                        <label>{t("amenityEdit.descriptionLabel")}</label>
                                        <textarea
                                                placeholder={t(
                                                    "amenityEdit.descriptionPlaceholder"
                                                )}
                                                {...register("description")}
                                            ></textarea>
                                            {errors.description && (
                                                <small className="text-danger">
                                                    {errors.description.message}
                                                </small>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="form-inner">
                                    <button
                                        type="submit"
                                        className="primary-btn3"
                                    >
                                         {t("amenityEdit.updateButton")}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AmenityEdit;
