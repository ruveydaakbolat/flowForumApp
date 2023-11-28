import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

axios.defaults.baseURL = 'http://localhost:3000';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [activeUser, setActiveUser] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        const user_id = localStorage.getItem('token');
        if (user_id) {
            axios.get(`/users/${user_id}`)
                .then((res) => setActiveUser(res.data))
                .catch((err) => toast.error("Kullanıcı bilgileri alınamadı"))
        }
    }, []);

    const signup = (user) => {
        axios.post('/users', user)
            .then(() => {
                localStorage.setItem("token", user.id);
                setActiveUser(user);
                navigate('/');
                toast.success('Hesabınız oluşturuldu')
            })
            .catch(() => { toast.error("Hesap oluşturulurken bir hata oluştu :(") });
    };

    const login = (user) => {
        const params = {
            ...user,
            _limit: 1
        };

        axios.get(`/users`, { params })
            .then((res) => {
                if (res.data.length === 0) {
                    toast.error('Bilgilerinizle eşleşen kullanıcı bulunamadı');
                } else {
                    setActiveUser(res.data[0]);
                    localStorage.setItem('token', res.data[0].id)
                    navigate('/');
                    toast.success('Hesaba giriş yapılıyor...');
                }
            })
            .catch((err) => console.log(err))
    };

    const logout = () => {
        localStorage.removeItem('token');
        setActiveUser(null);
        navigate('/login');
    };

    const deleteAccount = () => {
        axios.delete(`/users/${activeUser.id}`)
            .then(() => { logout(); toast.info('Hesabınız başarıyla kaldırıldı') })
        .catch (() => toast.error("Hesap silme başarısız"))
    }

    const updatePassword = () => {
        navigate('/modal')
    }

return <UserContext.Provider value={{ activeUser, signup, login, logout, deleteAccount, updatePassword }}>
    {children}
</UserContext.Provider>
}