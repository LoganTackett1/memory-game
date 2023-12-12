import './Card.css';

function Card ({losses,setLosses,clickSetter,score,src,id,clicked,scoreSetter}) {
    function handleClick () {
        if (clicked.includes(id)) {
            scoreSetter(0);
            setLosses(losses + 1);
            clickSetter([]);
        } else {
            scoreSetter(score+1);
            clickSetter([...clicked,id]);
        }
    }

    const cssStyle = {
        backgroundImage: `url(${src})`
    }

    return (
        <div className='card' onClick={handleClick} style={cssStyle}>
        </div>
    )
}

export default Card;