import { Helmet } from "react-helmet";
import CustomersTable from "./components/CustomersTable.jsx";
import Navbar from "./components/Navbar.jsx";

function App() {
  return (
    <>
      <Helmet>
        <title>Customers Dashboard</title>
        <meta
          name="Customers Dashboard that show customers with their transactions"
          content="Customers Dashboard"
        />
      </Helmet>
      <Navbar />
      <div className="my-5 container">
        <h2 className="md:text-3xl font-bold mb-5">
          Customers transaction dashboard
        </h2>
        <CustomersTable />
      </div>
    </>
  );
}

export default App;
