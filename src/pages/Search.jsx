import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import SearchBar from "../components/SearchBar.jsx";
import styles from "./Search.module.css";

function Search() {
    const [searchParams] = useSearchParams();
    const keyword = searchParams.get("keyword");

    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!keyword) return;

        setList([]);
        setError("");

        fetch(`https://www.omdbapi.com/?apikey=6a0a8eb4&s=${keyword}`)
            .then(res => res.json())
            .then(json => {
                setList(json.Search);
            })
            .catch(err => {
                console.log(err);
                setError("검색하는데 오류가 발생하였습니다");
            })
            .finally(() => setLoading(false));
    }, [keyword]);

    return (
        <div className={styles.container}>
            <h2>검색 키워드 : {keyword}</h2>
            <SearchBar keyword={keyword} />
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <div className={styles.body}>
                {list.map((item, index) => (
                    <Link key={index} to={`/detail/${item.imdbID}`} className={styles.Link}>
                        {item.Poster ? (
                            <img src={item.Poster} alt={item.Title} className={styles.cover} />
                        ) : (
                            <div className={styles.no_cover}>No Cover</div>
                        )}

                        <div>
                            <div className={styles.title}>{item.Title}</div>
                            <div className={styles.authors}>{item.Year}</div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Search;
