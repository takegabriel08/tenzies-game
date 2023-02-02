import '../App.css'

function Die(props) {
    // console.log(props)
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
                <h1
                    className='die-num'
                >
                    {props.value}
                </h1>
            </div>
        </div>
    )
}

export default Die
