import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth, deleteProfile } from "../../store/authSlice/thunk";

export default function DeleteUserModal() {
  const { user } = useSelector((state) => state.authSlice);
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [backdrop, setBackdrop] = useState("opaque");

  const handleOpen = (backdrop) => {
    setBackdrop(backdrop);
    onOpen();
  };

  return (
    <>
      <div className="flex flex-wrap gap-3">
        <Button
          className="capitalize"
          color="danger"
          variant="solid"
          onPress={() => handleOpen("blur")}
        >
          Delete profile
        </Button>
      </div>
      <Modal backdrop={backdrop} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Delete profile
              </ModalHeader>
              <ModalBody>
                <p>
                  Dear {user.username}, We have received your request to delete
                  your account.
                </p>
                <p>
                  {" "}
                  We're sorry to see you go! Please confirm if you would like to
                  proceed with permanently deleting your account.
                </p>
                <p>
                  {" "}
                  Once deleted, all your data will be removed and this action
                  cannot be undone.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  onPressEnd={() => dispatch(deleteProfile())}
                  color="primary"
                  onPress={onClose}
                >
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
