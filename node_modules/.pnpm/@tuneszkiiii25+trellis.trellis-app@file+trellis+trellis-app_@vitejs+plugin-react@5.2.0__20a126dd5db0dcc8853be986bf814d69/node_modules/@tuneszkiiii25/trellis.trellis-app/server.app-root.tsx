import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router";
import { TrellisApp } from "./trellis-app.js";

interface IRenderProps {
  path: string;
}
    
export const render = async ({ path }: IRenderProps) => {
  return ReactDOMServer.renderToString(
    <StaticRouter location={path}>
      <TrellisApp />
    </StaticRouter>
  );
};

/**
 * implement loadScripts() to inject scripts to the head
 * during SSR.
 */
// export const loadScripts = async () => {
//   return '<script></script>';
// }
