import quoteData from '../Data/quoteData.json';

const Quotes = () => {

  //숫자를 random처리 : Math.random();
  const index = Math.floor(Math.random()*quoteData.length);
  console.log(index);
  const data = quoteData[index];

  return (
    <div id='quote-page'>
      <p>{data.text}</p>
      <small>-{data.author}</small>
    </div>
  )
}

export default Quotes