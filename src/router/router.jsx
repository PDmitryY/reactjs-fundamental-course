import About from "../pages/About";
import NotFound from "../pages/NotFound";
import PostPage from "../pages/PostPage";
import Posts from "../pages/Posts";

export const routes = [
  {path: '/about', component: About, exact: true},
  {path: '*', component: NotFound, exact: true},
  {path: '/posts', component: Posts, exact: true},
  {path: '', component: Posts, exact: true},
  {path: '/posts/:id', component: PostPage, exact: true},
]