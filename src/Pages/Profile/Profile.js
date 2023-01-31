import React, { useState, useEffect } from "react";
import PersonalProfile from "./PersonalProfile";
import BusinessProfile from "./BusinessProfile";
import { useDispatch } from "react-redux";
import { useProfileDetails, getProfileDetails } from "./profileSlice";

const Profile = () => {
  const profileDetails = useProfileDetails();
  const dispatch = useDispatch();
  const getProfile = async () => {
    try {
      await dispatch(getProfileDetails()).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div className="wrapper min-h-full flex flex-col">
      <div className="space-y-8 h-full">
        {/* <!-- advisement --> */}
        {/* <!-- profile 1 --> */}
        <PersonalProfile details={profileDetails} getProfile={getProfile} />
        {/* <Advertisement /> */}

        {/* <!-- profile 2 --> */}
        <BusinessProfile
          business={profileDetails?.businessProfile}
          getProfile={getProfile}
        />
      </div>
    </div>
  );
};

export default Profile;
