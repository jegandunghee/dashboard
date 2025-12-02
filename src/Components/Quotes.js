import quoteData from '../Data/quoteData.json';

const Quotes = () => {

  //숫자를 random처리 : Math.random();

  const data = quoteData[0];

  return (
    <div id='quote-page'>
      <p>{data.text}</p>
      <small>-{data.author}</small>
    </div>
  )
}

export default Quotes