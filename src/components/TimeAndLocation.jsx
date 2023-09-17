import { TiLocation } from 'react-icons/ti';
import { formatToLocalTime } from '../services/weatherService';

const TimeAndLocation = ({ weather: { name, dt, timezone, country } }) => {
  return (
    <>
      <p className="text-white text-xs">
        {formatToLocalTime(dt, timezone, 'dd LLL yyyy')}
      </p>
      <div className="text-[0.7rem] pt-1 flex items-center">
        <div className="flex items-center">
          <TiLocation className="-mt-[2px]" />
          <p className="pl-1">{name}, </p>
          <p className="text-white pl-1">{country}</p>
        </div>
      </div>
    </>
  );
};

export default TimeAndLocation;
