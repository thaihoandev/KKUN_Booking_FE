import React from "react";
import { Range } from "react-range";

const RangeSlider = ({ minValue, maxValue, values, setValues }) => {
    const STEP = 1;
    const MIN = minValue;
    const MAX = maxValue;

    return (
        <Range
            step={STEP}
            min={MIN}
            max={MAX}
            values={values}
            onChange={(newValues) => setValues(newValues)}
            renderTrack={({ props, children }) => (
                <div
                    {...props}
                    style={{
                        ...props.style,
                        height: "8px",
                        width: "100%",
                        background: "#ddd",
                        borderRadius: "4px",
                        position: "relative",
                    }}
                >
                    <div
                        style={{
                            position: "absolute",
                            height: "100%",
                            backgroundColor: "#73c076",
                            borderRadius: "4px",
                            left: `${((values[0] - MIN) / (MAX - MIN)) * 100}%`,
                            width: `${
                                ((values[1] - values[0]) / (MAX - MIN)) * 100
                            }%`,
                        }}
                    />
                    {children}
                </div>
            )}
            renderThumb={({ props }) => (
                <div
                    {...props}
                    style={{
                        ...props.style,
                        height: "20px",
                        width: "20px",
                        backgroundColor: "#ffffff",
                        border: "3px solid #73c076",
                        borderRadius: "50%",
                        boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.3)",
                    }}
                />
            )}
        />
    );
};

export default RangeSlider;
