import '../App.css'

export default function Score() {
    const scoreStyle = {
        position: 'absolute',
        top: '1em',
        left: '1em',
        minHeight: '3em',
        minWidth: '5em',
        backgroundColor: '#4cbad877',
        borderRadius: '0.3em'
    }
    return (
        <div
            className="score"
            style={scoreStyle}
        >

        </div>
    )
}