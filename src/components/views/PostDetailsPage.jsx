import { Suspense, useState } from "react";
import {
  useFetchPostByIdQuery,
  useDeletePostMutation,
  useCreateCommentMutation,
} from "../../redux/posts/postSlice";
import {
  useParams,
  useNavigate,
  useLocation,
  Route,
  Routes,
  Link,
} from "react-router-dom";
import { alert } from "@pnotify/core";

import Loader from "../Loader";
import Button from "../Button";
import CreatePostPage from "../CreatePostPage";
import s from "./PostDetailsPage.module.css";

export default function PostDetailsPage() {
  const [deletePost, { isLoading: isDeleting }] = useDeletePostMutation();
  const { id } = useParams();
  const postId = Number(id);
  const { data, isFetching, isSuccess } = useFetchPostByIdQuery(postId);

  const [createComment, { isLoading }] = useCreateCommentMutation();
  const [body, setBody] = useState("");

  const location = useLocation();
  const navigation = useNavigate();

  const onClickBack = () => {
    const { from } = location.state;
    navigation(from);
  };

  const handleCreateComment = async () => {
    if (body) {
      await createComment({
        postId,
        body,
      }).unwrap();
      setBody("");
      alert({
        type: "success",
        text: "Comment was created",
      });
    }
  };

  const handleSubmit = (e) => {
    if (body === "") {
      alert({
        type: "error",
        text: "Fill in the registration data",
      });
      return;
    }
    e.currentTarget.reset();
  };

  isDeleting &&
    alert({
      type: "warning",
      text: `Post ${data.title} was deleted!`,
    });

  return (
    <>
      {isFetching && <Loader />}
      {data === [] &&
        alert({
          type: "error",
          text: `No post for you request`,
        })}
      {isSuccess && (
        <>
          <Button type='button' title='back' onClick={onClickBack} />
          <div>
            <div className={s.description}>
              <h2 className={s.title}>{data.title}</h2>
              <p className={s.body}>{data.body}</p>
              <h3 className={s.commentTitle}>Comments</h3>
              <ul>
                {data.comments.map((comment) => (
                  <li key={comment.id} className={s.comment}>
                    {comment.body}
                  </li>
                ))}
              </ul>
            </div>
            <form onSubmit={handleSubmit} className={s.form} autoComplete='off'>
              <label className={s.label}>
                <input
                  className={s.input}
                  type='text'
                  name='comment'
                  value={body}
                  autoComplete='off'
                  placeholder='Write your comment'
                  onChange={(e) => setBody(e.target.value)}
                />
              </label>
              <Button
                type='submit'
                title='Add comment'
                onClick={(e) => {
                  handleCreateComment();
                }}
                disabled={isLoading}
              />
            </form>
            <div className={s.btnBox}>
              <Button
                type='button'
                title={isDeleting ? "Deleting..." : "Delete"}
                onClick={(e) => {
                  deletePost(data.id);
                  onClickBack();
                }}
                disabled={isDeleting}
              />
              <Link
                to={{
                  pathname: "update",
                }}
                state={location.state}
              >
                <Button type='button' title='update' />
              </Link>
            </div>
            <Suspense fallback={<Loader />}>
              <Routes>
                <Route
                  path='update'
                  element={<CreatePostPage btnTitle='update' id={data.id} />}
                />
              </Routes>
            </Suspense>
          </div>
        </>
      )}
    </>
  );
}
