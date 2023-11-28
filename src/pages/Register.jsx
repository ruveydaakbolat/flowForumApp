import { Link } from "react-router-dom"
import InputArea from "../components/InputArea"
import { v4 } from "uuid";
import { useContext } from "react";
import { UserContext } from "../context/UserContext.jsx";

const Register = () => {
    const {signup} = useContext(UserContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const formData = Object.fromEntries(form.entries());

        const strImage = await imageToString(formData.image);

        if(strImage) {
            const newUser = {...formData, image:strImage, id: v4()};

            signup(newUser);

        }
    }

    const imageToString = (file) => {
        if (file.type === "image/jpeg" || file.type === "image/png") {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);

                reader.onload = () => {
                    resolve(reader.result);
                }
            })

        } else {
            alert("Lütfen geçerli bir dosya tipi giriniz: jpeg/png");
        }
    }
    return (
        <section className="bg-gray-900">
            <div className="h-screen flex flex-col items-center justify-center px-6 py-8 lg:py-0">
                <Link className="flex items-center mb-6 text-2xl">
                    <img className="w-8 h-8 mr-2" src="/logoo.svg" alt="" />
                    <span className="text-white text-2xl">Flow</span>
                </Link>

                <div className="text-white w-full bg-gray-800 border border-gray-700 rounded-lg shadow sm:max-w-md">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold">Flow</h1>
                        <form onSubmit={handleSubmit}>
                            <InputArea label={'İsim'} holder={'örn:ahmet'} name={'name'} type={'text'} />
                            <InputArea label={'Email'} holder={'deneme@sirket.com'} name={'email'} type={'email'} />
                            <InputArea label={'Şifre'} holder={'••••••••••'} name={'password'} type={'password'} />
                            <InputArea label={'Profil Fotoğrafı'} holder={'örn:ahmet'} name={'image'} type={'file'} />

                            <button className="my-4 w-full bg-blue-600 hover:bg-blue-700 font-medium rounded-lg px-5 py-2.5 text-sm">Kaydol</button>

                            <p className="text-sm text-gray-400">
                                Hesabınız var mı?
                                <Link className="mx-2 text-white" to={"/login"}>Giriş Yap</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Register