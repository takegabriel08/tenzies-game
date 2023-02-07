import '../App.css'

export default function Score(props) {
    console.log("score", props)
    const scoreStyle = {
        position: 'absolute',
        top: '1em',
        left: '1em',
        minHeight: '3em',
        minWidth: '5em',
        backgroundColor: '#4cbad877',
        borderRadius: '0.3em',
    }

    return (
        <div
            className="score"
            style={scoreStyle}
        >
            Score
            <h3 className="clicks">rolls: {props.clicks}</h3>
            <h3 className="time">time: {props.minutes}:{props.seconds}</h3>
            <br />
        </div>
    )
}