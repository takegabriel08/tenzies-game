import '../App.css'

function Die(props) {
    // console.log(props)
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }
    console.log(`${JSON.stringify(styles)} ${props.isHeld}`)
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
