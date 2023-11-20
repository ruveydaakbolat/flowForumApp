import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const PostContext = createContext();

export function PostProvider({ children }) {
  const [posts, setPosts] = useState(null);

  const getData = () => {
    axios.get("posts?_sort=date&_order=desc").then((res) => setPosts(res.data));
  };

  useEffect(() => {
    getData();
    const interval = setInterval(() => {
      getData();
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const addPost = (newPost) => {
    const clone = [...posts];
    clone.unshift(newPost);
    setPosts(clone);
  };

  return (
    <PostContext.Provider value={{ posts, addPost }}>
      {children}
    </PostContext.Provider>
  );
}
