import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Form,
  Input,
} from "@heroui/react";
import { useDispatch } from "react-redux";
import { updatePost } from "../../store/postsSlice/thunk";
import { useState } from "react";
export default function EditPostModal({ disclosure, post }) {
  const { isOpen, onOpenChange } = disclosure;
  console.log(post);
  const [oldValue, setValue] = useState(post.content);
  const dispatch = useDispatch();
  const onSubmit = (e) => {
    e.preventDefault();
    const data = {
      postId: post._id,
      content: e.target.content.value,
    };
    dispatch(updatePost(data));
  };

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Edit post
              </ModalHeader>

              <ModalBody>
                <Form onSubmit={onSubmit}>
                  <Input
                    labelPlacement="outside"
                    name="content"
                    value={oldValue}
                    maxLength={500}
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
