import { useState } from "react";
import {
  useCreatePostMutation,
  useUpdatePostMutation,
} from "../../redux/posts/postSlice";
import { alert } from "@pnotify/core";
import Loader from "../Loader";
import Button from "../Button";
import s from "./CreatePostPage.module.css";
import { useNavigate } from "react-router-dom";

const CreatePostPage = ({ header, btnTitle, id }) => {
  const [createPost, { isLoading }] = useCreatePostMutation();
  const [updatePost] = useUpdatePostMutation();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const navigation = useNavigate();

  const handleCreatePost = async () => {
    if ((title, body)) {
      await createPost({
        title,
        body,
      }).unwrap();
      setTitle("");
      setBody("");
      alert({
        type: "success",
        text: "Post was created",
      });
    }
  };

  const handleUpdatePost = async () => {
    if ((title, body)) {
      await updatePost({
        id,
        title,
        body,
      }).unwrap();
      setTitle("");
      setBody("");
      alert({
        type: "success",
        text: "Post was updated",
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title === "" || body === "") {
      alert({
        type: "error",
        text: "Fill in the required data",
      });
      return;
    }
    navigation("/");
  };

  return (
    <>
      {isLoading && <Loader />}
      <div>
        <h1 className={s.title}>{header}</h1>

        <form onSubmit={handleSubmit} className={s.form} autoComplete='off'>
          <label className={s.label}>
            <input
              placeholder='Title'
              className={s.input}
              type='text'
              name='title'
              value={title}
              autoComplete='off'
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>

          <label className={s.label}>
            <input
              placeholder='Your story'
              className={s.input}
              type='text'
              name='body'
              value={body}
              autoComplete='off'
              onChange={(e) => setBody(e.target.value)}
            />
          </label>
          <Button
            type='submit'
            title={btnTitle}
            onClick={
              btnTitle === "update" ? handleUpdatePost : handleCreatePost
            }
          />
        </form>
      </div>
    </>
  );
};

export default CreatePostPage;
