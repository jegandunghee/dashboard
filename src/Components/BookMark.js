import { useState } from "react";

const BookMark = () => {
  const [link, setLink] = useState(false);
  const [links, setLinks] = useState([
    { name: "Google", url: "https://google.com" },
    { name: "YouTube", url: "https://youtube.com" }
  ]);
  const [inputMode, setInputMode] = useState(false);
  const [inputName, setInputName] = useState("");
  const [inputUrl, setInputUrl] = useState("");

  const handleToggle = () => {
    setLink(prev => !prev);
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!inputName.trim() || !inputUrl.trim()) return;
    
    // Auto add https:// if missing
    let finalUrl = inputUrl.trim();
    if (!finalUrl.startsWith("http://") && !finalUrl.startsWith("https://")) {
      finalUrl = "https://" + finalUrl;
    }

    setLinks(prev => [...prev, { name: inputName.trim(), url: finalUrl }]);
    setInputName("");
    setInputUrl("");
    setInputMode(false);
  };

  const handleDelete = (indexToRemove) => {
    setLinks(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  return (
    <>
      <button onClick={handleToggle}>Link</button>
      {link && (
        <>
          <div onClick={() => setLink(false)} style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 90, background: "transparent" }}></div>
          <div className="bookmark panel" style={{ alignSelf: 'flex-start', zIndex: 101, position: "relative" }}>
            <div className="top_container">
              <p>Links</p>
              <p onClick={handleToggle} style={{ cursor: 'pointer' }}>×</p>
            </div>
            <ul className="link" style={{ width: '100%', padding: 0, margin: '10px 0', listStyle: 'none' }}>
              {links.map((item, idx) => (
                <li key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <a href={item.url} target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: '#222' }}>{item.name}</a>
                  <button onClick={() => handleDelete(idx)} style={{ background: 'transparent', border: 'none', color: '#666', cursor: 'pointer', padding: '0 5px' }}>-</button>
                </li>
              ))}
            </ul>
            
            {inputMode ? (
              <form onSubmit={handleAddSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '5px', width: '100%' }}>
                <input type="text" placeholder="이름" value={inputName} onChange={e => setInputName(e.target.value)} required style={{ padding: '5px' }} />
                <input type="text" placeholder="URL 주소" value={inputUrl} onChange={e => setInputUrl(e.target.value)} required style={{ padding: '5px' }} />
                <button type="submit" style={{ cursor: 'pointer', background: '#e0e0e0', color: '#222', padding: '5px' }}>추가</button>
              </form>
            ) : (
              <div style={{ width: '100%', textAlign: 'center' }}>
                <button onClick={() => setInputMode(true)} style={{ cursor: 'pointer', fontSize: '1.2rem', background: 'transparent', color: '#444' }}>+</button>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default BookMark;
