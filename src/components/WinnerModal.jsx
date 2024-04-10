
export const WinnerModal = ({winner, resetBoard}) => {

    if(winner === null) {return null}

    const winnerText = winner ? `${winner} is the winner` : 'No winners 😥'

    return ( 
        <section className="winner">
            <div className="win">
                <span className="text">
                    {winnerText}
                    <button className="Reset" onClick={resetBoard}>
                            Reset
                    </button>
                </span>
            </div>
        </section>
    )
}