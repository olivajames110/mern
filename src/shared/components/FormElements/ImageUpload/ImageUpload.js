import React, { useRef, useState, useEffect } from 'react';
import Button from '../Button/Button';
import './ImageUpload.css';

const ImageUpload = (props) => {
	const [ file, setFile ] = useState();
	const [ previewUrl, setPreviewUrl ] = useState();
	const [ isValid, setIsValid ] = useState(false);

	const filePickerRef = useRef();

	const pickImageHandler = () => {
		filePickerRef.current.click();
	};

	const pickedHandler = (e) => {
		//ensures we actually have files
		let pickedFile;
		let fileIsValid;
		if (e.target.files || e.target.files.length !== 0) {
			pickedFile = e.target.files[0];
			setFile(pickedFile);
			setIsValid(true);
			fileIsValid = true;
		} else {
			setIsValid(false);
			fileIsValid = false;
		}

		props.onInput(props.id, pickedFile, fileIsValid);

		console.log(e.target);
	};

	useEffect(
		() => {
			if (!file) {
				return;
			}
			const fileReader = new FileReader();
			fileReader.onload = () => {
				setPreviewUrl(fileReader.result);
			};
			fileReader.readAsDataURL(file);
		},
		[ file ]
	);

	return (
		<div className="form-control">
			<input
				ref={filePickerRef}
				id={props.id}
				style={{ display: 'none' }}
				onChange={pickedHandler}
				accept=".jpg, .png, .jpeg"
				type="file"
			/>
			<div className={`image-upload ${props.center && 'center'}`}>
				<div className="image-upload__preview">
					{previewUrl && <img src={previewUrl} alt="" />}
					{!previewUrl && <p>Please pick an image</p>}
				</div>
				<Button type="button" onClick={pickImageHandler}>
					Pick Image
				</Button>
			</div>
			{!isValid && <p>{props.errorText}</p>}
		</div>
	);
};

export default ImageUpload;
