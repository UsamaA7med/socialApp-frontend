import { FaHeart } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Button,
  Input,
  Image,
  Form,
  Divider,
} from "@heroui/react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../store/profileSlice/thunk";
import { useNavigate } from "react-router-dom";
import { createComment, toggleLike } from "../../store/postsSlice/thunk";
import ProfilePostOptions from "../profile/profilePostOptions";
import CommentOptions from "../profile/commentOptions";

export default function HomePost({ userx, post }) {
  const { user } = useSelector((state) => state.authSlice);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleCreateComment = (e) => {
    e.preventDefault();
    const content = e.target.comment.value.trim();
    if (content.length > 0) {
      console.log(content);
      dispatch(
        createComment({
          id: post._id,
          content,
        })
      );
      e.target.reset();
    }
  };
  return (
    <Card className="min-w-80 w-1/2">
      <CardHeader className="justify-between">
        <div
          onClick={() => {
            dispatch(getProfile(userx.id)).then(() => {
              window.scrollTo({
                behavior: "smooth",
                top: 0,
              });
              navigate(`/profile/${userx.id}`);
            });
          }}
          className="cursor-pointer flex gap-5"
        >
          <Avatar radius="full" size="md" src={userx.profileImage.url} />
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">
              {userx.fullname}
            </h4>
            <h5 className="text-small tracking-tight text-default-400">
              @{userx.username}
            </h5>
          </div>
        </div>
        {user._id === userx._id && (
          <div>
            <ProfilePostOptions post={post} />
          </div>
        )}
      </CardHeader>

      <CardBody className="px-3 max-h-96 py-0 text-small ">
        <p className="mb-5">{post.content}</p>
        {post.postImage.publicId !== null && (
          <div className="w-full h-full flex justify-center">
            <Image
              src={post.postImage.url}
              className="object-contain"
              width={300}
              height={300}
            />
          </div>
        )}
      </CardBody>

      <CardFooter className="flex-col items-start gap-3">
        <div className="flex items-center gap-2">
          <Button
            isIconOnly
            onPress={() => dispatch(toggleLike(post._id))}
            color={post.likes.includes(user._id) ? "primary" : "default"}
          >
            <FaHeart size={20} />
          </Button>
          <p>{post.likes.length}</p>
        </div>
        <Divider />
        <div className="flex mt-2 w-full flex-col gap-3">
          <h5 className="text-small mb-1 font-semibold leading-none text-default-600">
            Comments
          </h5>
          {post.comments.map((comment) => (
            <div key={comment._id} className="flex w-full  gap-2 items-start">
              <Avatar
                radius="full"
                size="sm"
                src={comment.user.profileImage.url}
              />
              <div className="flex w-full justify-between">
                <div>
                  <h5 className="text-small font-semibold leading-none text-default-600">
                    {comment.user.username}
                  </h5>
                  <p className="text-small tracking-tight text-default-400">
                    {comment.content}
                  </p>
                </div>
                {(comment.user._id === user._id ||
                  user._id === post.user._id) && (
                  <CommentOptions post={post} comment={comment} />
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between w-full gap-10">
          <Form className="w-full flex-row" onSubmit={handleCreateComment}>
            <Input name="comment" placeholder="Leave a comment..." />
            <Button isIconOnly type="submit">
              <IoMdSend />
            </Button>
          </Form>
        </div>
      </CardFooter>
    </Card>
  );
}
