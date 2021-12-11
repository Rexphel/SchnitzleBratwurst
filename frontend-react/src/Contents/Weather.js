import React from 'react';
import { Card } from 'react-bootstrap'

const city = 'Mannheim'
const apikey = '2435deebbdd8dec753d6e35a726ec850';
const apiUrl =`http://api.openweathermap.org/data/2.5/weather?q=${city}&lang=de&units=metric&lang=de&appid=${apikey}`

export class WeatherGUI extends React.Component{
    
    constructor(props) {
        super(props);
    
        this.state = {
          main: [],
          weather: [],
        };
      }
    
      componentDidMount() {
        fetch(apiUrl)
          .then(response => response.json())
          .then(data => this.setState({ main: data.main, weather: data.weather[0] }));
      }
    
    render() {

        const { main, weather } = this.state;


        return (
            <div>
                <Card border="primary" bg='dark' text='light' style={{ width: '16rem' }}>
                    <Card.Body>
                        <Card.Title>
                            Und nun: Das Wetter heute in {city}:
                        </Card.Title>
                        <Card.Text>
                                {main.temp}°C gefühlt {main.feels_like}°C
                                &nbsp;&nbsp;
                                Himmel ist {weather.description}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}