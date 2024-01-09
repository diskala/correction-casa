import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import './style.scss'

export default function Home() {
    const [logements, setLogements] = useState([])

    useEffect(() => {
        fetch("https://titi.startwin.fr/logements")
            .then(res => res.json())
            .then(data => setLogements(data))
    }, [])


    return (
        <div className="home">
            <div className="background">
                <img src="/background.jpg" alt="background" />
                <div>
                    <h1>Chez vous, partout et ailleurs</h1>
                </div>
            </div>
            <div className="list">
                {logements.map((logement) => (
                    <Link to={"/logement/" + logement.id} className="card">
                        <img src={logement.cover} alt={logement.title} />
                        <div>
                            <h2>{logement.title}</h2>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}