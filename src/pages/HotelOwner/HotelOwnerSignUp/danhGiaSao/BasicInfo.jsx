import React from 'react';

const BasicInfo = ({ nextStep, handleChange, formData }) => {
    const handleNext = () => {
        // Validate and go to next step
        nextStep();
    };

    return (
        <div>
            <h2>Basic Info</h2>
            <input
                type="text"
                placeholder="Hotel Name"
                value={formData.name || ""}
                onChange={(e) => handleChange({ basicInfo: { ...formData, name: e.target.value } })}
            />
            {/* Add other fields */}
            <button onClick={handleNext}>Next</button>
        </div>
    );
};

export default BasicInfo;
