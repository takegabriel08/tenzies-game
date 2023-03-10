import '../App.css'

function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }
    return (
        <div
            className="die-face"
            style={styles}
            onClick={props.holdDice}
        >
            <div className="dienum-container">
                <img src={`src/assets/${props.value}.svg`} className='die-num' alt="" />
            </div>
        </div>
    )
}

export default Die
