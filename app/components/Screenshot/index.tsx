/*
    Component to display Screenshot Image of Location
*/

import { Card } from "flowbite-react";
import Image from "next/image";

type props = {
  image: string;
};

function Screenshot(props: props) {
  return (
    <>
      {props.image && (
        <Card>
          <h2>Screenshot Image</h2>
          <Image src={props.image} alt="location-image" fill={true} />
        </Card>
      )}
    </>
  );
}

export default Screenshot;
