import '../App.css'

export default function Score(props) {
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
            <h3 className="clicks">clicks: {props.clicks}</h3>
            <h3 className="time">time: {props.time}</h3>
        </div>
    )
}