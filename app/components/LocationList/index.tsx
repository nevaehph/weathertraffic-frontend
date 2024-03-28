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
        <div className="grid gap-2 md:grid-cols-1 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <p>Select a location to view the weather and image of it.</p>
            <div className="h-96 overflow-y-auto p-4">
              <ul>
                {props.locations.map((item: object, index: number) => {
                  const locationItem = item as locationItem;
                  return (
                    <div
                      className="cursor-pointer"
                      key={index}
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
                        className={
                          props.selectedLocation?.camera_id ===
                          locationItem.camera_id
                            ? "bg-cyan-700 text-white p-1 underline"
                            : "underline p-1 transition hover:bg-cyan-700 hover:text-white"
                        }
                      >
                        {locationItem.name}
                      </li>
                    </div>
                  );
                })}
              </ul>
            </div>
          </Card>
          {props.selectedLocation && (
            <Card className="lg:col-span-1">
              <div className="flex flex-col justify-start">
                <p className="font-bold w-full text-wrap">Selected Location:</p>
                <p className="w-full text-wrap mb-4">
                  {props.selectedLocation?.name}
                </p>
                <p className="font-bold w-full text-wrap">Weather</p>
                <p>{props.selectedLocation?.weather}</p>
              </div>
            </Card>
          )}
        </div>
      )}
    </>
  );
}

export default LocationList;
