import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import Header from "../../components/Header/index";
import ResetModal from "./ResetModal";
import ConfirmModal from "../../components/ConfirmModal";

const Profile = () => {
  const { activeUser, deleteAccount } = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  return (
    <>
      <div className="h-screen bg-gray-900 overflow-hidden">
        <Header />

        {!activeUser ? (
          <div>Yükleniyor...</div>
        ) : (
          <div className="h-full text-white grid place-items-center">
            <div className="flex flex-col gap-5 text-center">
              <img
                className="h-32 w-32 rounded-full mx-auto"
                src={activeUser.image}
                alt="profile-pic"
              />
              <h2>
                <span className="font-bold">Kullanıcı İsmi: </span>
                <span className="text-xl">{activeUser.name}</span>
              </h2>

              <p>
                <span className="font-bold">E-Posta: </span>
                <span className="text-xl">{activeUser.email}</span>
              </p>

              <button
                onClick={() => {
                  setShowModal(true);
                }}
                className="bg-blue-600 rounded px-10 py-2 text-base font-normal hover:bg-blue-500"
              >
                Şifreyi Değiştir
              </button>

              <button
                onClick={() => setIsConfirmOpen(true)}
                className="bg-red-600 rounded px-10 py-2 text-base font-normal hover:bg-red-500"
              >
                Hesabı Sil
              </button>
            </div>
          </div>
        )}

        {showModal && (
          <ResetModal
            id={activeUser?.id}
            close={() => {
              setShowModal(false);
            }}
          />
        )}

        {isConfirmOpen && (
          <ConfirmModal
            text="Hesabını Sil"
            close={() => setIsConfirmOpen(false)}
            handleConfirm={deleteAccount}
          />
        )}
      </div>
    </>
  );
};

export default Profile;
