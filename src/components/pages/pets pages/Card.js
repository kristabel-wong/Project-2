import React from "react";
import { animated, interpolate } from "react-spring/hooks";
import Carousel from "nuka-carousel";


class Card extends React.Component {
  render() {
    const { i, x, y, rot, scale, trans, bind, objs } = this.props;
    const { name, age, breed, text, pics, location } = objs[i];

    return (
        
      <animated.div
        key={i}
        style={{
          transform: interpolate(
            [x, y],
            (x, y) => `translate3d(${x}px,${y}px,0)`
          )
        }}
        className="root-div"
      >
        <animated.div
          {...bind(i)}
          style={{
            transform: interpolate([rot, scale], trans)
          }}
          className="root-div-div"
        >
          <div className="card">
            <Carousel>
              {pics.map(pic => (
                <img src={pic} alt="profilePicture" className="image-swipe"/>
              ))}
            </Carousel>
            <h2 className="petName-swipe">{name},</h2>
            <h2 className="petAge-swipe">{age}</h2>
            <h5 className="petInfo-swipe">{location}</h5>
            <h5 className="petInfo-swipe">{breed}</h5>
            <h5 className="petDesc-swipe">{text}</h5>
          </div>
        </animated.div>
      </animated.div>
      
    );
  }
}

export default Card;