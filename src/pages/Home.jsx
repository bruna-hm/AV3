export default function Home({ usuario }) {
    return (
        <div className="flex-1 flex flex-col items-center justify-center">
            <p>__!__</p>
            <p className="mb-4">^----o--(_)--o----^</p>
            <h2 className="font-bold text-3xl mb-4">
                Bem-vindo(a), <span className="text-3xl text-indigo-400">{usuario}</span>!
            </h2>
        </div>
    );
}
