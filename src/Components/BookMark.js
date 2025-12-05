import { useState } from "react";

const BookMark = () => {
  const [link, setLink] = useState(false);

  const handleToggle = () => {
    setLink(prev => !prev);
  };

  return (
    <>

    <button onClick={handleToggle}>Link</button>
      {link && (
        <div className="bookmark panel">
          <div className="top_container">
            <p>Links</p>
            <p onClick={handleToggle}>×</p>
          </div>
          <ul className="link">
            <li>
              <a href="https://google.com">Google</a>
            </li>
            <li>
              <a href="https://youtube.com">YouTube</a>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default BookMark;
