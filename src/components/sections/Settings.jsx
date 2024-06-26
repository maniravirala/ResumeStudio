import React, { useState } from "react";
import { useFormData } from "../../contexts/Data/FormDataContext";
import DropDownMani from "../Inputs/DropDownMani";
import Slider from "../Inputs/Slider";
import { BiRotateRight } from "react-icons/bi";

const defaultSettings = {
  fontSize: 12,
  lineHeight: 8,
  pageMargins: 24,
  fontFamily: "Poppins",
  titleCase: "Uppercase",
};

const Settings = () => {
  const { formData, handleChange } = useFormData();
  const [settings, setSettings] = useState(formData.settings || defaultSettings);

  const handleSettingsChange = (key, value) => {
    const updatedSettings = { ...settings, [key]: value };
    setSettings(updatedSettings);
    handleChange(
      { target: { name: "settings", value: updatedSettings } },
      "settings"
    );
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
    handleChange(
      { target: { name: "settings", value: defaultSettings } },
      "settings"
    );
  };

  const fontOptions = [
    { label: "Arial", value: "Arial" },
    { label: "Courier New", value: "Courier New" },
    { label: "Poppins", value: "Poppins" },
    { label: "Times New Roman", value: "Times New Roman" },
    { label: "Verdana", value: "Verdana" },
  ];

  const titleCaseOptions = [
    { label: "Uppercase", value: "uppercase" },
    { label: "Lowercase", value: "lowercase" },
    { label: "Capitalize", value: "capitalize" },
  ];

  return (
    <div className="pt-8 h-full">
      <div className="flex items-center justify-between w-full p-3 gap-8">
        <h2 className="text-xl font-semibold">Settings</h2>
        <button
          type="button"
          onClick={resetSettings}
          className="flex items-center gap-2 text-primary dark:text-primary-dark font-semibold focus:outline-none"
        >
          <BiRotateRight
            className="inline-block"
            size="1.5rem"
          />
          Reset
        </button>
      </div>
      <div className="flex flex-col w-full p-5 gap-8">
        <div className="">
          <Slider
            label="Font Size"
            value={settings.fontSize}
            min="12"
            max="20"
            step="2"
            id="fontSize"
            onChange={(e) => handleSettingsChange("fontSize", e.target.value)}
          />
        </div>
        <div className="">
          <Slider
            label="Line Height"
            value={settings.lineHeight}
            min="0"
            max="20"
            step="2"
            id="lineHeight"
            onChange={(e) => handleSettingsChange("lineHeight", e.target.value)}
          />
        </div>
        <div className=""> 
          <Slider
            label="Page Margins"
            value={settings.pageMargins}
            min="10"
            max="40"
            step="2"
            id="pageMargins"
            onChange={(e) =>
              handleSettingsChange("pageMargins", e.target.value)
            }
          />
        </div>
        <div className="">
          <label htmlFor="fontFamily" className="block mb-1">
            Font Family
          </label>
          <DropDownMani
            className=""
            value={settings.fontFamily}
            options={fontOptions}
            handleChange={(value) => handleSettingsChange("fontFamily", value)}
          />
        </div>
        <div className="">
          <label htmlFor="titleCase" className="block mb-1">
            Title Case
          </label>
          <DropDownMani
            className=""
            value={settings.titleCase}
            options={titleCaseOptions}
            handleChange={(value) => handleSettingsChange("titleCase", value)}
          />
        </div>
        {/* Add more settings options as needed */}
      </div>
    </div>
  );
};

export default Settings;
