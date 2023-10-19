import ThemeButton from "../../components/theme-button";
//Just for testing light and dark themes
export default function Home() {
    return (
        <section className="py-24">
            <div className="container">
                <h1 className="text-3x1 font-bold">Home</h1>
                <ThemeButton />
            </div>
        </section>
    )
}