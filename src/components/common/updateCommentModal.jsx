import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Form,
  Input,
  Textarea,
} from "@heroui/react";
import { useDispatch } from "react-redux";
import { updateComment } from "../../store/postsSlice/thunk";
import { useState } from "react";
export default function UpdateCommentModal({
  disclosure,
  postId,
  commentId,
  value,
}) {
  const { isOpen, onOpenChange } = disclosure;
  const [oldValue, setValue] = useState(value);
  const dispatch = useDispatch();
  const onSubmit = (e) => {
    e.preventDefault();
    const data = {
      postId,
      commentId,
      content: e.target.content.value,
    };
    dispatch(updateComment(data));
  };

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Edit comment
              </ModalHeader>

              <ModalBody>
                <Form onSubmit={onSubmit}>
                  <Input
                    labelPlacement="outside"
                    name="content"
                    value={oldValue}
                    onValueChange={(value) => setValue(value)}
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
