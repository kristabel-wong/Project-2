import React, { useState } from "react";
import { useSprings } from "react-spring/hooks";
import { useGesture } from "react-with-gesture";
import Card from "./Card";

import "./Deck.css";


const objs = [
  {
    pics: [
      "https://images.unsplash.com/photo-1541364983171-a8ba01e95cfc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
    ],
    name: "Monsieur Beau",
    age: 3,
    location: "Melbourne",
    breed: "French Bulldog",
    text: "Pawww-lease consider my application"
  },
  {
    pics: [
      "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
      "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80"
    ],
    name: "Pits",
    age: 1,
    location: "Brisbane",
    breed: "French Bulldog",
    text:
      "I'm a bit shy"
  },
  {
    pics: [
      "https://scontent.fsyd4-1.fna.fbcdn.net/v/t39.30808-6/278106878_5059554534127820_4134914145649592563_n.jpg?_nc_cat=100&ccb=1-5&_nc_sid=a26aad&_nc_ohc=tDxhsLeqIToAX8HUsSj&tn=fyRfHEuqm-0XJYUQ&_nc_ht=scontent.fsyd4-1.fna&oh=00_AT_KPRBT_MimVtD9rVVWtIaMwyNXgkF-dP2TiZ_w2KUHLw&oe=6273B7A2", 
      "https://scontent.fsyd4-1.fna.fbcdn.net/v/t39.30808-6/278241107_5059554537461153_2025653374404638284_n.jpg?_nc_cat=101&ccb=1-5&_nc_sid=a26aad&_nc_ohc=xOv-WfNVG_kAX99ndB-&_nc_ht=scontent.fsyd4-1.fna&oh=00_AT8NgnZd8ypIO0uLTvuwJOvgz4SZVK-1v07T8ESROARn5w&oe=6272707C", 
      "https://scontent.fsyd4-1.fna.fbcdn.net/v/t39.30808-6/278185475_5059554554127818_7261621521385707014_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=a26aad&_nc_ohc=GAsC_GkH69AAX-aoMIg&tn=fyRfHEuqm-0XJYUQ&_nc_ht=scontent.fsyd4-1.fna&oh=00_AT9Xja_I-ZFf1iGBssYdj7LgGgYs34p3PcyaZtvjY5LaUw&oe=6273F22B"
    ],
    name: "Captain Blep",
    age: 10,
    breed: "Chihuahua",
    location: "Sydney",
    text: "Smol boy with a big heart (and tongue)"
  },
  {
    pics: [
      "https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=662&q=80",
      "https://images.unsplash.com/photo-1586671267731-da2cf3ceeb80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=689&q=80"
    ],
    name: "Goldie",
    age: 2,
    location: "Sydney",
    breed: "Golden Retriever",
    text:
      "I promise I'll be the goodest boy"
  }
];

console.log(objs);

const to = i => ({
  x: 0,
  y: i * -10,
  scale: 1,
  rot:  Math.random() * 5,
  delay: i * 100
});
const from = i => ({ rot: 0, scale: 1.5, y: -1000 });

const trans = (r, s) =>
  `perspective(1500px) rotateX(30deg) rotateY(${r /
    10}deg) rotateZ(${r}deg) scale(${s})`;

function Deck() {
   const [gone] = useState(() => new Set());

  const [props, set] = useSprings(objs.length, i => ({
    ...to(i),
    from: from(i)
  }));

  const bind = useGesture(
    ({
      args: [index],
      down,
      delta: [xDelta],
      distance,
      direction: [xDir],
      velocity
    }) => {
      const trigger = velocity > 0.2;

      const dir = xDir < 0 ? -1 : 1;

      if (!down && trigger) gone.add(index);
    

      set(i => {
        if (index !== i) return;
        const isGone = gone.has(index);

        const x = isGone ? (200 + window.innerWidth) * dir : down ? xDelta : 0;

        const rot = xDelta / 100 + (isGone ? dir * 10 * velocity : 0);

        const scale = down ? 1.1 : 1;
        return {
          x,
          rot,
          scale,
          delay: undefined,
          config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 }
        };
      });

      if (!down && gone.size === objs.length)
        setTimeout(() => gone.clear() || set(i => to(i)), 600);
    }
  );

  return  (
    <div className="DECK-PAGE">
        hello
        
    </div>
  );
  
//   return props.map(({ x, y, rot, scale }, i) => (
//     <Card
//       i={i}
//       x={x}
//       y={y}
//       rot={rot}
//       scale={scale}
//       trans={trans}
//       objs={objs}
//       bind={bind}
//     />
//   ));
}

export default Deck;
