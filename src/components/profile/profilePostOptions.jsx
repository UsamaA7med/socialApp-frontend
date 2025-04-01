import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  useDisclosure,
} from "@heroui/react";
import { IoMdMore } from "react-icons/io";
import { useDispatch } from "react-redux";
import { deletePost } from "../../store/postsSlice/thunk";
import { addToast } from "@heroui/toast";
import EditPostModal from "../common/editPostModal";

export default function ProfilePostOptions({ post }) {
  const dispatch = useDispatch();
  const editPostModal = useDisclosure();
  return (
    <>
      {" "}
      <Dropdown>
        <DropdownTrigger>
          <Button variant="light" isIconOnly>
            <IoMdMore />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          onAction={(key) => {
            if (key === "edit") editPostModal.onOpen();
          }}
          aria-label="Static Actions"
        >
          <DropdownItem key="edit">Edit post</DropdownItem>
          <DropdownItem
            onPress={() =>
              dispatch(deletePost(post._id)).then((data) => {
                if (!data.error) {
                  addToast({
                    title: "Post deleted",
                    description: "Your post has been deleted successfully",
                    color: "success",
                  });
                }
              })
            }
            key="delete"
            className="text-danger"
            color="danger"
          >
            Delete post
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <EditPostModal disclosure={editPostModal} post={post} />
    </>
  );
}
