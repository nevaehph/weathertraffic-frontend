import { Card } from "flowbite-react";

/*
    Component to display Location List to be selected alongside Weather Data
*/

type props = {
  locations: object[];
  selectLocation: React.Dispatch<React.SetStateAction<any>>;
  selectedLocation?: {
    weather: string;
    camera_id: string;
    name: string;
  };
};

type locationItem = {
  camera_id: string;
  name: string;
};

function LocationList(props: props) {
  return (
    <>
      {props.locations.length > 0 && (
        <div className="grid gap-1 grid-cols-2">
          <Card className="">
            <p>Select a location to view the weather and image of it.</p>
            {props.selectedLocation && (
              <p className="font-bold w-full text-wrap">
                Selected Location: {props.selectedLocation?.name}
              </p>
            )}
            <div className="h-96 overflow-y-auto p-4">
              <ul>
                {props.locations.map((item: object, index: number) => {
                  const locationItem = item as locationItem;
                  return (
                    <a
                      href="javascript:void(0)"
                      onClick={() => {
                        if (
                          locationItem.camera_id ===
                          props.selectedLocation?.camera_id
                        ) {
                          props.selectLocation(undefined);
                        } else {
                          props.selectLocation(locationItem);
                        }
                      }}
                    >
                      <li
                        key={index}
                        className={
                          props.selectedLocation?.camera_id ===
                          locationItem.camera_id
                            ? "bg-cyan-700 text-white p-1"
                            : "p-1"
                        }
                      >
                        {locationItem.name}
                      </li>
                    </a>
                  );
                })}
              </ul>
            </div>
          </Card>
          <Card>
            <h3>Weather</h3>
            <h5>{props.selectedLocation?.weather}</h5>
          </Card>
        </div>
      )}
    </>
  );
}

export default LocationList;
