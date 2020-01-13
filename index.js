import React from './react';
import ReactDOM from './react-dom';

// const ele = (
//   <div className='active' title='123'>
//     hello,<span>react</span>
//   </div>
// )


// class Home extends React.Component {
//   render() {
//     return (
//       <div className='active' title='123'>
//         hello,<span>react</span>
//       </div>
//     )
//   }
// }

const Home = () => {
  return (
    <div className='active' title='123'>
      hello,<span>react</span>
    </div>
  )
}

const name = 'func';

ReactDOM.render(<Home title={name} />, document.querySelector('#root'));