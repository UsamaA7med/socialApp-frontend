import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Textarea,
  Button,
  Input,
  Form,
  Spinner,
} from "@heroui/react";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../store/postsSlice/thunk";
import { addToast } from "@heroui/toast";

export const CameraIcon = ({
  fill = "currentColor",
  size,
  height,
  width,
  ...props
}) => {
  return (
    <svg
      fill="none"
      height={size || height || 24}
      viewBox="0 0 24 24"
      width={size || width || 24}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        clipRule="evenodd"
        d="M17.44 6.236c.04.07.11.12.2.12 2.4 0 4.36 1.958 4.36 4.355v5.934A4.368 4.368 0 0117.64 21H6.36A4.361 4.361 0 012 16.645V10.71a4.361 4.361 0 014.36-4.355c.08 0 .16-.04.19-.12l.06-.12.106-.222a97.79 97.79 0 01.714-1.486C7.89 3.51 8.67 3.01 9.64 3h4.71c.97.01 1.76.51 2.22 1.408.157.315.397.822.629 1.31l.141.299.1.22zm-.73 3.836c0 .5.4.9.9.9s.91-.4.91-.9-.41-.909-.91-.909-.9.41-.9.91zm-6.44 1.548c.47-.47 1.08-.719 1.73-.719.65 0 1.26.25 1.72.71.46.459.71 1.068.71 1.717A2.438 2.438 0 0112 15.756c-.65 0-1.26-.25-1.72-.71a2.408 2.408 0 01-.71-1.717v-.01c-.01-.63.24-1.24.7-1.699zm4.5 4.485a3.91 3.91 0 01-2.77 1.15 3.921 3.921 0 01-3.93-3.926 3.865 3.865 0 011.14-2.767A3.921 3.921 0 0112 9.402c1.05 0 2.04.41 2.78 1.15.74.749 1.15 1.738 1.15 2.777a3.958 3.958 0 01-1.16 2.776z"
        fill={fill}
        fillRule="evenodd"
      />
    </svg>
  );
};

export default function CreatePost() {
  const { user } = useSelector((state) => state.authSlice);
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);
  const [textLength, setTextLength] = useState(0);
  const dispatch = useDispatch();
  const onSubmit = (e) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.currentTarget));
    const formData = new FormData();
    formData.append("text", data.text);
    formData.append("image", image);
    dispatch(createPost(formData)).then((data) => {
      if (!data.error) {
        addToast({
          title: "Post created",
          description: "Your post has been created successfully",
          color: "success",
        });
      }
    });
    e.target.reset();
    handleImageChange(e);
  };
  const handleImageChange = (event) => {
    let file;
    if (event.target.image) {
      file = event.target.image.files[0];
    } else {
      file = event.target.files[0];
    }
    if (file) {
      setImage(file);
    } else {
      setImage(null);
    }
  };
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <Card className="min-w-80 w-1/2">
      <CardHeader className="flex gap-3">
        <Avatar src={user.profileImage?.url} />
        <div className="flex flex-col">
          <p className="text-md">{user.fullname}</p>
          <p className="text-small text-default-500">@{user.username}</p>
        </div>
      </CardHeader>
      <Form onSubmit={onSubmit}>
        <CardBody className="gap-2">
          <Textarea
            name="text"
            maxLength={500}
            onValueChange={(value) => setTextLength(value.length)}
            placeholder="Write your thoughts..."
          />
          <div className="flex justify-end">
            <p>{textLength}/500</p>
          </div>
          {image && (
            <div className="flex justify-center h-80">
              <img
                src={URL.createObjectURL(image)}
                alt="Selected"
                className="rounded-lg object-contain"
              />
            </div>
          )}
        </CardBody>
        <CardFooter className="justify-between">
          <Input
            ref={fileInputRef}
            name="image"
            startContent={<CameraIcon />}
            onChange={handleImageChange}
            type="file"
            accept="image/*"
            className="hidden"
          />
          <Button
            isIconOnly
            aria-label="Take a photo"
            onPress={handleButtonClick}
            color="primary"
            variant="faded"
          >
            <CameraIcon />
          </Button>
          <Button
            isDisabled={textLength >= 3 || image !== null ? false : true}
            type="submit"
            color="primary"
          >
            Post
          </Button>
        </CardFooter>
      </Form>
    </Card>
  );
}
