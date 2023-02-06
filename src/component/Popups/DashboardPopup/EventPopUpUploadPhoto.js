import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { AllMedia, uploadPhoto } from '../../../Pages/Dashboard/Event/Photos&Videos/photoAndVideoSlice';
import { imageType } from '../../../shared/constants';
import { useIntl } from "react-intl";

const EventPopUpUploadPhoto = ({ handleClose, eventId, imageList }) => {
	const intl = useIntl();
	const dispatch = useDispatch()
	const [image, setImage] = useState("");
	//const [currentImageList, setCurrentImageList] = useState(imageList);
	const [details, setDetails] = useState("");
	const [error, setError] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	const token = localStorage.getItem("Token");

	const imageHeader = {
		'Authorization': `Token ${token}`,
		'Content-Type': 'multipart/form-data'
	}

	const photoChangeHandler = (event) => {
		const size = 3;
		let selected = event.target.files[0];

		try {
			if (selected && imageType.includes(selected.type)) {
				if (selected.size < (size * 1024 * 1024)) {
					setImage(selected);
					setErrorMessage(null);
					setError(false);
				}
				else {
					// console.log("file size is greater than 3MB. File size is ", selected.size);
					setErrorMessage(`${intl.formatMessage({ id: "FILE SIZE IS GREATER THEN" })}` + size + " MB");
					setError(true);
				}
			} else {
				// console.log("please select valid image file. File type is ", selected.type);
				setErrorMessage(`${intl.formatMessage({ id: "PLEASE SELECT VALID IMAGE FILE." })}`);
				setError(true);
			}
		} catch (error) {
			console.log(error);
			setError(true);
		}
	}

	const uploadImage = async () => {
		try {
			let formDataImage = new FormData();
			formDataImage.append("file", image);
			const response = await dispatch(uploadPhoto(formDataImage)).unwrap();
			console.log(response);
			if (response.data.IsSuccess) {
				let payload = {
					eventid: eventId,
					photos: [...imageList,
					{
						url: response.data.Data.url,
						description: details
					}
					]
				}
				const res = await dispatch(AllMedia(payload)).unwrap();
				console.log(res);
				toast.success(res.data.Message);
				handleClose(false);
			} else {
				toast.error(response.data.Message);
			}
		} catch (error) {
			toast.success(`${intl.formatMessage({ id: "SOMETHING WENT WRONG." })}`);
			console.log(error);
		}
	}

	const submitHandler = async () => {
		if (!error) {
			uploadImage();
		} else {
			console.log("error occured");
		}
	}

	return (
		//  <!-- Upload Photo  -->
		<div className="popup table fixed w-full inset-0 z-40 bg-black bg-opacity-75 h-screen">
			<div className="table-cell align-middle">
				<div className="popin max-w-2xl w-full mx-auto max-h-[calc(100vh-55px)] overflow-y-auto lg:px-9">
					<div className="bg-brightGray p-12">
						<div className="flex justify-between items-center">
							<h1 className="h1">{intl.formatMessage({ id: "UPLOAD PHOTO" })}</h1>
							<div>
								<button onClick={() => handleClose(false)} className="text-xl"><i className="icon-close"></i></button>
							</div>
						</div>
						<form className="py-7 space-y-5">
							<div className="upload-holder">
								<h6 className="text-sm font-bold text-quicksilver">{intl.formatMessage({ id: "SELECT PHOTO" })} <span className="text-10">{intl.formatMessage({ id: "15 IMAGES" })} ({intl.formatMessage({ id: "UP TO 3MB" })} / {intl.formatMessage({ id: "IMAGE" })})</span></h6>
								<label htmlfor="upload" className="upload upload-popup">
									<input type="file" name="images" id="upload" className="appearance-none hidden" onChange={photoChangeHandler} />
									<span className="input-titel mt-1"><i className="icon-image mr-2"></i>{intl.formatMessage({ id: "CHOOSE IMAGES" })}</span>
								</label>
								{error ? <span className="mt-1" style={{ color: "red", fontSize: "14px" }}>{errorMessage} </span> : <span className="mt-1" style={{ fontSize: "14px" }}>{image.name}</span>}
							</div>
							<div className="w-full">
								<span className="input-titel">{intl.formatMessage({ id: "DETAILS" })}</span>
								<textarea name="details" id="" cols="30" rows="5" className="outline-none flex items-center w-full bg-white p-2 px-3.5 rounded-md" onChange={(e) => setDetails(e.target.value)}></textarea>
							</div>
						</form>
						{/* <Link to="/" className="btn-primary w-full uppercase">Submit</Link> */}
						<div className="btn-primary w-full uppercase cursor-pointer" onClick={submitHandler}>{intl.formatMessage({ id: "SUBMIT" })}</div>
					</div>
				</div>
			</div>
			<ToastContainer
				position="bottom-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="colored"
			/>
		</div>
	)
}

export default EventPopUpUploadPhoto;