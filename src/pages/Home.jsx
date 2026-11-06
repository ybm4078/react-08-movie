import SearchBar from "../components/SearchBar.jsx";
import styles from "./Home.module.css";

function Home() {
    return (
        <div className={styles.container}>
            <span className={styles.title}>Movie 검색</span>
            <SearchBar />
        </div>
    );
}
export default Home;