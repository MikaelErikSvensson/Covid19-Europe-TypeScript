import 'leaflet/dist/leaflet.css';
import { ColoredCountry, Country, MapProps } from '../types/main';
import { findMax, formatPercentage } from '../utils/numberUtils';
import RenderMap from './RenderMap';

const DeathRate = ({ coloredCountries }: MapProps) => {
  const max = findMax(coloredCountries, (x: Country) => {
    if (Number.isNaN(x.deathRate)) {
      return 0;
    } else {
      return x.deathRate;
    }
  });
  const onEachCountry = (country: ColoredCountry, layer: any) => {
    layer.options.fillColor = country.deathRateColor;
    layer.bindPopup(`${country.properties.ADMIN} ${formatPercentage(country.deathRate)}`);
    layer.on('mouseover', function () {
      layer.openPopup();
      layer.setStyle({
        weight: 3,
      });
    });
    layer.on('mouseout', function () {
      layer.closePopup();
      layer.setStyle({
        weight: 1,
      });
    });
  };
  return (
    <div>
      <RenderMap coloredCountries={coloredCountries} onEachCountry={onEachCountry} />
      <div className="legendTitle">Death Rate</div>
      <div className="legend">
        <div className="legendHighest"> - {formatPercentage(max)} </div>
        <div className="legendMidHigh"> - {formatPercentage(Math.floor((max / 4) * 2))} </div>
        <div className="legendMidLow"> - {formatPercentage(Math.floor(max / 4))} </div>
        <div className="legendLowest"> - 0 </div>
      </div>
      <div className="gradientDeathRate"></div>
    </div>
  );
};
export default DeathRate;
