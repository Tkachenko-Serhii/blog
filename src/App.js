import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Header from "./components/Header";
import Loader from "./components/Loader";
import Error from "./components/Error";

const Home = lazy(() =>
  import("./components/views/Home" /* webpackChunkName: "home-page" */)
);

const PostDetailsPage = lazy(() =>
  import(
    "./components/views/PostDetailsPage" /* webpackChunkName: "post-details" */
  )
);

const CreatePostPage = lazy(() =>
  import("./components/CreatePostPage" /* webpackChunkName: "post-create" */)
);

export default function App() {
  return (
    <div className='container'>
      <Header />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path='/*' element={<Home />} />
          <Route path='/posts/:id/*' element={<PostDetailsPage />} />
          <Route
            path='create'
            element={
              <CreatePostPage
                header='Create new post'
                btnTitle='create'
              ></CreatePostPage>
            }
          />
          <Route path='*' element={<Error />} />
        </Routes>
      </Suspense>
    </div>
  );
}
