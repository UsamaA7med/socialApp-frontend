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
import { createComment, toggleLike } from "../../store/postsSlice/thunk";
import ProfilePostOptions from "./profilePostOptions";
import CommentOptions from "./commentOptions";

export default function ProfilePost({ post }) {
  const auth = useSelector((state) => state.authSlice);
  const { profile } = useSelector((state) => state.profileSlice);
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
        <div className="cursor-pointer flex gap-5">
          <Avatar radius="full" size="md" src={profile.profileImage.url} />
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">
              {profile.fullname}
            </h4>
            <h5 className="text-small tracking-tight text-default-400">
              @{profile.username}
            </h5>
          </div>
        </div>
        <ProfilePostOptions post={post} />
      </CardHeader>
      <CardBody className="px-3 py-0 text-small ">
        <p>{post.content}</p>
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
            color={post.likes.includes(auth.user._id) ? "primary" : "default"}
          >
            <FaHeart size={20} />
          </Button>
          <p>{post.likes.length}</p>
        </div>
        <Divider />
        <div className="flex w-full mt-2 flex-col gap-3">
          <h5 className="text-small mb-1 font-semibold leading-none text-default-600">
            Comments
          </h5>
          {post.comments.map((comment) => (
            <div key={comment._id} className="flex w-full gap-2 items-start">
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
                {(comment.user._id === auth.user._id ||
                  auth.user._id === post.user._id) && (
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
