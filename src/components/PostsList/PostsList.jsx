import { Link, useLocation } from "react-router-dom";
import React from "react";

import s from "./PostsList.module.css";

const PostsList = ({ posts }) => {
  const location = useLocation();
  return (
    <ul className={s.list}>
      {posts.map(
        (post) =>
          post.title && (
            <li key={post.id} className={s.item}>
              <Link
                className={s.link}
                to={`/posts/${post.id}`}
                state={{
                  from:
                    location.pathname === "/"
                      ? "/"
                      : "/posts" + location.search,
                }}
              >
                <h2 className={s.title}>{post.title}</h2>
              </Link>
            </li>
          )
      )}
    </ul>
  );
};

export default PostsList;
