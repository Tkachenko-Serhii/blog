import { useFetchPostsQuery } from "../../redux/posts/postSlice";
import PostsList from "../PostsList";
import Loader from "../Loader";
import s from "./Home.module.css";

export default function Home() {
  const { data = [], isFetching } = useFetchPostsQuery();
  return (
    <>
      {isFetching && <Loader />}
      <h1 className={s.title}>BLOG</h1>
      <PostsList posts={data}></PostsList>
    </>
  );
}
