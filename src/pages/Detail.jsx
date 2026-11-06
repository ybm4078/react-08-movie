import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { Container } from "./Home.jsx";
import styled from "styled-components";

const BackBtn = styled.button`
    display: block;
    margin-bottom: 20px;
    background: none;
    border: none;
    color: #ff5959;
    font-size: 16px;
    cursor: pointer;
    padding: 0;

    &:hover {
        text-decoration: underline;
    }
`;

const Plot = styled.p`
    line-height: 1.6;
    margin-top: 20px;
`;
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
        return <div>Loading...</div>;
    }

    return (
        <Container>
            <BackBtn
                onClick={() => {
                    // 사용자를 이동시키기 위해 뭘 써야되느냐
                    navigate(-1);
                }}>
                &larr; Back
            </BackBtn>
            <h2>{list.title}</h2>
            {list.Poster ? <img src={list.Poster} alt={list.Title} /> : <div>No Cover</div>}
            <div>
                <div>{list.Title}</div>
                <div>
                    <span>Year:</span> {list.Year}
                </div>
                <div>
                    <span>Genre:</span> {list.Genre}
                </div>
                <div>
                    <span>Director:</span> {list.Director}
                </div>
                <br />
                <Plot>{list.Plot}</Plot>
            </div>
        </Container>
    );
}

export default Detail;
