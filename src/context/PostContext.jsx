import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const PostContext = createContext();

export function PostProvider({ children }) {
  const [posts, setPosts] = useState(null);
  const navigate = useNavigate();

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
    axios
      .post("/posts", newPost)
      .then(() => {
        const clone = [...posts];
        clone.unshift(newPost);
        setPosts(clone);
      })
      .catch((err) => {
        toast.error("Post gönderme başarısız");
      });
  };

  const deletePost = (delete_id) => {
    axios.delete(`/posts/${delete_id}`).then(() => {
      const filtred = posts.filter((i) => i.id !== delete_id);
      setPosts(filtred);
      navigate("/");
    });
  };

  const updatePost = (post) => {
    axios.put(`/posts/${post.id}`, post).then(() => {
      const updated = posts.map((i) => (i.id === post.id ? post : i));
      setPosts(updated);
    });
  };

  return (
    <PostContext.Provider value={{ posts, addPost, deletePost, updatePost }}>
      {children}
    </PostContext.Provider>
  );
}
