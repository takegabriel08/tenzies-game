import '../App.css'

function Die(props) {
    return (
        <div className="die-face">
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
