import ReactDOM from 'ReactDOM';
import World from './App';
import './style.scss'

function HelloWorld(props) {
    return (
       <World greet={props.greet}/>
    );
}

ReactDOM.render(<HelloWorld greet="欢迎使用React"/>, document.getElementById('app'));