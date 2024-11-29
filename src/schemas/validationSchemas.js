// schemas/validationSchemas.js
import * as yup from "yup";
import i18n from "../i18n";

export const loginSchema = yup.object().shape({
    email: yup
        .string()
        .required(i18n.t("validation.required", { field: i18n.t("email") }))
        .email(i18n.t("validation.email")),

    password: yup
        .string()
        .required(i18n.t("validation.required", { field: i18n.t("password") }))
        .min(
            8,
            i18n.t("validation.minLength", {
                field: i18n.t("password"),
                min: 8,
            })
        )
        .max(
            50,
            i18n.t("validation.maxLength", {
                field: i18n.t("password"),
                max: 50,
            })
        )
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
            i18n.t("validation.password")
        ),
});

// Register schema
export const registerSchema = yup.object().shape({
    firstName: yup
        .string()
        .required(i18n.t("validation.required", { field: i18n.t("firstName") }))
        .min(
            2,
            i18n.t("validation.minLength", {
                field: i18n.t("firstName"),
                min: 2,
            })
        )
        .max(
            50,
            i18n.t("validation.maxLength", {
                field: i18n.t("firstName"),
                max: 50,
            })
        )
        .matches(
            /^[a-zA-ZÀ-ỹ\s]*$/,
            i18n.t("validation.required", { field: i18n.t("firstName") })
        ),

    lastName: yup
        .string()
        .required(i18n.t("validation.required", { field: i18n.t("lastName") }))
        .min(
            2,
            i18n.t("validation.minLength", {
                field: i18n.t("lastName"),
                min: 2,
            })
        )
        .max(
            50,
            i18n.t("validation.maxLength", {
                field: i18n.t("lastName"),
                max: 50,
            })
        )
        .matches(
            /^[a-zA-ZÀ-ỹ\s]*$/,
            i18n.t("validation.required", { field: i18n.t("lastName") })
        ),

    email: yup
        .string()
        .required(i18n.t("validation.required", { field: i18n.t("email") }))
        .email(i18n.t("validation.email"))
        .max(
            255,
            i18n.t("validation.maxLength", { field: i18n.t("email"), max: 255 })
        ),

    password: yup
        .string()
        .required(i18n.t("validation.required", { field: i18n.t("password") }))
        .min(
            8,
            i18n.t("validation.minLength", {
                field: i18n.t("password"),
                min: 8,
            })
        )
        .max(
            50,
            i18n.t("validation.maxLength", {
                field: i18n.t("password"),
                max: 50,
            })
        )
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
            i18n.t("validation.password")
        ),

    rePassword: yup
        .string()
        .required(
            i18n.t("validation.required", { field: i18n.t("confirmPassword") })
        )
        .oneOf([yup.ref("password")], i18n.t("validation.match")),
});

// Hotel Owner registration schema
export const registerHotelOwnerSchema = yup.object().shape({
    firstName: yup
        .string()
        .required(i18n.t("validation.required", { field: i18n.t("firstName") }))
        .min(
            2,
            i18n.t("validation.minLength", {
                field: i18n.t("firstName"),
                min: 2,
            })
        )
        .max(
            50,
            i18n.t("validation.maxLength", {
                field: i18n.t("firstName"),
                max: 50,
            })
        )
        .matches(
            /^[a-zA-ZÀ-ỹ\s]*$/,
            i18n.t("validation.required", { field: i18n.t("firstName") })
        ),

    lastName: yup
        .string()
        .required(i18n.t("validation.required", { field: i18n.t("lastName") }))
        .min(
            2,
            i18n.t("validation.minLength", {
                field: i18n.t("lastName"),
                min: 2,
            })
        )
        .max(
            50,
            i18n.t("validation.maxLength", {
                field: i18n.t("lastName"),
                max: 50,
            })
        )
        .matches(
            /^[a-zA-ZÀ-ỹ\s]*$/,
            i18n.t("validation.required", { field: i18n.t("lastName") })
        ),

    email: yup
        .string()
        .required(i18n.t("validation.required", { field: i18n.t("email") }))
        .email(i18n.t("validation.email"))
        .max(
            255,
            i18n.t("validation.maxLength", { field: i18n.t("email"), max: 255 })
        ),

    password: yup
        .string()
        .required(i18n.t("validation.required", { field: i18n.t("password") }))
        .min(
            8,
            i18n.t("validation.minLength", {
                field: i18n.t("password"),
                min: 8,
            })
        )
        .max(
            50,
            i18n.t("validation.maxLength", {
                field: i18n.t("password"),
                max: 50,
            })
        )
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
            i18n.t("validation.password")
        ),
});

export const changePasswordSchema = yup.object().shape({
    oldPassword: yup.string().when(["$authProvider", "$hasPassword"], {
        is: (authProvider, hasPassword) => {
            return (
                authProvider === "LOCAL" ||
                (authProvider === "GOOGLE" && hasPassword)
            );
        },
        then: () =>
            yup
                .string()
                .required(
                    i18n.t("validation.required", {
                        field: i18n.t("oldPassword"),
                    })
                )
                .min(
                    6,
                    i18n.t("validation.minLength", {
                        field: i18n.t("oldPassword"),
                        min: 6,
                    })
                ),
        otherwise: () => yup.string().optional(),
    }),

    newPassword: yup
        .string()
        .required(
            i18n.t("validation.required", { field: i18n.t("newPassword") })
        )
        .min(
            6,
            i18n.t("validation.minLength", {
                field: i18n.t("newPassword"),
                min: 6,
            })
        )
        .test(
            "not-same-as-old",
            i18n.t("validation.notSameAsOld"),
            function (value) {
                const { authProvider, hasPassword } = this.options.context;
                if (
                    this.parent.oldPassword &&
                    (authProvider === "LOCAL" || hasPassword)
                ) {
                    return value !== this.parent.oldPassword;
                }
                return true;
            }
        ),

    confirmNewPassword: yup
        .string()
        .required(
            i18n.t("validation.required", {
                field: i18n.t("newPasswordConfirm"),
            })
        )
        .oneOf([yup.ref("newPassword")], i18n.t("validation.match")),
});

export const bookingFormSchema = yup.object().shape({
    fullName: yup
        .string()
        .required(i18n.t("validation.required", { field: i18n.t("fullName") }))
        .min(
            2,
            i18n.t("validation.minLength", {
                field: i18n.t("fullName"),
                min: 2,
            })
        ),

    email: yup
        .string()
        .required(i18n.t("validation.required", { field: i18n.t("email") }))
        .email(i18n.t("validation.email")),

    phone: yup
        .string()
        .required(
            i18n.t("validation.required", { field: i18n.t("phoneNumber") })
        )
        .matches(/^[0-9]+$/, i18n.t("validation.phone"))
        .min(
            10,
            i18n.t("validation.minLength", {
                field: i18n.t("phoneNumber"),
                min: 10,
            })
        )
        .max(
            11,
            i18n.t("validation.maxLength", {
                field: i18n.t("phoneNumber"),
                max: 11,
            })
        ),

    notes: yup.string().nullable(),
});

export const paymentFormSchema = yup.object().shape({
    mainPaymentMethod: yup
        .string()
        .required(
            i18n.t("validation.required", { field: i18n.t("paymentMethod") })
        ),

    electronicPaymentOption: yup.string().when("mainPaymentMethod", {
        is: "electronic",
        then: (schema) =>
            schema.required(
                i18n.t("validation.required", {
                    field: i18n.t("ePaymentMethod"),
                })
            ),
        otherwise: (schema) => schema.nullable(),
    }),
});

export const amenityEditFormSchema = yup.object().shape({
    name: yup.string().required(i18n.t("validation.name")),
    description: yup.string().required(i18n.t("validation.description")),
    amenityType: yup.string().required(i18n.t("validation.amenityType")),
});

// Schema validation sử dụng yup

export const createRoomSchema = yup.object().shape({
    roomType: yup
        .string()
        .required(
            i18n.t("validation.required", { field: i18n.t("room.roomType") })
        ),
    bedType: yup
        .string()
        .required(
            i18n.t("validation.required", { field: i18n.t("room.bedType") })
        ),
    originalPrice: yup
        .number()
        .typeError(
            i18n.t("validation.typeError", {
                field: i18n.t("room.originalPrice"),
            })
        )
        .positive(
            i18n.t("validation.positive", {
                field: i18n.t("room.originalPrice"),
            })
        )
        .required(
            i18n.t("validation.required", {
                field: i18n.t("room.originalPrice"),
            })
        ),
    discountedPrice: yup
        .number()
        .typeError(
            i18n.t("validation.typeError", {
                field: i18n.t("room.discountedPrice"),
            })
        )
        .positive(
            i18n.t("validation.positive", {
                field: i18n.t("room.discountedPrice"),
            })
        ),
    maxOccupancy: yup
        .number()
        .typeError(
            i18n.t("validation.typeError", {
                field: i18n.t("room.maxOccupancy"),
            })
        )
        .positive(
            i18n.t("validation.positive", {
                field: i18n.t("room.maxOccupancy"),
            })
        )
        .required(
            i18n.t("validation.required", {
                field: i18n.t("room.maxOccupancy"),
            })
        ),
    roomArea: yup
        .number()
        .typeError(
            i18n.t("validation.typeError", { field: i18n.t("room.roomArea") })
        )
        .positive(
            i18n.t("validation.positive", { field: i18n.t("room.roomArea") })
        )
        .required(
            i18n.t("validation.required", { field: i18n.t("room.roomArea") })
        ),
});

// Schema validation với Yup
export const hotelDetailsSchema = yup.object().shape({
    name: yup.string().required(i18n.t("validation.name")),
    category: yup.string().required(i18n.t("validation.category")),
    description: yup.string().required(i18n.t("validation.description")),
    paymentPolicy: yup.string().required(i18n.t("validation.paymentPolicy")),
    freeCancellation: yup.boolean(),
    breakfastIncluded: yup.boolean(),
    prePayment: yup.boolean(),
});

export const locationHotelschema = yup.object().shape({
    location: yup.string().required(i18n.t("validation.location")),
    province: yup.object().nullable().required(i18n.t("validation.province")),
    district: yup.object().nullable().required(i18n.t("validation.district")),
    ward: yup.object().nullable().required(i18n.t("validation.ward")),
});

// Lược đồ xác thực bằng yup
export const blogCreateSchema = yup.object().shape({
    title: yup.string().required(
        i18n.t("validation.required", {
            field: i18n.t("validation.title"),
        })
    ),
    readTime: yup
        .number()
        .typeError(
            i18n.t("validation.required", {
                field: i18n.t("validation.readTime"),
            })
        )
        .positive(
            i18n.t("validation.required", {
                field: i18n.t("validation.readTime"),
            })
        )
        .required(i18n.t("validation.readTime")),
    blogPostCategory: yup.string().required(
        i18n.t("validation.required", {
            field: i18n.t("validation.category"),
        })
    ),
});

export const promotionCreateSchema = yup.object().shape({
    name: yup
        .string()
        .required(
            i18n.t("validation.required", { field: i18n.t("promotion.name") })
        ),
    code: yup
        .string()
        .required(
            i18n.t("validation.required", { field: i18n.t("promotion.code") })
        ),
    startDate: yup.string().nullable(),
    endDate: yup.string().nullable(),
    quantity: yup
        .number()
        .nullable()
        .min(
            1,
            i18n.t("validation.min", {
                field: i18n.t("promotion.quantity"),
                min: 1,
            })
        )
        .typeError(
            i18n.t("validation.typeError", {
                field: i18n.t("promotion.quantity"),
            })
        ),
    value: yup
        .number()
        .required(
            i18n.t("validation.required", { field: i18n.t("promotion.value") })
        )
        .min(
            1,
            i18n.t("validation.min", {
                field: i18n.t("promotion.value"),
                min: 1,
            })
        ),
    maxDiscountValue: yup
        .number()
        .required(
            i18n.t("validation.required", {
                field: i18n.t("promotion.maxDiscountValue"),
            })
        )
        .min(
            1,
            i18n.t("validation.min", {
                field: i18n.t("promotion.maxDiscountValue"),
                min: 1,
            })
        ),
});

// Validation schema với yup
export const promotionUpdateSchema = yup.object().shape({
    name: yup
        .string()
        .required(
            i18n.t("validation.required", { field: i18n.t("promotion.name") })
        ),
    code: yup
        .string()
        .required(
            i18n.t("validation.required", { field: i18n.t("promotion.code") })
        ),
    startDate: yup.string().nullable(),
    endDate: yup.string().nullable(),
    quantity: yup
        .number()
        .nullable()
        .min(
            1,
            i18n.t("validation.min", {
                field: i18n.t("promotion.quantity"),
                min: 1,
            })
        )
        .typeError(
            i18n.t("validation.typeError", {
                field: i18n.t("promotion.quantity"),
            })
        ),
    value: yup
        .number()
        .required(
            i18n.t("validation.required", { field: i18n.t("promotion.value") })
        )
        .min(
            1,
            i18n.t("validation.min", {
                field: i18n.t("promotion.value"),
                min: 1,
            })
        ),
    maxDiscountValue: yup
        .number()
        .required(
            i18n.t("validation.required", {
                field: i18n.t("promotion.maxDiscountValue"),
            })
        )
        .min(
            1,
            i18n.t("validation.min", {
                field: i18n.t("promotion.maxDiscountValue"),
                min: 1,
            })
        ),
    discountType: yup.string().required(i18n.t("validation.discountType")),
    applyTo: yup.string().required(i18n.t("validation.applyTo")),
    description: yup.string().required(i18n.t("validation.description")),
});
