import { Metadata } from "next";
import Header from "../header/layout";
import ExpenseForm from "./ExpenseForm";
import ExportExpenses from "./ExportExpenses";

export const metadata: Metadata = {
  title: "AI Budget Planner - Add Expense",
};

export default function AddExpense() {
  return (
    <Header>
      <div className="flex flex-col justify-center my-8 gap-4">
        <ExpenseForm />
        <ExportExpenses />
      </div>
    </Header>
  );
}
