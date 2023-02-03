import '../App.css'

export default function Score() {
    const scoreStyle = {
        position: 'absolute',
        top: '1em',
        left: '1em',
        minHeight: '50px',
        minWidth: '80px',
        backgroundColor: 'blue',
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