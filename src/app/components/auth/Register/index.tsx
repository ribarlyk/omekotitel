'use client'
import { useAuthenticate } from "@/src/app/hooks/useAuthentication"

export default function Register() {
    const { handleRegister } = useAuthenticate()
    return (
        <>
            <h2>Регистрация</h2>
            <form className="flex flex-col" onSubmit={handleRegister}>
                <section>
                    <h3>Лична информация</h3>
                    <div className="flex flex-row">
                        <label htmlFor="name" className="mr-8"> Име
                        </label>
                        <input type="text" name="name" />
                    </div>
                    <div className="flex flex-row">
                        <label htmlFor='lastname' className="mr-8"> Фамилия
                        </label>
                        <input type="text" name="lastname" />
                    </div>
                </section>
                <section>
                    <h3>Информация за регистриране</h3>
                    <div className="flex flex-row">
                        <label htmlFor="email" className="mr-8"> Имейл
                        </label>
                        <input type="email" name="email" />
                    </div>
                    <div className="flex flex-row">
                        <label htmlFor='password' className="mr-8"> Парола
                        </label>
                        <input type="password" name="password" />
                    </div>
                    <div className="flex flex-row">
                        <label htmlFor='repass' className="mr-8"> Потвърдете паролата
                        </label>
                        <input type="password" name="repass" />
                    </div>
                </section>
                <input
                    type="checkbox"
                    name="is_subscribed"
                    className="flex gap-2"
                    value={'false'}
                />
                <button>Регистрирай ме</button>
            </form>
        </>
    )
}