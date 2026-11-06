import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import styles from "./Detail.module.css";

function Detail() {
    const navigate = useNavigate();

    const { id } = useParams();

    const [list, setList] = useState(null);

    useEffect(() => {
        fetch(`https://www.omdbapi.com/?apikey=6a0a8eb4&i=${id}&plot=full`)
            .then(res => res.json())
            .then(json => setList(json))
            .catch(err => console.log(err));
    }, []);

    if (!list) {
        return <div className={styles.container}>Loading...</div>;
    }

    return (
        <div className={styles.container}>
            <button
                className={styles.backBtn}
                onClick={() => {
                    // 사용자를 이동시키기 위해 뭘 써야되느냐
                    navigate(-1);
                }}>
                &larr; Back
            </button>
            <h2>{list.title}</h2>
            {list.Poster ? (
                <img className={styles.cover} src={list.Poster} alt={list.Title} />
            ) : (
                <div className={styles.no_cover}>No Cover</div>
            )}
            <div className={styles.d1}>
                <div className={styles.title}>{list.Title}</div>
                <div className={styles.authors}>
                    <span>Year:</span> {list.Year}
                </div>
                <div>
                    <span>Genre:</span> {list.Genre}
                </div>
                <div>
                    <span>Director:</span> {list.Director}
                </div>
                <br />
                <p>{list.Plot}</p>
            </div>
        </div>
    );
}

export default Detail;
