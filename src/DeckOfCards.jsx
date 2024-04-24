import React, { useState, useEffect, useRef } from 'react';

const DeckOfCards = () => {
    const [currentCard, setCurrentCard] = useState(null);
    const [isDeckEmpty, setIsDeckEmpty] = useState(false);
    const [isDrawing, setIsDrawing] = useState(false);
    const intervalRef = useRef(null);

    useEffect(() => {
        fetch('https://deckofcardsapi.com/api/deck/new/draw/?count=1')
            .then(response => response.json())
            .then(data => {
                setCurrentCard(data.cards[0]);
            })
            .catch(error => console.error(error));
    }, []);



    const toggleDrawing = () => {
        if (isDrawing) {
            clearInterval(intervalRef.current);
            setIsDrawing(false);
        } else {
            intervalRef.current = setInterval(() => {
                if (isDeckEmpty) {
                    clearInterval(intervalRef.current);
                    alert("Error: no cards remaining!");
                    setIsDrawing(false);
                    return;
                }

                fetch('https://deckofcardsapi.com/api/deck/new/draw/?count=1')
                    .then(response => response.json())
                    .then(data => {
                        setCurrentCard(data.cards[0]);
                    })
                    .catch(error => console.error(error));
            }, 1000);
            setIsDrawing(true);
        }
    };

    return (
        <div>

            {currentCard && <h2>{currentCard.value}</h2>}

            <button onClick={toggleDrawing}>
                {isDrawing ? 'Stop Drawing' : 'Start Drawing'}
            </button>
            {isDeckEmpty && <p>Error: no cards remaining!</p>}
        </div>
    );
};

export default DeckOfCards;


