import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PostCard from "../MainPage/PostCard";
import Loading from "../../components/Loading";
import CommentArea from "./CommentArea";
import { IoCaretBackOutline } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import ConfirmModal from "../../components/ConfirmModal";
import { PostContext } from "../../context/PostContext";
import { UserContext } from "../../context/UserContext";
import UpdatedModal from "../../components/UpdatedModal";

const DetailPage = () => {
  const { deletePost, updatePost } = useContext(PostContext);
  const { activeUser } = useContext(UserContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState();
  const [comments, setComments] = useState();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  useEffect(() => {
    axios.get(`/posts/${id}`).then((res) => {
      setPost(res.data);
      setComments(res.data.comments);
    });
  }, []);

  const handleEditSave = (data) => {
    const updated = {...post, ...data};

    updatePost(updated)
    setPost(updated);
    setIsEditOpen(false);
  }

  const isOwn = post && activeUser && post.author.id === activeUser.id;

  return (
    <div>
      <div className="flex justify-between items-center">
        <button
          className="my-4 flex gap-1 items-center hover:bg-gray-700 p-1 px-2 rounded"
          onClick={() => navigate(-1)}
        >
          <IoCaretBackOutline /> Geri
        </button>

        {isOwn && (
          <div className="flex gap-5">
            <button
              onClick={() => setIsEditOpen(true)}
              className="px-2 flex items-center gap-1 bg-blue-500 p-1 rounded-lg"
            >
              <FaEdit /> Düzenle
            </button>
            <button
              onClick={() => setIsConfirmOpen(true)}
              className="px-2 flex items-center gap-1 bg-red-500 p-1 rounded-lg"
            >
              <MdDelete /> Sil
            </button>
          </div>
        )}
      </div>

      {!post ? <Loading /> : <PostCard post={post} />}

      <CommentArea comments={comments} setComments={setComments} post={post} />

      {isConfirmOpen && (
        <ConfirmModal
          close={() => setIsConfirmOpen(false)}
          text="Gönderiyi Sil"
          handleConfirm={() => deletePost(id)}
        />
      )}

      {isEditOpen && <UpdatedModal post={post} close={() => setIsEditOpen(false)} handleSave={handleEditSave}/>}
    </div>
  );
};

export default DetailPage;
