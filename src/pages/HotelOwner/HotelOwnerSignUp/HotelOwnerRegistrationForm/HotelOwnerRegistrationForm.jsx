// import React, { useState } from 'react';
// import ProgressBar from 'react-bootstrap/ProgressBar';
// import BasicInfo from './danhGiaSao/BasicInfo';
// import LocationInfo from './LocationDetails/LocationDetails';
// import AccommodationDetails from './AccountDetails/AccountDetails';
// import RoomDetails from './RoomDetails/RoomDetails';
// import UploadImages from './Photos/Photos';
// import Profile from './Profile/Profile'
// import Confirmation from './Confirmation/Confirmation';
// // Style for layout adjustments

// const HotelOwnerRegistrationForm = () => {
//     const [step, setStep] = useState(1);
//     const [formData, setFormData] = useState({
//         basicInfo: {},
//         locationInfo: {},
//         accommodationDetails: {},
//         roomDetails: {},
//         images: [],
//         profile: {}
//     });

//     // Function to move to the next step
//     const nextStep = () => {
//         if (step < 7) setStep(step + 1);
//     };

//     // Function to move to the previous step
//     const prevStep = () => {
//         if (step > 1) setStep(step - 1);
//     };

//     // Function to update form data
//     const handleChange = (data) => {
//         setFormData({ ...formData, ...data });
//     };

//     // Determine the current component to render based on the step
//     const renderStep = () => {
//         switch (step) {
//             case 1:
//                 return <BasicInfo nextStep={nextStep} handleChange={handleChange} formData={formData.basicInfo} />;
//             case 2:
//                 return <LocationInfo nextStep={nextStep} prevStep={prevStep} handleChange={handleChange} formData={formData.locationInfo} />;
//             case 3:
//                 return <AccommodationDetails nextStep={nextStep} prevStep={prevStep} handleChange={handleChange} formData={formData.accommodationDetails} />;
//             case 4:
//                 return <RoomDetails nextStep={nextStep} prevStep={prevStep} handleChange={handleChange} formData={formData.roomDetails} />;
//             case 5:
//                 return <UploadImages nextStep={nextStep} prevStep={prevStep} handleChange={handleChange} formData={formData.images} />;
//             case 6:
//                 return <Profile nextStep={nextStep} prevStep={prevStep} handleChange={handleChange} formData={formData.profile} />;
//             case 7:
//                 return <Confirmation prevStep={prevStep} formData={formData} />;
//             default:
//                 return null;
//         }
//     };

//     return (
        
//         <div className="registration-container d-flex">
            

//             {/* Left Side - Vertical Progress Bar */}
//             <div className="progress-bar-container me-4">
//                 <ProgressBar now={(step / 7) * 100} className="vertical-progress" />
//                 <div className="progress-steps">
//                     <ul>
//                         <li className={step >= 1 ? "completed" : ""}>Basic Info</li>
//                         <li className={step >= 2 ? "completed" : ""}>Location Info</li>
//                         <li className={step >= 3 ? "completed" : ""}>Accommodation Details</li>
//                         <li className={step >= 4 ? "completed" : ""}>Room Details</li>
//                         <li className={step >= 5 ? "completed" : ""}>Upload Images</li>
//                         <li className={step >= 6 ? "completed" : ""}>Profile</li>
//                         <li className={step >= 7 ? "completed" : ""}>Confirmation</li>
//                     </ul>
//                 </div>
//             </div>

//             {/* Right Side - Form */}
//             <div className="form-container bg-light p-4 rounded">
//                 {renderStep()}
//             </div>
//         </div>
//     );
// };

// export default HotelOwnerRegistrationForm;


//===============================================================================

import React, { useState } from "react";
import AccountDetails from "../AccountDetails/AccountDetails";    // 1 AccountDetails (Thông tin tài khoản)x
import PropertyInfo from "../PropertyInfo/PropertyInfo";      // 2 Property Information (Thông tin cơ bản về khách sạn)
import LocationDetails from "../LocationDetails/LocationDetails"; // 3 Location & Details (Vị trí & Chi tiết)
import RoomDetails from "../RoomDetails/RoomDetails";         // 4 Room Details & Pricing (Chi tiết & Giá phòng)
//import Photos from "../Photos/Photos";              // 5. Photos (Hình ảnh)
import Confirmation from "../Confirmation/Confirmation";    // 6. Confirmation & Submit (Xem lại & Đăng ký)
//import ProgressBar from "./ProgressBar/ProgressBar"               // 0. Thanh tiến trình bên trái
import ProgressBar from 'react-bootstrap/ProgressBar';



function HotelOwnerRegistrationForm() {
    const [step, setStep] = useState(1);

    const handleNextStep = () => setStep((prev) => prev + 1);
    const handlePrevStep = () => setStep((prev) => prev - 1);

    return (
        <div className="registration-container">
            <ProgressBar currentStep={step} />

            <div className="step-content">
                {step === 1 && <AccountDetails onNext={handleNextStep} />}
                {step === 2 && <PropertyInfo onNext={handleNextStep} onBack={handlePrevStep} />}
                {step === 3 && <LocationDetails onNext={handleNextStep} onBack={handlePrevStep} />}
                {step === 4 && <RoomDetails onNext={handleNextStep} onBack={handlePrevStep} />}
             {/* //   {step === 5 && <Photos onNext={handleNextStep} onBack={handlePrevStep} />} */}
                {step === 6 && <Confirmation onBack={handlePrevStep} />}
            </div>
        </div>
    );
}

export default HotelOwnerRegistrationForm;
