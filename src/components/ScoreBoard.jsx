import '../App.css'

export default function ScoreBoard(props) {
    return (
        <div className="score-board">
            {props.index == 0 ? 'Player: ' + (props.index + 1) : 'player no: ' + (props.index + 1)}
            <h2>{props.time}</h2>
            <h2>{props.rolls}</h2>
        </div>
    )
}