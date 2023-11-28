import React from "react";
import { categories } from "../constant";

const UpdatedModal = ({ post, close, handleSave }) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    const form = new FormData(e.target);
    const data = Object.fromEntries(form.entries());

    handleSave(data);
  };
  return (
    <div className="fixed w-full h-screen top-0 left-0 grid place-items-center bg-black bg-opacity-40">
      <div className="rounded-xl bg-gray-800 px-[32px] py-[22px] sm:min-w-[400px]">
        <div className="flex justify-between mb-[32px]">
          <h2 className="font-medium text-xl">İçeriği Düzenle</h2>
          <button className="text-xl" onClick={close}>
            x
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-[24px]">
          <div className="flex flex-col gap-[16px]">
            <label>Başlık</label>
            <input
              name="title"
              defaultValue={post.title}
              className="p-[10px] rounded-lg text-black"
              placeholder=""
              type="text"
              required
            />
          </div>

          <div className="flex flex-col gap-[16px]">
            <label>Kategori</label>
            <select
              name="category"
              defaultValue={post.category}
              className="p-[10px] rounded-lg text-black"
            >
              {categories.map((i) => (
                <option key={i.title}>{i.title}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-[16px]">
            <label>İçerik</label>
            <textarea
              name="content"
              defaultValue={post.content}
              className="p-[10px] rounded-lg text-black max-h-[300px] min-h-[200px]"
              required
            />
          </div>

          <button type="submit" className="bg-blue-600 p-2 rounded-xl">
            Değişiklikleri Kaydet
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatedModal;
