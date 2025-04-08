import ListBox from "./main-content-components/ListBox";
import WatchedBox from "./main-content-components/WatchedBox";

export default function MainContent() {
    return (
    <main className="main">
        <ListBox />
        <WatchedBox />
    </main>
    );
}
