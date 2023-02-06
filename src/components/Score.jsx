import '../App.css'

export default function Score(props) {
    // console.log("score", props)
    const scoreStyle = {
        position: 'absolute',
        top: '1em',
        left: '1em',
        minHeight: '3em',
        minWidth: '5em',
        backgroundColor: '#4cbad877',
        borderRadius: '0.3em',
    }

    // const scoreElements = props.userScores.map((el, idx) => {
    //     return (
    //         <div className="score-container">
    //             {idx}
    //             <h2>{el.userScore.time}</h2>
    //             <h2>{el.userScore.rolls}</h2>
    //         </div>
    //     )
    // })

    return (
        <div
            className="score"
            style={scoreStyle}
        >
            Score
            <h3 className="clicks">clicks: {props.clicks}</h3>
            <h3 className="time">time: {props.minutes}:{props.seconds}</h3>
            <br />
            <div className="score-list">
                High scores:
                {/* {scoreElements} */}
            </div>
        </div>
    )
}