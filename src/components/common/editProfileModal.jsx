import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Form,
  Input,
  Textarea,
} from "@heroui/react";
import { useDispatch } from "react-redux";
import { updateProfile } from "../../store/profileSlice/thunk";
import { getUser } from "../../store/authSlice/thunk";
import { addToast } from "@heroui/toast";
export default function EditProfile() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const dispatch = useDispatch();
  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("profileImage", e.target.profileImage.files[0]);
    formData.append("coverImage", e.target.coverImage.files[0]);
    formData.append("bio", e.target.bio.value);
    formData.append("username", e.target.username.value);
    formData.append("currentPassword", e.target.currentPassword.value);
    formData.append("newPassword", e.target.newPassword.value);
    formData.append("fullname", e.target.fullname.value);
    dispatch(updateProfile(formData)).then((data) => {
      if (!data.error) {
        addToast({
          title: "Profile updated",
          description: "Your profile data has been updated successfully",
          color: "success",
        });
        dispatch(getUser());
      } else {
        console.log(data);
        addToast({
          title: "Error",
          description: data.payload.message,
          color: "danger",
        });
      }
    });
  };

  return (
    <>
      <Button onPress={onOpen} color="primary">
        Edit profile
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Edit profile
              </ModalHeader>

              <ModalBody>
                <Form onSubmit={onSubmit}>
                  <Input
                    labelPlacement="outside"
                    name="profileImage"
                    label="profile image"
                    placeholder="Enter your full name"
                    type="file"
                  />
                  <Input
                    labelPlacement="outside"
                    name="coverImage"
                    label="cover image 800x500px"
                    placeholder="Enter your full name"
                    type="file"
                  />
                  <Input
                    labelPlacement="outside"
                    name="fullname"
                    label="personal information"
                    placeholder="Enter your full name"
                  />
                  <Input
                    labelPlacement="outside"
                    name="username"
                    placeholder="Enter your username"
                  />
                  <Textarea
                    labelPlacement="outside"
                    name="bio"
                    maxLength={160}
                    placeholder="Enter your bio"
                  />
                  <Input
                    labelPlacement="outside"
                    type="password"
                    name="currentPassword"
                    label="change password"
                    placeholder="Enter your current password"
                  />
                  <Input
                    labelPlacement="outside"
                    name="newPassword"
                    type="password"
                    placeholder="Enter your new password"
                  />
                  <ModalFooter className="w-full flex justify-end">
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    <Button color="primary" type="submit" onPress={onClose}>
                      Edit
                    </Button>
                  </ModalFooter>
                </Form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
