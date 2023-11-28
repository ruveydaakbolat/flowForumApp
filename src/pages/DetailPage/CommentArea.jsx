import { useContext, useState } from "react";
import { IoIosSend } from "react-icons/io";
import { UserContext } from "../../context/UserContext";
import { v4 } from "uuid";
import axios from "axios";
import CommentCard from "./CommentCard";

const CommentArea = ({ post, comments, setComments }) => {
  const { activeUser } = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const author = { ...activeUser };
    delete author.password;

    const newComment = {
      author,
      text: e.target[0].value,
      date: new Date(),
      id: v4(),
    };

    const tempComments = [...comments, newComment];

    axios
      .patch(`/posts/${post.id}`, { comments: tempComments })
      .then(() => setComments(tempComments));

      e.target[0].value = '';
  };

  const handleDelete = (comment_id) => {
    const filtred = comments.filter((i) => i.id !== comment_id);

    axios
      .patch(`/posts/${post.id}`, { comments: filtred })

      .then(() => {
        setComments(filtred);
      });
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex gap-2 bg-gray-800 rounded-xl my-5 p-4"
      >
        <input
          className="w-full rounded p-2 text-black"
          placeholder="yorumunuzu giriniz..."
          type="text"
          required
        />
        <button className="bg-blue-600 rounded p-2 flex items-center gap-1">
          <IoIosSend className="text-lg" />
        </button>
      </form>

      <section className="flex flex-col gap-10 w-full">
        {comments?.map((data) => {
          const isOwn = activeUser?.id === data?.author?.id;

          return (
            <CommentCard
              handleDelete={handleDelete}
              data={data}
              key={data.id}
              isOwn={isOwn}
            />
          );
        }).reverse()}
      </section>
    </>
  );
};

export default CommentArea;
