import React, { useState } from 'react';
import './App.css'

const App = () => {
    const [boards, setBoards] = useState([
        { id: 1, title: "ToDo", items: [{ id: 1, title: 'Rest in the Ukrainian Crimea' }, { id: 2, title: 'Eat' }, { id: 3, title: 'Go to sleep' }] },
        { id: 2, title: "In Progress", items: [{ id: 4, title: 'Destroy rUSSIA' }, { id: 5, title: 'Burn mOSCOW' }, { id: 6, title: 'Destroy pUTIN' }] },
        { id: 3, title: "Done", items: [{ id: 7, title: 'Sink the cruiser mOSCOW' }, { id: 8, title: 'Free Kherson' }, { id: 9, title: 'Pet the cat' }] },
    ])

    const [currentBoard, setCurrentBoard] = useState(null)
    const [currentItem, setCurrentItem] = useState(null)
    const dragOverHandler = (e) => {
        e.preventDefault()
        if (e.target.className === 'item') {
            e.target.style.boxShadow = '0 4px 3px gray'
        }
    }
    const dragLeaveHandler = (e) => {
        e.target.style.boxShadow = 'none'
    }
    const dragStartHandler = (e, board, item) => {
        setCurrentBoard(board)
        setCurrentItem(item)
    }
    const dragEndHandler = (e) => {
        e.target.style.boxShadow = 'none'
    }
    const dropHandler = (e, board, item) => {

        e.stopPropagation()

        e.preventDefault()
        const currentIndex = currentBoard.items.indexOf(currentItem)
        currentBoard.items.splice(currentIndex, 1)
        const dropIndex = board.items.indexOf(item)
        board.items.splice(dropIndex + 1, 0, currentItem)
        setBoards(boards.map(b => {
            if (b.id === board.id) {
                return board
            }
            if (b.id === currentBoard.id) {
                return currentBoard
            }
            return b
        }))
        e.target.style.boxShadow = 'none'
    }
    const dropCardHandler = (e, board) => {
        board.items.push(currentItem)
        const currentIndex = currentBoard.items.indexOf(currentItem)
        currentBoard.items.splice(currentIndex, 1)
        setBoards(boards.map(b => {
            if (b.id === board.id) {
                return board
            }
            if (b.id === currentBoard.id) {
                return currentBoard
            }
            return b
        }))
        e.target.style.boxShadow = 'none'
    }
    return (
            <div className='dnd'>
                {boards.map(board =>
                    <div
                        className='board'
                        onDragOver={(e) => dragOverHandler(e)}
                        onDrop={(e) => dropCardHandler(e, board)}
                    >
                        <div className='board__title'>{board.title}</div>
                        {board.items.map(item =>
                            <div
                                onDragOver={(e) => dragOverHandler(e)}
                                onDragLeave={(e) => dragLeaveHandler(e)}
                                onDragStart={(e) => dragStartHandler(e, board, item)}
                                onDragEnd={(e) => dragEndHandler(e)}
                                onDrop={(e) => dropHandler(e, board, item)}
                                // className="todo"
                                draggable={true}
                                className='item'
                            >
                                {item.title}</div>)}
                    </div>
                )}
            </div>
    );
}

export default App;
