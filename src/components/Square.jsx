
// eslint-disable-next-line react/prop-types
export default function Square({children, isSelected, updateBoard, index}) {

    const sClassName = `${isSelected ? 'is-selected' : ''}`
    
    const handleClick = () => {
        updateBoard(index)
    }

    return (
        <div onClick={handleClick} className={`square ${sClassName}`}>
            {children}
        </div>
    )
}