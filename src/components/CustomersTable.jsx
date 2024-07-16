import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const CustomersTable = () => {
  const [customers, setCustomers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [nameFilter, setNameFilter] = useState("");
  const [amountFilter, setAmountFilter] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  async function getAllCustomers() {
    try {
      const { data } = await axios.get("/data.json");
      setCustomers(data.customers);
    } catch (error) {
      alert("error");
    }
  }
  async function getAllTransactions() {
    try {
      const { data } = await axios.get("/data.json");
      setTransactions(data.transactions);
    } catch (error) {
      alert("error");
    }
  }

  useEffect(() => {
    getAllCustomers();
    getAllTransactions();
  }, []);

  const customersWithTransactions = customers?.map((customer) => ({
    ...customer,
    transactions: transactions.filter((t) => t.customer_id === customer.id),
    totalAmount: transactions
      .filter((t) => t.customer_id === customer.id)
      .reduce((sum, t) => sum + t.amount, 0),
  }));

  const handleSelectCustomer = (customer) => {
    setSelectedCustomer(customer);
  };

  const getChartData = () => {
    if (!selectedCustomer) return [];
    return selectedCustomer.transactions.map((t) => ({
      date: new Date(t.date).toLocaleDateString(),
      amount: t.amount,
    }));
  };

  const filteredCustomers = customersWithTransactions.filter(
    (customer) =>
      customer?.name?.toLowerCase().includes(nameFilter.toLowerCase()) &&
      customer?.totalAmount?.toString().includes(amountFilter)
  );

  return (
    <section className=" flex gap-5 flex-col md:flex-row">
      <div>
        <Card>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Customer Name</TableHead>
                  <TableHead>Transactions Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium"></TableCell>
                  <TableCell>
                    <Input
                      placeholder="search by name"
                      value={nameFilter}
                      onChange={(e) => {
                        setNameFilter(e.target.value);
                        // handleFilter();
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      placeholder="search by amount"
                      value={amountFilter}
                      onChange={(e) => setAmountFilter(e.target.value)}
                    />
                  </TableCell>
                </TableRow>
                {filteredCustomers?.map((customer) => (
                  <TableRow key={customer?._id}>
                    <TableCell className="font-medium">
                      {customer?.id}
                    </TableCell>
                    <TableCell>{customer?.name}</TableCell>
                    <TableCell>{customer?.totalAmount}</TableCell>
                    <TableCell className="text-right">
                      <Button onClick={() => handleSelectCustomer(customer)}>
                        see graph
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      <div className="flex-1 space-y-5">
        {selectedCustomer && (
          <Card>
            <CardHeader>
              <CardTitle>
                Transaction History for {selectedCustomer.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={getChartData()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="amount" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}
        {selectedCustomer && (
          <Card className="p-5">
            <h3 className="text-3xl my-5">Transactions history</h3>
            <div className="px-3">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>transaction date</TableHead>
                    <TableHead>Transaction Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedCustomer.transactions.map((transaction, index) => (
                    <TableRow key={transaction._id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        {new Date(transaction.date).toLocaleDateString()}
                      </TableCell>

                      <TableCell>{transaction.amount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        )}
      </div>
    </section>
  );
};

export default CustomersTable;
