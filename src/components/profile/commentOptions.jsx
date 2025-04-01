import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  useDisclosure,
} from "@heroui/react";
import { IoMdMore } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment } from "../../store/postsSlice/thunk";
import { addToast } from "@heroui/toast";
import UpdateCommentModal from "../common/updateCommentModal";

export default function CommentOptions({ post, comment }) {
  const exampleModal = useDisclosure();
  const auth = useSelector((state) => state.authSlice);
  const dispatch = useDispatch();
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
            if (key === "edit") exampleModal.onOpen();
          }}
          aria-label="Static Actions"
        >
          {comment.user._id === auth.user._id && (
            <DropdownItem key="edit">Edit</DropdownItem>
          )}
          <DropdownItem
            onPress={() =>
              dispatch(
                deleteComment({
                  postId: post._id.toString(),
                  commentId: comment._id.toString(),
                })
              ).then((data) => {
                if (!data.error) {
                  addToast({
                    title: "comment deleted",
                    description: "Your comment has been deleted successfully",
                    color: "success",
                  });
                }
              })
            }
            key="delete"
            className="text-danger"
            color="danger"
          >
            Delete
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <UpdateCommentModal
        disclosure={exampleModal}
        postId={post._id.toString()}
        commentId={comment._id.toString()}
        value={comment.content}
      />
    </>
  );
}
