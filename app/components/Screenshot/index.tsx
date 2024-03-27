/*
    Component to display Screenshot Image of Location
*/

import { Card } from "flowbite-react";
import Image from "next/image";

type props = {
  selectedLocation: {
    image: string;
    image_metadata: {
      width: number;
      height: number;
    };
  };
};

function Screenshot(props: props) {
  return (
    <>
      {props.selectedLocation && (
        <Card className="mt-4">
          <h2 className="font-bold">Screenshot Image</h2>
          <Image
            src={props.selectedLocation.image}
            alt="location-image"
            width={props.selectedLocation.image_metadata.width}
            height={props.selectedLocation.image_metadata.height}
          />
        </Card>
      )}
    </>
  );
}

export default Screenshot;
