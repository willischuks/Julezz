import React, { useState, useMemo, useRef } from 'react'
import Navbar from '../components/navbar'
import TinderCard from 'react-tinder-card'
import ChatContainer from '../components/chatContainer'

const db = [
    {
        name: 'Richard Hendricks',
        url: 'https://img.freepik.com/premium-photo/man-with-black-skin-black-face-is-looking-camera_843274-7.jpg?size=626&ext=jpg&ga=GA1.1.1124746898.1705672766&semt=ais'
    },
    {
        name: 'Erlich Bachman',
        url: 'https://img.freepik.com/free-photo/medium-shot-woman-wearing-native-attire_23-2150397341.jpg?w=360&t=st=1708858509~exp=1708859109~hmac=8b2e3c7b3ca40349b154fec1b1df12ecf7291005fd6f4b959369528384a7fc78'
    },
    {
        name: 'Monica Hall',
        url: 'https://img.freepik.com/free-photo/handsome-man-using-modern-smartphone-outdoors_23-2149073853.jpg?w=360&t=st=1708858512~exp=1708859112~hmac=23d80a471f4fbe01d4576dbfd0f4a7cb3dc6b81909211dd940a25a42a9bc5cbe'
    },
    {
        name: 'Jared Dunn',
        url: 'https://img.freepik.com/free-photo/portrait-smiley-african-woman-floral-coat_23-2148747912.jpg?w=740&t=st=1708858644~exp=1708859244~hmac=39a9fc6c91fd16707bc81b53db80e518376c42ff3546a7c694fded11d5f298a6'
    },
    {
        name: 'Dinesh Chugtai',
        url: 'https://img.freepik.com/free-photo/young-people-celebrating-pride-month_23-2149333021.jpg?w=360&t=st=1708858690~exp=1708859290~hmac=57ed6edc263ac41f9c28dac8a1d4d4a9a65e65e75701290c84788a93602d7eb3'
    }
    ]

    function Advanced () {
    const [currentIndex, setCurrentIndex] = useState(db.length - 1)
    const [lastDirection, setLastDirection] = useState()
    // used for outOfFrame closure
    const currentIndexRef = useRef(currentIndex)

    const childRefs = useMemo(
        () =>
        Array(db.length)
            .fill(0)
            .map((i) => React.createRef()),
        []
    )

    const updateCurrentIndex = (val) => {
        setCurrentIndex(val)
        currentIndexRef.current = val
    }

    const canGoBack = currentIndex < db.length - 1

    const canSwipe = currentIndex >= 0

    // set last direction and decrease current index
    const swiped = (direction, nameToDelete, index) => {
        setLastDirection(direction)
        updateCurrentIndex(index - 1)
    }

    const outOfFrame = (name, idx) => {
        console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current)
        // handle the case in which go back is pressed before card goes outOfFrame
        currentIndexRef.current >= idx && childRefs[idx].current.restoreCard()
        // TODO: when quickly swipe and restore multiple times the same card,
        // it happens multiple outOfFrame events are queued and the card disappear
        // during latest swipes. Only the last outOfFrame event should be considered valid
    }

    const swipe = async (dir) => {
        if (canSwipe && currentIndex < db.length) {
        await childRefs[currentIndex].current.swipe(dir) // Swipe the card!
        }
    }

    // increase current index and show card
    const goBack = async () => {
        if (!canGoBack) return
        const newIndex = currentIndex + 1
        updateCurrentIndex(newIndex)
        await childRefs[newIndex].current.restoreCard()
    }

    return (
        <>
                <Navbar
                minimal={true}
                setShowModal={() => {}}
                showModal={false}/>
            
            <div className='dashboard'>
                <ChatContainer/>
                <div className="swipe-container">
                    <div className="card-container">    
                        {db.map((character, index) => (
                        <TinderCard
                            ref={childRefs[index]}
                            className='swipe'
                            key={character.name}
                            onSwipe={(dir) => swiped(dir, character.name, index)}
                            onCardLeftScreen={() => outOfFrame(character.name, index)}
                        >
                            <div
                            style={{ backgroundImage: 'url(' + character.url + ')' }}
                            className='card'
                            >
                            <h3>{character.name}</h3>
                            </div>
                        </TinderCard>
                ))}
            </div>
                        <div className='buttons'>
                            <button style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('left')}>Swipe left!</button>
                            <button style={{ backgroundColor: !canGoBack && '#c3c4d3' }} onClick={() => goBack()}>Undo swipe!</button>
                            <button style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('right')}>Swipe right!</button>
                        </div>
                        {lastDirection ? (
                            <h2 key={lastDirection} className='swipe-info'>
                            You swiped {lastDirection}
                            </h2>
                        ) : (
                            <h2 className='swipe-info'>
                            Swipe a card or press a button to get Restore Card button visible!
                            </h2>
                        )}
            </div>
            </div>
            
        </>
    )
}

export default Advanced