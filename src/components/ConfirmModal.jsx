import React from "react";
import { IoIosWarning } from "react-icons/io";

const ConfirmModal = ({ handleConfirm, close, text = "Elemanı Sil" }) => {
  return (
    <div className="fixed w-full h-screen top-0 left-0 grid place-items-center bg-black bg-opacity-40">
      <div className="flex flex-col m-5 gap-[24px] p-[30px] p-md-[60px] bg-white text-black rounded-lg">
        <h2 className="text-center font-bold text-2xl">{text}</h2>
        <p>İçerik kalıcı olarak silinecektir. Emin Misiniz?</p>

        <div className="bg-red-100 border-l-8 border-red-700 p-3">
          <div className="flex items-center gap-3">
            <IoIosWarning className="text-xl" />
            <span className="font-bold">Uyarı</span>
          </div>
          <p>Bu içeriği silerseniz tekrardan erişemeyeceksiniz.</p>
        </div>

        <div className="flex justify-between">
          <button
            onClick={close}
            className="px-[20px] py-[14px] bg-black text-white hover:bg-gray-700"
          >
            Hayır, İptal
          </button>
          <button
            className="px-[20px] py-[13px] border border-black hover:bg-red-500 hover:text-white hover:border-0"
            onClick={() => {
              handleConfirm();
              close();
            }}
          >
            Evet, Onayla
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
