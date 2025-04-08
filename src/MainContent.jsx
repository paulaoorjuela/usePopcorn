import ListBox from "./main-content-components/ListBox";
import WatchedBox from "./main-content-components/WatchedBox";

export default function MainContent({movies}) {
    return (
    <main className="main">
        <ListBox movies={movies}/>
        <WatchedBox />
    </main>
    );
}
