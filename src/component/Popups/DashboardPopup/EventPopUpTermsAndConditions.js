import React from "react";
import { useEffect } from "react";
import { useIntl } from "react-intl";

const EventPopUpTermsAndConditions = ({ handleClose, terms, saveData,setIsCheck }) => {
  const intl = useIntl();
  useEffect(() => {
    const box = document.getElementById("termsBox");
    box.innerHTML =
    `${intl.formatMessage({ id: "EVENTO PACKAGE IS AN ONLINE SERVICE OFFERED BY THE COMPANY. BY ACCESSING OR USING ANY WEBSITE WITH AN AUTHORIZED LINK TO THE WEBSITE AND/OR THE APP, REGISTERING AN ACCOUNT, OR ACCESSING OR USING ANY CONTENT, INFORMATION, SERVICES, FEATURES, OR RESOURCES AVAILABLE OR ENABLED VIA THE WEBSITE AND/OR THE APP, CLICKING ON A BUTTON OR TAKING ANOTHER ACTION TO SIGNIFY YOUR ACCEPTANCE OF THIS AGREEMENT, YOU:" })}`;
  }, [terms]);

  return (
    //  <!--  Terms and Conditions  -->
    <div className="popup table fixed w-full inset-0 z-40 bg-black bg-opacity-75 h-screen">
      <div className="table-cell align-middle">
        <div className="popin max-w-2xl w-full mx-auto max-h-[calc(100vh-55px)] overflow-y-auto lg:px-9">
          <div className="bg-brightGray p-7 space-y-7">
            <h2 className="h1 w-full max-w-xs"> {intl.formatMessage({ id: "TERMS AND CONDITIONS" })} </h2>

            <div id="termsBox"></div>

            <div className="flex items-center space-x-5">
              <button
                onClick={() => {
                  setIsCheck(false);
                  handleClose(false);
                }}
                className="btn-primary btn-cancel w-full"
              >
                {intl.formatMessage({ id: "CANCEL" })}
              </button>
              <div
                className="btn-primary w-full"
                onClick={() => {
                  setIsCheck(true);
                  handleClose(false);
                }}
              >
                {intl.formatMessage({ id: "APPLY" })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventPopUpTermsAndConditions;
