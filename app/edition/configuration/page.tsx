import ConfigurationEdit from "../../../components/contextView/edition/configuration/ConfigurationEdit";
import getConfiguration from "./callConfiguration";
import ConfigurationClient from "./configurationClient";

export default async function Page() {
  const configuration = await getConfiguration();
  if (configuration !== undefined) {
    return (
      <ConfigurationClient initialConfiguration={configuration.configuration} />
    );
  } else {
    return <div>Pages non trouvée</div>;
  }
}