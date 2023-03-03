import React from 'react';
import { useSelector } from 'react-redux';
import { useIntl } from "react-intl";


function StepProgressBar({ eventType }) {
	const intl = useIntl();

    const placesProgressBarList = [`${intl.formatMessage({ id: "ADD PLACE" })}`, `${intl.formatMessage({ id: "ABOUT PLACE" })}`, `${intl.formatMessage({ id: "LOCATION" })}`,  `${intl.formatMessage({ id: "PHOTOS & VIDEOS" })}`, `${intl.formatMessage({ id: "ADD SERVICE" })}`, `${intl.formatMessage({ id: "PERSONAL DETAILS" })}`,   `${intl.formatMessage({ id: "COMPANY DETAILS" })}`, `${intl.formatMessage({ id: "TERMS & CONDITIONS" })}`, `${intl.formatMessage({ id: "DISCOUNT" })}`, `${intl.formatMessage({ id: "CALENDAR" })}`];

    const personalSkillProgressVBarList = [`${intl.formatMessage({ id: "SELECT SKILL" })}`, `${intl.formatMessage({ id: "PERSONAL DETAILS" })}`, `${intl.formatMessage({ id: "PHOTOS & VIDEOS" })}`, `${intl.formatMessage({ id: "EQUIPMENT" })}`, `${intl.formatMessage({ id: "OTHER COST" })}`, `${intl.formatMessage({ id: "COMPANY DETAILS" })}`, `${intl.formatMessage({ id: "TERMS & CONDITIONS" })}`, `${intl.formatMessage({ id: "DISCOUNT" })}`, `${intl.formatMessage({ id: "CALENDAR" })}`];

    const groupSkillProgressBarList = [`${intl.formatMessage({ id: "SELECT SKILL" })}`, `${intl.formatMessage({ id: "PERSONAL DETAILS" })}`, `${intl.formatMessage({ id: "PHOTOS & VIDEOS" })}`, `${intl.formatMessage({ id: "ADD ITEM" })}`, `${intl.formatMessage({ id: "EQUIPMENT" })}`, `${intl.formatMessage({ id: "OTHER COST" })}`, `${intl.formatMessage({ id: "COMPANY DETAILS" })}`, `${intl.formatMessage({ id: "TERMS & CONDITIONS" })}`, `${intl.formatMessage({ id: "DISCOUNT" })}`, `${intl.formatMessage({ id: "CALENDAR" })}`];

    const count = useSelector(state => state?.stepProgressCount?.count);

    return (
        <div className="w-full overflow-hidden">
            <ul className="flex justify-between step-progress-holder">
                {eventType === "hyp" && placesProgressBarList.map((element, index) => {
                    return(
                        <li className={count >= (index + 1) ? "active" : ""} key={index}>
                        <div>
                            <span className={count >= (index + 1) ? "active" : ""}>{index + 1}</span>
                        </div>
                        <h3>{element}</h3>
                    </li>
                    )
                })}

                {eventType === "psb" && personalSkillProgressVBarList.map((element, index) => (
                    <li className={count >= (index + 1) ? "active" : ""} key={index}>
                        <div>
                            <span className={count >= (index + 1) ? "active" : ""}>{index + 1}</span>
                        </div>
                        <h3>{element}</h3>
                    </li>
                ))}

                {eventType === "gsb" && groupSkillProgressBarList.map((element, index) => (
                    <li className={count >= (index + 1) ? "active" : ""} key={index}>
                        <div>
                            <span className={count >= (index + 1) ? "active" : ""}>{index + 1}</span>
                        </div>
                        <h3>{element}</h3>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default StepProgressBar
