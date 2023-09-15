import { render } from '@testing-library/react';
import React, {useState} from 'react';
import Moment from 'react-moment';

function DateTime(props) {
    return (
        <p className="date">{props.date}</p>
    )
}

function withDateTimePretty (Component) {          

    class NewComponent extends React.Component {
        
        render() {
            //this.props.date = new Date();            
            const newDate = new Date();            
            const date = new Date(this.props.date); //перевести строку в дату
            const timeDiff = Math.abs(newDate.getTime() - date.getTime());//newDate - date; //разница во времени в минутах
            const diffMin = Math.ceil(timeDiff / 1000 / 60);
            let dateTimePretty = '< не определено >';
            if (diffMin > 24 * 60) {
                const day = Math.floor(diffMin / 60 / 24);
                dateTimePretty = `${day} дней назад`;
            } else if (diffMin > 60) {
                const hour = Math.floor(diffMin / 60); //перевести минуты в часы
                dateTimePretty = `${hour} часов назад`;
            } else {
                const min = diffMin;
                dateTimePretty = `${min} минут назад`;
            }
            return <Component date={dateTimePretty}/>
        }
    }
    
    return  NewComponent;
    
}

function Video(props) {
    const DateTimePretty = withDateTimePretty(DateTime);
    return (
        <div className="video">
            <iframe src={props.url} frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
            <DateTimePretty date={props.date} />                        
        </div>
    )
}

function VideoList(props) {
    return props.list.map(item => <Video url={item.url} date={item.date} />);
}

export default function App() {
    const [list, setList] = useState([
        {
            url: 'https://www.youtube.com/embed/rN6nlNC9WQA?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2017-07-31 13:24:00'
        },
        {
            url: 'https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2018-03-03 12:10:00'
        },
        {
            url: 'https://www.youtube.com/embed/xGRjCa49C6U?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2018-02-03 23:16:00'
        },
        {
            url: 'https://www.youtube.com/embed/RK1K2bCg4J8?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2018-01-03 12:10:00'
        },
        {
            url: 'https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2018-01-01 16:17:00'
        },
        {
            url: 'https://www.youtube.com/embed/TxbE79-1OSI?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2017-12-02 05:24:00'
        },
    ]);

    return (
        <VideoList list={list} />
    );
}