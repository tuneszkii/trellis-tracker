import { MemoryRouter } from 'react-router-dom';
import { TrellisApp } from "./trellis-app.js";

/** Full app (needs the trellis service running to load data). */
export const TrellisAppBasic = () => {
  return (
    <MemoryRouter>
      <TrellisApp />
    </MemoryRouter>
  );
}
