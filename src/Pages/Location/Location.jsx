import './style.scss'
import { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

export default function Location() {
    const { id } = useParams()
    const [logement, setLogement] = useState({
        tags: [],
        pictures: ['']
    })
    const [stars, setStars] = useState([])
    // Index me sert de repère pour le tableau d'image a afficher pour le diapo
    // Je commence à 0, car les tableaux commencent à 0 et non 1
    const [index, setIndex] = useState(0)

    useEffect(() => {
        fetch(`https://titi.startwin.fr/logements/${id}`)
            .then(res => res.json())
            .then(data => {
                setLogement(data)
                for (let i = 0; i < 5; i++) {
                    if (i < data.rating) {
                        setStars(current => [...current, 'fa-solid fa-star'])
                    } else {
                        setStars(current => [...current, 'fa-solid fa-star empty'])
                    }
                }
            })
    }, [])

    const previous = () => {
        // Si, quand je retire 1 a mon index pour afficher l'image précédente
        // le resultat est inférieur à 0 (donc le premier element de mon tableau)
        if (index - 1 < 0) {
            // Alors je repart de la fin de mon tableau 
            // Que je récupère en prenant le nombre d'element de mon tableau (.length)
            // et en retirant 1, car on commence à compte de 0 et pas 1
            // Sinon il va mettre en index 5 par exemple, car il y a 5 elements dans mon tableau
            // Mais les elements sont 0=> 1=> 2=> 3=> 4=> (ce qui fait 5 elements)
            setIndex(logement.pictures.length - 1)
        } else {
            // Sinon, je retire simplement 1 a mon index pour afficher l'image précédente
            setIndex(index - 1)
        }
    }

    const next = () => {
        console.log('next')
        // Si quand je veux afficher l'image suivante (avec index +1)
        // mon index est superieur ou égale au nombre d'element du tableau
        // alors nous avons dépassé le dernier element du tableau et donc
        // on reviens a 0, le premier element afin de faire une boucle
        if (index + 1 >= logement.pictures.length) {
            setIndex(0)
        } else {
            // Sinon on passe a la slide suivante
            setIndex(index + 1)
        }
    }


    return (
        <div className='logement'>
            <section className='gallery'>
                {/* Quand je click sur ma fleche de gauche, je lance ma fonction previous */}
                <i class="fa-solid fa-angle-left" onClick={previous}></i>
                {/* J'affiche l'image correspondant à l'index depuis mon tableau pictures */}
                <img src={logement.pictures[index]} alt={logement.title} />
                {/* Quand je click sur ma fleche de droite, je lance ma fonction next */}
                <i class="fa-solid fa-angle-right" onClick={next}></i>
                <span>{index + 1}/{logement.pictures.length}</span>
            </section>
            <section className="info">
                <div className="titles">
                    <h1>{logement.title}</h1>
                    <p>{logement.location}</p>
                </div>
                <div className="owner">
                    <h2>{logement.host?.name}</h2>
                    <img src={logement.host?.picture} alt={logement.host?.name} />
                </div>
            </section>
            <section className="stats">
                <div className='tags'>
                    {logement.tags.map((tag) => (
                        <span>{tag}</span>
                    ))}
                </div>
                <div className='stars'>
                    {stars.map(star => (
                        <i className={star}></i>
                    ))}
                </div>
            </section>
        </div>
    )
}