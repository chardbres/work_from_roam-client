import React from 'react'

class Review extends React.Component {
    constructor(props) {
        super(props)
        console.log(props)
        this.state = {
            test: true
        }
    }

    // render information inside an infoWindow for POI
    render() {

        return (
            <div>
              <p>Note: {this.props.note}</p>
            </div>
        )
    }
}

export default Review