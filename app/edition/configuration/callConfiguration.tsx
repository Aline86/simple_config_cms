import { return_data_url } from "../pages/callPages";

export default async function getConfiguration() {
  return return_data_url(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/edition/configuration`,
  );
}
