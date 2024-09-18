import { pickPictureProps } from "../ImageTaker";

const TakePicture = (props: pickPictureProps) => {
    props.onImageTaken?.({ path: 'test' });
};

export default TakePicture;