import { ListUsers } from "./components/ListUsers";
import { Page } from "@shopify/polaris";

function App() {
    return (
        <div className="App">
            <Page title="Interview Assignment - Do Thanh Hieu">
                <ListUsers />
            </Page>
        </div>
    );
}

export default App;
