// HOOKS
import { useState, useContext, useRef, useEffect } from 'react';
// CONTEXT
import globalContext from '../../../../contexts/GlobalContext';

const UserPersonalMessage = () => {

  const { userDataFromDb, setUserDataFromDb } = useContext(globalContext);
  const inputRef = useRef();
  const hiddenTextRef = useRef();
  const buttonRef = useRef();

  const [clickedButton, setClickedButton] = useState(false);
  const [personalMessage, setPersonalMessage] = useState(userDataFromDb.personalMessage || "<Tapez votre message perso>");

  const handlePersonalMessage = (event) => {
    event.preventDefault();
    setUserDataFromDb({
      ...userDataFromDb,
      personalMessage: personalMessage || null
    });
    if (!personalMessage) {
      setPersonalMessage("<Tapez votre message perso>");
    }
    setClickedButton(false);

  };

  const handleInputLength = () => {
    const textLength = hiddenTextRef.current.offsetWidth;
    inputRef.current.style.width = 20 + textLength + "px";
  };

  const autoSelect = () => {
    if (clickedButton) {
      inputRef.current.select();
    }
  };

  useEffect(autoSelect, [clickedButton]);

  return (
    <form onSubmit={handlePersonalMessage}>
      {clickedButton
        ? (
          <>
            <span
              className="hidden-text"
              ref={hiddenTextRef}
            >
              {personalMessage}</span>
            <input type="text"
              ref={inputRef}
              style={{ width: `${buttonRef.current?.offsetWidth + 10}px` }}
              data-length={personalMessage.length + "px"}
              maxLength="50"
              onChange={({ target }) => {
                setPersonalMessage(target.value);
                handleInputLength();
              }}
              onBlur={handlePersonalMessage}
              value={personalMessage}
            />
          </>
        )
        : <button
          type="button"
          ref={buttonRef}
          className="user-personnal-message"
          onClick={() => setClickedButton(true)}
        >
          {personalMessage}
        </button>}
    </form>
  );
};

export default UserPersonalMessage;