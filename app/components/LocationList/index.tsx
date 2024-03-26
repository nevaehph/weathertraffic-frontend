import { Card } from "flowbite-react";

/*
    Component to display Location List to be selected alongside Weather Data
*/

type props = {
  locations: object[];
  selectLocation(location: object): void;
};

function LocationList(props: props) {
  return (
    <>
      {props.locations && (
        <div className="flex flex-row">
          <Card>
            <ul>
              {props.locations.map((item: object, index: number) => {
                return (
                  <li>
                    <a
                      onClick={() => {
                        props.selectLocation(item);
                      }}
                    >
                      Name of Location
                    </a>
                  </li>
                );
              })}
            </ul>
          </Card>
          <Card>
            <h2>Weather</h2>
            <h5></h5>
          </Card>
        </div>
      )}
    </>
  );
}

export default LocationList;
