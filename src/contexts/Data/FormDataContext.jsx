import React, { useState, useEffect, useContext } from "react";

const FormDataContext = React.createContext();

export const useFormData = () => {
    return useContext(FormDataContext);
};

export const FormDataProvider = ({ children }) => {
    const [formData, setFormData] = useState(() => {
        const savedFormData = localStorage.getItem("formData");
        return savedFormData ? JSON.parse(savedFormData) : {
            personalInfo: {
                name: "",
                email: "",
                phone: "",
                address: "",
                linkedin: "",
                github: "",
                position: "",
            },
            profilePic: "",
            technicalSkills: [],
            certifications: [],
            extraCurricularActivities: [],
            internships: [],
            summerTraining: [],
            projects: [],
            achievements: [],
            education: [],
        };
    });

    useEffect(() => {
        localStorage.setItem("formData", JSON.stringify(formData));
    }, [formData]);

    const handleChange = (e, section, index) => {
        const { name, value } = e.target;
        setFormData((prevData) => {
          const updatedData = { ...prevData };
          if (section === "personalInfo") {
            updatedData[section][name] = value;
          } else {
            updatedData[section]= value;
          }
          return updatedData;
        });
    };

    const handleProfilePic = (url) => {
        setFormData((prevData) => ({
            ...prevData,
            profilePic: url,
        }));
    };

    return (
        <FormDataContext.Provider value={{ formData, handleChange, handleProfilePic }}>
            {children}
        </FormDataContext.Provider>
    );
};

export default FormDataContext;